import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Sparkles, ArrowRight } from 'lucide-react';
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
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
          Sign in to LensCraft
        </h2>
        <p className="text-sm text-zinc-500 mt-1.5">
          Access your bookings, studio workspace, or test the platform instantly.
        </p>
      </div>

      {/* Quick Demo Logins Box */}
      <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-3">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-600 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
          <span>Instant Demo Logins:</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleDemoLogin(ROLES.USER)}
            className="p-2.5 rounded-lg bg-white hover:bg-zinc-100/70 border border-zinc-200 hover:border-zinc-300 text-xs font-medium text-zinc-900 text-center transition shadow-2xs"
          >
            👤 Client
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin(ROLES.PHOTOGRAPHER)}
            className="p-2.5 rounded-lg bg-white hover:bg-zinc-100/70 border border-zinc-200 hover:border-zinc-300 text-xs font-medium text-zinc-900 text-center transition shadow-2xs"
          >
            📸 Photographer
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin(ROLES.VIDEOGRAPHER)}
            className="p-2.5 rounded-lg bg-white hover:bg-zinc-100/70 border border-zinc-200 hover:border-zinc-300 text-xs font-medium text-zinc-900 text-center transition shadow-2xs"
          >
            🎥 Videographer
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin(ROLES.EDITOR)}
            className="p-2.5 rounded-lg bg-white hover:bg-zinc-100/70 border border-zinc-200 hover:border-zinc-300 text-xs font-medium text-zinc-900 text-center transition shadow-2xs"
          >
            🎬 Video Editor
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin(ROLES.ADMIN)}
            className="p-2.5 rounded-lg bg-white hover:bg-zinc-100/70 border border-zinc-200 hover:border-zinc-300 text-xs font-medium text-zinc-900 text-center transition shadow-2xs col-span-2 sm:col-span-1"
          >
            🛡️ Platform Admin
          </button>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="w-full border-t border-zinc-200" />
        <span className="bg-white px-3 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider relative">
          Or with credentials
        </span>
      </div>

      {/* Standard Email Login Form */}
      <form onSubmit={handleStandardLogin} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          required
          placeholder="your.email@example.com"
          leftIcon={<Mail className="w-4 h-4 text-zinc-400" />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Password"
          type="password"
          required
          placeholder="••••••••"
          leftIcon={<Lock className="w-4 h-4 text-zinc-400" />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-zinc-600 cursor-pointer">
            <input type="checkbox" className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900" />
            <span>Remember me</span>
          </label>
          <a href="#" className="text-zinc-900 hover:underline font-medium">
            Forgot password?
          </a>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isLoading}
          className="w-full justify-center group"
          rightIcon={<ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
        >
          Sign In
        </Button>
      </form>

      <p className="text-xs text-zinc-500 text-center">
        Don't have an account?{' '}
        <Link to="/register" className="text-zinc-900 font-semibold hover:underline">
          Join LensCraft
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
