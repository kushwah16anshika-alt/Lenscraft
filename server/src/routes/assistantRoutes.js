import express from 'express';
import rateLimit from 'express-rate-limit';
import { chatWithAssistant, getAssistantSuggestions } from '../controllers/assistantController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rate limiting for AI assistant chat endpoint (30 requests per minute)
const assistantLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: {
    success: false,
    message: 'Too many chat requests from this IP. Please wait a moment before sending another message.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Optional auth middleware so assistant can personalize for logged-in user if available
const attachUserIfPresent = (req, res, next) => {
  if (optionalAuth) {
    return optionalAuth(req, res, next);
  }
  next();
};

router.post('/chat', assistantLimiter, attachUserIfPresent, chatWithAssistant);
router.get('/suggestions', getAssistantSuggestions);

export default router;
