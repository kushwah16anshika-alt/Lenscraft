import Message from '../models/Message.js';
import mongoose from 'mongoose';

// In-memory fallback if MongoDB is not connected in demo mode
let inMemoryMessages = [
  {
    _id: 'msg-seed-1',
    conversationId: 'conv_u-1_pro-1',
    creatorId: 'pro-1',
    creatorName: 'Aarav Mehta',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    clientId: 'u-1',
    clientName: 'Pooja Sethi',
    clientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    sender: 'u-1',
    senderRole: 'client',
    senderName: 'Pooja Sethi',
    recipient: 'pro-1',
    recipientName: 'Aarav Mehta',
    text: 'Hi Aarav! We love your editorial lighting. Are you available for a 2-day shoot in Udaipur this October?',
    read: true,
    createdAt: new Date(Date.now() - 3600000 * 4),
  },
  {
    _id: 'msg-seed-2',
    conversationId: 'conv_u-1_pro-1',
    creatorId: 'pro-1',
    creatorName: 'Aarav Mehta',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    clientId: 'u-1',
    clientName: 'Pooja Sethi',
    clientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    sender: 'pro-1',
    senderRole: 'creator',
    senderName: 'Aarav Mehta',
    recipient: 'u-1',
    recipientName: 'Pooja Sethi',
    text: 'Hello Pooja! Thank you so much. Yes, October is a magnificent month in Rajasthan. The natural lighting at sunset across Lake Pichola is breathtaking.',
    read: true,
    createdAt: new Date(Date.now() - 3600000 * 3),
  },
  {
    _id: 'msg-seed-3',
    conversationId: 'conv_u-1_pro-1',
    creatorId: 'pro-1',
    creatorName: 'Aarav Mehta',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    clientId: 'u-1',
    clientName: 'Pooja Sethi',
    clientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    sender: 'pro-1',
    senderRole: 'creator',
    senderName: 'Aarav Mehta',
    recipient: 'u-1',
    recipientName: 'Pooja Sethi',
    text: 'Looking forward to the Udaipur pre-wedding shoot! I have shortlisted 3 palace courtyards for golden hour.',
    read: true,
    createdAt: new Date(Date.now() - 3600000 * 2),
  },
];

// Helper to check if DB is connected
const isDbConnected = () => mongoose.connection.readyState === 1;

/**
 * @desc Get all conversations for a user or creator
 * @route GET /api/messages/conversations
 */
export const getConversations = async (req, res) => {
  try {
    const userId = req.user?._id?.toString() || req.query.userId || 'u-1';
    const creatorId = req.query.creatorId;

    if (isDbConnected()) {
      const query = creatorId
        ? { creatorId }
        : { $or: [{ clientId: userId }, { creatorId: userId }, { sender: userId }, { recipient: userId }] };

      const messages = await Message.find(query).sort({ createdAt: 1 });

      // Group into conversations
      const convMap = {};
      messages.forEach((msg) => {
        const cId = msg.conversationId || `conv_${msg.clientId}_${msg.creatorId}`;
        if (!convMap[cId]) {
          convMap[cId] = {
            id: cId,
            conversationId: cId,
            creatorId: msg.creatorId,
            creatorName: msg.creatorName,
            creatorAvatar: msg.creatorAvatar,
            clientId: msg.clientId,
            clientName: msg.clientName,
            clientAvatar: msg.clientAvatar,
            lastMessage: msg.text,
            lastUpdated: msg.createdAt,
            unreadCount: msg.read ? 0 : 1,
            messages: [],
          };
        }
        convMap[cId].messages.push(msg);
        convMap[cId].lastMessage = msg.text;
        convMap[cId].lastUpdated = msg.createdAt;
      });

      return res.json({
        success: true,
        data: Object.values(convMap),
      });
    }

    // Fallback to in-memory conversations
    const convMap = {};
    inMemoryMessages.forEach((msg) => {
      const cId = msg.conversationId || `conv_${msg.clientId}_${msg.creatorId}`;
      if (!convMap[cId]) {
        convMap[cId] = {
          id: cId,
          conversationId: cId,
          creatorId: msg.creatorId,
          creatorName: msg.creatorName,
          creatorAvatar: msg.creatorAvatar,
          clientId: msg.clientId,
          clientName: msg.clientName,
          clientAvatar: msg.clientAvatar,
          lastMessage: msg.text,
          lastUpdated: msg.createdAt,
          unreadCount: msg.read ? 0 : 1,
          messages: [],
        };
      }
      convMap[cId].messages.push(msg);
      convMap[cId].lastMessage = msg.text;
      convMap[cId].lastUpdated = msg.createdAt;
    });

    return res.json({
      success: true,
      data: Object.values(convMap),
    });
  } catch (error) {
    console.error('getConversations error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Get messages for a specific conversation
 * @route GET /api/messages/conversation/:conversationId
 */
export const getMessagesByConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;

    if (isDbConnected()) {
      const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });
      return res.json({
        success: true,
        data: messages,
      });
    }

    const messages = inMemoryMessages.filter((m) => m.conversationId === conversationId);
    return res.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error('getMessagesByConversation error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Send a real message between customer and photographer
 * @route POST /api/messages
 */
export const sendMessage = async (req, res) => {
  try {
    const {
      conversationId,
      creatorId,
      creatorName,
      creatorAvatar,
      clientId,
      clientName,
      clientAvatar,
      sender,
      senderRole,
      senderName,
      senderAvatar,
      recipient,
      recipientName,
      text,
      attachments,
    } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, message: 'Message text is required' });
    }

    const resolvedCreatorId = creatorId || 'pro-1';
    const resolvedClientId = clientId || req.user?._id?.toString() || 'u-1';
    const resolvedConvId =
      conversationId || `conv_${resolvedClientId}_${resolvedCreatorId}`;

    const newMsgData = {
      conversationId: resolvedConvId,
      creatorId: resolvedCreatorId,
      creatorName: creatorName || 'Studio',
      creatorAvatar: creatorAvatar || '',
      clientId: resolvedClientId,
      clientName: clientName || req.user?.name || 'Client',
      clientAvatar: clientAvatar || req.user?.avatar?.url || '',
      sender: sender || (senderRole === 'creator' ? resolvedCreatorId : resolvedClientId),
      senderRole: senderRole || (sender === resolvedCreatorId ? 'creator' : 'client'),
      senderName: senderName || (senderRole === 'creator' ? creatorName : clientName),
      senderAvatar: senderAvatar || '',
      recipient: recipient || (senderRole === 'creator' ? resolvedClientId : resolvedCreatorId),
      recipientName: recipientName || (senderRole === 'creator' ? clientName : creatorName),
      text: text.trim(),
      attachments: attachments || [],
      read: false,
      createdAt: new Date(),
    };

    if (isDbConnected()) {
      const savedMessage = await Message.create(newMsgData);
      return res.status(201).json({
        success: true,
        data: savedMessage,
      });
    }

    const inMemMsg = {
      _id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      ...newMsgData,
    };
    inMemoryMessages.push(inMemMsg);

    return res.status(201).json({
      success: true,
      data: inMemMsg,
    });
  } catch (error) {
    console.error('sendMessage error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Mark messages in a conversation as read
 * @route PUT /api/messages/read/:conversationId
 */
export const markMessagesAsRead = async (req, res) => {
  try {
    const { conversationId } = req.params;

    if (isDbConnected()) {
      await Message.updateMany({ conversationId }, { $set: { read: true } });
    } else {
      inMemoryMessages.forEach((m) => {
        if (m.conversationId === conversationId) {
          m.read = true;
        }
      });
    }

    return res.json({ success: true, message: 'Messages marked as read' });
  } catch (error) {
    console.error('markMessagesAsRead error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
