import api from './api';

export const recommendationService = {
  /**
   * Fetch AI photographer recommendations based on customer requirements
   * Attempts POST, and automatically falls back to GET with query params if 405 Method Not Allowed is received
   * @param {Object} criteria - { eventType, location, maxBudget, photographyStyle, eventDate, weights, strictBudget, excludeUnavailable }
   */
  getRecommendations: async (criteria = {}) => {
    try {
      return await api.post('/recommendations/photographers', criteria);
    } catch (err) {
      if (err.statusCode === 405 || (err.message && err.message.includes('405'))) {
        // Fallback to GET with query parameters
        return await api.get('/recommendations/photographers', { params: criteria });
      }
      throw err;
    }
  },

  /**
   * Fetch ML-based smart package recommendations
   * Attempts POST, and automatically falls back to GET with query params if 405 Method Not Allowed is received
   * @param {Object} preferences - { eventType, budget, location, photographyStyle, requiredService, requiredInclusions, strictBudget }
   */
  getSmartPackages: async (preferences = {}) => {
    try {
      return await api.post('/recommendations/smart-packages', preferences);
    } catch (err) {
      if (err.statusCode === 405 || (err.message && err.message.includes('405'))) {
        return await api.get('/recommendations/smart-packages', { params: preferences });
      }
      throw err;
    }
  },

  /**
   * Fetch available filter options
   */
  getPackageFilterOptions: async () => {
    return await api.get('/recommendations/smart-packages/options');
  },
};

export default recommendationService;

