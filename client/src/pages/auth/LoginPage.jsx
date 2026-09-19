import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Sparkles, ArrowRight, UserCheck, Camera, Video, Film, Shield } from 'lucide-react';
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
      <div>
        <p className="text-xs uppercase font-mono tracking-widest text-[#C5A059] mb-1">
          Creative Account
        </p>
        <h2 className="text-3xl font-cinzel font-semibold text-[#FBF9F5]">
          WELCOME BACK
        </h2>
        <p className="text-xs text-[#A39E93] mt-1">
          Continue creating memories that matter.
        </p>
      </div>

      {/* Standard Minimal Form */}
      <form onSubmit={handleStandardLogin} className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-[#A39E93] font-medium mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#A39E93] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="w-full pl-10 pr-3.5 py-2.5 rounded bg-[#111111] border border-[#262626] text-xs text-[#FBF9F5] placeholder-[#6B665E] focus:outline-none focus:border-[#C5A059] transition-all"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs uppercase tracking-wider text-[#A39E93] font-medium">
              Password
            </label>
            <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to registered email.'); }} className="text-[11px] text-[#C5A059] hover:underline">
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-[#A39E93] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-3.5 py-2.5 rounded bg-[#111111] border border-[#262626] text-xs text-[#FBF9F5] placeholder-[#6B665E] focus:outline-none focus:border-[#C5A059] transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded gold-btn text-xs uppercase tracking-wider font-semibold shadow-lg transition-all"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center justify-center py-2">
        <div className="w-full border-t border-[#262626]" />
        <span className="bg-[#080808] px-3 text-[10px] uppercase font-mono text-[#6B665E] tracking-widest relative">
          ──────── OR ────────
        </span>
      </div>

      {/* 1-Click Demo Roles */}
      <div className="space-y-2">
        <p className="text-[10px] uppercase font-mono tracking-widest text-[#A39E93] text-center">
          Instant 1-Click Demo Profiles
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { role: ROLES.USER, label: 'Client' },
            { role: ROLES.PHOTOGRAPHER, label: 'Photographer' },
            { role: ROLES.VIDEOGRAPHER, label: 'Videographer' },
            { role: ROLES.EDITOR, label: 'Editor' },
          ].map((item) => (
            <button
              key={item.role}
              type="button"
              onClick={() => handleDemoLogin(item.role)}
              className="p-2 rounded bg-[#111111] hover:bg-[#171717] border border-[#262626] hover:border-[#C5A059] text-xs text-[#EAE6DF] hover:text-[#DFCA9B] font-medium transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Link to Register */}
      <p className="text-xs text-[#A39E93] text-center pt-2">
        Don't have an account?{' '}
        <Link to="/register" className="text-[#DFCA9B] hover:underline font-semibold">
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
