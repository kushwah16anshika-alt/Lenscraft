"""
Multilingual NLP Intent Dataset for Lenscraft Creative Marketplace
Supports:
- English
- Hindi (Devanagari script)
- Roman-script Hinglish (transliterated Hindi/Urdu commonly used in India)

Intents (6 Canonical Categories):
1. photographer_search
2. package_search
3. pricing_question
4. booking_help
5. general_lenscraft_help
6. unknown_or_unsupported
"""

INTENT_DATA = [
    # =========================================================================
    # INTENT 1: photographer_search (Looking to discover/hire/find creators)
    # =========================================================================
    # English
    {"text": "I need a wedding photographer in Bhopal under 15000", "intent": "photographer_search", "language": "en"},
    {"text": "Looking for a candid wedding photographer in Mumbai", "intent": "photographer_search", "language": "en"},
    {"text": "Find me top videographers in Indore for pre-wedding shoot", "intent": "photographer_search", "language": "en"},
    {"text": "Can you recommend a fashion portrait photographer in Delhi?", "intent": "photographer_search", "language": "en"},
    {"text": "Need a commercial product photographer in Bengaluru under 25k", "intent": "photographer_search", "language": "en"},
    {"text": "Search for cinematic wedding videographers in Bhopal", "intent": "photographer_search", "language": "en"},
    {"text": "I want to hire a photographer for birthday party in Bhopal", "intent": "photographer_search", "language": "en"},
    {"text": "Find editorial portrait photographers with 5 star rating", "intent": "photographer_search", "language": "en"},
    {"text": "Looking for drone videographer in Goa for beach shoot", "intent": "photographer_search", "language": "en"},
    {"text": "Suggest traditional photographers in Indore for anniversary", "intent": "photographer_search", "language": "en"},
    {"text": "Need a video editor for wedding highlights in Delhi", "intent": "photographer_search", "language": "en"},
    {"text": "Show me candid photographers available in Mumbai next Friday", "intent": "photographer_search", "language": "en"},
    {"text": "Find creative directors and photographers in Jaipur", "intent": "photographer_search", "language": "en"},
    {"text": "Are there any baby shoot photographers in Bhopal under 10k?", "intent": "photographer_search", "language": "en"},
    {"text": "Need someone to shoot our engagement ceremony in Indore", "intent": "photographer_search", "language": "en"},
    {"text": "Recommend corporate event photographers in Bengaluru", "intent": "photographer_search", "language": "en"},
    {"text": "Looking for reels creator and short video editor in Delhi", "intent": "photographer_search", "language": "en"},
    {"text": "Find a local photographer near Bhopal MP Nagar", "intent": "photographer_search", "language": "en"},
    {"text": "Hire a female portrait photographer in Mumbai", "intent": "photographer_search", "language": "en"},
    {"text": "I want an experienced wedding cinematographer in Udaipur", "intent": "photographer_search", "language": "en"},

    # Hinglish
    {"text": "mujhe bhopal me wedding photographer chahiye 15k ke andar", "intent": "photographer_search", "language": "hinglish"},
    {"text": "bhopal me shadi ke liye candid photographer dhundo", "intent": "photographer_search", "language": "hinglish"},
    {"text": "mumbai me cinematic pre-wedding shoot ke liye koi photographer batao", "intent": "photographer_search", "language": "hinglish"},
    {"text": "indore me birthday party ke liye photographer chahiye", "intent": "photographer_search", "language": "hinglish"},
    {"text": "delhi me budget video editor aur photographer mil sakta hai?", "intent": "photographer_search", "language": "hinglish"},
    {"text": "shaadi ke liye best photographer kaun hai bhopal me?", "intent": "photographer_search", "language": "hinglish"},
    {"text": "mujhe engagement ceremony ke liye videographer hire karna hai", "intent": "photographer_search", "language": "hinglish"},
    {"text": "15 hazaar tak ka candid photographer mil jayega indore me?", "intent": "photographer_search", "language": "hinglish"},
    {"text": "bhopal me drone shoot karne wala chahiye wedding ke liye", "intent": "photographer_search", "language": "hinglish"},
    {"text": "delhi me reels shoot karne ke liye editor ya creator chahiye", "intent": "photographer_search", "language": "hinglish"},
    {"text": "portrait photo shoot ke liye achha photographer suggest karo mumbai me", "intent": "photographer_search", "language": "hinglish"},
    {"text": "pre wedding ke liye best cameraman kaun hai indore me", "intent": "photographer_search", "language": "hinglish"},
    {"text": "20k budget hai wedding photographer chahiye bhopal me", "intent": "photographer_search", "language": "hinglish"},
    {"text": "bengaluru me corporate shoot ke liye professional photographer chahiye", "intent": "photographer_search", "language": "hinglish"},
    {"text": "traditional wedding photographer dhundh raha hu indore me", "intent": "photographer_search", "language": "hinglish"},
    {"text": "model portfolio shoot ke liye photographer chahiye delhi me", "intent": "photographer_search", "language": "hinglish"},
    {"text": "mujhe family function ke liye photographer search karna hai", "intent": "photographer_search", "language": "hinglish"},

    # Hindi
    {"text": "मुझे भोपाल में शादी के लिए फोटोग्राफर चाहिए", "intent": "photographer_search", "language": "hi"},
    {"text": "मुंबई में कैंडिड वेडिंग फोटोग्राफर ढूंढिए", "intent": "photographer_search", "language": "hi"},
    {"text": "इंदौर में प्री वेडिंग शूट के लिए बेस्ट फोटोग्राफर कौन है?", "intent": "photographer_search", "language": "hi"},
    {"text": "15 हजार के अंदर शादी का फोटोग्राफर मिल जाएगा भोपाल में?", "intent": "photographer_search", "language": "hi"},
    {"text": "मुझे दिल्ली में सिनेमैटिक वीडियोग्राफर चाहिए", "intent": "photographer_search", "language": "hi"},
    {"text": "जन्मदिन की पार्टी के लिए फोटोग्राफर चाहिए मुझे", "intent": "photographer_search", "language": "hi"},
    {"text": "भोपाल में टॉप रेटेड फोटोग्राफर्स की सूची दिखाएं", "intent": "photographer_search", "language": "hi"},
    {"text": "विवाह समारोह के लिए अनुभवी कैमरामैन की तलाश है", "intent": "photographer_search", "language": "hi"},
    {"text": "सगाई के कार्यक्रम के लिए पारंपरिक फोटोग्राफर ढूंढें", "intent": "photographer_search", "language": "hi"},
    {"text": "मॉडलिंग पोर्टफोलियो शूट के लिए फोटोग्राफर इंदौर में", "intent": "photographer_search", "language": "hi"},
    {"text": "मुझे ड्रोन शूट के लिए वीडियोग्राफर चाहिए", "intent": "photographer_search", "language": "hi"},
    {"text": "20000 रुपये के बजट में वेडिंग फोटोग्राफर दिखाएं", "intent": "photographer_search", "language": "hi"},

    # =========================================================================
    # INTENT 2: package_search (Looking for specific packages, inclusions, deals)
    # =========================================================================
    # English
    {"text": "What wedding packages do you have available?", "intent": "package_search", "language": "en"},
    {"text": "Show me pre-wedding shoot packages and inclusions", "intent": "package_search", "language": "en"},
    {"text": "Are there any packages for reels and short video editing?", "intent": "package_search", "language": "en"},
    {"text": "I want to see packages that include photo album and raw footage", "intent": "package_search", "language": "en"},
    {"text": "Display all photography packages under 20000", "intent": "package_search", "language": "en"},
    {"text": "What packages are offered for commercial fashion shoots?", "intent": "package_search", "language": "en"},
    {"text": "Show packages that offer 7 days delivery guarantee", "intent": "package_search", "language": "en"},
    {"text": "What packages does Vikramaditya Rao offer in his catalog?", "intent": "package_search", "language": "en"},
    {"text": "Can I see all drone photography packages and bundles?", "intent": "package_search", "language": "en"},
    {"text": "Show me luxury destination wedding packages", "intent": "package_search", "language": "en"},
    {"text": "List packages that include both edited photos and teaser video", "intent": "package_search", "language": "en"},
    {"text": "Are there any 1-day intimate wedding packages available?", "intent": "package_search", "language": "en"},
    {"text": "Show me packages with unlimited revisions allowed", "intent": "package_search", "language": "en"},
    {"text": "Display packages with cinematic teaser and drone inclusions", "intent": "package_search", "language": "en"},
    {"text": "What birthday shoot packages are in the catalog?", "intent": "package_search", "language": "en"},

    # Hinglish
    {"text": "lenscraft par kaun se wedding packages available hai?", "intent": "package_search", "language": "hinglish"},
    {"text": "shadi ke packages dikhao jisme album aur video dono ho", "intent": "package_search", "language": "hinglish"},
    {"text": "pre wedding shoot ke packages dekhne hai mujhe catalog me", "intent": "package_search", "language": "hinglish"},
    {"text": "kya reels editing ka koi package available hai yaha?", "intent": "package_search", "language": "hinglish"},
    {"text": "15000 ke andar kaun se packages milenge platform par?", "intent": "package_search", "language": "hinglish"},
    {"text": "essential wedding package me kya kya shamil hai inclusions?", "intent": "package_search", "language": "hinglish"},
    {"text": "drone shoot ke packages ki list dikhao catalog me", "intent": "package_search", "language": "hinglish"},
    {"text": "kabir sen ke saare packages dikha do", "intent": "package_search", "language": "hinglish"},
    {"text": "fashion portrait ke packages search karo", "intent": "package_search", "language": "hinglish"},
    {"text": "smart packages page par kaun se best deals aur packages hai?", "intent": "package_search", "language": "hinglish"},
    {"text": "saste wedding packages aur bundles dikhaiye", "intent": "package_search", "language": "hinglish"},
    {"text": "pre wedding ke package options dekhna chahta hu", "intent": "package_search", "language": "hinglish"},
    {"text": "short form video editing package kaun sa hai?", "intent": "package_search", "language": "hinglish"},
    {"text": "catalog me se best package recommend karo", "intent": "package_search", "language": "hinglish"},

    # Hindi
    {"text": "वेडिंग फोटोग्राफी के कौन से पैकेज उपलब्ध हैं?", "intent": "package_search", "language": "hi"},
    {"text": "मुझे प्री वेडिंग के पैकेज और सुविधाएं देखनी हैं", "intent": "package_search", "language": "hi"},
    {"text": "क्या 15000 के अंदर कोई पैकेज उपलब्ध है?", "intent": "package_search", "language": "hi"},
    {"text": "पैकेज में क्या-क्या शामिल है इसकी जानकारी दें", "intent": "package_search", "language": "hi"},
    {"text": "एल्बम और वीडियो वाले पैकेज दिखाएं", "intent": "package_search", "language": "hi"},
    {"text": "रील्स और शॉर्ट वीडियो एडिटिंग पैकेज दिखाएं", "intent": "package_search", "language": "hi"},
    {"text": "कैंडिड शादी के कौन से पैकेज मौजूद हैं सूची में?", "intent": "package_search", "language": "hi"},
    {"text": "ड्रोन शूट के पैकेज कैटलॉग में दिखाएं", "intent": "package_search", "language": "hi"},
    {"text": "पोर्ट्रेट शूट के पैकेजेस क्या हैं?", "intent": "package_search", "language": "hi"},

    # =========================================================================
    # INTENT 3: pricing_question (Cost, fees, rates, starting price, charges)
    # =========================================================================
    # English
    {"text": "How much does a wedding photographer cost?", "intent": "pricing_question", "language": "en"},
    {"text": "What is the starting price for photographers in Bhopal?", "intent": "pricing_question", "language": "en"},
    {"text": "What are the rates for a pre-wedding shoot in Mumbai?", "intent": "pricing_question", "language": "en"},
    {"text": "How much do creators charge per day on Lenscraft?", "intent": "pricing_question", "language": "en"},
    {"text": "What is the average cost of candid wedding photography?", "intent": "pricing_question", "language": "en"},
    {"text": "Are there any hidden charges or travel costs included in price?", "intent": "pricing_question", "language": "en"},
    {"text": "What is the exact price of Kabir Sen's intimate wedding package?", "intent": "pricing_question", "language": "en"},
    {"text": "How much for hiring a video editor for 5 reels pricing?", "intent": "pricing_question", "language": "en"},
    {"text": "What are the price differences between standard and premium tiers?", "intent": "pricing_question", "language": "en"},
    {"text": "Is advance payment required and what percentage is charged?", "intent": "pricing_question", "language": "en"},
    {"text": "How much does drone videography cost per hour?", "intent": "pricing_question", "language": "en"},
    {"text": "Tell me the rate card and fee structure of creators", "intent": "pricing_question", "language": "en"},
    {"text": "What are the cancellation fee charges if I cancel?", "intent": "pricing_question", "language": "en"},
    {"text": "What is the minimum hourly fee for photography services?", "intent": "pricing_question", "language": "en"},
    {"text": "Are editing charges separate from the shoot cost?", "intent": "pricing_question", "language": "en"},

    # Hinglish
    {"text": "wedding photographer ka kitna kharcha aayega?", "intent": "pricing_question", "language": "hinglish"},
    {"text": "bhopal me photographer ki starting price kya hai?", "intent": "pricing_question", "language": "hinglish"},
    {"text": "photographer ke charges kya hai ek din ke?", "intent": "pricing_question", "language": "hinglish"},
    {"text": "pre wedding shoot ka kitna rate lagta hai?", "intent": "pricing_question", "language": "hinglish"},
    {"text": "kabir sen ka package price kitna hai aur fees kya hai?", "intent": "pricing_question", "language": "hinglish"},
    {"text": "reels banwane ka kitna paisa aur charges lagega?", "intent": "pricing_question", "language": "hinglish"},
    {"text": "yaha par sabse sasta rate kitne se shuru hota hai?", "intent": "pricing_question", "language": "hinglish"},
    {"text": "shadi ke photo shoot ki fees kitni hoti hai per day?", "intent": "pricing_question", "language": "hinglish"},
    {"text": "kya advance payment me koi extra charge judta hai?", "intent": "pricing_question", "language": "hinglish"},
    {"text": "rate list bataiye wedding photography ki cost kya hai", "intent": "pricing_question", "language": "hinglish"},
    {"text": "shoot ka total kharcha kitna baithega?", "intent": "pricing_question", "language": "hinglish"},
    {"text": "per hour rate kitna charge karte hai photographers?", "intent": "pricing_question", "language": "hinglish"},
    {"text": "drone shoot ka alag se charge kitna hota hai?", "intent": "pricing_question", "language": "hinglish"},
    {"text": "kya prices negotiable hai ya fixed rate hai?", "intent": "pricing_question", "language": "hinglish"},

    # Hindi
    {"text": "वेडिंग फोटोग्राफर का कितना खर्च आएगा?", "intent": "pricing_question", "language": "hi"},
    {"text": "फोटोग्राफर की शुरुआती कीमत और फीस क्या है?", "intent": "pricing_question", "language": "hi"},
    {"text": "प्री वेडिंग शूट का क्या रेट है?", "intent": "pricing_question", "language": "hi"},
    {"text": "एक दिन का फोटोग्राफी चार्ज कितना होता है?", "intent": "pricing_question", "language": "hi"},
    {"text": "पैकेज की कीमत और दरें क्या हैं?", "intent": "pricing_question", "language": "hi"},
    {"text": "रील्स एडिटिंग की क्या फीस और लागत है?", "intent": "pricing_question", "language": "hi"},
    {"text": "शादी की फोटोग्राफी की रेट लिस्ट बताएं", "intent": "pricing_question", "language": "hi"},
    {"text": "क्या कोई अतिरिक्त टैक्स या चार्ज लगता है?", "intent": "pricing_question", "language": "hi"},

    # =========================================================================
    # INTENT 4: booking_help (How to book, appointment schedule, cancel, steps)
    # =========================================================================
    # English
    {"text": "How does the booking process work on Lenscraft?", "intent": "booking_help", "language": "en"},
    {"text": "How do I book an appointment with a photographer?", "intent": "booking_help", "language": "en"},
    {"text": "Step by step guide to schedule a photo shoot", "intent": "booking_help", "language": "en"},
    {"text": "Can I book Kabir Sen for November 20th?", "intent": "booking_help", "language": "en"},
    {"text": "How do I confirm my booking and pay advance online?", "intent": "booking_help", "language": "en"},
    {"text": "What happens after I submit a booking request form?", "intent": "booking_help", "language": "en"},
    {"text": "How can I cancel or reschedule my appointment date?", "intent": "booking_help", "language": "en"},
    {"text": "Is my booking confirmed immediately or does creator accept?", "intent": "booking_help", "language": "en"},
    {"text": "Where can I see my active bookings in my dashboard?", "intent": "booking_help", "language": "en"},
    {"text": "Help me book a package for my wedding date on the portal", "intent": "booking_help", "language": "en"},
    {"text": "How to hire and schedule a videographer slot?", "intent": "booking_help", "language": "en"},
    {"text": "What is the cancellation and refund procedure for bookings?", "intent": "booking_help", "language": "en"},
    {"text": "How do I select time slot when booking an appointment?", "intent": "booking_help", "language": "en"},
    {"text": "Where is the book now button on creator profile?", "intent": "booking_help", "language": "en"},
    {"text": "Can I reschedule my shoot to next week in my bookings?", "intent": "booking_help", "language": "en"},

    # Hinglish
    {"text": "lenscraft par photographer kaise book kare?", "intent": "booking_help", "language": "hinglish"},
    {"text": "booking ka process samjhao mujhe step by step", "intent": "booking_help", "language": "hinglish"},
    {"text": "photographer ko book karne ke liye kya steps lene hote hai?", "intent": "booking_help", "language": "hinglish"},
    {"text": "kya mai 20 november ke liye slot book kar sakta hu?", "intent": "booking_help", "language": "hinglish"},
    {"text": "booking request bhejne ke baad confirmation kaise aayega?", "intent": "booking_help", "language": "hinglish"},
    {"text": "agar date change karni ho to booking reschedule kaise kare?", "intent": "booking_help", "language": "hinglish"},
    {"text": "booking cancel karne par refund ka kya process hai?", "intent": "booking_help", "language": "hinglish"},
    {"text": "appointment book kaise karte hai creator profile se?", "intent": "booking_help", "language": "hinglish"},
    {"text": "mujhe booking confirmation kab aur kaise milega?", "intent": "booking_help", "language": "hinglish"},
    {"text": "apni purani aur active bookings dashboard me kaha dekhe?", "intent": "booking_help", "language": "hinglish"},
    {"text": "shadi ke liye advance slot booking kaise kare?", "intent": "booking_help", "language": "hinglish"},
    {"text": "booking button par click karne ke baad kya karna hota hai?", "intent": "booking_help", "language": "hinglish"},
    {"text": "kya creator meri booking request reject kar sakta hai?", "intent": "booking_help", "language": "hinglish"},

    # Hindi
    {"text": "लेंसक्राफ्ट पर फोटोग्राफर कैसे बुक करें?", "intent": "booking_help", "language": "hi"},
    {"text": "बुकिंग की प्रक्रिया और स्टेप्स क्या हैं?", "intent": "booking_help", "language": "hi"},
    {"text": "मैं अपनी शादी के लिए तारीख कैसे बुक करूं?", "intent": "booking_help", "language": "hi"},
    {"text": "बुकिंग कैंसिल या रीशेड्यूल कैसे करें?", "intent": "booking_help", "language": "hi"},
    {"text": "क्या अपॉइंटमेंट बुकिंग तुरंत कन्फर्म हो जाती है?", "intent": "booking_help", "language": "hi"},
    {"text": "बुकिंग के बाद पेमेंट करने का क्या तरीका है?", "intent": "booking_help", "language": "hi"},
    {"text": "अपनी माय बुकिंग्स स्टेटस कैसे चेक करें?", "intent": "booking_help", "language": "hi"},
    {"text": "फोटोग्राफर को हायर करने के नियम बताएं", "intent": "booking_help", "language": "hi"},

    # =========================================================================
    # INTENT 5: general_lenscraft_help (Platform overview, safety, policies, about)
    # =========================================================================
    # English
    {"text": "What is Lenscraft marketplace and how does the platform work?", "intent": "general_lenscraft_help", "language": "en"},
    {"text": "How do you verify creators and photographers on Lenscraft?", "intent": "general_lenscraft_help", "language": "en"},
    {"text": "Is Lenscraft operational in other states and cities?", "intent": "general_lenscraft_help", "language": "en"},
    {"text": "How do I register as a creator to sell my services?", "intent": "general_lenscraft_help", "language": "en"},
    {"text": "What is the mission and background of Lenscraft platform?", "intent": "general_lenscraft_help", "language": "en"},
    {"text": "Tell me about Lenscraft AI features and smart matchmaker", "intent": "general_lenscraft_help", "language": "en"},
    {"text": "How can I contact customer support or administration helpdesk?", "intent": "general_lenscraft_help", "language": "en"},
    {"text": "Are reviews on creator profiles verified from authentic clients?", "intent": "general_lenscraft_help", "language": "en"},
    {"text": "Is my online payment safe and protected by milestone security?", "intent": "general_lenscraft_help", "language": "en"},
    {"text": "Can I chat directly with the photographer using direct messaging?", "intent": "general_lenscraft_help", "language": "en"},
    {"text": "What is the Color Lab and AI Style Classification feature?", "intent": "general_lenscraft_help", "language": "en"},
    {"text": "Where is Lenscraft company registered and support located?", "intent": "general_lenscraft_help", "language": "en"},
    {"text": "What are the platform terms of service and client safety rules?", "intent": "general_lenscraft_help", "language": "en"},
    {"text": "How do I reset my account password or update my email?", "intent": "general_lenscraft_help", "language": "en"},

    # Hinglish
    {"text": "lenscraft kya hai aur ye platform kaise kaam karta hai?", "intent": "general_lenscraft_help", "language": "hinglish"},
    {"text": "kya yaha ke photographers verified aur trusted hote hai?", "intent": "general_lenscraft_help", "language": "hinglish"},
    {"text": "kya mai photographer se pehle direct messaging chat kar sakta hu?", "intent": "general_lenscraft_help", "language": "hinglish"},
    {"text": "lenscraft par creator banne ke liye register kaise kare?", "intent": "general_lenscraft_help", "language": "hinglish"},
    {"text": "ye platform kin kin cities me service provide karta hai?", "intent": "general_lenscraft_help", "language": "hinglish"},
    {"text": "kya yaha online payment safe aur secure rehta hai?", "intent": "general_lenscraft_help", "language": "hinglish"},
    {"text": "lenscraft customer support aur helpdesk se kaise baat kare?", "intent": "general_lenscraft_help", "language": "hinglish"},
    {"text": "lenscraft ke baare me detail information batao", "intent": "general_lenscraft_help", "language": "hinglish"},
    {"text": "color lab aur ai style classification feature kya hai?", "intent": "general_lenscraft_help", "language": "hinglish"},
    {"text": "kya reviews asli clients ke hote hai platform par?", "intent": "general_lenscraft_help", "language": "hinglish"},
    {"text": "lenscraft marketplace ke terms aur policies kya hai?", "intent": "general_lenscraft_help", "language": "hinglish"},
    {"text": "account settings ya password change kaise kare?", "intent": "general_lenscraft_help", "language": "hinglish"},

    # Hindi
    {"text": "लेंसक्राफ्ट क्या है और यह प्लेटफॉर्म कैसे काम करता है?", "intent": "general_lenscraft_help", "language": "hi"},
    {"text": "क्या यहाँ के सभी फोटोग्राफर वेरिफाइड हैं?", "intent": "general_lenscraft_help", "language": "hi"},
    {"text": "प्लेटफॉर्म पर प्रोफेशनल के रूप में कैसे रजिस्टर करें?", "intent": "general_lenscraft_help", "language": "hi"},
    {"text": "लेंसक्राफ्ट कस्टमर सपोर्ट से संपर्क कैसे करें?", "intent": "general_lenscraft_help", "language": "hi"},
    {"text": "लेंसक्राफ्ट किन-किन शहरों में अपनी सेवाएं देता है?", "intent": "general_lenscraft_help", "language": "hi"},
    {"text": "क्या वेबसाइट पर पेमेंट सुरक्षित रहता है?", "intent": "general_lenscraft_help", "language": "hi"},
    {"text": "लेंसक्राफ्ट की मुख्य विशेषताएं और एआई फीचर्स क्या हैं?", "intent": "general_lenscraft_help", "language": "hi"},
    {"text": "कलर लैब फीचर कैसे काम करता है?", "intent": "general_lenscraft_help", "language": "hi"},

    # =========================================================================
    # INTENT 6: unknown_or_unsupported (Out of domain, chitchat, random)
    # =========================================================================
    # English
    {"text": "What is the weather forecast in Mumbai today?", "intent": "unknown_or_unsupported", "language": "en"},
    {"text": "Tell me a funny joke about programming and cats", "intent": "unknown_or_unsupported", "language": "en"},
    {"text": "Can you write a python script for binary search algorithm?", "intent": "unknown_or_unsupported", "language": "en"},
    {"text": "Who won the cricket match yesterday between India and Australia?", "intent": "unknown_or_unsupported", "language": "en"},
    {"text": "Can you order a pizza for me right now?", "intent": "unknown_or_unsupported", "language": "en"},
    {"text": "How do I make chocolate cake at home recipe?", "intent": "unknown_or_unsupported", "language": "en"},
    {"text": "Hello hi test 123 check", "intent": "unknown_or_unsupported", "language": "en"},
    {"text": "asdfghjk qwerty random meaningless text", "intent": "unknown_or_unsupported", "language": "en"},
    {"text": "Good morning how are you doing today my friend", "intent": "unknown_or_unsupported", "language": "en"},
    {"text": "What is the capital city of France?", "intent": "unknown_or_unsupported", "language": "en"},
    {"text": "Translate this sentence to Spanish for me", "intent": "unknown_or_unsupported", "language": "en"},
    {"text": "Play some Bollywood music songs on Spotify", "intent": "unknown_or_unsupported", "language": "en"},
    {"text": "Who is the president of the United States?", "intent": "unknown_or_unsupported", "language": "en"},
    {"text": "Explain quantum computing in simple terms", "intent": "unknown_or_unsupported", "language": "en"},

    # Hinglish
    {"text": "aaj ka mausam kaisa hai delhi me barish hogi kya?", "intent": "unknown_or_unsupported", "language": "hinglish"},
    {"text": "koi achha sa romantic gana suna do mujhe", "intent": "unknown_or_unsupported", "language": "hinglish"},
    {"text": "aaj raat ke khane me kya banana chahiye?", "intent": "unknown_or_unsupported", "language": "hinglish"},
    {"text": "cricket match me aaj kaun jeeta score batao", "intent": "unknown_or_unsupported", "language": "hinglish"},
    {"text": "kya tum mere liye swiggy se khana order kar sakte ho?", "intent": "unknown_or_unsupported", "language": "hinglish"},
    {"text": "kya haal chaal hai bhai sab badhiya", "intent": "unknown_or_unsupported", "language": "hinglish"},
    {"text": "bas aise hi timepass karne aaya hu", "intent": "unknown_or_unsupported", "language": "hinglish"},
    {"text": "mujhe ek achhi si shayari sunao na", "intent": "unknown_or_unsupported", "language": "hinglish"},
    {"text": "kal school ya college ki chhutti hai kya?", "intent": "unknown_or_unsupported", "language": "hinglish"},
    {"text": "koi badhiya action movie suggest karo netflix par", "intent": "unknown_or_unsupported", "language": "hinglish"},
    {"text": "train ka pnr status kaise check kare?", "intent": "unknown_or_unsupported", "language": "hinglish"},
    {"text": "petrol ka daam kitna chal raha hai aaj?", "intent": "unknown_or_unsupported", "language": "hinglish"},

    # Hindi
    {"text": "आज मौसम कैसा रहेगा दिल्ली में?", "intent": "unknown_or_unsupported", "language": "hi"},
    {"text": "मुझे एक मजेदार चुटकुला सुनाओ", "intent": "unknown_or_unsupported", "language": "hi"},
    {"text": "भारत का प्रधानमंत्री कौन है वर्तमान में?", "intent": "unknown_or_unsupported", "language": "hi"},
    {"text": "स्वादिष्ट चाय बनाने की सही रेसिपी क्या है?", "intent": "unknown_or_unsupported", "language": "hi"},
    {"text": "नमस्ते आप कैसे हैं आज?", "intent": "unknown_or_unsupported", "language": "hi"},
    {"text": "कल कौन सा वार या दिन है?", "intent": "unknown_or_unsupported", "language": "hi"},
    {"text": "कोई अच्छी प्रेरणादायक किताब बताएं", "intent": "unknown_or_unsupported", "language": "hi"},
    {"text": "आज का ताजा समाचार क्या है?", "intent": "unknown_or_unsupported", "language": "hi"}
]

INTENT_LABELS = [
    "photographer_search",
    "package_search",
    "pricing_question",
    "booking_help",
    "general_lenscraft_help",
    "unknown_or_unsupported"
]
