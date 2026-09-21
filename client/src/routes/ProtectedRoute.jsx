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
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300 mb-4 shadow-[0_0_25px_rgba(6,182,212,0.25)] mx-auto">
          {isCreativeArea ? (
            <Camera className="w-7 h-7 stroke-[1.5]" />
          ) : isAdminArea ? (
            <Shield className="w-7 h-7 stroke-[1.5]" />
          ) : (
            <Lock className="w-7 h-7 stroke-[1.5]" />
          )}
        </div>

        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 block text-center mb-1">
          {isCreativeArea
            ? 'Creator Studio Portal'
            : isAdminArea
            ? 'Administration Portal'
            : 'Client Portal'}
        </span>

        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 text-center mb-2">
          {isUnauthorizedRole
            ? 'Role Switch Required'
            : 'Sign In to Access Workspace'}
        </h2>

        <p className="text-xs text-slate-400 text-center max-w-md mb-6 leading-relaxed">
          {isUnauthorizedRole ? (
            <>
              You are currently signed in as <strong className="text-slate-200">{user?.name}</strong> ({ROLE_LABELS[user?.role] || user?.role}). This workspace requires a{' '}
              <span className="text-cyan-300 font-semibold">{allowedRoles.map((r) => ROLE_LABELS[r]).join(' or ')}</span> account.
            </>
          ) : (
            'This workspace requires an active creator studio or client session. Select an instant 1-click demo role below or sign in.'
          )}
        </p>

        {/* 1-Click Instant Demo Entry */}
        <div className="w-full p-5 rounded-2xl glass-card border border-sky-500/20 space-y-3 shadow-xl mb-4 text-left">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant 1-Click Demo Entry:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {isCreativeArea ? (
              <>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full justify-center glow-btn-primary"
                  onClick={() => quickDemoLogin(ROLES.PHOTOGRAPHER)}
                  leftIcon={<Camera className="w-3.5 h-3.5" />}
                >
                  Photographer
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center border-sky-500/20 text-slate-200 hover:text-white hover:border-cyan-500/40"
                  onClick={() => quickDemoLogin(ROLES.VIDEOGRAPHER)}
                  leftIcon={<Video className="w-3.5 h-3.5" />}
                >
                  Videographer
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center border-sky-500/20 text-slate-200 hover:text-white hover:border-cyan-500/40"
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
                className="w-full justify-center col-span-3 glow-btn-primary"
                onClick={() => quickDemoLogin(ROLES.ADMIN)}
                leftIcon={<Shield className="w-3.5 h-3.5" />}
              >
                Enter as Administrator
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                className="w-full justify-center col-span-3 glow-btn-primary"
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
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              Sign In with Credentials
            </Button>
          </Link>
          <span className="text-slate-600">•</span>
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
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
