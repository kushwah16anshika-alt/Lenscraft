import api from './api';

export const authService = {
  // Login with email and password
  login: async (credentials) => {
    return await api.post('/auth/login', credentials);
  },

  // Authenticate with Google ID Token or Access Token
  googleAuth: async (googleData) => {
    return await api.post('/auth/google', googleData);
  },

  // Register a new user/creative
  register: async (userData) => {
    return await api.post('/auth/register', userData);
  },

  // Get current logged-in user details
  getMe: async () => {
    return await api.get('/auth/me');
  },

  // Logout
  logout: async () => {
    return await api.post('/auth/logout');
  },
};
