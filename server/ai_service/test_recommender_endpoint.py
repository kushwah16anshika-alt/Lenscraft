"""
Test script for verifying FastAPI Smart Package Recommendation endpoint
"""

import sys
if sys.platform.startswith('win'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

from fastapi.testclient import TestClient
from app import app
from generate_dataset import REAL_PACKAGES

client = TestClient(app)

def test_health():
    res = client.get("/health")
    assert res.status_code == 200, f"Health check failed with {res.status_code}"
    data = res.json()
    assert data["smart_recommender_status"] == "loaded", "Recommender model should be loaded"
    print("[OK] Health endpoint passed:", data)

def test_recommendation_ranking():
    # Scenario 1: Customer wants Candid Wedding Photographer in Bhopal under Rs. 15,000
    payload = {
        "preferences": {
            "eventType": "Wedding",
            "budget": 15000,
            "location": "Bhopal",
            "photographyStyle": "Candid",
            "requiredService": "photographer",
            "strictBudget": True
        },
        "packages": REAL_PACKAGES
    }

    res = client.post("/recommend/packages", json=payload)
    assert res.status_code == 200, f"Rec failed with {res.status_code}: {res.text}"
    data = res.json()

    print("\n[OK] Package Recommendations received:")
    print(f"Total candidates: {data['totalCandidates']}, Evaluated: {data['matchedCount']}")
    print(f"Model used: {data['modelName']}")

    top = data["recommendations"][0]
    top_pkg = top["package"]
    print(f"\nTop Recommendation (#1):")
    print(f"  Package: {top_pkg['title']}")
    print(f"  Creator: {top_pkg['proName']} ({top_pkg['proCity']})")
    print(f"  Price: Rs. {top_pkg['price']:,}")
    print(f"  ML Relevance Score: {top['relevanceScore'] * 100:.1f}%")
    print(f"  Match Badges: {top['matchBadges']}")
    print(f"  Reasons: {top['reasons']}")

    # Verify constraints
    assert top["isWithinBudget"] is True, "Top package must be within budget"
    assert top_pkg["price"] <= 15000, f"Top package price {top_pkg['price']} exceeds budget 15000"
    assert "Wedding" in top_pkg["category"], f"Category must be Wedding, got {top_pkg['category']}"

    # Scenario 2: Empty candidates list should return HTTP 422 or 400 (validation error)
    res_empty = client.post("/recommend/packages", json={"preferences": {}, "packages": []})
    assert res_empty.status_code in [400, 422], f"Expected 400 or 422 for empty packages, got {res_empty.status_code}"
    print(f"\n[OK] Correctly rejected empty candidate list with HTTP {res_empty.status_code}")

    # Scenario 3: Non-wedding inquiry (Viral Reels Editor in Delhi under 10k)
    payload_reels = {
        "preferences": {
            "eventType": "Reels & Short-Form Video",
            "budget": 10000,
            "location": "Delhi",
            "photographyStyle": "Modern",
            "requiredService": "editor",
            "strictBudget": False
        },
        "packages": REAL_PACKAGES
    }

    res_reels = client.post("/recommend/packages", json=payload_reels)
    assert res_reels.status_code == 200
    reels_data = res_reels.json()
    top_reels = reels_data["recommendations"][0]
    print(f"\nTop Recommendation for Reels:")
    print(f"  Package: {top_reels['package']['title']} (Price: Rs. {top_reels['package']['price']})")
    print(f"  Creator: {top_reels['package']['proName']}")
    print(f"  ML Relevance Score: {top_reels['relevanceScore'] * 100:.1f}%")
    assert "Reels" in top_reels["package"]["title"], "Top package for reels should be reels editing"

    print("\n[OK] All Python inference tests PASSED successfully!")

if __name__ == "__main__":
    test_health()
    test_recommendation_ranking()
