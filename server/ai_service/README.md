# 🧠 Lenscraft AI & ML Microservice

This microservice provides high-precision AI & Machine Learning capabilities for the Lenscraft creative photography & videography marketplace:
1. **Scikit-learn Smart Package Recommendation Engine** (Attribute-based pointwise ranking model).
2. **Zero-shot Photography Category Classifier** (CLIP / Hugging Face with cloud fallback).
3. **Multilingual NLP Intent Classification & Entity Extraction Model** (Scikit-learn TF-IDF FeatureUnion + LinearSVC / Logistic Regression for English, Hindi, and Roman Hinglish).

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

---

## 6. Technology 5: Custom Multilingual NLP Intent & Entity Model

### Overview
Lenscraft features a genuine custom NLP intent classification and entity extraction model built with Scikit-learn to handle trilingual customer inquiries across English, Hindi (Devanagari script), and Roman-script Hinglish.

### Supported Intents
1. `photographer_search`: User seeking a photographer, videographer, or cinematographer.
2. `package_search`: Inquiries exploring specific service packages, inclusions, or photography deals.
3. `pricing_question`: Questions regarding standard rates, per-day charges, or quotes.
4. `booking_help`: Guidance on how to book, check availability dates, make deposits, or cancel.
5. `general_lenscraft_help`: Questions about what Lenscraft is, how the platform operates, and trust/safety.
6. `unknown_or_unsupported`: Out-of-scope or unrelated queries (e.g. weather, politics, jokes, non-photography topics).

### Dataset Statistics
- **Total Labeled Utterances**: 228 non-duplicate utterances (`server/ai_service/nlp_intent_dataset.py`).
- **Language Distribution**:
  - English: 93 utterances (40.8%)
  - Roman Hinglish: 82 utterances (36.0%)
  - Hindi (Devanagari): 53 utterances (23.2%)
- **Data Splitting**: Stratified 80/20 train/test split (182 train, 46 test) with fixed random seed (`random_state=42`), strictly guarding against data leakage.

### Feature Engineering & Pipeline
- **Problem**: Roman Hinglish features substantial phonetic spelling variation (e.g., "shadi", "shaadi", "sadi"; "chahiye", "chaiye", "chahie"; "hazaar", "hazar"). Standard word-only tokenizers suffer from out-of-vocabulary sparsity.
- **Solution**: A Scikit-learn `FeatureUnion` combining:
  1. `word_tfidf`: Word-level n-grams `(1, 2)` with sublinear TF scaling.
  2. `char_tfidf`: Character boundary n-grams `(2, 5)` (`analyzer='char_wb'`) to capture sub-word phonetic stems across transliterated Hindi and English.
- **Vectorized Dimensionality**: 2,829 features.

### Benchmark Evaluation (Held-out 20% Test Split)

| Model | Accuracy | Weighted Precision | Weighted Recall | Weighted F1 | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **LinearSVC (Selected)** | **91.30%** | **92.09%** | **91.30%** | **0.9142** | Best overall calibration on Roman Hinglish & Hindi |
| **Logistic Regression (Baseline)** | 86.96% | 88.08% | 86.96% | 0.8715 | High precision baseline |
| **Random Forest (100 trees)** | 82.61% | 83.19% | 82.61% | 0.8180 | Good recall on common intents |
| **Multinomial Naive Bayes** | 71.74% | 75.39% | 71.74% | 0.6588 | Lower performance due to n-gram correlations |

### Per-Class Metrics (LinearSVC on Test Set)

| Intent | Precision | Recall | F1-Score | Support |
| :--- | :--- | :--- | :--- | :--- |
| `photographer_search` | 1.0000 | 1.0000 | 1.0000 | 10 |
| `package_search` | 0.8889 | 0.8889 | 0.8889 | 9 |
| `pricing_question` | 1.0000 | 0.8571 | 0.9231 | 7 |
| `booking_help` | 0.7778 | 1.0000 | 0.8750 | 7 |
| `general_lenscraft_help` | 0.8571 | 0.8571 | 0.8571 | 7 |
| `unknown_or_unsupported` | 1.0000 | 0.8333 | 0.9091 | 6 |
| **Weighted Average** | **0.9209** | **0.9130** | **0.9142** | **46** |

### Entity Extraction Logic (`nlp_entity_extractor.py`)
Separated from intent classification, rule-grounded entity extraction parses:
- **Event Type**: Wedding, Pre-Wedding, Engagement, Birthday, Corporate, Fashion, Baby Shower, Maternity.
- **Location**: Bhopal, Indore, Mumbai, Delhi, Jaipur, Bangalore, Pune, Goa, etc.
- **Budget Variations**:
  - Pure numeric: `"15000"`, `"20000"`
  - K-suffix: `"15k"`, `"25k"`
  - Hinglish words: `"15 hazaar"`, `"20 hazar"`, `"pandrah hazaar"`, `"1.5 lakh"`, `"ek lakh"`
  - Currency symbols: `"₹15,000"`, `"Rs 20000"`
  - Budget boundaries: `"under 15k"`, `"ke andar"`, `"tak"`, `"approx 20k"`
- **Photography Style**: Candid, Traditional, Cinematic, Editorial, Drone/Aerial, Vintage.
- **Required Service**: Photographer, Videographer, Cinematographer, Drone Operator, Editor.
- **Language Detection**: Identifies whether the query is Devanagari Hindi (`hi`), Roman Hinglish (`hinglish`), or standard English (`en`).

### Running & Testing the NLP Model
```bash
# Train the model and generate metrics
python train_nlp_intent_model.py

# Test the FastAPI endpoint
python test_nlp_endpoint.py

# Test end-to-end integration via Node.js
node ../testMultilingualNlp.js
```

