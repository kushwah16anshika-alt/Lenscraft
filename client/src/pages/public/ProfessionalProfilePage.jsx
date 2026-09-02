import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  ShieldCheck,
  Star,
  Share2,
  Heart,
  Calendar,
  Clock,
  CheckCircle2,
  Layers,
  Image,
  Wrench,
  ArrowRight,
} from 'lucide-react';
import { MOCK_PROFESSIONALS } from '../../constants/mockData';
import { ROLE_LABELS } from '../../constants/roles';
import { formatCurrency, formatPriceUnit } from '../../utils/formatters';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';
import StarRating from '../../components/common/StarRating';
import Button from '../../components/common/Button';
import Tabs from '../../components/common/Tabs';
import PortfolioCard from '../../components/cards/PortfolioCard';
import ServiceCard from '../../components/cards/ServiceCard';
import ReviewCard from '../../components/cards/ReviewCard';
import Modal from '../../components/common/Modal';
import { useToast } from '../../hooks/useToast';

const ProfessionalProfilePage = () => {
  const { id } = useParams();
  const { success } = useToast();
  const [activeTab, setActiveTab] = useState('portfolio');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const pro = MOCK_PROFESSIONALS.find((p) => p.id === id) || MOCK_PROFESSIONALS[0];

  const tabs = [
    { id: 'portfolio', label: 'Portfolio Gallery', icon: Image, count: pro.portfolio?.length || 0 },
    { id: 'services', label: 'Services & Pricing', icon: Layers, count: pro.services?.length || 0 },
    { id: 'reviews', label: 'Client Reviews', icon: Star, count: pro.reviewCount || 0 },
    { id: 'about', label: 'About & Gear', icon: Wrench },
  ];

  const handleBookPackage = (service) => {
    setSelectedService(service);
    setBookingModalOpen(true);
  };

  const handleConfirmBooking = () => {
    setBookingModalOpen(false);
    success('Booking request sent successfully! The creator will review and respond.');
  };

  return (
    <div className="pb-20 text-left space-y-8">
      {/* Cover Image Banner */}
      <div className="relative h-64 sm:h-80 lg:h-96 w-full bg-[#171717] overflow-hidden film-frame-marker">
        <img
          src={pro.coverImage}
          alt={pro.name}
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/80 via-transparent to-transparent" />
      </div>

      {/* Main Profile Info & Sticky Booking Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left / Center 2-Columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header info card */}
            <div className="p-6 rounded-md bg-white border border-[#E5E0D8] shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar
                    src={pro.avatar}
                    name={pro.name}
                    size="xl"
                    className="ring-4 ring-white shadow-md shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
                        {pro.name}
                      </h1>
                      {pro.isVerified && (
                        <ShieldCheck className="w-5 h-5 text-[#B88A5A] shrink-0" title="Verified Creator" />
                      )}
                    </div>
                    <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-xs bg-[#FAF7F3] text-[#B88A5A] border border-[#E8DBCA]">
                      {ROLE_LABELS[pro.role]}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => success('Profile link copied to clipboard!')}
                    className="p-2 rounded-md bg-[#F7F5F2] hover:bg-[#EEEAE4] text-[#6B6258] hover:text-[#171717] border border-[#E5E0D8] transition-colors"
                    title="Share Profile"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => success('Added to saved creators!')}
                    className="p-2 rounded-md bg-[#F7F5F2] hover:bg-[#EEEAE4] text-[#6B6258] hover:text-[#99453F] border border-[#E5E0D8] transition-colors"
                    title="Save to Wishlist"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-[#6B6258] leading-relaxed font-normal">
                {pro.tagline}
              </p>

              {/* Quick Meta Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#E5E0D8] text-xs">
                <div>
                  <span className="text-[#8C8276] block text-[10px] uppercase font-semibold">Rating</span>
                  <div className="flex items-center gap-1 font-bold text-[#171717] mt-0.5">
                    <Star className="w-3.5 h-3.5 fill-[#B88A5A] text-[#B88A5A]" />
                    <span>{pro.rating}</span>
                    <span className="text-[#8C8276] font-normal">({pro.reviewCount})</span>
                  </div>
                </div>
                <div>
                  <span className="text-[#8C8276] block text-[10px] uppercase font-semibold">Base Location</span>
                  <div className="flex items-center gap-1 font-bold text-[#171717] mt-0.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#8C8276]" />
                    <span>{pro.location?.city}</span>
                  </div>
                </div>
                <div>
                  <span className="text-[#8C8276] block text-[10px] uppercase font-semibold">Experience</span>
                  <span className="font-bold text-[#171717] block mt-0.5">{pro.experienceYears} Years</span>
                </div>
                <div>
                  <span className="text-[#8C8276] block text-[10px] uppercase font-semibold">Rate Starting</span>
                  <span className="font-bold text-[#171717] block mt-0.5">
                    {formatCurrency(pro.startingPrice)} {formatPriceUnit(pro.priceUnit)}
                  </span>
                </div>
              </div>
            </div>

            {/* Content Tabs Navigation */}
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

            {/* Tab 1: Portfolio */}
            {activeTab === 'portfolio' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pro.portfolio && pro.portfolio.length > 0 ? (
                    pro.portfolio.map((item) => (
                      <PortfolioCard key={item.id} item={item} />
                    ))
                  ) : (
                    <p className="text-xs text-[#8C8276] py-8 col-span-2 text-center bg-white border border-[#E5E0D8] rounded-md">
                      No portfolio media added yet.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Services & Pricing */}
            {activeTab === 'services' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {pro.services && pro.services.length > 0 ? (
                    pro.services.map((srv) => (
                      <ServiceCard key={srv.id} service={srv} onBook={handleBookPackage} />
                    ))
                  ) : (
                    <p className="text-xs text-[#8C8276] py-8 col-span-2 text-center bg-white border border-[#E5E0D8] rounded-md">
                      No packages published yet.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Tab 3: Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <ReviewCard
                  review={{
                    userName: 'Pooja & Rohan',
                    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
                    rating: 5,
                    comment:
                      'Aarav and his team were absolutely phenomenal at our Udaipur wedding. Every single photograph looks like a frame from an editorial bridal magazine. Highly recommended!',
                    eventCategory: 'Royal Wedding in Udaipur',
                  }}
                />
                <ReviewCard
                  review={{
                    userName: 'Vikram Sethi',
                    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
                    rating: 5,
                    comment:
                      'Incredible visual sensitivity and extremely punctual. Delivered the 4K color graded video trailer within 4 days.',
                    eventCategory: 'Cinematic Pre-Wedding',
                  }}
                />
              </div>
            )}

            {/* Tab 4: About & Gear */}
            {activeTab === 'about' && (
              <div className="p-6 rounded-md bg-white border border-[#E5E0D8] space-y-6">
                <div>
                  <h3 className="text-base font-serif font-bold text-[#171717] mb-2">Biography & Creative Philosophy</h3>
                  <p className="text-xs text-[#6B6258] leading-relaxed">{pro.bio}</p>
                </div>

                {pro.equipment && pro.equipment.length > 0 && (
                  <div>
                    <h3 className="text-base font-serif font-bold text-[#171717] mb-3">Camera Equipment & Optics</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {pro.equipment.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#171717] p-2.5 rounded-sm bg-[#F7F5F2] border border-[#E5E0D8]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#B88A5A] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Sticky Booking Widget */}
          <div className="lg:sticky lg:top-24 space-y-6">
            <div className="p-6 rounded-md bg-white border border-[#E5E0D8] shadow-sm space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#B88A5A] block mb-1">
                  Direct Booking Desk
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-serif font-bold text-[#171717]">
                    {formatCurrency(pro.startingPrice)}
                  </span>
                  <span className="text-xs text-[#6B6258] font-medium">{formatPriceUnit(pro.priceUnit)}</span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-[#6B6258] pt-2 border-t border-[#E5E0D8]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#3D7055] shrink-0" />
                  <span>100% Escrow Protection Guaranteed</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#B88A5A] shrink-0" />
                  <span>Responds within 2 hours</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-[#3B5B75] shrink-0" />
                  <span>Accepting dates for 2025 & 2026</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full justify-center group"
                onClick={() => {
                  setSelectedService(pro.services?.[0] || null);
                  setBookingModalOpen(true);
                }}
                rightIcon={<ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
              >
                Request Availability / Book
              </Button>

              <p className="text-[10px] text-[#8C8276] text-center">
                Free cancellation up to 7 days before event date.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <Modal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        title={`Book ${pro.name}`}
        size="md"
      >
        <div className="space-y-4 text-left">
          <p className="text-xs text-[#6B6258]">
            Selected Package: <strong className="text-[#171717]">{selectedService?.title || 'Custom Shoot'}</strong>
          </p>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6258] mb-1">
              Event Date
            </label>
            <input
              type="date"
              className="w-full rounded-md bg-white border border-[#E5E0D8] px-3.5 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#171717]"
              defaultValue="2025-11-20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6258] mb-1">
              Event Location / Venue
            </label>
            <input
              type="text"
              placeholder="e.g. The Taj Palace, Mumbai"
              className="w-full rounded-md bg-white border border-[#E5E0D8] px-3.5 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#171717]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6258] mb-1">
              Project Details & Brief
            </label>
            <textarea
              rows={3}
              placeholder="Describe hours, ceremony timings, creative themes..."
              className="w-full rounded-md bg-white border border-[#E5E0D8] px-3.5 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#171717]"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-[#E5E0D8]">
            <Button variant="ghost" size="sm" onClick={() => setBookingModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleConfirmBooking}>
              Confirm Booking Request
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfessionalProfilePage;
