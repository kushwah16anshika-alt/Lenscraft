import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { ROLES, CREATIVE_ROLES } from '../constants/roles';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('lenscraft_token') || null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      const savedUser = localStorage.getItem('lenscraft_user');
      const savedToken = localStorage.getItem('lenscraft_token');

      if (savedToken && savedUser) {
        try {
          setUser(JSON.parse(savedUser));
          setToken(savedToken);
        } catch (e) {
          localStorage.removeItem('lenscraft_user');
          localStorage.removeItem('lenscraft_token');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // Standard API Login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await authService.login({ email, password });
      const { user: userData, token: userToken } = response.data;
      
      setUser(userData);
      setToken(userToken);
      localStorage.setItem('lenscraft_user', JSON.stringify(userData));
      localStorage.setItem('lenscraft_token', userToken);
      
      return { success: true, user: userData };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Login failed',
      };
    } finally {
      setLoading(false);
    }
  };

  // Quick Demo Login (Allows rapid role-based testing in dev without DB setup required)
  const quickDemoLogin = (role = ROLES.USER) => {
    let mockUser = {
      _id: `demo-${role}-1`,
      name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      email: `${role}@lenscraft.dev`,
      role: role,
      phone: '+91 98765 43210',
      avatar: {
        url: role === ROLES.PHOTOGRAPHER
          ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
          : role === ROLES.VIDEOGRAPHER
          ? 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
          : role === ROLES.EDITOR
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
          : role === ROLES.ADMIN
          ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
          : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      },
      location: { city: 'Mumbai', state: 'Maharashtra', country: 'India' },
      isVerified: true,
    };

    const mockToken = `mock-jwt-token-${role}-${Date.now()}`;
    setUser(mockUser);
    setToken(mockToken);
    localStorage.setItem('lenscraft_user', JSON.stringify(mockUser));
    localStorage.setItem('lenscraft_token', mockToken);
    return mockUser;
  };

  // Standard Registration
  const register = async (formData) => {
    setLoading(true);
    try {
      const response = await authService.register(formData);
      const { user: userData, token: userToken } = response.data;

      setUser(userData);
      setToken(userToken);
      localStorage.setItem('lenscraft_user', JSON.stringify(userData));
      localStorage.setItem('lenscraft_token', userToken);

      return { success: true, user: userData };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Registration failed',
      };
    } finally {
      setLoading(false);
    }
  };

  // Update User Profile state & local storage
  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('lenscraft_user', JSON.stringify(updatedUser));
    return updatedUser;
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('lenscraft_user');
    localStorage.removeItem('lenscraft_token');
  };

  const isAuthenticated = !!user && !!token;
  const isCreative = user && CREATIVE_ROLES.includes(user.role);
  const isAdmin = user && user.role === ROLES.ADMIN;
  const isUser = user && user.role === ROLES.USER;

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    isCreative,
    isAdmin,
    isUser,
    login,
    quickDemoLogin,
    register,
    updateUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
