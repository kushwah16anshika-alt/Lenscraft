import express from 'express';
import {
  getProfessionals,
  getProfessionalById,
  getProfessionalDashboard,
  updateProfessionalProfile,
  addPortfolioItem,
  deletePortfolioItem,
  getProfessionalAppointments,
} from '../controllers/professionalController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { CREATIVE_ROLES } from '../constants/roles.js';

const router = express.Router();

// 1. Protected professional routes (MUST be registered before parameterized /:id route)
router.get(
  '/me/dashboard',
  protect,
  authorizeRoles(...CREATIVE_ROLES),
  getProfessionalDashboard
);

router.get(
  '/me/appointments',
  protect,
  authorizeRoles(...CREATIVE_ROLES),
  getProfessionalAppointments
);

router.put(
  '/me/profile',
  protect,
  authorizeRoles(...CREATIVE_ROLES),
  updateProfessionalProfile
);

router.post(
  '/me/portfolio',
  protect,
  authorizeRoles(...CREATIVE_ROLES),
  addPortfolioItem
);

router.delete(
  '/me/portfolio/:itemId',
  protect,
  authorizeRoles(...CREATIVE_ROLES),
  deletePortfolioItem
);

// 2. Public directory and ID lookup routes
router.get('/', getProfessionals);
router.get('/:id', getProfessionalById);

export default router;
