import React, { useState } from 'react';
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
  Award,
} from 'lucide-react';
import ProfessionalCard from '../../components/cards/ProfessionalCard';
import LightboxModal from '../../components/common/LightboxModal';
import CreatorOnboardingModal from '../../components/common/CreatorOnboardingModal';
import AiMatchmakerModal from '../../components/common/AiMatchmakerModal';
import BookingModal from '../../components/common/BookingModal';
import { usePlatform } from '../../context/PlatformContext';

const categoryTiles = [
  {
    id: 'photography',
    title: 'PHOTOGRAPHY',
    tagline: 'Capture the story.',
    description: 'Weddings, intimate portraits, fashion editorials, and commercial campaigns.',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=80',
    link: '/photographers',
    badge: '140+ Photographers',
  },
  {
    id: 'videography',
    title: 'VIDEOGRAPHY',
    tagline: 'Turn moments into motion.',
    description: '4K cinema wedding films, brand documentaries, reels, and drone cinematography.',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
    link: '/videographers',
    badge: '85+ Cinematographers',
  },
  {
    id: 'photo-editing',
    title: 'PHOTO EDITING',
    tagline: 'Perfect every frame.',
    description: 'High-end skin retouching, color grading, compositing, and magazine archival finish.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    link: '/editors?type=photo',
    badge: '60+ Master Retouchers',
  },
  {
    id: 'video-editing',
    title: 'VIDEO EDITING',
    tagline: 'Shape the final cut.',
    description: 'Sound design, precision pacing, film LUT grading, and cinematic transitions.',
    image: 'https://images.unsplash.com/photo-1574717024453-354056aafa98?auto=format&fit=crop&w=1200&q=80',
    link: '/editors?type=video',
    badge: '50+ Editors & Colorists',
  },
];

const storiesList = [
  {
    id: 'story-1',
    title: 'Sunset Nuptials at Lake Palace',
    category: 'Wedding Story',
    location: 'Udaipur, Rajasthan',
    creator: 'Arjun Mehta',
    creatorId: 'pro-1',
    excerpt: 'An intimate 3-day royal celebration capturing candid laughter, dusk candlelight, and traditional Rajasthani grandeur.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'story-2',
    title: 'Monochrome High-Fashion Editorial',
    category: 'Fashion Shoot',
    location: 'Mumbai, Maharashtra',
    creator: 'Nisha Singhania',
    creatorId: 'pro-4',
    excerpt: 'Dramatic chiaroscuro studio lighting showcasing bespoke handcrafted couture and bold geometric silhouettes.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'story-3',
    title: 'Expedition Through Cold Desert Peaks',
    category: 'Travel Story',
    location: 'Spiti Valley, Himalayas',
    creator: 'Kabir Varma',
    creatorId: 'pro-2',
    excerpt: 'High-altitude documentary adventure traversing ancient monasteries, stargazing over frozen riverbeds.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'story-4',
    title: 'Bespoke Horology & Leather Campaign',
    category: 'Product Campaign',
    location: 'Bengaluru, Karnataka',
    creator: 'Vikramaditya Roy',
    creatorId: 'pro-6',
    excerpt: 'Macro precision lighting capturing titanium brush textures and heritage Swiss watch mechanical movements.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85',
  },
];

const featuredPackages = [
  {
    name: 'ESSENTIAL',
    subtitle: 'Intimate Sessions & Short Shoots',
    price: 15000,
    duration: '4 Hours Coverage',
    team: '1 Lead Photographer',
    deliverables: '100+ Master Edited Photos',
    turnaround: '5 Business Days Delivery',
    features: [
      'Pre-shoot consultation & moodboard',
      'High-resolution digital delivery',
      'Full personal usage license',
      'Online client proofing gallery',
    ],
    isPopular: false,
  },
  {
    name: 'SIGNATURE',
    subtitle: 'Comprehensive Wedding & Event Coverage',
    price: 28000,
    duration: '8 Hours Coverage',
    team: '2 Photographers (Lead + Candid)',
    deliverables: '300+ Edited Photos + Handcrafted Album',
    turnaround: '7 Days Express Delivery',
    features: [
      'Full event coverage (Rituals + Candids)',
      'Custom color grading & skin retouching',
      'Handmade 30-page luxury hardbound album',
      'Raw footage & archival backup (3 years)',
      'Complimentary drone aerial shots',
    ],
    isPopular: true,
  },
  {
    name: 'EDITORIAL',
    subtitle: 'High-End Cinema & Commercial Production',
    price: 45000,
    duration: 'Full Day / Multi-Location',
    team: '2 Photographers + 1 Cinema Videographer',
    deliverables: 'Full Stills Archive + 4K Cinematic Film',
    turnaround: '10 Days Master Delivery',
    features: [
      'Complete photography & 4K video team',
      'Cinema drone 4K aerial cinematography',
      'Full 3-5 minute teaser + 20-min film',
      'Editorial color grade by master colorist',
      'Complete raw master SSD delivery',
    ],
    isPopular: false,
  },
];

const curatedReviews = [
  {
    user: 'Rhea & Devansh Kapoor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    event: 'Wedding at Jagmandir, Udaipur',
    date: 'February 2026',
    review:
      'Booking Arjun through Lenscraft was the best decision we made for our wedding. The mood, the lighting, and the subtle emotional frames he captured made our parents weep tears of joy.',
  },
  {
    user: 'Sameer Verma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    event: 'Luxury Fashion Brand Lookbook',
    date: 'January 2026',
    review:
      'The speed and clarity of Lenscraft are unmatched. Within 2 hours of searching, we aligned on moodboards with Nisha and locked dates. The editorial results landed our campaign on Vogue India.',
  },
  {
    user: 'Dr. Priya Nambiar',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    event: 'Documentary Film Color Grade',
    date: 'March 2026',
    review:
      'Working with senior editor Dev was seamless. He elevated our raw camera logs into a rich, filmic look that captured festival awards. The milestone escrow payment gives total confidence.',
  },
];

const HomePage = () => {
  const { professionals, favorites, toggleFavorite } = usePlatform();
  const navigate = useNavigate();

  // Search Bar State
  const [searchWhere, setSearchWhere] = useState('');
  const [searchWhat, setSearchWhat] = useState('All Disciplines');
  const [searchWhen, setSearchWhen] = useState('');

  // Modals & Active Tab
  const [creatorModalOpen, setCreatorModalOpen] = useState(false);
  const [matchmakerOpen, setMatchmakerOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedBookingPro, setSelectedBookingPro] = useState(professionals[0]);
  const [activeFilterTab, setActiveFilterTab] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(0);

  // In-page shoot planner state
  const [plannerService, setPlannerService] = useState('Wedding Photography');
  const [plannerCity, setPlannerCity] = useState('Indore');
  const [plannerPackage, setPlannerPackage] = useState('Signature');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchWhere) params.append('city', searchWhere);
    if (searchWhat && searchWhat !== 'All Disciplines') params.append('category', searchWhat);
    if (searchWhen) params.append('date', searchWhen);
    navigate(`/explore?${params.toString()}`);
  };

  // Filter creators for the "Meet the Creators" section
  const filteredCreators = professionals.filter((p) => {
    if (activeFilterTab === 'all') return true;
    if (activeFilterTab === 'photography') return p.category?.toLowerCase().includes('photograph') || p.role === 'photographer';
    if (activeFilterTab === 'videography') return p.category?.toLowerCase().includes('video') || p.category?.toLowerCase().includes('cinema') || p.role === 'videographer';
    if (activeFilterTab === 'editing') return p.category?.toLowerCase().includes('edit') || p.role === 'editor';
    return true;
  });

  const handleBookPackage = (pkg) => {
    setSelectedBookingPro(professionals[0]);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#FBF9F5] selection:bg-[#C5A059] selection:text-black">
      {/* ─────────────────────────────────────────────────────────────
          1. CINEMATIC HERO SECTION
          ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-20 pb-16 overflow-hidden">
        {/* Background Image Composition with subtle parallax & luxury dark vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=2000&q=85"
            alt="Cinematic Photography Background"
            className="w-full h-full object-cover filter brightness-[0.28] contrast-125 animate-ken-burns scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-[#080808]/80" />
          <div className="absolute inset-0 ambient-gold-glow" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 animate-reveal">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171717]/80 border border-[#262626] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-xs uppercase tracking-widest text-[#DFCA9B] font-medium">
              Curated Creative Marketplace
            </span>
          </div>

          {/* Main Display Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-cinzel font-normal tracking-tight text-[#FBF9F5] uppercase leading-[1.05]">
            CAPTURE THE <span className="text-gold-gradient font-semibold">MOMENT.</span>
          </h1>

          {/* Subtitle / Supporting Text */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-[#EAE6DF] font-light leading-relaxed">
            Discover photographers, videographers and editors who turn moments into stories.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/explore"
              className="px-7 py-3.5 rounded gold-btn text-xs sm:text-sm uppercase tracking-wider font-semibold inline-flex items-center gap-2 transition-all shadow-lg"
            >
              <span>Explore Creators</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setCreatorModalOpen(true)}
              className="px-7 py-3.5 rounded btn-secondary-luxury text-xs sm:text-sm uppercase tracking-wider font-semibold inline-flex items-center gap-2"
            >
              <span>Join as Creator</span>
            </button>
          </div>

          {/* Embedded Hero Search Interface */}
          <div className="pt-8 max-w-4xl mx-auto w-full">
            <form
              onSubmit={handleHeroSearch}
              className="bg-[#111111]/90 backdrop-blur-xl border border-[#262626] p-2 sm:p-3 rounded shadow-2xl grid grid-cols-1 sm:grid-cols-12 gap-2.5 text-left"
            >
              {/* Where */}
              <div className="sm:col-span-4 bg-[#171717] border border-[#262626] p-2.5 rounded flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] uppercase tracking-wider text-[#A39E93] font-medium">Where?</label>
                  <input
                    type="text"
                    value={searchWhere}
                    onChange={(e) => setSearchWhere(e.target.value)}
                    placeholder="City (e.g. Mumbai, Indore)"
                    className="w-full bg-transparent text-xs sm:text-sm text-[#FBF9F5] placeholder-[#6B665E] focus:outline-none"
                  />
                </div>
              </div>

              {/* What do you need */}
              <div className="sm:col-span-4 bg-[#171717] border border-[#262626] p-2.5 rounded flex items-center gap-2.5">
                <Camera className="w-4 h-4 text-[#C5A059] shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] uppercase tracking-wider text-[#A39E93] font-medium">What do you need?</label>
                  <select
                    value={searchWhat}
                    onChange={(e) => setSearchWhat(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm text-[#FBF9F5] focus:outline-none cursor-pointer"
                  >
                    <option value="All Disciplines" className="bg-[#111111]">All Disciplines</option>
                    <option value="Wedding" className="bg-[#111111]">Wedding Photography</option>
                    <option value="Videography" className="bg-[#111111]">Cinematography / Video</option>
                    <option value="Portrait" className="bg-[#111111]">Editorial & Portrait</option>
                    <option value="Editing" className="bg-[#111111]">Photo / Video Editing</option>
                    <option value="Product" className="bg-[#111111]">Commercial & Product</option>
                  </select>
                </div>
              </div>

              {/* When */}
              <div className="sm:col-span-2 bg-[#171717] border border-[#262626] p-2.5 rounded flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-[#C5A059] shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] uppercase tracking-wider text-[#A39E93] font-medium">When?</label>
                  <input
                    type="date"
                    value={searchWhen}
                    onChange={(e) => setSearchWhen(e.target.value)}
                    className="w-full bg-transparent text-xs text-[#FBF9F5] focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full h-full min-h-[48px] py-2.5 px-4 gold-btn text-xs uppercase tracking-widest font-bold rounded flex items-center justify-center gap-1.5 shadow-md"
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
          2. CATEGORY SECTION (Large Photography Tiles)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#262626]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#C5A059] font-medium mb-1">
              Creative Disciplines
            </p>
            <h2 className="text-2xl sm:text-4xl font-editorial font-normal text-[#FBF9F5]">
              DISCOVER BY SPECIALIZATION
            </h2>
          </div>
          <Link
            to="/explore"
            className="text-xs uppercase tracking-wider text-[#DFCA9B] hover:text-[#FFF] inline-flex items-center gap-1.5 group font-medium"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categoryTiles.map((tile) => (
            <Link
              key={tile.id}
              to={tile.link}
              className="group relative h-96 sm:h-[420px] rounded overflow-hidden border border-[#262626] hover:border-[#C5A059] transition-all duration-500 flex flex-col justify-end p-6 bg-[#111111]"
            >
              {/* Background Image with Zoom */}
              <img
                src={tile.image}
                alt={tile.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-75 group-hover:brightness-90"
              />
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

              {/* Content */}
              <div className="relative z-10 space-y-2">
                <span className="inline-block text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-[#080808]/80 text-[#C5A059] border border-[#262626]">
                  {tile.badge}
                </span>
                <h3 className="text-xl font-cinzel font-bold text-[#FBF9F5] group-hover:text-[#DFCA9B] transition-colors">
                  {tile.title}
                </h3>
                <p className="text-xs text-[#C5A059] font-medium italic">
                  {tile.tagline}
                </p>
                <p className="text-xs text-[#A39E93] line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  {tile.description}
                </p>
                <div className="pt-2 flex items-center gap-1 text-xs uppercase tracking-wider text-[#FBF9F5] font-semibold group-hover:text-[#DFCA9B]">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. FEATURED CREATORS (Editorial / Masonry Layout)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#262626]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#C5A059] font-medium mb-1">
              Top Ranked Talent
            </p>
            <h2 className="text-2xl sm:text-4xl font-editorial font-normal text-[#FBF9F5]">
              MEET THE CREATORS
            </h2>
          </div>

          {/* Discipline Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Disciplines' },
              { id: 'photography', label: 'Photographers' },
              { id: 'videography', label: 'Videographers' },
              { id: 'editing', label: 'Editors' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilterTab(tab.id)}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-wider rounded font-medium transition-all ${
                  activeFilterTab === tab.id
                    ? 'gold-btn'
                    : 'bg-[#111111] text-[#A39E93] hover:text-[#FBF9F5] border border-[#262626]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Creator Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCreators.slice(0, 8).map((creator) => (
            <ProfessionalCard
              key={creator.id}
              professional={creator}
              isWishlisted={favorites?.some((f) => f.id === creator.id)}
              onWishlistToggle={toggleFavorite}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/explore"
            className="px-8 py-3.5 rounded btn-secondary-luxury text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-2"
          >
            <span>Browse All {professionals.length}+ Creators</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. STORIES / EDITORIAL SECTION ("Stories Worth Remembering")
          ───────────────────────────────────────────────────────────── */}
      <section id="stories" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#262626]">
        <div className="mb-12 text-center max-w-2xl mx-auto space-y-2">
          <p className="text-xs uppercase tracking-widest text-[#C5A059] font-medium">
            Visual Storytelling
          </p>
          <h2 className="text-3xl sm:text-5xl font-cinzel text-[#FBF9F5]">
            STORIES WORTH REMEMBERING
          </h2>
          <p className="text-sm text-[#A39E93] font-light">
            Step into the narratives crafted by our visual storytellers across the globe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {storiesList.map((story, idx) => (
            <div
              key={story.id}
              onClick={() => {
                setActiveLightboxIndex(idx);
                setLightboxOpen(true);
              }}
              className="group cursor-pointer bg-[#111111] border border-[#262626] hover:border-[#C5A059] rounded overflow-hidden transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#171717]">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] uppercase font-mono tracking-wider px-2.5 py-1 rounded bg-[#080808]/80 text-[#DFCA9B] border border-[#262626] backdrop-blur-md">
                    {story.category}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 p-2 rounded-full bg-[#080808]/80 text-[#DFCA9B] border border-[#262626] opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Story Narrative */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#C5A059] mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{story.location}</span>
                    <span className="text-[#6B665E]">·</span>
                    <span>By {story.creator}</span>
                  </div>
                  <h3 className="text-xl font-editorial text-[#FBF9F5] group-hover:text-[#DFCA9B] transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A39E93] leading-relaxed mt-2">
                    {story.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#262626] flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#DFCA9B] font-semibold flex items-center gap-1">
                    View Story Gallery <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[11px] text-[#6B665E] font-mono">Editorial Case Study</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. CURATED PACKAGES SECTION
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#262626]">
        <div className="mb-12 text-center max-w-2xl mx-auto space-y-2">
          <p className="text-xs uppercase tracking-widest text-[#C5A059] font-medium">
            Transparent Pricing
          </p>
          <h2 className="text-2xl sm:text-4xl font-editorial text-[#FBF9F5]">
            CURATED PRODUCTION PACKAGES
          </h2>
          <p className="text-sm text-[#A39E93] font-light">
            Clear inclusions, master edits, guaranteed delivery timelines, with zero hidden charges.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredPackages.map((pkg) => (
            <div
              key={pkg.name}
              className={`p-6 sm:p-8 rounded flex flex-col justify-between transition-all duration-300 ${
                pkg.isPopular
                  ? 'bg-[#171717] border-2 border-[#C5A059] shadow-2xl relative'
                  : 'bg-[#111111] border border-[#262626] hover:border-[#C5A059]/50'
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded bg-[#C5A059] text-[#080808]">
                    Most Popular Choice
                  </span>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-cinzel font-bold text-[#FBF9F5]">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-[#A39E93] mt-1">{pkg.subtitle}</p>
                </div>

                <div className="pb-4 border-b border-[#262626]">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-mono font-bold text-[#FBF9F5]">
                      ₹{pkg.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-[#A39E93]">/ baseline</span>
                  </div>
                  <p className="text-xs text-[#C5A059] mt-1">{pkg.duration} · {pkg.team}</p>
                </div>

                {/* Features list */}
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-wider text-[#A39E93] font-semibold">Included in Package:</p>
                  {pkg.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-[#EAE6DF]">
                      <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button
                  type="button"
                  onClick={() => handleBookPackage(pkg)}
                  className={`w-full py-3 px-4 rounded text-xs uppercase tracking-wider font-semibold transition-all ${
                    pkg.isPopular ? 'gold-btn' : 'btn-secondary-luxury'
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
          6. HOW IT WORKS SECTION
          ───────────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#262626]">
        <div className="mb-14 text-center max-w-2xl mx-auto space-y-2">
          <p className="text-xs uppercase tracking-widest text-[#C5A059] font-medium">
            The Lenscraft Workflow
          </p>
          <h2 className="text-2xl sm:text-4xl font-editorial text-[#FBF9F5]">
            HOW LENSCRAFT WORKS
          </h2>
          <p className="text-sm text-[#A39E93] font-light">
            From discovering verified talent to receiving archival master edits.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { step: '01', title: 'Discover', desc: 'Browse verified creators by discipline, location, aesthetic mood, and past portfolio case studies.' },
            { step: '02', title: 'Select Package', desc: 'Choose a transparent package or customize hours, cameras, drone, and editing deliverables.' },
            { step: '03', title: 'Lock Date', desc: 'Confirm availability instantly with a secure advance escrow payment.' },
            { step: '04', title: 'The Production', desc: 'Your creative director executes the shoot with professional camera equipment & direction.' },
            { step: '05', title: 'Archival Delivery', desc: 'Receive high-res color graded stills and 4K masters through your private client portal.' },
          ].map((item) => (
            <div key={item.step} className="p-6 bg-[#111111] border border-[#262626] rounded space-y-3 relative group hover:border-[#C5A059]/60 transition-all">
              <span className="text-2xl font-cinzel font-bold text-[#C5A059]/60 group-hover:text-[#C5A059] transition-colors">
                {item.step}
              </span>
              <h3 className="text-base font-semibold text-[#FBF9F5]">
                {item.title}
              </h3>
              <p className="text-xs text-[#A39E93] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. REALISTIC CLIENT REVIEWS
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#262626]">
        <div className="mb-12 text-center max-w-2xl mx-auto space-y-2">
          <p className="text-xs uppercase tracking-widest text-[#C5A059] font-medium">
            Client Voices
          </p>
          <h2 className="text-2xl sm:text-4xl font-editorial text-[#FBF9F5]">
            TRUSTED BY COUPLES & BRANDS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {curatedReviews.map((rev, rIdx) => (
            <div key={rIdx} className="p-6 sm:p-7 bg-[#111111] border border-[#262626] rounded flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[#C5A059]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C5A059]" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#EAE6DF] leading-relaxed italic">
                  "{rev.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#262626] flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.user}
                  className="w-10 h-10 rounded-full object-cover border border-[#262626]"
                />
                <div>
                  <h4 className="text-xs font-semibold text-[#FBF9F5]">{rev.user}</h4>
                  <p className="text-[11px] text-[#C5A059]">{rev.event}</p>
                  <p className="text-[10px] text-[#6B665E] font-mono">{rev.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. CREATOR CTA BANNER
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded bg-[#171717] border border-[#262626] p-8 sm:p-12 lg:p-16 overflow-hidden text-center space-y-6">
          <div className="absolute inset-0 ambient-gold-glow" />
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <span className="inline-block text-xs uppercase font-mono tracking-widest text-[#C5A059]">
              Are You a Creative Professional?
            </span>
            <h2 className="text-3xl sm:text-5xl font-editorial text-[#FBF9F5]">
              JOIN LENSCRAFT AS A CREATOR
            </h2>
            <p className="text-sm text-[#A39E93] leading-relaxed max-w-xl mx-auto">
              Showcase your portfolio, receive direct inquiries, manage bookings, and get paid securely with zero friction.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setCreatorModalOpen(true)}
                className="px-8 py-3.5 rounded gold-btn text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-2"
              >
                <span>Apply to Join Network</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
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
        images={storiesList.map((s) => ({
          url: s.image,
          title: s.title,
          category: s.category,
          creator: s.creator,
          location: s.location,
        }))}
        initialIndex={activeLightboxIndex}
      />
    </div>
  );
};

export default HomePage;
