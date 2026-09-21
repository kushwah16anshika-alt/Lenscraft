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
  MapPin,
  Check,
  CreditCard,
  Lock,
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { usePlatform } from '../../context/PlatformContext';

const bookingSteps = [
  { num: 1, label: '01 Service' },
  { num: 2, label: '02 Date' },
  { num: 3, label: '03 Package' },
  { num: 4, label: '04 Notes' },
  { num: 5, label: '05 Review' },
  { num: 6, label: '06 Payment' },
];

const timelineStages = [
  { name: 'Escrow Locked', desc: 'Instant 25% escrow guarantee', active: true },
  { name: 'Studio Accepted', desc: 'Direct production chat', active: false },
  { name: 'Pre-Production', desc: 'Gear prep & moodboard', active: false },
  { name: 'Shoot Day', desc: 'On-location execution', active: false },
  { name: 'Master Delivery', desc: '4K raw & escrow release', active: false },
];

const BookingModal = ({ isOpen, onClose, professional, initialPackage = 'Signature', onBookingSuccess }) => {
  const { createBooking } = usePlatform();
  const [step, setStep] = useState(1);

  // Form State
  const [serviceType, setServiceType] = useState('Wedding Photography');
  const [eventDate, setEventDate] = useState('2026-10-12');
  const [eventTime, setEventTime] = useState('10:00 AM – 06:00 PM');
  const [eventLocation, setEventLocation] = useState('Indore, Madhya Pradesh');
  const [packageTier, setPackageTier] = useState(initialPackage || 'Signature');
  const [clientRequirements, setClientRequirements] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmedBookingData, setConfirmedBookingData] = useState(null);

  if (!isOpen || !professional) return null;

  const baseRate = professional.startingPrice || 15000;
  const packageRates = {
    Essential: baseRate,
    Signature: Math.round(baseRate * 1.8),
    Editorial: Math.round(baseRate * 3.0),
  };

  const currentTotal = packageRates[packageTier] || baseRate;
  const advanceDeposit = Math.round(currentTotal * 0.25);
  const balanceDue = currentTotal - advanceDeposit;

  const handleNext = () => {
    if (step < 6) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleCompleteBooking = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const bookingData = {
        id: `BK-${Date.now().toString().slice(-6)}`,
        professionalId: professional.id,
        creatorName: professional.name,
        service: serviceType,
        date: eventDate,
        time: eventTime,
        location: eventLocation,
        package: packageTier,
        totalAmount: currentTotal,
        advancePaid: advanceDeposit,
        balanceRemaining: balanceDue,
        status: 'Confirmed',
        requirements: clientRequirements,
      };

      createBooking(bookingData);
      setConfirmedBookingData(bookingData);
      setIsConfirmed(true);
      if (onBookingSuccess) onBookingSuccess(bookingData);
    }, 800);
  };

  const handleCloseAll = () => {
    setIsConfirmed(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#02040a]/85 backdrop-blur-2xl p-4 overflow-y-auto animate-fade-in text-left">
      <div className="relative w-full max-w-4xl bg-[#080e22]/95 border border-cyan-500/30 rounded-3xl shadow-2xl shadow-cyan-950/60 overflow-hidden my-6 text-left animate-slide-up backdrop-blur-2xl">
        {/* Header with Title & Stepper */}
        <div className="p-5 sm:p-6 border-b border-sky-500/20 bg-gradient-to-r from-sky-500/10 via-cyan-500/5 to-transparent flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest text-cyan-400 mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Certified Escrow Booking Flow</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
              Reserve Session with <span className="text-cyan-300">{professional.name}</span>
            </h2>
          </div>
          <button
            onClick={handleCloseAll}
            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Step Indicator (If not yet confirmed) */}
        {!isConfirmed && (
          <div className="bg-[#050a18] border-b border-sky-500/15 px-5 py-3.5 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-3 min-w-[550px]">
              {bookingSteps.map((s) => (
                <div key={s.num} className="flex-1 flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all ${
                      step >= s.num
                        ? 'bg-gradient-to-r from-sky-400 to-cyan-400 text-midnight-950 shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                        : 'bg-white/5 border border-white/10 text-slate-500'
                    }`}
                  >
                    {step > s.num ? '✓' : s.num}
                  </div>
                  <span
                    className={`text-xs uppercase tracking-wider font-medium ${
                      step === s.num ? 'text-cyan-300 font-semibold' : 'text-slate-500'
                    }`}
                  >
                    {s.label}
                  </span>
                  {s.num < 6 && <div className="flex-1 h-px bg-sky-500/15" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Body: Two-Column Layout (Left Form + Right Sticky Summary) */}
        {isConfirmed ? (
          /* ─────────────────────────────────────────────────────────────
             CONFIRMATION SCREEN (With Timeline)
             ───────────────────────────────────────────────────────────── */
          <div className="p-6 sm:p-10 space-y-8 text-center animate-slide-up">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(52,211,153,0.3)]">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-mono tracking-widest text-cyan-400">
                Booking Reference: {confirmedBookingData?.id}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-100">
                BOOKING CONFIRMED ✓
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                Your reservation is locked with escrow security. The creator has been notified and will open direct production chat.
              </p>
            </div>

            {/* Confirmed Details Grid */}
            <div className="max-w-xl mx-auto glass-card border border-sky-500/25 p-6 rounded-2xl grid grid-cols-2 sm:grid-cols-3 gap-4 text-left shadow-xl">
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-medium">Service</span>
                <p className="text-xs font-semibold text-slate-100 mt-0.5">{confirmedBookingData?.service}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-medium">Date & Time</span>
                <p className="text-xs font-semibold text-slate-100 mt-0.5">{confirmedBookingData?.date}</p>
                <p className="text-[10px] text-cyan-400/80">{confirmedBookingData?.time}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-medium">Creator</span>
                <p className="text-xs font-semibold text-cyan-300 mt-0.5">{confirmedBookingData?.creatorName}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-medium">Package Tier</span>
                <p className="text-xs font-semibold text-slate-100 mt-0.5">{confirmedBookingData?.package}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-medium">Total Value</span>
                <p className="text-xs font-mono font-bold text-slate-100 mt-0.5">₹{confirmedBookingData?.totalAmount?.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-medium">Advance Paid</span>
                <p className="text-xs font-mono font-bold text-cyan-300 mt-0.5">₹{confirmedBookingData?.advancePaid?.toLocaleString('en-IN')}</p>
              </div>
            </div>

            {/* Workflow Timeline */}
            <div className="max-w-xl mx-auto pt-2 space-y-3 text-left">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block text-center">
                Production Progress Timeline
              </span>
              <div className="grid grid-cols-5 gap-2 text-center">
                {timelineStages.map((stg, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <div className={`w-6 h-6 mx-auto rounded-full text-[10px] flex items-center justify-center font-bold transition-all ${
                      sIdx === 0
                        ? 'bg-cyan-400 text-midnight-950 shadow-[0_0_12px_rgba(6,182,212,0.5)]'
                        : 'bg-white/5 border border-white/10 text-slate-500'
                    }`}>
                      {sIdx + 1}
                    </div>
                    <p className="text-[10px] font-semibold text-slate-200 truncate">{stg.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleCloseAll}
                className="px-8 py-3 rounded-xl glow-btn-primary text-xs uppercase tracking-wider font-semibold"
              >
                Go to My Bookings
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Steps Content (7/12) */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* STEP 1: SERVICE */}
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-base font-bold text-slate-100">01. Select Service Category</h3>
                  <div className="space-y-2.5">
                    {[
                      'Wedding & Nuptials Photography',
                      'Pre-Wedding & Couple Story',
                      'Editorial Fashion & Lookbook',
                      'Cinematography & 4K Wedding Film',
                      'Commercial Product Campaign',
                    ].map((srv) => (
                      <div
                        key={srv}
                        onClick={() => setServiceType(srv)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                          serviceType === srv
                            ? 'glass-card border-cyan-400 bg-sky-500/15 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                            : 'glass-card border-sky-500/20 text-slate-200 hover:border-cyan-400/40 hover:bg-sky-500/5'
                        }`}
                      >
                        <span className="text-xs font-semibold">{srv}</span>
                        {serviceType === srv && <Check className="w-4 h-4 text-cyan-400" />}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: DATE */}
              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-base font-bold text-slate-100">02. Choose Date & Event Location</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-slate-400 block mb-1.5 font-medium">
                        Shoot / Event Date
                      </label>
                      <input
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full p-3 rounded-xl bg-white/[0.04] border border-sky-500/20 text-xs text-slate-100 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-slate-400 block mb-1.5 font-medium">
                        Coverage Hours & Timing
                      </label>
                      <select
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                        className="w-full p-3 rounded-xl bg-[#0a122c] border border-sky-500/20 text-xs text-slate-100 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all"
                      >
                        <option value="09:00 AM – 01:00 PM">Morning Half-Day (09:00 AM – 01:00 PM)</option>
                        <option value="02:00 PM – 06:00 PM">Evening Half-Day (02:00 PM – 06:00 PM)</option>
                        <option value="10:00 AM – 06:00 PM">Full Day Coverage (10:00 AM – 06:00 PM)</option>
                        <option value="Multi-Day Royal Schedule">Multi-Day Destination Schedule</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-slate-400 block mb-1.5 font-medium">
                        Event Venue / City
                      </label>
                      <input
                        type="text"
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        placeholder="e.g. The Leela Palace, Udaipur"
                        className="w-full p-3 rounded-xl bg-white/[0.04] border border-sky-500/20 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: PACKAGE */}
              {step === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-base font-bold text-slate-100">03. Select Production Package</h3>
                  <div className="space-y-3">
                    {[
                      {
                        tier: 'Essential',
                        price: packageRates.Essential,
                        desc: '4 Hours · 1 Photographer · 100 Edited Photos',
                      },
                      {
                        tier: 'Signature',
                        price: packageRates.Signature,
                        desc: '8 Hours · 2 Photographers · 300 Edited Photos · Hardbound Album',
                      },
                      {
                        tier: 'Editorial',
                        price: packageRates.Editorial,
                        desc: 'Full Day · 2 Photographers + 4K Videographer · Master Raw SSD',
                      },
                    ].map((pkg) => (
                      <div
                        key={pkg.tier}
                        onClick={() => setPackageTier(pkg.tier)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                          packageTier === pkg.tier
                            ? 'glass-card border-cyan-400 bg-sky-500/15 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                            : 'glass-card border-sky-500/20 hover:border-cyan-400/40 hover:bg-sky-500/5'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-100">{pkg.tier}</h4>
                          <span className="text-sm font-mono font-bold text-cyan-300">₹{pkg.price.toLocaleString('en-IN')}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{pkg.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: REQUIREMENTS */}
              {step === 4 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-base font-bold text-slate-100">04. Special Instructions & Moodboard</h3>
                  <div className="space-y-3">
                    <p className="text-xs text-slate-400">
                      Describe key rituals, shot wishlist, family members, or mood reference links.
                    </p>
                    <textarea
                      rows={5}
                      value={clientRequirements}
                      onChange={(e) => setClientRequirements(e.target.value)}
                      placeholder="e.g. We love candid warm lighting, golden hour couple portraits, and cinematic slow-motion entries..."
                      className="w-full p-3 rounded-2xl bg-white/[0.04] border border-sky-500/20 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all"
                    />
                  </div>
                </div>
              )}

              {/* STEP 5: REVIEW */}
              {step === 5 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-base font-bold text-slate-100">05. Review Booking Specification</h3>
                  <div className="p-4 glass-card border border-sky-500/20 rounded-2xl space-y-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Creator:</span>
                      <span className="text-slate-100 font-semibold">{professional.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Service:</span>
                      <span className="text-slate-100 font-semibold">{serviceType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Date & Hours:</span>
                      <span className="text-slate-100">{eventDate} ({eventTime})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Location:</span>
                      <span className="text-slate-100">{eventLocation}</span>
                    </div>
                    <div className="flex justify-between border-t border-sky-500/15 pt-2">
                      <span className="text-slate-400">Selected Package:</span>
                      <span className="text-cyan-300 font-semibold">{packageTier}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: PAYMENT */}
              {step === 6 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-base font-bold text-slate-100">06. Secure Advance Escrow Deposit</h3>
                  <p className="text-xs text-slate-400">
                    Your 25% deposit (<span className="text-cyan-300 font-mono font-bold">₹{advanceDeposit.toLocaleString('en-IN')}</span>) remains safeguarded in escrow until master delivery.
                  </p>

                  <div className="space-y-2.5">
                    {[
                      { id: 'card', name: 'Credit / Debit Card (Visa, Mastercard, Amex)' },
                      { id: 'upi', name: 'UPI / NetBanking / Razorpay' },
                    ].map((pm) => (
                      <div
                        key={pm.id}
                        onClick={() => setPaymentMethod(pm.id)}
                        className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between text-xs transition-all ${
                          paymentMethod === pm.id
                            ? 'glass-card border-cyan-400 bg-sky-500/15 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                            : 'glass-card border-sky-500/20 text-slate-300 hover:border-cyan-400/40'
                        }`}
                      >
                        <span>{pm.name}</span>
                        {paymentMethod === pm.id && <Lock className="w-3.5 h-3.5 text-cyan-400" />}
                      </div>
                    ))}
                  </div>

                  <div className="p-3.5 glass-card rounded-2xl border border-sky-500/20 text-[11px] text-slate-400 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>256-Bit SSL Encrypted Escrow Transaction</span>
                  </div>
                </div>
              )}

              {/* Stepper Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-sky-500/15">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-4 py-2 rounded-xl border border-sky-500/20 text-slate-300 hover:text-white hover:border-cyan-400/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>
                ) : <div />}

                {step < 6 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl glow-btn-primary text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleCompleteBooking}
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl glow-btn-primary text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 shadow-lg"
                  >
                    {isSubmitting ? 'Securing Escrow...' : `Pay ₹${advanceDeposit.toLocaleString('en-IN')} & Confirm`}
                  </button>
                )}
              </div>
            </div>

            {/* Right Sticky Summary (5/12) */}
            <div className="lg:col-span-5 bg-[#060c1e] border-t lg:border-t-0 lg:border-l border-sky-500/20 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400">
                  BOOKING DETAILS SUMMARY
                </span>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Service</span>
                    <span className="text-slate-100 font-semibold text-right max-w-[160px] truncate">{serviceType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Date</span>
                    <span className="text-slate-100 font-semibold">{eventDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Package</span>
                    <span className="text-cyan-300 font-semibold">{packageTier}</span>
                  </div>
                </div>

                {/* Pricing breakdown */}
                <div className="pt-4 border-t border-sky-500/15 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Package Total:</span>
                    <span className="font-mono text-slate-100">₹{currentTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-cyan-300 font-semibold">
                    <span>25% Advance Lock:</span>
                    <span className="font-mono">₹{advanceDeposit.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Balance at Delivery:</span>
                    <span className="font-mono">₹{balanceDue.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-sky-500/15 text-[11px] text-slate-400 space-y-1">
                <p>✓ Direct Creator Messaging Included</p>
                <p>✓ 100% Escrow Guarantee</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
