import mongoose from 'mongoose';
import { CREATIVE_ROLES } from '../constants/roles.js';

const serviceSchema = new mongoose.Schema(
  {
    professional: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      // Examples: Wedding Photography, Cinematic Pre-Wedding, Corporate Video, Drone Footage, Reel Editing, Color Grading, etc.
    },
    professionType: {
      type: String,
      enum: CREATIVE_ROLES,
      required: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    pricingType: {
      type: String,
      enum: ['fixed', 'hourly', 'daily', 'per_hour', 'per_day', 'per_project', 'per_video', 'per_minute'],
      default: 'per_day',
    },
    deliveryDays: {
      type: Number,
      default: 7,
    },
    inclusions: [
      {
        type: String,
      },
    ],
    revisionsAllowed: {
      type: Number,
      default: 2,
    },
    coverImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model('Service', serviceSchema);
export default Service;
