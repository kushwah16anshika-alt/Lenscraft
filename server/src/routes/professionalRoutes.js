import express from 'express';
import {
  getProfessionals,
  getProfessionalById,
  getProfessionalDashboard,
  updateProfessionalProfile,
} from '../controllers/professionalController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { CREATIVE_ROLES } from '../constants/roles.js';

const router = express.Router();

// Public routes
router.get('/', getProfessionals);
router.get('/:id', getProfessionalById);

// Protected professional dashboard routes
router.get(
  '/me/dashboard',
  protect,
  authorizeRoles(...CREATIVE_ROLES),
  getProfessionalDashboard
);

router.put(
  '/me/profile',
  protect,
  authorizeRoles(...CREATIVE_ROLES),
  updateProfessionalProfile
);

export default router;
