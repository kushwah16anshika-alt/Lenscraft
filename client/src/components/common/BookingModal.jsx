import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  FileText,
  Lock,
  Sparkles,
} from 'lucide-react';
import Button from './Button';
import Input from './Input';
import Textarea from './Textarea';
import { formatCurrency } from '../../utils/formatters';

const BookingModal = ({ isOpen, onClose, professional, initialService, onBookingSuccess }) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(initialService || professional?.services?.[0] || null);
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('09:00 AM');
  const [eventCity, setEventCity] = useState(professional?.location?.city || '');
  const [eventType, setEventType] = useState('Wedding Ceremony');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !professional) return null;

  const services = professional.services && professional.services.length > 0
    ? professional.services
    : [
        {
          id: 'srv-default',
          title: 'Custom Production Shoot Day',
          price: professional.startingPrice || 25000,
          description: 'Full day creative direction, multi-camera shoot setup, high-res color grading.',
          deliveryDays: 10,
          inclusions: ['Full Day Coverage', 'High-Res Stills', 'Teaser in 48 Hours'],
        },
      ];

  const currentService = selectedService || services[0];
  const escrowFee = Math.round(currentService.price * 0.05);
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
      onBookingSuccess &&
        onBookingSuccess({
          bookingReference: `LC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
          professional,
          service: currentService,
          eventDate,
          eventTime,
          eventCity,
          eventType,
          totalAmount,
          advanceEscrowDeposit,
        });
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-lg border border-[#E8E2D8] shadow-2xl overflow-hidden my-8 text-left animate-reveal">
        {/* Header with Progress Steps */}
        <div className="p-6 border-b border-[#E8E2D8] bg-[#FAF8F5]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C4683C] block">
                Airbnb-Style Escrow Reservation
              </span>
              <h2 className="text-xl font-serif font-bold text-[#121212]">
                Book with {professional.name}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#EAE4DC] text-[#6B6258] transition-colors"
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
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                    step >= s.num
                      ? 'bg-[#121212] text-white'
                      : 'bg-[#EAE4DC] text-[#8C8276]'
                  }`}
                >
                  {step > s.num ? '✓' : s.num}
                </div>
                <span className="hidden sm:inline text-[11px] font-medium text-[#6B6258]">
                  {s.label}
                </span>
                {s.num < 4 && <div className="flex-1 h-px bg-[#E8E2D8]" />}
              </div>
            ))}
          </div>
        </div>

        {/* Step Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
          {/* STEP 1: Select Service Package */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#121212]">
                1. Select Desired Creative Package
              </h3>
              <div className="space-y-3">
                {services.map((srv) => {
                  const isSelected = currentService?.id === srv.id;
                  return (
                    <div
                      key={srv.id}
                      onClick={() => setSelectedService(srv)}
                      className={`p-4 rounded-md border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#121212] bg-[#FAF8F5] ring-1 ring-[#121212]'
                          : 'border-[#E8E2D8] hover:border-[#121212]/50 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-sm font-bold text-[#121212]">{srv.title}</h4>
                          <p className="text-xs text-[#6B6258] mt-1">{srv.description}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-base font-serif font-bold text-[#121212]">
                            {formatCurrency(srv.price)}
                          </span>
                          <span className="text-[10px] text-[#8C8276] block">
                            {srv.deliveryDays}d delivery
                          </span>
                        </div>
                      </div>

                      {srv.inclusions && srv.inclusions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[#E8E2D8]">
                          {srv.inclusions.map((inc, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] px-2 py-0.5 rounded bg-white border border-[#E8E2D8] text-[#4A433B]"
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
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#121212]">
                2. Choose Shoot Date & Timing
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#121212] mb-1.5">Event / Shoot Date</label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded border border-[#E8E2D8] text-xs focus:outline-none focus:border-[#121212] bg-white shadow-2xs"
                  />
                  <p className="text-[10px] text-[#8C8276] mt-1">Creator availability will be locked on confirmation.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#121212] mb-1.5">Start Time / Call Sheet</label>
                  <select
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded border border-[#E8E2D8] text-xs focus:outline-none focus:border-[#121212] bg-white shadow-2xs"
                  >
                    <option value="06:00 AM">06:00 AM (Sunrise Golden Hour)</option>
                    <option value="09:00 AM">09:00 AM (Morning Session)</option>
                    <option value="02:00 PM">02:00 PM (Afternoon Production)</option>
                    <option value="05:00 PM">05:00 PM (Sunset / Evening Reception)</option>
                    <option value="Full Day">Full Day (10–12 Hours Comprehensive)</option>
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-md bg-[#FAF8F5] border border-[#E8E2D8] flex items-center gap-3 text-xs text-[#6B6258]">
                <Clock className="w-5 h-5 text-[#C4683C] shrink-0" />
                <span>Standard studio guarantee: 48h early preview teaser delivery included.</span>
              </div>
            </div>
          )}

          {/* STEP 3: Event Details */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#121212]">
                3. Event Location & Creative Brief
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Shoot Location / City"
                  placeholder="e.g. Udaipur, Rajasthan / Studio Mumbai"
                  value={eventCity}
                  onChange={(e) => setEventCity(e.target.value)}
                />
                <div>
                  <label className="block text-xs font-bold text-[#121212] mb-1.5">Occasion / Category</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded border border-[#E8E2D8] text-xs focus:outline-none focus:border-[#121212] bg-white shadow-2xs"
                  >
                    <option value="Wedding Ceremony">Royal / Traditional Wedding</option>
                    <option value="Pre-Wedding Shoot">Cinematic Pre-Wedding</option>
                    <option value="Commercial Ad">Commercial Brand / Product</option>
                    <option value="Fashion Lookbook">Fashion Editorial</option>
                    <option value="Short Video Retainer">Reels / Social Retainer</option>
                  </select>
                </div>
              </div>

              <Textarea
                label="Shot List & Special Vision (Optional)"
                placeholder="Mention specific lighting styles, key family portraits, mood boards, or venue constraints..."
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          )}

          {/* STEP 4: Summary & Escrow Breakdown */}
          {step === 4 && (
            <div className="space-y-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#121212]">
                4. Review & Confirm Escrow Booking
              </h3>

              <div className="p-4 rounded-md bg-[#FAF8F5] border border-[#E8E2D8] space-y-3">
                <div className="flex items-start justify-between pb-3 border-b border-[#E8E2D8]">
                  <div>
                    <h4 className="text-sm font-bold text-[#121212]">{currentService.title}</h4>
                    <p className="text-xs text-[#6B6258]">
                      Creator: <strong className="text-[#121212]">{professional.name}</strong> ({professional.role})
                    </p>
                  </div>
                  <span className="text-base font-serif font-bold text-[#121212]">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-[#6B6258]">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#8C8276] block">Date & Time</span>
                    <span className="font-bold text-[#121212]">{eventDate || 'Date not selected'}, {eventTime}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#8C8276] block">Location</span>
                    <span className="font-bold text-[#121212]">{eventCity || 'Not specified'}</span>
                  </div>
                </div>
              </div>

              {/* Escrow Guarantee Box */}
              <div className="p-4 rounded-md bg-[#121212] text-white space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#C4683C]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>LensCraft 100% Escrow Protection Active</span>
                </div>
                <p className="text-xs text-[#A39B91] leading-relaxed">
                  Your advance deposit ({formatCurrency(advanceEscrowDeposit)}) remains securely locked in escrow and is only released to the creator once deliverables are uploaded and approved by you.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-[#E8E2D8] bg-[#FAF8F5] flex items-center justify-between">
          {step > 1 ? (
            <Button
              variant="outline"
              size="md"
              onClick={handlePrev}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back
            </Button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <Button
              variant="primary"
              size="md"
              onClick={handleNext}
              disabled={step === 2 && !eventDate}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Continue to Step {step + 1}
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              loading={isSubmitting}
              onClick={handleConfirm}
              rightIcon={<CheckCircle2 className="w-4 h-4" />}
            >
              Confirm & Lock Escrow
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
