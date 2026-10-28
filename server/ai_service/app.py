"""
Lenscraft AI & ML Microservice
1. Zero-shot Photography Category Classifier (CLIP / Hugging Face)
2. Scikit-learn Smart Package Recommendation Engine
"""

import io
import os
import sys
import requests
from typing import List, Optional
from fastapi import FastAPI, File, UploadFile, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl

# Import Smart Recommender module
from smart_recommender import (
    load_recommender_model,
    score_and_rank_packages,
    RecommendationRequest,
    RecommendationResponse,
)

# Import Multilingual NLP Intent Service module
from nlp_intent_service import (
    load_intent_model,
    predict_intent_and_entities,
    INTENT_LABELS,
)

# Optional PyTorch & CLIP imports with graceful degradation
try:
    from PIL import Image
    import torch
    from transformers import CLIPProcessor, CLIPModel
    TORCH_AVAILABLE = True
except ImportError:
    TORCH_AVAILABLE = False
    Image = None
    torch = None
    CLIPProcessor = None
    CLIPModel = None

app = FastAPI(
    title="Lenscraft AI & ML Service",
    description="Photography Style Classifier & Scikit-learn Smart Package Recommender",
    version="2.0.0",
)

# Enable CORS for internal cross-service calls
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pre-load Scikit-learn Smart Recommender model at startup
load_recommender_model()

# Pre-load Scikit-learn Multilingual NLP Intent model at startup
load_intent_model()

# Model configuration for CLIP
MODEL_ID = os.getenv("CLIP_MODEL_ID", "openai/clip-vit-base-patch32")
CONFIDENCE_THRESHOLD = float(os.getenv("CONFIDENCE_THRESHOLD", "0.35"))

model = None
processor = None
device = "cpu"

if TORCH_AVAILABLE:
    print(f"Loading CLIP model: {MODEL_ID}...")
    try:
        device = "cuda" if torch.cuda.is_available() else "cpu"
        model = CLIPModel.from_pretrained(MODEL_ID).to(device)
        processor = CLIPProcessor.from_pretrained(MODEL_ID)
        model.eval()
        print(f"[OK] CLIP model loaded successfully on device: {device}")
    except Exception as e:
        print(f"[WARN] Failed to pre-load CLIP model on startup: {e}")
        model = None
        processor = None
        device = "cpu"
else:
    print("ℹ️ PyTorch / Transformers not installed in current environment; CLIP image classification will use cloud fallback.")

# Supported photography categories & corresponding domain-tailored prompts
CATEGORY_PROMPTS = [
    {
        "category": "Wedding photography",
        "prompt": "a wedding photograph of a bride, groom, marriage ceremony, or wedding celebration",
    },
    {
        "category": "Portrait photography",
        "prompt": "a portrait photograph focusing on a person's face, headshot, or individual expression",
    },
    {
        "category": "Fashion photography",
        "prompt": "a fashion photography photoshoot of a model wearing stylish clothing, haute couture, or editorial outfit",
    },
    {
        "category": "Nature and landscape photography",
        "prompt": "a nature and landscape photograph of scenic mountains, forests, oceans, sunsets, or wildlife",
    },
    {
        "category": "Product photography",
        "prompt": "a commercial product photograph for advertising, packshot, e-commerce merchandise, or jewelry",
    },
    {
        "category": "Event photography",
        "prompt": "an event photograph capturing a live concert, corporate conference, party, or festival celebration",
    },
    {
        "category": "Food photography",
        "prompt": "a food and culinary beverage photograph of gourmet dishes, restaurant plating, or drinks",
    },
    {
        "category": "Architecture and interior photography",
        "prompt": "an architecture and interior design photograph of buildings, rooms, structures, or modern facades",
    },
    {
        "category": "Other or uncertain",
        "prompt": "an abstract, texture, blurry, unclassifiable, or other photograph",
    },
]

PROMPT_TEXTS = [item["prompt"] for item in CATEGORY_PROMPTS]
CATEGORIES = [item["category"] for item in CATEGORY_PROMPTS]


class ClassificationRequest(BaseModel):
    imageUrl: Optional[str] = None


class PredictionResult(BaseModel):
    category: str
    confidence: float


class ClassificationResponse(BaseModel):
    suggestedCategory: str
    confidence: float
    needsReview: bool
    allPredictions: List[PredictionResult]
    modelName: str


def run_clip_inference(pil_image: Image.Image) -> ClassificationResponse:
    global model, processor, device
    if model is None or processor is None:
        device = "cuda" if torch.cuda.is_available() else "cpu"
        model = CLIPModel.from_pretrained(MODEL_ID).to(device)
        processor = CLIPProcessor.from_pretrained(MODEL_ID)
        model.eval()

    # Preprocess image
    image = pil_image.convert("RGB")
    inputs = processor(
        text=PROMPT_TEXTS,
        images=image,
        return_tensors="pt",
        padding=True
    ).to(device)

    with torch.no_grad():
        outputs = model(**inputs)
        logits_per_image = outputs.logits_per_image  # shape: (1, num_prompts)
        probs = logits_per_image.softmax(dim=1).squeeze().tolist()

    # Pair probabilities with category names
    predictions = [
        {"category": cat, "confidence": round(float(prob), 4)}
        for cat, prob in zip(CATEGORIES, probs)
    ]
    # Sort descending by confidence
    predictions.sort(key=lambda x: x["confidence"], reverse=True)

    top_pred = predictions[0]
    needs_review = False

    # Uncertainty handling
    if top_pred["category"] == "Other or uncertain" or top_pred["confidence"] < CONFIDENCE_THRESHOLD:
        suggested_category = "Other or uncertain"
        needs_review = True
    else:
        suggested_category = top_pred["category"]
        if top_pred["confidence"] < 0.50:
            needs_review = True

    return ClassificationResponse(
        suggestedCategory=suggested_category,
        confidence=top_pred["confidence"],
        needsReview=needs_review,
        allPredictions=[PredictionResult(**p) for p in predictions],
        modelName=MODEL_ID,
    )


class IntentClassificationRequest(BaseModel):
    text: str


class IntentClassificationResponse(BaseModel):
    text: str
    intent: str
    confidence: float
    isConfident: bool
    allProbabilities: dict
    entities: dict
    suggestedFollowUps: List[str]


@app.get("/health")
def health_check():
    rec_model = load_recommender_model()
    nlp_model = load_intent_model()
    return {
        "status": "healthy",
        "service": "Lenscraft AI & ML Microservice",
        "clip_model": MODEL_ID if TORCH_AVAILABLE and model is not None else "cloud_fallback",
        "smart_recommender_status": "loaded" if rec_model is not None else "unloaded",
        "multilingual_nlp_intent_status": "loaded" if nlp_model is not None else "unloaded",
        "device": device,
    }


@app.post("/nlp/classify-intent", response_model=IntentClassificationResponse)
async def classify_intent(request: IntentClassificationRequest):
    """
    Multilingual NLP Intent Classification & Entity Extraction
    Supports English, Devanagari Hindi, and Roman Hinglish.
    """
    if not request.text or request.text.strip() == "":
        raise HTTPException(status_code=400, detail="Query text cannot be empty.")

    try:
        result = predict_intent_and_entities(request.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"NLP intent classification error: {str(e)}")


@app.get("/nlp/info")
def nlp_info():
    """Returns metadata about the Multilingual Intent Classification model."""
    nlp_model = load_intent_model()
    return {
        "status": "ready" if nlp_model is not None else "unavailable",
        "intents": INTENT_LABELS,
        "supportedLanguages": ["en", "hi", "hinglish"],
        "supportedEntities": ["eventType", "location", "budget", "photographyStyle", "requiredService"],
        "algorithm": "FeatureUnion(Word TF-IDF + Char TF-IDF) -> LinearSVC"
    }


@app.post("/recommend/packages", response_model=RecommendationResponse)
async def recommend_packages(request: RecommendationRequest):
    """
    Ranks real Lenscraft packages using the trained Scikit-learn Pipeline
    based on customer budget, event type, location, style, and required services.
    """
    if not request.packages or len(request.packages) == 0:
        raise HTTPException(status_code=400, detail="Package candidate list cannot be empty.")

    try:
        response = score_and_rank_packages(request)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Recommendation engine error: {str(e)}")


@app.post("/classify", response_model=ClassificationResponse)
async def classify_image(request: ClassificationRequest):
    if not TORCH_AVAILABLE or model is None:
        raise HTTPException(status_code=503, detail="Local CLIP classifier unavailable; please use cloud inference fallback.")

    if not request.imageUrl:
        raise HTTPException(status_code=400, detail="Missing imageUrl parameter")

    try:
        response = requests.get(request.imageUrl, timeout=10)
        response.raise_for_status()
        pil_image = Image.open(io.BytesIO(response.content))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to fetch or parse image: {str(e)}")

    return run_clip_inference(pil_image)


@app.post("/classify/upload", response_model=ClassificationResponse)
async def classify_uploaded_image(file: UploadFile = File(...)):
    if not TORCH_AVAILABLE or model is None:
        raise HTTPException(status_code=503, detail="Local CLIP classifier unavailable; please use cloud inference fallback.")

    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    try:
        contents = await file.read()
        pil_image = Image.open(io.BytesIO(contents))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to read uploaded image: {str(e)}")

    return run_clip_inference(pil_image)


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("app:app", host="0.0.0.0", port=port, reload=True)
