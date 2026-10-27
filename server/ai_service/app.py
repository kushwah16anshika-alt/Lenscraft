"""
Lenscraft AI Photography Style Classification Microservice
Powered by Hugging Face Transformers & OpenAI CLIP (clip-vit-base-patch32)
"""

import io
import os
import requests
from typing import List, Optional
from fastapi import FastAPI, File, UploadFile, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
from PIL import Image
import torch
from transformers import CLIPProcessor, CLIPModel

app = FastAPI(
    title="Lenscraft Computer Vision Style Classifier",
    description="Zero-shot Photography Category Classifier using OpenAI CLIP",
    version="1.0.0",
)

# Enable CORS for internal cross-service calls
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model configuration
MODEL_ID = os.getenv("CLIP_MODEL_ID", "openai/clip-vit-base-patch32")
CONFIDENCE_THRESHOLD = float(os.getenv("CONFIDENCE_THRESHOLD", "0.35"))

print(f"Loading CLIP model: {MODEL_ID}...")
try:
    device = "cuda" if torch.cuda.is_available() else "cpu"
    model = CLIPModel.from_pretrained(MODEL_ID).to(device)
    processor = CLIPProcessor.from_pretrained(MODEL_ID)
    model.eval()
    print(f"✓ CLIP model loaded successfully on device: {device}")
except Exception as e:
    print(f"⚠️ Warning: Failed to pre-load CLIP model on startup: {e}")
    model = None
    processor = None
    device = "cpu"

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


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Lenscraft AI Photography Style Classifier",
        "model": MODEL_ID,
        "device": device,
    }


@app.post("/classify", response_model=ClassificationResponse)
async def classify_image(request: ClassificationRequest):
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
