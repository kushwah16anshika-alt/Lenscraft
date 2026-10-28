"""
NLP Intent Classification & Entity Extraction Service for Lenscraft
Loads trained model pipeline and provides full inference with confidence scores and entities.
"""

import os
import joblib
import numpy as np
from typing import Dict, Any, List, Optional
from scipy.special import softmax

from nlp_entity_extractor import extract_all_entities
from nlp_intent_dataset import INTENT_LABELS

_model = None
MODEL_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "nlp_intent_model.joblib")


def load_intent_model():
    """Load trained NLP intent model pipeline into memory."""
    global _model
    if os.path.exists(MODEL_PATH):
        try:
            _model = joblib.load(MODEL_PATH)
            print(f"[OK] Lenscraft Multilingual Intent Model loaded from {MODEL_PATH}")
            return _model
        except Exception as e:
            print(f"⚠️ Error loading NLP intent model: {e}")
            _model = None
    else:
        print(f"⚠️ Intent model file not found at: {MODEL_PATH}")
        _model = None
    return _model


def get_model():
    global _model
    if _model is None:
        return load_intent_model()
    return _model


def predict_intent_and_entities(text: str) -> Dict[str, Any]:
    """
    Classify intent and extract structured entities from multilingual text.
    Handles English, Devanagari Hindi, and Roman Hinglish.
    """
    clean_text = str(text or "").strip()
    if not clean_text:
        return {
            "text": "",
            "intent": "unknown_or_unsupported",
            "confidence": 0.0,
            "isConfident": False,
            "allProbabilities": {label: 0.0 for label in INTENT_LABELS},
            "entities": extract_all_entities(""),
            "suggestedFollowUps": ["I need a wedding photographer in Bhopal under ₹15,000"]
        }

    # 1. Extract Entities separately
    entities = extract_all_entities(clean_text)

    # 2. Predict Intent
    model = get_model()
    
    if model is None:
        # Fallback heuristic if model is not loaded
        return _heuristic_fallback(clean_text, entities)

    try:
        # Check if classifier supports predict_proba or decision_function
        clf = model.named_steps.get('classifier', model)
        
        if hasattr(clf, "predict_proba"):
            probs = model.predict_proba([clean_text])[0]
            classes = model.classes_
        elif hasattr(clf, "decision_function"):
            scores = model.decision_function([clean_text])[0]
            probs = softmax(scores)
            classes = model.classes_
        else:
            pred = model.predict([clean_text])[0]
            probs = [1.0 if c == pred else 0.0 for c in model.classes_]
            classes = model.classes_

        prob_dict = {str(cls): round(float(prob), 4) for cls, prob in zip(classes, probs)}
        
        # Sort by probability descending
        sorted_intents = sorted(prob_dict.items(), key=lambda x: x[1], reverse=True)
        top_intent, top_confidence = sorted_intents[0]

        # Domain boundary adjustment: If user clearly asks for cost / rate / fees
        lower = clean_text.lower()
        if any(w in lower for w in ["kitna kharcha", "kitna paisa", "starting price", "rates kya hai", "rate list", "fees kitni"]):
            if top_intent == "photographer_search" and top_confidence < 0.85:
                top_intent = "pricing_question"
                top_confidence = 0.85

        is_confident = top_confidence >= 0.50

        # Dynamic suggested follow-ups based on intent and missing entities
        follow_ups = _generate_nlp_follow_ups(top_intent, entities)

        return {
            "text": clean_text,
            "intent": top_intent,
            "confidence": round(float(top_confidence), 4),
            "isConfident": is_confident,
            "allProbabilities": prob_dict,
            "entities": entities,
            "suggestedFollowUps": follow_ups
        }

    except Exception as e:
        print(f"⚠️ Error during intent inference: {e}")
        return _heuristic_fallback(clean_text, entities)


def _heuristic_fallback(text: str, entities: Dict[str, Any]) -> Dict[str, Any]:
    """Graceful rule-based fallback when model is unavailable."""
    lower = text.lower()
    
    if any(k in lower for k in ["book", "appointment", "schedule", "cancel", "reschedule", "तारीख"]):
        intent = "booking_help"
    elif any(k in lower for k in ["package", "pack", "deal", "bundle", "पैकेज", "inclusion"]):
        intent = "package_search"
    elif any(k in lower for k in ["price", "cost", "rate", "fees", "kharcha", "paisa", "rupaye", "कीमत", "खर्च"]):
        intent = "pricing_question"
    elif any(k in lower for k in ["lenscraft", "verify", "register", "about", "support", "help", "लेंसक्राफ्ट"]):
        intent = "general_lenscraft_help"
    elif entities.get("location") or entities.get("eventType") or any(k in lower for k in ["photographer", "videographer", "cameraman", "shoot", "chahiye"]):
        intent = "photographer_search"
    else:
        intent = "unknown_or_unsupported"

    return {
        "text": text,
        "intent": intent,
        "confidence": 0.70,
        "isConfident": True,
        "allProbabilities": {label: 0.1667 for label in INTENT_LABELS},
        "entities": entities,
        "suggestedFollowUps": _generate_nlp_follow_ups(intent, entities)
    }


def _generate_nlp_follow_ups(intent: str, entities: Dict[str, Any]) -> List[str]:
    """Generate contextual follow-ups based on detected intent and missing fields."""
    loc = entities.get("location") or "Bhopal"
    event = entities.get("eventType") or "Wedding"
    budget = entities.get("budget")
    
    if intent == "photographer_search":
        if not entities.get("budget"):
            return [
                f"Show {event} photographers in {loc} under ₹15,000",
                f"Top rated candid creators in {loc}",
                f"Compare wedding photographers in {loc}"
            ]
        return [
            f"What packages are available for {event}?",
            f"How does booking work on Lenscraft?",
            f"Show more creators in {loc}"
        ]

    if intent == "package_search":
        return [
            f"What are the inclusions in {event} packages?",
            f"Show packages under ₹20,000 in {loc}",
            "How do I book a package?"
        ]

    if intent == "pricing_question":
        return [
            f"What is the starting price for {event} photography?",
            f"Are travel charges included for {loc}?",
            "Show budget-friendly packages"
        ]

    if intent == "booking_help":
        return [
            "How long does creator confirmation take?",
            "What is the cancellation and refund policy?",
            f"Find photographers available for {event}"
        ]

    if intent == "general_lenscraft_help":
        return [
            "How are creators verified on Lenscraft?",
            "What cities does Lenscraft operate in?",
            "How do I register as a creator?"
        ]

    return [
        "Find a wedding photographer in Bhopal under ₹15,000",
        "What packages are available and what are their prices?",
        "How does booking work on Lenscraft?"
    ]
