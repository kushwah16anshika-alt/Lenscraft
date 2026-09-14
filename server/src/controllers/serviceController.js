import Service from '../models/Service.js';
import User from '../models/User.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { CREATIVE_ROLES, ROLES } from '../constants/roles.js';

// @desc    Get all active services
// @route   GET /api/services
// @access  Public
export const getServices = async (req, res, next) => {
  try {
    const { category, professionType, minPrice, maxPrice, search } = req.query;
    const query = { isActive: true };

    if (category) query.category = new RegExp(category, 'i');
    if (professionType && CREATIVE_ROLES.includes(professionType)) query.professionType = professionType;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
      ];
    }

    const services = await Service.find(query)
      .populate('professional', 'name avatar location role')
      .sort({ createdAt: -1 });

    return ApiResponse.success(res, 'Services retrieved', {
      count: services.length,
      services,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get service by ID
// @route   GET /api/services/:id
// @access  Public
export const getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate('professional', 'name avatar location role bio rating reviewCount');

    if (!service) {
      return ApiResponse.error(res, 'Service not found', 404);
    }

    return ApiResponse.success(res, 'Service details retrieved', { service });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new service package
// @route   POST /api/services
// @access  Private (Creative role)
export const createService = async (req, res, next) => {
  try {
    const {
      title,
      category,
      description,
      price,
      pricingType,
      deliveryDays,
      inclusions,
      revisionsAllowed,
      coverImage,
    } = req.body;

    const service = await Service.create({
      professional: req.user._id,
      title,
      category: category || 'General Photography',
      professionType: req.user.role,
      description,
      price: Number(price),
      pricingType: pricingType || 'fixed',
      deliveryDays: Number(deliveryDays) || 7,
      inclusions: inclusions || [],
      revisionsAllowed: Number(revisionsAllowed) || 2,
      coverImage: coverImage || undefined,
    });

    return ApiResponse.success(res, 'Service package created', { service }, 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a service package
// @route   PUT /api/services/:id
// @access  Private (Creative role)
export const updateService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return ApiResponse.error(res, 'Service not found', 404);
    }

    if (service.professional.toString() !== req.user._id.toString() && req.user.role !== ROLES.ADMIN) {
      return ApiResponse.error(res, 'Unauthorized to edit this service', 403);
    }

    const {
      title,
      category,
      description,
      price,
      pricingType,
      deliveryDays,
      inclusions,
      revisionsAllowed,
      coverImage,
      isActive,
    } = req.body;

    if (title !== undefined) service.title = title;
    if (category !== undefined) service.category = category;
    if (description !== undefined) service.description = description;
    if (price !== undefined) service.price = Number(price);
    if (pricingType !== undefined) service.pricingType = pricingType;
    if (deliveryDays !== undefined) service.deliveryDays = Number(deliveryDays);
    if (inclusions !== undefined) service.inclusions = inclusions;
    if (revisionsAllowed !== undefined) service.revisionsAllowed = Number(revisionsAllowed);
    if (coverImage !== undefined) service.coverImage = coverImage;
    if (isActive !== undefined) service.isActive = isActive;

    await service.save();

    return ApiResponse.success(res, 'Service updated successfully', { service });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a service package
// @route   DELETE /api/services/:id
// @access  Private (Creative role)
export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return ApiResponse.error(res, 'Service not found', 404);
    }

    if (service.professional.toString() !== req.user._id.toString() && req.user.role !== ROLES.ADMIN) {
      return ApiResponse.error(res, 'Unauthorized to delete this service', 403);
    }

    await service.deleteOne();

    return ApiResponse.success(res, 'Service package deleted successfully');
  } catch (error) {
    next(error);
  }
};
