import express from 'express';
import {
  createBooking,
  getMyBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking,
  getAllBookings,
} from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { ROLES } from '../constants/roles.js';

const router = express.Router();

router.use(protect);

// Booking root endpoints
router.route('/')
  .post(createBooking)
  .get(authorizeRoles(ROLES.ADMIN), getAllBookings);

router.get('/my', getMyBookings);
router.get('/:id', getBookingById);
router.patch('/:id/status', updateBookingStatus);
router.patch('/:id/cancel', cancelBooking);

export default router;
