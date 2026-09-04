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
  Maximize2,
  Award,
  Video,
  Camera,
  Film,
  Zap,
} from 'lucide-react';
import { MOCK_PROFESSIONALS } from '../../constants/mockData';
import { ROLE_LABELS } from '../../constants/roles';
import { formatCurrency, formatPriceUnit } from '../../utils/formatters';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';
import Tabs from '../../components/common/Tabs';
import LightboxModal from '../../components/common/LightboxModal';
import BookingModal from '../../components/common/BookingModal';
import { useToast } from '../../hooks/useToast';

const ProfessionalProfilePage = () => {
  const { id } = useParams();
  const { success } = useToast();
  const [activeTab, setActiveTab] = useState('portfolio');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const pro = MOCK_PROFESSIONALS.find((p) => p.id === id) || MOCK_PROFESSIONALS[0];

  const tabs = [
    { id: 'portfolio', label: 'Portfolio Gallery', icon: Image, count: pro.portfolio?.length || 0 },
    { id: 'services', label: 'Packages & Rates', icon: Layers, count: pro.services?.length || 0 },
    { id: 'reviews', label: 'Client Reviews', icon: Star, count: pro.reviewCount || 0 },
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
          COVER IMAGE BANNER (Editorial Film Aesthetic)
         ───────────────────────────────────────────────────────────── */}
      <div className="relative h-72 sm:h-96 lg:h-[420px] w-full bg-[#121212] overflow-hidden film-frame-marker">
        <img
          src={pro.coverImage}
          alt={pro.name}
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/30 to-transparent" />
        <div className="absolute bottom-6 left-6 hidden sm:flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-white/70 bg-black/60 backdrop-blur-md px-3 py-1 rounded border border-white/10">
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
            <div className="p-6 sm:p-8 rounded-xl bg-white border border-[#E8E2D8] shadow-md space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar
                    src={pro.avatar}
                    name={pro.name}
                    size="2xl"
                    className="ring-4 ring-white shadow-md shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#121212]">
                        {pro.name}
                      </h1>
                      {pro.isVerified && (
                        <ShieldCheck className="w-5 h-5 text-[#C4683C] shrink-0" title="Verified Creator" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#FAF8F5] text-[#C4683C] border border-[#E8E2D8]">
                        {ROLE_LABELS[pro.role]}
                      </span>
                      <span className="text-xs text-[#6B6258]">
                        {pro.experienceYears} Years Experience
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => success('Studio profile link copied to clipboard!')}
                    className="p-2.5 rounded bg-[#FAF8F5] hover:bg-[#F3EFEA] text-[#6B6258] hover:text-[#121212] border border-[#E8E2D8] transition-colors"
                    title="Share Profile"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsWishlisted(!isWishlisted);
                      success(isWishlisted ? 'Removed from saved creators' : 'Saved to wishlist!');
                    }}
                    className="p-2.5 rounded bg-[#FAF8F5] hover:bg-[#F3EFEA] text-[#6B6258] hover:text-[#99453F] border border-[#E8E2D8] transition-colors"
                    title="Save to Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#99453F] text-[#99453F]' : ''}`} />
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#6B6258] leading-relaxed font-normal">
                {pro.tagline}
              </p>

              {/* Quick Meta Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#E8E2D8] text-xs">
                <div>
                  <span className="text-[#8C8276] block text-[10px] uppercase font-semibold">Client Rating</span>
                  <div className="flex items-center gap-1 font-bold text-[#121212] mt-0.5">
                    <Star className="w-3.5 h-3.5 fill-[#C4683C] text-[#C4683C]" />
                    <span>{pro.rating}</span>
                    <span className="text-[#8C8276] font-normal">({pro.reviewCount})</span>
                  </div>
                </div>

                <div>
                  <span className="text-[#8C8276] block text-[10px] uppercase font-semibold">Base Location</span>
                  <div className="flex items-center gap-1 font-bold text-[#121212] mt-0.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#8C8276]" />
                    <span>{pro.location?.city}, {pro.location?.state || 'India'}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[#8C8276] block text-[10px] uppercase font-semibold">Day Rates From</span>
                  <span className="font-bold text-[#121212] block mt-0.5">
                    {formatCurrency(pro.startingPrice)} {formatPriceUnit(pro.priceUnit)}
                  </span>
                </div>

                <div>
                  <span className="text-[#8C8276] block text-[10px] uppercase font-semibold">Escrow Protection</span>
                  <span className="font-bold text-[#121212] block mt-0.5 text-[#C4683C]">
                    100% Certified
                  </span>
                </div>
              </div>
            </div>

            {/* Content Tabs */}
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

            {/* ─────────────────────────────────────────────────────────────
                TAB 1: PORTFOLIO GALLERY (Masonry + Fullscreen Lightbox)
               ───────────────────────────────────────────────────────────── */}
            {activeTab === 'portfolio' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D8]">
                  <h3 className="text-lg font-serif font-bold text-[#121212]">
                    Signature Portfolio Works ({pro.portfolio?.length || 0})
                  </h3>
                  <span className="text-xs text-[#8C8276]">Click any frame for fullscreen view</span>
                </div>

                {pro.portfolio && pro.portfolio.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pro.portfolio.map((item, idx) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          setActiveLightboxIndex(idx);
                          setLightboxOpen(true);
                        }}
                        className="group relative h-64 rounded-lg overflow-hidden bg-[#121212] cursor-pointer shadow-sm border border-[#E8E2D8] hover:border-[#121212] transition-all"
                      >
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106 opacity-90 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                        <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-white text-[9px] uppercase font-bold tracking-wider border border-white/20">
                          {item.category}
                        </div>

                        <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </div>

                        <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                          <h4 className="text-sm font-serif font-bold leading-snug">{item.title}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center bg-white rounded-lg border border-[#E8E2D8] space-y-2">
                    <Image className="w-8 h-8 text-[#8C8276] mx-auto opacity-50" />
                    <p className="text-xs text-[#6B6258]">Portfolio media is currently being curated.</p>
                  </div>
                )}
              </div>
            )}

            {/* ─────────────────────────────────────────────────────────────
                TAB 2: PACKAGES & RATES
               ───────────────────────────────────────────────────────────── */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="pb-2 border-b border-[#E8E2D8]">
                  <h3 className="text-lg font-serif font-bold text-[#121212]">
                    Available Booking Packages & Turnaround Times
                  </h3>
                </div>

                {pro.services && pro.services.length > 0 ? (
                  <div className="space-y-4">
                    {pro.services.map((srv) => (
                      <div
                        key={srv.id}
                        className="p-6 rounded-xl bg-white border border-[#E8E2D8] shadow-2xs hover:border-[#121212] transition-all space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div>
                            <h4 className="text-lg font-serif font-bold text-[#121212]">{srv.title}</h4>
                            <p className="text-xs text-[#6B6258] mt-1 max-w-xl leading-relaxed">
                              {srv.description}
                            </p>
                          </div>
                          <div className="text-left sm:text-right shrink-0">
                            <span className="text-2xl font-serif font-bold text-[#121212] block">
                              {formatCurrency(srv.price)}
                            </span>
                            <span className="text-[11px] text-[#8C8276] font-medium">
                              {srv.deliveryDays} Days Full Turnaround
                            </span>
                          </div>
                        </div>

                        {srv.inclusions && srv.inclusions.length > 0 && (
                          <div className="pt-3 border-t border-[#E8E2D8] space-y-2">
                            <span className="text-[10px] uppercase font-bold text-[#8C8276] tracking-wider block">
                              Deliverable Inclusions:
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#4A433B]">
                              {srv.inclusions.map((inc, iIdx) => (
                                <div key={iIdx} className="flex items-center gap-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C4683C] shrink-0" />
                                  <span>{inc}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="pt-2">
                          <Button
                            variant="primary"
                            size="md"
                            onClick={() => handleBookPackage(srv)}
                            rightIcon={<ArrowRight className="w-4 h-4" />}
                          >
                            Book This Package
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center bg-white rounded-lg border border-[#E8E2D8]">
                    <p className="text-xs text-[#6B6258]">Contact creator directly for custom rate quotation.</p>
                  </div>
                )}
              </div>
            )}

            {/* ─────────────────────────────────────────────────────────────
                TAB 3: CLIENT REVIEWS
               ───────────────────────────────────────────────────────────── */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D8]">
                  <h3 className="text-lg font-serif font-bold text-[#121212]">
                    Verified Client Testimonials ({pro.reviewCount || 0})
                  </h3>
                  <div className="flex items-center gap-1 font-bold text-sm text-[#121212]">
                    <Star className="w-4 h-4 fill-[#C4683C] text-[#C4683C]" />
                    <span>{pro.rating} / 5.0 Rating</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-6 rounded-lg bg-white border border-[#E8E2D8] space-y-3 shadow-2xs">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
                          name="Pooja Sharma"
                          size="md"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-[#121212]">Pooja & Rohan Sharma</h4>
                          <span className="text-[11px] text-[#8C8276]">Destination Wedding in Udaipur</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[#C4683C]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-[#C4683C]" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-[#4A433B] italic font-serif leading-relaxed">
                      "{pro.name} and the crew were absolutely phenomenal. Every photograph and 4K film cut looks like an editorial spread in Vogue. Highly recommended for couples wanting genuine cinematic storytelling."
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ─────────────────────────────────────────────────────────────
                TAB 4: ABOUT & GEAR KIT
               ───────────────────────────────────────────────────────────── */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div className="p-6 sm:p-8 rounded-xl bg-white border border-[#E8E2D8] space-y-6 shadow-2xs">
                  <div>
                    <h3 className="text-base font-serif font-bold text-[#121212] mb-2">Studio Biography</h3>
                    <p className="text-xs text-[#6B6258] leading-relaxed">
                      {pro.bio || 'Dedicated visual artist with years of hands-on production experience capturing high-end celebrations and commercial brand stories.'}
                    </p>
                  </div>

                  {pro.equipment && pro.equipment.length > 0 && (
                    <div className="pt-4 border-t border-[#E8E2D8] space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#121212] flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-[#C4683C]" />
                        <span>Verified Camera & Production Gear Kit</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#4A433B]">
                        {pro.equipment.map((gear, gIdx) => (
                          <div key={gIdx} className="p-2.5 rounded bg-[#FAF8F5] border border-[#E8E2D8] flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C4683C]" />
                            <span className="font-mono text-[11px]">{gear}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {pro.specialties && pro.specialties.length > 0 && (
                    <div className="pt-4 border-t border-[#E8E2D8] space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#121212]">
                        Specialized Genres & Creative Mediums
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {pro.specialties.map((spec, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-3 py-1 rounded bg-[#FAF8F5] text-xs font-semibold text-[#121212] border border-[#E8E2D8]"
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
            <div className="p-6 sm:p-7 rounded-xl bg-white border border-[#E8E2D8] shadow-lg space-y-5">
              <div className="flex items-baseline justify-between pb-4 border-b border-[#E8E2D8]">
                <div>
                  <span className="text-2xl font-serif font-bold text-[#121212]">
                    {formatCurrency(pro.startingPrice)}
                  </span>
                  <span className="text-xs text-[#8C8276] ml-1">{formatPriceUnit(pro.priceUnit)}</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-[#121212]">
                  <Star className="w-3.5 h-3.5 fill-[#C4683C] text-[#C4683C]" />
                  <span>{pro.rating}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full bg-[#C4683C] hover:bg-[#B2592F] text-white border-none shadow-md py-3.5"
                  onClick={() => setBookingModalOpen(true)}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Reserve Date & Book
                </Button>
                <p className="text-[11px] text-center text-[#8C8276]">
                  You won't be charged yet. Escrow locks on confirmation.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-[#E8E2D8] space-y-2.5 text-xs text-[#6B6258]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C4683C] shrink-0" />
                  <span>100% Escrow Protection Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C4683C] shrink-0" />
                  <span>48h Early Teaser Preview Included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C4683C] shrink-0" />
                  <span>Direct Creator Messaging & Call-Sheets</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {pro.portfolio && (
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
    </div>
  );
};

export default ProfessionalProfilePage;
