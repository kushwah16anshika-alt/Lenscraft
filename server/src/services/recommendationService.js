import User from '../models/User.js';
import ProfessionalProfile from '../models/ProfessionalProfile.js';
import Service from '../models/Service.js';
import Booking from '../models/Booking.js';
import { ROLES, CREATIVE_ROLES } from '../constants/roles.js';

export const DEFAULT_WEIGHTS = {
  style: 0.25,
  budget: 0.25,
  location: 0.20,
  service: 0.20,
  availability: 0.10,
};

/**
 * Normalizes string for case-insensitive and trimmed comparison
 */
const normalizeText = (text) => (text ? String(text).toLowerCase().trim() : '');

/**
 * Content-based recommendation algorithm for creative professionals (Photographers)
 * Evaluates real MongoDB documents across User, ProfessionalProfile, Service, and Booking.
 */
export const rankPhotographers = async ({
  eventType = '',
  location = '',
  maxBudget = null,
  photographyStyle = '',
  eventDate = null,
  weights = {},
  strictBudget = false,
  excludeUnavailable = true,
  limit = 20,
}) => {
  // 1. Resolve and normalize weights
  const finalWeights = {
    style: typeof weights.style === 'number' ? weights.style : DEFAULT_WEIGHTS.style,
    budget: typeof weights.budget === 'number' ? weights.budget : DEFAULT_WEIGHTS.budget,
    location: typeof weights.location === 'number' ? weights.location : DEFAULT_WEIGHTS.location,
    service: typeof weights.service === 'number' ? weights.service : DEFAULT_WEIGHTS.service,
    availability: typeof weights.availability === 'number' ? weights.availability : DEFAULT_WEIGHTS.availability,
  };

  const totalWeight =
    finalWeights.style +
    finalWeights.budget +
    finalWeights.location +
    finalWeights.service +
    finalWeights.availability || 1.0;

  // 2. Query all active photographers from MongoDB
  const photographerUsers = await User.find({
    role: ROLES.PHOTOGRAPHER,
    isActive: true,
  })
    .select('-password')
    .populate('professionalProfile')
    .lean();

  if (!photographerUsers || photographerUsers.length === 0) {
    return [];
  }

  const userIds = photographerUsers.map((u) => u._id);

  // 3. Batch retrieve all active services (packages) for these photographers from MongoDB
  const allServices = await Service.find({
    professional: { $in: userIds },
    isActive: true,
  }).lean();

  const servicesByProfessional = allServices.reduce((acc, srv) => {
    const pId = srv.professional.toString();
    if (!acc[pId]) acc[pId] = [];
    acc[pId].push(srv);
    return acc;
  }, {});

  // 4. Batch retrieve bookings if eventDate is provided
  let bookedProfessionalIds = new Set();
  let dayOfWeek = null;
  let parsedDate = null;

  if (eventDate) {
    parsedDate = new Date(eventDate);
    if (!isNaN(parsedDate.getTime())) {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      dayOfWeek = days[parsedDate.getUTCDay()];

      const startOfDay = new Date(parsedDate);
      startOfDay.setUTCHours(0, 0, 0, 0);
      const endOfDay = new Date(parsedDate);
      endOfDay.setUTCHours(23, 59, 59, 999);

      const activeBookings = await Booking.find({
        professional: { $in: userIds },
        eventDate: { $gte: startOfDay, $lte: endOfDay },
        status: { $in: ['pending', 'accepted', 'in_progress'] },
      }).lean();

      activeBookings.forEach((b) => {
        bookedProfessionalIds.add(b.professional.toString());
      });
    }
  }

  // 5. Score each photographer
  const scoredPhotographers = [];

  const normTargetStyle = normalizeText(photographyStyle);
  const normTargetLocation = normalizeText(location);
  const normTargetEvent = normalizeText(eventType);
  const numericBudget = maxBudget !== null && maxBudget !== undefined && maxBudget !== '' ? Number(maxBudget) : null;

  for (const user of photographerUsers) {
    const profile = user.professionalProfile || {};
    const professionalServices = servicesByProfessional[user._id.toString()] || [];

    // --- A. Availability Evaluation ---
    let availabilityScore = 1.0;
    let availabilityStatus = 'UNVERIFIED';
    let availabilityExplanation = 'No event date specified.';

    if (parsedDate && !isNaN(parsedDate.getTime())) {
      const isBooked = bookedProfessionalIds.has(user._id.toString());
      const schedule = profile.availability || [];

      if (isBooked) {
        availabilityStatus = 'UNAVAILABLE';
        availabilityScore = 0.0;
        availabilityExplanation = `Already booked on requested date (${parsedDate.toISOString().split('T')[0]}).`;
      } else if (schedule.length > 0) {
        const daySlot = schedule.find((slot) => slot.dayOfWeek === dayOfWeek);
        if (daySlot) {
          if (daySlot.isAvailable) {
            availabilityStatus = 'VERIFIED_AVAILABLE';
            availabilityScore = 1.0;
            availabilityExplanation = `Verified open on ${dayOfWeek} (${daySlot.startTime || '09:00'} - ${daySlot.endTime || '18:00'}).`;
          } else {
            availabilityStatus = 'UNAVAILABLE';
            availabilityScore = 0.0;
            availabilityExplanation = `Photographer marked unavailable on ${dayOfWeek}s in their weekly schedule.`;
          }
        } else {
          availabilityStatus = 'UNVERIFIED';
          availabilityScore = 0.4;
          availabilityExplanation = `No weekly schedule defined for ${dayOfWeek}. Verification required.`;
        }
      } else {
        // Rule 8: Never assume availability if missing from DB
        availabilityStatus = 'UNVERIFIED';
        availabilityScore = 0.4;
        availabilityExplanation = 'Schedule unverified in database. Please confirm directly with creator.';
      }
    }

    // Exclude if strictly unavailable and exclusion requested
    if (excludeUnavailable && (availabilityStatus === 'UNAVAILABLE')) {
      continue;
    }

    // --- B. Photography Style Match ---
    let styleScore = 1.0;
    let styleExplanation = 'Any style accepted.';

    if (normTargetStyle) {
      const specialties = (profile.specialties || []).map(normalizeText);
      const portfolioTags = (profile.portfolio || []).flatMap((item) => (item.tags || []).map(normalizeText));
      const portfolioCategories = (profile.portfolio || []).map((item) => normalizeText(item.category));
      const serviceTitles = professionalServices.map((s) => normalizeText(s.title));

      const hasExactSpecialty = specialties.some((s) => s === normTargetStyle);
      const hasSpecialtySubstring = specialties.some((s) => s.includes(normTargetStyle) || normTargetStyle.includes(s));
      const hasTagMatch = portfolioTags.some((t) => t.includes(normTargetStyle));
      const hasCategoryMatch = portfolioCategories.some((c) => c.includes(normTargetStyle));
      const hasServiceTitleMatch = serviceTitles.some((t) => t.includes(normTargetStyle));

      if (hasExactSpecialty) {
        styleScore = 1.0;
        styleExplanation = `Primary specialty in ${photographyStyle} photography.`;
      } else if (hasSpecialtySubstring) {
        styleScore = 0.9;
        styleExplanation = `Strong specialty match for ${photographyStyle}.`;
      } else if (hasTagMatch || hasCategoryMatch) {
        styleScore = 0.8;
        styleExplanation = `Portfolio showcases verified work in ${photographyStyle} style.`;
      } else if (hasServiceTitleMatch) {
        styleScore = 0.75;
        styleExplanation = `Offers packages specifically covering ${photographyStyle}.`;
      } else {
        styleScore = 0.15;
        styleExplanation = `No verified portfolio work or specialty on file for ${photographyStyle}.`;
      }
    }

    // --- C. Budget Compatibility ---
    let budgetScore = 1.0;
    let budgetExplanation = 'Budget open.';
    let bestPackage = null;
    let lowestPackagePrice = profile.startingPrice || 5000;

    // Determine relevant services (matching event type if applicable)
    let relevantServices = professionalServices;
    if (normTargetEvent && professionalServices.length > 0) {
      const eventMatchedServices = professionalServices.filter(
        (s) =>
          normalizeText(s.category).includes(normTargetEvent) ||
          normalizeText(s.title).includes(normTargetEvent) ||
          normalizeText(s.description).includes(normTargetEvent)
      );
      if (eventMatchedServices.length > 0) {
        relevantServices = eventMatchedServices;
      }
    }

    if (relevantServices.length > 0) {
      // Sort relevant services by price ascending
      const sortedServices = [...relevantServices].sort((a, b) => a.price - b.price);
      if (numericBudget !== null && !isNaN(numericBudget)) {
        // Find best package <= numericBudget, or lowest package
        const affordable = sortedServices.filter((s) => s.price <= numericBudget);
        bestPackage = affordable.length > 0 ? affordable[affordable.length - 1] : sortedServices[0];
      } else {
        bestPackage = sortedServices[0];
      }
      lowestPackagePrice = bestPackage ? bestPackage.price : sortedServices[0].price;
    } else {
      lowestPackagePrice = profile.startingPrice || 5000;
      bestPackage = {
        title: 'Starting Day Rate',
        price: lowestPackagePrice,
        pricingType: profile.priceUnit || 'per_day',
      };
    }

    if (numericBudget !== null && !isNaN(numericBudget) && numericBudget > 0) {
      if (lowestPackagePrice <= numericBudget) {
        budgetScore = 1.0;
        budgetExplanation = `Package '${bestPackage?.title || 'Package'}' at ₹${lowestPackagePrice.toLocaleString('en-IN')} fits comfortably within your ₹${numericBudget.toLocaleString('en-IN')} budget.`;
      } else {
        const difference = lowestPackagePrice - numericBudget;
        const overBudgetRatio = difference / numericBudget;

        if (strictBudget && overBudgetRatio > 0) {
          // Excluded due to hard budget constraint
          continue;
        }

        if (overBudgetRatio <= 0.25) {
          // Within 25% margin of customer's budget
          budgetScore = Math.max(0.1, 1.0 - overBudgetRatio * 3);
          budgetExplanation = `Package '${bestPackage?.title}' at ₹${lowestPackagePrice.toLocaleString('en-IN')} is slightly above budget (+₹${difference.toLocaleString('en-IN')}).`;
        } else {
          budgetScore = 0.05;
          budgetExplanation = `Packages start at ₹${lowestPackagePrice.toLocaleString('en-IN')}, exceeding your ₹${numericBudget.toLocaleString('en-IN')} budget.`;
          if (strictBudget) {
            continue;
          }
        }
      }
    }

    // --- D. Location Match ---
    let locationScore = 1.0;
    let locationExplanation = 'Location flexible.';
    const userCity = normalizeText(user.location?.city);
    const userState = normalizeText(user.location?.state);
    const travelsToClient = profile.travelsToClient !== false;
    const maxTravelDistance = profile.maxTravelDistanceKm || 50;

    if (normTargetLocation) {
      if (userCity === normTargetLocation || userCity.includes(normTargetLocation) || normTargetLocation.includes(userCity)) {
        locationScore = 1.0;
        locationExplanation = `Based locally in ${user.location?.city || location}. No travel overhead.`;
      } else if (travelsToClient) {
        if (userState && (userState === normTargetLocation || normTargetLocation.includes(userState))) {
          locationScore = 0.85;
          locationExplanation = `Based in ${user.location?.city}, travels within ${user.location?.state} (up to ${maxTravelDistance}km).`;
        } else {
          locationScore = 0.65;
          locationExplanation = `Based in ${user.location?.city}, but open to traveling for destination projects.`;
        }
      } else {
        locationScore = 0.0;
        locationExplanation = `Based in ${user.location?.city} and does not travel outside base location.`;
      }
    }

    // --- E. Event / Service Match ---
    let serviceScore = 1.0;
    let serviceExplanation = 'General creative shoot.';

    if (normTargetEvent) {
      const hasDirectServiceCategory = professionalServices.some((s) => normalizeText(s.category).includes(normTargetEvent));
      const hasDirectServiceTitle = professionalServices.some((s) => normalizeText(s.title).includes(normTargetEvent));
      const hasSpecialty = (profile.specialties || []).some((spec) => normalizeText(spec).includes(normTargetEvent));

      if (hasDirectServiceCategory || hasDirectServiceTitle) {
        serviceScore = 1.0;
        serviceExplanation = `Offers verified ${eventType} service packages in catalog.`;
      } else if (hasSpecialty) {
        serviceScore = 0.85;
        serviceExplanation = `Experienced in ${eventType} photography.`;
      } else {
        serviceScore = 0.4;
        serviceExplanation = `General photographer; does not list dedicated ${eventType} packages.`;
      }
    }

    // --- Total Match Calculation ---
    const rawWeightedScore =
      (styleScore * finalWeights.style +
        budgetScore * finalWeights.budget +
        locationScore * finalWeights.location +
        serviceScore * finalWeights.service +
        availabilityScore * finalWeights.availability) /
      totalWeight;

    const overallScore = Math.min(100, Math.max(0, Math.round(rawWeightedScore * 100)));

    // Generate human-friendly match reasons
    const matchReasons = [];
    if (styleScore >= 0.8) matchReasons.push(styleExplanation);
    if (budgetScore >= 0.7) matchReasons.push(budgetExplanation);
    if (locationScore >= 0.8) matchReasons.push(locationExplanation);
    if (serviceScore >= 0.8) matchReasons.push(serviceExplanation);
    if (availabilityScore === 1.0) matchReasons.push(availabilityExplanation);
    else if (availabilityStatus === 'UNVERIFIED') matchReasons.push('⚠️ ' + availabilityExplanation);

    // If few positive reasons, provide the primary driver or note
    if (matchReasons.length === 0) {
      matchReasons.push('General creative portfolio match.');
    }

    // Cover image fallback
    const coverImage =
      profile.portfolio?.find((p) => p.isFeatured && p.mediaType === 'image')?.url ||
      profile.portfolio?.[0]?.url ||
      user.avatar?.url ||
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80';

    scoredPhotographers.push({
      _id: user._id,
      id: user._id.toString(),
      name: user.name,
      role: user.role,
      avatar: user.avatar?.url,
      bio: user.bio,
      location: user.location,
      city: user.location?.city || 'Unspecified',
      isVerified: !!user.isVerified,
      profile: {
        tagline: profile.tagline || 'Capturing moments, telling stories.',
        experienceYears: profile.experienceYears || 1,
        rating: profile.rating || 5.0,
        reviewCount: profile.reviewCount || 0,
        completedBookingsCount: profile.completedBookingsCount || 0,
        specialties: profile.specialties || [],
        startingPrice: profile.startingPrice || 5000,
        priceUnit: profile.priceUnit || 'per_day',
        travelsToClient,
      },
      coverImage,
      portfolio: profile.portfolio || [],
      services: professionalServices,
      bestMatchingPackage: bestPackage,
      displayPrice: lowestPackagePrice,
      priceUnit: bestPackage?.pricingType || profile.priceUnit || 'per_day',
      overallScore,
      availabilityStatus,
      matchReasons,
      componentScores: {
        style: {
          score: Math.round(styleScore * 100),
          weight: finalWeights.style,
          explanation: styleExplanation,
        },
        budget: {
          score: Math.round(budgetScore * 100),
          weight: finalWeights.budget,
          explanation: budgetExplanation,
          lowestPackagePrice,
          userBudget: numericBudget,
        },
        location: {
          score: Math.round(locationScore * 100),
          weight: finalWeights.location,
          explanation: locationExplanation,
        },
        service: {
          score: Math.round(serviceScore * 100),
          weight: finalWeights.service,
          explanation: serviceExplanation,
        },
        availability: {
          score: Math.round(availabilityScore * 100),
          weight: finalWeights.availability,
          status: availabilityStatus,
          explanation: availabilityExplanation,
        },
      },
    });
  }

  // 6. Sort descending by overall match score
  scoredPhotographers.sort((a, b) => {
    if (b.overallScore !== a.overallScore) {
      return b.overallScore - a.overallScore;
    }
    // Secondary tie-breakers: Rating then Review Count
    if ((b.profile.rating || 0) !== (a.profile.rating || 0)) {
      return (b.profile.rating || 0) - (a.profile.rating || 0);
    }
    return (b.profile.reviewCount || 0) - (a.profile.reviewCount || 0);
  });

  return scoredPhotographers.slice(0, limit);
};
