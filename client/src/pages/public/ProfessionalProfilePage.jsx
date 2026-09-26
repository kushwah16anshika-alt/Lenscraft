import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  MessageSquare,
  Sparkles,
  Calendar,
  Camera,
  Check,
  HelpCircle,
  Film,
  Award,
  ChevronRight,
  Package,
} from 'lucide-react';
import { ROLE_LABELS } from '../../constants/roles';
import { formatCurrency, formatDate } from '../../utils/formatters';
import Avatar from '../../components/common/Avatar';
import LightboxModal from '../../components/common/LightboxModal';
import BookingModal from '../../components/common/BookingModal';
import DirectChatModal from '../../components/common/DirectChatModal';
import WriteReviewModal from '../../components/common/WriteReviewModal';
import { usePlatform } from '../../context/PlatformContext';
import { useToast } from '../../hooks/useToast';

const faqs = [
  {
    q: 'How does the booking & escrow system work?',
    a: 'You pay a 25% advance to lock your dates. The funds are held in secure escrow and only released to the creator after master delivery.',
  },
  {
    q: 'Can we schedule a consultation before confirming?',
    a: 'Yes! Once you initiate a booking inquiry, you can message the creator directly to discuss moodboards, locations, and timings.',
  },
  {
    q: 'What is the turnaround time for final edited photos/films?',
    a: 'Standard turnaround is 5-10 business days for color graded stills and 14 days for 4K cinematic films.',
  },
  {
    q: 'Are travel & accommodation charges included for destination shoots?',
    a: 'For shoots outside the base city, travel and stay are billed at actuals or arranged directly by the client.',
  },
];

const ProfessionalProfilePage = () => {
  const { id } = useParams();
  const { success } = useToast();
  const { professionals, reviews, toggleFavorite, favorites } = usePlatform();

  const [activeTab, setActiveTab] = useState('portfolio');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [writeReviewOpen, setWriteReviewOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('Standard');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(0);

  const pro = professionals.find((p) => p.id === id) || professionals[0];
  const proReviews = reviews.filter((r) => r.creatorId === pro.id || r.professionalId === pro.id);
  const isSaved = favorites?.some((f) => f.id === pro.id);
  const city = typeof pro.location === 'object' ? pro.location.city : pro.location;

  // Custom packages for this professional
  const packagesList = pro.services || [
    {
      id: 'srv-1',
      title: 'Basic Experience',
      price: pro.startingPrice || 25000,
      deliveryDays: 5,
      description: 'Short session capturing essential portraits, pre-shoot moodboard, and high-res digital gallery.',
      inclusions: ['4 Hours Session', '60 Edited High-Res Photos', 'Private Online Gallery', 'Personal License'],
    },
    {
      id: 'srv-2',
      title: 'Standard Experience',
      price: Math.round((pro.startingPrice || 25000) * 1.5),
      deliveryDays: 8,
      description: 'Full day coverage with lead artist + candid assistant, film color grading, and drone stills.',
      inclusions: ['8 Hours Coverage', '250+ Master Graded Photos', 'Drone Aerials Included', 'Hardcover Album Option'],
    },
    {
      id: 'srv-3',
      title: 'Premium Cinema & Stills',
      price: Math.round((pro.startingPrice || 25000) * 2.5),
      deliveryDays: 14,
      description: 'Multi-location luxury coverage with full photo and cinema video team, 4K film, and raw master SSD.',
      inclusions: ['Full Day Multi-Camera Crew', '4K Teaser + 20-min Film', '500+ Master Edits', 'SSD Master Delivery'],
    },
  ];

  const handleChoosePackage = (pkg) => {
    setSelectedPackage(pkg.title || pkg.name);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 pb-24 text-left relative">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO HEADER COVER
          ───────────────────────────────────────────────────────────── */}
      <div className="relative h-72 sm:h-96 lg:h-[440px] w-full bg-midnight-950 overflow-hidden">
        <img
          src={pro.coverImage}
          alt={pro.name}
          className="w-full h-full object-cover filter brightness-[0.4] contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/50 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,210,255,0.12)_0%,_transparent_70%)]" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. CREATOR BIO & STATS HEADER
          ───────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-28 relative z-10 space-y-8">
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-sky-500/25 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <img
                src={pro.avatar || pro.coverImage}
                alt={pro.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-cyan-400 shadow-[0_0_20px_rgba(0,210,255,0.4)] shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-4xl font-display font-bold text-white">
                    {pro.name}
                  </h1>
                  {pro.isVerified && (
                    <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" title="Verified Creator" />
                  )}
                </div>
                <p className="text-xs sm:text-sm text-cyan-300 font-medium font-mono">
                  {pro.category || ROLE_LABELS[pro.role]}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 pt-1">
                  <span className="flex items-center gap-1 text-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    {city}, India
                  </span>
                  <span className="text-slate-500">·</span>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="text-white font-bold">{pro.rating || 4.9}</span>
                    <span className="text-slate-400">({pro.reviewCount || 24} reviews)</span>
                  </div>
                  <span className="text-slate-500">·</span>
                  <span className="font-mono text-cyan-300 font-semibold">{pro.completedShoots || 120}+ shoots completed</span>
                </div>
              </div>
            </div>

            {/* Top Action CTAs */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  toggleFavorite(pro);
                  success(isSaved ? 'Removed from saved creators' : 'Saved to your favorites!');
                }}
                className={`p-3 rounded-full border transition-all ${
                  isSaved
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.4)]'
                    : 'glass-panel text-slate-300 hover:text-white hover:border-cyan-400'
                }`}
                title="Save Creator"
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-cyan-400' : ''}`} />
              </button>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  success('Creator profile link copied to clipboard!');
                }}
                className="p-3 rounded-full glass-panel text-slate-300 hover:text-white hover:border-cyan-400 transition-all"
                title="Share Profile"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setBookingModalOpen(true)}
                className="px-6 py-3 rounded-full glow-btn-primary text-xs uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(0,210,255,0.4)] hover:scale-105 transition-all"
              >
                Check Availability & Book
              </button>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            3. MAIN CONTENT GRID (2 cols: Left Details, Right Sticky Booking)
            ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8/12): Navigation Tabs & Sections */}
          <div className="lg:col-span-8 space-y-8">
            {/* Section Tabs */}
            <div className="flex border-b border-sky-500/20 gap-4 overflow-x-auto no-scrollbar pb-2">
              {[
                { id: 'portfolio', label: 'Portfolio Gallery' },
                { id: 'packages', label: 'Packages & Services' },
                { id: 'about', label: 'About & Gear' },
                { id: 'reviews', label: `Reviews (${proReviews.length || pro.reviewCount || 12})` },
                { id: 'faqs', label: 'FAQs' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-cyan-500 text-midnight-950 shadow-[0_0_15px_rgba(0,210,255,0.4)]'
                      : 'glass-panel text-slate-300 hover:text-white hover:border-sky-500/40'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB: PORTFOLIO */}
            {activeTab === 'portfolio' && (
              <section className="space-y-6 animate-reveal">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-display font-bold text-white">
                    CURATED PORTFOLIO WORK
                  </h2>
                  <span className="text-xs font-mono text-cyan-400">
                    {pro.portfolio?.length || 4} Master Works
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(pro.portfolio || [
                    { title: 'Royal Celebration', url: pro.coverImage, category: 'Weddings' },
                  ]).map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setActiveLightboxIndex(idx);
                        setLightboxOpen(true);
                      }}
                      className="group relative rounded-2xl overflow-hidden glass-card border border-sky-500/20 hover:border-cyan-400/60 cursor-pointer aspect-[4/3]"
                    >
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                      <div className="absolute top-3 right-3 p-2 rounded-full bg-midnight-950/80 text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-4 h-4" />
                      </div>

                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="text-[10px] font-mono uppercase text-cyan-300 px-2 py-0.5 rounded bg-midnight-950/80 border border-sky-500/30">
                          {item.category || 'Fine Art'}
                        </span>
                        <h4 className="text-sm font-display font-bold text-white mt-1 group-hover:text-cyan-200 transition-colors truncate">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* TAB: PACKAGES & SERVICES */}
            {activeTab === 'packages' && (
              <section className="space-y-6 animate-reveal">
                <div className="space-y-1">
                  <h2 className="text-xl font-display font-bold text-white">
                    SERVICES & PRICING PACKAGES
                  </h2>
                  <p className="text-xs text-slate-400">
                    Transparent inclusions, certified escrow protection, and guaranteed delivery SLAs.
                  </p>
                </div>

                <div className="space-y-4">
                  {packagesList.map((srv, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-3xl glass-card border border-sky-500/20 hover:border-cyan-400/50 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono flex items-center justify-center font-bold">
                            0{idx + 1}
                          </span>
                          <h3 className="text-lg font-display font-bold text-white">{srv.title}</h3>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                          {srv.description}
                        </p>
                        {srv.inclusions && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {srv.inclusions.map((inc, iIdx) => (
                              <span
                                key={iIdx}
                                className="text-[11px] text-cyan-300 bg-sky-500/10 border border-sky-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1"
                              >
                                <Check className="w-3 h-3 text-cyan-400" />
                                <span>{inc}</span>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="text-right shrink-0 space-y-2 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                        <span className="text-2xl font-mono font-bold text-cyan-300 block">
                          ₹{srv.price?.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] text-slate-400 block font-mono">
                          {srv.deliveryDays} Days Delivery
                        </span>
                        <button
                          type="button"
                          onClick={() => handleChoosePackage(srv)}
                          className="px-5 py-2 rounded-full glow-btn-primary text-xs uppercase tracking-wider font-bold shadow-md hover:scale-105 transition-all"
                        >
                          Book Service
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* TAB: ABOUT & EQUIPMENT */}
            {activeTab === 'about' && (
              <section className="space-y-6 animate-reveal">
                <div className="p-6 sm:p-8 rounded-3xl glass-card border border-sky-500/20 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-display font-bold text-white">Artist Biography</h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                      {pro.bio}
                    </p>
                  </div>

                  {pro.specialties && (
                    <div className="space-y-2 pt-4 border-t border-white/10">
                      <h3 className="text-sm font-display font-bold text-white">Core Specialties</h3>
                      <div className="flex flex-wrap gap-2">
                        {pro.specialties.map((spec, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-xs font-mono text-cyan-300"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {pro.equipment && (
                    <div className="space-y-2 pt-4 border-t border-white/10">
                      <h3 className="text-sm font-display font-bold text-white flex items-center gap-1.5">
                        <Wrench className="w-4 h-4 text-cyan-400" />
                        <span>Professional Cinema & Camera Gear</span>
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {pro.equipment.map((gear, gIdx) => (
                          <div
                            key={gIdx}
                            className="p-2.5 rounded-xl bg-midnight-950/70 border border-sky-500/15 text-xs text-slate-200 flex items-center gap-2"
                          >
                            <Camera className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span>{gear}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* TAB: REVIEWS */}
            {activeTab === 'reviews' && (
              <section className="space-y-6 animate-reveal">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-display font-bold text-white">
                    CLIENT REVIEWS & FEEDBACK
                  </h2>
                  <button
                    type="button"
                    onClick={() => setWriteReviewOpen(true)}
                    className="px-4 py-2 rounded-full glass-panel border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/10 text-xs font-bold uppercase tracking-wider"
                  >
                    Write a Review
                  </button>
                </div>

                <div className="space-y-4">
                  {(proReviews.length > 0 ? proReviews : [
                    {
                      user: { name: 'Rhea Kapoor', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
                      rating: 5,
                      event: 'Destination Wedding Shoot',
                      date: 'February 2026',
                      comment: 'Extraordinary artistry, calm energy on-set, and master film edits. Worth every single penny.',
                    },
                  ]).map((rev, rIdx) => (
                    <div key={rIdx} className="p-6 rounded-3xl glass-card border border-sky-500/20 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={rev.user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                            alt={rev.user?.name || 'Client'}
                            className="w-10 h-10 rounded-full object-cover border border-sky-500/30"
                          />
                          <div>
                            <h4 className="text-xs font-bold text-white">{rev.user?.name || 'Client'}</h4>
                            <p className="text-[11px] text-cyan-400 font-mono">{rev.event || 'Shoot'}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-0.5 text-amber-400">
                          {[...Array(rev.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                        "{rev.comment || rev.review}"
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* TAB: FAQS */}
            {activeTab === 'faqs' && (
              <section className="space-y-4 animate-reveal">
                {faqs.map((faq, fIdx) => (
                  <div key={fIdx} className="p-6 rounded-3xl glass-card border border-sky-500/20 space-y-2">
                    <h4 className="text-sm font-display font-bold text-white flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{faq.q}</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed pl-6">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </section>
            )}
          </div>

          {/* Right Column (4/12): Sticky Booking Card */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="p-6 sm:p-7 rounded-3xl glass-card border border-sky-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,210,255,0.15)] space-y-6 bg-midnight-950/90">
              <div className="flex items-baseline justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">Baseline Rate</span>
                  <span className="text-3xl font-mono font-bold text-cyan-300">
                    ₹{pro.startingPrice?.toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-mono">/ baseline</span>
              </div>

              {/* Inclusions summary */}
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Verified Identity & Background Check</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Escrow Milestone Protection</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>High-Resolution Cloud Gallery Delivery</span>
                </div>
              </div>

              {/* Direct Instant Booking Trigger */}
              <div className="pt-2 space-y-3">
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(true)}
                  className="w-full py-3.5 px-6 rounded-2xl glow-btn-primary text-xs uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(0,210,255,0.4)] hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Date with {pro.name.split(' ')[0]}</span>
                </button>

                <p className="text-[11px] text-center text-slate-400 font-mono">
                  Zero cancellation fees up to 14 days before shoot.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        professional={pro}
        defaultPackage={selectedPackage}
      />

      <WriteReviewModal
        isOpen={writeReviewOpen}
        onClose={() => setWriteReviewOpen(false)}
        professional={pro}
      />

      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={(pro.portfolio || [{ url: pro.coverImage, title: pro.name }]).map((p) => ({
          url: p.url,
          title: p.title || pro.name,
          category: p.category || 'Fine Art',
          creator: pro.name,
          location: city,
        }))}
        initialIndex={activeLightboxIndex}
      />
    </div>
  );
};

export default ProfessionalProfilePage;
