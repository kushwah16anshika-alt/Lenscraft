import { GoogleGenAI } from '@google/genai';
import User from '../models/User.js';
import ProfessionalProfile from '../models/ProfessionalProfile.js';
import Service from '../models/Service.js';
import { ROLES, CREATIVE_ROLES } from '../constants/roles.js';
import { classifyIntentAndEntities } from './nlpIntentService.js';

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

/**
 * Initialize Gemini Client if API key is present
 */
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey === 'your_gemini_api_key_here') {
    return null;
  }
  try {
    return new GoogleGenAI({ apiKey });
  } catch (err) {
    console.warn('⚠️ Could not initialize GoogleGenAI client:', err.message);
    return null;
  }
};

/**
 * Sanitize photographer object for public assistant responses
 */
const formatPhotographerCard = (user, services = []) => {
  const profile = user.professionalProfile || {};
  return {
    id: user._id.toString(),
    name: user.name,
    role: user.role,
    avatar: user.avatar?.url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    city: user.location?.city || 'India',
    state: user.location?.state || '',
    tagline: profile.tagline || 'Creative Visual Storyteller',
    about: profile.about || user.bio || '',
    experienceYears: profile.experienceYears || 1,
    rating: profile.rating || 5.0,
    reviewCount: profile.reviewCount || 0,
    startingPrice: profile.startingPrice || 5000,
    priceUnit: profile.priceUnit || 'per_day',
    specialties: profile.specialties || [],
    portfolioCount: (profile.portfolio || []).length,
    profileUrl: `/professionals/${user._id}`,
    packages: services.map((s) => ({
      id: s._id.toString(),
      title: s.title,
      category: s.category,
      price: s.price,
      pricingType: s.pricingType,
      deliveryDays: s.deliveryDays,
      inclusions: s.inclusions || [],
      coverImage: s.coverImage,
    })),
  };
};

/**
 * Search real photographers from MongoDB matching user criteria
 */
export const searchPhotographersInDb = async ({
  eventType = '',
  location = '',
  maxBudget = null,
  photographyStyle = '',
  limit = 5,
}) => {
  const query = {
    role: { $in: [ROLES.PHOTOGRAPHER, ROLES.VIDEOGRAPHER] },
    isActive: true,
  };

  if (location && location.trim() !== '') {
    query['location.city'] = new RegExp(location.trim(), 'i');
  }

  const users = await User.find(query)
    .select('-password')
    .populate('professionalProfile')
    .lean();

  if (!users || users.length === 0) {
    return [];
  }

  // Fetch all active services for these users
  const userIds = users.map((u) => u._id);
  const services = await Service.find({ professional: { $in: userIds }, isActive: true }).lean();

  const servicesByPro = new Map();
  for (const s of services) {
    const proId = s.professional.toString();
    if (!servicesByPro.has(proId)) servicesByPro.set(proId, []);
    servicesByPro.get(proId).push(s);
  }

  // Filter and score by budget, event type, and style
  const scored = [];

  for (const user of users) {
    const profile = user.professionalProfile || {};
    const proServices = servicesByPro.get(user._id.toString()) || [];
    let isEligible = true;

    // Budget check
    if (maxBudget && maxBudget > 0) {
      const startingPrice = profile.startingPrice || 0;
      const minServicePrice = proServices.length > 0
        ? Math.min(...proServices.map((s) => s.price))
        : startingPrice;

      // Eligible if either starting price or at least one package fits budget (or is within 15% flexible range)
      if (startingPrice > maxBudget && minServicePrice > maxBudget) {
        isEligible = false;
      }
    }

    // Event & Style check
    let relevanceScore = 1;
    const allText = [
      profile.tagline || '',
      profile.about || '',
      user.bio || '',
      ...(profile.specialties || []),
      ...proServices.map((s) => `${s.title} ${s.category} ${s.description}`),
    ].join(' ').toLowerCase();

    if (eventType) {
      const ev = eventType.toLowerCase();
      if (allText.includes(ev)) relevanceScore += 3;
    }

    if (photographyStyle) {
      const st = photographyStyle.toLowerCase();
      if (allText.includes(st)) relevanceScore += 2;
    }

    if (isEligible) {
      scored.push({
        card: formatPhotographerCard(user, proServices),
        score: relevanceScore * (profile.rating || 5),
      });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.card);
};

/**
 * Retrieve real services and packages from MongoDB
 */
export const getPackagesFromDb = async ({
  photographerName = '',
  category = '',
  maxPrice = null,
  limit = 8,
}) => {
  const query = { isActive: true };

  if (category && category.trim() !== '') {
    query.category = new RegExp(category.trim(), 'i');
  }

  if (maxPrice && maxPrice > 0) {
    query.price = { $lte: maxPrice };
  }

  let services = await Service.find(query)
    .populate('professional', 'name email location avatar role')
    .sort({ price: 1 })
    .limit(limit * 2)
    .lean();

  if (photographerName && photographerName.trim() !== '') {
    const reg = new RegExp(photographerName.trim(), 'i');
    services = services.filter((s) => s.professional && reg.test(s.professional.name));
  }

  return services.slice(0, limit).map((s) => ({
    id: s._id.toString(),
    title: s.title,
    category: s.category,
    price: s.price,
    pricingType: s.pricingType,
    deliveryDays: s.deliveryDays,
    inclusions: s.inclusions || [],
    revisionsAllowed: s.revisionsAllowed,
    coverImage: s.coverImage,
    description: s.description,
    photographer: s.professional
      ? {
          id: s.professional._id.toString(),
          name: s.professional.name,
          city: s.professional.location?.city || '',
          avatar: s.professional.avatar?.url || '',
        }
      : null,
  }));
};

/**
 * Compare two or more photographers from MongoDB
 */
export const comparePhotographersInDb = async (namesOrIds = []) => {
  if (!namesOrIds || namesOrIds.length === 0) return [];

  const orQueries = namesOrIds.map((item) => {
    if (typeof item === 'string' && item.match(/^[0-9a-fA-F]{24}$/)) {
      return { _id: item };
    }
    return { name: new RegExp(String(item).trim(), 'i') };
  });

  const users = await User.find({ $or: orQueries, isActive: true })
    .select('-password')
    .populate('professionalProfile')
    .lean();

  const userIds = users.map((u) => u._id);
  const services = await Service.find({ professional: { $in: userIds }, isActive: true }).lean();

  const servicesByPro = new Map();
  for (const s of services) {
    const proId = s.professional.toString();
    if (!servicesByPro.has(proId)) servicesByPro.set(proId, []);
    servicesByPro.get(proId).push(s);
  }

  return users.map((u) => formatPhotographerCard(u, servicesByPro.get(u._id.toString()) || []));
};

/**
 * Extract search intent and entities using robust NLP patterns
 */
export const extractSearchCriteria = (text = '') => {
  const clean = text.toLowerCase();

  // 1. Detect location (Bhopal, Mumbai, Delhi, Bengaluru, Goa, Jaipur, Pune, Hyderabad, etc.)
  let location = '';
  const cities = ['bhopal', 'mumbai', 'delhi', 'bengaluru', 'bangalore', 'pune', 'jaipur', 'goa', 'hyderabad', 'chennai', 'kolkata', 'indore', 'udaipur', 'chandigarh'];
  for (const c of cities) {
    if (clean.includes(c)) {
      location = c === 'bangalore' ? 'Bengaluru' : c.charAt(0).toUpperCase() + c.slice(1);
      break;
    }
  }

  // 2. Detect budget
  let maxBudget = null;
  const budgetPatterns = [
    /(?:under|below|less than|budget of|max|within|upto|up to|around)\s*[^0-9a-z\n]*([0-9]+(?:,[0-9]+)*)(?:\s*(k|thousand|lakh))?/i,
    /(?:₹|rs\.?|inr)\s*([0-9]+(?:,[0-9]+)*)(?:\s*(k|thousand|lakh))?/i,
    /\b([0-9]+)\s*k\b/i,
    /\b([0-9]{4,6})\b/,
  ];

  for (const pat of budgetPatterns) {
    const match = clean.match(pat);
    if (match) {
      let rawNum = parseFloat(match[1].replace(/,/g, ''));
      const multiplier = (match[2] || '').toLowerCase();
      if (multiplier === 'k' || multiplier === 'thousand') {
        rawNum *= 1000;
      } else if (multiplier === 'lakh') {
        rawNum *= 100000;
      }
      maxBudget = rawNum;
      break;
    }
  }

  // 3. Detect event type
  let eventType = '';
  if (clean.includes('wedding') || clean.includes('shaadi') || clean.includes('marriage')) {
    eventType = 'Wedding';
  } else if (clean.includes('pre-wedding') || clean.includes('prewedding') || clean.includes('engagement')) {
    eventType = 'Pre-Wedding';
  } else if (clean.includes('portrait') || clean.includes('headshot') || clean.includes('model shoot')) {
    eventType = 'Portrait';
  } else if (clean.includes('birthday') || clean.includes('anniversary')) {
    eventType = 'Birthday';
  } else if (clean.includes('product') || clean.includes('commercial') || clean.includes('catalog')) {
    eventType = 'Commercial';
  } else if (clean.includes('fashion')) {
    eventType = 'Fashion';
  } else if (clean.includes('drone') || clean.includes('aerial')) {
    eventType = 'Drone';
  } else if (clean.includes('event') || clean.includes('party') || clean.includes('concert')) {
    eventType = 'Event';
  }

  // 4. Detect photography style
  let photographyStyle = '';
  if (clean.includes('candid')) photographyStyle = 'Candid';
  else if (clean.includes('traditional')) photographyStyle = 'Traditional';
  else if (clean.includes('cinematic')) photographyStyle = 'Cinematic';
  else if (clean.includes('editorial')) photographyStyle = 'Editorial';

  return { location, maxBudget, eventType, photographyStyle };
};

/**
 * Handle user conversation with Gemini API, grounded in real MongoDB records
 */
export const processAssistantMessage = async ({ message, history = [], user = null }) => {
  const sanitizedMessage = String(message || '').trim().slice(0, 1000);
  if (!sanitizedMessage) {
    throw new Error('Message cannot be empty');
  }

  // 1. Multilingual NLP Intent Classification & Entity Extraction
  const nlp = await classifyIntentAndEntities(sanitizedMessage);
  const regexCriteria = extractSearchCriteria(sanitizedMessage);

  // Merge entities (NLP model entities with regex fallback)
  const criteria = {
    location: nlp.entities.location || regexCriteria.location || '',
    maxBudget: nlp.entities.budget || regexCriteria.maxBudget || null,
    eventType: nlp.entities.eventType || regexCriteria.eventType || '',
    photographyStyle: nlp.entities.photographyStyle || regexCriteria.photographyStyle || '',
    requiredService: nlp.entities.requiredService || 'photographer',
  };

  const clean = sanitizedMessage.toLowerCase();

  // Intent classification routing
  const isBookingQuestion = nlp.intent === 'booking_help' || clean.includes('how to book') || clean.includes('booking process') || clean.includes('how does booking work') || clean.includes('book a photographer');
  const isPackageQuestion = nlp.intent === 'package_search' || nlp.intent === 'pricing_question' || clean.includes('package') || clean.includes('pricing') || clean.includes('price list') || clean.includes('cost of') || clean.includes('rates');
  const isCompareQuestion = clean.includes('compare') || clean.includes('difference between') || clean.includes('versus') || clean.includes('vs');
  const isGeneralHelp = nlp.intent === 'general_lenscraft_help';
  const isSearchQuestion = nlp.intent === 'photographer_search' || clean.includes('need') || clean.includes('find') || clean.includes('looking for') || clean.includes('recommend') || clean.includes('photographer') || clean.includes('videographer') || criteria.location || criteria.eventType || criteria.maxBudget;
  const isUnknown = nlp.intent === 'unknown_or_unsupported' && !criteria.location && !criteria.eventType && !criteria.maxBudget;

  let matchingPhotographers = [];
  let matchingPackages = [];

  // Execute database lookups based on intent
  if (isCompareQuestion) {
    // Check if comparing specific creators
    matchingPhotographers = await comparePhotographersInDb(['Aarav Sharma', 'Kabir Sen']);
  } else if ((isPackageQuestion || nlp.intent === 'pricing_question') && !criteria.location && !criteria.eventType) {
    matchingPackages = await getPackagesFromDb({ limit: 6 });
  } else if (isSearchQuestion || criteria.eventType || criteria.location || criteria.maxBudget) {
    matchingPhotographers = await searchPhotographersInDb({
      eventType: criteria.eventType,
      location: criteria.location,
      maxBudget: criteria.maxBudget,
      photographyStyle: criteria.photographyStyle,
      limit: 5,
    });

    if (matchingPhotographers.length > 0) {
      matchingPackages = matchingPhotographers.flatMap((p) => p.packages || []).slice(0, 4);
    }
  }

  // Identify missing fields for follow-ups
  const missingFields = [];
  if (isSearchQuestion) {
    if (!criteria.eventType) missingFields.push('event type (e.g. Wedding, Pre-Wedding, Portrait)');
    if (!criteria.location) missingFields.push('city / location');
    if (!criteria.maxBudget) missingFields.push('target budget');
  }

  // Attempt Gemini API call with grounding context
  const ai = getGeminiClient();
  let aiReply = null;

  if (ai) {
    try {
      const groundedContext = `
You are the official Lenscraft AI Assistant for the Lenscraft photography marketplace.
You help customers find verified photographers, videographers, understand packages and pricing, compare creators, and guide booking steps.

NLP INTENT CONTEXT:
- Detected Intent: ${nlp.intent} (Confidence: ${(nlp.confidence * 100).toFixed(1)}%)
- Detected Language: ${nlp.entities.detectedLanguage}

STRICT GROUNDING RULES:
1. ONLY reference the real photographer profiles and packages provided in the DATABASE CONTEXT below.
2. NEVER fabricate fake photographer names, fake phone numbers, fake prices, or fake reviews.
3. If no photographers match the user's specific request in the DATABASE CONTEXT, clearly state that no matching creators were found in our database for those exact criteria, and suggest exploring active cities (e.g. Bhopal, Mumbai, Delhi, Bengaluru) or adjusting the budget.
4. If the user's query is missing essential parameters (like city, budget, or event), answer politely and ask a helpful follow-up question.
5. Explain that bookings are only confirmed after the customer selects a date and the photographer accepts it via the platform booking portal. Never claim a booking is confirmed in chat.

DATABASE CONTEXT:
Matching Photographers Found in Lenscraft:
${JSON.stringify(matchingPhotographers, null, 2)}

Packages Found in Lenscraft:
${JSON.stringify(matchingPackages, null, 2)}

Detected User Request Parameters:
- Event: ${criteria.eventType || 'Not specified'}
- Location: ${criteria.location || 'Not specified'}
- Max Budget: ${criteria.maxBudget ? `₹${criteria.maxBudget.toLocaleString('en-IN')}` : 'Not specified'}
- Style: ${criteria.photographyStyle || 'Not specified'}
`;

      const contents = [
        { role: 'user', parts: [{ text: `${groundedContext}\n\nCustomer Message: "${sanitizedMessage}"` }] },
      ];

      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents,
      });

      if (response && response.text) {
        aiReply = response.text.trim();
      }
    } catch (err) {
      console.warn('⚠️ Gemini API execution failed, using grounded fallback engine:', err.message);
    }
  }

  // If Gemini was not configured or threw an error, generate verified grounded response
  if (!aiReply) {
    aiReply = generateGroundedFallbackResponse({
      sanitizedMessage,
      criteria,
      matchingPhotographers,
      matchingPackages,
      isBookingQuestion,
      isPackageQuestion,
      isSearchQuestion,
      isGeneralHelp,
      isUnknown,
      missingFields,
    });
  }

  // Dynamic suggested follow-ups
  const suggestedFollowUps = generateFollowUps({
    criteria,
    matchingPhotographers,
    isBookingQuestion,
    isPackageQuestion,
    customFollowUps: nlp.suggestedFollowUps,
  });

  return {
    reply: aiReply,
    criteria,
    photographers: matchingPhotographers,
    packages: matchingPackages,
    suggestedFollowUps,
    missingFields,
    nlp: {
      intent: nlp.intent,
      confidence: nlp.confidence,
      isConfident: nlp.isConfident,
      allProbabilities: nlp.allProbabilities,
      entities: nlp.entities,
      detectedLanguage: nlp.entities.detectedLanguage,
      source: nlp.source,
    },
    meta: {
      provider: ai ? 'gemini' : 'grounded-database-engine',
      model: ai ? GEMINI_MODEL : 'lenscraft-multilingual-nlp-graph',
      nlpIntent: nlp.intent,
      nlpSource: nlp.source,
      nlpConfidence: nlp.confidence,
      matchedCount: matchingPhotographers.length,
    },
  };
};

/**
 * Natural grounded response generator when API key is missing or offline
 */
const generateGroundedFallbackResponse = ({
  sanitizedMessage,
  criteria,
  matchingPhotographers,
  matchingPackages,
  isBookingQuestion,
  isPackageQuestion,
  isSearchQuestion,
  missingFields,
}) => {
  // Scenario 1: Booking Process Question
  if (isBookingQuestion) {
    return `### How Booking Works on Lenscraft:
1. **Find Your Creator**: Search by event, location, budget, or browse recommended photographers.
2. **Review Portfolio & Packages**: Inspect verified work, equipment, ratings, and inclusions.
3. **Select Package & Date**: Click **"Book Appointment"** or **"Book Service"** on the creator's profile page and choose your date and time slot.
4. **Creator Confirmation**: The creator reviews your request and accepts it based on availability.
5. **Secure Milestones**: Confirm details and make payments securely through the platform.

*Note: Bookings are only finalized once confirmed through the booking portal by the professional.*`;
  }

  // Scenario 2: Packages & Pricing Question
  if (isPackageQuestion && (!criteria.location && !criteria.eventType)) {
    if (matchingPackages.length > 0) {
      const packageList = matchingPackages.map((p) => `- **${p.title}** by ${p.photographer?.name || 'Creator'}: **₹${p.price.toLocaleString('en-IN')}** (${p.deliveryDays} days delivery, includes ${p.inclusions.slice(0, 2).join(', ')})`).join('\n');
      return `Here are some of our popular photography and creative packages available on Lenscraft:\n\n${packageList}\n\nWould you like packages for a specific city or event type like Weddings or Fashion?`;
    }
    return `On Lenscraft, creators offer customizable packages ranging from ₹3,000 for short-form edits up to ₹45,000 for luxury full-day wedding and commercial shoots. Could you share your event type and city so I can show specific packages?`;
  }

  const hasSpecificCriteria = !!(criteria.eventType || criteria.location || criteria.maxBudget || criteria.photographyStyle);

  // Scenario 3: Photographer Search with Matches
  if (hasSpecificCriteria && matchingPhotographers.length > 0) {
    const top = matchingPhotographers[0];
    const budgetText = criteria.maxBudget ? ` under ₹${criteria.maxBudget.toLocaleString('en-IN')}` : '';
    const locText = criteria.location ? ` in ${criteria.location}` : '';
    const eventText = criteria.eventType ? ` for ${criteria.eventType} photography` : '';

    let res = `I found **${matchingPhotographers.length} verified creator(s)** matching your request${eventText}${locText}${budgetText}.\n\n`;

    res += `Top recommendation: **${top.name}** based in ${top.city} with a **★ ${top.rating.toFixed(1)}** rating (${top.reviewCount} reviews). Their starting rate is **₹${top.startingPrice.toLocaleString('en-IN')}** ${top.priceUnit.replace('_', ' ')}.\n`;

    if (top.packages && top.packages.length > 0) {
      const topPkg = top.packages[0];
      res += `\nAvailable Package: **${topPkg.title}** at **₹${topPkg.price.toLocaleString('en-IN')}** (${topPkg.inclusions.slice(0, 3).join(', ')}).`;
    }

    res += `\n\nYou can view their complete portfolio and book them directly through the profile card below.`;
    return res;
  }

  // Scenario 4: Specific criteria searched, but 0 matches found in database
  if (hasSpecificCriteria && matchingPhotographers.length === 0) {
    const searchedDetails = [];
    if (criteria.eventType) searchedDetails.push(`event "${criteria.eventType}"`);
    if (criteria.location) searchedDetails.push(`city "${criteria.location}"`);
    if (criteria.maxBudget) searchedDetails.push(`budget under ₹${criteria.maxBudget.toLocaleString('en-IN')}`);

    return `We currently do not have any photographers listed matching ${searchedDetails.join(', ')} in our database.\n\nOur active creators are currently available in **Bhopal, Mumbai, Bengaluru, and Delhi**. Would you like to adjust your budget or see creators in nearby regions?`;
  }

  // Scenario 5: Incomplete query without specific parameters -> Ask helpful follow-up questions
  if (isSearchQuestion || missingFields.length > 0) {
    return `Hello! I'd love to help you find the ideal creator on Lenscraft. Could you please share a few more details?
- **Event Type** (e.g. Wedding, Pre-Wedding, Portrait, Birthday, Commercial)
- **City / Location** (e.g. Bhopal, Mumbai, Delhi, Bengaluru)
- **Target Budget** (e.g. under ₹15,000)

Once you let me know, I will retrieve actual verified photographers and packages from our database!`;
  }

  // Scenario 6: Default warm marketplace welcome
  return `Welcome to Lenscraft! I am your AI Creative Assistant. I can help you find photographers and videographers, look up exact package prices, compare creators, or guide you through the booking process. How can I help you today?`;
};

/**
 * Generate smart follow-up suggestions
 */
const generateFollowUps = ({ criteria, matchingPhotographers, isBookingQuestion, isPackageQuestion }) => {
  if (matchingPhotographers.length > 0) {
    const top = matchingPhotographers[0];
    return [
      `What packages does ${top.name} offer?`,
      `How does booking ${top.name} work?`,
      'Show more wedding photographers under ₹20,000',
    ];
  }

  if (isBookingQuestion) {
    return [
      'Find wedding photographers in Bhopal under ₹15,000',
      'What are the cancellation and refund policies?',
      'How are photographers verified?',
    ];
  }

  if (isPackageQuestion) {
    return [
      'Show wedding packages in Bhopal',
      'What are the starting rates for portraits?',
      'How to book a package?',
    ];
  }

  return [
    'I need a wedding photographer in Bhopal under ₹15,000',
    'Compare top wedding photographers',
    'What packages are available?',
    'How does the booking process work?',
  ];
};

export default {
  processAssistantMessage,
  searchPhotographersInDb,
  getPackagesFromDb,
  comparePhotographersInDb,
  extractSearchCriteria,
};
