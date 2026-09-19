import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  Award,
  ArrowRight,
  Star,
  CheckCircle2,
  Clock,
  Maximize2,
  Calendar,
  MapPin,
  Heart,
  Camera,
  Video,
  Film,
  Compass,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Layers,
  Check,
  Eye,
  Send,
  Zap,
  Play,
} from 'lucide-react';
import ProfessionalCard from '../../components/cards/ProfessionalCard';
import LightboxModal from '../../components/common/LightboxModal';
import CreatorOnboardingModal from '../../components/common/CreatorOnboardingModal';
import AiMatchmakerModal from '../../components/common/AiMatchmakerModal';
import { MOCK_PROFESSIONALS } from '../../constants/mockData';
import { usePlatform } from '../../hooks/usePlatform';
import { formatCurrency } from '../../utils/formatters';

const HomePage = () => {
  const { professionals, createBooking } = usePlatform();
  const navigate = useNavigate();

  // Modals & Active States
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(0);
  const [creatorModalOpen, setCreatorModalOpen] = useState(false);
  const [matchmakerOpen, setMatchmakerOpen] = useState(false);
  const [activeSpecialtyTab, setActiveSpecialtyTab] = useState('all');
  const [activePortfolioCategory, setActivePortfolioCategory] = useState('all');
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // In-Page Interactive Shoot Planner State
  const [selectedPlannerPro, setSelectedPlannerPro] = useState(professionals[0]?.id || 'pro-1');
  const [selectedPlannerService, setSelectedPlannerService] = useState('Wedding Photography');
  const [selectedPlannerDate, setSelectedPlannerDate] = useState('2026-10-24');
  const [selectedPlannerTime, setSelectedPlannerTime] = useState('09:00 AM');
  const [selectedPlannerLocation, setSelectedPlannerLocation] = useState('Udaipur, Rajasthan');
  const [selectedPlannerPackage, setSelectedPlannerPackage] = useState('standard');
  const [plannerBookingSuccess, setPlannerBookingSuccess] = useState(false);

  // Mouse Parallax for Hero
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // ─────────────────────────────────────────────────────────────
  // 1. SERVICES DATA ("What We Capture")
  // ─────────────────────────────────────────────────────────────
  const photographyServices = [
    {
      id: 'srv-wedding',
      title: 'Wedding Photography',
      description: 'Intimate candid moments, emotional vows, and grand royal celebrations captured with editorial elegance.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      icon: Heart,
      badge: 'Most Booked',
      link: '/photographers?category=weddings',
    },
    {
      id: 'srv-portrait',
      title: 'Portrait Photography',
      description: 'Fine art studio lighting, expressive character headshots, and cinematic personal mood-boards.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      icon: Camera,
      badge: 'Fine Art',
      link: '/photographers?category=personal-shoots',
    },
    {
      id: 'srv-event',
      title: 'Event Photography',
      description: 'High-energy galas, fashion runways, cultural summits, and VIP gatherings captured with atmospheric flash.',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
      icon: Sparkles,
      badge: 'High Dynamic',
      link: '/photographers?category=corporate',
    },
    {
      id: 'srv-travel',
      title: 'Travel & Adventure',
      description: 'Breathtaking landscapes, high-altitude expeditions, and destination storytelling from the Himalayas to Santorini.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      icon: Compass,
      badge: 'Expedition',
      link: '/photographers?category=pre-wedding',
    },
    {
      id: 'srv-product',
      title: 'Product Photography',
      description: 'Luxury commercial stills, macro textures, precision specular lighting, and high-conversion brand campaigns.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      icon: Layers,
      badge: 'Commercial',
      link: '/photographers?category=commercial',
    },
    {
      id: 'srv-videography',
      title: 'Videography',
      description: 'DCI 4K cinema cameras, anamorphic lenses, drone sweeping orbits, and emotionally scored films.',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
      icon: Video,
      badge: '4K Cinema',
      link: '/videographers',
    },
    {
      id: 'srv-editing',
      title: 'Photo Editing',
      description: 'High-end frequency separation, custom film LUT color grading, skin retouching, and master archival exports.',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
      icon: Film,
      badge: 'Post-Production',
      link: '/editors',
    },
  ];

  // ─────────────────────────────────────────────────────────────
  // 2. ASYMMETRIC PORTFOLIO GALLERY ITEMS ("Explore Our Stories")
  // ─────────────────────────────────────────────────────────────
  const portfolioStories = [
    {
      id: 'port-1',
      title: 'Sunset Palace Nuptials in Udaipur',
      category: 'Weddings',
      location: 'Udaipur, Rajasthan',
      creatorName: 'Aarav Mehta',
      creatorId: 'pro-1',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
      span: 'col-span-1 sm:col-span-2 lg:col-span-2 row-span-2',
      aspect: 'h-[440px] sm:h-[500px]',
    },
    {
      id: 'port-2',
      title: 'High-Altitude Pre-Wedding in Ladakh',
      category: 'Travel',
      location: 'Ladakh, Himalayas',
      creatorName: 'Kabir Varma',
      creatorId: 'pro-2',
      url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1000&q=85',
      span: 'col-span-1 sm:col-span-1 lg:col-span-1 row-span-1',
      aspect: 'h-[240px]',
    },
    {
      id: 'port-3',
      title: 'Candid Natural Light Bridal Portrait',
      category: 'Portraits',
      location: 'Jaipur, Rajasthan',
      creatorName: 'Aarav Mehta',
      creatorId: 'pro-1',
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=85',
      span: 'col-span-1 sm:col-span-1 lg:col-span-1 row-span-1',
      aspect: 'h-[240px]',
    },
    {
      id: 'port-4',
      title: 'Runway Backstage Haute Couture',
      category: 'Fashion',
      location: 'Mumbai Fashion Week',
      creatorName: 'Sanya Kapoor',
      creatorId: 'pro-3',
      url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85',
      span: 'col-span-1 sm:col-span-1 lg:col-span-1 row-span-2',
      aspect: 'h-[360px] sm:h-[500px]',
    },
    {
      id: 'port-5',
      title: 'Specular Lighting for Chronograph Timepiece',
      category: 'Products',
      location: 'Studio Bandra, Mumbai',
      creatorName: 'Rohan Deshmukh',
      creatorId: 'pro-4',
      url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85',
      span: 'col-span-1 sm:col-span-1 lg:col-span-1 row-span-1',
      aspect: 'h-[240px]',
    },
    {
      id: 'port-6',
      title: 'Midnight Light Trails & Sangeet Dance',
      category: 'Events',
      location: 'Goa Coastal Resort',
      creatorName: 'Kabir Varma',
      creatorId: 'pro-2',
      url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1000&q=85',
      span: 'col-span-1 sm:col-span-2 lg:col-span-2 row-span-1',
      aspect: 'h-[240px]',
    },
    {
      id: 'port-7',
      title: 'Misty Alpine Ridge & Wild Pines',
      category: 'Nature',
      location: 'Spiti Valley',
      creatorName: 'Aarav Mehta',
      creatorId: 'pro-1',
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=85',
      span: 'col-span-1 sm:col-span-1 lg:col-span-1 row-span-1',
      aspect: 'h-[240px]',
    },
  ];

  const filteredPortfolio =
    activePortfolioCategory === 'all'
      ? portfolioStories
      : portfolioStories.filter(
          (item) => item.category.toLowerCase() === activePortfolioCategory.toLowerCase()
        );

  // ─────────────────────────────────────────────────────────────
  // 3. PACKAGES DATA ("Choose Your Experience")
  // ─────────────────────────────────────────────────────────────
  const packagesList = [
    {
      id: 'basic',
      name: 'Basic Experience',
      tagline: 'Ideal for intimate portraits, couple sessions & short events.',
      price: 18000,
      deliveryDays: 5,
      features: [
        '3–4 Hours on-location shoot',
        'Single Master Photographer',
        '50+ Hand-Retouched High-Res Photos',
        'Online Digital Cloud Master Gallery',
        'Standard Color Grade & Skin Tone Polish',
        '100% Escrow Protection Guarantee',
      ],
      isPopular: false,
    },
    {
      id: 'standard',
      name: 'Standard Experience',
      tagline: 'Our signature package for royal weddings, campaigns & full-day events.',
      price: 38000,
      deliveryDays: 8,
      features: [
        '8–10 Hours Comprehensive Coverage',
        'Lead Photographer + Second Candid Shooter',
        '200+ Master Edited High-Res Stills',
        'Priority 48-Hour Early Teaser Selection',
        'Drone Aerial Stills Included',
        'Full Commercial & Print Usage Rights',
        'Private Cloud Gallery with 2-Year Hosting',
      ],
      isPopular: true,
    },
    {
      id: 'premium',
      name: 'Premium Experience',
      tagline: 'Turnkey production with dual photo masters, 4K cinema DP & hardcopy album.',
      price: 65000,
      deliveryDays: 14,
      features: [
        'Full Multi-Day Comprehensive Production',
        '2 Master Photographers + 1 Cinema DP Rig',
        '400+ Ultra High-Res Master Graded Stills',
        '4K Cinematic Teaser (3–5 mins) + Full Extended Film',
        'Hardcover Handcrafted Master Coffee Table Album',
        'Same-Day Social Media Express Selects',
        'Dedicated Creative Director & Concierge',
      ],
      isPopular: false,
    },
  ];

  // ─────────────────────────────────────────────────────────────
  // 4. CLIENT STORIES TESTIMONIALS
  // ─────────────────────────────────────────────────────────────
  const clientTestimonials = [
    {
      id: 't-1',
      name: 'Rhea & Vikram Kapoor',
      category: 'Destination Wedding',
      location: 'Udaipur, Rajasthan',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      review:
        'Booking Aarav through LensCraft transformed our Udaipur palace wedding into pure cinematic magic. The lighting, candid emotional timing, and 48-hour teaser video brought our entire family to tears.',
      photoPreview: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 't-2',
      name: 'Elena Rostova',
      category: 'Luxury Brand Campaign',
      location: 'Paris & Mumbai',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      review:
        'We commissioned Kabir for our luxury fragrance launch commercial. The cinema camera rig, anamorphic reflections, and master DaVinci color grading surpassed every global advertising benchmark.',
      photoPreview: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 't-3',
      name: 'Karan Singhania',
      category: 'Fashion Lookbook',
      location: 'Mumbai, India',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      review:
        'Sanya delivered a batch of 8 editorial reels for our runway collection. The pacing and visual grade generated over 2.4M organic views across our brand channels. Outstanding professionalism.',
      photoPreview: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=400&q=80',
    },
  ];

  // Filter Featured Photographers
  const filteredPhotographers =
    activeSpecialtyTab === 'all'
      ? professionals
      : professionals.filter(
          (p) =>
            p.role.toLowerCase() === activeSpecialtyTab.toLowerCase() ||
            (p.specialties || []).some((s) =>
              s.toLowerCase().includes(activeSpecialtyTab.toLowerCase())
            )
        );

  // Handle In-Page Planner Booking Confirmation
  const currentPlannerProObj =
    professionals.find((p) => p.id === selectedPlannerPro) || professionals[0];
  const currentPlannerPkgObj =
    packagesList.find((pkg) => pkg.id === selectedPlannerPackage) || packagesList[1];

  const handleConfirmPlannerBooking = () => {
    createBooking({
      professional: currentPlannerProObj,
      service: {
        title: `${selectedPlannerService} (${currentPlannerPkgObj.name})`,
        price: currentPlannerPkgObj.price,
      },
      eventDate: selectedPlannerDate,
      eventTime: selectedPlannerTime,
      eventCity: selectedPlannerLocation,
      eventType: selectedPlannerService,
      totalAmount: currentPlannerPkgObj.price,
      advanceEscrowDeposit: Math.round(currentPlannerPkgObj.price * 0.3),
      notes: 'Booked via LensCraft Interactive Shoot Planner',
    });
    setPlannerBookingSuccess(true);
  };

  return (
    <div className="space-y-32 pb-24 text-left relative z-10 overflow-hidden">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (Immersive Futuristic Photography World)
         ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Cinematic Backdrop Image with Deep Midnight Vignette & Parallax */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2400&q=90"
            alt="Futuristic Photography Environment"
            className="w-full h-full object-cover opacity-25 animate-ken-burns scale-105"
            style={{
              transform: `translate3d(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px, 0)`,
            }}
          />
          {/* Deep Cosmic Vignette & Color Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-transparent to-[#030712]" />
          <div className="absolute inset-0 cosmic-radial-overlay opacity-80" />
        </div>

        {/* Ambient Glowing Lens Flare & Giant Horizon Ring */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-sky-500/15 via-indigo-500/10 to-transparent blur-[120px] pointer-events-none animate-pulse-glow"
          style={{ animationDuration: '8s' }}
        />

        {/* Floating Framed Photo 1 (Left Tilt) */}
        <div
          className="hidden xl:block absolute left-8 top-1/4 w-56 rounded-2xl overflow-hidden glass-card p-2 transform -rotate-6 transition-transform duration-700 hover:rotate-0 hover:scale-105 z-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          style={{
            transform: `translate3d(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px, 0) rotate(-6deg)`,
          }}
        >
          <div className="relative h-44 rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=600&q=80"
              alt="Himalayan Story"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
            <span className="absolute bottom-2 left-2 text-[10px] font-mono text-sky-300 font-semibold">
              35mm · Ladakh
            </span>
          </div>
        </div>

        {/* Floating Framed Photo 2 (Right Tilt) */}
        <div
          className="hidden xl:block absolute right-8 top-1/3 w-60 rounded-2xl overflow-hidden glass-card p-2 transform rotate-6 transition-transform duration-700 hover:rotate-0 hover:scale-105 z-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          style={{
            transform: `translate3d(${mousePos.x * -0.8}px, ${mousePos.y * -0.8}px, 0) rotate(6deg)`,
          }}
        >
          <div className="relative h-48 rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80"
              alt="Bridal Masterpiece"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
            <span className="absolute bottom-2 left-2 text-[10px] font-mono text-sky-300 font-semibold">
              85mm f/1.4 · Royal Edit
            </span>
          </div>
        </div>

        {/* Corner Film Frame Metadata */}
        <div className="absolute top-10 left-8 hidden md:flex items-center gap-2 text-[10px] font-mono text-sky-400/60 tracking-widest uppercase z-10">
          <Camera className="w-3.5 h-3.5 text-sky-400" />
          <span>CINEMATIC ARCHIVAL ROSTER // 2026</span>
          <span className="w-8 h-px bg-sky-500/30" />
        </div>
        <div className="absolute top-10 right-8 hidden md:flex items-center gap-2 text-[10px] font-mono text-sky-400/60 tracking-widest uppercase z-10">
          <span>100% ESCROW BONDED</span>
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
        </div>

        {/* Hero Content Container */}
        <div className="max-w-5xl mx-auto relative z-10 text-center flex flex-col items-center">
          {/* Futuristic Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-950/60 backdrop-blur-xl border border-sky-500/30 text-sky-300 text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-[0.25em] mb-8 shadow-[0_0_20px_rgba(56,189,248,0.2)] animate-reveal">
            <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-spin-slow" />
            <span>THE FUTURE OF PHOTOGRAPHY & VISUAL ARTS</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-white max-w-4xl leading-[1.04] mb-8 uppercase">
            Capture moments. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 text-glow-cyan">
              Create stories.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Discover talented photographers and turn your most important moments into timeless visual stories.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold mb-12">
            <Link to="/photographers">
              <button
                type="button"
                className="px-8 py-3.5 rounded-full text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 shadow-[0_0_30px_rgba(0,210,255,0.5)] border border-sky-300/30 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center gap-2 text-sm"
              >
                <span>Explore Photographers</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('plan-shoot');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3.5 rounded-full text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800/90 border border-sky-500/30 hover:border-sky-400/60 backdrop-blur-xl shadow-lg transition-all duration-300 hover:scale-[1.03] flex items-center gap-2 text-sm"
            >
              <Calendar className="w-4 h-4 text-sky-400" />
              <span>Book a Shoot</span>
            </button>
          </div>

          {/* Quick Category Jump Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span className="font-mono text-[10px] uppercase tracking-wider text-sky-400/70 mr-1">
              Curated Disciplines:
            </span>
            {[
              { label: 'Weddings', link: '/photographers?category=weddings' },
              { label: 'Cinematic Pre-Wedding', link: '/videographers?category=pre-wedding' },
              { label: 'Commercial & Product', link: '/photographers?category=commercial' },
              { label: 'Editorial Retouching', link: '/editors' },
            ].map((tag) => (
              <Link
                key={tag.label}
                to={tag.link}
                className="px-3 py-1 rounded-full bg-slate-900/60 hover:bg-sky-500/20 border border-sky-500/20 text-slate-300 hover:text-sky-300 transition-all text-[11px]"
              >
                {tag.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. PHOTOGRAPHY SERVICES SECTION ("What We Capture")
         ───────────────────────────────────────────────────────────── */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/60 border border-sky-500/30 text-sky-400 text-[10px] font-mono uppercase tracking-[0.2em]">
            <span>01 — VISUAL DISCIPLINES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            What We Capture
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl mx-auto">
            From intimate portraits to unforgettable celebrations, find the right visual storyteller for every moment.
          </p>
        </div>

        {/* 7 Floating Glass Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {photographyServices.map((service, idx) => {
            const Icon = service.icon;
            const isWide = idx === 0;

            return (
              <div
                key={service.id}
                className={`group relative rounded-2xl overflow-hidden glass-card border border-sky-500/20 hover:border-sky-400/60 transition-all duration-300 flex flex-col justify-between ${
                  isWide ? 'xl:col-span-2' : ''
                }`}
              >
                {/* Background Image Container with Hover Zoom */}
                <div className="relative h-56 overflow-hidden bg-slate-900">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060b19] via-[#060b19]/40 to-transparent" />

                  {/* Badge & Icon Pill */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-slate-950/80 backdrop-blur-md border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-xs">
                      <Icon className="w-4 h-4 stroke-[1.75]" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-sky-300 border border-sky-500/20">
                      {service.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-display font-bold text-white group-hover:text-sky-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <Link
                    to={service.link}
                    className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-bold text-sky-400 group-hover:text-sky-300 group-hover:translate-x-1 transition-all"
                  >
                    <span>Explore Talent</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. FEATURED PHOTOGRAPHERS SECTION
         ───────────────────────────────────────────────────────────── */}
      <section id="photographers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-sky-500/20">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-sky-400 block mb-1">
              02 — CERTIFIED CREATIVE ROSTER
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
              Featured Photographers
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-slate-900/80 border border-sky-500/20">
            {[
              { id: 'all', label: 'All Creatives' },
              { id: 'photographer', label: 'Wedding & Portrait' },
              { id: 'videographer', label: 'Cinematographers' },
              { id: 'editor', label: 'Color Graders' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSpecialtyTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeSpecialtyTab === tab.id
                    ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Photographers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotographers.slice(0, 4).map((pro) => (
            <ProfessionalCard key={pro.id} professional={pro} />
          ))}
        </div>

        <div className="text-center pt-4">
          <Link to="/photographers">
            <button
              type="button"
              className="px-8 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-sky-300 hover:text-white border border-sky-500/30 hover:border-sky-400/60 font-bold text-xs transition-all shadow-lg inline-flex items-center gap-2"
            >
              <span>View All 240+ Verified Creators</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. EXPLORE PORTFOLIO ("Explore Our Stories")
         ───────────────────────────────────────────────────────────── */}
      <section id="portfolio" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-sky-500/20">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-sky-400 block mb-1">
              03 — VISUAL LOOKBOOK
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
              Explore Our Stories
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-md">
              Click any photograph to enter the fullscreen master archival viewer with creator metadata.
            </p>
          </div>

          {/* Portfolio Category Switcher */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-slate-900/80 border border-sky-500/20">
            {['All', 'Weddings', 'Portraits', 'Events', 'Travel', 'Fashion', 'Products', 'Nature'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActivePortfolioCategory(cat.toLowerCase())}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activePortfolioCategory === cat.toLowerCase()
                    ? 'bg-sky-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(56,189,248,0.5)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric / Staggered Masonry Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolio.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => {
                setActiveLightboxIndex(idx);
                setLightboxOpen(true);
              }}
              className={`group relative rounded-2xl overflow-hidden bg-slate-900 border border-sky-500/20 hover:border-sky-400/60 cursor-pointer shadow-2xl transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,210,255,0.2)] ${item.span} ${item.aspect}`}
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 opacity-85 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent transition-opacity" />

              {/* Top Category Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-sky-300 text-[10px] font-mono uppercase font-bold border border-sky-500/30">
                {item.category}
              </div>

              {/* Circular Arrow Button (Appears on Hover) */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-sky-500/90 text-slate-950 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-[0_0_20px_rgba(56,189,248,0.6)]">
                <Maximize2 className="w-4 h-4 stroke-[2.5]" />
              </div>

              {/* Bottom Metadata */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[10px] font-mono text-slate-400 block mb-1">
                  {item.location}
                </span>
                <h4 className="text-base sm:text-lg font-display font-bold leading-snug group-hover:text-sky-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-300 mt-1">
                  Captured by <span className="text-sky-400 font-bold">{item.creatorName}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. BOOKING EXPERIENCE ("Plan Your Shoot")
         ───────────────────────────────────────────────────────────── */}
      <section id="plan-shoot" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-[#0a1128] to-[#060b19] border border-sky-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden space-y-10">
          {/* Background Ambient Glow */}
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Section Heading */}
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950 border border-sky-500/30 text-sky-400 text-[10px] font-mono uppercase tracking-[0.2em]">
              <Calendar className="w-3.5 h-3.5" />
              <span>04 — INTERACTIVE SHOOT PLANNER</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Plan Your Shoot
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Customize your photography service, select dates, choose package tiers, and reserve your date with bonded 100% escrow protection.
            </p>
          </div>

          {/* Interactive Shoot Planner Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Step Selection Controls (Left 2 cols) */}
            <div className="lg:col-span-2 space-y-6">
              {/* 1. Select Photographer */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-sky-300 uppercase tracking-wider block">
                  1. Select Photographer / Studio
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {professionals.slice(0, 4).map((pro) => (
                    <div
                      key={pro.id}
                      onClick={() => setSelectedPlannerPro(pro.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                        selectedPlannerPro === pro.id
                          ? 'bg-sky-950/80 border-sky-400 ring-1 ring-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                          : 'bg-slate-900/60 border-white/10 hover:border-sky-500/40'
                      }`}
                    >
                      <img
                        src={pro.avatar}
                        alt={pro.name}
                        className="w-10 h-10 rounded-full object-cover ring-1 ring-sky-500/30 shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{pro.name}</h4>
                        <span className="text-[10px] text-slate-400 block truncate">{pro.tagline}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Select Service & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-sky-300 uppercase tracking-wider block">
                    2. Photography Service
                  </label>
                  <select
                    value={selectedPlannerService}
                    onChange={(e) => setSelectedPlannerService(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-sky-500/30 text-xs text-white focus:outline-none focus:border-sky-400"
                  >
                    <option value="Wedding Photography">Wedding & Nuptials</option>
                    <option value="Cinematic Pre-Wedding">Cinematic Pre-Wedding</option>
                    <option value="Editorial Portrait">Fine Art Portrait</option>
                    <option value="Event Photography">Celebration & Gala</option>
                    <option value="Product & Commercial">Product & Brand Stills</option>
                    <option value="Drone Cinematography">Aerial Drone Cinema</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-sky-300 uppercase tracking-wider block">
                    3. Shoot Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-sky-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={selectedPlannerLocation}
                      onChange={(e) => setSelectedPlannerLocation(e.target.value)}
                      placeholder="e.g. Udaipur, Rajasthan / Mumbai Studio"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-sky-500/30 text-xs text-white focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-sky-300 uppercase tracking-wider block">
                    4. Shoot Date
                  </label>
                  <input
                    type="date"
                    value={selectedPlannerDate}
                    onChange={(e) => setSelectedPlannerDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-sky-500/30 text-xs text-white focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-sky-300 uppercase tracking-wider block">
                    5. Call Sheet Time
                  </label>
                  <select
                    value={selectedPlannerTime}
                    onChange={(e) => setSelectedPlannerTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-sky-500/30 text-xs text-white focus:outline-none focus:border-sky-400"
                  >
                    <option value="06:00 AM">06:00 AM — Golden Hour Sunrise</option>
                    <option value="09:00 AM">09:00 AM — Morning Production</option>
                    <option value="02:00 PM">02:00 PM — Afternoon Session</option>
                    <option value="05:30 PM">05:30 PM — Sunset / Reception</option>
                    <option value="Full Day">Full Day Coverage (10–12 Hours)</option>
                  </select>
                </div>
              </div>

              {/* 6. Package Tier Selection */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-sky-300 uppercase tracking-wider block">
                  6. Select Package Tier
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {packagesList.map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPlannerPackage(pkg.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedPlannerPackage === pkg.id
                          ? 'bg-sky-950/90 border-sky-400 ring-1 ring-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                          : 'bg-slate-900/60 border-white/10 hover:border-sky-500/30'
                      }`}
                    >
                      <span className="text-xs font-bold text-white block truncate">{pkg.name}</span>
                      <span className="text-xs font-mono font-bold text-sky-300 mt-1 block">
                        {formatCurrency(pkg.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Pricing & Escrow Summary (Right col) */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-sky-500/30 shadow-2xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="pb-3 border-b border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 block">
                    RESERVATION SUMMARY
                  </span>
                  <h3 className="text-lg font-display font-bold text-white mt-1">
                    {currentPlannerPkgObj.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    With <strong className="text-white">{currentPlannerProObj.name}</strong>
                  </p>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Date & Time</span>
                    <span className="font-mono text-white">{selectedPlannerDate} ({selectedPlannerTime})</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Location</span>
                    <span className="font-mono text-white">{selectedPlannerLocation}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Delivery SLA</span>
                    <span className="font-mono text-sky-300">{currentPlannerPkgObj.deliveryDays} Days Guarantee</span>
                  </div>
                  <div className="flex justify-between text-slate-300 pt-2 border-t border-white/10 text-sm font-bold">
                    <span>Total Shoot Fee</span>
                    <span className="font-mono text-sky-300">{formatCurrency(currentPlannerPkgObj.price)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Advance Escrow Lock (30%)</span>
                    <span className="font-mono text-slate-300">
                      {formatCurrency(Math.round(currentPlannerPkgObj.price * 0.3))}
                    </span>
                  </div>
                </div>

                {/* Escrow Guarantee Pill */}
                <div className="p-3 rounded-xl bg-sky-950/60 border border-sky-500/30 flex items-start gap-2.5 text-[11px] text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Funds remain 100% locked in escrow until you approve final high-res delivery.</span>
                </div>
              </div>

              {plannerBookingSuccess ? (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs text-center font-bold animate-reveal">
                  ✓ Shoot reservation locked in Escrow! Check your User Bookings portal.
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleConfirmPlannerBooking}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs shadow-[0_0_25px_rgba(56,189,248,0.5)] transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-sky-200" />
                  <span>Confirm & Lock Escrow</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. PACKAGES SECTION ("Choose Your Experience")
         ───────────────────────────────────────────────────────────── */}
      <section id="packages" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/60 border border-sky-500/30 text-sky-400 text-[10px] font-mono uppercase tracking-[0.2em]">
            <span>05 — CURATED PACKAGES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Choose Your Experience
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl mx-auto">
            Transparent packages designed for unforgettable celebrations, editorial portraits, and commercial advertising.
          </p>
        </div>

        {/* 3 Glassmorphic Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {packagesList.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                pkg.isPopular
                  ? 'bg-gradient-to-b from-[#0e1b3d] to-[#060b19] border-2 border-sky-400 shadow-[0_0_40px_rgba(0,210,255,0.25)] -translate-y-2'
                  : 'bg-[#060b19]/80 backdrop-blur-xl border border-sky-500/20 hover:border-sky-400/50 shadow-2xl'
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-mono font-bold text-[10px] uppercase tracking-widest shadow-[0_0_15px_rgba(56,189,248,0.6)]">
                  MOST POPULAR
                </div>
              )}

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-display font-bold text-white">{pkg.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{pkg.tagline}</p>
                </div>

                <div className="pb-6 border-b border-white/10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-mono font-extrabold text-white">
                      {formatCurrency(pkg.price)}
                    </span>
                    <span className="text-xs text-slate-400">/ session</span>
                  </div>
                  <span className="text-[11px] font-mono text-sky-400 mt-1 block">
                    Turnaround: {pkg.deliveryDays} Days Guaranteed
                  </span>
                </div>

                {/* Features List */}
                <ul className="space-y-3 text-xs text-slate-300">
                  {pkg.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPlannerPackage(pkg.id);
                    const el = document.getElementById('plan-shoot');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all shadow-lg flex items-center justify-center gap-2 ${
                    pkg.isPopular
                      ? 'bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-[0_0_25px_rgba(56,189,248,0.4)]'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-sky-500/30'
                  }`}
                >
                  <span>Select {pkg.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. HOW IT WORKS TIMELINE ("01 to 05 Horizontal Flow")
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/60 border border-sky-500/30 text-sky-400 text-[10px] font-mono uppercase tracking-[0.2em]">
            <span>06 — SEAMLESS WORKFLOW</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            How It Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl mx-auto">
            From discovering visionary creators to receiving master cloud galleries with 100% bonded escrow protection.
          </p>
        </div>

        {/* 5-Step Futuristic Horizontal Timeline */}
        <div className="relative">
          {/* Glowing Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-[2px] bg-gradient-to-r from-sky-500/20 via-sky-400/50 to-indigo-500/20 -translate-y-6 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {[
              {
                num: '01',
                title: 'Discover',
                desc: 'Explore verified photographers and curated lookbooks.',
                icon: Compass,
              },
              {
                num: '02',
                title: 'Choose',
                desc: 'Select photographer, package tier and shoot date.',
                icon: Sliders,
              },
              {
                num: '03',
                title: 'Book',
                desc: 'Confirm your shoot with 100% advance escrow protection.',
                icon: ShieldCheck,
              },
              {
                num: '04',
                title: 'Capture',
                desc: 'Enjoy your seamless, directed photography experience.',
                icon: Camera,
              },
              {
                num: '05',
                title: 'Relive',
                desc: 'Receive your 48h teasers & edited cloud memories.',
                icon: Sparkles,
              },
            ].map((step, sIdx) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={step.num}
                  className="p-6 rounded-2xl bg-[#060b19]/90 border border-sky-500/20 backdrop-blur-xl space-y-4 hover:border-sky-400/60 hover:shadow-[0_10px_30px_rgba(0,210,255,0.15)] transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-mono font-extrabold text-sky-400">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-sky-500/30 flex items-center justify-center text-sky-400">
                      <StepIcon className="w-5 h-5 stroke-[1.75]" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base font-display font-bold text-white mb-1">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. STATS / TRUST SECTION
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#060b19] via-[#0a1435] to-[#060b19] border border-sky-500/30 shadow-[0_15px_45px_rgba(0,0,0,0.8)]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            <div className="p-4 space-y-1">
              <span className="text-4xl sm:text-5xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400 block text-glow-cyan">
                500+
              </span>
              <p className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
                Happy Clients
              </p>
            </div>

            <div className="p-4 space-y-1">
              <span className="text-4xl sm:text-5xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400 block text-glow-cyan">
                1.2K+
              </span>
              <p className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
                Photos Delivered
              </p>
            </div>

            <div className="p-4 space-y-1">
              <span className="text-4xl sm:text-5xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400 block text-glow-cyan">
                50+
              </span>
              <p className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
                Locations
              </p>
            </div>

            <div className="p-4 space-y-1">
              <div className="flex items-center justify-center gap-1.5">
                <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                <span className="text-4xl sm:text-5xl font-mono font-extrabold text-white">
                  4.9/5
                </span>
              </div>
              <p className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
                Average Rating
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. CLIENT STORIES ("What Our Clients Say")
         ───────────────────────────────────────────────────────────── */}
      <section id="stories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-sky-500/20">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-sky-400 block mb-1">
              07 — PROVEN STORIES
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
              What Our Clients Say
            </h2>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setTestimonialIndex(
                  (prev) => (prev - 1 + clientTestimonials.length) % clientTestimonials.length
                )
              }
              className="p-2.5 rounded-xl bg-slate-900 border border-sky-500/30 text-slate-300 hover:text-white hover:border-sky-400 transition-all"
              title="Previous Story"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() =>
                setTestimonialIndex((prev) => (prev + 1) % clientTestimonials.length)
              }
              className="p-2.5 rounded-xl bg-slate-900 border border-sky-500/30 text-slate-300 hover:text-white hover:border-sky-400 transition-all"
              title="Next Story"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clientTestimonials.map((t, idx) => {
            const isHighlight = idx === testimonialIndex;
            return (
              <div
                key={t.id}
                className={`p-6 sm:p-8 rounded-3xl transition-all duration-300 flex flex-col justify-between space-y-6 ${
                  isHighlight
                    ? 'bg-gradient-to-b from-[#0d1a3a] to-[#060b19] border border-sky-400 shadow-[0_15px_40px_rgba(0,210,255,0.2)] scale-[1.02]'
                    : 'bg-[#060b19]/80 border border-sky-500/20'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-sky-400 uppercase font-bold">
                      {t.category}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                    "{t.review}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-sky-500/30"
                    />
                    <div>
                      <h5 className="text-xs font-bold text-white">{t.name}</h5>
                      <span className="text-[11px] text-slate-400">{t.location}</span>
                    </div>
                  </div>

                  <img
                    src={t.photoPreview}
                    alt="Shoot Preview"
                    className="w-12 h-12 rounded-xl object-cover ring-1 ring-white/10 shadow-xs shrink-0"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          10. FINAL CLIMAX CTA SECTION
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-10 sm:p-20 overflow-hidden bg-gradient-to-b from-[#0b1636] to-[#030712] border border-sky-500/30 shadow-[0_25px_70px_rgba(0,0,0,0.9)] text-center space-y-8">
          {/* Background Ambient Stars & Silhouette Glow */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80"
              alt="Climax Background"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sky-500/15 blur-[120px] pointer-events-none" />
          </div>

          {/* Foreground Text */}
          <div className="max-w-3xl mx-auto relative z-10 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-sky-400 block font-semibold">
              TIMELESS PHOTOGRAPHY // ESCROW GUARANTEED
            </span>
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight uppercase leading-tight">
              Your story deserves <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 text-glow-cyan">
                beautiful photographs.
              </span>
            </h2>
            <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Find the right photographer and turn your next moment into something unforgettable.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
            <Link to="/photographers">
              <button
                type="button"
                className="px-8 py-4 rounded-full text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 font-bold text-xs sm:text-sm shadow-[0_0_30px_rgba(0,210,255,0.6)] transition-all hover:scale-[1.03] flex items-center gap-2"
              >
                <span>Explore Photographers</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('plan-shoot');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-full text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-sky-500/30 hover:border-sky-400 font-bold text-xs sm:text-sm shadow-xl transition-all hover:scale-[1.03] flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-sky-400" />
              <span>Book a Shoot Now</span>
            </button>
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        item={portfolioStories[activeLightboxIndex]}
        onNext={() =>
          setActiveLightboxIndex((prev) => (prev + 1) % portfolioStories.length)
        }
        onPrev={() =>
          setActiveLightboxIndex(
            (prev) => (prev - 1 + portfolioStories.length) % portfolioStories.length
          )
        }
        hasNext={true}
        hasPrev={true}
        creatorName={portfolioStories[activeLightboxIndex]?.creatorName}
        creatorId={portfolioStories[activeLightboxIndex]?.creatorId}
      />

      {/* Creator Application Onboarding Modal */}
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

