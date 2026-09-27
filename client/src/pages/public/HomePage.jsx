import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  Camera,
  Film,
  Wand2,
  Video,
  Check,
  Clock,
  ArrowUpRight,
  Heart,
  Maximize2,
  ChevronRight,
  ChevronLeft,
  Award,
  Layers,
  Compass,
  Users,
  Eye,
  SlidersHorizontal,
  CheckCircle2,
  Globe2,
  MessageSquare,
  Image as ImageIcon,
  RotateCcw,
  DollarSign,
  Filter,
  X,
} from 'lucide-react';
import ProfessionalCard from '../../components/cards/ProfessionalCard';
import LightboxModal from '../../components/common/LightboxModal';
import CreatorOnboardingModal from '../../components/common/CreatorOnboardingModal';
import AiMatchmakerModal from '../../components/common/AiMatchmakerModal';
import BookingModal from '../../components/common/BookingModal';
import DirectChatModal from '../../components/common/DirectChatModal';
import CinematicCosmosBackground from '../../components/common/CinematicCosmosBackground';
import { usePlatform } from '../../context/PlatformContext';
import { MOCK_PROFESSIONALS } from '../../constants/mockData';

// 1. Explore by Event ("Curated for Every Milestone") - 9 Event Types
const eventTypesList = [
  {
    id: 'wedding',
    title: 'Wedding',
    subtitle: 'Weddings & Receptions',
    tagline: 'Royal rituals, sacred vows & timeless family heirlooms',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85',
    link: '/photographers?category=Wedding',
    creatorsCount: '48+ Studios',
  },
  {
    id: 'pre-wedding',
    title: 'Pre-Wedding',
    subtitle: 'Pre-Wedding & Engagements',
    tagline: 'Sunset romance across heritage palaces and golden dunes',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=85',
    link: '/photographers?category=Wedding',
    creatorsCount: '36+ Studios',
  },
  {
    id: 'birthday',
    title: 'Birthday',
    subtitle: 'Milestone Birthdays & Jubilees',
    tagline: 'Vibrant celebration candid portraits and joy-filled frames',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=85',
    link: '/photographers?category=Event',
    creatorsCount: '22+ Studios',
  },
  {
    id: 'corporate',
    title: 'Corporate',
    subtitle: 'Corporate Galas & Summits',
    tagline: 'Keynotes, executive team portraits & international conferences',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=85',
    link: '/photographers?category=Event',
    creatorsCount: '30+ Studios',
  },
  {
    id: 'fashion',
    title: 'Fashion',
    subtitle: 'Fashion & Runway Lookbooks',
    tagline: 'High-concept editorial styling, couture & brand lookbooks',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=85',
    link: '/photographers?category=Fashion',
    creatorsCount: '28+ Studios',
  },
  {
    id: 'product',
    title: 'Product',
    subtitle: 'Product & Haute Horlogerie',
    tagline: 'Precision studio lighting, macro textures & luxury campaigns',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=85',
    link: '/photographers?category=Product',
    creatorsCount: '25+ Studios',
  },
  {
    id: 'portrait',
    title: 'Portrait',
    subtitle: 'Portraits & Executive Branding',
    tagline: 'Cinematic lighting for founders, artists & cultural leaders',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85',
    link: '/photographers?category=Portrait',
    creatorsCount: '42+ Studios',
  },
  {
    id: 'travel',
    title: 'Travel',
    subtitle: 'Travel & Expeditions',
    tagline: 'Himalayan adventures, coastlines & outdoor documentary films',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85',
    link: '/photographers?category=Travel',
    creatorsCount: '20+ Studios',
  },
  {
    id: 'events',
    title: 'Events',
    subtitle: 'Festivals & Cultural Galas',
    tagline: 'High-energy concerts, private soirees & cultural celebrations',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=85',
    link: '/photographers?category=Event',
    creatorsCount: '34+ Studios',
  },
];

// 2. Discipline Deep-Dive: Photography / Videography / Editing
const disciplinesList = [
  {
    id: 'photography',
    title: 'Master Photography',
    icon: Camera,
    tagline: 'Candid Romance · Royal Rituals · Editorial Portraits · Commercial Campaigns',
    description: 'Connect with seasoned photographers equipped with full-frame mirrorless gear, specialized prime lenses, and artistic light shapers who immortalize every emotion in stunning high resolution.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85',
    link: '/photographers',
    badge: '120+ Photographers',
    features: ['4K RAW Stills & Fine Art Retouching', 'Dedicated Secondary Shooter', 'Online Cloud Gallery Backup', 'Personal & Commercial Rights'],
  },
  {
    id: 'videography',
    title: '4K Cinematic Videography',
    icon: Video,
    tagline: 'Story Films · 4K Cinema Drones · Wedding Teasers · Brand Commercials',
    description: 'Immerse in moving visual art. Licensed cinema drone pilots and film directors capture your moments with RED, Sony FX series, and ARRI cinema workflows for unforgettable films.',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1000&q=85',
    link: '/videographers',
    badge: '65+ Cinematographers',
    features: ['4K/6K Cinema Camera Workflows', 'Licensed FPV & Drone Aerials', 'Multi-Camera Live Ceremony Audio', 'ProRes Masters on SSD'],
  },
  {
    id: 'editing',
    title: 'Video & Photo Editing',
    icon: Wand2,
    tagline: 'DaVinci Color Grading · Beauty Retouching · Viral Instagram Reels',
    description: 'Transform raw captures into magazine-ready masterpieces. Expert colorists and video editors polish frequency separation, skin tones, kinetic subtitles, and Hollywood color palettes.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=85',
    link: '/editors',
    badge: '45+ Colorists & Editors',
    features: ['Hollywood-Grade DaVinci Color Space', 'Kinetic Reel & Short-Form Subtitles', 'Frequency Separation Skin Retouching', 'Fast 48-Hour Turnaround Available'],
  },
];

// 3. Trending Portfolios Masonry Gallery
const portfolioGallery = [
  {
    id: 'port-1',
    title: 'Echoes of the Royal Palace',
    category: 'Weddings',
    creator: 'Aarav Mehta',
    location: 'Udaipur, Rajasthan',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'port-2',
    title: 'Monochrome Haute Couture',
    category: 'Fashion',
    creator: 'Nisha Singhania',
    location: 'Mumbai, Maharashtra',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'port-3',
    title: 'Spiti Valley Starlight',
    category: 'Travel',
    creator: 'Kabir Varma',
    location: 'Himalayas, India',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'port-4',
    title: 'Ethereal Studio Gaze',
    category: 'Portraits',
    creator: 'Ananya Deshmukh',
    location: 'Pune, Maharashtra',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'port-5',
    title: 'Titanium Chronograph Campaign',
    category: 'Products',
    creator: 'Vikramaditya Roy',
    location: 'Bengaluru, Karnataka',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'port-6',
    title: 'Dusk Symphony Gala',
    category: 'Events',
    creator: 'Rohit Kulkarni',
    location: 'Delhi NCR',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'port-7',
    title: 'Solitary Alpine Peak',
    category: 'Nature',
    creator: 'Pooja Bhatt',
    location: 'Manali, Himachal',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85',
  },
];

// 4. Client Testimonials
const testimonialsList = [
  {
    id: 'rev-1',
    name: 'Rhea & Devansh Kapoor',
    category: 'Wedding Photography',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    previewImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80',
    location: 'Udaipur, Rajasthan',
    review:
      'Booking our wedding team through LensCraft felt like stepping into an editorial magazine. The atmospheric lighting, candid tears, and cinematic color grading exceeded every expectation.',
  },
  {
    id: 'rev-2',
    name: 'Sameer Verma',
    category: 'Fashion Lookbook Campaign',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    previewImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=400&q=80',
    location: 'Mumbai, Maharashtra',
    review:
      'The speed, visual clarity, and talent caliber on LensCraft are extraordinary. We aligned on moodboards in hours and the editorial spread was praised across our international creative board.',
  },
  {
    id: 'rev-3',
    name: 'Aanya & Siddharth',
    category: 'Destination Pre-Wedding',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    previewImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    location: 'Spiti Valley, Himalayas',
    review:
      'Kabir’s vision during our mountain shoot was mesmerizing. The starry night captures, drone cinematography, and candid intimacy will remain our family treasures forever.',
  },
];

const HomePage = () => {
  const { professionals, favorites, toggleFavorite } = usePlatform();
  const navigate = useNavigate();

  // ─────────────────────────────────────────────────────────────
  // 6-FIELD "FIND YOUR PHOTOGRAPHER" SEARCH STATE
  // ─────────────────────────────────────────────────────────────
  const [creatorType, setCreatorType] = useState('all');
  const [locationQuery, setLocationQuery] = useState('');
  const [eventType, setEventType] = useState('all');
  const [eventDate, setEventDate] = useState('');
  const [budgetTier, setBudgetTier] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Tabs & Modals
  const [featuredTab, setFeaturedTab] = useState('all');
  const [portfolioFilter, setPortfolioFilter] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Global Modals
  const [creatorModalOpen, setCreatorModalOpen] = useState(false);
  const [matchmakerOpen, setMatchmakerOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedBookingPro, setSelectedBookingPro] = useState(professionals[0] || MOCK_PROFESSIONALS[0]);

  // Handle Search Filtering
  const searchResults = useMemo(() => {
    return professionals
      .filter((p) => {
        // 1. Creator Type Filter
        if (creatorType !== 'all') {
          const roleMatch = p.role === creatorType;
          const categoryMatch = p.category?.toLowerCase().includes(creatorType.toLowerCase());
          if (!roleMatch && !categoryMatch) return false;
        }

        // 2. Location Filter
        if (locationQuery.trim()) {
          const query = locationQuery.toLowerCase();
          const cityStr = typeof p.location === 'object' ? p.location.city || '' : p.location || '';
          const stateStr = typeof p.location === 'object' ? p.location.state || '' : '';
          const matchesLoc =
            cityStr.toLowerCase().includes(query) ||
            stateStr.toLowerCase().includes(query) ||
            p.name.toLowerCase().includes(query);
          if (!matchesLoc) return false;
        }

        // 3. Event Type Filter
        if (eventType !== 'all') {
          const evtLower = eventType.toLowerCase();
          const matchesCategory = p.category?.toLowerCase().includes(evtLower);
          const matchesSpecialties = (p.specialties || []).some((s) => s.toLowerCase().includes(evtLower));
          if (!matchesCategory && !matchesSpecialties) return false;
        }

        // 4. Budget Tier Filter
        if (budgetTier !== 'all') {
          const price = p.startingPrice || 0;
          if (budgetTier === 'under15k' && price > 15000) return false;
          if (budgetTier === '15k-35k' && (price < 15000 || price > 35000)) return false;
          if (budgetTier === '35k-75k' && (price < 35000 || price > 75000)) return false;
          if (budgetTier === 'above75k' && price < 75000) return false;
        }

        // 5. Availability Filter
        if (availabilityFilter !== 'all') {
          if (availabilityFilter === 'weekend' && !p.availability?.toLowerCase().includes('weekend') && !p.availability?.toLowerCase().includes('week')) {
            // default passes
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return (a.startingPrice || 0) - (b.startingPrice || 0);
        if (sortBy === 'price-high') return (b.startingPrice || 0) - (a.startingPrice || 0);
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        if (sortBy === 'reviews') return (b.reviewCount || 0) - (a.reviewCount || 0);
        return 0; // recommended
      });
  }, [professionals, creatorType, locationQuery, eventType, budgetTier, availabilityFilter, sortBy]);

  // Featured Creators List
  const featuredCreators = useMemo(() => {
    return professionals.filter((p) => {
      if (featuredTab === 'all') return true;
      if (featuredTab === 'photographer') return p.role === 'photographer' || p.category?.toLowerCase().includes('photo');
      if (featuredTab === 'videographer') return p.role === 'videographer' || p.category?.toLowerCase().includes('video');
      if (featuredTab === 'editor') return p.role === 'editor' || p.category?.toLowerCase().includes('edit') || p.category?.toLowerCase().includes('color');
      if (featuredTab === 'wedding') return p.category?.toLowerCase().includes('wedding') || (p.specialties || []).some((s) => s.toLowerCase().includes('wedding'));
      return true;
    });
  }, [professionals, featuredTab]);

  // Portfolio Filtered
  const filteredPortfolio = useMemo(() => {
    if (portfolioFilter === 'All') return portfolioGallery;
    return portfolioGallery.filter(
      (item) => item.category.toLowerCase() === portfolioFilter.toLowerCase()
    );
  }, [portfolioFilter]);

  const handleResetSearch = () => {
    setCreatorType('all');
    setLocationQuery('');
    setEventType('all');
    setEventDate('');
    setBudgetTier('all');
    setAvailabilityFilter('all');
    setSortBy('recommended');
  };

  const handleBookCreator = (creator) => {
    setSelectedBookingPro(creator);
    setBookingModalOpen(true);
  };

  const scrollToSearch = () => {
    const el = document.getElementById('find-photographer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500 selection:text-midnight-950 overflow-x-hidden">
      {/* Cinematic Cosmos Dynamic Background */}
      <CinematicCosmosBackground />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: CINEMATIC HERO
          "Find the Perfect Lens for Your Story"
          ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 overflow-hidden text-center">
        {/* Background Editorial Visual */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2400&q=85"
            alt="Cinematic Photography Background"
            className="w-full h-full object-cover filter brightness-[0.22] contrast-125 scale-105 animate-ken-burns opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/75 to-[#030712]/85" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,210,255,0.1)_0%,_transparent_70%)]" />
        </div>

        {/* Ambient Glow Orb */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-reveal">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-sky-400/30 text-xs font-medium text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="uppercase tracking-widest font-mono text-[11px]">
              PREMIUM PHOTOGRAPHY & CINEMA PLATFORM
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-white uppercase leading-[1.05]">
            Find the Perfect <span className="text-gradient-cyan text-glow-cyan">Lens</span><br />
            for Your Story.
          </h1>

          {/* Supporting Text */}
          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed">
            Lenscraft helps you discover and book vetted photographers, cinematic videographers, and editorial photo editors for weddings, pre-weddings, celebrations, lookbooks, and commercial campaigns.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={scrollToSearch}
              className="px-8 py-4 rounded-full glow-btn-primary text-xs sm:text-sm uppercase tracking-wider font-bold inline-flex items-center gap-2 shadow-[0_0_25px_rgba(0,210,255,0.5)] hover:scale-105 transition-transform cursor-pointer"
            >
              <Search className="w-4 h-4 text-midnight-950" />
              <span>Find Your Creator</span>
            </button>

            <Link
              to="/photographers"
              className="px-8 py-4 rounded-full btn-secondary-luxury text-xs sm:text-sm uppercase tracking-wider font-semibold inline-flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer"
            >
              <Camera className="w-4 h-4 text-cyan-400" />
              <span>Explore All Talent</span>
            </Link>

            <button
              type="button"
              onClick={() => setCreatorModalOpen(true)}
              className="px-6 py-4 rounded-full glass-panel text-xs uppercase tracking-wider font-medium text-slate-300 hover:text-cyan-300 border border-sky-500/20 hover:border-cyan-400 transition-all cursor-pointer hidden sm:inline-flex items-center gap-1.5"
            >
              <span>Join as Creator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left border-t border-white/10">
            <div className="space-y-0.5">
              <span className="text-xl sm:text-2xl font-display font-bold text-white block">2,500+</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Curated Artists</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-xl sm:text-2xl font-display font-bold text-cyan-300 block">100%</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Escrow Protected</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-xl sm:text-2xl font-display font-bold text-white block">4.96 ★</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Average Rating</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-xl sm:text-2xl font-display font-bold text-cyan-300 block">4K HDR</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Master Deliveries</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: FIND YOUR PHOTOGRAPHER (PROMINENT SEARCH SECTION)
          6 Fields: Creator Type, Location, Event Type, Date, Budget, Availability
          ───────────────────────────────────────────────────────────── */}
      <section
        id="find-photographer"
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-sky-500/15"
      >
        <div className="space-y-8 text-left">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-mono uppercase tracking-widest">
                <Search className="w-3.5 h-3.5 text-cyan-400" />
                <span>PRECISION DISCOVERY ENGINE</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase tracking-tight">
                Find Your <span className="text-gradient-cyan">Photographer</span>
              </h2>
              <p className="text-sm text-slate-300 max-w-2xl font-light">
                Filter by creator discipline, city location, milestone event type, scheduled date, budget tier, and real-time availability.
              </p>
            </div>

            {/* Mobile Filter Drawer Trigger */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden px-4 py-2.5 rounded-2xl glass-panel border border-sky-500/30 text-xs font-semibold text-cyan-300 flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters & Sorting</span>
              </button>
            </div>
          </div>

          {/* 6-Field Prominent Search Form Panel */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-sky-500/25 shadow-2xl space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
              {/* Field 1: Creator Type */}
              <div className="bg-midnight-950/85 border border-sky-500/20 px-4 py-3 rounded-2xl focus-within:border-cyan-400 transition-colors">
                <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Creator Type</span>
                </label>
                <select
                  value={creatorType}
                  onChange={(e) => setCreatorType(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm text-white focus:outline-none cursor-pointer font-medium"
                >
                  <option value="all" className="bg-midnight-950 text-white">All Creators</option>
                  <option value="photographer" className="bg-midnight-950 text-white">Photographer</option>
                  <option value="videographer" className="bg-midnight-950 text-white">Videographer</option>
                  <option value="editor" className="bg-midnight-950 text-white">Editor / Colorist</option>
                </select>
              </div>

              {/* Field 2: Location */}
              <div className="bg-midnight-950/85 border border-sky-500/20 px-4 py-3 rounded-2xl focus-within:border-cyan-400 transition-colors">
                <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Location</span>
                </label>
                <input
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="City (e.g. Mumbai, Udaipur)"
                  className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none font-medium"
                />
              </div>

              {/* Field 3: Event Type */}
              <div className="bg-midnight-950/85 border border-sky-500/20 px-4 py-3 rounded-2xl focus-within:border-cyan-400 transition-colors">
                <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Event Type</span>
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm text-white focus:outline-none cursor-pointer font-medium"
                >
                  <option value="all" className="bg-midnight-950 text-white">All Event Types</option>
                  <option value="Wedding" className="bg-midnight-950 text-white">Wedding</option>
                  <option value="Pre-Wedding" className="bg-midnight-950 text-white">Pre-Wedding</option>
                  <option value="Birthday" className="bg-midnight-950 text-white">Birthday</option>
                  <option value="Corporate" className="bg-midnight-950 text-white">Corporate</option>
                  <option value="Fashion" className="bg-midnight-950 text-white">Fashion</option>
                  <option value="Product" className="bg-midnight-950 text-white">Product</option>
                  <option value="Portrait" className="bg-midnight-950 text-white">Portrait</option>
                  <option value="Travel" className="bg-midnight-950 text-white">Travel</option>
                  <option value="Events" className="bg-midnight-950 text-white">Events</option>
                </select>
              </div>

              {/* Field 4: Date */}
              <div className="bg-midnight-950/85 border border-sky-500/20 px-4 py-3 rounded-2xl focus-within:border-cyan-400 transition-colors">
                <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Shoot Date</span>
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full bg-transparent text-xs text-white focus:outline-none cursor-pointer font-medium"
                />
              </div>

              {/* Field 5: Budget */}
              <div className="bg-midnight-950/85 border border-sky-500/20 px-4 py-3 rounded-2xl focus-within:border-cyan-400 transition-colors">
                <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Budget Tier</span>
                </label>
                <select
                  value={budgetTier}
                  onChange={(e) => setBudgetTier(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm text-white focus:outline-none cursor-pointer font-medium"
                >
                  <option value="all" className="bg-midnight-950 text-white">All Budgets</option>
                  <option value="under15k" className="bg-midnight-950 text-white">Under ₹15,000</option>
                  <option value="15k-35k" className="bg-midnight-950 text-white">₹15,000 – ₹35,000</option>
                  <option value="35k-75k" className="bg-midnight-950 text-white">₹35,000 – ₹75,000</option>
                  <option value="above75k" className="bg-midnight-950 text-white">Luxury (₹75,000+)</option>
                </select>
              </div>

              {/* Field 6: Availability */}
              <div className="bg-midnight-950/85 border border-sky-500/20 px-4 py-3 rounded-2xl focus-within:border-cyan-400 transition-colors">
                <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Availability</span>
                </label>
                <select
                  value={availabilityFilter}
                  onChange={(e) => setAvailabilityFilter(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm text-white focus:outline-none cursor-pointer font-medium"
                >
                  <option value="all" className="bg-midnight-950 text-white">Any Time</option>
                  <option value="weekend" className="bg-midnight-950 text-white">Weekends</option>
                  <option value="weekday" className="bg-midnight-950 text-white">Weekdays</option>
                  <option value="immediate" className="bg-midnight-950 text-white">Immediate (24-48h)</option>
                </select>
              </div>
            </div>

            {/* Sub-Bar: Result Count, Active Filter Tags, Reset & Sorting */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-mono text-cyan-300 font-bold text-sm">
                  {searchResults.length} Verified {searchResults.length === 1 ? 'Creator' : 'Creators'} Found
                </span>

                {(creatorType !== 'all' || locationQuery || eventType !== 'all' || eventDate || budgetTier !== 'all' || availabilityFilter !== 'all') && (
                  <button
                    type="button"
                    onClick={handleResetSearch}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-cyan-300 border border-white/10 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Clear All Filters</span>
                  </button>
                )}
              </div>

              {/* Sorting Controls */}
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 rounded-xl glass-input text-xs text-white focus:outline-none cursor-pointer"
                >
                  <option value="recommended" className="bg-midnight-950">Recommended</option>
                  <option value="rating" className="bg-midnight-950">Highest Rating</option>
                  <option value="price-low" className="bg-midnight-950">Price: Low to High</option>
                  <option value="price-high" className="bg-midnight-950">Price: High to Low</option>
                  <option value="reviews" className="bg-midnight-950">Most Reviews</option>
                </select>
              </div>
            </div>
          </div>

          {/* Search Results Display Grid */}
          <div className="space-y-6">
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchResults.slice(0, 8).map((creator) => (
                  <ProfessionalCard
                    key={creator.id}
                    professional={creator}
                    isWishlisted={favorites?.some((f) => f.id === creator.id)}
                    onWishlistToggle={toggleFavorite}
                    onBookNow={handleBookCreator}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="py-16 text-center glass-panel rounded-3xl border border-sky-500/20 p-8 space-y-4 shadow-xl">
                <div className="w-16 h-16 rounded-2xl bg-midnight-950 border border-sky-500/30 flex items-center justify-center text-slate-500 mx-auto">
                  <Camera className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display font-bold text-white">No Creators Found</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  We couldn’t find creators matching your exact combination of filters. Try clearing some filters or searching for nearby cities.
                </p>
                <button
                  type="button"
                  onClick={handleResetSearch}
                  className="px-6 py-2.5 rounded-full glow-btn-primary text-xs uppercase tracking-wider font-bold shadow-md cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: FEATURED CREATORS
          Spotlight on top artists across Wedding, Cinema, and Editorial
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-sky-500/15">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300">
              <Award className="w-3.5 h-3.5 text-indigo-400" />
              <span>CURATED TALENT</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase tracking-tight">
              Featured <span className="text-gradient-cyan">Creators</span>
            </h2>
            <p className="text-sm text-slate-300 font-light max-w-xl">
              Meet master visual artists trusted by luxury weddings, fashion houses, and commercial brand campaigns across India.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Collective' },
              { id: 'photographer', label: 'Photographers' },
              { id: 'videographer', label: 'Cinematographers' },
              { id: 'editor', label: 'Video Editors' },
              { id: 'wedding', label: 'Wedding Masters' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFeaturedTab(tab.id)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                  featuredTab === tab.id
                    ? 'glow-btn-primary shadow-[0_0_15px_rgba(0,210,255,0.4)]'
                    : 'glass-panel text-slate-300 hover:text-white hover:border-sky-500/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredCreators.slice(0, 8).map((creator) => (
            <ProfessionalCard
              key={creator.id}
              professional={creator}
              isWishlisted={favorites?.some((f) => f.id === creator.id)}
              onWishlistToggle={toggleFavorite}
              onBookNow={handleBookCreator}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/photographers"
            className="px-8 py-3.5 rounded-full btn-secondary-luxury text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 hover:scale-105 transition-all shadow-lg"
          >
            <span>Explore All {professionals.length}+ Creators in Directory</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: EXPLORE BY EVENT
          Wedding, Pre-Wedding, Birthday, Corporate, Fashion, Product, Portrait, Travel, Events
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-sky-500/15">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-mono text-violet-300">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>OCCASIONS & EXPERIENCES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase tracking-tight">
            Explore by <span className="text-gradient-violet">Event</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Find specialists perfectly attuned to the lighting, pacing, emotion, and cultural nuances of your celebration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {eventTypesList.map((evt) => (
            <Link
              key={evt.id}
              to={evt.link}
              className="group relative rounded-3xl overflow-hidden glass-card border border-sky-500/15 hover:border-cyan-400/50 p-6 flex flex-col justify-between min-h-[300px] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_25px_rgba(0,210,255,0.2)]"
            >
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-[0.45] group-hover:brightness-[0.6]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/60 to-transparent" />
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-midnight-950/85 backdrop-blur-md text-cyan-300 border border-sky-500/30">
                  {evt.creatorsCount}
                </span>
                <div className="w-8 h-8 rounded-full bg-cyan-400 text-midnight-950 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div className="relative z-10 space-y-1 pt-12">
                <h3 className="text-xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {evt.subtitle}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {evt.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: PHOTOGRAPHY / VIDEOGRAPHY / EDITING
          Discipline Deep-Dive Core Pillars
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-sky-500/15">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-cyan-300">
            <Camera className="w-3.5 h-3.5 text-cyan-400" />
            <span>CREATIVE DISCIPLINES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase tracking-tight">
            Photography · Videography · <span className="text-gradient-cyan">Editing</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            From high-res fine art stills to 4K cinematic showreels and Hollywood-grade color grading, explore specialized artistry for every vision.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
          {disciplinesList.map((disc, idx) => {
            const IconComp = disc.icon;
            return (
              <div
                key={disc.id}
                className="p-8 rounded-3xl glass-card border border-sky-500/20 hover:border-cyan-400/50 flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-2 shadow-xl hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_25px_rgba(0,210,255,0.2)]"
              >
                <div className="space-y-4">
                  {/* Top Discipline Badge & Number */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-midnight-950 border border-sky-500/30 flex items-center justify-center text-cyan-400 shadow-md">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-400/30">
                      {disc.badge}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-2xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {disc.title}
                    </h3>
                    <p className="text-xs text-cyan-300 font-mono">
                      {disc.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {disc.description}
                  </p>

                  {/* Bullet Inclusions */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    {disc.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-200">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    to={disc.link}
                    className="w-full py-3 rounded-2xl glow-btn-primary text-xs uppercase font-mono tracking-wider font-bold inline-flex items-center justify-center gap-2 shadow-md hover:scale-102 transition-transform"
                  >
                    <span>Explore {disc.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6: TRENDING PORTFOLIOS
          Asymmetric Visual Masonry Gallery + Lightbox Modal
          ───────────────────────────────────────────────────────────── */}
      <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-sky-500/15">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300">
            <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>VISUAL CHRONICLES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase tracking-tight">
            Trending <span className="text-gradient-cyan">Portfolios</span>
          </h2>
          <p className="text-sm text-slate-300 font-light">
            A curated tapestry of raw human emotion, cinematic landscapes, bespoke editorial fashion, and heritage celebrations.
          </p>

          {/* Categories Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {['All', 'Weddings', 'Portraits', 'Events', 'Travel', 'Fashion', 'Products', 'Nature'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setPortfolioFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
                  portfolioFilter === cat
                    ? 'bg-cyan-500 text-midnight-950 font-bold shadow-[0_0_15px_rgba(0,210,255,0.4)]'
                    : 'glass-panel text-slate-300 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Masonry Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-[240px] text-left">
          {filteredPortfolio.map((item, idx) => {
            const isSpan2 = idx % 3 === 0;
            const isSpanTall = idx % 4 === 1;

            return (
              <div
                key={item.id}
                onClick={() => {
                  setActiveLightboxIndex(idx);
                  setLightboxOpen(true);
                }}
                className={`group relative rounded-3xl overflow-hidden glass-card border border-sky-500/15 hover:border-cyan-400/60 cursor-pointer transition-all duration-500 hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(0,210,255,0.25)] ${
                  isSpan2 ? 'md:col-span-2 row-span-2' : isSpanTall ? 'row-span-2' : 'row-span-1'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-90 group-hover:brightness-105"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-midnight-950/85 backdrop-blur-md text-cyan-300 border border-sky-500/30">
                    {item.category}
                  </span>
                </div>

                <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-cyan-400 text-midnight-950 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-[0_0_15px_rgba(0,210,255,0.6)]">
                  <ArrowUpRight className="w-5 h-5" />
                </div>

                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-10 space-y-1 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                  <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-mono">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.location}</span>
                    <span>·</span>
                    <span>By {item.creator}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-cyan-200 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 7: HOW LENSCRAFT WORKS
          The 3-Step Creative Protocol
          ───────────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-sky-500/15">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300">
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            <span>THE CREATIVE PROTOCOL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase tracking-tight">
            How <span className="text-gradient-cyan">Lenscraft</span> Works
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light">
            A frictionless, transparent journey from discovery to milestone-protected master delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {[
            {
              step: '01',
              title: 'Discover & Compare Talent',
              desc: 'Explore vetted photographers and filmmakers with high-res galleries, gear profiles, transparent rate cards, and verified client endorsements.',
              icon: Search,
            },
            {
              step: '02',
              title: 'Lock Dates with Escrow Security',
              desc: 'Direct message artists to align on moodboards, then confirm shoot dates with a 25% milestone deposit held securely in certified escrow until completion.',
              icon: ShieldCheck,
            },
            {
              step: '03',
              title: 'Receive Master Archival Delivery',
              desc: 'Enjoy seamless on-location shoot execution and receive color-graded high-resolution galleries and 4K cinema films via high-speed cloud download.',
              icon: Sparkles,
            },
          ].map((item) => {
            const StepIcon = item.icon;
            return (
              <div
                key={item.step}
                className="p-8 rounded-3xl glass-card border border-sky-500/15 hover:border-cyan-400/50 space-y-4 relative group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_25px_rgba(0,210,255,0.18)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-display font-extrabold text-cyan-400/40 group-hover:text-cyan-300 transition-colors">
                    {item.step}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-midnight-950 border border-sky-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-all">
                    <StepIcon className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-xl font-display font-bold text-white group-hover:text-cyan-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 8: TESTIMONIALS
          Verified Client Endorsements
          ───────────────────────────────────────────────────────────── */}
      <section id="stories" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-sky-500/15">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300">
              <Star className="w-3.5 h-3.5 text-cyan-400" />
              <span>VERIFIED ENDORSEMENTS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase tracking-tight">
              Client <span className="text-gradient-cyan">Testimonials</span>
            </h2>
            <p className="text-sm text-slate-300 font-light max-w-xl">
              Real stories from brides, creative directors, and founders who found their dream visual teams on Lenscraft.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTestimonialIndex((prev) => (prev > 0 ? prev - 1 : testimonialsList.length - 1))}
              className="p-3 rounded-full glass-panel text-slate-300 hover:text-white hover:border-cyan-400 transition-all cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setTestimonialIndex((prev) => (prev < testimonialsList.length - 1 ? prev + 1 : 0))}
              className="p-3 rounded-full glass-panel text-slate-300 hover:text-white hover:border-cyan-400 transition-all cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {testimonialsList.map((t, idx) => {
            const isActive = idx === testimonialIndex;
            return (
              <div
                key={t.id}
                onClick={() => setTestimonialIndex(idx)}
                className={`p-6 sm:p-7 rounded-3xl glass-card flex flex-col justify-between space-y-4 cursor-pointer transition-all duration-300 ${
                  isActive
                    ? 'border-2 border-cyan-400/80 shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(0,210,255,0.2)] bg-midnight-950/90'
                    : 'border border-sky-500/15 hover:border-sky-500/40 bg-midnight-950/60'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                      {t.category}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                    "{t.review}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover border border-sky-500/30 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{t.name}</h4>
                      <p className="text-[11px] text-slate-400 truncate">{t.location}</p>
                    </div>
                  </div>

                  <img
                    src={t.previewImage}
                    alt="Shoot preview"
                    className="w-12 h-12 rounded-xl object-cover border border-sky-500/25 shrink-0"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 9: CREATOR CTA ("Are You a Visual Creator?")
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="relative rounded-3xl overflow-hidden glass-card border border-sky-500/30 p-8 sm:p-14 lg:p-20 text-center space-y-6 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(0,210,255,0.2)]">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85"
              alt="Join Creator Collective"
              className="w-full h-full object-cover filter brightness-[0.22] contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/80 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,210,255,0.15)_0%,_transparent_70%)]" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-sky-400/30 text-xs font-mono text-cyan-300">
              <Camera className="w-3.5 h-3.5 text-cyan-400" />
              <span>JOIN THE COLLECTIVE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-white uppercase tracking-tight leading-tight">
              Are You a Visual Creator?<br />
              <span className="text-gradient-cyan text-glow-cyan">Showcase on Lenscraft.</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto">
              Monetize your craft, receive direct booking inquiries with 100% escrow milestone protection, and connect with high-value clients across India.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => setCreatorModalOpen(true)}
                className="px-8 py-3.5 rounded-full glow-btn-primary text-xs uppercase tracking-wider font-bold inline-flex items-center gap-2 shadow-[0_0_25px_rgba(0,210,255,0.5)] hover:scale-105 transition-all cursor-pointer"
              >
                <span>Apply as a Creator</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/photographers"
                className="px-8 py-3.5 rounded-full btn-secondary-luxury text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-2 hover:scale-105 transition-all"
              >
                <span>Explore Directory</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          MOBILE FILTER DRAWER
          ───────────────────────────────────────────────────────────── */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md lg:hidden">
          <div className="w-full max-w-md bg-[#060b19] border-l border-sky-500/30 p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-display font-bold text-white text-lg">Filters & Options</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Creator Type */}
              <div className="space-y-2 text-left">
                <label className="text-xs uppercase font-mono text-slate-300">Creator Type</label>
                <select
                  value={creatorType}
                  onChange={(e) => setCreatorType(e.target.value)}
                  className="w-full p-3 rounded-xl glass-input text-xs text-white"
                >
                  <option value="all" className="bg-midnight-950">All Creators</option>
                  <option value="photographer" className="bg-midnight-950">Photographers</option>
                  <option value="videographer" className="bg-midnight-950">Videographers</option>
                  <option value="editor" className="bg-midnight-950">Editors & Colorists</option>
                </select>
              </div>

              {/* Location */}
              <div className="space-y-2 text-left">
                <label className="text-xs uppercase font-mono text-slate-300">Location / City</label>
                <input
                  type="text"
                  placeholder="e.g. Mumbai, Udaipur"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  className="w-full p-3 rounded-xl glass-input text-xs text-white placeholder-slate-500"
                />
              </div>

              {/* Event Type */}
              <div className="space-y-2 text-left">
                <label className="text-xs uppercase font-mono text-slate-300">Event Type</label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full p-3 rounded-xl glass-input text-xs text-white"
                >
                  <option value="all" className="bg-midnight-950">All Event Types</option>
                  <option value="Wedding" className="bg-midnight-950">Wedding</option>
                  <option value="Pre-Wedding" className="bg-midnight-950">Pre-Wedding</option>
                  <option value="Birthday" className="bg-midnight-950">Birthday</option>
                  <option value="Corporate" className="bg-midnight-950">Corporate</option>
                  <option value="Fashion" className="bg-midnight-950">Fashion</option>
                  <option value="Product" className="bg-midnight-950">Product</option>
                  <option value="Portrait" className="bg-midnight-950">Portrait</option>
                  <option value="Travel" className="bg-midnight-950">Travel</option>
                  <option value="Events" className="bg-midnight-950">Events</option>
                </select>
              </div>

              {/* Budget */}
              <div className="space-y-2 text-left">
                <label className="text-xs uppercase font-mono text-slate-300">Budget Tier</label>
                <select
                  value={budgetTier}
                  onChange={(e) => setBudgetTier(e.target.value)}
                  className="w-full p-3 rounded-xl glass-input text-xs text-white"
                >
                  <option value="all" className="bg-midnight-950">All Budgets</option>
                  <option value="under15k" className="bg-midnight-950">Under ₹15,000</option>
                  <option value="15k-35k" className="bg-midnight-950">₹15,000 – ₹35,000</option>
                  <option value="35k-75k" className="bg-midnight-950">₹35,000 – ₹75,000</option>
                  <option value="above75k" className="bg-midnight-950">Luxury (₹75,000+)</option>
                </select>
              </div>

              {/* Sorting */}
              <div className="space-y-2 text-left">
                <label className="text-xs uppercase font-mono text-slate-300">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-3 rounded-xl glass-input text-xs text-white"
                >
                  <option value="recommended" className="bg-midnight-950">Recommended</option>
                  <option value="rating" className="bg-midnight-950">Highest Rating</option>
                  <option value="price-low" className="bg-midnight-950">Price: Low to High</option>
                  <option value="price-high" className="bg-midnight-950">Price: High to Low</option>
                  <option value="reviews" className="bg-midnight-950">Most Reviews</option>
                </select>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 rounded-full glow-btn-primary text-xs uppercase font-bold tracking-wider"
              >
                Apply & View ({searchResults.length} Results)
              </button>
              <button
                type="button"
                onClick={handleResetSearch}
                className="w-full py-3 rounded-full btn-secondary-luxury text-xs uppercase font-semibold tracking-wider"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          GLOBAL MODALS
          ───────────────────────────────────────────────────────────── */}
      <CreatorOnboardingModal
        isOpen={creatorModalOpen}
        onClose={() => setCreatorModalOpen(false)}
      />

      <AiMatchmakerModal
        isOpen={matchmakerOpen}
        onClose={() => setMatchmakerOpen(false)}
      />

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        professional={selectedBookingPro}
      />

      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={filteredPortfolio.map((p) => ({
          url: p.image,
          title: p.title,
          category: p.category,
          creator: p.creator,
          location: p.location,
        }))}
        initialIndex={activeLightboxIndex}
      />
    </div>
  );
};

export default HomePage;
