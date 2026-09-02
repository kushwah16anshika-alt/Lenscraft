import mongoose from 'mongoose';
import { CREATIVE_ROLES, ROLES } from '../constants/roles.js';

const portfolioItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  mediaType: {
    type: String,
    enum: ['image', 'video'],
    default: 'image',
  },
  url: { type: String, required: true },
  publicId: { type: String, default: '' },
  thumbnailUrl: { type: String, default: '' },
  category: { type: String, default: 'General' },
  tags: [{ type: String }],
  isFeatured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const availabilitySlotSchema = new mongoose.Schema({
  dayOfWeek: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true,
  },
  isAvailable: { type: Boolean, default: true },
  startTime: { type: String, default: '09:00' },
  endTime: { type: String, default: '18:00' },
});

const professionalProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    professionType: {
      type: String,
      enum: CREATIVE_ROLES,
      required: true,
      default: ROLES.PHOTOGRAPHER,
    },
    tagline: {
      type: String,
      maxlength: [150, 'Tagline cannot exceed 150 characters'],
      default: 'Capturing moments, telling stories.',
    },
    about: {
      type: String,
      default: '',
    },
    experienceYears: {
      type: Number,
      default: 1,
      min: 0,
    },
    specialties: [
      {
        type: String,
        trim: true,
      },
    ],
    equipment: [
      {
        type: String,
        trim: true,
      },
    ],
    softwareSkills: [
      {
        type: String,
        trim: true,
      },
    ],
    startingPrice: {
      type: Number,
      default: 5000,
      min: 0,
    },
    priceUnit: {
      type: String,
      enum: ['per_hour', 'per_day', 'per_project', 'per_video'],
      default: 'per_day',
    },
    portfolio: [portfolioItemSchema],
    availability: [availabilitySlotSchema],
    travelsToClient: {
      type: Boolean,
      default: true,
    },
    maxTravelDistanceKm: {
      type: Number,
      default: 50,
    },
    rating: {
      type: Number,
      default: 5.0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    completedBookingsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    instagramUrl: { type: String, default: '' },
    youtubeUrl: { type: String, default: '' },
    websiteUrl: { type: String, default: '' },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isProfileApproved: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProfessionalProfile = mongoose.model('ProfessionalProfile', professionalProfileSchema);
export default ProfessionalProfile;
