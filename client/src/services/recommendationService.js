import api from './api';

export const recommendationService = {
  /**
   * Fetch AI photographer recommendations based on customer requirements
   * @param {Object} criteria - { eventType, location, maxBudget, photographyStyle, eventDate, weights, strictBudget, excludeUnavailable }
   */
  getRecommendations: async (criteria = {}) => {
    return await api.post('/recommendations/photographers', criteria);
  },

  /**
   * Fetch ML-based smart package recommendations
   * @param {Object} preferences - { eventType, budget, location, photographyStyle, requiredService, requiredInclusions, strictBudget }
   */
  getSmartPackages: async (preferences = {}) => {
    return await api.post('/recommendations/smart-packages', preferences);
  },

  /**
   * Fetch available filter options
   */
  getPackageFilterOptions: async () => {
    return await api.get('/recommendations/smart-packages/options');
  },
};

export default recommendationService;

