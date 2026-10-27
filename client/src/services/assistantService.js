import api from './api';

export const assistantService = {
  /**
   * Send user message to the Lenscraft AI Assistant
   * @param {string} message - User query text
   * @param {Array} history - Previous conversation turns
   */
  sendMessage: async (message, history = []) => {
    return await api.post('/assistant/chat', { message, history });
  },

  /**
   * Get starter suggestion prompts
   */
  getSuggestions: async () => {
    return await api.get('/assistant/suggestions');
  },
};

export default assistantService;
