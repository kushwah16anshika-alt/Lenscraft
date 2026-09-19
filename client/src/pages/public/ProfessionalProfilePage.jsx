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
  Sparkles,
  Calendar,
  Camera,
  Check,
  HelpCircle,
  Film,
  Award,
} from 'lucide-react';
import { ROLE_LABELS } from '../../constants/roles';
import { formatCurrency, formatDate } from '../../utils/formatters';
import Avatar from '../../components/common/Avatar';
import LightboxModal from '../../components/common/LightboxModal';
import BookingModal from '../../components/common/BookingModal';
import WriteReviewModal from '../../components/common/WriteReviewModal';
import { usePlatform } from '../../context/PlatformContext';
import { useToast } from '../../context/ToastContext';

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
  const [selectedPackage, setSelectedPackage] = useState('Signature');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(0);

  const pro = professionals.find((p) => p.id === id) || professionals[0];
  const proReviews = reviews.filter((r) => r.creatorId === pro.id);
  const isSaved = favorites?.some((f) => f.id === pro.id);
  const city = typeof pro.location === 'object' ? pro.location.city : pro.location;

  // Custom packages for this professional
  const packagesList = pro.packages || [
    {
      name: 'ESSENTIAL',
      price: pro.startingPrice || 15000,
      duration: '4 Hours',
      deliverables: '100 Edited Photos · 1 Photographer',
      features: ['Pre-shoot moodboard alignment', 'Online proofing gallery', 'Personal usage rights'],
    },
    {
      name: 'SIGNATURE',
      price: Math.round((pro.startingPrice || 15000) * 1.8),
      duration: '8 Hours',
      deliverables: '300 Edited Photos · 2 Photographers · Luxury Album',
      features: ['Full ceremony & candid coverage', 'Master skin retouch & film color grade', '30-page hardbound album', 'Drone aerials included'],
    },
    {
      name: 'EDITORIAL',
      price: Math.round((pro.startingPrice || 15000) * 3.0),
      duration: 'Full Day / Multi-Location',
      deliverables: 'Full Stills Archive · 4K Film · Master Retouching',
      features: ['2 Photographers + 1 Cinema Videographer', '4K Drone cinematography', 'Teaser + Extended 20-min Film', 'Raw SSD master delivery'],
    },
  ];

  const handleChoosePackage = (pkgName) => {
    setSelectedPackage(pkgName);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#FBF9F5] pb-24 text-left">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO HEADER COVER
          ───────────────────────────────────────────────────────────── */}
      <div className="relative h-72 sm:h-96 lg:h-[440px] w-full bg-[#111111] overflow-hidden">
        <img
          src={pro.coverImage}
          alt={pro.name}
          className="w-full h-full object-cover filter brightness-75 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />
        <div className="absolute inset-0 ambient-gold-glow" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. CREATOR BIO & STATS HEADER
          ───────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-28 relative z-10 space-y-8">
        <div className="p-6 sm:p-8 bg-[#111111] border border-[#262626] rounded shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <img
                src={pro.avatar || pro.coverImage}
                alt={pro.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-[#C5A059] shadow-xl shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-4xl font-cinzel font-semibold text-[#FBF9F5]">
                    {pro.name}
                  </h1>
                  {pro.isVerified && (
                    <ShieldCheck className="w-5 h-5 text-[#C5A059] shrink-0" title="Verified Creator" />
                  )}
                </div>
                <p className="text-xs sm:text-sm text-[#DFCA9B] font-medium">
                  {pro.category || ROLE_LABELS[pro.role]}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#A39E93] pt-1">
                  <span className="flex items-center gap-1 text-[#EAE6DF]">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                    {city}, India
                  </span>
                  <span className="text-[#6B665E]">·</span>
                  <div className="flex items-center gap-1 text-[#C5A059]">
                    <Star className="w-3.5 h-3.5 fill-[#C5A059]" />
                    <span className="text-[#FBF9F5] font-semibold">{pro.rating || 4.9}</span>
                    <span className="text-[#A39E93]">({pro.reviewCount || 18} reviews)</span>
                  </div>
                  <span className="text-[#6B665E]">·</span>
                  <span className="font-mono text-[#DFCA9B]">128 shoots completed</span>
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
                className={`p-3 rounded border transition-colors ${
                  isSaved
                    ? 'bg-[#171717] border-[#C5A059] text-[#C5A059]'
                    : 'bg-[#171717] border-[#262626] text-[#A39E93] hover:text-[#FBF9F5]'
                }`}
                title="Save Creator"
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#C5A059]' : ''}`} />
              </button>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  success('Creator link copied to clipboard!');
                }}
                className="p-3 rounded bg-[#171717] border border-[#262626] text-[#A39E93] hover:text-[#FBF9F5] transition-colors"
                title="Share Profile"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setBookingModalOpen(true)}
                className="px-6 py-3 rounded gold-btn text-xs uppercase tracking-wider font-semibold"
              >
                Check Availability
              </button>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            3. MAIN CONTENT GRID (2 cols: Left Details, Right Sticky Booking)
            ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8/12): Sections Navigation & Content */}
          <div className="lg:col-span-8 space-y-10">
            {/* Section Tabs */}
            <div className="flex border-b border-[#262626] gap-6 overflow-x-auto no-scrollbar">
              {[
                { id: 'portfolio', label: 'Portfolio Gallery' },
                { id: 'packages', label: 'Packages & Rates' },
                { id: 'about', label: 'About & Equipment' },
                { id: 'reviews', label: 'Client Reviews' },
                { id: 'faqs', label: 'FAQs' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-colors relative ${
                    activeTab === tab.id
                      ? 'text-[#DFCA9B] font-semibold'
                      : 'text-[#A39E93] hover:text-[#FBF9F5]'
                  }`}
                >
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A059]" />
                  )}
                </button>
              ))}
            </div>

            {/* TAB: PORTFOLIO (Masonry Gallery) */}
            {activeTab === 'portfolio' && (
              <section className="space-y-6 animate-reveal">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-cinzel text-[#FBF9F5]">
                    CURATED PORTFOLIO WORK
                  </h2>
                  <span className="text-xs font-mono text-[#A39E93]">
                    {pro.portfolio?.length || 8} Master Works
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(pro.portfolio || [
                    { title: 'Royal Palace Vows', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', aspect: 'aspect-[4/5]' },
                    { title: 'Golden Hour Silhouette', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80', aspect: 'aspect-[1/1]' },
                    { title: 'Candid Laughter', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80', aspect: 'aspect-[16/10]' },
                    { title: 'Desert Starlight', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', aspect: 'aspect-[4/5]' },
                    { title: 'Editorial Lookbook', url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80', aspect: 'aspect-[1/1]' },
                    { title: 'Macro Detail', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80', aspect: 'aspect-[16/10]' },
                  ]).map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setActiveLightboxIndex(idx);
                        setLightboxOpen(true);
                      }}
                      className={`group relative ${item.aspect || 'aspect-[4/3]'} rounded bg-[#171717] border border-[#262626] overflow-hidden cursor-pointer hover:border-[#C5A059] transition-all`}
                    >
                      <img
                        src={item.url || item}
                        alt={item.title || `Portfolio ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <div className="flex items-center justify-between w-full">
                          <p className="text-xs font-semibold text-[#FBF9F5]">{item.title || 'View In High Resolution'}</p>
                          <Maximize2 className="w-4 h-4 text-[#C5A059]" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* TAB: PACKAGES */}
            {activeTab === 'packages' && (
              <section className="space-y-6 animate-reveal">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-cinzel text-[#FBF9F5]">
                    PRODUCTION PACKAGES & RATES
                  </h2>
                  <span className="text-xs text-[#A39E93]">Certified Escrow Protected</span>
                </div>

                <div className="space-y-4">
                  {packagesList.map((pkg) => (
                    <div
                      key={pkg.name}
                      className="p-6 bg-[#111111] border border-[#262626] hover:border-[#C5A059] rounded flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all"
                    >
                      <div className="space-y-2 max-w-lg">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-cinzel font-bold text-[#FBF9F5]">
                            {pkg.name}
                          </h3>
                          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#171717] text-[#C5A059] border border-[#262626]">
                            {pkg.duration}
                          </span>
                        </div>
                        <p className="text-xs text-[#DFCA9B]">{pkg.deliverables}</p>
                        <div className="space-y-1 pt-2">
                          {pkg.features?.map((f, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-2 text-xs text-[#A39E93]">
                              <Check className="w-3.5 h-3.5 text-[#C5A059]" />
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="text-left md:text-right space-y-3 shrink-0">
                        <div>
                          <span className="text-2xl sm:text-3xl font-mono font-bold text-[#FBF9F5]">
                            ₹{pkg.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleChoosePackage(pkg.name)}
                          className="w-full md:w-auto px-5 py-2.5 rounded gold-btn text-xs uppercase tracking-wider font-semibold"
                        >
                          Choose Package
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* TAB: ABOUT & EQUIPMENT */}
            {activeTab === 'about' && (
              <section className="space-y-8 animate-reveal">
                {/* Biography */}
                <div className="p-6 bg-[#111111] border border-[#262626] rounded space-y-4">
                  <h3 className="text-base font-cinzel font-bold text-[#FBF9F5]">
                    CREATIVE PHILOSOPHY & BACKGROUND
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A39E93] leading-relaxed">
                    {pro.bio ||
                      `${pro.name} is a leading ${pro.category || 'photographer'} based in ${city}, with over ${pro.experienceYears || 8} years of experience directing high-profile weddings, celebrity editorials, and global ad campaigns. Focused on candid emotion, atmospheric lighting, and timeless color palettes.`}
                  </p>
                </div>

                {/* Equipment Kit */}
                <div className="p-6 bg-[#111111] border border-[#262626] rounded space-y-4">
                  <h3 className="text-base font-cinzel font-bold text-[#FBF9F5] flex items-center gap-2">
                    <Camera className="w-4 h-4 text-[#C5A059]" />
                    CERTIFIED CAMERA & LIGHTING GEAR
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(pro.equipment || [
                      'Sony Alpha 1 (50.1 MP Full-Frame Flagship)',
                      'Sony A7S III (4K 120p Low Light Cinema)',
                      'Sony G-Master 24-70mm f/2.8 & 70-200mm f/2.8 II',
                      'DJI Inspire 3 / Mavic 3 Pro 4K Cine Drone',
                      'Profoto B10X Plus High-Speed Studio Strobes',
                      'Aputure 600d Pro Continuous Cinema Lighting',
                    ]).map((eq, eIdx) => (
                      <div key={eIdx} className="p-3 bg-[#171717] border border-[#262626] rounded text-xs text-[#EAE6DF] flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                        <span>{eq}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* TAB: REVIEWS */}
            {activeTab === 'reviews' && (
              <section className="space-y-6 animate-reveal">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-cinzel text-[#FBF9F5]">
                    VERIFIED CLIENT REVIEWS
                  </h2>
                  <button
                    onClick={() => setWriteReviewOpen(true)}
                    className="px-4 py-2 rounded btn-secondary-luxury text-xs font-semibold flex items-center gap-1.5"
                  >
                    <MessageSquarePlus className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Write a Review</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {(proReviews.length > 0 ? proReviews : [
                    {
                      id: 'r-1',
                      author: 'Pooja & Rohan Mehra',
                      rating: 5,
                      date: '2026-02-14',
                      comment: 'Arjun captured our destination wedding at Udaipur with unbelievable elegance. Every frame is like a painting.',
                      serviceType: 'Wedding Photography',
                    },
                    {
                      id: 'r-2',
                      author: 'Kabir Singhal',
                      rating: 5,
                      date: '2026-01-20',
                      comment: 'Extremely professional, punctual, and directed our fashion lookbook flawlessly.',
                      serviceType: 'Editorial Shoot',
                    },
                  ]).map((rev, rIdx) => (
                    <div key={rIdx} className="p-5 bg-[#111111] border border-[#262626] rounded space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-semibold text-[#FBF9F5]">{rev.author || rev.userName}</h4>
                          <span className="text-[10px] text-[#C5A059]">· {rev.serviceType || 'Shoot'}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[#C5A059]">
                          {[...Array(rev.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-[#C5A059]" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-[#A39E93] leading-relaxed">
                        "{rev.comment || rev.content}"
                      </p>
                      <span className="text-[10px] text-[#6B665E] font-mono block">
                        Verified Shoot Date: {rev.date}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* TAB: FAQS */}
            {activeTab === 'faqs' && (
              <section className="space-y-4 animate-reveal">
                <h2 className="text-xl font-cinzel text-[#FBF9F5] mb-4">
                  FREQUENTLY ASKED QUESTIONS
                </h2>
                {faqs.map((faq, fIdx) => (
                  <div key={fIdx} className="p-5 bg-[#111111] border border-[#262626] rounded space-y-2">
                    <h4 className="text-sm font-semibold text-[#FBF9F5] flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#C5A059]" />
                      {faq.q}
                    </h4>
                    <p className="text-xs text-[#A39E93] leading-relaxed pl-6">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </section>
            )}
          </div>

          {/* Right Column (4/12): Sticky Booking Card (Desktop) */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="p-6 bg-[#111111] border border-[#262626] rounded shadow-2xl space-y-6">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059]">
                  Instant Date Reserve
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-mono font-bold text-[#FBF9F5]">
                    ₹{(pro.startingPrice || 15000).toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-[#A39E93]">/ baseline</span>
                </div>
              </div>

              {/* Package selector quick pill */}
              <div className="space-y-2 pt-2 border-t border-[#262626]">
                <label className="text-xs uppercase tracking-wider text-[#A39E93] font-medium block">
                  Select Package Tier
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Essential', 'Signature', 'Editorial'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedPackage(t)}
                      className={`py-2 px-2 text-xs uppercase tracking-wider rounded font-medium transition-all ${
                        selectedPackage.toLowerCase() === t.toLowerCase()
                          ? 'gold-btn'
                          : 'bg-[#171717] text-[#A39E93] border border-[#262626]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inclusions summary */}
              <div className="space-y-2 text-xs text-[#A39E93] pt-2 border-t border-[#262626]">
                <div className="flex items-center justify-between">
                  <span>Advance to Lock</span>
                  <span className="font-mono text-[#FBF9F5]">25% (Escrow)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Balance Due</span>
                  <span className="font-mono text-[#FBF9F5]">On Delivery</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Cancellation Guarantee</span>
                  <span className="text-[#C5A059]">100% Refundable (48h)</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(true)}
                  className="w-full py-3.5 rounded gold-btn text-xs uppercase tracking-wider font-semibold shadow-lg"
                >
                  Start Booking Experience
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        professional={pro}
        initialPackage={selectedPackage}
      />

      {/* Review Modal */}
      <WriteReviewModal
        isOpen={writeReviewOpen}
        onClose={() => setWriteReviewOpen(false)}
        creatorName={pro.name}
        creatorId={pro.id}
      />

      {/* Lightbox Viewer */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={(pro.portfolio || []).map((img, i) => ({
          url: img.url || img,
          title: img.title || `${pro.name} Portfolio #${i + 1}`,
          category: pro.category,
        }))}
        initialIndex={activeLightboxIndex}
      />
    </div>
  );
};

export default ProfessionalProfilePage;
