import User from '../models/User.js';
import Booking from '../models/Booking.js';
import Review from '../models/Review.js';
import Category from '../models/Category.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { CREATIVE_ROLES, ROLES } from '../constants/roles.js';

// @desc    Get admin high level statistics
// @route   GET /api/admin/stats
// @access  Private (Admin only)
export const getAdminStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments({ role: ROLES.USER });
    const totalPhotographers = await User.countDocuments({ role: ROLES.PHOTOGRAPHER });
    const totalVideographers = await User.countDocuments({ role: ROLES.VIDEOGRAPHER });
    const totalEditors = await User.countDocuments({ role: ROLES.EDITOR });
    const totalBookings = await Booking.countDocuments();
    const totalReviews = await Review.countDocuments();
    const totalCategories = await Category.countDocuments();

    return ApiResponse.success(res, 'Admin statistics retrieved', {
      totalUsers,
      totalProfessionals: totalPhotographers + totalVideographers + totalEditors,
      breakdown: {
        photographers: totalPhotographers,
        videographers: totalVideographers,
        editors: totalEditors,
      },
      totalBookings,
      totalReviews,
      totalCategories,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users list
// @route   GET /api/admin/users
// @access  Private (Admin only)
export const getAllUsers = async (req, res, next) => {
  try {
    const { role, search, page = 1, limit = 20 } = req.query;
    const query = {};

    if (role) query.role = role;
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
      ];
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await User.countDocuments(query);

    return ApiResponse.success(res, 'Users retrieved', {
      total,
      page: Number(page),
      users,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle user active status
// @route   PATCH /api/admin/users/:id/status
// @access  Private (Admin only)
export const toggleUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return ApiResponse.error(res, 'User not found', 404);
    }

    user.isActive = !user.isActive;
    await user.save();

    return ApiResponse.success(res, `User ${user.isActive ? 'activated' : 'deactivated'} successfully`, { user });
  } catch (error) {
    next(error);
  }
};
