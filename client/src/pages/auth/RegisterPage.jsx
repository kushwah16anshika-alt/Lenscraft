import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, ArrowRight, Camera, Video, Film, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { ROLES, ROLE_LABELS } from '../../constants/roles';

const RegisterPage = () => {
  const [role, setRole] = useState(ROLES.USER);
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
    { key: ROLES.VIDEOGRAPHER, label: 'Cinematographer', icon: Video, desc: '8K motion, drone & commercials' },
    { key: ROLES.EDITOR, label: 'Post Colorist', icon: Film, desc: 'DaVinci color & visual effects' },
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
      success('Account created successfully!');
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
    <div className="space-y-6 text-left">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-[11px] font-mono mb-3">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>JOIN THE SYNDICATE</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
          Create Your Account
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
          Select your role to unlock customized escrow booking, portfolios, or studio management.
        </p>
      </div>

      {/* Role Selection Grid with Glass Hover States */}
      <div className="space-y-2">
        <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">
          I am joining LensCraft as:
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
                className={`p-3.5 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                  isSelected
                    ? 'bg-gradient-to-br from-cyan-950/60 to-indigo-950/60 border-cyan-400/60 text-white shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400/40'
                    : 'bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/25 hover:bg-white/[0.06]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/5 text-slate-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-semibold leading-tight text-white">{opt.label}</h4>
                  <p className="text-[11px] mt-0.5 text-slate-400 leading-snug">
                    {opt.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name or Studio Alias"
          required
          placeholder="e.g. Elena Rostova or Studio Aether"
          leftIcon={<User className="w-4 h-4 text-cyan-400/70" />}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <Input
          label="Official Email Address"
          type="email"
          required
          placeholder="your.email@example.com"
          leftIcon={<Mail className="w-4 h-4 text-cyan-400/70" />}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <Input
          label="Phone Number (SMS Milestone Alerts)"
          type="tel"
          placeholder="+91 98765 43210"
          leftIcon={<Phone className="w-4 h-4 text-cyan-400/70" />}
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />

        <Input
          label="Password (min. 6 characters)"
          type="password"
          required
          minLength={6}
          placeholder="••••••••"
          leftIcon={<Lock className="w-4 h-4 text-cyan-400/70" />}
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isLoading}
          className="w-full justify-center group mt-2"
          rightIcon={<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
        >
          Create {ROLE_LABELS[role]} Account
        </Button>
      </form>

      <p className="text-xs text-slate-400 text-center pt-2">
        Already have an account?{' '}
        <Link to="/login" className="text-cyan-400 font-semibold hover:text-cyan-300 hover:underline">
          Sign In to Workspace
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
