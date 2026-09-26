import express from 'express';
import {
  getConversations,
  getMessagesByConversation,
  sendMessage,
  markMessagesAsRead,
} from '../controllers/messageController.js';

const router = express.Router();

router.get('/conversations', getConversations);
router.get('/conversation/:conversationId', getMessagesByConversation);
router.post('/', sendMessage);
router.put('/read/:conversationId', markMessagesAsRead);

export default router;
