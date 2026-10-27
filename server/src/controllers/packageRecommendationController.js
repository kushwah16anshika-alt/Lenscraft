import packageRecommendationService from '../services/packageRecommendationService.js';
import ApiResponse from '../utils/apiResponse.js';

/**
 * @desc Get ML-based smart package recommendations
 * @route POST /api/recommendations/smart-packages
 * @access Public (Optional Auth)
 */
export const getSmartPackageRecommendations = async (req, res) => {
  try {
    const {
      eventType,
      budget,
      location,
      photographyStyle,
      requiredService,
      requiredInclusions,
      strictBudget,
    } = req.body || {};

    // Input Validation
    let parsedBudget = 20000;
    if (budget !== undefined && budget !== null && budget !== '') {
      parsedBudget = Number(budget);
      if (isNaN(parsedBudget) || parsedBudget <= 0) {
        return ApiResponse.error(res, 'Budget must be a positive number', 400);
      }
    }

    const preferences = {
      eventType: typeof eventType === 'string' && eventType.trim() ? eventType.trim() : 'Wedding',
      budget: parsedBudget,
      location: typeof location === 'string' ? location.trim() : 'Bhopal',
      photographyStyle: typeof photographyStyle === 'string' ? photographyStyle.trim() : 'Candid',
      requiredService: typeof requiredService === 'string' ? requiredService.trim().toLowerCase() : 'all',
      requiredInclusions: Array.isArray(requiredInclusions) ? requiredInclusions : [],
      strictBudget: Boolean(strictBudget),
    };

    const result = await packageRecommendationService.getSmartPackageRecommendations(preferences);

    return ApiResponse.success(res, 'Smart package recommendations generated successfully', result);
  } catch (error) {
    console.error('Error generating smart package recommendations:', error);
    return ApiResponse.error(res, error.message || 'Failed to generate package recommendations', 500);
  }
};

/**
 * @desc Get available preference options and filter tags for frontend form
 * @route GET /api/recommendations/smart-packages/options
 * @access Public
 */
export const getRecommendationFilterOptions = async (req, res) => {
  try {
    const options = {
      eventTypes: [
        'Wedding Photography',
        'Pre-Wedding Shoot',
        'Cinematic Videography',
        'Commercial & Brand Shoots',
        'Fashion & Portrait',
        'Reels & Short-Form Video',
        'Birthday & Family',
        'Corporate Events',
      ],
      cities: ['Bhopal', 'Mumbai', 'Bengaluru', 'Delhi', 'Indore'],
      styles: ['Candid', 'Traditional', 'Cinematic', 'Editorial', 'Drone', 'Modern'],
      services: [
        { label: 'All Creative Services', value: 'all' },
        { label: 'Photographers Only', value: 'photographer' },
        { label: 'Videographers Only', value: 'videographer' },
        { label: 'Video Editors Only', value: 'editor' },
      ],
      popularBudgets: [10000, 15000, 20000, 25000, 35000, 50000],
    };

    return ApiResponse.success(res, 'Filter options retrieved successfully', options);
  } catch (error) {
    return ApiResponse.error(res, 'Failed to retrieve filter options', 500);
  }
};

export default {
  getSmartPackageRecommendations,
  getRecommendationFilterOptions,
};
