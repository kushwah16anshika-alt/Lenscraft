import User from '../models/User.js';
import ProfessionalProfile from '../models/ProfessionalProfile.js';
import { generateToken } from '../utils/generateToken.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { CREATIVE_ROLES, ROLES } from '../constants/roles.js';

// @desc    Register a new user / creative / admin
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { name, email, password, role, professionType, phone, location } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return ApiResponse.error(res, 'User with this email already exists', 400);
    }

    const assignedRole = role || ROLES.USER;

    const user = await User.create({
      name,
      email,
      password,
      role: assignedRole,
      phone: phone || '',
      location: location || { city: '', state: '', country: 'India' },
    });

    // If role is a creative (photographer, videographer, editor), initialize their profile
    if (CREATIVE_ROLES.includes(assignedRole)) {
      const proProfile = await ProfessionalProfile.create({
        user: user._id,
        professionType: professionType || assignedRole,
        specialties: [],
        portfolio: [],
      });

      user.professionalProfile = proProfile._id;
      await user.save();
    }

    const token = generateToken(user._id, user.role);

    return ApiResponse.success(
      res,
      'Registration successful',
      {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          phone: user.phone,
          location: user.location,
          isVerified: user.isVerified,
        },
        token,
      },
      201
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password').populate('professionalProfile');

    if (!user) {
      return ApiResponse.error(res, 'Invalid email or password credentials', 401);
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return ApiResponse.error(res, 'Invalid email or password credentials', 401);
    }

    if (!user.isActive) {
      return ApiResponse.error(res, 'Account is deactivated. Contact administration.', 403);
    }

    const token = generateToken(user._id, user.role);

    return ApiResponse.success(res, 'Login successful', {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        phone: user.phone,
        location: user.location,
        isVerified: user.isVerified,
        professionalProfile: user.professionalProfile,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('professionalProfile');
    return ApiResponse.success(res, 'Current user retrieved', { user });
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user (stateless JWT acknowledgment)
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res, next) => {
  try {
    return ApiResponse.success(res, 'Logged out successfully');
  } catch (error) {
    next(error);
  }
};
