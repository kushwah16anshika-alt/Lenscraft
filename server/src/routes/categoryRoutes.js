import express from 'express';
import {
  getCategories,
  createCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { ROLES } from '../constants/roles.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', protect, authorizeRoles(ROLES.ADMIN), createCategory);
router.delete('/:id', protect, authorizeRoles(ROLES.ADMIN), deleteCategory);

export default router;
