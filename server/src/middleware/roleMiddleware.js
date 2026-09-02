import { ApiResponse } from '../utils/apiResponse.js';

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return ApiResponse.error(res, 'Unauthorized access', 401);
    }

    if (!roles.includes(req.user.role)) {
      return ApiResponse.error(
        res,
        `Access forbidden: Role '${req.user.role}' is not authorized to access this resource`,
        403
      );
    }

    next();
  };
};
