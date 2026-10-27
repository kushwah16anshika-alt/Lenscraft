import { rankPhotographers, DEFAULT_WEIGHTS } from '../services/recommendationService.js';
import { ApiResponse } from '../utils/apiResponse.js';

/**
 * @desc    Get AI-ranked photographer recommendations based on customer requirements
 * @route   POST /api/recommendations/photographers or GET /api/recommendations/photographers
 * @access  Public
 */
export const getPhotographerRecommendations = async (req, res, next) => {
  try {
    // Extract parameters from either req.body (POST) or req.query (GET)
    const source = req.method === 'POST' ? req.body : req.query;

    const {
      eventType = '',
      location = '',
      maxBudget,
      photographyStyle = '',
      eventDate = null,
      weights = {},
      strictBudget = false,
      excludeUnavailable = true,
      limit = 20,
    } = source;

    // Validate budget
    let parsedBudget = null;
    if (maxBudget !== undefined && maxBudget !== null && maxBudget !== '') {
      parsedBudget = Number(maxBudget);
      if (isNaN(parsedBudget) || parsedBudget < 0) {
        return ApiResponse.error(res, 'Maximum budget must be a positive number', 400);
      }
    }

    // Validate eventDate
    let parsedEventDate = null;
    if (eventDate) {
      const d = new Date(eventDate);
      if (isNaN(d.getTime())) {
        return ApiResponse.error(res, 'Invalid event date provided', 400);
      }
      parsedEventDate = eventDate;
    }

    // Validate weights if provided
    const parsedWeights = {};
    if (weights && typeof weights === 'object') {
      ['style', 'budget', 'location', 'service', 'availability'].forEach((key) => {
        if (weights[key] !== undefined && weights[key] !== null) {
          const val = Number(weights[key]);
          if (!isNaN(val) && val >= 0) {
            parsedWeights[key] = val;
          }
        }
      });
    }

    // Run recommendation engine
    const recommendations = await rankPhotographers({
      eventType: String(eventType || '').trim(),
      location: String(location || '').trim(),
      maxBudget: parsedBudget,
      photographyStyle: String(photographyStyle || '').trim(),
      eventDate: parsedEventDate,
      weights: parsedWeights,
      strictBudget: strictBudget === true || strictBudget === 'true',
      excludeUnavailable: excludeUnavailable !== false && excludeUnavailable !== 'false',
      limit: Math.min(50, Math.max(1, Number(limit) || 20)),
    });

    return ApiResponse.success(res, 'Photographer recommendations generated successfully', {
      criteria: {
        eventType: eventType || null,
        location: location || null,
        maxBudget: parsedBudget,
        photographyStyle: photographyStyle || null,
        eventDate: parsedEventDate,
        weights: { ...DEFAULT_WEIGHTS, ...parsedWeights },
      },
      count: recommendations.length,
      recommendations,
    });
  } catch (error) {
    next(error);
  }
};
