import express from 'express';
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { CREATIVE_ROLES, ROLES } from '../constants/roles.js';

const router = express.Router();

router.get('/', getServices);
router.get('/:id', getServiceById);

router.post(
  '/',
  protect,
  authorizeRoles(...CREATIVE_ROLES, ROLES.ADMIN),
  createService
);

router.put(
  '/:id',
  protect,
  authorizeRoles(...CREATIVE_ROLES, ROLES.ADMIN),
  updateService
);

router.delete(
  '/:id',
  protect,
  authorizeRoles(...CREATIVE_ROLES, ROLES.ADMIN),
  deleteService
);

export default router;
