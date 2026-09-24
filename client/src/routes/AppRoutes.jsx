import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Spinner from '../components/common/Spinner';

// Layouts (eagerly loaded for instant skeleton structure)
import PublicLayout from '../components/layout/PublicLayout';
import AuthLayout from '../components/layout/AuthLayout';
import DashboardLayout from '../components/layout/DashboardLayout';

// Route Guards
import ProtectedRoute from './ProtectedRoute';
import PublicOnlyRoute from './PublicOnlyRoute';
import { ROLES, CREATIVE_ROLES } from '../constants/roles';

// Public Pages (Lazy Loaded for Fast Route Splitting)
const HomePage = lazy(() => import('../pages/public/HomePage'));
const PhotographersPage = lazy(() => import('../pages/public/PhotographersPage'));
const VideographersPage = lazy(() => import('../pages/public/VideographersPage'));
const EditorsPage = lazy(() => import('../pages/public/EditorsPage'));
const ExplorePage = lazy(() => import('../pages/public/ExplorePage'));
const ProfessionalProfilePage = lazy(() => import('../pages/public/ProfessionalProfilePage'));
const ServicesPage = lazy(() => import('../pages/public/ServicesPage'));
const FeaturesPage = lazy(() => import('../pages/public/FeaturesPage'));
const AboutPage = lazy(() => import('../pages/public/AboutPage'));
const ContactPage = lazy(() => import('../pages/public/ContactPage'));
const NotFoundPage = lazy(() => import('../pages/public/NotFoundPage'));

// Auth Pages (Lazy Loaded)
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'));

// User Pages (Lazy Loaded)
const UserDashboard = lazy(() => import('../pages/user/UserDashboard'));
const MyBookingsPage = lazy(() => import('../pages/user/MyBookingsPage'));
const UserProfilePage = lazy(() => import('../pages/user/UserProfilePage'));
const UserWishlistPage = lazy(() => import('../pages/user/UserWishlistPage'));
const UserReviewsPage = lazy(() => import('../pages/user/UserReviewsPage'));
const UserSettingsPage = lazy(() => import('../pages/user/UserSettingsPage'));

// Professional Pages (Lazy Loaded)
const ProfessionalDashboard = lazy(() => import('../pages/professional/ProfessionalDashboard'));
const AppointmentsPage = lazy(() => import('../pages/professional/AppointmentsPage'));
const PortfolioPage = lazy(() => import('../pages/professional/PortfolioPage'));
const ServicesManagePage = lazy(() => import('../pages/professional/ServicesManagePage'));
const PricingPage = lazy(() => import('../pages/professional/PricingPage'));
const AvailabilityPage = lazy(() => import('../pages/professional/AvailabilityPage'));
const EarningsPage = lazy(() => import('../pages/professional/EarningsPage'));
const ReviewsManagePage = lazy(() => import('../pages/professional/ReviewsManagePage'));
const SettingsPage = lazy(() => import('../pages/professional/SettingsPage'));

// Admin Pages (Lazy Loaded)
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const AdminUsersPage = lazy(() => import('../pages/admin/AdminUsersPage'));
const AdminProfessionalsPage = lazy(() => import('../pages/admin/AdminProfessionalsPage'));
const AdminAppointmentsPage = lazy(() => import('../pages/admin/AdminAppointmentsPage'));
const AdminReviewsPage = lazy(() => import('../pages/admin/AdminReviewsPage'));
const AdminReportsPage = lazy(() => import('../pages/admin/AdminReportsPage'));
const AdminCategoriesPage = lazy(() => import('../pages/admin/AdminCategoriesPage'));
const AdminSettingsPage = lazy(() => import('../pages/admin/AdminSettingsPage'));

// Cinematic Route Loading Fallback
const PageLoader = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
    <div className="relative">
      <div className="w-12 h-12 rounded-full border-2 border-sky-500/20 border-t-sky-400 animate-spin" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-sky-500/40 animate-ping" />
      </div>
    </div>
    <span className="text-xs uppercase tracking-widest text-slate-500 font-mono animate-pulse">
      Rendering scene...
    </span>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Pages */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/photographers" element={<PhotographersPage />} />
          <Route path="/videographers" element={<VideographersPage />} />
          <Route path="/editors" element={<EditorsPage />} />
          <Route path="/professionals/:id" element={<ProfessionalProfilePage />} />
          <Route path="/professional/:id" element={<ProfessionalProfilePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/features" element={<FeaturesPage />} />
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
    </Suspense>
  );
};

export default AppRoutes;
