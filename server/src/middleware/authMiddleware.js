import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'lenscraft_fallback_secret_key_2025'
      );

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return ApiResponse.error(res, 'User no longer exists', 401);
      }

      if (!req.user.isActive) {
        return ApiResponse.error(res, 'Your account has been deactivated. Please contact support.', 403);
      }

      next();
    } catch (error) {
      return ApiResponse.error(res, 'Not authorized, invalid or expired token', 401);
    }
  } else {
    return ApiResponse.error(res, 'Not authorized, no token provided', 401);
  }
};
