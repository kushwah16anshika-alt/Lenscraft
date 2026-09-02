import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Camera,
  Video,
  Film,
  Sparkles,
  ShieldCheck,
  Award,
  CalendarCheck,
  ArrowRight,
  Star,
  CheckCircle,
  Aperture,
} from 'lucide-react';
import SearchBar from '../../components/common/SearchBar';
import ProfessionalCard from '../../components/cards/ProfessionalCard';
import Button from '../../components/common/Button';
import { CREATIVE_CATEGORIES } from '../../constants/categories';
import { MOCK_PROFESSIONALS } from '../../constants/mockData';
import { ROLES } from '../../constants/roles';

const HomePage = () => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');
  const navigate = useNavigate();

  const handleSearch = ({ query, city }) => {
    navigate(`/photographers?search=${encodeURIComponent(query)}&city=${encodeURIComponent(city)}`);
  };

  const filteredPros =
    activeCategoryFilter === 'all'
      ? MOCK_PROFESSIONALS
      : MOCK_PROFESSIONALS.filter((p) => p.role === activeCategoryFilter);

  return (
    <div className="space-y-20 pb-20 text-left">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-[#E5E0D8] bg-[#F7F5F2]">
        {/* Subtle Decorative Editorial Lines & Motifs */}
        <div className="absolute top-8 left-8 hidden lg:flex items-center gap-2 text-[10px] font-mono text-[#8C8276] tracking-widest uppercase">
          <span>+ LAT 18°55' N · LON 72°50' E</span>
          <span className="w-8 h-px bg-[#E5E0D8]" />
          <span>EST. 2025</span>
        </div>
        <div className="absolute top-8 right-8 hidden lg:flex items-center gap-2 text-[10px] font-mono text-[#8C8276] tracking-widest uppercase">
          <span>CURATED SELECTION</span>
          <span className="w-2 h-2 rounded-full bg-[#B88A5A]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          {/* Top Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#EEEAE4] border border-[#E5E0D8] text-[#B88A5A] text-[11px] font-semibold uppercase tracking-[0.15em] mb-6">
            <Aperture className="w-3 h-3 text-[#B88A5A]" />
            <span>The Premier Creative Platform</span>
          </div>

          {/* Editorial Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-[#171717] max-w-4xl leading-[1.12] mb-6">
            Find the right creative <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#B88A5A]">for your moment.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-sm sm:text-base text-[#6B6258] max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Discover and book verified Photographers, Cinematographers, and Video Editors for weddings, brand campaigns, and creative productions.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-3xl mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Trending Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-[#6B6258]">
            <span className="font-semibold uppercase tracking-wider text-[#8C8276] mr-1 text-[11px]">
              Trending:
            </span>
            <Link
              to="/photographers?category=weddings"
              className="px-2.5 py-1 rounded-xs bg-white border border-[#E5E0D8] hover:border-[#171717] hover:text-[#171717] transition-all shadow-2xs"
            >
              Wedding Photography
            </Link>
            <Link
              to="/videographers?category=pre-wedding"
              className="px-2.5 py-1 rounded-xs bg-white border border-[#E5E0D8] hover:border-[#171717] hover:text-[#171717] transition-all shadow-2xs"
            >
              Cinematic Pre-Wedding
            </Link>
            <Link
              to="/editors?category=reels"
              className="px-2.5 py-1 rounded-xs bg-white border border-[#E5E0D8] hover:border-[#171717] hover:text-[#171717] transition-all shadow-2xs"
            >
              Viral Reels & Shorts
            </Link>
            <Link
              to="/photographers?category=commercial"
              className="px-2.5 py-1 rounded-xs bg-white border border-[#E5E0D8] hover:border-[#171717] hover:text-[#171717] transition-all shadow-2xs"
            >
              Commercial & Product
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Guarantees Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-md bg-white border border-[#E5E0D8] shadow-2xs">
          <div className="flex items-center gap-3.5 p-2">
            <div className="w-10 h-10 rounded-md bg-[#FAF7F3] border border-[#E8DBCA] flex items-center justify-center text-[#B88A5A] shrink-0">
              <ShieldCheck className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#171717]">100% Verified Portfolios</h4>
              <p className="text-[11px] text-[#6B6258]">Strict identity & craftsmanship audit</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2 border-t sm:border-t-0 sm:border-l border-[#E5E0D8]">
            <div className="w-10 h-10 rounded-md bg-[#FAF7F3] border border-[#E8DBCA] flex items-center justify-center text-[#B88A5A] shrink-0">
              <CalendarCheck className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#171717]">Direct Availability</h4>
              <p className="text-[11px] text-[#6B6258]">Live studio booking dates</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2 border-t lg:border-t-0 lg:border-l border-[#E5E0D8]">
            <div className="w-10 h-10 rounded-md bg-[#FAF7F3] border border-[#E8DBCA] flex items-center justify-center text-[#B88A5A] shrink-0">
              <Award className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#171717]">Escrow Protection</h4>
              <p className="text-[11px] text-[#6B6258]">Funds held until final delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2 border-t sm:border-t-0 sm:border-l border-[#E5E0D8]">
            <div className="w-10 h-10 rounded-md bg-[#FAF7F3] border border-[#E8DBCA] flex items-center justify-center text-[#B88A5A] shrink-0">
              <Star className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#171717]">4.96 Verified Rating</h4>
              <p className="text-[11px] text-[#6B6258]">Over 12,000 happy clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Category Composition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-4 border-b border-[#E5E0D8]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#B88A5A] block mb-1">
              Curated Mediums
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
              Explore by Specialization
            </h2>
          </div>
          <Link
            to="/services"
            className="text-xs font-semibold text-[#171717] hover:text-[#B88A5A] flex items-center gap-1 group"
          >
            <span>View all disciplines</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Editorial Masonry/Mixed Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CREATIVE_CATEGORIES.slice(0, 8).map((cat, idx) => (
            <Link
              key={cat.id}
              to={`/${cat.role === 'editor' ? 'editors' : cat.role === 'videographer' ? 'videographers' : 'photographers'}?category=${cat.slug}`}
              className="group relative rounded-md overflow-hidden bg-white border border-[#E5E0D8] shadow-2xs hover:border-[#171717] transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EEEAE4]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-xs bg-white/90 text-[#171717] font-serif font-bold text-[11px] shadow-2xs">
                  0{idx + 1}
                </div>
              </div>

              <div className="p-4 bg-white">
                <span className="text-[10px] text-[#B88A5A] uppercase tracking-wider font-semibold block mb-0.5">
                  {cat.count}
                </span>
                <h3 className="text-sm font-serif font-bold text-[#171717] group-hover:text-[#B88A5A] transition-colors leading-snug">
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Professionals Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-4 border-b border-[#E5E0D8]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#B88A5A] block mb-1">
              Editorial Talent
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
              Featured Creators & Studios
            </h2>
          </div>

          {/* Minimalist Filter Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-md bg-[#EEEAE4] border border-[#E5E0D8] text-xs">
            <button
              onClick={() => setActiveCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-xs text-xs font-semibold uppercase tracking-wider transition-all ${
                activeCategoryFilter === 'all'
                  ? 'bg-[#171717] text-white shadow-2xs'
                  : 'text-[#6B6258] hover:text-[#171717]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveCategoryFilter(ROLES.PHOTOGRAPHER)}
              className={`px-3 py-1.5 rounded-xs text-xs font-semibold uppercase tracking-wider transition-all ${
                activeCategoryFilter === ROLES.PHOTOGRAPHER
                  ? 'bg-[#171717] text-white shadow-2xs'
                  : 'text-[#6B6258] hover:text-[#171717]'
              }`}
            >
              Photographers
            </button>
            <button
              onClick={() => setActiveCategoryFilter(ROLES.VIDEOGRAPHER)}
              className={`px-3 py-1.5 rounded-xs text-xs font-semibold uppercase tracking-wider transition-all ${
                activeCategoryFilter === ROLES.VIDEOGRAPHER
                  ? 'bg-[#171717] text-white shadow-2xs'
                  : 'text-[#6B6258] hover:text-[#171717]'
              }`}
            >
              Videographers
            </button>
            <button
              onClick={() => setActiveCategoryFilter(ROLES.EDITOR)}
              className={`px-3 py-1.5 rounded-xs text-xs font-semibold uppercase tracking-wider transition-all ${
                activeCategoryFilter === ROLES.EDITOR
                  ? 'bg-[#171717] text-white shadow-2xs'
                  : 'text-[#6B6258] hover:text-[#171717]'
              }`}
            >
              Video Editors
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPros.map((pro) => (
            <ProfessionalCard key={pro.id} professional={pro} />
          ))}
        </div>
      </section>

      {/* Creator Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-md overflow-hidden p-8 sm:p-14 bg-[#171717] text-white border border-[#262626]">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-[#262626] text-[#B88A5A] text-[10px] font-bold uppercase tracking-widest border border-[#333333]">
              <Camera className="w-3 h-3" />
              <span>For Creative Studios & Freelancers</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
              Showcase Your Work. <br />
              <span className="text-[#B88A5A] italic font-normal">Connect with high-tier clients.</span>
            </h2>
            <p className="text-xs text-[#D6CFC4] leading-relaxed max-w-xl">
              Publish your 4K portfolios, configure custom package tiers, manage calendar availability, and receive protected milestone payouts directly to your bank account.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link to="/register">
                <Button variant="bronze" size="md">
                  Apply as Creator
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="secondary" size="md" className="border-[#3D3A37] text-white hover:bg-[#262626]">
                  Learn How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
