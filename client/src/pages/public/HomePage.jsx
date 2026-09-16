import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  Award,
  ArrowRight,
  Star,
  CheckCircle,
  Clock,
  Maximize2,
  PlusCircle,
} from 'lucide-react';
import SearchBar from '../../components/common/SearchBar';
import ProfessionalCard from '../../components/cards/ProfessionalCard';
import Button from '../../components/common/Button';
import LightboxModal from '../../components/common/LightboxModal';
import CreatorOnboardingModal from '../../components/common/CreatorOnboardingModal';
import { CREATIVE_CATEGORIES } from '../../constants/categories';
import { MOCK_PROFESSIONALS } from '../../constants/mockData';
import { ROLES } from '../../constants/roles';

const HomePage = () => {
  const [activeRoleFilter, setActiveRoleFilter] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(0);
  const [creatorModalOpen, setCreatorModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = ({ query, city }) => {
    navigate(`/photographers?search=${encodeURIComponent(query)}&city=${encodeURIComponent(city)}`);
  };

  const filteredPros =
    activeRoleFilter === 'all'
      ? MOCK_PROFESSIONALS
      : MOCK_PROFESSIONALS.filter((p) => p.role === activeRoleFilter);

  // Lookbook Showcase Stills with Lightbox support
  const lookbookItems = [
    {
      id: 'lb-1',
      title: 'Sunset Palace Ceremony in Udaipur',
      category: 'Wedding Cinematography',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      mediaType: 'image',
      creatorName: 'Aarav Mehta',
      creatorId: 'pro-1',
    },
    {
      id: 'lb-2',
      title: 'High-Altitude Pre-Wedding in Ladakh',
      category: 'Cinematic Pre-Wedding',
      url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=80',
      mediaType: 'image',
      creatorName: 'Kabir Varma',
      creatorId: 'pro-2',
    },
    {
      id: 'lb-3',
      title: 'Candid Bridal Portrait with Natural Light',
      category: 'Editorial Portrait',
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
      mediaType: 'image',
      creatorName: 'Aarav Mehta',
      creatorId: 'pro-1',
    },
    {
      id: 'lb-4',
      title: 'Fashion Week Runway Behind the Scenes',
      category: 'Reels & Color Grading',
      url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
      mediaType: 'image',
      creatorName: 'Sanya Kapoor',
      creatorId: 'pro-3',
    },
    {
      id: 'lb-5',
      title: 'Luxury Architectural Stills in Mumbai',
      category: 'Commercial Architecture',
      url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
      mediaType: 'image',
      creatorName: 'Rohan Deshmukh',
      creatorId: 'pro-4',
    },
    {
      id: 'lb-6',
      title: 'Sangeet Light Show & High-Energy Dance',
      category: 'Celebration Event',
      url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80',
      mediaType: 'image',
      creatorName: 'Kabir Varma',
      creatorId: 'pro-2',
    },
  ];

  const editorialStories = [
    {
      id: 'story-1',
      tag: 'Cinematography',
      title: 'Behind the Lens: 35mm Wedding Cinema in Udaipur',
      author: 'Aarav Mehta',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      snippet: 'How our dual-candid team balanced dynamic golden-hour palace natural light with cinematic anamorphic lenses.',
    },
    {
      id: 'story-2',
      tag: 'Post-Production',
      title: 'The DaVinci Node Secrets Behind Viral Instagram Reels',
      author: 'Sanya Kapoor',
      readTime: '3 min read',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
      snippet: 'Mastering skin tones, film halation, and pacing to keep audience retention past the 80% mark.',
    },
    {
      id: 'story-3',
      tag: 'Commercial',
      title: 'Directing High-Conversion Commercial Ad Stills',
      author: 'Kabir Varma',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
      snippet: 'How lighting architecture and macro lens staging transform everyday consumer products into luxury desire.',
    },
  ];

  return (
    <div className="space-y-24 pb-24 text-left">
      {/* ─────────────────────────────────────────────────────────────
          HERO SECTION (Full-Bleed Cinematic Editorial)
         ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-zinc-950 text-white">
        {/* Cinematic Background Image with Ken Burns zoom */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85"
            alt="Cinematic Wedding & Commercial Shoot"
            className="w-full h-full object-cover opacity-40 animate-ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-black/80" />
        </div>

        {/* Film Frame Markers */}
        <div className="absolute top-8 left-8 hidden lg:flex items-center gap-2 text-[10px] font-mono text-zinc-400 tracking-widest uppercase z-10">
          <span>LAT 18°55' N · LON 72°50' E</span>
          <span className="w-8 h-px bg-zinc-700" />
          <span>CURATED ROSTER 2025</span>
        </div>
        <div className="absolute top-8 right-8 hidden lg:flex items-center gap-2 text-[10px] font-mono text-zinc-400 tracking-widest uppercase z-10">
          <span>100% ESCROW PROTECTED</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {/* Hero Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center py-20">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-zinc-200 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] mb-6 shadow-xl">
            <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
            <span>The Premier Creative Services Marketplace</span>
          </div>

          {/* Editorial Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-white max-w-5xl leading-[1.05] mb-6 uppercase">
            MAKE MOMENTS <br />
            <span className="italic font-normal text-zinc-300 font-serif lowercase tracking-normal">
              timeless.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Discover verified Photographers, Cinematographers, and Video Editors who turn your celebrations, campaigns, and vision into unforgettable visual stories.
          </p>

          {/* Search Box */}
          <div className="w-full max-w-3xl mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
            <Link to="/photographers">
              <Button
                variant="primary"
                size="lg"
                className="bg-white hover:bg-zinc-200 text-zinc-950 border-none shadow-xl px-8 font-bold"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Explore All Creators
              </Button>
            </Link>

            <button
              onClick={() => setCreatorModalOpen(true)}
              className="px-6 py-2.5 rounded-md bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/25 transition-all flex items-center gap-2 text-sm font-medium"
            >
              <PlusCircle className="w-4 h-4 text-zinc-300" />
              <span>Become a Creator</span>
            </button>
          </div>

          {/* Quick Trending Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 text-xs text-zinc-400">
            <span className="font-semibold uppercase tracking-wider text-zinc-400 text-[10px]">
              Trending Disciplines:
            </span>
            <Link
              to="/photographers?category=weddings"
              className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all text-[11px]"
            >
              Royal Weddings
            </Link>
            <Link
              to="/videographers?category=pre-wedding"
              className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all text-[11px]"
            >
              Cinematic Pre-Wedding
            </Link>
            <Link
              to="/editors?category=reels-editing"
              className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all text-[11px]"
            >
              Viral Reels & Shorts
            </Link>
            <Link
              to="/photographers?category=commercial"
              className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all text-[11px]"
            >
              Product & Commercial
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          TRUST & QUALITY ASSURANCE STRIP
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 rounded-xl bg-white border border-zinc-200 shadow-soft-lg">
          <div className="flex items-center gap-3.5 p-2">
            <div className="w-10 h-10 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 shrink-0">
              <ShieldCheck className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">100% Escrow Protection</h4>
              <p className="text-[11px] text-zinc-500">Funds held safely until deliverable sign-off</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2 border-t sm:border-t-0 sm:border-l border-zinc-200">
            <div className="w-10 h-10 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 shrink-0">
              <Award className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">Verified Editorial Talent</h4>
              <p className="text-[11px] text-zinc-500">Strict gear & craftsmanship audit</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2 border-t lg:border-t-0 lg:border-l border-zinc-200">
            <div className="w-10 h-10 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 shrink-0">
              <Clock className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">48h Fast Teaser Turnaround</h4>
              <p className="text-[11px] text-zinc-500">Early social selects delivered on time</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2 border-t sm:border-t-0 sm:border-l border-zinc-200">
            <div className="w-10 h-10 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 shrink-0">
              <Star className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">4.96 Client Satisfaction</h4>
              <p className="text-[11px] text-zinc-500">Trusted across 12,000+ shoots</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 01: SPOTLIGHT CREATORS
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-zinc-200">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 block mb-1">
              01 — Spotlight Talent
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-900">
              Featured Master Creators
            </h2>
          </div>

          {/* Role Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-md bg-zinc-100 border border-zinc-200">
            {[
              { id: 'all', label: 'All Creatives' },
              { id: ROLES.PHOTOGRAPHER, label: 'Photographers' },
              { id: ROLES.VIDEOGRAPHER, label: 'Videographers' },
              { id: ROLES.EDITOR, label: 'Video Editors' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveRoleFilter(tab.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeRoleFilter === tab.id
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Rich Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPros.map((pro) => (
            <ProfessionalCard key={pro.id} professional={pro} />
          ))}
        </div>

        <div className="text-center pt-4">
          <Link to="/photographers">
            <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All Verified Creators
            </Button>
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 02: CURATED DISCIPLINES & MEDIUMS
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-zinc-200">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 block mb-1">
              02 — Disciplines Directory
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-900">
              Explore by Specialization
            </h2>
          </div>
          <Link to="/services" className="text-xs font-semibold text-zinc-900 hover:underline flex items-center gap-1">
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CREATIVE_CATEGORIES.slice(0, 4).map((cat, idx) => (
            <div
              key={cat.id}
              className="group rounded-lg bg-white border border-zinc-200 overflow-hidden shadow-subtle hover:border-zinc-900 hover:shadow-soft-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 bg-zinc-100 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-104"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-white/90 font-serif font-bold text-[10px] text-zinc-900">
                    0{idx + 1}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold">
                    {cat.count}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="text-base font-serif font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  to={`/${cat.role === 'editor' ? 'editors' : cat.role === 'videographer' ? 'videographers' : 'photographers'}?category=${cat.slug}`}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-between hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    <span>Explore Talent</span>
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 03: LENSCRAFT LOOKBOOK (Interactive Fullscreen Lightbox)
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-zinc-200">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 block mb-1">
              03 — Master Gallery
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-900">
              LensCraft Recent Lookbook
            </h2>
          </div>
          <p className="text-xs text-zinc-500 max-w-md">
            Click any still to open the cinematic fullscreen master viewer with creator attribution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lookbookItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => {
                setActiveLightboxIndex(idx);
                setLightboxOpen(true);
              }}
              className="group relative h-72 rounded-lg overflow-hidden bg-zinc-950 cursor-pointer shadow-subtle border border-zinc-200 hover:border-zinc-900 transition-all"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-104 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity" />

              {/* Top Category Tag */}
              <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-wider border border-white/20">
                {item.category}
              </div>

              {/* Fullscreen Trigger */}
              <div className="absolute top-3.5 right-3.5 p-2 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-4 left-4 right-4 text-white text-left">
                <h4 className="text-sm font-serif font-bold leading-snug group-hover:text-zinc-200 transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-zinc-300 mt-0.5">
                  Captured by <span className="text-white font-semibold">{item.creatorName}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 04: HOW IT WORKS
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-2xl bg-zinc-950 text-white border border-zinc-800 shadow-2xl space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 block">
              04 — Workflow Protocol
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Seamless. Protected. World-Class.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              How LensCraft connects you with top-tier talent through a certified escrow workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-lg bg-zinc-900 border border-zinc-800 space-y-3">
              <span className="text-3xl font-serif font-bold text-zinc-400 block">01</span>
              <h4 className="text-base font-bold text-white uppercase tracking-wide">Discover</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Filter verified creators by gear, city, past portfolio galleries, and genuine client reviews.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-zinc-900 border border-zinc-800 space-y-3">
              <span className="text-3xl font-serif font-bold text-zinc-400 block">02</span>
              <h4 className="text-base font-bold text-white uppercase tracking-wide">Connect</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Coordinate call-sheets, shot lists, and mood boards directly with your creator studio.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-zinc-900 border border-zinc-800 space-y-3">
              <span className="text-3xl font-serif font-bold text-zinc-400 block">03</span>
              <h4 className="text-base font-bold text-white uppercase tracking-wide">Book Escrow</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Lock your shoot date. 100% of your funds remain held in escrow until you approve final edits.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-zinc-900 border border-zinc-800 space-y-3">
              <span className="text-3xl font-serif font-bold text-zinc-400 block">04</span>
              <h4 className="text-base font-bold text-white uppercase tracking-wide">Create</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Receive 48h teasers and full-resolution master cloud downloads with commercial licenses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 05: STORIES & EDITORIAL MAGAZINE
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-zinc-200">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 block mb-1">
              05 — LensCraft Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-900">
              Behind the Lens & Creative Culture
            </h2>
          </div>
          <Link to="/about" className="text-xs font-semibold text-zinc-900 hover:underline flex items-center gap-1">
            <span>Read Editorial Journal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {editorialStories.map((story) => (
            <div
              key={story.id}
              className="group rounded-lg bg-white border border-zinc-200 overflow-hidden shadow-subtle hover:border-zinc-900 hover:shadow-soft-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 bg-zinc-100 overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-104"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-white text-[9px] uppercase font-bold tracking-wider">
                    {story.tag}
                  </div>
                </div>

                <div className="p-6 space-y-2.5">
                  <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                    <span>By {story.author}</span>
                    <span>·</span>
                    <span>{story.readTime}</span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors leading-snug">
                    {story.title}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
                    {story.snippet}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-900 hover:text-zinc-600 transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 06: CLIENT TESTIMONIALS
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-2xl bg-zinc-100 border border-zinc-200 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 block">
              06 — Proven Trust
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-900">
              Loved by Discerning Couples & Brand Directors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-lg bg-white border border-zinc-200 space-y-4 shadow-subtle">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-zinc-700 italic font-serif leading-relaxed">
                "Booking Aarav through LensCraft made our Udaipur royal wedding completely stress-free. The 48h teaser video had all our guests in tears."
              </p>
              <div className="pt-2 border-t border-zinc-100 text-xs">
                <h5 className="font-bold text-zinc-900">Rhea & Vikram Kapoor</h5>
                <span className="text-[11px] text-zinc-500">Destination Wedding, Rajasthan</span>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-white border border-zinc-200 space-y-4 shadow-subtle">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-zinc-700 italic font-serif leading-relaxed">
                "We hired Kabir for our luxury fragrance launch video. The cinema camera rig and color grading exceeded every commercial benchmark."
              </p>
              <div className="pt-2 border-t border-zinc-100 text-xs">
                <h5 className="font-bold text-zinc-900">Elena Rostova</h5>
                <span className="text-[11px] text-zinc-500">Brand Director, Aura Paris</span>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-white border border-zinc-200 space-y-4 shadow-subtle">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-zinc-700 italic font-serif leading-relaxed">
                "Sanya edited a pack of 5 Reels for our campaign. Three of them crossed 1.2M views on Instagram within a week. Outstanding work."
              </p>
              <div className="pt-2 border-t border-zinc-100 text-xs">
                <h5 className="font-bold text-zinc-900">Karan Singhania</h5>
                <span className="text-[11px] text-zinc-500">Founder, D2C Apparel Co.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 07: BECOME A CREATOR SPLIT BANNER
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden bg-zinc-950 text-white border border-zinc-800 shadow-2xl">
          <div className="p-8 sm:p-14 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 block">
                07 — Creator Studio Accreditation
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                Are You a Master of the Visual Craft?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Join our curated roster of Photographers, Cinematographers, and Video Editors. Get discovered by high-budget weddings, brand campaigns, and creative agencies with guaranteed escrow payouts.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Zero platform commission on your first 3 bookings</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Guaranteed advance escrow payouts with dispute protection</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Custom portfolio studio page with full media hosting</span>
              </div>
            </div>

            <div>
              <button
                onClick={() => setCreatorModalOpen(true)}
                className="px-6 py-3 rounded-md bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs transition-all shadow-xl inline-flex items-center gap-2"
              >
                <span>Apply as a Creator</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative min-h-[320px] lg:min-h-full bg-zinc-900">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80"
              alt="Professional Photographer Studio"
              className="w-full h-full object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-transparent to-zinc-950" />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 08: FINAL FULL-WIDTH CALL TO ACTION
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 sm:p-16 rounded-2xl bg-zinc-100 border border-zinc-200 text-center space-y-6 shadow-subtle">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 block">
              Start Your Journey
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-zinc-900 tracking-tight uppercase">
              Bring Your Visual Vision to Life.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
              Explore verified creative talent across India with instant date availability and 100% escrow protection.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/photographers">
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore Photographers
              </Button>
            </Link>
            <Link to="/videographers">
              <Button variant="outline" size="lg">
                Explore Cinematographers
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        item={lookbookItems[activeLightboxIndex]}
        onNext={() => setActiveLightboxIndex((prev) => (prev + 1) % lookbookItems.length)}
        onPrev={() => setActiveLightboxIndex((prev) => (prev - 1 + lookbookItems.length) % lookbookItems.length)}
        hasNext={true}
        hasPrev={true}
        creatorName={lookbookItems[activeLightboxIndex]?.creatorName}
        creatorId={lookbookItems[activeLightboxIndex]?.creatorId}
      />

      {/* Creator Application Onboarding Modal */}
      <CreatorOnboardingModal
        isOpen={creatorModalOpen}
        onClose={() => setCreatorModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;
