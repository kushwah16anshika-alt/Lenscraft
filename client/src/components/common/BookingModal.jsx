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
  { num: 4, label: '04 Requirements' },
  { num: 5, label: '05 Review' },
  { num: 6, label: '06 Payment' },
];

const timelineStages = [
  { name: 'Booking Confirmed', desc: 'Instant 25% escrow lock', active: true },
  { name: 'Creator Accepted', desc: 'Direct chat & moodboard', active: false },
  { name: 'Upcoming', desc: 'Gear prep & shoot schedule', active: false },
  { name: 'Completed', desc: 'The shoot execution', active: false },
  { name: 'Review', desc: 'Master delivery & escrow release', active: false },
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#080808]/90 backdrop-blur-xl p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#111111] border border-[#262626] rounded shadow-2xl overflow-hidden my-6 text-left animate-reveal">
        {/* Header with Title & Stepper */}
        <div className="p-5 sm:p-6 border-b border-[#262626] bg-[#171717] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest text-[#C5A059] mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Certified Escrow Booking Flow</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-[#FBF9F5]">
              Reserve Session with {professional.name}
            </h2>
          </div>
          <button
            onClick={handleCloseAll}
            className="p-2 rounded hover:bg-[#222222] text-[#A39E93] hover:text-[#FBF9F5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Step Indicator (If not yet confirmed) */}
        {!isConfirmed && (
          <div className="bg-[#111111] border-b border-[#262626] px-5 py-3 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-3 min-w-[550px]">
              {bookingSteps.map((s) => (
                <div key={s.num} className="flex-1 flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all ${
                      step >= s.num
                        ? 'bg-[#C5A059] text-[#080808]'
                        : 'bg-[#171717] border border-[#262626] text-[#A39E93]'
                    }`}
                  >
                    {step > s.num ? '✓' : s.num}
                  </div>
                  <span
                    className={`text-xs uppercase tracking-wider font-medium ${
                      step === s.num ? 'text-[#DFCA9B]' : 'text-[#6B665E]'
                    }`}
                  >
                    {s.label}
                  </span>
                  {s.num < 6 && <div className="flex-1 h-px bg-[#262626]" />}
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
          <div className="p-6 sm:p-10 space-y-8 text-center animate-reveal">
            <div className="w-14 h-14 rounded-full bg-[#171717] border border-[#C5A059] text-[#C5A059] flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-mono tracking-widest text-[#C5A059]">
                Booking Reference: {confirmedBookingData?.id}
              </span>
              <h3 className="text-2xl sm:text-4xl font-cinzel font-bold text-[#FBF9F5]">
                BOOKING CONFIRMED ✓
              </h3>
              <p className="text-xs sm:text-sm text-[#A39E93] max-w-md mx-auto">
                Your reservation is locked with escrow security. The creator has been notified and will open direct production chat.
              </p>
            </div>

            {/* Confirmed Details Grid */}
            <div className="max-w-xl mx-auto bg-[#171717] border border-[#262626] p-6 rounded grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
              <div>
                <span className="text-[10px] uppercase text-[#A39E93]">Service</span>
                <p className="text-xs font-semibold text-[#FBF9F5] mt-0.5">{confirmedBookingData?.service}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#A39E93]">Date & Time</span>
                <p className="text-xs font-semibold text-[#FBF9F5] mt-0.5">{confirmedBookingData?.date}</p>
                <p className="text-[10px] text-[#A39E93]">{confirmedBookingData?.time}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#A39E93]">Creator</span>
                <p className="text-xs font-semibold text-[#DFCA9B] mt-0.5">{confirmedBookingData?.creatorName}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#A39E93]">Package Tier</span>
                <p className="text-xs font-semibold text-[#FBF9F5] mt-0.5">{confirmedBookingData?.package}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#A39E93]">Total Value</span>
                <p className="text-xs font-mono font-bold text-[#FBF9F5] mt-0.5">₹{confirmedBookingData?.totalAmount?.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#A39E93]">Advance Paid</span>
                <p className="text-xs font-mono font-bold text-[#C5A059] mt-0.5">₹{confirmedBookingData?.advancePaid?.toLocaleString('en-IN')}</p>
              </div>
            </div>

            {/* Workflow Timeline */}
            <div className="max-w-xl mx-auto pt-4 space-y-3 text-left">
              <span className="text-xs uppercase tracking-wider text-[#A39E93] font-semibold block text-center">
                Production Progress Timeline
              </span>
              <div className="grid grid-cols-5 gap-2 text-center">
                {timelineStages.map((stg, sIdx) => (
                  <div key={sIdx} className="space-y-1">
                    <div className={`w-5 h-5 mx-auto rounded-full text-[10px] flex items-center justify-center font-bold ${
                      sIdx === 0 ? 'bg-[#C5A059] text-black' : 'bg-[#171717] border border-[#262626] text-[#6B665E]'
                    }`}>
                      {sIdx + 1}
                    </div>
                    <p className="text-[10px] font-semibold text-[#FBF9F5] truncate">{stg.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleCloseAll}
                className="px-8 py-3 rounded gold-btn text-xs uppercase tracking-wider font-semibold"
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
                <div className="space-y-4 animate-reveal">
                  <h3 className="text-base font-cinzel text-[#FBF9F5]">01. Select Service Category</h3>
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
                        className={`p-4 rounded border cursor-pointer transition-all flex items-center justify-between ${
                          serviceType === srv
                            ? 'bg-[#171717] border-[#C5A059] text-[#DFCA9B]'
                            : 'bg-[#111111] border-[#262626] text-[#EAE6DF] hover:border-[#6B665E]'
                        }`}
                      >
                        <span className="text-xs font-semibold">{srv}</span>
                        {serviceType === srv && <Check className="w-4 h-4 text-[#C5A059]" />}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: DATE */}
              {step === 2 && (
                <div className="space-y-4 animate-reveal">
                  <h3 className="text-base font-cinzel text-[#FBF9F5]">02. Choose Date & Event Location</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#A39E93] block mb-1.5 font-medium">
                        Shoot / Event Date
                      </label>
                      <input
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full p-3 rounded bg-[#171717] border border-[#262626] text-xs text-[#FBF9F5] focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#A39E93] block mb-1.5 font-medium">
                        Coverage Hours & Timing
                      </label>
                      <select
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                        className="w-full p-3 rounded bg-[#171717] border border-[#262626] text-xs text-[#FBF9F5] focus:outline-none focus:border-[#C5A059]"
                      >
                        <option value="09:00 AM – 01:00 PM">Morning Half-Day (09:00 AM – 01:00 PM)</option>
                        <option value="02:00 PM – 06:00 PM">Evening Half-Day (02:00 PM – 06:00 PM)</option>
                        <option value="10:00 AM – 06:00 PM">Full Day Coverage (10:00 AM – 06:00 PM)</option>
                        <option value="Multi-Day Royal Schedule">Multi-Day Destination Schedule</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#A39E93] block mb-1.5 font-medium">
                        Event Venue / City
                      </label>
                      <input
                        type="text"
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        placeholder="e.g. The Leela Palace, Udaipur"
                        className="w-full p-3 rounded bg-[#171717] border border-[#262626] text-xs text-[#FBF9F5] focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: PACKAGE */}
              {step === 3 && (
                <div className="space-y-4 animate-reveal">
                  <h3 className="text-base font-cinzel text-[#FBF9F5]">03. Select Production Package</h3>
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
                        className={`p-4 rounded border cursor-pointer transition-all ${
                          packageTier === pkg.tier
                            ? 'bg-[#171717] border-[#C5A059]'
                            : 'bg-[#111111] border-[#262626] hover:border-[#6B665E]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-cinzel font-bold text-[#FBF9F5]">{pkg.tier}</h4>
                          <span className="text-sm font-mono font-bold text-[#DFCA9B]">₹{pkg.price.toLocaleString('en-IN')}</span>
                        </div>
                        <p className="text-xs text-[#A39E93] mt-1">{pkg.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: REQUIREMENTS */}
              {step === 4 && (
                <div className="space-y-4 animate-reveal">
                  <h3 className="text-base font-cinzel text-[#FBF9F5]">04. Special Instructions & Moodboard</h3>
                  <div className="space-y-3">
                    <p className="text-xs text-[#A39E93]">
                      Describe key rituals, shot wishlist, family members, or mood reference links.
                    </p>
                    <textarea
                      rows={5}
                      value={clientRequirements}
                      onChange={(e) => setClientRequirements(e.target.value)}
                      placeholder="e.g. We love candid warm lighting, golden hour couple portraits, and cinematic slow-motion entries..."
                      className="w-full p-3 rounded bg-[#171717] border border-[#262626] text-xs text-[#FBF9F5] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>
              )}

              {/* STEP 5: REVIEW */}
              {step === 5 && (
                <div className="space-y-4 animate-reveal">
                  <h3 className="text-base font-cinzel text-[#FBF9F5]">05. Review Booking Specification</h3>
                  <div className="p-4 bg-[#171717] border border-[#262626] rounded space-y-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#A39E93]">Creator:</span>
                      <span className="text-[#FBF9F5] font-semibold">{professional.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A39E93]">Service:</span>
                      <span className="text-[#FBF9F5] font-semibold">{serviceType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A39E93]">Date & Hours:</span>
                      <span className="text-[#FBF9F5]">{eventDate} ({eventTime})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A39E93]">Location:</span>
                      <span className="text-[#FBF9F5]">{eventLocation}</span>
                    </div>
                    <div className="flex justify-between border-t border-[#262626] pt-2">
                      <span className="text-[#A39E93]">Selected Package:</span>
                      <span className="text-[#DFCA9B] font-semibold">{packageTier}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: PAYMENT */}
              {step === 6 && (
                <div className="space-y-4 animate-reveal">
                  <h3 className="text-base font-cinzel text-[#FBF9F5]">06. Secure Advance Escrow Deposit</h3>
                  <p className="text-xs text-[#A39E93]">
                    Your 25% deposit (₹{advanceDeposit.toLocaleString('en-IN')}) remains safeguarded in escrow until master delivery.
                  </p>

                  <div className="space-y-2.5">
                    {[
                      { id: 'card', name: 'Credit / Debit Card (Visa, Mastercard, Amex)' },
                      { id: 'upi', name: 'UPI / NetBanking / Razorpay' },
                    ].map((pm) => (
                      <div
                        key={pm.id}
                        onClick={() => setPaymentMethod(pm.id)}
                        className={`p-3 rounded border cursor-pointer flex items-center justify-between text-xs ${
                          paymentMethod === pm.id
                            ? 'bg-[#171717] border-[#C5A059] text-[#DFCA9B]'
                            : 'bg-[#111111] border-[#262626] text-[#A39E93]'
                        }`}
                      >
                        <span>{pm.name}</span>
                        {paymentMethod === pm.id && <Lock className="w-3.5 h-3.5 text-[#C5A059]" />}
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-[#171717] rounded border border-[#262626] text-[11px] text-[#A39E93] flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span>256-Bit SSL Encrypted Escrow Transaction</span>
                  </div>
                </div>
              )}

              {/* Stepper Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-[#262626]">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-4 py-2 rounded btn-secondary-luxury text-xs font-semibold flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>
                ) : <div />}

                {step < 6 ? (
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
                    onClick={handleCompleteBooking}
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded gold-btn text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 shadow-lg"
                  >
                    {isSubmitting ? 'Securing Escrow...' : `Pay ₹${advanceDeposit.toLocaleString('en-IN')} & Confirm`}
                  </button>
                )}
              </div>
            </div>

            {/* Right Sticky Summary (5/12) */}
            <div className="lg:col-span-5 bg-[#171717] border-t lg:border-t-0 lg:border-l border-[#262626] p-6 sm:p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059]">
                  BOOKING DETAILS SUMMARY
                </span>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#A39E93]">Service</span>
                    <span className="text-[#FBF9F5] font-semibold text-right max-w-[160px] truncate">{serviceType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A39E93]">Date</span>
                    <span className="text-[#FBF9F5] font-semibold">{eventDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A39E93]">Package</span>
                    <span className="text-[#DFCA9B] font-semibold">{packageTier}</span>
                  </div>
                </div>

                {/* Pricing breakdown */}
                <div className="pt-4 border-t border-[#262626] space-y-2 text-xs">
                  <div className="flex justify-between text-[#A39E93]">
                    <span>Package Total:</span>
                    <span className="font-mono text-[#FBF9F5]">₹{currentTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-[#DFCA9B] font-semibold">
                    <span>25% Advance Lock:</span>
                    <span className="font-mono">₹{advanceDeposit.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-[#6B665E]">
                    <span>Balance at Delivery:</span>
                    <span className="font-mono">₹{balanceDue.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#262626] text-[11px] text-[#A39E93] space-y-1">
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
