import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, ArrowRight, Camera, Video, Film, Users } from 'lucide-react';
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
    { key: ROLES.USER, label: 'Client / Customer', icon: Users, desc: 'Hire top creative talent' },
    { key: ROLES.PHOTOGRAPHER, label: 'Photographer', icon: Camera, desc: 'Showcase photos & book shoots' },
    { key: ROLES.VIDEOGRAPHER, label: 'Videographer', icon: Video, desc: 'Cinematography & video' },
    { key: ROLES.EDITOR, label: 'Video Editor', icon: Film, desc: 'Post-production & color' },
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
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
          Create your account
        </h2>
        <p className="text-sm text-zinc-500 mt-1.5">
          Select your role to get started on the LensCraft creative platform.
        </p>
      </div>

      {/* Role Selection Grid */}
      <div className="space-y-2">
        <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
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
                className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-zinc-900 border-zinc-900 text-white shadow-sm ring-1 ring-zinc-900'
                    : 'bg-white border-zinc-200 text-zinc-900 hover:border-zinc-300 hover:bg-zinc-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-zinc-200' : 'text-zinc-500'}`} />
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-semibold leading-tight">{opt.label}</h4>
                  <p className={`text-[11px] mt-0.5 ${isSelected ? 'text-zinc-400' : 'text-zinc-500'}`}>
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
          label="Full Name"
          required
          placeholder="Enter your full name"
          leftIcon={<User className="w-4 h-4 text-zinc-400" />}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <Input
          label="Email Address"
          type="email"
          required
          placeholder="your.email@example.com"
          leftIcon={<Mail className="w-4 h-4 text-zinc-400" />}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="+91 98765 43210"
          leftIcon={<Phone className="w-4 h-4 text-zinc-400" />}
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />

        <Input
          label="Password (min. 6 characters)"
          type="password"
          required
          minLength={6}
          placeholder="••••••••"
          leftIcon={<Lock className="w-4 h-4 text-zinc-400" />}
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isLoading}
          className="w-full justify-center group"
          rightIcon={<ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
        >
          Create {ROLE_LABELS[role]} Account
        </Button>
      </form>

      <p className="text-xs text-zinc-500 text-center">
        Already have an account?{' '}
        <Link to="/login" className="text-zinc-900 font-semibold hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
