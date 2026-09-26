import express from 'express';
import healthRoutes from './healthRoutes.js';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import professionalRoutes from './professionalRoutes.js';
import bookingRoutes from './bookingRoutes.js';
import reviewRoutes from './reviewRoutes.js';
import serviceRoutes from './serviceRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import adminRoutes from './adminRoutes.js';
import messageRoutes from './messageRoutes.js';

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/professionals', professionalRoutes);
router.use('/bookings', bookingRoutes);
router.use('/reviews', reviewRoutes);
router.use('/services', serviceRoutes);
router.use('/categories', categoryRoutes);
router.use('/admin', adminRoutes);
router.use('/messages', messageRoutes);

export default router;
