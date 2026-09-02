import express from 'express';
import healthRoutes from './healthRoutes.js';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import professionalRoutes from './professionalRoutes.js';
import adminRoutes from './adminRoutes.js';

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/professionals', professionalRoutes);
router.use('/admin', adminRoutes);

export default router;
