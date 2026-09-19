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
  Image as ImageIcon,
} from 'lucide-react';
import ProfessionalCard from '../../components/cards/ProfessionalCard';
import LightboxModal from '../../components/common/LightboxModal';
import CreatorOnboardingModal from '../../components/common/CreatorOnboardingModal';
import AiMatchmakerModal from '../../components/common/AiMatchmakerModal';
import BookingModal from '../../components/common/BookingModal';
import CinematicCosmosBackground from '../../components/common/CinematicCosmosBackground';
import { usePlatform } from '../../context/PlatformContext';
import { MOCK_PROFESSIONALS } from '../../constants/mockData';

// 1. Photography Services ("What We Capture") - 7 Services
const servicesList = [
  {
    id: 'wedding',
    title: 'Wedding Photography',
    icon: Heart,
    description: 'Timeless visual poetry capturing sacred vows, candid tears, and grand celebratory moments.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85',
    link: '/photographers?category=Wedding',
    accent: 'cyan',
  },
  {
    id: 'portrait',
    title: 'Portrait Photography',
    icon: Camera,
    description: 'Editorial, conceptual, and emotive portraiture designed for personalities and fashion brands.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
    link: '/photographers?category=Portrait',
    accent: 'indigo',
  },
  {
    id: 'event',
    title: 'Event Photography',
    icon: Sparkles,
    description: 'Dynamic coverage of corporate summits, cultural galas, festivals, and milestone private parties.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=85',
    link: '/photographers?category=Event',
    accent: 'violet',
  },
  {
    id: 'travel',
    title: 'Travel & Adventure',
    icon: Compass,
    description: 'Breathtaking expeditions, outdoor documentary expeditions, and high-altitude visual stories.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=85',
    link: '/photographers?category=Travel',
    accent: 'cyan',
  },
  {
    id: 'product',
    title: 'Product Photography',
    icon: Layers,
    description: 'Precision studio lighting, macro texture capture, and high-conversion commercial imagery.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85',
    link: '/photographers?category=Product',
    accent: 'indigo',
  },
  {
    id: 'videography',
    title: 'Videography',
    icon: Video,
    description: '4K cinema wedding films, brand documentaries, drone aerials, and high-impact social motion.',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1000&q=85',
    link: '/videographers',
    accent: 'violet',
  },
  {
    id: 'photo-editing',
    title: 'Photo Editing',
    icon: Wand2,
    description: 'Master skin retouching, color grading, frequency separation, and archival magazine finishing.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=85',
    link: '/editors?type=photo',
    accent: 'cyan',
  },
];

// 2. Portfolio Gallery Items ("Explore Our Stories")
const portfolioGallery = [
  {
    id: 'port-1',
    title: 'Echoes of the Royal Palace',
    category: 'Weddings',
    creator: 'Arjun Mehta',
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

// 3. Transparent Packages ("Choose Your Experience")
const packagesData = [
  {
    id: 'basic',
    name: 'Basic',
    tagline: 'Short Sessions & Intimate Portraits',
    price: 15000,
    priceLabel: '₹15,000',
    duration: '3-4 Hours Session',
    deliverables: '80+ High-Res Edited Photos',
    turnaround: '5 Business Days Delivery',
    isHighlighted: false,
    features: [
      'Pre-shoot moodboard & location scout',
      'High-resolution digital delivery',
      'Private online client gallery',
      'Full personal usage license',
      'Standard color correction',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    tagline: 'Complete Weddings & Commercial Shoots',
    price: 28000,
    priceLabel: '₹28,000',
    duration: '8 Hours Full Coverage',
    deliverables: '250+ Master Edits + Teaser Reel',
    turnaround: '7 Days Express Delivery',
    isHighlighted: true,
    features: [
      '2 Photographers (Lead + Candid specialist)',
      'Custom cinematic film color grade',
      'Handcrafted luxury 30-page hardbound album',
      'Complimentary drone aerial photography',
      'Online client proofing & download portal',
      '3-Year archival cloud backup guarantee',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Full-Day Luxury Cinema & Production',
    price: 45000,
    priceLabel: '₹45,000',
    duration: 'Full Day / Multi-Location',
    deliverables: 'Full Stills Archive + 4K Cinematic Film',
    turnaround: '10 Days Master Delivery',
    isHighlighted: false,
    features: [
      'Full production crew (2 Photographers + 2 Videographers)',
      '4K Cinema drone aerial cinematography',
      '3-5 Minute cinematic highlight film + Full video',
      'Master magazine retouching & sound design',
      'Master raw SSD delivery + Physical luxury box',
      'Dedicated concierge production manager',
    ],
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
      'Booking our wedding team through LensCraft felt like stepping into another world. The atmospheric lighting, candid emotion, and cinematic color grade exceeded every dream we had.',
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
      'The speed, visual clarity, and talent level on LensCraft are extraordinary. We locked moodboards with Nisha in hours, and the editorial spread got featured in top design journals.',
  },
  {
    id: 'rev-3',
    name: 'Aanya & Siddharth',
    category: 'Travel & Destination Story',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    previewImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    location: 'Spiti Valley, Himalayas',
    review:
      'Kabir’s vision during our cold desert expedition was mesmerizing. The starry night captures and candid mountain frames will remain our family treasures forever.',
  },
];

const HomePage = () => {
  const { professionals, favorites, toggleFavorite } = usePlatform();
  const navigate = useNavigate();

  // Search State
  const [searchWhere, setSearchWhere] = useState('');
  const [searchWhat, setSearchWhat] = useState('All Disciplines');
  const [searchWhen, setSearchWhen] = useState('');

  // Modals & Active Tab
  const [creatorModalOpen, setCreatorModalOpen] = useState(false);
  const [matchmakerOpen, setMatchmakerOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedBookingPro, setSelectedBookingPro] = useState(professionals[0] || MOCK_PROFESSIONALS[0]);
  const [activePhotographerTab, setActivePhotographerTab] = useState('all');
  const [activePortfolioCategory, setActivePortfolioCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(0);

  // Testimonial Carousel Index
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // Interactive In-Page Shoot Planner State
  const [plannerPro, setPlannerPro] = useState(professionals[0]?.id || 'pro-1');
  const [plannerService, setPlannerService] = useState('Wedding Photography');
  const [plannerDate, setPlannerDate] = useState('2026-10-15');
  const [plannerTime, setPlannerTime] = useState('10:00 AM');
  const [plannerLocation, setPlannerLocation] = useState('Indore / Mumbai');
  const [plannerPackage, setPlannerPackage] = useState('Standard');

  // Find currently selected planner professional
  const currentPlannerPro = professionals.find((p) => p.id === plannerPro) || professionals[0] || MOCK_PROFESSIONALS[0];

  // Calculate estimated price based on package
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
    if (searchWhere) params.append('city', searchWhere);
    if (searchWhat && searchWhat !== 'All Disciplines') params.append('category', searchWhat);
    if (searchWhen) params.append('date', searchWhen);
    navigate(`/explore?${params.toString()}`);
  };

  // Filter photographers
  const filteredPhotographers = professionals.filter((p) => {
    if (activePhotographerTab === 'all') return true;
    if (activePhotographerTab === 'wedding') return p.category?.toLowerCase().includes('wedding');
    if (activePhotographerTab === 'portrait') return p.category?.toLowerCase().includes('portrait');
    if (activePhotographerTab === 'travel') return p.category?.toLowerCase().includes('travel') || p.category?.toLowerCase().includes('landscape');
    if (activePhotographerTab === 'product') return p.category?.toLowerCase().includes('product') || p.category?.toLowerCase().includes('commercial');
    if (activePhotographerTab === 'event') return p.category?.toLowerCase().includes('event');
    return true;
  });

  // Filter portfolio
  const filteredPortfolio = portfolioGallery.filter((item) => {
    if (activePortfolioCategory === 'All') return true;
    return item.category.toLowerCase() === activePortfolioCategory.toLowerCase();
  });

  const handleSelectPackageAndBook = (pkg) => {
    setPlannerPackage(pkg.name);
    setSelectedBookingPro(currentPlannerPro);
    setBookingModalOpen(true);
  };

  const handleConfirmPlanner = () => {
    setSelectedBookingPro(currentPlannerPro);
    setBookingModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500 selection:text-midnight-950 overflow-x-hidden">
      {/* ─────────────────────────────────────────────────────────────
          GLOBAL CINEMATIC COSMOS CANVAS (Stars, Dust, Glowing Nebulae)
          ───────────────────────────────────────────────────────────── */}
      <CinematicCosmosBackground />

      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION: "Capture moments. Create stories."
          ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[95vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-24 pb-20 overflow-hidden text-center">
        {/* Background Visual: Futuristic Landscape, Photographer Silhouette, Giant Celestial Sphere & Fog */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2200&q=85"
            alt="Futuristic Photography Horizon"
            className="w-full h-full object-cover filter brightness-[0.22] contrast-125 scale-105 animate-ken-burns opacity-65"
          />
          {/* Gradients to blend seamlessly into midnight navy background */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/70 to-[#030712]/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,210,255,0.08)_0%,_transparent_65%)]" />
        </div>

        {/* Ambient Moon / Celestial Glow in background */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-reveal">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-sky-400/30 text-xs font-medium text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="uppercase tracking-widest font-mono text-[11px]">
              Next-Gen Photography Platform
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-white uppercase leading-[1.08]">
            Capture moments.<br />
            Create <span className="text-gradient-cyan text-glow-cyan">stories.</span>
          </h1>

          {/* Supporting Text */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed">
            Discover talented photographers and turn your most important moments into timeless visual stories.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/photographers"
              className="px-8 py-3.5 rounded-full glow-btn-primary text-xs sm:text-sm uppercase tracking-wider font-bold inline-flex items-center gap-2 shadow-[0_0_25px_rgba(0,210,255,0.5)] hover:scale-105 transition-transform"
            >
              <span>Explore Photographers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setBookingModalOpen(true)}
              className="px-8 py-3.5 rounded-full btn-secondary-luxury text-xs sm:text-sm uppercase tracking-wider font-semibold inline-flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>Book a Shoot</span>
            </button>
          </div>

          {/* Embedded Hero Glassmorphism Quick Search */}
          <div className="pt-8 max-w-4xl mx-auto w-full">
            <form
              onSubmit={handleHeroSearch}
              className="glass-panel border border-sky-500/25 p-3 rounded-2xl sm:rounded-full shadow-2xl grid grid-cols-1 sm:grid-cols-12 gap-2.5 text-left"
            >
              {/* Where */}
              <div className="sm:col-span-4 bg-midnight-950/70 border border-sky-500/20 px-4 py-2.5 rounded-xl sm:rounded-full flex items-center gap-2.5 focus-within:border-cyan-400 transition-colors">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Where?</label>
                  <input
                    type="text"
                    value={searchWhere}
                    onChange={(e) => setSearchWhere(e.target.value)}
                    placeholder="City (e.g. Mumbai, Indore)"
                    className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* What */}
              <div className="sm:col-span-4 bg-midnight-950/70 border border-sky-500/20 px-4 py-2.5 rounded-xl sm:rounded-full flex items-center gap-2.5 focus-within:border-cyan-400 transition-colors">
                <Camera className="w-4 h-4 text-cyan-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Photography Service</label>
                  <select
                    value={searchWhat}
                    onChange={(e) => setSearchWhat(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm text-white focus:outline-none cursor-pointer"
                  >
                    <option value="All Disciplines" className="bg-midnight-950 text-white">All Disciplines</option>
                    <option value="Wedding" className="bg-midnight-950 text-white">Wedding Photography</option>
                    <option value="Portrait" className="bg-midnight-950 text-white">Portrait Photography</option>
                    <option value="Event" className="bg-midnight-950 text-white">Event Photography</option>
                    <option value="Travel" className="bg-midnight-950 text-white">Travel & Adventure</option>
                    <option value="Product" className="bg-midnight-950 text-white">Product Photography</option>
                    <option value="Videography" className="bg-midnight-950 text-white">Videography</option>
                    <option value="Photo Editing" className="bg-midnight-950 text-white">Photo Editing</option>
                  </select>
                </div>
              </div>

              {/* When */}
              <div className="sm:col-span-2 bg-midnight-950/70 border border-sky-500/20 px-4 py-2.5 rounded-xl sm:rounded-full flex items-center gap-2.5 focus-within:border-cyan-400 transition-colors">
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

              {/* Submit */}
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full h-full min-h-[48px] py-2.5 px-5 glow-btn-primary text-xs uppercase tracking-widest font-bold rounded-xl sm:rounded-full flex items-center justify-center gap-1.5 shadow-md hover:scale-105 transition-transform"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. PHOTOGRAPHY SERVICES: "What We Capture"
          ───────────────────────────────────────────────────────────── */}
      <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-cyan-300">
            <Camera className="w-3.5 h-3.5 text-cyan-400" />
            <span>DISCIPLINES & STYLES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase tracking-tight">
            What We Capture
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            From intimate portraits to unforgettable celebrations, find the right visual storyteller for every moment.
          </p>
        </div>

        {/* 7 Floating Glass Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {servicesList.map((srv, idx) => {
            const IconComp = srv.icon;
            const isWide = idx === 0; // First card takes full wedding emphasis
            return (
              <Link
                key={srv.id}
                to={srv.link}
                className={`group relative rounded-3xl overflow-hidden glass-card border border-sky-500/15 hover:border-cyan-400/50 p-6 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_25px_rgba(0,210,255,0.2)] ${
                  isWide ? 'xl:col-span-2 min-h-[360px]' : 'min-h-[340px]'
                }`}
              >
                {/* Background Image with Zoom & Dark Gradient */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-[0.45] group-hover:brightness-[0.6]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/70 to-transparent" />
                </div>

                {/* Top: Icon Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-midnight-950/80 backdrop-blur-md border border-sky-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,210,255,0.4)] transition-all">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 group-hover:text-cyan-300">
                    0{idx + 1}
                  </span>
                </div>

                {/* Bottom: Info & Explore Trigger */}
                <div className="relative z-10 space-y-2 pt-12">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2">
                    {srv.description}
                  </p>
                  <div className="pt-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400 group-hover:text-cyan-200">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. FEATURED PHOTOGRAPHERS
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-sky-500/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300">
              <Award className="w-3.5 h-3.5 text-indigo-400" />
              <span>VERIFIED TALENT</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase tracking-tight">
              Featured Photographers
            </h2>
            <p className="text-sm text-slate-300 font-light max-w-xl">
              Connect directly with vetted master photographers across major cities, transparent pricing, and instant booking.
            </p>
          </div>

          {/* Filter Tabs */}
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

        {/* Photographers Grid */}
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
          4. EXPLORE PORTFOLIO: "Explore Our Stories" (Asymmetric Masonry)
          ───────────────────────────────────────────────────────────── */}
      <section id="portfolio" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-sky-500/10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-mono text-violet-300">
            <ImageIcon className="w-3.5 h-3.5 text-violet-400" />
            <span>VISUAL CHRONICLES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase tracking-tight">
            Explore Our Stories
          </h2>
          <p className="text-sm text-slate-300 font-light">
            An asymmetric tapestry of raw emotion, cinematic landscapes, bespoke editorial fashion, and heritage celebrations.
          </p>

          {/* Categories Filter Bar */}
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
                className={`group relative rounded-3xl overflow-hidden glass-card border border-sky-500/15 hover:border-cyan-400/60 cursor-pointer transition-all duration-500 hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(0,210,255,0.25)] ${
                  isSpan2 ? 'md:col-span-2 row-span-2' : isSpanTall ? 'row-span-2' : 'row-span-1'
                }`}
              >
                {/* Image with zoom */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-90 group-hover:brightness-105"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Top Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-midnight-950/80 backdrop-blur-md text-cyan-300 border border-sky-500/30">
                    {item.category}
                  </span>
                </div>

                {/* Hover Reveal: Circular Arrow Button (Top Right) */}
                <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-cyan-400 text-midnight-950 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-[0_0_15px_rgba(0,210,255,0.6)]">
                  <ArrowUpRight className="w-5 h-5" />
                </div>

                {/* Bottom Details (Title, Creator, Location) */}
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
          5. BOOKING EXPERIENCE: "Plan Your Shoot"
          ───────────────────────────────────────────────────────────── */}
      <section id="plan-shoot" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-sky-500/10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-cyan-300">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>INSTANT CONFIGURATOR</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase tracking-tight">
            Plan Your Shoot
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light">
            Select your dream visual storyteller, preferred date, custom package, and lock in your session seamlessly.
          </p>
        </div>

        {/* Futuristic Glassmorphism Booking Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 glass-panel border border-sky-500/25 p-6 sm:p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          {/* Left: Interactive Step-by-Step Selectors (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Select Photographer */}
            <div className="space-y-2">
              <label className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px]">1</span>
                <span>Select Photographer / Studio</span>
              </label>
              <select
                value={plannerPro}
                onChange={(e) => setPlannerPro(e.target.value)}
                className="w-full glass-input px-4 py-3 rounded-2xl text-sm text-white focus:outline-none cursor-pointer"
              >
                {professionals.map((p) => (
                  <option key={p.id} value={p.id} className="bg-midnight-950 text-white">
                    {p.name} — {p.category || 'Lead Photographer'} (₹{p.startingPrice?.toLocaleString('en-IN')})
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Select Photography Service */}
            <div className="space-y-2">
              <label className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px]">2</span>
                <span>Select Photography Service</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {['Wedding Photography', 'Portrait Photography', 'Event Photography', 'Travel & Adventure', 'Product Photography', '4K Videography'].map((srv) => (
                  <button
                    key={srv}
                    type="button"
                    onClick={() => setPlannerService(srv)}
                    className={`p-2.5 rounded-xl text-xs font-medium text-left transition-all border ${
                      plannerService === srv
                        ? 'bg-sky-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,210,255,0.25)]'
                        : 'bg-midnight-950/60 border-sky-500/15 text-slate-300 hover:border-sky-500/40'
                    }`}
                  >
                    {srv}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3 & 4: Date & Available Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px]">3</span>
                  <span>Select Date</span>
                </label>
                <input
                  type="date"
                  value={plannerDate}
                  onChange={(e) => setPlannerDate(e.target.value)}
                  className="w-full glass-input px-4 py-2.5 rounded-2xl text-xs sm:text-sm text-white focus:outline-none cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px]">4</span>
                  <span>Available Time Slot</span>
                </label>
                <select
                  value={plannerTime}
                  onChange={(e) => setPlannerTime(e.target.value)}
                  className="w-full glass-input px-4 py-2.5 rounded-2xl text-xs sm:text-sm text-white focus:outline-none cursor-pointer"
                >
                  <option value="09:00 AM" className="bg-midnight-950">09:00 AM (Golden Morning Light)</option>
                  <option value="11:30 AM" className="bg-midnight-950">11:30 AM (Midday Studio)</option>
                  <option value="04:00 PM" className="bg-midnight-950">04:00 PM (Sunset Golden Hour)</option>
                  <option value="07:00 PM" className="bg-midnight-950">07:00 PM (Night & Ambient Gala)</option>
                </select>
              </div>
            </div>

            {/* Step 5: Location */}
            <div className="space-y-2">
              <label className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px]">5</span>
                <span>Select Location / Destination</span>
              </label>
              <input
                type="text"
                value={plannerLocation}
                onChange={(e) => setPlannerLocation(e.target.value)}
                placeholder="e.g. Udaipur, Lake Palace / Mumbai Studio"
                className="w-full glass-input px-4 py-2.5 rounded-2xl text-xs sm:text-sm text-white focus:outline-none"
              />
            </div>

            {/* Step 6: Select Package */}
            <div className="space-y-2">
              <label className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px]">6</span>
                <span>Choose Package Experience</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['Basic', 'Standard', 'Premium'].map((pkg) => (
                  <button
                    key={pkg}
                    type="button"
                    onClick={() => setPlannerPackage(pkg)}
                    className={`py-3 px-3 rounded-2xl text-center transition-all border ${
                      plannerPackage === pkg
                        ? 'bg-sky-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.3)]'
                        : 'bg-midnight-950/60 border-sky-500/15 text-slate-300 hover:border-sky-500/40'
                    }`}
                  >
                    <p className="text-xs font-bold uppercase">{pkg}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {pkg === 'Basic' ? 'Short' : pkg === 'Standard' ? 'Full Day' : 'Cinema+'}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Real-time Photographer Preview & Booking Summary (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between glass-card border border-sky-500/25 p-6 rounded-3xl bg-midnight-950/80 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">Booking Summary</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  Instant Availability
                </span>
              </div>

              {/* Photographer Mini Preview Card */}
              <div className="flex items-center gap-4 p-3 rounded-2xl bg-midnight-900/60 border border-sky-500/20">
                <img
                  src={currentPlannerPro.coverImage || currentPlannerPro.avatar}
                  alt={currentPlannerPro.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-sky-500/30 shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-display font-bold text-white truncate">{currentPlannerPro.name}</h4>
                  <p className="text-xs text-cyan-300 truncate">{currentPlannerPro.category}</p>
                  <div className="flex items-center gap-1 text-[11px] text-amber-400 mt-0.5">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{currentPlannerPro.rating?.toFixed(1)}</span>
                    <span className="text-slate-400">({currentPlannerPro.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Details Breakdown */}
              <div className="space-y-2.5 text-xs text-slate-300 pt-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Service:</span>
                  <span className="font-medium text-white">{plannerService}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Date & Slot:</span>
                  <span className="font-medium text-white">{plannerDate} · {plannerTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Location:</span>
                  <span className="font-medium text-white truncate max-w-[160px]">{plannerLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Selected Package:</span>
                  <span className="font-medium text-cyan-300 font-mono">{plannerPackage} Tier</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Escrow Security:</span>
                  <span className="text-emerald-400 font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> 100% Protected
                  </span>
                </div>
              </div>

              {/* Price Calculation Box */}
              <div className="p-4 rounded-2xl bg-midnight-900 border border-sky-500/30 flex items-baseline justify-between mt-4">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">Estimated Total</span>
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-cyan-300">
                    ₹{getEstimatedPrice().toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">Zero hidden fees</span>
              </div>
            </div>

            {/* Confirm & Book CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleConfirmPlanner}
                className="w-full py-3.5 px-6 rounded-2xl glow-btn-primary text-xs uppercase tracking-wider font-bold shadow-[0_0_25px_rgba(0,210,255,0.45)] hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Confirm & Book Shoot</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. PACKAGES: "Choose Your Experience"
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-sky-500/10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>TRANSPARENT VALUE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase tracking-tight">
            Choose Your Experience
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light">
            All-inclusive production packages tailored with master edits, guaranteed turnaround, and high-resolution delivery.
          </p>
        </div>

        {/* 3 Glassmorphism Packages Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {packagesData.map((pkg) => (
            <div
              key={pkg.id}
              className={`p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 ${
                pkg.isHighlighted
                  ? 'glass-card border-2 border-cyan-400/80 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(0,210,255,0.25)] relative scale-105 bg-midnight-950/90'
                  : 'glass-card border border-sky-500/15 hover:border-sky-500/40 bg-midnight-950/70'
              }`}
            >
              {pkg.isHighlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="text-[11px] font-bold uppercase tracking-widest px-4 py-1 rounded-full bg-cyan-400 text-midnight-950 shadow-[0_0_15px_rgba(0,210,255,0.6)]">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-display font-bold text-white">{pkg.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{pkg.tagline}</p>
                </div>

                <div className="pb-6 border-b border-white/10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-mono font-extrabold text-cyan-300">{pkg.priceLabel}</span>
                    <span className="text-xs text-slate-400">/ session</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300 mt-2 font-mono">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{pkg.duration}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  <p className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold">Included In Package:</p>
                  {pkg.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button
                  type="button"
                  onClick={() => handleSelectPackageAndBook(pkg)}
                  className={`w-full py-3.5 px-4 rounded-2xl text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                    pkg.isHighlighted ? 'glow-btn-primary shadow-[0_0_20px_rgba(0,210,255,0.4)]' : 'btn-secondary-luxury'
                  }`}
                >
                  Choose {pkg.name} Package
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. HOW IT WORKS: Horizontal Futuristic Timeline
          ───────────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-sky-500/10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300">
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            <span>THE CREATIVE PROTOCOL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase tracking-tight">
            How It Works
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light">
            A seamless journey from creative discovery to high-resolution archival memories.
          </p>
        </div>

        {/* 5-Step Timeline Grid with glowing connecting line */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
          {[
            { step: '01', title: 'Discover', desc: 'Explore photographers and portfolios across styles, cities, and authentic stories.' },
            { step: '02', title: 'Choose', desc: 'Select photographer, package and date with upfront transparent pricing.' },
            { step: '03', title: 'Book', desc: 'Confirm your shoot with 100% secure escrow advance milestone protection.' },
            { step: '04', title: 'Capture', desc: 'Enjoy your photography experience guided by vetted visual artists.' },
            { step: '05', title: 'Relive', desc: 'Receive your master edited memories via private high-speed client cloud gallery.' },
          ].map((item, idx) => (
            <div
              key={item.step}
              className="p-6 rounded-3xl glass-card border border-sky-500/15 hover:border-cyan-400/50 space-y-3 relative group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(0,210,255,0.18)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl font-display font-extrabold text-cyan-400/50 group-hover:text-cyan-300 transition-colors">
                  {item.step}
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400/40 group-hover:bg-cyan-400 group-hover:shadow-[0_0_10px_rgba(0,210,255,0.8)] transition-all" />
              </div>
              <h3 className="text-lg font-display font-bold text-white group-hover:text-cyan-200 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. STATS / TRUST SECTION
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-sky-500/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '500+', label: 'Happy Clients', icon: Users, glow: 'cyan' },
            { value: '1.2K+', label: 'Photos Delivered', icon: Camera, glow: 'sky' },
            { value: '50+', label: 'Locations', icon: Globe2, glow: 'indigo' },
            { value: '4.9/5', label: 'Average Rating', icon: Star, glow: 'violet' },
          ].map((stat, idx) => {
            const IconC = stat.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl glass-card border border-sky-500/15 text-center space-y-2 group hover:border-cyan-400/40 transition-all"
              >
                <div className="w-10 h-10 rounded-2xl bg-midnight-950 border border-sky-500/20 mx-auto flex items-center justify-center text-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,210,255,0.4)] transition-all">
                  <IconC className="w-5 h-5" />
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
                  {stat.value}
                </div>
                <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. CLIENT STORIES: "What Our Clients Say"
          ───────────────────────────────────────────────────────────── */}
      <section id="stories" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-sky-500/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300">
              <Star className="w-3.5 h-3.5 text-cyan-400" />
              <span>TESTIMONIAL STORIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase tracking-tight">
              What Our Clients Say
            </h2>
          </div>

          {/* Carousel Previous / Next Controls */}
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

        {/* Testimonial Cards Grid with Active Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  {/* Rating Stars & Category */}
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

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                    "{t.review}"
                  </p>
                </div>

                {/* Bottom: Client info + Shoot Image Preview Thumbnail */}
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
          10. FINAL CTA: "Your story deserves beautiful photographs."
          ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="relative rounded-3xl overflow-hidden glass-card border border-sky-500/30 p-8 sm:p-14 lg:p-20 text-center space-y-6 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(0,210,255,0.2)]">
          {/* Background Image: Celestial Planet, Silhouette & Mountain Horizon */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85"
              alt="Final Cinematic Horizon"
              className="w-full h-full object-cover filter brightness-[0.22] contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/80 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,210,255,0.15)_0%,_transparent_70%)]" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-sky-400/30 text-xs font-mono text-cyan-300">
              <Camera className="w-3.5 h-3.5 text-cyan-400" />
              <span>THE EMOTIONAL CLIMAX</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-white uppercase tracking-tight leading-tight">
              Your story deserves<br />
              <span className="text-gradient-cyan text-glow-cyan">beautiful photographs.</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto">
              Find the right photographer and turn your next moment into something unforgettable.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                to="/photographers"
                className="px-8 py-3.5 rounded-full glow-btn-primary text-xs uppercase tracking-wider font-bold inline-flex items-center gap-2 shadow-[0_0_25px_rgba(0,210,255,0.5)] hover:scale-105 transition-all"
              >
                <span>Explore Photographers</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => setBookingModalOpen(true)}
                className="px-8 py-3.5 rounded-full btn-secondary-luxury text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-2 hover:scale-105 transition-all"
              >
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>Book a Shoot</span>
              </button>
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
