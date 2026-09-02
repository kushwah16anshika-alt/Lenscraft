import mongoose from 'mongoose';
import { BOOKING_STATUS, PAYMENT_STATUS } from '../constants/bookingStatus.js';

const bookingSchema = new mongoose.Schema(
  {
    bookingReference: {
      type: String,
      unique: true,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    professional: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
    },
    eventType: {
      type: String,
      required: [true, 'Event type is required'],
      // Wedding, Pre-Wedding, Birthday, Corporate, Product Shoot, Music Video, Reel Editing, etc.
    },
    eventDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      default: '10:00',
    },
    endTime: {
      type: String,
      default: '18:00',
    },
    durationHours: {
      type: Number,
      default: 8,
    },
    location: {
      venueName: { type: String, default: '' },
      city: { type: String, required: true },
      address: { type: String, default: '' },
    },
    specialInstructions: {
      type: String,
      default: '',
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    advanceAmount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: Object.values(BOOKING_STATUS),
      default: BOOKING_STATUS.PENDING,
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.UNPAID,
    },
    cancellationReason: {
      type: String,
      default: '',
    },
    cancelledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate human-friendly booking reference
bookingSchema.pre('validate', function (next) {
  if (!this.bookingReference) {
    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.bookingReference = `LC-${Date.now().toString().slice(-4)}-${randomHex}`;
  }
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
