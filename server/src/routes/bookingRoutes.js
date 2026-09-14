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
import { ROLES, CREATIVE_ROLES } from '../constants/roles.js';

const router = express.Router();

router.use(protect);

router.post('/', createBooking);
router.get('/my', getMyBookings);
router.get('/:id', getBookingById);
router.patch('/:id/status', updateBookingStatus);
router.patch('/:id/cancel', cancelBooking);

// Admin route
router.get('/', authorizeRoles(ROLES.ADMIN), getAllBookings);

export default router;
