"""
Multilingual Entity Extractor for Lenscraft Photography Marketplace
Extracts structured search entities from English, Hindi, and Hinglish queries:
- event_type (Wedding, Pre-Wedding, Portrait, Birthday, etc.)
- location (Bhopal, Indore, Mumbai, Delhi, Bengaluru, etc.)
- budget (Numbers, 15k, 15 hazaar, 15k tak, 15000 ke andar, etc.)
- photography_style (Candid, Cinematic, Traditional, Editorial, etc.)
- required_service (Photographer, Videographer, Editor)
- detected_language (en, hi, hinglish)
"""

import re
from typing import Dict, Any, Optional, List

# City mappings covering English, Romanized variations, and Devanagari script
CITY_MAPPINGS = {
    # Bhopal
    "bhopal": "Bhopal",
    "भोपाल": "Bhopal",
    
    # Indore
    "indore": "Indore",
    "इंदौर": "Indore",
    
    # Mumbai
    "mumbai": "Mumbai",
    "bombay": "Mumbai",
    "मुंबई": "Mumbai",
    
    # Delhi
    "delhi": "Delhi",
    "new delhi": "Delhi",
    "dilli": "Delhi",
    "दिल्ली": "Delhi",
    
    # Bengaluru
    "bengaluru": "Bengaluru",
    "bangalore": "Bengaluru",
    "बैंगलोर": "Bengaluru",
    "बेंगलुरु": "Bengaluru",
    
    # Jaipur
    "jaipur": "Jaipur",
    "जयपुर": "Jaipur",
    
    # Goa
    "goa": "Goa",
    "गोवा": "Goa",
    
    # Pune
    "pune": "Pune",
    "पुणे": "Pune",
    
    # Udaipur
    "udaipur": "Udaipur",
    "उदयपुर": "Udaipur",
    
    # Hyderabad
    "hyderabad": "Hyderabad",
    "हैदराबाद": "Hyderabad",
    
    # Kolkata
    "kolkata": "Kolkata",
    "calcutta": "Kolkata",
    "कोलकाता": "Kolkata",
    
    # Chandigarh
    "chandigarh": "Chandigarh",
    "चंडीगढ़": "Chandigarh"
}

# Event Type mappings
EVENT_TYPE_MAPPINGS = {
    "wedding": "Wedding",
    "marriage": "Wedding",
    "shaadi": "Wedding",
    "shadi": "Wedding",
    "vivah": "Wedding",
    "शादी": "Wedding",
    "विवाह": "Wedding",
    
    "pre-wedding": "Pre-Wedding",
    "prewedding": "Pre-Wedding",
    "pre wedding": "Pre-Wedding",
    "प्री वेडिंग": "Pre-Wedding",
    
    "engagement": "Pre-Wedding",
    "sagayi": "Pre-Wedding",
    "rokha": "Pre-Wedding",
    "roka": "Pre-Wedding",
    "सगाई": "Pre-Wedding",
    
    "portrait": "Portrait",
    "portraits": "Portrait",
    "headshot": "Portrait",
    "model shoot": "Portrait",
    "पोर्ट्रेट": "Portrait",
    
    "birthday": "Birthday",
    "bday": "Birthday",
    "anniversary": "Birthday",
    "janmadin": "Birthday",
    "janamdin": "Birthday",
    "जन्मदिन": "Birthday",
    
    "reels": "Reels & Short-Form Video",
    "shorts": "Reels & Short-Form Video",
    "tiktok": "Reels & Short-Form Video",
    "short video": "Reels & Short-Form Video",
    "रील्स": "Reels & Short-Form Video",
    
    "commercial": "Commercial",
    "product": "Commercial",
    "brand": "Commercial",
    "विज्ञापन": "Commercial",
    
    "fashion": "Fashion",
    "फैशन": "Fashion",
    
    "drone": "Drone",
    "aerial": "Drone",
    "ड्रोन": "Drone"
}

# Style mappings
STYLE_MAPPINGS = {
    "candid": "Candid",
    "कैंडिड": "Candid",
    "traditional": "Traditional",
    "paramparik": "Traditional",
    "पारंपरिक": "Traditional",
    "cinematic": "Cinematic",
    "filmi": "Cinematic",
    "सिनेमैटिक": "Cinematic",
    "editorial": "Editorial",
    "एडिटोरियल": "Editorial",
    "modern": "Modern",
    "drone": "Drone"
}

# Service role mappings
SERVICE_ROLE_MAPPINGS = {
    "videographer": "videographer",
    "videography": "videographer",
    "cameraman": "photographer",
    "photographer": "photographer",
    "photography": "photographer",
    "editor": "editor",
    "editing": "editor",
    "video editor": "editor",
    "reels editor": "editor",
    "cinematographer": "videographer",
    "फोटोग्राफर": "photographer",
    "वीडियोग्राफर": "videographer",
    "एडिटर": "editor"
}

# Hindi number words for budget parsing
HINDI_NUMBER_WORDS = {
    "ek": 1,
    "do": 2,
    "teen": 3,
    "char": 4,
    "paanch": 5,
    "panch": 5,
    "chhah": 6,
    "saat": 7,
    "aath": 8,
    "nau": 9,
    "dus": 10,
    "das": 10,
    "gyarah": 11,
    "barah": 12,
    "terah": 13,
    "chaudah": 14,
    "pandrah": 15,
    "solah": 16,
    "satrah": 17,
    "atharah": 18,
    "unnees": 19,
    "bees": 20,
    "pachees": 25,
    "tees": 30,
    "paintis": 35,
    "chalis": 40,
    "pachas": 50,
    "साठ": 60,
    "सत्तर": 70,
    "अस्सी": 80,
    "नब्बे": 90,
    "दस": 10,
    "पंद्रह": 15,
    "बीस": 20,
    "पच्चीस": 25,
    "तीस": 30,
    "पचास": 50,
    "एक": 1,
    "दो": 2
}


def detect_language(text: str) -> str:
    """Detect if text is Devanagari Hindi, Roman Hinglish, or English."""
    # Check for Devanagari unicode range \u0900 - \u097F
    if re.search(r'[\u0900-\u097f]', text):
        return "hi"
    
    # Check for Romanized Hindi keywords
    hinglish_markers = [
        "chahiye", "chaiye", "shadi", "shaadi", "mujhe", "karna", "kaun",
        "hazaar", "hazar", "hajar", "paisa", "rupaye", "rupay", "batao",
        "dhundo", "mil", "saste", "andar", "kharcha", "kaise", "karte",
        "suno", "hai", "kya", "me", "mein", "aur", "pehle", "hota"
    ]
    lower = text.lower()
    words = set(re.findall(r'\b[a-z]+\b', lower))
    if any(marker in words for marker in hinglish_markers):
        return "hinglish"
    
    return "en"


def extract_budget(text: str) -> Optional[float]:
    """
    Extract budget with support for:
    - 15000, 15,000, Rs. 15000, ₹15,000
    - 15k, 25k, 50k
    - 15 hazaar, 15 hazar, 15 hajar, 15 हजार
    - 1.5 lakh, 2 lakh
    - pandrah hazaar, bees hazaar, das hazaar
    - 15k tak, 15000 ke andar, under 15000
    """
    clean = text.lower().replace(",", "")
    
    # 1. Check for word-based numbers like "pandrah hazaar" or "bees hazaar"
    for word, num in HINDI_NUMBER_WORDS.items():
        pattern = rf'\b{word}\s*(?:hazaar|hazar|hajar|हजार|k|lakh|लाख)\b'
        match = re.search(pattern, clean)
        if match:
            matched_str = match.group(0)
            if "lakh" in matched_str or "लाख" in matched_str:
                return float(num * 100000)
            return float(num * 1000)
    
    # 2. Check for patterns like "15k", "15.5k", "15 k"
    k_match = re.search(r'\b([0-9]+(?:\.[0-9]+)?)\s*k\b', clean)
    if k_match:
        return float(k_match.group(1)) * 1000
        
    # 3. Check for patterns like "1.5 lakh", "2 lakh", "2 लाख"
    lakh_match = re.search(r'\b([0-9]+(?:\.[0-9]+)?)\s*(?:lakh|lac|लाख)\b', clean)
    if lakh_match:
        return float(lakh_match.group(1)) * 100000
        
    # 4. Check for patterns like "15 hazaar", "15 hazar", "15 हजार", "15 thousand"
    hazar_match = re.search(r'\b([0-9]+)\s*(?:hazaar|hazar|hajar|thousand|हजार)\b', clean)
    if hazar_match:
        return float(hazar_match.group(1)) * 1000
        
    # 5. Check for rupee symbols or prefix / suffix contexts:
    # "under 15000", "₹15000", "rs 15000", "15000 tak", "15000 me", "15000 rupaye"
    currency_patterns = [
        r'(?:₹|rs\.?|inr)\s*([0-9]{3,7})\b',
        r'(?:under|below|budget of|upto|up to|less than|max)\s*([0-9]{3,7})\b',
        r'\b([0-9]{3,7})\s*(?:tak|ke andar|rupaye|rupay|रुपये|तक)\b',
        r'\b([0-9]{4,6})\b'  # Generic 4 to 6 digit numbers (e.g. 15000, 25000)
    ]
    for cp in currency_patterns:
        m = re.search(cp, clean)
        if m:
            val = float(m.group(1))
            # Validate reasonable budget range (₹1,000 to ₹10,00,000)
            if 1000 <= val <= 1000000:
                return val
                
    return None


def extract_location(text: str) -> Optional[str]:
    """Extract supported city from text."""
    lower = text.lower()
    for pattern, canonical in CITY_MAPPINGS.items():
        # Match as whole word or with punctuation
        regex = rf'(?:^|[\s,.\-/?!]){re.escape(pattern)}(?:$|[\s,.\-/?!])'
        if re.search(regex, lower):
            return canonical
    return None


def extract_event_type(text: str) -> Optional[str]:
    """Extract event type."""
    lower = text.lower()
    for pattern, canonical in EVENT_TYPE_MAPPINGS.items():
        regex = rf'(?:^|[\s,.\-/?!]){re.escape(pattern)}(?:$|[\s,.\-/?!])'
        if re.search(regex, lower):
            return canonical
    return None


def extract_photography_style(text: str) -> Optional[str]:
    """Extract photography style."""
    lower = text.lower()
    for pattern, canonical in STYLE_MAPPINGS.items():
        regex = rf'(?:^|[\s,.\-/?!]){re.escape(pattern)}(?:$|[\s,.\-/?!])'
        if re.search(regex, lower):
            return canonical
    return None


def extract_required_service(text: str) -> str:
    """Extract required service (photographer, videographer, editor)."""
    lower = text.lower()
    for pattern, canonical in SERVICE_ROLE_MAPPINGS.items():
        regex = rf'(?:^|[\s,.\-/?!]){re.escape(pattern)}(?:$|[\s,.\-/?!])'
        if re.search(regex, lower):
            return canonical
    return "photographer"


def extract_all_entities(text: str) -> Dict[str, Any]:
    """
    Extract all supported entities from user query text.
    Returns:
    - location
    - budget
    - event_type
    - photography_style
    - required_service
    - detected_language
    - missing_entities (list of important missing fields for follow-ups)
    """
    lang = detect_language(text)
    loc = extract_location(text)
    budget = extract_budget(text)
    event = extract_event_type(text)
    style = extract_photography_style(text)
    service = extract_required_service(text)
    
    missing = []
    if not event:
        missing.append("event_type")
    if not loc:
        missing.append("location")
    if not budget:
        missing.append("budget")
        
    return {
        "location": loc,
        "budget": budget,
        "eventType": event,
        "photographyStyle": style,
        "requiredService": service,
        "detectedLanguage": lang,
        "missingEntities": missing
    }
