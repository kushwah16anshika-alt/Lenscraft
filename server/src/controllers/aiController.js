import ApiResponse from '../utils/ApiResponse.js';
import {
  classifyPhotographyImage,
  PHOTOGRAPHY_CATEGORIES,
  CATEGORY_PROMPTS,
} from '../services/imageClassificationService.js';

/**
 * @desc    Analyze and classify a photography image using Computer Vision
 * @route   POST /api/ai/classify-image
 * @access  Public or Protected
 */
export const classifyImage = async (req, res, next) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return ApiResponse.error(res, 'Please provide an imageUrl to analyze.', 400);
    }

    // Basic URL validation
    try {
      new URL(imageUrl);
    } catch (e) {
      return ApiResponse.error(res, 'Invalid image URL format.', 400);
    }

    const result = await classifyPhotographyImage(imageUrl);

    return ApiResponse.success(res, 'Image style classified successfully', result);
  } catch (error) {
    console.error('Error classifying image:', error);
    return ApiResponse.error(
      res,
      error.message || 'Failed to classify image',
      500
    );
  }
};

/**
 * @desc    Get all supported photography classification categories
 * @route   GET /api/ai/categories
 * @access  Public
 */
export const getSupportedCategories = async (req, res) => {
  return ApiResponse.success(res, 'Supported categories retrieved', {
    categories: PHOTOGRAPHY_CATEGORIES,
    prompts: CATEGORY_PROMPTS,
  });
};

export default {
  classifyImage,
  getSupportedCategories,
};
