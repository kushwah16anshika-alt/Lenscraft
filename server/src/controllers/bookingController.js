import Booking from '../models/Booking.js';
import User from '../models/User.js';
import Service from '../models/Service.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { BOOKING_STATUS, PAYMENT_STATUS } from '../constants/bookingStatus.js';
import { ROLES, CREATIVE_ROLES } from '../constants/roles.js';

// @desc    Create a new booking reservation
// @route   POST /api/bookings
// @access  Private (User/Client)
export const createBooking = async (req, res, next) => {
  try {
    const {
      professionalId,
      serviceId,
      eventType,
      eventDate,
      startTime,
      endTime,
      durationHours,
      location,
      specialInstructions,
      notes,
    } = req.body;

    const professional = await User.findById(professionalId);
    if (!professional || !CREATIVE_ROLES.includes(professional.role)) {
      return ApiResponse.error(res, 'Creative professional not found', 404);
    }

    let service = null;
    let totalAmount = 0;

    if (serviceId) {
      service = await Service.findById(serviceId);
      if (service) {
        totalAmount = service.price;
      }
    }

    if (!totalAmount && req.body.totalAmount) {
      totalAmount = Number(req.body.totalAmount);
    }

    if (!totalAmount) {
      totalAmount = 25000;
    }

    const advanceAmount = Math.round(totalAmount * 0.3); // 30% Airbnb-style advance deposit in escrow

    const booking = await Booking.create({
      user: req.user._id,
      professional: professional._id,
      service: service?._id,
      eventType: eventType || 'Creative Shoot',
      eventDate: new Date(eventDate),
      startTime: startTime || '09:00',
      endTime: endTime || '17:00',
      durationHours: durationHours || 8,
      location: location || { city: professional.location?.city || 'Mumbai', venueName: '', address: '' },
      specialInstructions: specialInstructions || '',
      notes: notes || '',
      totalAmount,
      advanceAmount,
      status: BOOKING_STATUS.PENDING,
      paymentStatus: PAYMENT_STATUS.ADVANCE_PAID,
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate('user', 'name email phone avatar')
      .populate('professional', 'name email phone avatar location role')
      .populate('service', 'title category price deliveryDays');

    return ApiResponse.success(res, 'Booking reservation placed into escrow', {
      booking: populatedBooking,
    }, 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user's bookings
// @route   GET /api/bookings/my
// @access  Private
export const getMyBookings = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = { user: req.user._id };
    if (status && status !== 'all') query.status = status;

    const bookings = await Booking.find(query)
      .populate('professional', 'name email phone avatar location role')
      .populate('service', 'title category price deliveryDays')
      .sort({ createdAt: -1 });

    return ApiResponse.success(res, 'My bookings retrieved', {
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
export const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email phone avatar')
      .populate('professional', 'name email phone avatar location role')
      .populate('service', 'title category price deliveryDays inclusions');

    if (!booking) {
      return ApiResponse.error(res, 'Booking not found', 404);
    }

    // Check authorization: must be the client, the professional, or an admin
    const isClient = booking.user._id.toString() === req.user._id.toString();
    const isPro = booking.professional._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === ROLES.ADMIN;

    if (!isClient && !isPro && !isAdmin) {
      return ApiResponse.error(res, 'Unauthorized to view this booking', 403);
    }

    return ApiResponse.success(res, 'Booking details retrieved', { booking });
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking status (Accept, decline, complete)
// @route   PATCH /api/bookings/:id/status
// @access  Private (Creative / Admin)
export const updateBookingStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return ApiResponse.error(res, 'Booking not found', 404);
    }

    const isPro = booking.professional.toString() === req.user._id.toString();
    const isAdmin = req.user.role === ROLES.ADMIN;

    if (!isPro && !isAdmin) {
      return ApiResponse.error(res, 'Only the assigned creative or admin can update appointment status', 403);
    }

    if (status && Object.values(BOOKING_STATUS).includes(status)) {
      booking.status = status;
      if (status === BOOKING_STATUS.COMPLETED) {
        booking.paymentStatus = PAYMENT_STATUS.PAID;
      }
    }

    if (notes) {
      booking.notes = notes;
    }

    await booking.save();

    const populated = await Booking.findById(booking._id)
      .populate('user', 'name email phone avatar')
      .populate('professional', 'name email phone avatar location role')
      .populate('service', 'title category price deliveryDays');

    return ApiResponse.success(res, `Booking status updated to ${booking.status}`, {
      booking: populated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel booking (Client or Creative)
// @route   PATCH /api/bookings/:id/cancel
// @access  Private
export const cancelBooking = async (req, res, next) => {
  try {
    const { cancellationReason } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return ApiResponse.error(res, 'Booking not found', 404);
    }

    const isClient = booking.user.toString() === req.user._id.toString();
    const isPro = booking.professional.toString() === req.user._id.toString();
    const isAdmin = req.user.role === ROLES.ADMIN;

    if (!isClient && !isPro && !isAdmin) {
      return ApiResponse.error(res, 'Unauthorized to cancel this booking', 403);
    }

    booking.status = BOOKING_STATUS.CANCELLED;
    booking.cancellationReason = cancellationReason || 'Cancelled by user';
    booking.cancelledBy = req.user._id;
    booking.paymentStatus = PAYMENT_STATUS.REFUNDED;

    await booking.save();

    return ApiResponse.success(res, 'Booking cancelled and escrow refunded', { booking });
  } catch (error) {
    next(error);
  }
};

// @desc    Admin get all bookings
// @route   GET /api/bookings
// @access  Private (Admin only)
export const getAllBookings = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = {};
    if (status && status !== 'all') query.status = status;

    const bookings = await Booking.find(query)
      .populate('user', 'name email phone avatar')
      .populate('professional', 'name email phone avatar location role')
      .populate('service', 'title category price deliveryDays')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Booking.countDocuments(query);

    return ApiResponse.success(res, 'All bookings retrieved', {
      total,
      page: Number(page),
      bookings,
    });
  } catch (error) {
    next(error);
  }
};
