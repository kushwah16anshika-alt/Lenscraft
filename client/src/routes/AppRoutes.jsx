import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from '../components/layout/PublicLayout';
import AuthLayout from '../components/layout/AuthLayout';
import DashboardLayout from '../components/layout/DashboardLayout';

// Route Guards
import ProtectedRoute from './ProtectedRoute';
import PublicOnlyRoute from './PublicOnlyRoute';
import { ROLES, CREATIVE_ROLES } from '../constants/roles';

// Public Pages
import HomePage from '../pages/public/HomePage';
import PhotographersPage from '../pages/public/PhotographersPage';
import VideographersPage from '../pages/public/VideographersPage';
import EditorsPage from '../pages/public/EditorsPage';
import ProfessionalProfilePage from '../pages/public/ProfessionalProfilePage';
import ServicesPage from '../pages/public/ServicesPage';
import AboutPage from '../pages/public/AboutPage';
import ContactPage from '../pages/public/ContactPage';
import NotFoundPage from '../pages/public/NotFoundPage';

// Auth Pages
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';

// User Pages
import UserDashboard from '../pages/user/UserDashboard';
import MyBookingsPage from '../pages/user/MyBookingsPage';
import UserProfilePage from '../pages/user/UserProfilePage';
import UserWishlistPage from '../pages/user/UserWishlistPage';
import UserReviewsPage from '../pages/user/UserReviewsPage';
import UserSettingsPage from '../pages/user/UserSettingsPage';

// Professional Pages
import ProfessionalDashboard from '../pages/professional/ProfessionalDashboard';
import AppointmentsPage from '../pages/professional/AppointmentsPage';
import PortfolioPage from '../pages/professional/PortfolioPage';
import ServicesManagePage from '../pages/professional/ServicesManagePage';
import PricingPage from '../pages/professional/PricingPage';
import AvailabilityPage from '../pages/professional/AvailabilityPage';
import EarningsPage from '../pages/professional/EarningsPage';
import ReviewsManagePage from '../pages/professional/ReviewsManagePage';
import SettingsPage from '../pages/professional/SettingsPage';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminUsersPage from '../pages/admin/AdminUsersPage';
import AdminProfessionalsPage from '../pages/admin/AdminProfessionalsPage';
import AdminAppointmentsPage from '../pages/admin/AdminAppointmentsPage';
import AdminReviewsPage from '../pages/admin/AdminReviewsPage';
import AdminReportsPage from '../pages/admin/AdminReportsPage';
import AdminCategoriesPage from '../pages/admin/AdminCategoriesPage';
import AdminSettingsPage from '../pages/admin/AdminSettingsPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/photographers" element={<PhotographersPage />} />
        <Route path="/videographers" element={<VideographersPage />} />
        <Route path="/editors" element={<EditorsPage />} />
        <Route path="/professionals/:id" element={<ProfessionalProfilePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Auth Pages (Restricted for logged-in users) */}
      <Route
        element={
          <PublicOnlyRoute>
            <AuthLayout />
          </PublicOnlyRoute>
        }
      >
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* User / Client Portal */}
      <Route
        path="/user"
        element={
          <ProtectedRoute allowedRoles={[ROLES.USER]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/user/dashboard" replace />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="bookings" element={<MyBookingsPage />} />
        <Route path="profile" element={<UserProfilePage />} />
        <Route path="wishlist" element={<UserWishlistPage />} />
        <Route path="reviews" element={<UserReviewsPage />} />
        <Route path="settings" element={<UserSettingsPage />} />
      </Route>

      {/* Professional / Creative Portal (Photographer, Videographer, Editor) */}
      <Route
        path="/professional"
        element={
          <ProtectedRoute allowedRoles={CREATIVE_ROLES}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/professional/dashboard" replace />} />
        <Route path="dashboard" element={<ProfessionalDashboard />} />
        <Route path="appointments" element={<AppointmentsPage />} />
        <Route path="portfolio" element={<PortfolioPage />} />
        <Route path="services" element={<ServicesManagePage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="availability" element={<AvailabilityPage />} />
        <Route path="earnings" element={<EarningsPage />} />
        <Route path="reviews" element={<ReviewsManagePage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Admin Portal */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="professionals" element={<AdminProfessionalsPage />} />
        <Route path="appointments" element={<AdminAppointmentsPage />} />
        <Route path="reviews" element={<AdminReviewsPage />} />
        <Route path="reports" element={<AdminReportsPage />} />
        <Route path="categories" element={<AdminCategoriesPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
