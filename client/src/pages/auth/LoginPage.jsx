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
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
          Sign in to LensCraft
        </h2>
        <p className="text-xs text-[#6B6258] mt-1">
          Access your bookings, studio workspace, or test the platform instantly.
        </p>
      </div>

      {/* Quick Demo Logins Box */}
      <div className="p-4 rounded-md bg-[#FAF7F3] border border-[#E8DBCA] space-y-2.5 shadow-2xs">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#B88A5A] uppercase tracking-[0.15em]">
          <Sparkles className="w-3 h-3 text-[#B88A5A]" />
          <span>1-Click Demo Login (Instant Role Testing):</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleDemoLogin(ROLES.USER)}
            className="p-2 rounded-xs bg-white hover:bg-[#F7F5F2] border border-[#E5E0D8] hover:border-[#171717] text-xs font-semibold text-[#171717] text-center transition-all shadow-2xs"
          >
            👤 Client
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin(ROLES.PHOTOGRAPHER)}
            className="p-2 rounded-xs bg-white hover:bg-[#F7F5F2] border border-[#E5E0D8] hover:border-[#171717] text-xs font-semibold text-[#171717] text-center transition-all shadow-2xs"
          >
            📸 Photographer
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin(ROLES.VIDEOGRAPHER)}
            className="p-2 rounded-xs bg-white hover:bg-[#F7F5F2] border border-[#E5E0D8] hover:border-[#171717] text-xs font-semibold text-[#171717] text-center transition-all shadow-2xs"
          >
            🎥 Videographer
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin(ROLES.EDITOR)}
            className="p-2 rounded-xs bg-white hover:bg-[#F7F5F2] border border-[#E5E0D8] hover:border-[#171717] text-xs font-semibold text-[#171717] text-center transition-all shadow-2xs"
          >
            🎬 Video Editor
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin(ROLES.ADMIN)}
            className="p-2 rounded-xs bg-white hover:bg-[#F7F5F2] border border-[#E5E0D8] hover:border-[#171717] text-xs font-semibold text-[#171717] text-center transition-all shadow-2xs col-span-2 sm:col-span-1"
          >
            🛡️ Platform Admin
          </button>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="w-full border-t border-[#E5E0D8]" />
        <span className="bg-[#F7F5F2] px-3 text-[10px] font-bold text-[#8C8276] uppercase tracking-wider relative">
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
          leftIcon={<Mail className="w-4 h-4" />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Password"
          type="password"
          required
          placeholder="••••••••"
          leftIcon={<Lock className="w-4 h-4" />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-[#6B6258] cursor-pointer">
            <input type="checkbox" className="rounded bg-white border-[#E5E0D8] text-[#171717] focus:ring-0" />
            <span>Remember me</span>
          </label>
          <a href="#" className="text-[#B88A5A] hover:underline font-semibold">
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

      <p className="text-xs text-[#6B6258] text-center">
        Don't have an account?{' '}
        <Link to="/register" className="text-[#171717] font-bold hover:underline">
          Join LensCraft
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
