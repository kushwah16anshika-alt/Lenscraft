import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROLES } from '../constants/roles';

const PublicOnlyRoute = ({ children }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return null;

  if (isAuthenticated && user) {
    if (user.role === ROLES.ADMIN) {
      return <Navigate to="/admin/dashboard" replace />;
    } else if ([ROLES.PHOTOGRAPHER, ROLES.VIDEOGRAPHER, ROLES.EDITOR].includes(user.role)) {
      return <Navigate to="/professional/dashboard" replace />;
    } else {
      return <Navigate to="/user/dashboard" replace />;
    }
  }

  return children;
};

export default PublicOnlyRoute;
