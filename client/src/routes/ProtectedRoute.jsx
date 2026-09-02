import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { PageLoader } from '../components/common/Spinner';
import { ROLES, ROLE_LABELS, CREATIVE_ROLES } from '../constants/roles';
import { Shield, Camera, Video, Film, Lock, Sparkles, ArrowRight } from 'lucide-react';
import Button from '../components/common/Button';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated, loading, quickDemoLogin } = useAuth();
  const location = useLocation();

  if (loading) {
    return <PageLoader text="Verifying session credentials..." />;
  }

  // If not logged in or unauthorized role, display interactive gateway rather than jarring silent redirect
  const isUnauthorizedRole = allowedRoles.length > 0 && !allowedRoles.includes(user?.role);

  if (!isAuthenticated || isUnauthorizedRole) {
    const isCreativeArea = allowedRoles.some((r) => CREATIVE_ROLES.includes(r));
    const isAdminArea = allowedRoles.includes(ROLES.ADMIN);

    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center max-w-xl mx-auto text-left">
        <div className="w-14 h-14 rounded-full bg-[#FAF7F3] border border-[#E8DBCA] flex items-center justify-center text-[#B88A5A] mb-4 shadow-2xs mx-auto">
          {isCreativeArea ? (
            <Camera className="w-6 h-6 stroke-[1.5]" />
          ) : isAdminArea ? (
            <Shield className="w-6 h-6 stroke-[1.5]" />
          ) : (
            <Lock className="w-6 h-6 stroke-[1.5]" />
          )}
        </div>

        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B88A5A] block text-center mb-1">
          {isCreativeArea
            ? 'Creator Studio Portal'
            : isAdminArea
            ? 'Administration Portal'
            : 'Client Portal'}
        </span>

        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717] text-center mb-2">
          {isUnauthorizedRole
            ? 'Role Switch Required'
            : 'Sign In to Access Workspace'}
        </h2>

        <p className="text-xs text-[#6B6258] text-center max-w-md mb-6 leading-relaxed">
          {isUnauthorizedRole ? (
            <>
              You are currently signed in as <strong>{user?.name}</strong> ({ROLE_LABELS[user?.role] || user?.role}). This workspace requires a{' '}
              {allowedRoles.map((r) => ROLE_LABELS[r]).join(' or ')} account.
            </>
          ) : (
            'This workspace requires an active creator studio or client session. Select an instant 1-click demo role below or sign in.'
          )}
        </p>

        {/* 1-Click Instant Demo Entry */}
        <div className="w-full p-5 rounded-md bg-white border border-[#E5E0D8] space-y-3 shadow-sm mb-4">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#B88A5A] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant 1-Click Demo Entry:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {isCreativeArea ? (
              <>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full justify-center"
                  onClick={() => quickDemoLogin(ROLES.PHOTOGRAPHER)}
                  leftIcon={<Camera className="w-3.5 h-3.5" />}
                >
                  Photographer
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center"
                  onClick={() => quickDemoLogin(ROLES.VIDEOGRAPHER)}
                  leftIcon={<Video className="w-3.5 h-3.5" />}
                >
                  Videographer
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center"
                  onClick={() => quickDemoLogin(ROLES.EDITOR)}
                  leftIcon={<Film className="w-3.5 h-3.5" />}
                >
                  Video Editor
                </Button>
              </>
            ) : isAdminArea ? (
              <Button
                variant="primary"
                size="sm"
                className="w-full justify-center col-span-3"
                onClick={() => quickDemoLogin(ROLES.ADMIN)}
                leftIcon={<Shield className="w-3.5 h-3.5" />}
              >
                Enter as Administrator
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                className="w-full justify-center col-span-3"
                onClick={() => quickDemoLogin(ROLES.USER)}
              >
                Enter as Client
              </Button>
            )}
          </div>
        </div>

        {/* Traditional Auth Links */}
        <div className="flex items-center gap-3 justify-center text-xs">
          <Link to="/login" state={{ from: location }}>
            <Button variant="ghost" size="sm">
              Sign In with Credentials
            </Button>
          </Link>
          <span className="text-[#8C8276]">•</span>
          <Link to="/">
            <Button variant="ghost" size="sm">
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
