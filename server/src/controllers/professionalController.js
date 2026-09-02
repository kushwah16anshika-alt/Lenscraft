import User from '../models/User.js';
import ProfessionalProfile from '../models/ProfessionalProfile.js';
import Service from '../models/Service.js';
import Booking from '../models/Booking.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { CREATIVE_ROLES } from '../constants/roles.js';

// @desc    Get all active professionals (Public directory with filters)
// @route   GET /api/professionals
// @access  Public
export const getProfessionals = async (req, res, next) => {
  try {
    const { role, city, specialty, minPrice, maxPrice, search, sort = 'rating' } = req.query;

    const query = { role: { $in: CREATIVE_ROLES }, isActive: true };

    if (role && CREATIVE_ROLES.includes(role)) {
      query.role = role;
    }

    if (city) {
      query['location.city'] = new RegExp(city, 'i');
    }

    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { bio: new RegExp(search, 'i') },
      ];
    }

    const professionals = await User.find(query)
      .select('-password')
      .populate('professionalProfile')
      .sort(sort === 'rating' ? { createdAt: -1 } : { createdAt: -1 });

    return ApiResponse.success(res, 'Professionals retrieved', {
      count: professionals.length,
      professionals,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get professional by ID
// @route   GET /api/professionals/:id
// @access  Public
export const getProfessionalById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('professionalProfile');

    if (!user || !CREATIVE_ROLES.includes(user.role)) {
      return ApiResponse.error(res, 'Professional not found', 404);
    }

    const services = await Service.find({ professional: user._id, isActive: true });

    return ApiResponse.success(res, 'Professional details retrieved', {
      professional: user,
      services,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in professional profile & stats
// @route   GET /api/professionals/me/dashboard
// @access  Private (Creative role)
export const getProfessionalDashboard = async (req, res, next) => {
  try {
    const profile = await ProfessionalProfile.findOne({ user: req.user._id });
    const servicesCount = await Service.countDocuments({ professional: req.user._id });
    const bookings = await Booking.find({ professional: req.user._id })
      .populate('user', 'name email phone avatar')
      .populate('service', 'title price')
      .sort({ createdAt: -1 })
      .limit(10);

    const totalBookings = await Booking.countDocuments({ professional: req.user._id });
    const completedBookings = await Booking.countDocuments({
      professional: req.user._id,
      status: 'completed',
    });

    return ApiResponse.success(res, 'Professional dashboard data retrieved', {
      profile,
      stats: {
        totalBookings,
        completedBookings,
        servicesCount,
        rating: profile?.rating || 5.0,
        reviewCount: profile?.reviewCount || 0,
      },
      recentBookings: bookings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update professional profile
// @route   PUT /api/professionals/me/profile
// @access  Private (Creative role)
export const updateProfessionalProfile = async (req, res, next) => {
  try {
    const { tagline, about, experienceYears, specialties, equipment, softwareSkills, startingPrice, priceUnit, availability, travelsToClient } = req.body;

    let profile = await ProfessionalProfile.findOne({ user: req.user._id });

    if (!profile) {
      profile = new ProfessionalProfile({ user: req.user._id, professionType: req.user.role });
    }

    if (tagline !== undefined) profile.tagline = tagline;
    if (about !== undefined) profile.about = about;
    if (experienceYears !== undefined) profile.experienceYears = experienceYears;
    if (specialties) profile.specialties = specialties;
    if (equipment) profile.equipment = equipment;
    if (softwareSkills) profile.softwareSkills = softwareSkills;
    if (startingPrice !== undefined) profile.startingPrice = startingPrice;
    if (priceUnit) profile.priceUnit = priceUnit;
    if (availability) profile.availability = availability;
    if (travelsToClient !== undefined) profile.travelsToClient = travelsToClient;

    await profile.save();

    return ApiResponse.success(res, 'Professional profile updated', { profile });
  } catch (error) {
    next(error);
  }
};
