import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, User, Phone, ArrowRight, Camera, Video, Film, Users, Check } from 'lucide-react';
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
    <div className="space-y-6 text-left animate-reveal">
      <div>
        <p className="text-xs uppercase font-mono tracking-widest text-[#C5A059] mb-1">
          Join Lenscraft
        </p>
        <h2 className="text-3xl font-cinzel font-semibold text-[#FBF9F5]">
          CREATE AN ACCOUNT
        </h2>
        <p className="text-xs text-[#A39E93] mt-1">
          Step into a curated collective of creative storytellers and clients.
        </p>
      </div>

      {/* Role Selection Grid */}
      <div className="space-y-2">
        <label className="block text-xs uppercase tracking-wider text-[#A39E93] font-medium">
          I am joining as:
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
                className={`p-3 rounded border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#171717] border-[#C5A059] text-[#FBF9F5]'
                    : 'bg-[#111111] border-[#262626] text-[#A39E93] hover:border-[#6B665E]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#C5A059]' : 'text-[#A39E93]'}`} />
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#C5A059]" />}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#FBF9F5]">{opt.label}</h4>
                  <p className="text-[10px] text-[#A39E93] mt-0.5">{opt.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="block text-xs uppercase tracking-wider text-[#A39E93] font-medium mb-1">
            Full Name or Studio Alias
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-[#A39E93] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              placeholder="e.g. Arjun Mehta"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full pl-9 pr-3 py-2 rounded bg-[#111111] border border-[#262626] text-xs text-[#FBF9F5] placeholder-[#6B665E] focus:outline-none focus:border-[#C5A059]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#A39E93] font-medium mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#A39E93] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-9 pr-3 py-2 rounded bg-[#111111] border border-[#262626] text-xs text-[#FBF9F5] placeholder-[#6B665E] focus:outline-none focus:border-[#C5A059]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#A39E93] font-medium mb-1">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-[#A39E93] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full pl-9 pr-3 py-2 rounded bg-[#111111] border border-[#262626] text-xs text-[#FBF9F5] placeholder-[#6B665E] focus:outline-none focus:border-[#C5A059]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#A39E93] font-medium mb-1">
            Password (min 6 chars)
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-[#A39E93] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-9 pr-3 py-2 rounded bg-[#111111] border border-[#262626] text-xs text-[#FBF9F5] placeholder-[#6B665E] focus:outline-none focus:border-[#C5A059]"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded gold-btn text-xs uppercase tracking-wider font-semibold shadow-lg mt-2"
        >
          {isLoading ? 'Creating Account...' : `Register as ${ROLE_LABELS[role]}`}
        </button>
      </form>

      <p className="text-xs text-[#A39E93] text-center pt-1">
        Already have an account?{' '}
        <Link to="/login" className="text-[#DFCA9B] hover:underline font-semibold">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
