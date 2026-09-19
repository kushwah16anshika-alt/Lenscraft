import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Star,
  CheckCircle2,
  Calendar,
  MapPin,
  Camera,
  Video,
  Film,
  Wand2,
  ArrowUpRight,
  ShieldCheck,
  Search,
  Quote,
  Clock,
  Layers,
  Check,
} from 'lucide-react';
import ProfessionalCard from '../../components/cards/ProfessionalCard';
import LightboxModal from '../../components/common/LightboxModal';
import CreatorOnboardingModal from '../../components/common/CreatorOnboardingModal';
import AiMatchmakerModal from '../../components/common/AiMatchmakerModal';
import BookingModal from '../../components/common/BookingModal';
import { usePlatform } from '../../context/PlatformContext';

const HomePage = () => {
  const { professionals, createBooking, setSearchFilters } = usePlatform();
  const navigate = useNavigate();

  // Modals
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(0);
  const [creatorModalOpen, setCreatorModalOpen] = useState(false);
  const [matchmakerOpen, setMatchmakerOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedProForBooking, setSelectedProForBooking] = useState(null);

  // Search Bar state
  const [searchWhere, setSearchWhere] = useState('');
  const [searchWhat, setSearchWhat] = useState('');
  const [searchWhen, setSearchWhen] = useState('');

  // Category filter for Meet The Creators
  const [creatorFilter, setCreatorFilter] = useState('all');

  // Interactive Shoot Planner state
  const [selectedPlannerPro, setSelectedPlannerPro] = useState(professionals[0]?.id || 'pro-1');
  const [selectedPlannerService, setSelectedPlannerService] = useState('Wedding Photography');
  const [selectedPlannerDate, setSelectedPlannerDate] = useState('2026-10-24');
  const [selectedPlannerPackage, setSelectedPlannerPackage] = useState('signature');
  const [plannerSuccess, setPlannerSuccess] = useState(false);

  // Handle hero search submit
  const handleHeroSearch = (e) => {
    e?.preventDefault();
    setSearchFilters(prev => ({
      ...prev,
      city: searchWhere,
      service: searchWhat,
      date: searchWhen,
    }));
    navigate('/explore');
  };

  // 1. VISUAL CATEGORIES DATA
  const visualCategories = [
    {
      id: 'cat-photo',
      title: 'PHOTOGRAPHY',
      tagline: 'Capture the story.',
      description: 'Weddings, intimate portraits, fashion editorials, and commercial campaigns captured by seasoned visual storytellers.',
      image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1000&q=85',
      path: '/photographers',
      stats: '140+ Curated Photographers',
    },
    {
      id: 'cat-video',
      title: 'VIDEOGRAPHY',
      tagline: 'Turn moments into motion.',
      description: '4K cinema, anamorphic lenses, drone fly-throughs, and festival-grade cinematography that evoke raw emotion.',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1000&q=85',
      path: '/videographers',
      stats: '85+ Cinema DPs',
    },
    {
      id: 'cat-photo-edit',
      title: 'PHOTO EDITING',
      tagline: 'Perfect every frame.',
      description: 'High-end frequency separation, custom film LUT color grading, and meticulous background composition.',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=85',
      path: '/editors?type=photo',
      stats: '60+ Master Colorists',
    },
    {
      id: 'cat-video-edit',
      title: 'VIDEO EDITING',
      tagline: 'Shape the final cut.',
      description: 'Rhythmic pacing, spatial sound design, VFX, and viral reel cuts engineered for maximum impact.',
      image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1000&q=85',
      path: '/editors?type=video',
      stats: '50+ Post-Production Artists',
    },
  ];

  // 2. STORIES WORTH REMEMBERING (EDITORIAL SHOWCASES)
  const editorialStories = [
    {
      id: 'story-1',
      type: 'Wedding Story',
      title: 'Sunset Palace Nuptials in Udaipur',
      creator: 'Arjun Mehta',
      location: 'Udaipur, Rajasthan',
      year: '2026',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
      quote: 'An ethereal three-day celebration where lake reflections met royal heritage architecture.',
      stats: '450 Edited Frames · 4K Cinema Film',
    },
    {
      id: 'story-2',
      type: 'Fashion Shoot',
      title: 'Vogue Couture: Monochromatic Silk',
      creator: 'Rohan Deshmukh',
      location: 'Mumbai, Maharashtra',
      year: '2026',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85',
      quote: 'Sculptural lighting paired with high-contrast Kodak Tri-X 400 grain emulation.',
      stats: '18 Magazine Covers · Billboard Master',
    },
    {
      id: 'story-3',
      type: 'Travel Story',
      title: 'Glacial Horizons & Starlit Peaks',
      creator: 'Kabir Varma',
      location: 'Ladakh, Himalayas',
      year: '2026',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=85',
      quote: 'High altitude drone ascents across Pangong Tso during the fleeting golden hour.',
      stats: 'Red Monstro 8K · Polarized Stills',
    },
    {
      id: 'story-4',
      type: 'Product Campaign',
      title: 'Swiss Horology & Raw Granite',
      creator: 'Vikramaditya Roy',
      location: 'Bengaluru, India',
      year: '2026',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85',
      quote: 'Macro focus stacking capturing sapphire crystal bevels and mechanical movements.',
      stats: 'Commercial Licensing · 100MP Hasselblad',
    },
  ];

  // 3. PACKAGES DATA
  const packagesList = [
    {
      id: 'pkg-essential',
      tier: 'ESSENTIAL',
      price: 15000,
      hours: '4 Hours Coverage',
      crew: '1 Dedicated Lead Photographer',
      deliverables: '100 Curated & Color-Graded Photos',
      turnaround: '5 Days Delivery',
      ideal: 'Pre-wedding shoots, executive portraits, intimate birthday celebrations.',
      features: [
        '4 Hours on-location shoot',
        '100 High-resolution edited images',
        'Full commercial printing rights',
        'Private cloud proofing gallery',
        'Next-day teaser (5 photos)',
      ],
      featured: false,
    },
    {
      id: 'pkg-signature',
      tier: 'SIGNATURE',
      price: 28000,
      hours: '8 Hours Coverage',
      crew: '2 Master Photographers',
      deliverables: '300 Edited Photos + Premium Leather Album',
      turnaround: '7 Days Delivery',
      ideal: 'Full-day weddings, luxury brand launches, fashion lookbooks.',
      features: [
        '8 Hours continuous multi-angle coverage',
        '300 Master color-graded photos',
        'Handmade Italian leather keepsake album',
        'Drone aerial stills included',
        'Rush 48-hour preview selection',
        'RAW archival backup link',
      ],
      featured: true,
    },
    {
      id: 'pkg-editorial',
      tier: 'EDITORIAL',
      price: 45000,
      hours: 'Full Day Coverage',
      crew: '2 Photographers + 1 Cinema DP',
      deliverables: 'Full Stills Master + 4K Highlight Film',
      turnaround: '10 Days Delivery',
      ideal: 'Royal weddings, multi-day destination events, comprehensive campaigns.',
      features: [
        'Full day unlimited shooting hours',
        'Complete photo master suite (500+ files)',
        '3-5 Min 4K cinematic film & teaser reels',
        'Licensed soundtrack scoring',
        'Custom engraved wooden USB box',
        'Direct consultation with Creative Director',
      ],
      featured: false,
    },
  ];

  // 4. REALISTIC REVIEWS DATA
  const customerReviews = [
    {
      id: 'rev-1',
      author: 'Ananya & Siddharth Kapoor',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      eventType: '3-Day Wedding Ceremony',
      creator: 'Arjun Mehta',
      date: '14 August 2026',
      review:
        'Arjun captured the quiet, unscripted glances that defined our wedding weekend in Udaipur. Every single frame feels like an editorial spread in a fine-art publication.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'rev-2',
      author: 'Devika Singhania',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      eventType: 'Autumn Fashion Campaign',
      creator: 'Rohan Deshmukh',
      date: '28 July 2026',
      review:
        'We booked Rohan for our autumn luxury capsule launch. The lighting precision and model direction exceeded our international agency standards. Delivered 3 days ahead of schedule.',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'rev-3',
      author: 'Sameer Sen',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      eventType: 'Himalayan Expedition Documentary',
      creator: 'Kabir Varma',
      date: '02 September 2026',
      review:
        'Kabir’s drone handling and color grading brought raw Himalayan textures to life in 4K. The escrow booking on Lenscraft gave us total peace of mind for such a remote shoot.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    },
  ];

  // Filter creators for the section
  const filteredCreators = professionals.filter(p => {
    if (creatorFilter === 'all') return true;
    if (creatorFilter === 'photographers') return p.role === 'photographer' || p.category?.toLowerCase().includes('photo');
    if (creatorFilter === 'videographers') return p.role === 'videographer' || p.category?.toLowerCase().includes('video');
    if (creatorFilter === 'editors') return p.role === 'editor' || p.category?.toLowerCase().includes('edit');
    return true;
  });

  const selectedPlannerCreatorObj = professionals.find(p => p.id === selectedPlannerPro) || professionals[0];

  const handlePlannerSubmit = (e) => {
    e.preventDefault();
    createBooking({
      professionalId: selectedPlannerPro,
      professionalName: selectedPlannerCreatorObj?.name || 'Arjun Mehta',
      serviceType: selectedPlannerService,
      date: selectedPlannerDate,
      packageType: selectedPlannerPackage,
      location: 'Udaipur, Rajasthan',
      price: selectedPlannerPackage === 'signature' ? 28000 : selectedPlannerPackage === 'editorial' ? 45000 : 15000,
    });
    setPlannerSuccess(true);
    setTimeout(() => {
      setPlannerSuccess(false);
      navigate('/user/dashboard?tab=bookings');
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#FBF9F5] selection:bg-[#C5A059]/30 selection:text-[#FFF6E5]">
      
      {/* ─────────────────────────────────────────────────────────────
          1. CINEMATIC EDITORIAL HERO SECTION
          ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex flex-col justify-between pt-12 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* Subtle Ambient Background Lighting */}
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40 ambient-gold-glow" />
        
        {/* Background Editorial Watermark / Year */}
        <div className="absolute top-20 right-8 text-[120px] sm:text-[200px] font-editorial font-bold text-white/[0.02] select-none pointer-events-none leading-none">
          2026
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-center">
          
          {/* Top Tagline */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-[#C5A059]" />
            <p className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-medium">
              CURATED CREATIVE MARKETPLACE
            </p>
          </div>

          {/* Large Magazine Display Title */}
          <div className="max-w-5xl">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-editorial font-medium tracking-tight text-[#FBF9F5] uppercase leading-[0.95] mb-6">
              CAPTURE THE MOMENT.
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-editorial italic text-[#DFCA9B] max-w-3xl mb-4">
              Discover the creative behind your next story.
            </p>
            <p className="text-sm sm:text-base text-[#A39E93] max-w-2xl font-normal leading-relaxed mb-10">
              Discover photographers, videographers and editors who turn moments into stories. From royal destination weddings to high-fashion lookbooks and master cinematic post-production.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-14">
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 px-7 py-3.5 gold-btn text-xs uppercase tracking-widest font-bold"
              >
                <span>Explore Creators</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => setCreatorModalOpen(true)}
                className="inline-flex items-center gap-2 px-7 py-3.5 btn-secondary-luxury text-xs uppercase tracking-widest font-semibold"
              >
                <span>Join as Creator</span>
              </button>

              <button
                type="button"
                onClick={() => setMatchmakerOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-3.5 text-xs text-[#DFCA9B] hover:text-white transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="underline underline-offset-4 decoration-[#C5A059]/40">AI Creator Matchmaker</span>
              </button>
            </div>
          </div>

          {/* Embedded Search Interface ("Where? What do you need? When? [ Search ]") */}
          <div className="w-full max-w-5xl bg-[#111111]/95 border border-[#262626] p-3 sm:p-4 rounded-xs shadow-2xl backdrop-blur-md">
            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              
              {/* Where? */}
              <div className="sm:col-span-4 flex items-center gap-3 px-3 py-2.5 bg-[#171717] border border-[#262626] rounded-xs focus-within:border-[#C5A059]">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" />
                <div className="w-full text-left">
                  <label className="block text-[9px] uppercase tracking-wider text-[#A39E93] font-semibold">Where?</label>
                  <input
                    type="text"
                    value={searchWhere}
                    onChange={(e) => setSearchWhere(e.target.value)}
                    placeholder="Indore, Mumbai, Udaipur..."
                    className="w-full bg-transparent text-xs sm:text-sm text-[#FBF9F5] placeholder-[#6B665E] focus:outline-none"
                  />
                </div>
              </div>

              {/* What do you need? */}
              <div className="sm:col-span-4 flex items-center gap-3 px-3 py-2.5 bg-[#171717] border border-[#262626] rounded-xs focus-within:border-[#C5A059]">
                <Camera className="w-4 h-4 text-[#C5A059] shrink-0" />
                <div className="w-full text-left">
                  <label className="block text-[9px] uppercase tracking-wider text-[#A39E93] font-semibold">What do you need?</label>
                  <select
                    value={searchWhat}
                    onChange={(e) => setSearchWhat(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm text-[#FBF9F5] focus:outline-none cursor-pointer"
                  >
                    <option value="" className="bg-[#171717] text-[#FBF9F5]">All Creative Disciplines</option>
                    <option value="Wedding Photographer" className="bg-[#171717] text-[#FBF9F5]">Wedding Photography</option>
                    <option value="Fashion Photographer" className="bg-[#171717] text-[#FBF9F5]">Fashion & Editorial</option>
                    <option value="Cinematographer" className="bg-[#171717] text-[#FBF9F5]">Cinematography / Videography</option>
                    <option value="Photo Editor" className="bg-[#171717] text-[#FBF9F5]">Photo Colorist & Retoucher</option>
                    <option value="Video Editor" className="bg-[#171717] text-[#FBF9F5]">Video & Reel Editor</option>
                    <option value="Drone Cinematographer" className="bg-[#171717] text-[#FBF9F5]">Drone & FPV Aerial</option>
                  </select>
                </div>
              </div>

              {/* When? */}
              <div className="sm:col-span-2 flex items-center gap-3 px-3 py-2.5 bg-[#171717] border border-[#262626] rounded-xs focus-within:border-[#C5A059]">
                <Calendar className="w-4 h-4 text-[#C5A059] shrink-0" />
                <div className="w-full text-left">
                  <label className="block text-[9px] uppercase tracking-wider text-[#A39E93] font-semibold">When?</label>
                  <input
                    type="date"
                    value={searchWhen}
                    onChange={(e) => setSearchWhen(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm text-[#FBF9F5] focus:outline-none"
                  />
                </div>
              </div>

              {/* Search Submit */}
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 gold-btn text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search</span>
                </button>
              </div>

            </form>
          </div>

        </div>

        {/* Hero Bottom Composition Ticker */}
        <div className="max-w-7xl mx-auto w-full mt-10 pt-6 border-t border-[#262626] flex flex-wrap items-center justify-between gap-6 text-xs text-[#A39E93]">
          <div className="flex items-center gap-8 font-mono">
            <span><strong className="text-[#FBF9F5]">100%</strong> Verified Creators</span>
            <span><strong className="text-[#FBF9F5]">4.9/5</strong> Client Satisfaction</span>
            <span><strong className="text-[#FBF9F5]">Escrow</strong> Secure Payment</span>
          </div>
          <div className="flex items-center gap-2 text-[#C5A059]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured in Vogue, Architectural Digest, Harper's Bazaar</span>
          </div>
        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. VISUAL CATEGORY SECTION (LARGE PHOTOGRAPHY TILES)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[#262626]">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium mb-2">
                DISCIPLINES & EXPERTISE
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-medium text-[#FBF9F5] uppercase">
                EXPLORE BY CRAFT
              </h2>
            </div>
            <p className="text-sm text-[#A39E93] max-w-md mt-4 md:mt-0">
              Each discipline is curated for uncompromising craft, master equipment standards, and distinct aesthetic voice.
            </p>
          </div>

          {/* 4 Large Visual Category Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visualCategories.map((cat) => (
              <Link
                key={cat.id}
                to={cat.path}
                className="group relative h-[360px] sm:h-[420px] overflow-hidden rounded-xs border border-[#262626] hover:border-[#C5A059] transition-all duration-700 block text-left"
              >
                {/* Background Image with Zoom */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-75 group-hover:brightness-90"
                  loading="lazy"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/60 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-5 left-5">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 bg-[#080808]/85 backdrop-blur-md text-[#DFCA9B] border border-[#262626]">
                    {cat.stats}
                  </span>
                </div>

                {/* Bottom Content with Text Movement & Arrow Animation */}
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                  <div className="space-y-1.5 transition-transform duration-500 group-hover:-translate-y-1">
                    <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-[#FBF9F5] tracking-wide">
                      {cat.title}
                    </h3>
                    <p className="text-base font-editorial italic text-[#DFCA9B]">
                      {cat.tagline}
                    </p>
                    <p className="text-xs text-[#A39E93] line-clamp-2 max-w-md pt-1">
                      {cat.description}
                    </p>
                  </div>

                  {/* Arrow Action */}
                  <div className="w-10 h-10 rounded-full bg-[#111111] border border-[#262626] group-hover:border-[#C5A059] group-hover:bg-[#C5A059] text-[#FBF9F5] group-hover:text-[#080808] flex items-center justify-center transition-all duration-300 shrink-0">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. FEATURED CREATORS SECTION (EDITORIAL MASONRY GRID)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[#262626] bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium mb-2">
                VERIFIED TALENT
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-medium text-[#FBF9F5] uppercase">
                MEET THE CREATORS
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
              {[
                { id: 'all', label: 'All Disciplines' },
                { id: 'photographers', label: 'Photographers' },
                { id: 'videographers', label: 'Videographers' },
                { id: 'editors', label: 'Editors' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setCreatorFilter(f.id)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors ${
                    creatorFilter === f.id
                      ? 'bg-[#FBF9F5] text-[#080808]'
                      : 'bg-[#171717] text-[#A39E93] hover:text-[#FBF9F5] border border-[#262626]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Asymmetric / Editorial Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCreators.slice(0, 6).map((creator, idx) => (
              <ProfessionalCard
                key={creator.id}
                professional={creator}
                aspectRatio={idx === 0 || idx === 3 ? 'aspect-[3/4]' : 'aspect-[4/5]'}
              />
            ))}
          </div>

          {/* View All CTA */}
          <div className="text-center mt-12">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-8 py-4 btn-secondary-luxury text-xs uppercase tracking-widest font-semibold"
            >
              <span>Explore All {professionals.length} Verified Creators</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. STORIES / EDITORIAL SHOWCASE SECTION
          ───────────────────────────────────────────────────────────── */}
      <section id="stories" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[#262626]">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium mb-2">
                EDITORIAL COMMUNITY
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-medium text-[#FBF9F5] uppercase">
                STORIES WORTH REMEMBERING
              </h2>
            </div>
            <p className="text-sm text-[#A39E93] max-w-md mt-4 md:mt-0">
              A curated look into real commercial assignments, royal nuptials, and documentary expeditions completed via Lenscraft.
            </p>
          </div>

          {/* 4 Large Editorial Stories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {editorialStories.map((story) => (
              <div
                key={story.id}
                className="group relative bg-[#111111] border border-[#262626] hover:border-[#C5A059]/60 rounded-xs overflow-hidden transition-all duration-500 flex flex-col justify-between"
              >
                {/* Large Editorial Image */}
                <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-black/20" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 bg-[#080808]/90 text-[#DFCA9B] border border-[#262626]">
                      {story.type}
                    </span>
                  </div>

                  <div className="absolute bottom-4 right-4 text-xs font-mono text-[#A39E93] bg-[#080808]/80 px-2.5 py-1 border border-[#262626]">
                    {story.stats}
                  </div>
                </div>

                {/* Story Metadata */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#A39E93] font-mono">
                    <span>{story.location}</span>
                    <span>{story.year}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-editorial font-semibold text-[#FBF9F5] group-hover:text-[#DFCA9B] transition-colors">
                    {story.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#A39E93] italic leading-relaxed">
                    "{story.quote}"
                  </p>

                  <div className="pt-4 border-t border-[#262626] flex items-center justify-between">
                    <span className="text-xs text-[#EAE6DF]">
                      Lead Artist: <strong className="text-[#FBF9F5]">{story.creator}</strong>
                    </span>
                    
                    <Link
                      to="/explore"
                      className="inline-flex items-center gap-1 text-xs text-[#C5A059] hover:text-[#DFCA9B] font-medium uppercase tracking-wider"
                    >
                      <span>View Story</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. PACKAGES & TRANSPARENT PRICING
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[#262626] bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium mb-2">
              CURATED PACKAGES
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-medium text-[#FBF9F5] uppercase mb-4">
              STANDARDIZED EXCELLENCE
            </h2>
            <p className="text-sm text-[#A39E93]">
              Transparent baseline packages designed with clear deliverables, guaranteed turnarounds, and escrow milestone security.
            </p>
          </div>

          {/* 3 Package Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packagesList.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-xs border transition-all duration-300 ${
                  pkg.featured
                    ? 'bg-[#171717] border-[#C5A059] shadow-2xl ring-1 ring-[#C5A059]/40'
                    : 'bg-[#111111] border-[#262626] hover:border-[#A39E93]'
                }`}
              >
                {pkg.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#C5A059] text-[#080808] text-[9px] font-mono uppercase tracking-widest font-bold">
                    MOST POPULAR
                  </div>
                )}

                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-[#C5A059] mb-1">
                    {pkg.tier}
                  </p>
                  <div className="flex items-baseline gap-1 my-3">
                    <span className="text-3xl sm:text-4xl font-editorial font-bold text-[#FBF9F5]">
                      ₹{pkg.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-[#A39E93]">/ event</span>
                  </div>

                  <p className="text-xs text-[#A39E93] pb-4 border-b border-[#262626]">
                    {pkg.ideal}
                  </p>

                  <div className="py-4 space-y-2 text-xs font-mono text-[#EAE6DF] border-b border-[#262626]">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{pkg.hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Camera className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{pkg.crew}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{pkg.deliverables}</span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="py-5 space-y-2.5">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#A39E93]">
                        <Check className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPlannerPackage(pkg.id.replace('pkg-', ''));
                      const el = document.getElementById('plan-shoot');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full py-3 px-4 text-xs uppercase tracking-widest font-semibold rounded-xs transition-all ${
                      pkg.featured ? 'gold-btn' : 'btn-secondary-luxury'
                    }`}
                  >
                    Choose Package
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. INTERACTIVE SHOOT PLANNER
          ───────────────────────────────────────────────────────────── */}
      <section id="plan-shoot" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[#262626]">
        <div className="max-w-5xl mx-auto bg-[#111111] border border-[#262626] p-6 sm:p-10 rounded-xs shadow-2xl">
          
          <div className="max-w-2xl mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium mb-1">
              DIRECT BOOKING WORKFLOW
            </p>
            <h2 className="text-2xl sm:text-3xl font-editorial text-[#FBF9F5] uppercase">
              PLAN YOUR NEXT CREATIVE SHOOT
            </h2>
            <p className="text-xs sm:text-sm text-[#A39E93] mt-2">
              Select your master creator, preferred coverage tier, and event date to initiate escrow-backed booking.
            </p>
          </div>

          <form onSubmit={handlePlannerSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Creator Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#A39E93] font-medium mb-1.5">
                  Select Creator
                </label>
                <select
                  value={selectedPlannerPro}
                  onChange={(e) => setSelectedPlannerPro(e.target.value)}
                  className="w-full p-3 bg-[#171717] border border-[#262626] focus:border-[#C5A059] text-xs sm:text-sm text-[#FBF9F5] rounded-xs focus:outline-none"
                >
                  {professionals.map((pro) => (
                    <option key={pro.id} value={pro.id} className="bg-[#171717] text-[#FBF9F5]">
                      {pro.name} — {pro.category} ({pro.location})
                    </option>
                  ))}
                </select>
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#A39E93] font-medium mb-1.5">
                  Service Type
                </label>
                <select
                  value={selectedPlannerService}
                  onChange={(e) => setSelectedPlannerService(e.target.value)}
                  className="w-full p-3 bg-[#171717] border border-[#262626] focus:border-[#C5A059] text-xs sm:text-sm text-[#FBF9F5] rounded-xs focus:outline-none"
                >
                  <option value="Wedding Photography">Wedding Photography</option>
                  <option value="Pre-Wedding Film">Pre-Wedding Film & Stills</option>
                  <option value="Fashion Lookbook">Fashion Lookbook</option>
                  <option value="Commercial Product">Commercial Product Campaign</option>
                  <option value="Editorial Portrait">Editorial Portrait Session</option>
                  <option value="Music Video Production">Music Video & Post-Production</option>
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#A39E93] font-medium mb-1.5">
                  Shoot Date
                </label>
                <input
                  type="date"
                  value={selectedPlannerDate}
                  onChange={(e) => setSelectedPlannerDate(e.target.value)}
                  className="w-full p-3 bg-[#171717] border border-[#262626] focus:border-[#C5A059] text-xs sm:text-sm text-[#FBF9F5] rounded-xs focus:outline-none"
                />
              </div>

              {/* Package Tier */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#A39E93] font-medium mb-1.5">
                  Package Tier
                </label>
                <select
                  value={selectedPlannerPackage}
                  onChange={(e) => setSelectedPlannerPackage(e.target.value)}
                  className="w-full p-3 bg-[#171717] border border-[#262626] focus:border-[#C5A059] text-xs sm:text-sm text-[#FBF9F5] rounded-xs focus:outline-none"
                >
                  <option value="essential">Essential Package — ₹15,000</option>
                  <option value="signature">Signature Package (Recommended) — ₹28,000</option>
                  <option value="editorial">Editorial Master Package — ₹45,000</option>
                </select>
              </div>

            </div>

            {/* Total Calculation & CTA */}
            <div className="pt-4 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <p className="text-xs text-[#A39E93]">Calculated Escrow Total</p>
                <p className="text-2xl font-editorial font-bold text-[#FBF9F5]">
                  ₹{selectedPlannerPackage === 'signature' ? '28,000' : selectedPlannerPackage === 'editorial' ? '45,000' : '15,000'}
                  <span className="text-xs font-sans text-[#A39E93] font-normal ml-2">(Includes 18% GST & Insured Escrow)</span>
                </p>
              </div>

              <button
                type="submit"
                disabled={plannerSuccess}
                className="w-full sm:w-auto px-8 py-3.5 gold-btn text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2"
              >
                {plannerSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-950" />
                    <span>Booking Initialized...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Schedule Shoot</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. HOW IT WORKS (EDITORIAL TIMELINE)
          ───────────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[#262626] bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium mb-2">
              SEAMLESS CONCIERGE
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-medium text-[#FBF9F5] uppercase mb-4">
              HOW LENSCRAFT WORKS
            </h2>
            <p className="text-sm text-[#A39E93]">
              From browsing verified portfolios to receiving high-resolution masters in your private cloud gallery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                step: '01',
                title: 'Discover & Compare',
                desc: 'Filter by style, event type, location, and verified visual portfolios.',
              },
              {
                step: '02',
                title: 'Select Date & Package',
                desc: 'Pick transparent coverage hours with instant pricing breakdown.',
              },
              {
                step: '03',
                title: 'Direct Collaboration',
                desc: 'Align on mood boards, shot lists, and gear logistics directly with your creator.',
              },
              {
                step: '04',
                title: 'Secure Escrow',
                desc: 'Funds stay protected until you review and approve the final delivered files.',
              },
              {
                step: '05',
                title: 'Master Delivery',
                desc: 'Download raw TIFFs, color-graded JPEGs, and 4K cinema masters in one click.',
              },
            ].map((s) => (
              <div key={s.step} className="p-6 bg-[#111111] border border-[#262626] rounded-xs text-left relative">
                <span className="text-3xl font-editorial font-bold text-[#C5A059]/40 mb-3 block">
                  {s.step}
                </span>
                <h3 className="text-base font-editorial font-semibold text-[#FBF9F5] mb-1.5">
                  {s.title}
                </h3>
                <p className="text-xs text-[#A39E93] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. REALISTIC REVIEWS UI
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[#262626]">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium mb-2">
                VERIFIED EXPERIENCES
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-medium text-[#FBF9F5] uppercase">
                TESTIMONIALS & REVIEWS
              </h2>
            </div>
            <div className="flex items-center gap-2 mt-4 md:mt-0 text-xs font-mono text-[#DFCA9B]">
              <div className="flex text-[#C5A059]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C5A059]" />
                ))}
              </div>
              <span>4.9 / 5 Across 2,400+ Completed Shoots</span>
            </div>
          </div>

          {/* 3 Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {customerReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#111111] border border-[#262626] rounded-xs p-6 flex flex-col justify-between text-left relative"
              >
                <div>
                  {/* Rating + Event Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-[#C5A059]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#C5A059]" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#A39E93] bg-[#171717] px-2 py-0.5 border border-[#262626]">
                      {rev.eventType}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-[#EAE6DF] leading-relaxed mb-6">
                    "{rev.review}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-[#262626] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.author}
                      className="w-10 h-10 rounded-full object-cover border border-[#262626]"
                    />
                    <div>
                      <h4 className="text-xs font-semibold text-[#FBF9F5]">{rev.author}</h4>
                      <p className="text-[10px] text-[#A39E93]">Creator: <span className="text-[#C5A059]">{rev.creator}</span></p>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#6B665E] font-mono">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Creator Application Modal */}
      <CreatorOnboardingModal
        isOpen={creatorModalOpen}
        onClose={() => setCreatorModalOpen(false)}
      />

      {/* AI Matchmaker Modal */}
      <AiMatchmakerModal
        isOpen={matchmakerOpen}
        onClose={() => setMatchmakerOpen(false)}
      />

    </div>
  );
};

export default HomePage;
