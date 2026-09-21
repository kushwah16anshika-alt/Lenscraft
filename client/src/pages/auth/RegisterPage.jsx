import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, User, Phone, ArrowRight, Camera, Video, Film, Users, Check, Sparkles } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { ROLES, ROLE_LABELS } from '../../constants/roles';

const RegisterPage = () => {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'creator' ? ROLES.PHOTOGRAPHER : ROLES.USER;

  const [role, setRole] = useState(initialRole);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();

  const roleOptions = [
    { key: ROLES.USER, label: 'Client / Director', icon: Users, desc: 'Commission & book verified talent' },
    { key: ROLES.PHOTOGRAPHER, label: 'Photographer', icon: Camera, desc: 'Showcase portfolios & shoots' },
    { key: ROLES.VIDEOGRAPHER, label: 'Cinematographer', icon: Video, desc: '4K cinema, drone & films' },
    { key: ROLES.EDITOR, label: 'Post Colorist', icon: Film, desc: 'Color grade & visual effects' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await register({
      ...formData,
      role,
    });
    setIsLoading(false);

    if (result.success) {
      success('Account created successfully! Welcome to Lenscraft.');
      if (role === ROLES.USER) {
        navigate('/user/dashboard', { replace: true });
      } else {
        navigate('/professional/dashboard', { replace: true });
      }
    } else {
      toastError(result.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="space-y-6 text-left animate-reveal">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>JOIN THE ROSTER</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
          Create Your <span className="text-gradient-cyan">Account</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Step into a curated collective of elite creative storytellers and clients.
        </p>
      </div>

      {/* Role Selection Grid */}
      <div className="space-y-2">
        <label className="block text-xs uppercase font-mono tracking-wider text-slate-300 font-semibold">
          Select Your Account Type:
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {roleOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = role === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => setRole(opt.key)}
                className={`p-3 rounded-2xl text-left transition-all duration-300 flex flex-col justify-between relative overflow-hidden group ${
                  isSelected
                    ? 'bg-midnight-800/90 border-2 border-cyan-400 shadow-[0_0_20px_rgba(0,210,255,0.25)] ring-1 ring-cyan-400/50'
                    : 'glass-panel hover:bg-midnight-700/60 border border-sky-500/15 hover:border-sky-500/35'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-1.5 rounded-lg transition-colors ${
                    isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/5 text-slate-400 group-hover:text-cyan-300'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-cyan-400 text-midnight-950 flex items-center justify-center shadow-md">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
                <div>
                  <h4 className={`text-xs font-bold transition-colors ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                    {opt.label}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                    {opt.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="block text-xs uppercase font-mono tracking-wider text-slate-300 font-medium mb-1">
            Full Name or Studio Alias
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              placeholder="e.g. Arjun Mehta"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl glass-input border border-sky-500/20 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase font-mono tracking-wider text-slate-300 font-medium mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl glass-input border border-sky-500/20 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase font-mono tracking-wider text-slate-300 font-medium mb-1">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl glass-input border border-sky-500/20 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase font-mono tracking-wider text-slate-300 font-medium mb-1">
            Password <span className="text-[10px] text-slate-500 lowercase">(min 6 chars)</span>
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl glass-input border border-sky-500/20 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-xl glow-btn-primary text-xs uppercase font-mono tracking-wider font-bold shadow-[0_0_20px_rgba(0,210,255,0.4)] hover:shadow-[0_0_30px_rgba(0,210,255,0.7)] flex items-center justify-center gap-2 mt-3 transition-all duration-300"
        >
          {isLoading ? (
            <span>Creating Account...</span>
          ) : (
            <>
              <span>Register as {ROLE_LABELS[role]}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Footer Link */}
      <p className="text-xs text-slate-400 text-center pt-2">
        Already have an account?{' '}
        <Link to="/login" className="text-cyan-400 hover:text-cyan-300 hover:underline font-semibold ml-1">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
