import React, { useState, useEffect } from 'react';
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
  Sliders,
  CheckCircle2,
  Globe2,
  MessageSquare,
  Image as ImageIcon,
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

// 1. Popular Photography & Visual Services ("What We Capture")
const servicesList = [
  {
    id: 'wedding',
    title: 'Wedding Photography',
    icon: Heart,
    description: 'Timeless visual poetry capturing sacred vows, royal rituals, candid tears, and grand celebratory moments.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85',
    link: '/photographers?category=Wedding',
  },
  {
    id: 'portrait',
    title: 'Portrait Photography',
    icon: Camera,
    description: 'Editorial, conceptual, and emotive portraiture designed for creators, founders, and fashion personalities.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
    link: '/photographers?category=Portrait',
  },
  {
    id: 'event',
    title: 'Event Photography',
    icon: Sparkles,
    description: 'Dynamic coverage of corporate summits, cultural galas, music festivals, and milestone private parties.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=85',
    link: '/photographers?category=Event',
  },
  {
    id: 'travel',
    title: 'Travel & Adventure',
    icon: Compass,
    description: 'Breathtaking high-altitude expeditions, desert romances, outdoor documentaries, and coastal visual stories.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=85',
    link: '/photographers?category=Travel',
  },
  {
    id: 'product',
    title: 'Product & Commercial',
    icon: Layers,
    description: 'Precision studio lighting, macro jewelry textures, luxury watches, and high-conversion commercial campaigns.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85',
    link: '/photographers?category=Product',
  },
  {
    id: 'videography',
    title: '4K Cinematic Videography',
    icon: Video,
    description: '4K cinematic wedding films, brand teasers, cinema drone aerials, and high-impact editorial motion.',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1000&q=85',
    link: '/videographers',
  },
  {
    id: 'photo-editing',
    title: 'Master Photo Editing',
    icon: Wand2,
    description: 'High-end skin retouching, color grading, frequency separation, and archival magazine print finishing.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=85',
    link: '/editors',
  },
];

// 2. Explore by Event ("Curated for Every Milestone")
const eventsList = [
  {
    id: 'weddings',
    title: 'Weddings & Receptions',
    tagline: 'Royal rituals, candid emotions & timeless heirlooms',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85',
    link: '/photographers?category=Wedding',
    creatorsCount: '48+ Studios',
  },
  {
    id: 'pre-wedding',
    title: 'Pre-Wedding & Engagements',
    tagline: 'Sunset romance across heritage palaces and dunes',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=85',
    link: '/photographers?category=Wedding',
    creatorsCount: '36+ Studios',
  },
  {
    id: 'fashion',
    title: 'Fashion & Lookbooks',
    tagline: 'High-concept aesthetics, runway & brand campaigns',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=85',
    link: '/photographers?category=Fashion',
    creatorsCount: '28+ Studios',
  },
  {
    id: 'portraits',
    title: 'Portraits & Branding',
    tagline: 'Cinematic lighting for founders, artists & leaders',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85',
    link: '/photographers?category=Portrait',
    creatorsCount: '42+ Studios',
  },
  {
    id: 'commercial',
    title: 'Commercial & Products',
    tagline: 'Macro textures, jewelry & haute horlogerie',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=85',
    link: '/photographers?category=Product',
    creatorsCount: '25+ Studios',
  },
  {
    id: 'travel',
    title: 'Travel & Expeditions',
    tagline: 'Himalayan landscapes, coastlines & aerial films',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85',
    link: '/photographers?category=Travel',
    creatorsCount: '20+ Studios',
  },
];

// 3. Portfolio Gallery Items ("Trending Portfolios")
const portfolioGallery = [
  {
    id: 'port-1',
    title: 'Echoes of the Royal Palace',
    category: 'Weddings',
    creator: 'Aarav Mehta',
    location: 'Udaipur, Rajasthan',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    aspect: 'tall',
  },
  {
    id: 'port-2',
    title: 'Monochrome High-Fashion',
    category: 'Fashion',
    creator: 'Nisha Singhania',
    location: 'Mumbai, Maharashtra',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
    aspect: 'wide',
  },
  {
    id: 'port-3',
    title: 'Spiti Valley Starlight',
    category: 'Travel',
    creator: 'Kabir Varma',
    location: 'Himalayas, India',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
    aspect: 'tall',
  },
  {
    id: 'port-4',
    title: 'Ethereal Studio Gaze',
    category: 'Portraits',
    creator: 'Ananya Deshmukh',
    location: 'Pune, Maharashtra',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
    aspect: 'square',
  },
  {
    id: 'port-5',
    title: 'Titanium Timepiece Campaign',
    category: 'Products',
    creator: 'Vikramaditya Roy',
    location: 'Bengaluru, Karnataka',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85',
    aspect: 'wide',
  },
  {
    id: 'port-6',
    title: 'Dusk Symphony Gala',
    category: 'Events',
    creator: 'Rohit Kulkarni',
    location: 'Delhi NCR',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=85',
    aspect: 'square',
  },
  {
    id: 'port-7',
    title: 'Solitary Alpine Peak',
    category: 'Nature',
    creator: 'Pooja Bhatt',
    location: 'Manali, Himachal',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85',
    aspect: 'tall',
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
      'Booking our wedding team through LensCraft felt like stepping into an editorial magazine. The atmospheric lighting, candid emotion, and cinematic color grade exceeded every dream we had.',
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
      'The speed, visual clarity, and talent level on LensCraft are extraordinary. We locked moodboards with Nisha in hours, and the editorial spread was hailed by our creative directors.',
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
      'Kabir’s vision during our mountain shoot was mesmerizing. The starry night captures, drone stills, and candid moments will remain our family treasures forever.',
  },
];

const HomePage = () => {
  const { professionals, favorites, toggleFavorite } = usePlatform();
  const navigate = useNavigate();

  // Search Discovery State (4 fields)
  const [searchRole, setSearchRole] = useState('photographer');
  const [searchWhere, setSearchWhere] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');
  const [searchWhen, setSearchWhen] = useState('');

  // Modals & Active Tab
  const [creatorModalOpen, setCreatorModalOpen] = useState(false);
  const [matchmakerOpen, setMatchmakerOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [selectedProForChat, setSelectedProForChat] = useState(null);
  const [selectedBookingPro, setSelectedBookingPro] = useState(professionals[0] || MOCK_PROFESSIONALS[0]);
  const [activePhotographerTab, setActivePhotographerTab] = useState('all');
  const [activePortfolioCategory, setActivePortfolioCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(0);

  // Testimonial Carousel Index
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // In-Page Shoot Planner State
  const [plannerPro, setPlannerPro] = useState(professionals[0]?.id || 'pro-1');
  const [plannerService, setPlannerService] = useState('Wedding Photography');
  const [plannerDate, setPlannerDate] = useState('2026-10-15');
  const [plannerTime, setPlannerTime] = useState('10:00 AM');
  const [plannerLocation, setPlannerLocation] = useState('Indore / Mumbai');
  const [plannerPackage, setPlannerPackage] = useState('Standard');

  const currentPlannerPro =
    professionals.find((p) => p.id === plannerPro) || professionals[0] || MOCK_PROFESSIONALS[0];

  const getEstimatedPrice = () => {
    const base = currentPlannerPro?.startingPrice || 25000;
    if (plannerPackage === 'Basic') return base;
    if (plannerPackage === 'Standard') return Math.round(base * 1.35);
    if (plannerPackage === 'Premium') return Math.round(base * 1.95);
    return base;
  };

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchRole && searchRole !== 'all') params.append('role', searchRole);
    if (searchWhere) params.append('city', searchWhere);
    if (searchCategory && searchCategory !== 'all') params.append('category', searchCategory);
    if (searchWhen) params.append('date', searchWhen);

    if (searchRole === 'videographer') {
      navigate(`/videographers?${params.toString()}`);
    } else if (searchRole === 'editor') {
      navigate(`/editors?${params.toString()}`);
    } else if (searchRole === 'photographer') {
      navigate(`/photographers?${params.toString()}`);
    } else {
      navigate(`/explore?${params.toString()}`);
    }
  };

  // Filter photographers for featured section
  const filteredPhotographers = professionals.filter((p) => {
    if (activePhotographerTab === 'all') return true;
    if (activePhotographerTab === 'wedding') return p.category?.toLowerCase().includes('wedding');
    if (activePhotographerTab === 'portrait') return p.category?.toLowerCase().includes('portrait');
    if (activePhotographerTab === 'travel') return p.category?.toLowerCase().includes('travel') || p.category?.toLowerCase().includes('landscape');
    if (activePhotographerTab === 'product') return p.category?.toLowerCase().includes('product') || p.category?.toLowerCase().includes('commercial');
    if (activePhotographerTab === 'event') return p.category?.toLowerCase().includes('event');
    return true;
  });

  // Filter portfolio gallery
  const filteredPortfolio = portfolioGallery.filter((item) => {
    if (activePortfolioCategory === 'All') return true;
    return item.category.toLowerCase() === activePortfolioCategory.toLowerCase();
  });

  const handleConfirmPlanner = () => {
    setSelectedBookingPro(currentPlannerPro);
    setBookingModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500 selection:text-midnight-950 overflow-x-hidden">
      {/* Background Ambience */}
      <CinematicCosmosBackground />

      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION: "Find the Perfect Lens for Your Story"
          ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-28 pb-20 overflow-hidden text-center">
        {/* Background Editorial Visual */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2200&q=85"
            alt="Cinematic Photography Background"
            className="w-full h-full object-cover filter brightness-[0.24] contrast-125 scale-105 animate-ken-burns opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/75 to-[#030712]/85" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,210,255,0.08)_0%,_transparent_70%)]" />
        </div>

        {/* Ambient Glow Orb */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-reveal">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-sky-400/30 text-xs font-medium text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="uppercase tracking-widest font-mono text-[11px]">
              Premium Photography & Cinema Platform
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-white uppercase leading-[1.06]">
            Find the Perfect <span className="text-gradient-cyan text-glow-cyan">Lens</span><br />
            for Your Story.
          </h1>

          {/* Supporting Text */}
          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed">
            Discover vetted photographers, cinematic videographers, and editorial photo editors for your weddings, celebrations, fashion lookbooks, and commercial campaigns.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
            <Link
              to="/photographers"
              className="px-8 py-3.5 rounded-full glow-btn-primary text-xs sm:text-sm uppercase tracking-wider font-bold inline-flex items-center gap-2 shadow-[0_0_25px_rgba(0,210,255,0.5)] hover:scale-105 transition-transform cursor-pointer"
            >
              <span>Explore Photographers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={() => setBookingModalOpen(true)}
              className="px-8 py-3.5 rounded-full btn-secondary-luxury text-xs sm:text-sm uppercase tracking-wider font-semibold inline-flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>Book a Shoot</span>
            </button>
          </div>

          {/* ─────────────────────────────────────────────────────────
              4-FIELD POWERFUL SEARCH / DISCOVERY COMPONENT
              [ Creator Type ] [ Location ] [ Event Type ] [ Date ] [ Search ]
              ───────────────────────────────────────────────────────── */}
          <div className="pt-6 max-w-5xl mx-auto w-full">
            <form
              onSubmit={handleHeroSearch}
              className="glass-panel border border-sky-500/30 p-3 sm:p-4 rounded-3xl shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 text-left backdrop-blur-2xl"
            >
              {/* Field 1: Creator Type (Photographer / Videographer / Editor) */}
              <div className="lg:col-span-3 bg-midnight-950/80 border border-sky-500/20 px-4 py-2.5 rounded-2xl flex items-center gap-2.5 focus-within:border-cyan-400 transition-colors">
                <Camera className="w-4 h-4 text-cyan-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Creator Type</label>
                  <select
                    value={searchRole}
                    onChange={(e) => setSearchRole(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm text-white focus:outline-none cursor-pointer font-medium"
                  >
                    <option value="photographer" className="bg-midnight-950 text-white">Photographer</option>
                    <option value="videographer" className="bg-midnight-950 text-white">Videographer</option>
                    <option value="editor" className="bg-midnight-950 text-white">Photo Editor</option>
                    <option value="all" className="bg-midnight-950 text-white">All Creators</option>
                  </select>
                </div>
              </div>

              {/* Field 2: Location */}
              <div className="lg:col-span-3 bg-midnight-950/80 border border-sky-500/20 px-4 py-2.5 rounded-2xl flex items-center gap-2.5 focus-within:border-cyan-400 transition-colors">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Location</label>
                  <input
                    type="text"
                    value={searchWhere}
                    onChange={(e) => setSearchWhere(e.target.value)}
                    placeholder="City (e.g. Mumbai, Udaipur)"
                    className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none font-medium"
                  />
                </div>
              </div>

              {/* Field 3: Event Type */}
              <div className="lg:col-span-3 bg-midnight-950/80 border border-sky-500/20 px-4 py-2.5 rounded-2xl flex items-center gap-2.5 focus-within:border-cyan-400 transition-colors">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Event Type</label>
                  <select
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm text-white focus:outline-none cursor-pointer font-medium"
                  >
                    <option value="all" className="bg-midnight-950 text-white">All Events</option>
                    <option value="Wedding" className="bg-midnight-950 text-white">Weddings & Receptions</option>
                    <option value="Pre-Wedding" className="bg-midnight-950 text-white">Pre-Wedding & Engagement</option>
                    <option value="Fashion" className="bg-midnight-950 text-white">Fashion & Lookbook</option>
                    <option value="Portrait" className="bg-midnight-950 text-white">Portraits & Branding</option>
                    <option value="Commercial" className="bg-midnight-950 text-white">Commercial & Product</option>
                    <option value="Travel" className="bg-midnight-950 text-white">Travel & Destination</option>
                    <option value="Event" className="bg-midnight-950 text-white">Corporate Gala & Party</option>
                  </select>
                </div>
              </div>

              {/* Field 4: Date */}
              <div className="lg:col-span-2 bg-midnight-950/80 border border-sky-500/20 px-3.5 py-2.5 rounded-2xl flex items-center gap-2 focus-within:border-cyan-400 transition-colors">
                <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Date</label>
                  <input
                    type="date"
                    value={searchWhen}
                    onChange={(e) => setSearchWhen(e.target.value)}
                    className="w-full bg-transparent text-xs text-white focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Search Submit Button */}
              <div className="lg:col-span-1 flex items-center">
                <button
                  type="submit"
                  className="w-full h-full min-h-[46px] py-2.5 px-4 glow-btn-primary text-xs uppercase tracking-wider font-bold rounded-2xl flex items-center justify-center gap-1 shadow-lg hover:scale-105 transition-transform cursor-pointer"
                  title="Search Talent"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. FEATURED PHOTOGRAPHERS SECTION
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-sky-500/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300">
              <Award className="w-3.5 h-3.5 text-indigo-400" />
              <span>CURATED TALENT</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase tracking-tight">
              Featured Photographers
            </h2>
            <p className="text-sm text-slate-300 font-light max-w-xl">
              Connect directly with verified master photographers with transparent rates, certified portfolios, and escrow milestone security.
            </p>
          </div>

          {/* Filter Genre Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All' },
              { id: 'wedding', label: 'Wedding' },
              { id: 'portrait', label: 'Portrait' },
              { id: 'travel', label: 'Travel' },
              { id: 'product', label: 'Product' },
              { id: 'event', label: 'Event' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePhotographerTab(tab.id)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                  activePhotographerTab === tab.id
                    ? 'glow-btn-primary shadow-[0_0_15px_rgba(0,210,255,0.4)]'
                    : 'glass-panel text-slate-300 hover:text-white hover:border-sky-500/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Photographers Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotographers.slice(0, 8).map((photographer) => (
            <ProfessionalCard
              key={photographer.id}
              professional={photographer}
              isWishlisted={favorites?.some((f) => f.id === photographer.id)}
              onWishlistToggle={toggleFavorite}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/photographers"
            className="px-8 py-3.5 rounded-full btn-secondary-luxury text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 hover:scale-105 transition-all shadow-lg"
          >
            <span>Explore All {professionals.length}+ Photographers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. POPULAR SERVICES ("What We Capture")
          ───────────────────────────────────────────────────────────── */}
      <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-sky-500/10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-cyan-300">
            <Camera className="w-3.5 h-3.5 text-cyan-400" />
            <span>DISCIPLINES & STYLES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase tracking-tight">
            Popular Services
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            From intimate portraiture to royal celebrations and 4K cinema films, discover specialized artists for every vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {servicesList.map((srv, idx) => {
            const IconComp = srv.icon;
            const isWide = idx === 0;
            return (
              <Link
                key={srv.id}
                to={srv.link}
                className={`group relative rounded-3xl overflow-hidden glass-card border border-sky-500/15 hover:border-cyan-400/50 p-6 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_25px_rgba(0,210,255,0.2)] ${
                  isWide ? 'xl:col-span-2 min-h-[360px]' : 'min-h-[340px]'
                }`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-[0.45] group-hover:brightness-[0.6]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/70 to-transparent" />
                </div>

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-midnight-950/80 backdrop-blur-md border border-sky-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,210,255,0.4)] transition-all">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 group-hover:text-cyan-300">
                    0{idx + 1}
                  </span>
                </div>

                {/* Bottom Details */}
                <div className="relative z-10 space-y-2 pt-12 text-left">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2">
                    {srv.description}
                  </p>
                  <div className="pt-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400 group-hover:text-cyan-200">
                    <span>Explore Discipline</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. EXPLORE BY EVENT ("Curated for Every Milestone")
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-sky-500/10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-mono text-violet-300">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>OCCASIONS & EXPERIENCES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase tracking-tight">
            Explore by Event
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Find specialists perfectly attuned to the pacing, lighting, and cultural nuances of your celebration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventsList.map((evt) => (
            <Link
              key={evt.id}
              to={evt.link}
              className="group relative rounded-3xl overflow-hidden glass-card border border-sky-500/15 hover:border-cyan-400/50 p-6 flex flex-col justify-between min-h-[300px] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_25px_rgba(0,210,255,0.2)] text-left"
            >
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-[0.45] group-hover:brightness-[0.6]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/60 to-transparent" />
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-midnight-950/80 backdrop-blur-md text-cyan-300 border border-sky-500/30">
                  {evt.creatorsCount}
                </span>
                <div className="w-8 h-8 rounded-full bg-cyan-400 text-midnight-950 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div className="relative z-10 space-y-1 pt-12">
                <h3 className="text-xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {evt.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {evt.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. TRENDING PORTFOLIOS: Asymmetric Visual Masonry Gallery
          ───────────────────────────────────────────────────────────── */}
      <section id="portfolio" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-sky-500/10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300">
            <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>VISUAL CHRONICLES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase tracking-tight">
            Trending Portfolios
          </h2>
          <p className="text-sm text-slate-300 font-light">
            A curated tapestry of raw emotion, cinematic landscapes, bespoke editorial fashion, and heritage celebrations.
          </p>

          {/* Categories Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {['All', 'Weddings', 'Portraits', 'Events', 'Travel', 'Fashion', 'Products', 'Nature'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActivePortfolioCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
                  activePortfolioCategory === cat
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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-[240px]">
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
                className={`group relative rounded-3xl overflow-hidden glass-card border border-sky-500/15 hover:border-cyan-400/60 cursor-pointer transition-all duration-500 hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(0,210,255,0.25)] text-left ${
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
                  <span className="text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-midnight-950/80 backdrop-blur-md text-cyan-300 border border-sky-500/30">
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
          6. HOW LENSCRAFT WORKS ("The Creative Protocol")
          ───────────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-sky-500/10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300">
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            <span>THE CREATIVE PROTOCOL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase tracking-tight">
            How Lenscraft Works
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light">
            A frictionless, transparent journey from talent curation to milestone-protected master delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {[
            {
              step: '01',
              title: 'Discover & Compare Talent',
              desc: 'Explore vetted photographers and filmmakers with high-res galleries, gear profiles, transparent packages, and verified client endorsements.',
              icon: Search,
            },
            {
              step: '02',
              title: 'Lock Dates with Escrow Security',
              desc: 'Direct message artists to align on moodboards, then confirm dates with a 25% milestone deposit held securely until final delivery.',
              icon: ShieldCheck,
            },
            {
              step: '03',
              title: 'Receive Master Archival Delivery',
              desc: 'Enjoy seamless shoot execution and receive color-graded high-resolution galleries and 4K cinema films via high-speed private cloud backup.',
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
          7. FEATURED CREATORS SPOTLIGHT
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-sky-500/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300">
              <Star className="w-3.5 h-3.5 text-cyan-400" />
              <span>ARTIST SPOTLIGHT</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase tracking-tight">
              Featured Creators
            </h2>
            <p className="text-sm text-slate-300 font-light max-w-xl">
              Meet our leading visual artists trusted by royal weddings, fashion houses, and global documentary publications.
            </p>
          </div>

          <Link
            to="/photographers"
            className="text-xs uppercase font-mono tracking-wider text-cyan-300 hover:text-white font-bold flex items-center gap-1.5"
          >
            <span>View All Collective</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {professionals.slice(0, 3).map((creator) => (
            <div
              key={creator.id}
              className="p-6 rounded-3xl glass-card border border-sky-500/20 hover:border-cyan-400/50 space-y-5 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={creator.avatar || creator.coverImage}
                    alt={creator.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,210,255,0.3)] shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-lg font-display font-bold text-white truncate">{creator.name}</h3>
                      <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                    </div>
                    <p className="text-xs text-cyan-300 font-mono">{creator.category}</p>
                    <div className="flex items-center gap-1 text-[11px] text-amber-400 mt-0.5">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span className="font-bold text-white">{creator.rating || 4.9}</span>
                      <span className="text-slate-400">({creator.reviewCount || 24} reviews)</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed italic">
                  "{creator.bio || creator.tagline || 'Specializing in atmospheric lighting and cinematic visual storytelling.'}"
                </p>

                {/* Gear / Experience pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(creator.gear?.slice(0, 2) || ['Sony A7 IV', 'G-Master 24-70mm', 'Drone Aerials']).map((g, gIdx) => (
                    <span
                      key={gIdx}
                      className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-midnight-950/80 text-slate-300 border border-sky-500/20"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-sky-500/15 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Baseline</span>
                  <span className="text-base font-mono font-bold text-cyan-300">
                    ₹{(creator.startingPrice || 25000).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProForChat(creator);
                      setChatModalOpen(true);
                    }}
                    className="p-2.5 rounded-xl glass-panel text-cyan-300 hover:text-white border border-sky-500/30 hover:border-cyan-400 transition-all"
                    title="Direct Message Creator"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>

                  <Link
                    to={`/professionals/${creator.id}`}
                    className="px-4 py-2.5 rounded-xl glow-btn-primary text-xs uppercase font-mono tracking-wider font-bold inline-flex items-center gap-1 shadow-md"
                  >
                    <span>Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. TESTIMONIALS & CLIENT STORIES
          ───────────────────────────────────────────────────────────── */}
      <section id="stories" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-sky-500/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300">
              <Star className="w-3.5 h-3.5 text-cyan-400" />
              <span>VERIFIED ENDORSEMENTS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase tracking-tight">
              What Our Clients Say
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTestimonialIdx((prev) => (prev > 0 ? prev - 1 : testimonialsList.length - 1))}
              className="p-3 rounded-full glass-panel text-slate-300 hover:text-white hover:border-cyan-400 transition-all cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTestimonialIdx((prev) => (prev < testimonialsList.length - 1 ? prev + 1 : 0))}
              className="p-3 rounded-full glass-panel text-slate-300 hover:text-white hover:border-cyan-400 transition-all cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {testimonialsList.map((t, idx) => {
            const isActive = idx === activeTestimonialIdx;
            return (
              <div
                key={t.id}
                onClick={() => setActiveTestimonialIdx(idx)}
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
          9. CREATOR CTA SECTION ("Are You a Visual Creator?")
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
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
              Monetize your craft, receive direct booking inquiries with 100% escrow protection, and connect with high-value clients across India.
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
          MODALS
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

      <DirectChatModal
        isOpen={chatModalOpen}
        onClose={() => setChatModalOpen(false)}
        professional={selectedProForChat}
        defaultSenderRole="client"
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
