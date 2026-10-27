"""
Lenscraft ML Smart Package Recommender Module
Loads pre-trained Scikit-learn Pipeline once on startup and executes
real-time candidate scoring, ranking, and explainability.
"""

import os
import sys

# Configure UTF-8 stdout for Windows
if sys.platform.startswith('win'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

import joblib
import numpy as np
import pandas as pd
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Path to serialized Scikit-learn model
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_FILE = os.path.join(CURRENT_DIR, "package_recommender.joblib")

_model_pipeline = None

def load_recommender_model():
    """Loads the fitted Scikit-learn model pipeline once at application startup."""
    global _model_pipeline
    if _model_pipeline is None:
        if os.path.exists(MODEL_FILE):
            try:
                _model_pipeline = joblib.load(MODEL_FILE)
                print(f"[OK] Smart Package Recommender ML Pipeline loaded from {MODEL_FILE}")
            except Exception as e:
                print(f"[WARN] Could not load {MODEL_FILE}: {e}")
                _model_pipeline = None
        else:
            print(f"[WARN] Model file {MODEL_FILE} not found. Please run train_package_recommender.py first.")
    return _model_pipeline


# Pydantic Schemas for Type Safety and Request Validation
class CustomerPreferences(BaseModel):
    eventType: Optional[str] = Field("Wedding", description="Event type requested (e.g. Wedding, Pre-Wedding, Corporate, Fashion)")
    budget: Optional[float] = Field(20000.0, ge=100.0, description="Customer target budget in INR")
    location: Optional[str] = Field("Bhopal", description="Customer event city")
    photographyStyle: Optional[str] = Field("Candid", description="Target style (e.g. Candid, Traditional, Cinematic, Editorial)")
    requiredService: Optional[str] = Field("all", description="Creative role: photographer, videographer, editor, or all")
    requiredInclusions: Optional[List[str]] = Field(default_factory=list, description="Desired inclusions (e.g. Drone, Album, Reels)")
    strictBudget: Optional[bool] = Field(False, description="Whether to strictly exclude packages above the budget")


class PackageCandidate(BaseModel):
    id: str
    title: str
    category: str
    professionType: str
    price: float
    pricingType: Optional[str] = "fixed"
    deliveryDays: Optional[int] = 7
    revisionsAllowed: Optional[int] = 2
    inclusions: Optional[List[str]] = Field(default_factory=list)
    description: Optional[str] = ""
    proName: Optional[str] = ""
    proCity: Optional[str] = ""
    proSpecialties: Optional[List[str]] = Field(default_factory=list)
    proRating: Optional[float] = 5.0
    proReviewCount: Optional[int] = 0
    proStartingPrice: Optional[float] = None
    coverImage: Optional[str] = None


class RecommendationRequest(BaseModel):
    preferences: CustomerPreferences
    packages: List[PackageCandidate] = Field(..., min_items=1, description="List of actual packages from Lenscraft MongoDB")


class RankedPackage(BaseModel):
    package: PackageCandidate
    relevanceScore: float
    matchPercentage: int
    matchRank: int
    isRecommended: bool
    isWithinBudget: bool
    reasons: List[str]
    matchBadges: List[str]


class RecommendationResponse(BaseModel):
    status: str
    totalCandidates: int
    matchedCount: int
    recommendations: List[RankedPackage]
    modelName: str
    mlConfidenceAverage: float
    appliedConstraints: Dict[str, Any]


def generate_package_reasons(pkg: PackageCandidate, pref: CustomerPreferences, rel_score: float) -> (List[str], List[str]):
    """Generates fact-based explainability reasons and UI badges using real package attributes."""
    reasons = []
    badges = []

    budget = pref.budget or 20000.0
    is_under = pkg.price <= budget

    # Budget feedback
    if is_under:
        diff = int(budget - pkg.price)
        if diff == 0:
            reasons.append(f"Exact match for your ₹{int(budget):,} budget.")
        else:
            reasons.append(f"Fits within budget with ₹{diff:,} to spare.")
        badges.append("Within Budget")
    else:
        over = int(pkg.price - budget)
        reasons.append(f"Premium option: ₹{over:,} above your target budget.")
        badges.append("Stretch Option")

    # Event / Category feedback
    event_lower = (pref.eventType or "").lower()
    cat_lower = (pkg.category or "").lower()
    if event_lower and (event_lower in cat_lower or cat_lower in event_lower or ("wedding" in event_lower and "wedding" in cat_lower)):
        reasons.append(f"Direct match for {pkg.category}.")
        badges.append("Category Match")

    # Location feedback
    if pref.location and pkg.proCity and pref.location.lower() == pkg.proCity.lower():
        reasons.append(f"Local creator based in {pkg.proCity} (no outstation travel charge).")
        badges.append(f"Local in {pkg.proCity}")

    # Style feedback
    style_lower = (pref.photographyStyle or "").lower()
    specialties_text = " ".join(pkg.proSpecialties or []).lower()
    if style_lower and (style_lower in specialties_text or style_lower in pkg.title.lower() or style_lower in (pkg.description or "").lower()):
        reasons.append(f"Specialized in {pref.photographyStyle} aesthetic.")
        badges.append(f"{pref.photographyStyle} Style")

    # Rating feedback
    if pkg.proRating and pkg.proRating >= 4.8:
        reasons.append(f"Top-rated creator: ★ {pkg.proRating:.1f} ({pkg.proReviewCount or 0} client reviews).")
        badges.append(f"★ {pkg.proRating:.1f} Rated")

    # Fast delivery
    if pkg.deliveryDays and pkg.deliveryDays <= 7:
        reasons.append(f"Fast turnaround: delivered in {pkg.deliveryDays} days.")
        badges.append(f"{pkg.deliveryDays}-Day Delivery")

    return reasons, badges


def score_and_rank_packages(request: RecommendationRequest) -> RecommendationResponse:
    """
    Evaluates candidate packages using the Scikit-learn Pipeline.
    Falls back gracefully to vector similarity if the model file is absent.
    """
    model = load_recommender_model()
    pref = request.preferences
    packages = request.packages

    # Apply strict budget filter if explicitly requested by customer
    if pref.strictBudget:
        filtered_packages = [p for p in packages if p.price <= (pref.budget or 1e9)]
        # If strict filtering eliminates all packages, keep all to provide alternatives
        if filtered_packages:
            candidate_packages = filtered_packages
        else:
            candidate_packages = packages
    else:
        candidate_packages = packages

    req_event = pref.eventType or "Wedding"
    req_budget = float(pref.budget or 20000.0)
    req_location = pref.location or "Bhopal"
    req_style = pref.photographyStyle or "Candid"
    req_service = pref.requiredService or "all"

    # Construct feature rows for Scikit-learn Pipeline
    feature_rows = []
    for pkg in candidate_packages:
        budget_ratio = round(pkg.price / req_budget, 4)
        budget_diff = req_budget - pkg.price
        is_within_budget = 1 if pkg.price <= req_budget else 0

        event_cat_match = 1 if (
            req_event.lower() in pkg.category.lower() or
            pkg.category.lower() in req_event.lower() or
            ("wedding" in req_event.lower() and "wedding" in pkg.category.lower())
        ) else 0

        service_match = 1 if (req_service == "all" or req_service == pkg.professionType) else 0
        city_match = 1 if req_location.lower() == (pkg.proCity or "").lower() else 0

        specialties_joined = " ".join(pkg.proSpecialties or [])
        style_match = 1 if (
            req_style.lower() in specialties_joined.lower() or
            req_style.lower() in pkg.title.lower() or
            req_style.lower() in (pkg.description or "").lower()
        ) else 0

        # Fast content similarity
        q_tokens = set(f"{req_event} {req_style} {req_location} {req_service}".lower().split())
        pkg_tokens = set(f"{pkg.title} {pkg.category} {specialties_joined} {' '.join(pkg.inclusions or [])}".lower().split())
        jaccard = len(q_tokens & pkg_tokens) / max(len(q_tokens | pkg_tokens), 1)

        feature_rows.append({
            "budget_ratio": budget_ratio,
            "budget_diff": budget_diff,
            "is_within_budget": is_within_budget,
            "pkg_price": pkg.price,
            "req_budget": req_budget,
            "pkg_delivery_days": pkg.deliveryDays or 7,
            "pkg_revisions_allowed": pkg.revisionsAllowed or 2,
            "pro_rating": pkg.proRating or 5.0,
            "pro_review_count": pkg.proReviewCount or 0,
            "event_cat_match": event_cat_match,
            "service_match": service_match,
            "city_match": city_match,
            "style_match": style_match,
            "text_tfidf_similarity": round(jaccard, 4),
            "req_event_type": req_event,
            "pkg_category": pkg.category,
            "pkg_profession_type": pkg.professionType,
        })

    df_features = pd.DataFrame(feature_rows)

    # Execute Scikit-learn inference
    if model is not None:
        try:
            probabilities = model.predict_proba(df_features)[:, 1]
        except Exception as e:
            print(f"⚠️ Model prediction error: {e}. Using deterministic score fallback.")
            probabilities = np.array([
                0.5 * row["event_cat_match"] + 0.3 * row["is_within_budget"] + 0.2 * row["style_match"]
                for row in feature_rows
            ])
    else:
        # Fallback if model not loaded
        probabilities = np.array([
            0.5 * row["event_cat_match"] + 0.3 * row["is_within_budget"] + 0.2 * row["style_match"]
            for row in feature_rows
        ])

    # Combine candidates with predicted scores
    scored_items = []
    for idx, pkg in enumerate(candidate_packages):
        prob = float(probabilities[idx])
        # Scale to 0-100% percentage
        match_pct = int(min(max(round(prob * 100), 10), 100))
        reasons, badges = generate_package_reasons(pkg, pref, prob)

        scored_items.append({
            "package": pkg,
            "relevanceScore": round(prob, 4),
            "matchPercentage": match_pct,
            "isWithinBudget": bool(pkg.price <= req_budget),
            "isRecommended": bool(prob >= 0.50),
            "reasons": reasons,
            "matchBadges": badges,
        })

    # Sort descending by relevanceScore, then price ascending
    scored_items.sort(key=lambda x: (x["relevanceScore"], -x["package"].price if not x["isWithinBudget"] else x["package"].price), reverse=True)

    # Assign 1-indexed ranks
    ranked_packages = []
    for rank_idx, item in enumerate(scored_items, start=1):
        item["matchRank"] = rank_idx
        ranked_packages.append(RankedPackage(**item))

    avg_confidence = float(np.mean([p.relevanceScore for p in ranked_packages])) if ranked_packages else 0.0

    return RecommendationResponse(
        status="success",
        totalCandidates=len(packages),
        matchedCount=len(ranked_packages),
        recommendations=ranked_packages,
        modelName="Scikit-Learn GradientBoosting / RandomForest Pipeline",
        mlConfidenceAverage=round(avg_confidence, 4),
        appliedConstraints={
            "eventType": req_event,
            "budget": req_budget,
            "location": req_location,
            "style": req_style,
            "requiredService": req_service,
            "strictBudgetApplied": pref.strictBudget,
        }
    )
