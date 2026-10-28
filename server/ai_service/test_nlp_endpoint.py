"""
Test Suite for Lenscraft Multilingual NLP Intent Classifier & Entity Extraction Endpoint
Tests English, Devanagari Hindi, and Roman Hinglish across all 6 intents and entity variations.
"""

import sys
if sys.platform.startswith('win'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

from fastapi.testclient import TestClient
from app import app

client = TestClient(app)


def test_nlp_health_and_info():
    res_health = client.get("/health")
    assert res_health.status_code == 200
    data = res_health.json()
    assert data["multilingual_nlp_intent_status"] == "loaded", "NLP model should be loaded"
    print("✓ [Health] NLP status is loaded.")

    res_info = client.get("/nlp/info")
    assert res_info.status_code == 200
    info = res_info.json()
    assert info["status"] == "ready"
    assert "photographer_search" in info["intents"]
    assert "hinglish" in info["supportedLanguages"]
    print("✓ [Info] NLP metadata returned correctly.")


def test_english_inquiry():
    # Scenario: Wedding photographer in Bhopal under 15000
    payload = {"text": "I need a candid wedding photographer in Bhopal under 15000"}
    res = client.post("/nlp/classify-intent", json=payload)
    assert res.status_code == 200
    data = res.json()
    
    assert data["intent"] == "photographer_search", f"Expected photographer_search, got {data['intent']}"
    assert data["isConfident"] is True
    assert data["entities"]["location"] == "Bhopal"
    assert data["entities"]["eventType"] == "Wedding"
    assert data["entities"]["budget"] == 15000
    assert data["entities"]["photographyStyle"] == "Candid"
    assert data["entities"]["detectedLanguage"] == "en"
    print(f"✓ [English] Correctly classified {data['intent']} with confidence {data['confidence']*100:.1f}%.")


def test_hinglish_inquiries():
    # 1. Photographer search with shorthand budget "15k"
    payload1 = {"text": "mujhe bhopal me wedding photographer chahiye 15k ke andar"}
    res1 = client.post("/nlp/classify-intent", json=payload1)
    assert res1.status_code == 200
    data1 = res1.json()
    assert data1["intent"] == "photographer_search"
    assert data1["entities"]["location"] == "Bhopal"
    assert data1["entities"]["budget"] == 15000
    assert data1["entities"]["detectedLanguage"] == "hinglish"
    print("✓ [Hinglish 1] '15k ke andar' parsed as ₹15,000 and classified as photographer_search.")

    # 2. Hindi word number budget "15 hazaar"
    payload2 = {"text": "indore me shadi ke liye 15 hazaar tak photographer mil jayega?"}
    res2 = client.post("/nlp/classify-intent", json=payload2)
    assert res2.status_code == 200
    data2 = res2.json()
    assert data2["intent"] == "photographer_search"
    assert data2["entities"]["location"] == "Indore"
    assert data2["entities"]["budget"] == 15000
    print("✓ [Hinglish 2] '15 hazaar' parsed as ₹15,000 and classified as photographer_search.")

    # 3. Booking Help intent
    payload3 = {"text": "lenscraft par photographer kaise book kare step by step?"}
    res3 = client.post("/nlp/classify-intent", json=payload3)
    assert res3.status_code == 200
    data3 = res3.json()
    assert data3["intent"] == "booking_help", f"Expected booking_help, got {data3['intent']}"
    print(f"✓ [Hinglish 3] Booking process query classified as {data3['intent']}.")

    # 4. Pricing Question intent
    payload4 = {"text": "wedding photography ka ek din ka kitna kharcha aayega?"}
    res4 = client.post("/nlp/classify-intent", json=payload4)
    assert res4.status_code == 200
    data4 = res4.json()
    assert data4["intent"] == "pricing_question", f"Expected pricing_question, got {data4['intent']}"
    print(f"✓ [Hinglish 4] Rate query classified as {data4['intent']}.")


def test_hindi_devanagari():
    # 1. Hindi photographer search
    payload1 = {"text": "मुझे भोपाल में शादी के लिए फोटोग्राफर चाहिए"}
    res1 = client.post("/nlp/classify-intent", json=payload1)
    assert res1.status_code == 200
    data1 = res1.json()
    assert data1["intent"] == "photographer_search"
    assert data1["entities"]["location"] == "Bhopal"
    assert data1["entities"]["eventType"] == "Wedding"
    assert data1["entities"]["detectedLanguage"] == "hi"
    print("✓ [Hindi 1] Devanagari query classified as photographer_search with location Bhopal.")

    # 2. Hindi package search
    payload2 = {"text": "वेडिंग फोटोग्राफी के कौन से पैकेज उपलब्ध हैं?"}
    res2 = client.post("/nlp/classify-intent", json=payload2)
    assert res2.status_code == 200
    data2 = res2.json()
    assert data2["intent"] == "package_search"
    print("✓ [Hindi 2] Devanagari package inquiry classified as package_search.")


def test_general_help_and_unknown():
    # 1. General Lenscraft Help
    payload_help = {"text": "lenscraft kya hai aur ye platform kaise kaam karta hai?"}
    res_help = client.post("/nlp/classify-intent", json=payload_help)
    assert res_help.status_code == 200
    data_help = res_help.json()
    assert data_help["intent"] == "general_lenscraft_help"
    print("✓ [General Help] Platform inquiry classified as general_lenscraft_help.")

    # 2. Unknown / Out-of-domain (weather)
    payload_unknown = {"text": "What is the weather forecast in Mumbai today?"}
    res_unknown = client.post("/nlp/classify-intent", json=payload_unknown)
    assert res_unknown.status_code == 200
    data_unknown = res_unknown.json()
    assert data_unknown["intent"] == "unknown_or_unsupported"
    print("✓ [Unknown] Out-of-domain query classified as unknown_or_unsupported.")


def test_validation_and_missing_entities():
    # Empty string should return 400
    res_empty = client.post("/nlp/classify-intent", json={"text": "   "})
    assert res_empty.status_code == 400
    print("✓ [Validation] Empty query rejected with HTTP 400.")

    # Query with missing budget & location
    res_incomplete = client.post("/nlp/classify-intent", json={"text": "I need a photographer"})
    assert res_incomplete.status_code == 200
    data_incomplete = res_incomplete.json()
    assert "location" in data_incomplete["entities"]["missingEntities"]
    assert "budget" in data_incomplete["entities"]["missingEntities"]
    print(f"✓ [Missing Entities] Correctly identified missing entities: {data_incomplete['entities']['missingEntities']}.")


if __name__ == "__main__":
    print("\n=======================================================")
    print("🧪 RUNNING MULTILINGUAL NLP FASTAPI TEST SUITE")
    print("=======================================================\n")
    test_nlp_health_and_info()
    test_english_inquiry()
    test_hinglish_inquiries()
    test_hindi_devanagari()
    test_general_help_and_unknown()
    test_validation_and_missing_entities()
    print("\n🎉 ALL PYTHON NLP ENDPOINT TESTS PASSED SUCCESSFULLY!\n")
