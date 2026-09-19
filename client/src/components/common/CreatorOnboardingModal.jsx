import React, { useState } from 'react';
import {
  X,
  Camera,
  Video,
  Film,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  UploadCloud,
  Sparkles,
  MapPin,
  Star,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { ROLES } from '../../constants/roles';
import { useToast } from '../../hooks/useToast';

const stepsList = [
  '01 Personal Details',
  '02 Services',
  '03 Portfolio',
  '04 Pricing',
  '05 Availability',
  '06 Preview',
  '07 Publish',
];

const CreatorOnboardingModal = ({ isOpen, onClose }) => {
  const { success } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: 'Arjun Mehta',
    email: 'arjun.mehta@example.com',
    phone: '+91 98260 12345',
    role: ROLES.PHOTOGRAPHER,
    city: 'Indore, Madhya Pradesh',
    experienceYears: '6',
    startingPrice: '25000',
    tagline: 'Wedding & Editorial Fine Art Photographer',
    specialties: 'Royal Weddings, Cinematic Pre-Wedding, Drone Stills',
    equipment: 'Sony A1, 24-70mm GM II, 70-200mm GM, DJI Mavic 3 Pro',
    bio: 'Preserving emotional human moments with cinematic lighting and timeless film tones.',
    uploadedImages: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    ],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 7) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handlePublish = (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      success('Creator profile published to Lenscraft directory!');
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#080808]/90 backdrop-blur-xl p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#111111] border border-[#262626] rounded shadow-2xl overflow-hidden my-6 text-left animate-reveal">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#262626] bg-[#171717] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest text-[#C5A059] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Creator Onboarding & Accreditation</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-[#FBF9F5]">
              Join the Lenscraft Roster
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-[#222222] text-[#A39E93] hover:text-[#FBF9F5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="bg-[#111111] border-b border-[#262626] px-5 py-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-[620px]">
            {stepsList.map((label, idx) => {
              const num = idx + 1;
              return (
                <div key={num} className="flex-1 flex items-center gap-1.5">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all ${
                      step >= num
                        ? 'bg-[#C5A059] text-[#080808]'
                        : 'bg-[#171717] border border-[#262626] text-[#A39E93]'
                    }`}
                  >
                    {step > num ? '✓' : num}
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-wider font-medium whitespace-nowrap ${
                      step === num ? 'text-[#DFCA9B] font-semibold' : 'text-[#6B665E]'
                    }`}
                  >
                    {label}
                  </span>
                  {num < 7 && <div className="flex-1 h-px bg-[#262626]" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Form Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* STEP 1: PERSONAL DETAILS */}
          {step === 1 && (
            <div className="space-y-4 animate-reveal">
              <h3 className="text-base font-cinzel text-[#FBF9F5]">01. Personal & Studio Identity</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-[#A39E93] block mb-1 font-medium">Full Name / Brand Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 rounded bg-[#171717] border border-[#262626] text-[#FBF9F5] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="text-[#A39E93] block mb-1 font-medium">Official Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 rounded bg-[#171717] border border-[#262626] text-[#FBF9F5] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="text-[#A39E93] block mb-1 font-medium">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 rounded bg-[#171717] border border-[#262626] text-[#FBF9F5] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="text-[#A39E93] block mb-1 font-medium">Primary Base City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full p-2.5 rounded bg-[#171717] border border-[#262626] text-[#FBF9F5] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SERVICES */}
          {step === 2 && (
            <div className="space-y-4 animate-reveal">
              <h3 className="text-base font-cinzel text-[#FBF9F5]">02. Primary Discipline & Specialties</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { role: ROLES.PHOTOGRAPHER, icon: Camera, label: 'Photographer' },
                  { role: ROLES.VIDEOGRAPHER, icon: Video, label: 'Videographer / DP' },
                  { role: ROLES.EDITOR, icon: Film, label: 'Video / Photo Editor' },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = formData.role === item.role;
                  return (
                    <button
                      key={item.role}
                      type="button"
                      onClick={() => setFormData({ ...formData, role: item.role })}
                      className={`p-4 rounded border flex flex-col items-center gap-2 text-center transition-all ${
                        isSelected
                          ? 'border-[#C5A059] bg-[#171717] text-[#DFCA9B]'
                          : 'border-[#262626] bg-[#111111] text-[#A39E93] hover:border-[#6B665E]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs font-semibold">{item.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="text-xs space-y-1">
                <label className="text-[#A39E93] block font-medium">Specialties (comma separated)</label>
                <input
                  type="text"
                  value={formData.specialties}
                  onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
                  className="w-full p-2.5 rounded bg-[#171717] border border-[#262626] text-[#FBF9F5] focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>
          )}

          {/* STEP 3: PORTFOLIO (Drag/Drop UI) */}
          {step === 3 && (
            <div className="space-y-4 animate-reveal">
              <h3 className="text-base font-cinzel text-[#FBF9F5]">03. Upload Portfolio Works</h3>
              <div className="p-8 border-2 border-dashed border-[#262626] hover:border-[#C5A059] rounded bg-[#171717] text-center space-y-2 cursor-pointer transition-colors">
                <UploadCloud className="w-8 h-8 text-[#C5A059] mx-auto" />
                <p className="text-xs font-semibold text-[#FBF9F5]">Drag and drop high-res JPEG/PNG images here</p>
                <p className="text-[11px] text-[#A39E93]">Or browse files up to 25MB each (Minimum 3 images)</p>
              </div>

              {/* Uploaded Thumbnails Preview */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {formData.uploadedImages.map((img, i) => (
                  <div key={i} className="aspect-[4/3] rounded overflow-hidden border border-[#262626] relative">
                    <img src={img} alt="Portfolio sample" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: PRICING */}
          {step === 4 && (
            <div className="space-y-4 animate-reveal">
              <h3 className="text-base font-cinzel text-[#FBF9F5]">04. Pricing & Rates</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-[#A39E93] block mb-1 font-medium">Starting Baseline Shoot Rate (₹)</label>
                  <input
                    type="number"
                    value={formData.startingPrice}
                    onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                    className="w-full p-2.5 rounded bg-[#171717] border border-[#262626] text-[#FBF9F5] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="text-[#A39E93] block mb-1 font-medium">Years of Professional Experience</label>
                  <input
                    type="number"
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                    className="w-full p-2.5 rounded bg-[#171717] border border-[#262626] text-[#FBF9F5] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: AVAILABILITY */}
          {step === 5 && (
            <div className="space-y-4 animate-reveal">
              <h3 className="text-base font-cinzel text-[#FBF9F5]">05. Availability & Travel Policy</h3>
              <div className="p-4 bg-[#171717] border border-[#262626] rounded space-y-3 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-[#EAE6DF]">
                  <input type="checkbox" defaultChecked className="accent-[#C5A059]" />
                  <span>Available for Destination Shoots across India</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-[#EAE6DF]">
                  <input type="checkbox" defaultChecked className="accent-[#C5A059]" />
                  <span>Instant Date Escrow Booking Enabled</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-[#EAE6DF]">
                  <input type="checkbox" defaultChecked className="accent-[#C5A059]" />
                  <span>Accepts Multi-Day Royal Wedding Projects</span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 6: PREVIEW */}
          {step === 6 && (
            <div className="space-y-4 animate-reveal">
              <h3 className="text-base font-cinzel text-[#FBF9F5]">06. Profile Preview</h3>
              <div className="p-6 bg-[#171717] border border-[#262626] rounded space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#111111] border border-[#C5A059] flex items-center justify-center font-bold text-lg text-[#DFCA9B]">
                    {formData.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-lg font-cinzel font-bold text-[#FBF9F5]">{formData.name}</h4>
                    <p className="text-xs text-[#C5A059]">{formData.tagline}</p>
                    <p className="text-xs text-[#A39E93]">{formData.city} · ₹{Number(formData.startingPrice).toLocaleString('en-IN')} onwards</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: PUBLISH */}
          {step === 7 && (
            <div className="space-y-4 text-center py-6 animate-reveal">
              <div className="w-12 h-12 rounded-full bg-[#171717] border border-[#C5A059] text-[#C5A059] flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-cinzel font-bold text-[#FBF9F5]">Ready to Publish Your Profile!</h3>
              <p className="text-xs text-[#A39E93] max-w-sm mx-auto">
                Once published, your studio profile will be visible to thousands of couples and brands on Lenscraft.
              </p>
            </div>
          )}
        </div>

        {/* Stepper Footer Controls */}
        <div className="p-5 border-t border-[#262626] bg-[#171717] flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="px-4 py-2 rounded btn-secondary-luxury text-xs font-semibold flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : <div />}

          {step < 7 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 rounded gold-btn text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePublish}
              disabled={isSubmitting}
              className="px-8 py-2.5 rounded gold-btn text-xs uppercase tracking-wider font-semibold"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Creator Profile'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatorOnboardingModal;
