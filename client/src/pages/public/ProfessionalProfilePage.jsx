import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  MapPin,
  ShieldCheck,
  Star,
  Share2,
  Heart,
  Clock,
  CheckCircle2,
  Layers,
  Image,
  Wrench,
  ArrowRight,
  Maximize2,
  MessageSquarePlus,
} from 'lucide-react';
import { ROLE_LABELS } from '../../constants/roles';
import { formatCurrency, formatPriceUnit, formatDate } from '../../utils/formatters';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';
import Tabs from '../../components/common/Tabs';
import LightboxModal from '../../components/common/LightboxModal';
import BookingModal from '../../components/common/BookingModal';
import WriteReviewModal from '../../components/common/WriteReviewModal';
import { usePlatform } from '../../hooks/usePlatform';
import { useToast } from '../../hooks/useToast';

const ProfessionalProfilePage = () => {
  const { id } = useParams();
  const { success } = useToast();
  const { professionals, reviews, toggleWishlist, isWishlisted } = usePlatform();
  const [activeTab, setActiveTab] = useState('portfolio');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [writeReviewOpen, setWriteReviewOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(0);

  const pro = professionals.find((p) => p.id === id) || professionals[0];
  const proReviews = reviews.filter((r) => r.creatorId === pro.id);
  const savedInWishlist = isWishlisted(pro.id);

  const tabs = [
    { id: 'portfolio', label: 'Portfolio Gallery', icon: Image, count: pro.portfolio?.length || 0 },
    { id: 'services', label: 'Packages & Rates', icon: Layers, count: pro.services?.length || 0 },
    { id: 'reviews', label: 'Client Reviews', icon: Star, count: proReviews.length || pro.reviewCount || 0 },
    { id: 'about', label: 'Gear Kit & Biography', icon: Wrench },
  ];

  const handleBookPackage = (service) => {
    setSelectedService(service);
    setBookingModalOpen(true);
  };

  const handleBookingSuccess = (bookingDetails) => {
    success(`Booking request confirmed (${bookingDetails.bookingReference})! Creator will reach out within 24h.`);
  };

  return (
    <div className="pb-24 text-left space-y-8">
      {/* ─────────────────────────────────────────────────────────────
          COVER IMAGE BANNER
         ───────────────────────────────────────────────────────────── */}
      <div className="relative h-72 sm:h-96 lg:h-[420px] w-full bg-zinc-950 overflow-hidden film-frame-marker">
        <img
          src={pro.coverImage}
          alt={pro.name}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-black/40 to-transparent" />
        <div className="absolute bottom-6 left-6 hidden sm:flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-300 bg-black/70 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
          <span>Studio ID: {pro.id}</span>
          <span>·</span>
          <span>Verified Gear & Identity Audit</span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MAIN PROFILE LAYOUT & STICKY BOOKING DRAWER
         ───────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left / Center 2-Columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header info card */}
            <div className="p-6 sm:p-8 rounded-xl bg-white border border-zinc-200 shadow-soft-md space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar
                    src={pro.avatar}
                    name={pro.name}
                    size="2xl"
                    className="ring-4 ring-white shadow-soft shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900">
                        {pro.name}
                      </h1>
                      {pro.isVerified && (
                        <ShieldCheck className="w-5 h-5 text-zinc-800 shrink-0" title="Verified Creator" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-800 border border-zinc-200">
                        {ROLE_LABELS[pro.role]}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {pro.experienceYears || 8} Years Experience
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href);
                      success('Studio profile link copied to clipboard!');
                    }}
                    className="p-2.5 rounded-md border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-colors"
                    title="Share Profile"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      toggleWishlist(pro.id);
                      success(savedInWishlist ? 'Removed from saved creators' : 'Saved to your curated wishlist!');
                    }}
                    className={`p-2.5 rounded-md border transition-colors ${
                      savedInWishlist
                        ? 'bg-red-50 border-red-200 text-red-600'
                        : 'border-zinc-200 text-zinc-600 hover:text-red-600 hover:bg-zinc-50'
                    }`}
                    title="Save to Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${savedInWishlist ? 'fill-red-600' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Tagline & City */}
              <div className="space-y-2 pt-2 border-t border-zinc-100">
                <p className="text-sm sm:text-base font-medium text-zinc-900">
                  {pro.tagline}
                </p>
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                    {pro.location?.city}, {pro.location?.state || 'India'}
                  </span>
                  <span className="flex items-center gap-1 font-bold text-zinc-900">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {pro.rating || 5.0} ({proReviews.length || pro.reviewCount || 0} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

            {/* ─────────────────────────────────────────────────────────────
                TAB 1: PORTFOLIO GALLERY
               ───────────────────────────────────────────────────────────── */}
            {activeTab === 'portfolio' && (
              <div className="space-y-6">
                {pro.portfolio && pro.portfolio.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pro.portfolio.map((item, idx) => (
                      <div
                        key={item.id || idx}
                        onClick={() => {
                          setActiveLightboxIndex(idx);
                          setLightboxOpen(true);
                        }}
                        className="group relative aspect-4/3 rounded-lg overflow-hidden bg-zinc-100 cursor-pointer border border-zinc-200 shadow-subtle"
                      >
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4 text-white">
                          <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-300">
                            {item.category}
                          </span>
                          <h4 className="text-sm font-bold font-serif">{item.title}</h4>
                        </div>
                        <button
                          type="button"
                          className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center bg-white rounded-lg border border-zinc-200">
                    <p className="text-xs text-zinc-500">No portfolio items uploaded yet.</p>
                  </div>
                )}
              </div>
            )}

            {/* ─────────────────────────────────────────────────────────────
                TAB 2: PACKAGES & RATES
               ───────────────────────────────────────────────────────────── */}
            {activeTab === 'services' && (
              <div className="space-y-4">
                {pro.services && pro.services.length > 0 ? (
                  pro.services.map((srv) => (
                    <div
                      key={srv.id}
                      className="p-6 rounded-xl bg-white border border-zinc-200 space-y-4 shadow-subtle hover:border-zinc-900 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div>
                          <h3 className="text-base font-serif font-bold text-zinc-900">{srv.title}</h3>
                          <span className="text-xs text-zinc-600 font-semibold flex items-center gap-1 mt-1">
                            <Clock className="w-3.5 h-3.5 text-zinc-400" /> {srv.deliveryDays} Days Turnaround
                          </span>
                        </div>
                        <div className="text-left sm:text-right">
                          <span className="text-xl font-bold text-zinc-900 block">
                            {formatCurrency(srv.price)}
                          </span>
                          <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">
                            {formatPriceUnit(srv.pricingType)}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-zinc-600 leading-relaxed">{srv.description}</p>

                      {srv.inclusions && srv.inclusions.length > 0 && (
                        <div className="pt-3 border-t border-zinc-100 space-y-1.5">
                          {srv.inclusions.map((inc, iIdx) => (
                            <div key={iIdx} className="flex items-center gap-2 text-xs text-zinc-800">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{inc}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="pt-2">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleBookPackage(srv)}
                          className="w-full sm:w-auto"
                        >
                          Book This Package
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center bg-white rounded-lg border border-zinc-200">
                    <p className="text-xs text-zinc-500">Contact creator directly for custom rate quotation.</p>
                  </div>
                )}
              </div>
            )}

            {/* ─────────────────────────────────────────────────────────────
                TAB 3: CLIENT REVIEWS
               ───────────────────────────────────────────────────────────── */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-200">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-zinc-900">
                      Verified Client Testimonials ({proReviews.length})
                    </h3>
                    <div className="flex items-center gap-1 font-bold text-sm text-zinc-900 mt-0.5">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span>{pro.rating || 5.0} / 5.0 Overall Rating</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setWriteReviewOpen(true)}
                    leftIcon={<MessageSquarePlus className="w-3.5 h-3.5" />}
                  >
                    Write a Review
                  </Button>
                </div>

                <div className="space-y-4">
                  {proReviews.length > 0 ? (
                    proReviews.map((rev) => (
                      <div key={rev.id} className="p-6 rounded-lg bg-white border border-zinc-200 space-y-3 shadow-subtle">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={rev.clientAvatar || rev.userAvatar}
                              name={rev.clientName || rev.userName}
                              size="md"
                            />
                            <div>
                              <h4 className="text-xs font-bold text-zinc-900">{rev.clientName || rev.userName}</h4>
                              <span className="text-[11px] text-zinc-500">{rev.event}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-amber-500">
                              {[...Array(rev.rating || 5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                              ))}
                            </div>
                            <span className="text-[10px] text-zinc-400 block mt-1">
                              {formatDate(rev.date || rev.createdAt)}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-zinc-700 italic font-serif leading-relaxed">
                          "{rev.comment}"
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-10 text-center bg-white rounded-lg border border-zinc-200 space-y-3">
                      <p className="text-xs text-zinc-500">Be the first to review {pro.name}!</p>
                      <Button variant="primary" size="sm" onClick={() => setWriteReviewOpen(true)}>
                        Write First Review
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ─────────────────────────────────────────────────────────────
                TAB 4: ABOUT & GEAR KIT
               ───────────────────────────────────────────────────────────── */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div className="p-6 sm:p-8 rounded-xl bg-white border border-zinc-200 space-y-6 shadow-subtle">
                  <div>
                    <h3 className="text-base font-serif font-bold text-zinc-900 mb-2">Studio Biography</h3>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      {pro.bio || pro.about || 'Dedicated visual artist with years of hands-on production experience capturing high-end celebrations and commercial brand stories.'}
                    </p>
                  </div>

                  {pro.equipment && pro.equipment.length > 0 && (
                    <div className="pt-4 border-t border-zinc-100 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-zinc-700" />
                        <span>Verified Camera & Production Gear Kit</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700">
                        {pro.equipment.map((gear, gIdx) => (
                          <div key={gIdx} className="p-2.5 rounded-md bg-zinc-50 border border-zinc-200 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
                            <span className="font-mono text-[11px]">{gear}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {pro.specialties && pro.specialties.length > 0 && (
                    <div className="pt-4 border-t border-zinc-100 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                        Specialized Genres & Creative Mediums
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {pro.specialties.map((spec, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-3 py-1 rounded-md bg-zinc-100 text-xs font-semibold text-zinc-900 border border-zinc-200"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ─────────────────────────────────────────────────────────────
              RIGHT COLUMN: STICKY AIRBNB-STYLE BOOKING DRAWER
             ───────────────────────────────────────────────────────────── */}
          <div className="sticky top-24 space-y-5">
            <div className="p-6 sm:p-7 rounded-xl bg-white border border-zinc-200 shadow-soft-lg space-y-5">
              <div className="flex items-baseline justify-between pb-4 border-b border-zinc-100">
                <div>
                  <span className="text-2xl font-serif font-bold text-zinc-900">
                    {formatCurrency(pro.startingPrice)}
                  </span>
                  <span className="text-xs text-zinc-500 ml-1">{formatPriceUnit(pro.priceUnit)}</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-zinc-900">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{pro.rating || 5.0}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full py-3.5"
                  onClick={() => setBookingModalOpen(true)}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Reserve Date & Book
                </Button>
                <p className="text-[11px] text-center text-zinc-400">
                  You won't be charged yet. Escrow locks on confirmation.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-zinc-100 space-y-2.5 text-xs text-zinc-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Escrow Protection Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-zinc-700 shrink-0" />
                  <span>48h Early Teaser Preview Included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Direct Creator Messaging & Call-Sheets</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {pro.portfolio && pro.portfolio.length > 0 && (
        <LightboxModal
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          item={pro.portfolio[activeLightboxIndex]}
          onNext={() => setActiveLightboxIndex((prev) => (prev + 1) % pro.portfolio.length)}
          onPrev={() => setActiveLightboxIndex((prev) => (prev - 1 + pro.portfolio.length) % pro.portfolio.length)}
          hasNext={pro.portfolio.length > 1}
          hasPrev={pro.portfolio.length > 1}
          creatorName={pro.name}
          creatorId={pro.id}
        />
      )}

      {/* Booking Stepper Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        professional={pro}
        initialService={selectedService}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* Write Review Modal */}
      <WriteReviewModal
        isOpen={writeReviewOpen}
        onClose={() => setWriteReviewOpen(false)}
        professional={pro}
      />
    </div>
  );
};

export default ProfessionalProfilePage;
