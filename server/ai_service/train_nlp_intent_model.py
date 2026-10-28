"""
Training and Evaluation Script for Lenscraft Multilingual Intent Classification Model
- Trains and benchmarks TF-IDF + Logistic Regression baseline vs LinearSVC, MultinomialNB, and Random Forest.
- Uses FeatureUnion of word n-grams and character n-grams for phonetic resilience in Hinglish.
- Evaluates using stratified train/test split.
- Calculates Precision, Recall, F1-Score (macro & weighted), and Confusion Matrix.
- Saves model pipeline to `nlp_intent_model.joblib`.
- Saves evaluation report to `nlp_intent_evaluation_report.json`.
"""

import sys
if sys.platform.startswith('win'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

import os
import json
import joblib
import numpy as np
import pandas as pd
from typing import Dict, Any

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import Pipeline, FeatureUnion
from sklearn.linear_model import LogisticRegression
from sklearn.svm import LinearSVC
from sklearn.naive_bayes import MultinomialNB
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    classification_report,
    confusion_matrix,
    accuracy_score,
    precision_score,
    recall_score,
    f1_score
)

from nlp_intent_dataset import INTENT_DATA, INTENT_LABELS


def build_feature_extractor():
    """
    Builds hybrid Word + Character boundary n-gram feature extractor.
    Phonetically robust for Roman Hinglish spelling variations and Devanagari Hindi.
    """
    word_vectorizer = TfidfVectorizer(
        ngram_range=(1, 2),
        analyzer='word',
        sublinear_tf=True,
        lowercase=True,
        min_df=1,
        token_pattern=r'(?u)\b\w+\b'
    )
    
    char_vectorizer = TfidfVectorizer(
        ngram_range=(2, 5),
        analyzer='char_wb',
        sublinear_tf=True,
        lowercase=True,
        min_df=1
    )
    
    return FeatureUnion([
        ('word_tfidf', word_vectorizer),
        ('char_tfidf', char_vectorizer)
    ])


def train_and_evaluate():
    print("=" * 70)
    print("TRAINING LENSCRAFT MULTILINGUAL NLP INTENT CLASSIFIER")
    print("=" * 70)

    # 1. Dataset Verification
    df = pd.DataFrame(INTENT_DATA)
    total_examples = len(df)
    print(f"\n[1] Dataset Loaded: {total_examples} labeled utterances")
    print("\nDistribution by Intent:")
    print(df['intent'].value_counts().to_string())
    print("\nDistribution by Language:")
    print(df['language'].value_counts().to_string())

    # Check for duplicates
    duplicates = df[df.duplicated(subset=['text'])]
    if len(duplicates) > 0:
        print(f"Warning: Found {len(duplicates)} duplicates. Removing...")
        df = df.drop_duplicates(subset=['text']).reset_index(drop=True)
    else:
        print("✓ No duplicate utterances found.")

    X = df['text'].values
    y = df['intent'].values

    # 2. Stratified Train/Test Split (80% Train, 20% Test)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y,
        test_size=0.20,
        random_state=42,
        stratify=y
    )
    print(f"\n[2] Data Split: {len(X_train)} Train samples, {len(X_test)} Test samples")

    # 3. Candidate Models Benchmarking
    candidate_classifiers = {
        "Logistic_Regression_Baseline": LogisticRegression(
            C=3.0,
            class_weight='balanced',
            max_iter=1000,
            random_state=42
        ),
        "Linear_SVC": LinearSVC(
            C=1.0,
            class_weight='balanced',
            random_state=42
        ),
        "Multinomial_Naive_Bayes": MultinomialNB(
            alpha=0.3
        ),
        "Random_Forest": RandomForestClassifier(
            n_estimators=120,
            class_weight='balanced',
            random_state=42
        )
    }

    benchmark_results = {}
    best_model_name = None
    best_f1 = -1.0
    best_pipeline = None

    print("\n[3] Benchmarking Candidate Classifiers with Word+Char FeatureUnion:")
    print("-" * 70)

    for name, clf in candidate_classifiers.items():
        feature_union = build_feature_extractor()
        pipe = Pipeline([
            ('features', feature_union),
            ('classifier', clf)
        ])

        pipe.fit(X_train, y_train)
        y_pred = pipe.predict(X_test)

        acc = accuracy_score(y_test, y_pred)
        prec = precision_score(y_test, y_pred, average='weighted', zero_division=0)
        rec = recall_score(y_test, y_pred, average='weighted', zero_division=0)
        f1 = f1_score(y_test, y_pred, average='weighted', zero_division=0)

        benchmark_results[name] = {
            "accuracy": round(float(acc), 4),
            "precision": round(float(prec), 4),
            "recall": round(float(rec), 4),
            "f1_score": round(float(f1), 4)
        }

        print(f"• {name:<30} | Acc: {acc*100:5.2f}% | Prec: {prec*100:5.2f}% | Rec: {rec*100:5.2f}% | F1: {f1:.4f}")

        if f1 > best_f1:
            best_f1 = f1
            best_model_name = name
            best_pipeline = pipe

    print("-" * 70)
    print(f"Best Performing Model: {best_model_name} (F1: {best_f1:.4f})")

    # 4. Detailed Evaluation for Best Model
    y_test_pred = best_pipeline.predict(X_test)
    cls_report = classification_report(
        y_test, y_test_pred,
        labels=INTENT_LABELS,
        target_names=INTENT_LABELS,
        output_dict=True,
        zero_division=0
    )

    conf_matrix = confusion_matrix(
        y_test, y_test_pred,
        labels=INTENT_LABELS
    ).tolist()

    print("\n[4] Classification Report (Test Set):")
    print(classification_report(y_test, y_test_pred, labels=INTENT_LABELS, target_names=INTENT_LABELS, zero_division=0))

    print("\nConfusion Matrix:")
    cm_df = pd.DataFrame(conf_matrix, index=INTENT_LABELS, columns=INTENT_LABELS)
    print(cm_df.to_string())

    # 5. Save Model and Evaluation Artifacts
    current_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(current_dir, "nlp_intent_model.joblib")
    report_path = os.path.join(current_dir, "nlp_intent_evaluation_report.json")

    joblib.dump(best_pipeline, model_path)
    print(f"\n✓ Saved trained pipeline artifact to: {model_path}")

    evaluation_summary = {
        "best_model_name": best_model_name,
        "total_dataset_size": len(df),
        "train_set_size": len(X_train),
        "test_set_size": len(X_test),
        "benchmark_comparison": benchmark_results,
        "test_metrics": {
            "accuracy": benchmark_results[best_model_name]["accuracy"],
            "precision_weighted": benchmark_results[best_model_name]["precision"],
            "recall_weighted": benchmark_results[best_model_name]["recall"],
            "f1_weighted": benchmark_results[best_model_name]["f1_score"]
        },
        "per_class_metrics": {
            label: {
                "precision": round(float(cls_report[label]["precision"]), 4),
                "recall": round(float(cls_report[label]["recall"]), 4),
                "f1_score": round(float(cls_report[label]["f1-score"]), 4),
                "support": int(cls_report[label]["support"])
            }
            for label in INTENT_LABELS if label in cls_report
        },
        "confusion_matrix": {
            "labels": INTENT_LABELS,
            "matrix": conf_matrix
        }
    }

    with open(report_path, "w", encoding="utf-8") as f:
        json.dump(evaluation_summary, f, indent=2, ensure_ascii=False)
    print(f"✓ Saved detailed evaluation report to: {report_path}")

    return best_pipeline, evaluation_summary


if __name__ == "__main__":
    train_and_evaluate()
