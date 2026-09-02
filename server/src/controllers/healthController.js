import mongoose from 'mongoose';
import { ApiResponse } from '../utils/apiResponse.js';

export const getHealth = (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

  return ApiResponse.success(res, 'LensCraft API is healthy', {
    status: 'online',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: dbStatus,
    environment: process.env.NODE_ENV || 'development',
  });
};
