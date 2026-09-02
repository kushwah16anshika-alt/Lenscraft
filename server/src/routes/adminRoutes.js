import express from 'express';
import {
  getAdminStats,
  getAllUsers,
  toggleUserStatus,
} from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { ROLES } from '../constants/roles.js';

const router = express.Router();

// Enforce admin privileges for all admin routes
router.use(protect, authorizeRoles(ROLES.ADMIN));

router.get('/stats', getAdminStats);
router.get('/users', getAllUsers);
router.patch('/users/:id/status', toggleUserStatus);

export default router;
