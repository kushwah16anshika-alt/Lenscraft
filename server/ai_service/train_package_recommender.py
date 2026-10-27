"""
Lenscraft ML Smart Package Recommendation System - Training & Evaluation Pipeline
Trains, validates, compares, and evaluates Scikit-learn models for package ranking.
Saves the fitted pipeline and evaluation metrics.
"""

import os
import sys
import json
import numpy as np
import pandas as pd
import joblib

# Ensure UTF-8 output on Windows
if sys.platform.startswith('win'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

from sklearn.model_selection import GroupShuffleSplit
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.dummy import DummyClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    average_precision_score,
    confusion_matrix,
    classification_report
)

def compute_ranking_metrics_at_k(df_test, y_pred_prob, k=3):
    """
    Computes ranking metrics (Precision@K, Recall@K, NDCG@K, MRR)
    across distinct test queries.
    """
    df_eval = df_test.copy()
    df_eval['pred_score'] = y_pred_prob

    precisions_at_1 = []
    precisions_at_k = []
    recalls_at_k = []
    ndcgs_at_k = []
    mrrs = []

    for q_id, group in df_eval.groupby('query_id'):
        sorted_group = group.sort_values(by='pred_score', ascending=False)
        actual_labels = sorted_group['is_relevant'].values
        total_relevant = actual_labels.sum()

        if total_relevant == 0:
            # Query has no relevant packages; skip ranking evaluation for undefined edge
            continue

        # Top-1 Precision
        p_at_1 = 1.0 if actual_labels[0] == 1 else 0.0
        precisions_at_1.append(p_at_1)

        # Top-K
        top_k_labels = actual_labels[:k]
        p_at_k = top_k_labels.sum() / min(k, len(actual_labels))
        r_at_k = top_k_labels.sum() / total_relevant
        precisions_at_k.append(p_at_k)
        recalls_at_k.append(r_at_k)

        # DCG@K
        dcg = sum((val / np.log2(idx + 2)) for idx, val in enumerate(top_k_labels))
        # Ideal DCG@K
        ideal_labels = sorted(actual_labels, reverse=True)[:k]
        idcg = sum((val / np.log2(idx + 2)) for idx, val in enumerate(ideal_labels))
        ndcg = (dcg / idcg) if idcg > 0 else 0.0
        ndcgs_at_k.append(ndcg)

        # MRR (Mean Reciprocal Rank)
        first_rel_idx = np.where(actual_labels == 1)[0]
        mrr = (1.0 / (first_rel_idx[0] + 1)) if len(first_rel_idx) > 0 else 0.0
        mrrs.append(mrr)

    return {
        f"Precision@1": round(float(np.mean(precisions_at_1)), 4),
        f"Precision@{k}": round(float(np.mean(precisions_at_k)), 4),
        f"Recall@{k}": round(float(np.mean(recalls_at_k)), 4),
        f"NDCG@{k}": round(float(np.mean(ndcgs_at_k)), 4),
        "MRR": round(float(np.mean(mrrs)), 4),
        "evaluated_queries_count": len(precisions_at_1),
    }


def train_and_evaluate():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    dataset_path = os.path.join(current_dir, "package_recommendation_dataset.csv")

    if not os.path.exists(dataset_path):
        raise FileNotFoundError(f"Dataset not found at {dataset_path}. Run generate_dataset.py first.")

    df = pd.read_csv(dataset_path)
    print("==================================================")
    print("📊 1. DATASET INSPECTION & SUMMARY")
    print("==================================================")
    print(f"Total Rows: {len(df)}")
    print(f"Unique Queries: {df['query_id'].nunique()}")
    print(f"Unique Packages: {df['pkg_id'].nunique()}")
    print(f"Target Distribution:\n{df['is_relevant'].value_counts(dropna=False)}")
    print(f"Missing Values Check:\n{df.isnull().sum()[df.isnull().sum() > 0]}")

    # Feature definitions
    numerical_features = [
        "budget_ratio",
        "budget_diff",
        "is_within_budget",
        "pkg_price",
        "req_budget",
        "pkg_delivery_days",
        "pkg_revisions_allowed",
        "pro_rating",
        "pro_review_count",
        "event_cat_match",
        "service_match",
        "city_match",
        "style_match",
        "text_tfidf_similarity",
    ]

    categorical_features = [
        "req_event_type",
        "pkg_category",
        "pkg_profession_type",
    ]

    all_features = numerical_features + categorical_features
    X = df[all_features]
    y = df["is_relevant"].values
    groups = df["query_id"].values

    # Strict Grouped Split by query_id to avoid data leakage between train and test
    gss = GroupShuffleSplit(n_splits=1, test_size=0.20, random_state=42)
    train_idx, test_idx = next(gss.split(X, y, groups=groups))

    X_train, X_test = X.iloc[train_idx].copy(), X.iloc[test_idx].copy()
    y_train, y_test = y[train_idx], y[test_idx]
    df_test = df.iloc[test_idx].copy()

    print("\n==================================================")
    print("🔀 2. TRAIN / TEST SPLIT (GROUPED BY QUERY)")
    print("==================================================")
    print(f"Train samples: {len(X_train)} ({len(np.unique(groups[train_idx]))} queries)")
    print(f"Test samples:  {len(X_test)} ({len(np.unique(groups[test_idx]))} queries)")
    print(f"Train label balance: {np.bincount(y_train)}")
    print(f"Test label balance:  {np.bincount(y_test)}")

    # Preprocessing Pipeline (Fit on train data only!)
    numeric_transformer = Pipeline(steps=[
        ("imputer", SimpleImputer(strategy="median")),
        ("scaler", StandardScaler()),
    ])

    categorical_transformer = Pipeline(steps=[
        ("imputer", SimpleImputer(strategy="constant", fill_value="unknown")),
        ("onehot", OneHotEncoder(handle_unknown="ignore", sparse_output=False)),
    ])

    preprocessor = ColumnTransformer(
        transformers=[
            ("num", numeric_transformer, numerical_features),
            ("cat", categorical_transformer, categorical_features),
        ],
        remainder="drop"
    )

    # Models to benchmark
    models = {
        "Baseline_Majority": DummyClassifier(strategy="most_frequent"),
        "Logistic_Regression": LogisticRegression(max_iter=1000, random_state=42, class_weight="balanced"),
        "Random_Forest": RandomForestClassifier(n_estimators=100, max_depth=6, random_state=42, class_weight="balanced"),
        "Gradient_Boosting": GradientBoostingClassifier(n_estimators=100, max_depth=4, learning_rate=0.1, random_state=42),
    }

    results = {}
    fitted_pipelines = {}

    print("\n==================================================")
    print("⚙️ 3. MODEL TRAINING & COMPARATIVE BENCHMARKING")
    print("==================================================")

    for name, clf in models.items():
        pipeline = Pipeline(steps=[
            ("preprocessor", preprocessor),
            ("classifier", clf)
        ])

        # Fit strictly on training set
        pipeline.fit(X_train, y_train)
        fitted_pipelines[name] = pipeline

        # Predictions on held-out test set
        y_pred = pipeline.predict(X_test)
        if hasattr(pipeline, "predict_proba"):
            y_pred_proba = pipeline.predict_proba(X_test)[:, 1]
        else:
            y_pred_proba = y_pred.astype(float)

        acc = accuracy_score(y_test, y_pred)
        prec = precision_score(y_test, y_pred, zero_division=0)
        rec = recall_score(y_test, y_pred, zero_division=0)
        f1 = f1_score(y_test, y_pred, zero_division=0)
        try:
            auc = roc_auc_score(y_test, y_pred_proba)
        except Exception:
            auc = 0.5
        try:
            ap = average_precision_score(y_test, y_pred_proba)
        except Exception:
            ap = 0.0

        # Compute ranking metrics
        ranking_metrics = compute_ranking_metrics_at_k(df_test, y_pred_proba, k=3)

        results[name] = {
            "Accuracy": round(float(acc), 4),
            "Precision": round(float(prec), 4),
            "Recall": round(float(rec), 4),
            "F1_Score": round(float(f1), 4),
            "ROC_AUC": round(float(auc), 4),
            "PR_AUC": round(float(ap), 4),
            "Ranking_Metrics": ranking_metrics,
        }

        print(f"\n--- Model: {name} ---")
        print(f"Accuracy:  {acc:.4f} | F1: {f1:.4f} | ROC-AUC: {auc:.4f}")
        print(f"Ranking: Precision@1: {ranking_metrics['Precision@1']} | Precision@3: {ranking_metrics['Precision@3']} | NDCG@3: {ranking_metrics['NDCG@3']} | MRR: {ranking_metrics['MRR']}")

    # Select best model based on NDCG@3 and ROC-AUC
    best_model_name = "Gradient_Boosting"
    if results["Gradient_Boosting"]["Ranking_Metrics"]["NDCG@3"] >= results["Random_Forest"]["Ranking_Metrics"]["NDCG@3"]:
        best_model_name = "Gradient_Boosting"
    else:
        best_model_name = "Random_Forest"

    print("\n==================================================")
    print(f"🏆 4. BEST MODEL SELECTION: {best_model_name}")
    print("==================================================")
    best_pipeline = fitted_pipelines[best_model_name]
    best_metrics = results[best_model_name]

    # Save fitted model pipeline safely
    model_path = os.path.join(current_dir, "package_recommender.joblib")
    joblib.dump(best_pipeline, model_path)
    print(f"✓ Saved best model pipeline to: {model_path}")

    # Save evaluation report metadata
    metadata = {
        "best_model_name": best_model_name,
        "dataset_rows": len(df),
        "train_rows": len(X_train),
        "test_rows": len(X_test),
        "features": {
            "numerical": numerical_features,
            "categorical": categorical_features,
        },
        "all_model_evaluations": results,
        "test_ranking_performance": best_metrics["Ranking_Metrics"],
        "classification_performance": {
            "Accuracy": best_metrics["Accuracy"],
            "Precision": best_metrics["Precision"],
            "Recall": best_metrics["Recall"],
            "F1_Score": best_metrics["F1_Score"],
            "ROC_AUC": best_metrics["ROC_AUC"],
            "PR_AUC": best_metrics["PR_AUC"],
        },
    }

    meta_path = os.path.join(current_dir, "model_evaluation_report.json")
    with open(meta_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)
    print(f"✓ Saved model evaluation report to: {meta_path}")

    # Feature Importance analysis
    if hasattr(best_pipeline.named_steps["classifier"], "feature_importances_"):
        ohe = best_pipeline.named_steps["preprocessor"].named_transformers_["cat"].named_steps["onehot"]
        cat_feature_names = list(ohe.get_feature_names_out(categorical_features))
        final_feature_names = numerical_features + cat_feature_names
        importances = best_pipeline.named_steps["classifier"].feature_importances_
        sorted_fi = sorted(zip(final_feature_names, importances), key=lambda x: x[1], reverse=True)[:10]

        print("\nTop 10 Most Predictive Features:")
        for feat, imp in sorted_fi:
            print(f"  • {feat:<30}: {imp:.4f}")

    return metadata


if __name__ == "__main__":
    train_and_evaluate()
