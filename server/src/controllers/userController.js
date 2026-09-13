import User from '../models/User.js';
import Booking from '../models/Booking.js';
import Review from '../models/Review.js';
import { ApiResponse } from '../utils/apiResponse.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    return ApiResponse.success(res, 'User profile retrieved', { user });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res, next) => {
  try {
    const { name, phone, bio, location, avatar } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return ApiResponse.error(res, 'User not found', 404);
    }

    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (bio !== undefined) user.bio = bio;
    if (location) user.location = { ...(user.location || {}), ...location };
    if (avatar) user.avatar = typeof avatar === 'string' ? { url: avatar } : { ...(user.avatar || {}), ...avatar };

    const updatedUser = await user.save();
    return ApiResponse.success(res, 'Profile updated successfully', { user: updatedUser });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user bookings
// @route   GET /api/users/bookings
// @access  Private (User role)
export const getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('professional', 'name email phone avatar')
      .populate('service', 'title category price deliveryDays')
      .sort({ createdAt: -1 });

    return ApiResponse.success(res, 'User bookings retrieved', { bookings });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user reviews
// @route   GET /api/users/reviews
// @access  Private
export const getUserReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ user: req.user._id })
      .populate('professional', 'name avatar')
      .populate('booking')
      .sort({ createdAt: -1 });

    return ApiResponse.success(res, 'User reviews retrieved', { reviews });
  } catch (error) {
    next(error);
  }
};
