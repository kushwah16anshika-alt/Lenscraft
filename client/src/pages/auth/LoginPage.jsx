import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Sparkles, ArrowRight, UserCheck, Camera, Video, Film, Shield } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
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
    <div className="space-y-6 text-left">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-[11px] font-mono mb-3">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>AUTHENTICATION PROTOCOL</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
          Sign In to LensCraft
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
          Access your bookings, creator studio workspace, or test the platform instantly with 1-click demo logins.
        </p>
      </div>

      {/* Quick Demo Logins Box with Glowing Badges */}
      <div className="p-4 rounded-xl bg-white/[0.03] border border-cyan-500/20 shadow-inner shadow-cyan-500/5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Instant Role Testing (1-Click)</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">No password required</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleDemoLogin(ROLES.USER)}
            className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 text-xs font-medium text-slate-200 hover:text-white flex items-center justify-center gap-1.5 transition-all group"
          >
            <UserCheck className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>Client</span>
          </button>

          <button
            type="button"
            onClick={() => handleDemoLogin(ROLES.PHOTOGRAPHER)}
            className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/40 text-xs font-medium text-slate-200 hover:text-white flex items-center justify-center gap-1.5 transition-all group"
          >
            <Camera className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
            <span>Photographer</span>
          </button>

          <button
            type="button"
            onClick={() => handleDemoLogin(ROLES.VIDEOGRAPHER)}
            className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/40 text-xs font-medium text-slate-200 hover:text-white flex items-center justify-center gap-1.5 transition-all group"
          >
            <Video className="w-3.5 h-3.5 text-violet-400 group-hover:scale-110 transition-transform" />
            <span>Videographer</span>
          </button>

          <button
            type="button"
            onClick={() => handleDemoLogin(ROLES.EDITOR)}
            className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-fuchsia-500/40 text-xs font-medium text-slate-200 hover:text-white flex items-center justify-center gap-1.5 transition-all group"
          >
            <Film className="w-3.5 h-3.5 text-fuchsia-400 group-hover:scale-110 transition-transform" />
            <span>Video Editor</span>
          </button>

          <button
            type="button"
            onClick={() => handleDemoLogin(ROLES.ADMIN)}
            className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-500/40 text-xs font-medium text-slate-200 hover:text-white flex items-center justify-center gap-1.5 transition-all group col-span-2 sm:col-span-1"
          >
            <Shield className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>Admin</span>
          </button>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="w-full border-t border-white/10" />
        <span className="bg-[#0b1329] px-3 text-[10px] font-mono uppercase text-slate-400 tracking-wider relative border border-white/5 rounded-full">
          Or standard credentials
        </span>
      </div>

      {/* Standard Email Login Form */}
      <form onSubmit={handleStandardLogin} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          required
          placeholder="your.email@example.com"
          leftIcon={<Mail className="w-4 h-4 text-cyan-400/70" />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Password"
          type="password"
          required
          placeholder="••••••••"
          leftIcon={<Lock className="w-4 h-4 text-cyan-400/70" />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
            <input type="checkbox" className="rounded bg-black/40 border-white/20 text-cyan-500 focus:ring-cyan-500/30" />
            <span>Remember session</span>
          </label>
          <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
            Forgot password?
          </a>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isLoading}
          className="w-full justify-center group mt-2"
          rightIcon={<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
        >
          Sign In to Workspace
        </Button>
      </form>

      <p className="text-xs text-slate-400 text-center pt-2">
        Don't have an account?{' '}
        <Link to="/register" className="text-cyan-400 font-semibold hover:text-cyan-300 hover:underline">
          Join LensCraft as Client or Talent
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
