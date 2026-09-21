import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Sparkles, ArrowRight, UserCheck, Camera, Video, Film, Users, Shield } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { ROLES, ROLE_LABELS } from '../../constants/roles';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, quickDemoLogin } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || null;

  const redirectToRoleDashboard = (role) => {
    if (from) {
      navigate(from, { replace: true });
      return;
    }
    switch (role) {
      case ROLES.ADMIN:
        navigate('/admin/dashboard', { replace: true });
        break;
      case ROLES.PHOTOGRAPHER:
      case ROLES.VIDEOGRAPHER:
      case ROLES.EDITOR:
        navigate('/professional/dashboard', { replace: true });
        break;
      case ROLES.USER:
      default:
        navigate('/user/dashboard', { replace: true });
        break;
    }
  };

  const handleStandardLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      success(`Welcome back, ${result.user.name}!`);
      redirectToRoleDashboard(result.user.role);
    } else {
      toastError(result.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleDemoLogin = (role) => {
    const user = quickDemoLogin(role);
    success(`Logged in as ${ROLE_LABELS[role]} (Demo Mode)`);
    redirectToRoleDashboard(user.role);
  };

  return (
    <div className="space-y-6 text-left animate-reveal">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AUTHENTICATION</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
          Welcome <span className="text-gradient-cyan">Back</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Sign in to manage your appointments, bookings, and creative collections.
        </p>
      </div>

      {/* Standard Form */}
      <form onSubmit={handleStandardLogin} className="space-y-4">
        <div>
          <label className="block text-xs uppercase font-mono tracking-wider text-slate-300 font-medium mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl glass-input border border-sky-500/20 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 transition-all"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs uppercase font-mono tracking-wider text-slate-300 font-medium">
              Password
            </label>
            <a
              href="#forgot"
              onClick={(e) => { e.preventDefault(); alert('Password reset link sent to your registered email.'); }}
              className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl glass-input border border-sky-500/20 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-xl glow-btn-primary text-xs uppercase font-mono tracking-wider font-bold shadow-[0_0_20px_rgba(0,210,255,0.4)] hover:shadow-[0_0_30px_rgba(0,210,255,0.7)] flex items-center justify-center gap-2 transition-all duration-300"
        >
          {isLoading ? (
            <span>Signing In...</span>
          ) : (
            <>
              <span>Sign In to Lenscraft</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Modern Neon Divider */}
      <div className="relative flex items-center justify-center py-1">
        <div className="w-full border-t border-sky-500/15" />
        <span className="bg-[#030712] px-3 text-[10px] uppercase font-mono text-slate-500 tracking-widest relative">
          QUICK DEMO ACCESS
        </span>
      </div>

      {/* 1-Click Demo Roles */}
      <div className="space-y-2">
        <p className="text-[10px] uppercase font-mono tracking-widest text-slate-400 text-center">
          Instant 1-Click Role Profiles
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { role: ROLES.USER, label: 'Client', icon: Users },
            { role: ROLES.PHOTOGRAPHER, label: 'Photographer', icon: Camera },
            { role: ROLES.VIDEOGRAPHER, label: 'Videographer', icon: Video },
            { role: ROLES.EDITOR, label: 'Editor', icon: Film },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.role}
                type="button"
                onClick={() => handleDemoLogin(item.role)}
                className="p-2.5 rounded-xl glass-panel-interactive border border-sky-500/20 hover:border-cyan-400 text-xs text-slate-200 hover:text-cyan-300 font-medium transition-all flex items-center justify-center gap-1.5"
              >
                <Icon className="w-3.5 h-3.5 text-cyan-400" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Link to Register */}
      <p className="text-xs text-slate-400 text-center pt-2">
        Don't have an account?{' '}
        <Link to="/register" className="text-cyan-400 hover:text-cyan-300 hover:underline font-semibold ml-1">
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
