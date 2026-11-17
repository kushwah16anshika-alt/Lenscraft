import { ApiResponse } from '../utils/apiResponse.js';
import { getDbStatus, isDbConnected } from '../config/db.js';

/**
 * @desc    API Health & Readiness Check
 * @route   GET /api/health
 * @access  Public
 */
export const getHealth = (req, res) => {
  const dbInfo = getDbStatus();
  const isHealthy = isDbConnected();

    const payload = {
      status: isHealthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
      database: dbInfo,
      environment: process.env.NODE_ENV || 'development',
};

if (!isHealthy) {
  return res.status(503).json({
    success: false,
    message: 'LensCraft API is degraded: Database is not connected',
    data: payload,
  });
}

return ApiResponse.success(res, 'LensCraft API is healthy', payload);
};
