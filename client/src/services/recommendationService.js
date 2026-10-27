import api from './api';

export const recommendationService = {
  /**
   * Fetch AI photographer recommendations based on customer requirements
   * @param {Object} criteria - { eventType, location, maxBudget, photographyStyle, eventDate, weights, strictBudget, excludeUnavailable }
   */
  getRecommendations: async (criteria = {}) => {
    return await api.post('/recommendations/photographers', criteria);
  },
};

export default recommendationService;
