import Category from '../models/Category.js';
import { ApiResponse } from '../utils/apiResponse.js';

// @desc    Get all active categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res, next) => {
  try {
    const { professionType } = req.query;
    const query = { isActive: true };
    if (professionType) query.professionType = professionType;

    const categories = await Category.find(query).sort({ order: 1, name: 1 });

    return ApiResponse.success(res, 'Categories retrieved', {
      count: categories.length,
      categories,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a category (Admin only)
// @route   POST /api/categories
// @access  Private (Admin only)
export const createCategory = async (req, res, next) => {
  try {
    const { name, professionType, description, icon, image, order } = req.body;

    const category = await Category.create({
      name,
      professionType,
      description,
      icon: icon || 'Camera',
      image,
      order: order || 0,
    });

    return ApiResponse.success(res, 'Category created', { category }, 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete category (Admin only)
// @route   DELETE /api/categories/:id
// @access  Private (Admin only)
export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return ApiResponse.error(res, 'Category not found', 404);
    }

    await category.deleteOne();
    return ApiResponse.success(res, 'Category deleted');
  } catch (error) {
    next(error);
  }
};
