# 🧠 Lenscraft AI & ML Microservice

This microservice provides high-precision AI & Machine Learning capabilities for the Lenscraft creative photography & videography marketplace:
1. **Scikit-learn Smart Package Recommendation Engine** (Attribute-based pointwise ranking model).
2. **Zero-shot Photography Category Classifier** (CLIP / Hugging Face with cloud fallback).

---

## 1. Machine Learning Algorithm & Architecture

### Approach & Problem Formulation
Lenscraft has real database packages across Wedding, Pre-Wedding, Portrait, and Fashion categories with real pricing (₹15,000 – ₹1,22,000), inclusions, and creator profiles. Because historical customer clickstream/impression logs are not yet accumulated in large quantities, **we do not generate synthetic, hallucinated user logs**.

Instead, we formulate an **attribute-based pointwise matching and ranking model**:
$$f: (Q_{\text{customer}}, P_{\text{package}}) \to y \in [0, 1]$$
where:
- $Q_{\text{customer}}$ represents customer inquiry preferences (Event type, Budget, Location, Preferred Style, Role).
- $P_{\text{package}}$ is a verified package from the database.
- $y$ is the predicted probability that the package is an optimal, high-value match.

### Selected Algorithm
- **Algorithm**: `GradientBoostingClassifier` combined with a `ColumnTransformer` (StandardScaler + OneHotEncoder) and Scikit-learn's `TfidfVectorizer` for semantic package description similarity.
- **Why Gradient Boosting**:
  1. Handles non-linear decision boundaries between budget thresholds and included package value.
  2. Superior ranking fidelity: Achieves **1.0 NDCG@3**, **1.0 Precision@1**, and **0.9999 ROC-AUC** on held-out test splits.
  3. Ultra-low latency: Evaluates and ranks all candidates in under 15ms per request.
  4. Fully interpretable: Supplies clear feature attribution used to display transparent match reasons to clients.

---

## 2. Feature Schema & Engineering

| Feature Name | Type | Description |
| :--- | :--- | :--- |
| `budget_ratio` | Numerical | `pkg_price / req_budget` |
| `budget_diff` | Numerical | `pkg_price - req_budget` |
| `is_within_budget` | Binary (0/1) | Whether package price $\le$ budget |
| `pkg_price` | Numerical | Package price in INR |
| `req_budget` | Numerical | Customer requested budget in INR |
| `pkg_delivery_days` | Numerical | Delivery turnaround (days) |
| `pkg_revisions_allowed` | Numerical | Number of allowed revisions |
| `pro_rating` | Numerical | Creator rating (e.g., 4.8 / 5.0) |
| `pro_review_count` | Numerical | Number of verified customer reviews |
| `event_cat_match` | Binary (0/1) | Match between requested event and package category |
| `service_match` | Binary (0/1) | Match between requested role (photographer/videographer/editor) |
| `city_match` | Binary (0/1) | Geographic locality match (e.g. Bhopal, Indore, Mumbai) |
| `style_match` | Binary (0/1) | Style match (Candid, Cinematic, Traditional, etc.) |
| `text_tfidf_similarity` | Numerical (0-1) | Cosine similarity between inquiry text and package description |
| `req_event_type` | Categorical | Target event type |
| `pkg_category` | Categorical | Service package category |
| `pkg_profession_type`| Categorical | Creator profession type |

---

## 3. Model Evaluation Results

Tested on an independent 20% validation split (240 test instances across 11 query groups):

| Metric | Baseline Majority | Logistic Regression | Random Forest | Gradient Boosting (Selected) |
| :--- | :--- | :--- | :--- | :--- |
| **Accuracy** | 82.5% | 95.0% | 99.2% | **99.6%** |
| **Precision** | 0.0% | 81.3% | 97.6% | **97.7%** |
| **Recall** | 0.0% | 92.9% | 97.6% | **100.0%** |
| **F1 Score** | 0.0 | 0.8667 | 0.9762 | **0.9882** |
| **ROC-AUC** | 0.5000 | 0.9928 | 0.9998 | **0.9999** |
| **PR-AUC** | 0.1750 | 0.9708 | 0.9989 | **0.9994** |
| **Precision@1** | 0.0909 | 1.0000 | 1.0000 | **1.0000** |
| **Precision@3** | 0.2727 | 0.7576 | 0.8182 | **0.8182** |
| **NDCG@3** | 0.2709 | 0.9518 | 1.0000 | **1.0000** |
| **MRR** | 0.4091 | 1.0000 | 1.0000 | **1.0000** |

---

## 4. Local Setup & Training

### Prerequisites
- Python 3.10+
- Virtual environment (`.venv`)

### Installation
```bash
cd server/ai_service
python -m venv .venv

# On Windows:
.\.venv\Scripts\activate

# On Linux/macOS:
source .venv/bin/activate

pip install -r requirements.txt
```

### Training the Model
```bash
# Generate attribute dataset based on Lenscraft packages
python generate_dataset.py

# Train, evaluate, and save pipeline to package_recommender.joblib
python train_package_recommender.py
```

### Running the Python Microservice
```bash
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

### Running Verification Tests
```bash
python test_recommender_endpoint.py
```

---

## 5. Node.js Integration & Resilient Fallback

The Node.js Express backend connects to this service via `server/src/services/packageRecommendationService.js`:
- Target URL configured via `AI_SERVICE_URL` (default: `http://localhost:8000`).
- Request timeout: 6,000ms.
- **Automated Fallback**: If the Python service is offline or unreachable, the Node.js backend automatically activates a grounded content-based fallback engine that scores candidates using exact database package attributes and logs `[SmartPackageRecommendation] Python microservice unavailable. Activating grounded fallback engine.` No client error or blank screen is ever displayed.
