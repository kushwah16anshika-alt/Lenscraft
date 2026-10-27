import ApiResponse from '../utils/ApiResponse.js';
import { processAssistantMessage } from '../services/assistantService.js';

/**
 * @desc    Chat with Lenscraft AI Assistant
 * @route   POST /api/assistant/chat
 * @access  Public / Authenticated
 */
export const chatWithAssistant = async (req, res, next) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return ApiResponse.error(res, 'Please provide a valid message to chat with the assistant.', 400);
    }

    if (message.length > 1000) {
      return ApiResponse.error(res, 'Message exceeds the maximum limit of 1000 characters.', 400);
    }

    const sanitizedHistory = Array.isArray(history) ? history.slice(-10) : [];

    const result = await processAssistantMessage({
      message: message.trim(),
      history: sanitizedHistory,
      user: req.user || null,
    });

    return ApiResponse.success(res, 'Assistant response generated', result);
  } catch (error) {
    console.error('Error in chatWithAssistant:', error);
    return ApiResponse.error(
      res,
      error.message || 'The AI assistant encountered an unexpected error. Please try again.',
      500
    );
  }
};

/**
 * @desc    Get quick starter suggestion prompts
 * @route   GET /api/assistant/suggestions
 * @access  Public
 */
export const getAssistantSuggestions = async (req, res) => {
  const suggestions = [
    {
      title: 'Wedding in Bhopal',
      prompt: 'I need a wedding photographer in Bhopal under ₹15,000.',
      icon: 'Heart',
    },
    {
      title: 'Compare Top Creators',
      prompt: 'Compare Aarav Sharma and Kabir Sen for wedding shoots.',
      icon: 'Scale',
    },
    {
      title: 'Explore Packages',
      prompt: 'What packages are available and what are their prices?',
      icon: 'Package',
    },
    {
      title: 'Booking Guidance',
      prompt: 'How does the booking process work on Lenscraft?',
      icon: 'Calendar',
    },
  ];

  return ApiResponse.success(res, 'Suggestions retrieved', { suggestions });
};

export default {
  chatWithAssistant,
  getAssistantSuggestions,
};
