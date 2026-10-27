import Service from '../models/Service.js';
import User from '../models/User.js';
import ProfessionalProfile from '../models/ProfessionalProfile.js';

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';
const DEFAULT_TIMEOUT_MS = 6000;

/**
 * Retrieve active packages from MongoDB populated with creator profile information
 */
export const getActivePackagesFromDb = async () => {
  const services = await Service.find({ isActive: true }).lean();
  if (!services || services.length === 0) return [];

  const proUserIds = [...new Set(services.map((s) => s.professional?.toString()).filter(Boolean))];

  const [users, profiles] = await Promise.all([
    User.find({ _id: { $in: proUserIds } }).select('name email avatar location professionalProfile isVerified').lean(),
    ProfessionalProfile.find({ user: { $in: proUserIds } }).select('user startingPrice rating reviewCount specialties').lean(),
  ]);

  const userMap = new Map(users.map((u) => [u._id.toString(), u]));
  const profileMap = new Map(profiles.map((p) => [p.user.toString(), p]));

  return services.map((s) => {
    const proId = s.professional?.toString();
    const user = userMap.get(proId);
    const profile = profileMap.get(proId);

    return {
      id: s._id.toString(),
      title: s.title,
      category: s.category,
      professionType: s.professionType || 'photographer',
      price: s.price,
      pricingType: s.pricingType || 'fixed',
      deliveryDays: s.deliveryDays || 7,
      revisionsAllowed: s.revisionsAllowed || 2,
      inclusions: s.inclusions || [],
      description: s.description || '',
      coverImage: s.coverImage,
      proId: proId,
      proName: user?.name || 'Verified Creator',
      proCity: user?.location?.city || '',
      proAvatar: user?.avatar?.url || '',
      proSpecialties: profile?.specialties || [],
      proRating: profile?.rating || 4.8,
      proReviewCount: profile?.reviewCount || 10,
      proStartingPrice: profile?.startingPrice || s.price,
    };
  });
};

/**
 * Call Python FastAPI inference microservice to rank packages using Scikit-learn
 */
export const rankPackagesViaPythonMl = async (preferences, packages) => {
  const response = await fetch(`${AI_SERVICE_URL}/recommend/packages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      preferences,
      packages,
    }),
    signal: AbortSignal.timeout(DEFAULT_TIMEOUT_MS),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Python AI Service error (HTTP ${response.status}): ${errorText}`);
  }

  const result = await response.json();
  return {
    ...result,
    provider: 'python-scikit-learn',
  };
};

/**
 * Robust grounded fallback ranking engine when Python microservice is offline
 * Strictly respects actual package attributes and mathematical domain alignment
 */
export const rankPackagesGroundedFallback = (preferences, packages) => {
  const reqEvent = (preferences.eventType || 'Wedding').toLowerCase();
  const reqBudget = parseFloat(preferences.budget) || 20000;
  const reqCity = (preferences.location || '').toLowerCase();
  const reqStyle = (preferences.photographyStyle || '').toLowerCase();
  const reqService = (preferences.requiredService || 'all').toLowerCase();
  const strictBudget = Boolean(preferences.strictBudget);

  let eligible = packages;
  if (strictBudget) {
    const underBudget = packages.filter((p) => p.price <= reqBudget);
    if (underBudget.length > 0) eligible = underBudget;
  }

  const scored = eligible.map((pkg) => {
    let score = 0;
    const reasons = [];
    const badges = [];

    // 1. Category / Event Match (up to 40 pts)
    const catLower = (pkg.category || '').toLowerCase();
    const titleLower = (pkg.title || '').toLowerCase();
    const isWeddingReq = reqEvent.includes('wedding') || reqEvent.includes('marriage') || reqEvent.includes('engagement');
    const isWeddingPkg = catLower.includes('wedding') || titleLower.includes('wedding');

    if (isWeddingReq && isWeddingPkg) {
      score += 0.40;
      reasons.push(`Direct match for ${pkg.category}.`);
      badges.push('Category Match');
    } else if (catLower.includes(reqEvent) || reqEvent.includes(catLower)) {
      score += 0.40;
      reasons.push(`Matches requested event: ${pkg.category}.`);
      badges.push('Category Match');
    } else if (isWeddingReq && pkg.professionType === 'editor') {
      score -= 0.30; // Video editors don't shoot in-person wedding events
    }

    // 2. Budget Scoring (up to 30 pts)
    const isWithinBudget = pkg.price <= reqBudget;
    if (isWithinBudget) {
      const budgetSavings = reqBudget - pkg.price;
      score += 0.30;
      if (budgetSavings === 0) {
        reasons.push(`Exact match for your ₹${reqBudget.toLocaleString('en-IN')} budget.`);
      } else {
        reasons.push(`Fits within budget with ₹${budgetSavings.toLocaleString('en-IN')} remaining.`);
      }
      badges.push('Within Budget');
    } else {
      const overBy = pkg.price - reqBudget;
      const penalty = Math.min(overBy / reqBudget, 0.25);
      score += Math.max(0.05, 0.30 - penalty);
      reasons.push(`Stretch option: ₹${overBy.toLocaleString('en-IN')} over target budget.`);
      badges.push('Stretch Option');
    }

    // 3. Location Match (up to 15 pts)
    if (reqCity && pkg.proCity && reqCity === pkg.proCity.toLowerCase()) {
      score += 0.15;
      reasons.push(`Local creator based in ${pkg.proCity} (zero travel surcharge).`);
      badges.push(`Local in ${pkg.proCity}`);
    }

    // 4. Style Match (up to 15 pts)
    const specialtiesJoined = (pkg.proSpecialties || []).join(' ').toLowerCase();
    if (reqStyle && (specialtiesJoined.includes(reqStyle) || titleLower.includes(reqStyle) || (pkg.description || '').toLowerCase().includes(reqStyle))) {
      score += 0.15;
      reasons.push(`Specialized in ${preferences.photographyStyle} aesthetic.`);
      badges.push(`${preferences.photographyStyle} Style`);
    }

    // 5. Service Type Filter
    if (reqService !== 'all' && reqService !== pkg.professionType) {
      score -= 0.40;
    }

    // Quality badges
    if (pkg.proRating && pkg.proRating >= 4.8) {
      reasons.push(`Top-rated professional: ★ ${pkg.proRating.toFixed(1)} (${pkg.proReviewCount || 0} reviews).`);
      badges.push(`★ ${pkg.proRating.toFixed(1)} Rated`);
    }

    if (pkg.deliveryDays && pkg.deliveryDays <= 7) {
      badges.push(`${pkg.deliveryDays}-Day Delivery`);
    }

    const finalProb = Math.min(Math.max(score, 0.05), 0.99);

    return {
      package: pkg,
      relevanceScore: Math.round(finalProb * 1000) / 1000,
      matchPercentage: Math.round(finalProb * 100),
      isWithinBudget,
      isRecommended: finalProb >= 0.50,
      reasons,
      matchBadges: badges,
    };
  });

  // Sort descending by score, then price
  scored.sort((a, b) => b.relevanceScore - a.relevanceScore || a.package.price - b.package.price);

  const recommendations = scored.map((item, idx) => ({
    ...item,
    matchRank: idx + 1,
  }));

  const avgConfidence = recommendations.length > 0
    ? recommendations.reduce((acc, r) => acc + r.relevanceScore, 0) / recommendations.length
    : 0;

  return {
    status: 'success',
    totalCandidates: packages.length,
    matchedCount: recommendations.length,
    recommendations,
    modelName: 'Lenscraft Grounded Fallback Matching Engine',
    mlConfidenceAverage: Math.round(avgConfidence * 1000) / 1000,
    provider: 'grounded-engine-fallback',
    appliedConstraints: {
      eventType: preferences.eventType,
      budget: reqBudget,
      location: preferences.location,
      style: preferences.photographyStyle,
      requiredService: reqService,
      strictBudgetApplied: strictBudget,
    },
  };
};

/**
 * Main coordinator function for Smart Package Recommendations
 */
export const getSmartPackageRecommendations = async (preferences = {}) => {
  // 1. Fetch real packages from MongoDB
  const allPackages = await getActivePackagesFromDb();
  if (allPackages.length === 0) {
    return {
      status: 'empty',
      totalCandidates: 0,
      matchedCount: 0,
      recommendations: [],
      modelName: 'None',
      mlConfidenceAverage: 0,
      message: 'No active service packages found in the database.',
      appliedConstraints: preferences,
    };
  }

  // 2. Try Python FastAPI microservice first
  try {
    const mlResult = await rankPackagesViaPythonMl(preferences, allPackages);
    return mlResult;
  } catch (err) {
    console.warn(`[SmartPackageRecommendation] Python microservice unavailable (${err.message}). Activating grounded fallback engine.`);
    // 3. Fallback safely to verified deterministic engine
    return rankPackagesGroundedFallback(preferences, allPackages);
  }
};

export default {
  getActivePackagesFromDb,
  rankPackagesViaPythonMl,
  rankPackagesGroundedFallback,
  getSmartPackageRecommendations,
};
