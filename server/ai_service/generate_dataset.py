"""
Lenscraft ML Smart Package Recommendation System - Dataset Generator
Generates a grounded, reproducible training dataset pairing realistic customer
inquiries with real Lenscraft creative service packages.
"""

import os
import sys
import json
import random
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Configure UTF-8 stdout for Windows
if sys.platform.startswith('win'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Seed for absolute reproducibility
RANDOM_SEED = 42
random.seed(RANDOM_SEED)
np.random.seed(RANDOM_SEED)

# Real Lenscraft packages from MongoDB
REAL_PACKAGES = [
    {
        "id": "pkg_aarav_wedding_luxury",
        "title": "Full Day Luxury Wedding Photography",
        "category": "Wedding Photography",
        "professionType": "photographer",
        "price": 35000,
        "pricingType": "daily",
        "deliveryDays": 14,
        "inclusions": ["2 Photographers", "All RAW & Edited Photos", "Custom Online Gallery", "Free Pre-Wedding Session"],
        "revisionsAllowed": 3,
        "description": "Complete 10-hour event coverage with 2 primary shooters, candid portraiture, ceremony highlights, and 300+ color-corrected high-res images.",
        "proName": "Aarav Sharma",
        "proCity": "Mumbai",
        "proSpecialties": ["Wedding Photography", "Pre-Wedding", "Candid", "Portraits", "Fashion"],
        "proRating": 4.9,
        "proReviewCount": 48,
    },
    {
        "id": "pkg_aarav_prewedding",
        "title": "Cinematic Couple Pre-Wedding Shoot",
        "category": "Wedding Photography",
        "professionType": "photographer",
        "price": 18000,
        "pricingType": "fixed",
        "deliveryDays": 7,
        "inclusions": ["4 Hours Shoot", "40 Retouched Images", "Location Scouting Assistance"],
        "revisionsAllowed": 2,
        "description": "4-hour outdoor or studio shoot with 3 outfit changes, 40 finely retouched photographs, and artistic lighting setup.",
        "proName": "Aarav Sharma",
        "proCity": "Mumbai",
        "proSpecialties": ["Wedding Photography", "Pre-Wedding", "Candid", "Portraits", "Fashion"],
        "proRating": 4.9,
        "proReviewCount": 48,
    },
    {
        "id": "pkg_rohan_commercial_film",
        "title": "Brand Commercial & Product Film (4K/6K)",
        "category": "Cinematic Videography",
        "professionType": "videographer",
        "price": 45000,
        "pricingType": "fixed",
        "deliveryDays": 10,
        "inclusions": ["Director + Camera Op", "Full Lighting Kit", "4K ProRes Delivery", "Sound Design & Royalty-Free Music"],
        "revisionsAllowed": 3,
        "description": "Full commercial production including storyboarding, cinema cameras, pro lighting, voiceover sync, and master 60s & 30s deliverables.",
        "proName": "Rohan Verma",
        "proCity": "Bengaluru",
        "proSpecialties": ["Commercials", "Drone Cinematography", "Music Videos", "Corporate Films", "Events"],
        "proRating": 5.0,
        "proReviewCount": 34,
    },
    {
        "id": "pkg_priya_reels_pack",
        "title": "Pack of 5 Viral Short-Form Reels / Shorts",
        "category": "Reels & Short-Form Video",
        "professionType": "editor",
        "price": 8000,
        "pricingType": "fixed",
        "deliveryDays": 4,
        "inclusions": ["5 Rendered 9:16 Reels", "Kinetic Subtitles", "Sound FX & Mix", "2 Rounds of Revision per Video"],
        "revisionsAllowed": 2,
        "description": "5 high-impact short-form videos with animated kinetic captions, sound design, jump cuts, motion graphics, and background music.",
        "proName": "Priya Nambiar",
        "proCity": "Delhi",
        "proSpecialties": ["Color Grading", "Reels & TikToks", "YouTube Editing", "Sound Design", "Motion Graphics"],
        "proRating": 4.95,
        "proReviewCount": 62,
    },
    {
        "id": "pkg_kabir_wedding_candid",
        "title": "Intimate Candid Wedding Package",
        "category": "Wedding Photography",
        "professionType": "photographer",
        "price": 14000,
        "pricingType": "daily",
        "deliveryDays": 10,
        "inclusions": ["1 Dedicated Candid Shooter", "150+ Color-Graded Photos", "Online Digital Gallery", "High-Res Delivery"],
        "revisionsAllowed": 2,
        "description": "Full day candid wedding ceremony coverage with 1 lead candid shooter, raw emotion capture, family portraits, and 150+ color-graded high-res stills.",
        "proName": "Kabir Sen",
        "proCity": "Bhopal",
        "proSpecialties": ["Wedding Photography", "Candid", "Portraits", "Pre-Wedding"],
        "proRating": 4.92,
        "proReviewCount": 38,
    },
    {
        "id": "pkg_kabir_prewedding",
        "title": "Pre-Wedding Candid Shoot",
        "category": "Wedding Photography",
        "professionType": "photographer",
        "price": 9500,
        "pricingType": "fixed",
        "deliveryDays": 5,
        "inclusions": ["3 Hours Shoot", "35 Retouched Images", "Location Assistance"],
        "revisionsAllowed": 2,
        "description": "3 hours relaxed couple shoot around scenic Bhopal locations with 35 retouched frames.",
        "proName": "Kabir Sen",
        "proCity": "Bhopal",
        "proSpecialties": ["Wedding Photography", "Candid", "Portraits", "Pre-Wedding"],
        "proRating": 4.92,
        "proReviewCount": 38,
    },
    {
        "id": "pkg_devansh_wedding_ceremony",
        "title": "Candid Ceremony Highlights",
        "category": "Wedding Photography",
        "professionType": "photographer",
        "price": 15000,
        "pricingType": "daily",
        "deliveryDays": 7,
        "inclusions": ["1 Shooter", "120 Edited Photos", "Travel within MP Included"],
        "revisionsAllowed": 2,
        "description": "Complete ceremony coverage with 1 lead candid shooter and delivery of 120 color-graded frames.",
        "proName": "Devansh Patel",
        "proCity": "Indore",
        "proSpecialties": ["Wedding Photography", "Candid", "Cinematic", "Events"],
        "proRating": 4.86,
        "proReviewCount": 29,
    },
    {
        "id": "pkg_ananya_wedding_traditional",
        "title": "Grand Traditional Wedding Coverage",
        "category": "Wedding Photography",
        "professionType": "photographer",
        "price": 22000,
        "pricingType": "daily",
        "deliveryDays": 14,
        "inclusions": ["2 Photographers", "All RAW & JPEGs", "Hardcover Photobook"],
        "revisionsAllowed": 1,
        "description": "Comprehensive 8-hour stage and ritual coverage with 2 photographers and printed photobook.",
        "proName": "Ananya Deshmukh",
        "proCity": "Bhopal",
        "proSpecialties": ["Traditional Wedding", "Ritual Photography", "Events"],
        "proRating": 4.75,
        "proReviewCount": 42,
    },
    {
        "id": "pkg_vikram_wedding_essential",
        "title": "Essential Candid Wedding",
        "category": "Wedding Photography",
        "professionType": "photographer",
        "price": 15000,
        "pricingType": "daily",
        "deliveryDays": 7,
        "inclusions": ["1 Photographer", "100 Edited Photos"],
        "revisionsAllowed": 1,
        "description": "Single shooter candid wedding day coverage.",
        "proName": "Vikramaditya Rao",
        "proCity": "Bhopal",
        "proSpecialties": ["Candid", "Wedding Photography", "Pre-Wedding"],
        "proRating": 4.8,
        "proReviewCount": 22,
    },
    {
        "id": "pkg_neha_fashion_editorial",
        "title": "Editorial Portrait & Fashion Shoot",
        "category": "Fashion",
        "professionType": "photographer",
        "price": 16000,
        "pricingType": "fixed",
        "deliveryDays": 5,
        "inclusions": ["4 Hours", "20 Retouched Images"],
        "revisionsAllowed": 2,
        "description": "4-hour fashion shoot in studio with 20 retouched editorial portraits.",
        "proName": "Neha Kapoor",
        "proCity": "Bhopal",
        "proSpecialties": ["Fashion", "Portraits", "Candid"],
        "proRating": 4.7,
        "proReviewCount": 15,
    },
]

# Corpus for TF-IDF Text matching
all_pkg_texts = [
    f"{p['title']} {p['category']} {' '.join(p['inclusions'])} {p['description']} {' '.join(p['proSpecialties'])}"
    for p in REAL_PACKAGES
]
tfidf_vec = TfidfVectorizer(ngram_range=(1, 2), stop_words="english", max_features=150)
pkg_tfidf_matrix = tfidf_vec.fit_transform(all_pkg_texts)


def calculate_relevance(query, pkg, text_sim):
    """
    Ground truth labeling rule:
    Determines if a package is a genuine match (1) or mismatch (0) for a customer inquiry.
    1. Service domain compatibility (e.g. video editor cannot do wedding photography).
    2. Budget tolerance: package price must not exceed 1.15x the customer budget.
    3. Category / event alignment: at least partial event or style semantic alignment.
    """
    # Service match
    req_service = query["service_type"]
    if req_service and req_service != "all" and req_service != pkg["professionType"]:
        return 0

    # Budget feasibility (allow max 15% tolerance)
    budget = query["budget"]
    if pkg["price"] > budget * 1.15:
        return 0

    # Event domain compatibility
    event_lower = query["event_type"].lower()
    cat_lower = pkg["category"].lower()
    title_lower = pkg["title"].lower()

    is_wedding_event = any(w in event_lower for w in ["wedding", "marriage", "engagement", "shaadi", "reception"])
    is_wedding_pkg = "wedding" in cat_lower or "wedding" in title_lower

    if is_wedding_event and not is_wedding_pkg and pkg["professionType"] == "editor":
        return 0

    if not is_wedding_event and is_wedding_pkg and "wedding" not in event_lower:
        # e.g. Customer wants product shoot or corporate video or reels, wedding pkg is irrelevant
        if any(w in event_lower for w in ["product", "commercial", "reels", "short", "corporate", "food", "fashion"]):
            return 0

    # Content similarity threshold
    if text_sim < 0.08 and query["event_type"].lower() not in cat_lower:
        return 0

    # Location affinity
    loc_match = 1 if query["location"].lower() == pkg["proCity"].lower() else 0

    # If within budget and good domain alignment -> Relevant
    if (is_wedding_event and is_wedding_pkg) or (text_sim >= 0.15) or (loc_match and text_sim >= 0.08):
        return 1

    return 0


def generate_queries():
    """Generates a representative distribution of realistic customer inquiries."""
    event_types = [
        "Wedding", "Pre-Wedding", "Reception", "Engagement",
        "Fashion & Portrait", "Commercial & Brand", "Reels & Social Media",
        "Birthday Party", "Corporate Event"
    ]
    cities = ["Bhopal", "Mumbai", "Bengaluru", "Delhi", "Indore"]
    styles = ["Candid", "Traditional", "Cinematic", "Editorial", "Modern", "Drone", "Studio"]
    service_types = ["photographer", "videographer", "editor", "all"]

    budget_distributions = [
        (8000, 15000),   # Budget segment
        (15000, 25000),  # Mid segment
        (25000, 50000),  # Luxury segment
    ]

    queries = []
    # Generate 120 realistic distinct query profiles
    for i in range(120):
        evt = random.choice(event_types)
        city = random.choice(cities)
        style = random.choice(styles)
        
        # Service type correlation
        if "Reels" in evt:
            srv = "editor"
            b_min, b_max = 6000, 18000
        elif "Commercial" in evt:
            srv = random.choice(["videographer", "photographer"])
            b_min, b_max = 25000, 55000
        elif "Wedding" in evt or "Pre-Wedding" in evt:
            srv = random.choice(["photographer", "all"])
            b_min, b_max = random.choice([(10000, 20000), (18000, 40000)])
        else:
            srv = random.choice(service_types)
            b_min, b_max = random.choice(budget_distributions)

        budget = int(round(random.randint(b_min, b_max) / 500.0) * 500)

        queries.append({
            "query_id": f"q_{i:03d}",
            "event_type": evt,
            "budget": budget,
            "location": city,
            "style": style,
            "service_type": srv,
        })

    return queries


def build_dataset(output_csv_path="package_recommendation_dataset.csv"):
    queries = generate_queries()
    rows = []

    for q in queries:
        q_text = f"{q['event_type']} {q['style']} {q['location']} {q['service_type']}"
        q_vec = tfidf_vec.transform([q_text])
        sim_scores = cosine_similarity(q_vec, pkg_tfidf_matrix)[0]

        for idx, pkg in enumerate(REAL_PACKAGES):
            text_sim = float(sim_scores[idx])

            # Engineered features
            budget_ratio = round(pkg["price"] / q["budget"], 4)
            budget_diff = q["budget"] - pkg["price"]
            is_within_budget = 1 if pkg["price"] <= q["budget"] else 0
            
            event_cat_match = 1 if (
                q["event_type"].lower() in pkg["category"].lower() or
                pkg["category"].lower() in q["event_type"].lower() or
                ("wedding" in q["event_type"].lower() and "wedding" in pkg["category"].lower())
            ) else 0

            service_match = 1 if (q["service_type"] == "all" or q["service_type"] == pkg["professionType"]) else 0
            city_match = 1 if q["location"].lower() == pkg["proCity"].lower() else 0
            
            style_match = 1 if any(
                q["style"].lower() in s.lower() for s in pkg["proSpecialties"]
            ) or q["style"].lower() in pkg["title"].lower() else 0

            # Ground truth relevance label
            label = calculate_relevance(q, pkg, text_sim)

            rows.append({
                "query_id": q["query_id"],
                "req_event_type": q["event_type"],
                "req_budget": q["budget"],
                "req_location": q["location"],
                "req_style": q["style"],
                "req_service": q["service_type"],
                
                # Package attributes
                "pkg_id": pkg["id"],
                "pkg_title": pkg["title"],
                "pkg_category": pkg["category"],
                "pkg_profession_type": pkg["professionType"],
                "pkg_price": pkg["price"],
                "pkg_delivery_days": pkg["deliveryDays"],
                "pkg_revisions_allowed": pkg["revisionsAllowed"],
                "pro_rating": pkg["proRating"],
                "pro_review_count": pkg["proReviewCount"],
                "pro_city": pkg["proCity"],
                
                # Computed interaction signals
                "budget_ratio": budget_ratio,
                "budget_diff": budget_diff,
                "is_within_budget": is_within_budget,
                "event_cat_match": event_cat_match,
                "service_match": service_match,
                "city_match": city_match,
                "style_match": style_match,
                "text_tfidf_similarity": round(text_sim, 4),
                
                # Ground truth target
                "is_relevant": label,
            })

    df = pd.DataFrame(rows)
    df.to_csv(output_csv_path, index=False)
    print(f"✓ Dataset generated successfully: {output_csv_path}")
    print(f"  Total samples: {len(df)}")
    print(f"  Relevance distribution:\n{df['is_relevant'].value_counts(normalize=True)}")
    return df


if __name__ == "__main__":
    current_dir = os.path.dirname(os.path.abspath(__file__))
    csv_file = os.path.join(current_dir, "package_recommendation_dataset.csv")
    build_dataset(csv_file)
