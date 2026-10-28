import dotenv from 'dotenv';

dotenv.config();

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';
const DEFAULT_TIMEOUT_MS = 5000;

/**
 * City mappings for JavaScript grounded fallback
 */
const CITIES = {
  bhopal: 'Bhopal',
  भोपाल: 'Bhopal',
  mumbai: 'Mumbai',
  मुंबई: 'Mumbai',
  indore: 'Indore',
  इंदौर: 'Indore',
  delhi: 'Delhi',
  दिल्ली: 'Delhi',
  bengaluru: 'Bengaluru',
  bangalore: 'Bengaluru',
  jaipur: 'Jaipur',
  goa: 'Goa',
  pune: 'Pune',
  udaipur: 'Udaipur',
};

/**
 * Event type mappings for fallback
 */
const EVENTS = {
  wedding: 'Wedding',
  shaadi: 'Wedding',
  shadi: 'Wedding',
  vivah: 'Wedding',
  शादी: 'Wedding',
  'pre-wedding': 'Pre-Wedding',
  prewedding: 'Pre-Wedding',
  sagayi: 'Pre-Wedding',
  engagement: 'Pre-Wedding',
  portrait: 'Portrait',
  birthday: 'Birthday',
  anniversary: 'Birthday',
  reels: 'Reels & Short-Form Video',
  commercial: 'Commercial',
  fashion: 'Fashion',
  drone: 'Drone',
};

/**
 * Style mappings for fallback
 */
const STYLES = {
  candid: 'Candid',
  कैंडिड: 'Candid',
  traditional: 'Traditional',
  cinematic: 'Cinematic',
  editorial: 'Editorial',
  modern: 'Modern',
};

/**
 * Extract budget from text in fallback mode
 */
const parseFallbackBudget = (text) => {
  const clean = text.toLowerCase().replace(/,/g, '');

  // 15k, 25k
  const kMatch = clean.match(/\b([0-9]+(?:\.[0-9]+)?)\s*k\b/i);
  if (kMatch) return parseFloat(kMatch[1]) * 1000;

  // 15 hazaar, 15 hazar
  const hazarMatch = clean.match(/\b([0-9]+)\s*(?:hazaar|hazar|hajar|thousand|हजार)\b/i);
  if (hazarMatch) return parseFloat(hazarMatch[1]) * 1000;

  // Word numbers like pandrah hazaar / bees hazaar
  if (clean.includes('pandrah hazaar') || clean.includes('pandrah hazar')) return 15000;
  if (clean.includes('bees hazaar') || clean.includes('bees hazar')) return 20000;
  if (clean.includes('dus hazaar') || clean.includes('das hazar')) return 10000;
  if (clean.includes('pachas hazaar') || clean.includes('pachas hazar')) return 50000;

  // Direct rupee symbol / prefix / suffix
  const numMatch = clean.match(/(?:₹|rs\.?|inr|under|below|upto|tak)\s*([0-9]{4,6})\b/i) || clean.match(/\b([0-9]{4,6})\b/);
  if (numMatch) {
    const val = parseFloat(numMatch[1]);
    if (val >= 1000 && val <= 1000000) return val;
  }

  return null;
};

/**
 * Detect language for fallback
 */
const detectFallbackLanguage = (text) => {
  if (/[\u0900-\u097F]/.test(text)) return 'hi';
  const hinglishMarkers = ['chahiye', 'chaiye', 'shadi', 'shaadi', 'mujhe', 'karna', 'kaun', 'hazaar', 'hazar', 'paisa', 'rupaye', 'batao', 'dhundo', 'saste', 'andar', 'kharcha', 'kaise'];
  const words = text.toLowerCase().split(/\s+/);
  if (words.some((w) => hinglishMarkers.includes(w))) return 'hinglish';
  return 'en';
};

/**
 * Grounded rule-based fallback when Python microservice is unreachable
 */
export const runGroundedNlpFallback = (text) => {
  const clean = text.toLowerCase();
  const lang = detectFallbackLanguage(text);
  const budget = parseFallbackBudget(text);

  let location = null;
  for (const [key, val] of Object.entries(CITIES)) {
    if (new RegExp(`(?:^|[\\s,.-])${key}(?:$|[\\s,.-])`, 'i').test(clean)) {
      location = val;
      break;
    }
  }

  let eventType = null;
  for (const [key, val] of Object.entries(EVENTS)) {
    if (new RegExp(`(?:^|[\\s,.-])${key}(?:$|[\\s,.-])`, 'i').test(clean)) {
      eventType = val;
      break;
    }
  }

  let photographyStyle = null;
  for (const [key, val] of Object.entries(STYLES)) {
    if (new RegExp(`(?:^|[\\s,.-])${key}(?:$|[\\s,.-])`, 'i').test(clean)) {
      photographyStyle = val;
      break;
    }
  }

  const requiredService = clean.includes('editor') || clean.includes('editing')
    ? 'editor'
    : clean.includes('video') || clean.includes('cinemat')
    ? 'videographer'
    : 'photographer';

  const missingEntities = [];
  if (!eventType) missingEntities.push('event_type');
  if (!location) missingEntities.push('location');
  if (!budget) missingEntities.push('budget');

  // Intent heuristics
  let intent = 'unknown_or_unsupported';
  let confidence = 0.85;

  const isOutOfDomain = clean.includes('weather') || clean.includes('mausam') || clean.includes('cricket') || clean.includes('joke') || clean.includes('chutkula') || clean.includes('recipe') || clean.includes('pizza') || clean.includes('movie') || clean.includes('song') || clean.includes('gana') || clean.includes('president') || clean.includes('pm') || clean.includes('zomato') || clean.includes('swiggy') || clean.includes('hello hi test');

  if (isOutOfDomain) {
    intent = 'unknown_or_unsupported';
  } else if (clean.includes('book') || clean.includes('appointment') || clean.includes('schedule') || clean.includes('cancel') || clean.includes('बुकिंग')) {
    intent = 'booking_help';
  } else if (clean.includes('package') || clean.includes('deal') || clean.includes('bundle') || clean.includes('पैकेज')) {
    intent = 'package_search';
  } else if (clean.includes('price') || clean.includes('cost') || clean.includes('rate') || clean.includes('fees') || clean.includes('kharcha') || clean.includes('paisa') || clean.includes('कीमत')) {
    intent = 'pricing_question';
  } else if (clean.includes('lenscraft') || clean.includes('verify') || clean.includes('register') || clean.includes('about') || clean.includes('support')) {
    intent = 'general_lenscraft_help';
  } else if (clean.includes('photographer') || clean.includes('videographer') || clean.includes('chahiye') || clean.includes('shoot') || ((location || eventType || budget) && !isOutOfDomain)) {
    intent = 'photographer_search';
  }

  return {
    text,
    intent,
    confidence,
    isConfident: true,
    allProbabilities: {
      photographer_search: intent === 'photographer_search' ? 0.85 : 0.03,
      package_search: intent === 'package_search' ? 0.85 : 0.03,
      pricing_question: intent === 'pricing_question' ? 0.85 : 0.03,
      booking_help: intent === 'booking_help' ? 0.85 : 0.03,
      general_lenscraft_help: intent === 'general_lenscraft_help' ? 0.85 : 0.03,
      unknown_or_unsupported: intent === 'unknown_or_unsupported' ? 0.85 : 0.03,
    },
    entities: {
      location,
      budget,
      eventType,
      photographyStyle,
      requiredService,
      detectedLanguage: lang,
      missingEntities,
    },
    suggestedFollowUps: [
      'I need a wedding photographer in Bhopal under ₹15,000',
      'What packages are available and what are their prices?',
      'How does booking work on Lenscraft?',
    ],
    source: 'grounded-js-fallback',
  };
};

/**
 * Classify user intent and extract entities using the Python FastAPI microservice
 * with automatic grounded JavaScript fallback.
 */
export const classifyIntentAndEntities = async (text, timeoutMs = DEFAULT_TIMEOUT_MS) => {
  const sanitizedText = String(text || '').trim();
  if (!sanitizedText) {
    return runGroundedNlpFallback('');
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const res = await fetch(`${AI_SERVICE_URL}/nlp/classify-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: sanitizedText }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      return {
        ...data,
        source: 'python-microservice',
      };
    } else {
      console.warn(`[NLP] Python service returned HTTP ${res.status}. Falling back to grounded JS NLP engine.`);
      return runGroundedNlpFallback(sanitizedText);
    }
  } catch (err) {
    console.warn(`[NLP] Python service unreachable (${err.message}). Activating grounded JS NLP engine.`);
    return runGroundedNlpFallback(sanitizedText);
  }
};

export default {
  classifyIntentAndEntities,
  runGroundedNlpFallback,
};
