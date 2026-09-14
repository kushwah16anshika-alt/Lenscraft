import express from 'express';
import {
  createReview,
  getProfessionalReviews,
  getMyReviews,
} from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/professional/:id', getProfessionalReviews);
router.get('/my', protect, getMyReviews);
router.post('/', protect, createReview);

export default router;
