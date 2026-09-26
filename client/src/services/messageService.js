import api from './api';

export const messageService = {
  getConversations: (params) => api.get('/messages/conversations', { params }),
  getMessages: (conversationId) => api.get(`/messages/conversation/${conversationId}`),
  sendMessage: (data) => api.post('/messages', data),
  markAsRead: (conversationId) => api.put(`/messages/read/${conversationId}`),
};
