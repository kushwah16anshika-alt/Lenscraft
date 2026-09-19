import React, { useState } from 'react';
import {
  X,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Sparkles,
} from 'lucide-react';
import Button from './Button';
import Input from './Input';
import Textarea from './Textarea';
import { formatCurrency } from '../../utils/formatters';
import { usePlatform } from '../../hooks/usePlatform';

const BookingModal = ({ isOpen, onClose, professional, initialService, onBookingSuccess }) => {
  const { createBooking } = usePlatform();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(initialService || professional?.services?.[0] || null);
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('09:00 AM');
  const [eventCity, setEventCity] = useState(professional?.location?.city || 'Udaipur, Rajasthan');
  const [eventType, setEventType] = useState('Wedding Ceremony');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !professional) return null;

  const services = professional.services && professional.services.length > 0
    ? professional.services
    : [
        {
          id: 'srv-default',
          title: 'Signature Shoot Session',
          price: professional.startingPrice || 25000,
          description: 'Full day creative direction, multi-camera shoot setup, high-res color grading.',
          deliveryDays: 10,
          inclusions: ['Full Day Coverage', 'High-Res Stills', 'Teaser in 48 Hours', '100% Escrow Protection'],
        },
      ];

  const currentService = selectedService || services[0];
  const totalAmount = currentService.price;
  const advanceEscrowDeposit = Math.round(totalAmount * 0.3);

  const handleNext = () => {
    if (step === 1 && !currentService) return;
    if (step === 2 && !eventDate) return;
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);

      const newBooking = createBooking({
        professional,
        service: currentService,
        eventDate,
        eventTime,
        eventCity,
        eventType,
        totalAmount,
        advanceEscrowDeposit,
        notes,
      });

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onBookingSuccess && onBookingSuccess(newBooking);
        onClose();
      }, 1200);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#060b19] rounded-3xl border border-sky-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden my-8 text-left animate-reveal">
        {/* Header with Progress Steps */}
        <div className="p-6 sm:p-8 border-b border-white/10 bg-gradient-to-r from-slate-950 via-[#0a1435] to-slate-950">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sky-950 border border-sky-500/30 text-sky-400 text-[10px] font-mono uppercase tracking-widest mb-1">
                <ShieldCheck className="w-3 h-3" />
                <span>100% ESCROW PROTECTED RESERVATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white">
                Book with {professional.name}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Indicator */}
          <div className="flex items-center gap-2">
            {[
              { num: 1, label: 'Service' },
              { num: 2, label: 'Date & Time' },
              { num: 3, label: 'Details' },
              { num: 4, label: 'Summary' },
            ].map((s) => (
              <div key={s.num} className="flex-1 flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                    step >= s.num
                      ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-[0_0_12px_rgba(56,189,248,0.6)]'
                      : 'bg-slate-900 border border-white/10 text-slate-500'
                  }`}
                >
                  {step > s.num ? '✓' : s.num}
                </div>
                <span className="hidden sm:inline text-xs font-medium text-slate-300">
                  {s.label}
                </span>
                {s.num < 4 && <div className="flex-1 h-px bg-white/10" />}
              </div>
            ))}
          </div>
        </div>

        {/* Step Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* STEP 1: Select Service Package */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                1. Select Desired Creative Package
              </h3>
              <div className="space-y-3">
                {services.map((srv) => {
                  const isSelected = currentService?.id === srv.id;
                  return (
                    <div
                      key={srv.id}
                      onClick={() => setSelectedService(srv)}
                      className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-sky-400 bg-sky-950/70 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                          : 'border-white/10 hover:border-sky-500/40 bg-slate-900/60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-sm sm:text-base font-display font-bold text-white">
                            {srv.title}
                          </h4>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                            {srv.description}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-base sm:text-lg font-mono font-bold text-sky-300">
                            {formatCurrency(srv.price)}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 block">
                            {srv.deliveryDays}d delivery
                          </span>
                        </div>
                      </div>

                      {srv.inclusions && srv.inclusions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/10">
                          {srv.inclusions.map((inc, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-950 border border-sky-500/20 text-slate-300"
                            >
                              ✓ {inc}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Date & Time */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                2. Choose Shoot Date & Timing
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                    Event / Shoot Date
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-sky-500/30 text-xs text-white focus:outline-none focus:border-sky-400"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Creator availability will be locked on confirmation.</p>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                    Start Time / Call Sheet
                  </label>
                  <select
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-sky-500/30 text-xs text-white focus:outline-none focus:border-sky-400"
                  >
                    <option value="06:00 AM">06:00 AM (Sunrise Golden Hour)</option>
                    <option value="09:00 AM">09:00 AM (Morning Session)</option>
                    <option value="02:00 PM">02:00 PM (Afternoon Production)</option>
                    <option value="05:30 PM">05:30 PM (Sunset / Evening Reception)</option>
                    <option value="Full Day">Full Day (10–12 Hours Comprehensive)</option>
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-sky-500/20 flex items-center gap-3 text-xs text-slate-300">
                <Clock className="w-5 h-5 text-sky-400 shrink-0" />
                <span>Standard studio guarantee: 48h early preview teaser delivery included.</span>
              </div>
            </div>
          )}

          {/* STEP 3: Event Details */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                3. Event Location & Creative Brief
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                    Shoot Location / City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Udaipur, Rajasthan / Studio Mumbai"
                    value={eventCity}
                    onChange={(e) => setEventCity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-sky-500/30 text-xs text-white focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                    Occasion / Category
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-sky-500/30 text-xs text-white focus:outline-none focus:border-sky-400"
                  >
                    <option value="Wedding Ceremony">Royal / Traditional Wedding</option>
                    <option value="Pre-Wedding Shoot">Cinematic Pre-Wedding</option>
                    <option value="Commercial Ad">Commercial Brand / Product</option>
                    <option value="Fashion Lookbook">Fashion Editorial</option>
                    <option value="Short Video Retainer">Reels / Social Retainer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                  Shot List & Special Vision (Optional)
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Mention specific lighting styles, key family portraits, mood boards, or venue constraints..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-sky-500/30 text-xs text-white focus:outline-none focus:border-sky-400"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Summary & Escrow Breakdown */}
          {step === 4 && (
            <div className="space-y-5">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                4. Review & Confirm Escrow Booking
              </h3>

              <div className="p-5 rounded-2xl bg-slate-900/90 border border-sky-500/30 space-y-4">
                <div className="flex items-start justify-between pb-3 border-b border-white/10">
                  <div>
                    <h4 className="text-sm sm:text-base font-display font-bold text-white">
                      {currentService.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Creator: <strong className="text-white">{professional.name}</strong> ({professional.role})
                    </p>
                  </div>
                  <span className="text-lg font-mono font-bold text-sky-300">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs text-slate-300">
                  <div>
                    <span className="text-[10px] font-mono uppercase font-semibold text-slate-400 block">
                      Date & Time
                    </span>
                    <span className="font-bold text-white">{eventDate || 'Date not selected'}, {eventTime}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase font-semibold text-slate-400 block">
                      Location
                    </span>
                    <span className="font-bold text-white">{eventCity || 'Not specified'}</span>
                  </div>
                </div>
              </div>

              {/* Escrow Guarantee Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0a1838] to-[#060b19] border border-sky-400/40 text-white space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-300">
                  <ShieldCheck className="w-4 h-4 text-sky-400" />
                  <span>LensCraft 100% Escrow Protection Active</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Your advance deposit ({formatCurrency(advanceEscrowDeposit)}) remains securely held in escrow and is only released to the creator once deliverables are uploaded and approved by you.
                </p>
              </div>

              {isSuccess && (
                <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center">
                  ✓ Booking Confirmed & Secured in Escrow!
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 sm:p-8 border-t border-white/10 bg-slate-950/80 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="px-5 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={step === 2 && !eventDate}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs shadow-[0_0_20px_rgba(56,189,248,0.4)] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <span>Continue to Step {step + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isSubmitting || isSuccess}
              onClick={handleConfirm}
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs shadow-[0_0_25px_rgba(0,210,255,0.6)] flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Securing Escrow...' : 'Confirm & Lock Escrow'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;

