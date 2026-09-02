import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  getUserBookings,
  getUserReviews,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All user routes require authentication

router.route('/profile')
  .get(getUserProfile)
  .put(updateUserProfile);

router.get('/bookings', getUserBookings);
router.get('/reviews', getUserReviews);

export default router;
