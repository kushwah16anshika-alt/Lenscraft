import Review from '../models/Review.js';
import User from '../models/User.js';
import ProfessionalProfile from '../models/ProfessionalProfile.js';
import Booking from '../models/Booking.js';
import { ApiResponse } from '../utils/apiResponse.js';

// @desc    Create a new review for a creative
// @route   POST /api/reviews
// @access  Private
export const createReview = async (req, res, next) => {
  try {
    const {
      professionalId,
      bookingId,
      rating,
      comment,
      serviceQualityRating,
      punctualityRating,
      communicationRating,
      photos,
    } = req.body;

    const professional = await User.findById(professionalId);
    if (!professional) {
      return ApiResponse.error(res, 'Creative professional not found', 404);
    }

    const review = await Review.create({
      user: req.user._id,
      professional: professional._id,
      booking: bookingId || undefined,
      rating: Number(rating),
      comment,
      serviceQualityRating: serviceQualityRating || 5,
      punctualityRating: punctualityRating || 5,
      communicationRating: communicationRating || 5,
      photos: photos || [],
    });

    // Update professional rating and review count in their profile
    const allReviews = await Review.find({ professional: professional._id });
    const avgRating = allReviews.reduce((acc, r) => acc + r.rating, 0) / (allReviews.length || 1);

    const proProfile = await ProfessionalProfile.findOne({ user: professional._id });
    if (proProfile) {
      proProfile.rating = Math.round(avgRating * 10) / 10;
      proProfile.reviewCount = allReviews.length;
      await proProfile.save();
    }

    const populatedReview = await Review.findById(review._id)
      .populate('user', 'name avatar')
      .populate('professional', 'name avatar');

    return ApiResponse.success(res, 'Review submitted successfully', {
      review: populatedReview,
    }, 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Get reviews for a professional
// @route   GET /api/reviews/professional/:id
// @access  Public
export const getProfessionalReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ professional: req.params.id })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });

    return ApiResponse.success(res, 'Reviews retrieved', {
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get reviews submitted by current user
// @route   GET /api/reviews/my
// @access  Private
export const getMyReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ user: req.user._id })
      .populate('professional', 'name avatar role')
      .populate('booking')
      .sort({ createdAt: -1 });

    return ApiResponse.success(res, 'My reviews retrieved', {
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    next(error);
  }
};
