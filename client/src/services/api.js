import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor: Attach JWT token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('lenscraft_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Global error formatting
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred';
    const statusCode = error.response?.status || (error.code === 'ECONNABORTED' ? 408 : 500);
    const errors = error.response?.data?.errors || null;

    // Use a standard Error instance so console.error prints a readable stack & message rather than "[object Object]"
    const customError = new Error(message);
    customError.name = 'ApiError';
    customError.statusCode = statusCode;
    customError.status = statusCode;
    customError.errors = errors;
    customError.response = error.response;
    customError.request = error.request;
    customError.code = error.code;

    // Auto logout on 401 Unauthorized token expiry
    if (customError.statusCode === 401 && typeof window !== 'undefined' && window.location.pathname !== '/login') {
      // Optional: Clear token or notify auth context
    }

    return Promise.reject(customError);
  }
);

export default api;
