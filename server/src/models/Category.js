import mongoose from 'mongoose';
import { CREATIVE_ROLES } from '../constants/roles.js';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      default: '',
    },
    professionType: {
      type: String,
      enum: CREATIVE_ROLES,
      required: true,
    },
    icon: {
      type: String,
      default: 'Camera',
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model('Category', categorySchema);
export default Category;
