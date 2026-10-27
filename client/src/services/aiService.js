import api from './api';

export const aiService = {
  /**
   * Classify photography style using Computer Vision (CLIP)
   * @param {string} imageUrl - Publicly accessible URL of the image
   */
  classifyImage: async (imageUrl) => {
    return await api.post('/ai/classify-image', { imageUrl });
  },

  /**
   * Retrieve all supported photography categories and prompts
   */
  getCategories: async () => {
    return await api.get('/ai/categories');
  },

  /**
   * Confirm or override AI classification for a portfolio item
   * @param {string} itemId - The portfolio item ID
   * @param {Object} data - { category, isConfirmedByUser, isOverridden }
   */
  confirmAiClassification: async (itemId, data) => {
    return await api.patch(`/professionals/me/portfolio/${itemId}/ai-confirmation`, data);
  },
};

export default aiService;
