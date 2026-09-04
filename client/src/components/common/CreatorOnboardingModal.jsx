import React, { useState } from 'react';
import {
  X,
  Camera,
  Video,
  Film,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  MapPin,
  DollarSign,
  ShieldCheck,
  Award,
} from 'lucide-react';
import Button from './Button';
import Input from './Input';
import Textarea from './Textarea';
import { ROLES, ROLE_LABELS } from '../../constants/roles';
import { useToast } from '../../hooks/useToast';

const CreatorOnboardingModal = ({ isOpen, onClose }) => {
  const { success } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    role: ROLES.PHOTOGRAPHER,
    city: 'Mumbai',
    experienceYears: '5',
    startingPrice: '25000',
    tagline: 'Fine Art Wedding & Editorial Portrait Photographer',
    specialties: 'Weddings, Pre-Wedding, Drone Cinema',
    equipment: 'Sony A7R V, 24-70mm GM, DJI Mavic 3 Pro',
    bio: 'Over 5 years capturing cinematic moments with master color grading and storytelling.',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      success('Creator application submitted! Our editorial board will review within 24 hours.');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-lg border border-[#E8E2D8] shadow-2xl overflow-hidden my-8 text-left animate-reveal">
        {/* Header */}
        <div className="p-6 border-b border-[#E8E2D8] bg-[#FAF8F5] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C4683C] block">
              Creator Studio Accreditation
            </span>
            <h2 className="text-xl font-serif font-bold text-[#121212]">
              Join the LensCraft Creator Roster
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#EAE4DC] text-[#6B6258] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[68vh] overflow-y-auto">
          {/* Step 1: Discipline & Bio */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#121212]">
                1. Select Your Primary Creative Discipline
              </h3>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { role: ROLES.PHOTOGRAPHER, icon: Camera, label: 'Photographer' },
                  { role: ROLES.VIDEOGRAPHER, icon: Video, label: 'Videographer / DP' },
                  { role: ROLES.EDITOR, icon: Film, label: 'Video Editor' },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = formData.role === item.role;
                  return (
                    <button
                      key={item.role}
                      type="button"
                      onClick={() => setFormData({ ...formData, role: item.role })}
                      className={`p-4 rounded-md border flex flex-col items-center gap-2 text-center transition-all ${
                        isSelected
                          ? 'border-[#121212] bg-[#FAF8F5] ring-1 ring-[#121212] font-bold text-[#121212]'
                          : 'border-[#E8E2D8] bg-white text-[#6B6258] hover:border-[#121212]/50'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-[#C4683C]' : 'text-[#8C8276]'}`} />
                      <span className="text-xs">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <Input
                label="Full Name or Studio Brand Name"
                required
                placeholder="e.g. Aarav Mehta Studios"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />

              <Input
                label="Editorial Tagline"
                required
                placeholder="e.g. Fine Art Wedding & High-Fashion Portraiture"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              />
            </div>
          )}

          {/* Step 2: Experience, Rates & Gear */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#121212]">
                2. Rates, Base City & Primary Camera Kit
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Base City / State"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
                <Input
                  label="Years of Experience"
                  type="number"
                  required
                  value={formData.experienceYears}
                  onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                />
                <Input
                  label="Starting Day Rate (₹)"
                  type="number"
                  required
                  value={formData.startingPrice}
                  onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                />
              </div>

              <Input
                label="Specialties / Genres (Comma-separated)"
                placeholder="e.g. Royal Weddings, Pre-Wedding, Drone Cinema, Commercial"
                value={formData.specialties}
                onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
              />

              <Input
                label="Verified Camera & Lens Kit"
                placeholder="e.g. Sony A7R V, 24-70mm f/2.8 GM II, DJI Mavic 3 Pro"
                value={formData.equipment}
                onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
              />

              <Textarea
                label="Studio Biography & Achievements"
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="p-6 border-t border-[#E8E2D8] bg-[#FAF8F5] flex items-center justify-between">
          {step === 2 ? (
            <Button
              variant="outline"
              size="md"
              onClick={() => setStep(1)}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back
            </Button>
          ) : (
            <div />
          )}

          {step === 1 ? (
            <Button
              variant="primary"
              size="md"
              onClick={() => setStep(2)}
              disabled={!formData.name}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Continue to Gear & Rates
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              loading={isSubmitting}
              onClick={handleSubmit}
              rightIcon={<CheckCircle2 className="w-4 h-4" />}
            >
              Submit Studio Application
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatorOnboardingModal;
