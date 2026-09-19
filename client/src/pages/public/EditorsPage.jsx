import React, { useState } from 'react';
import { Wand2, Search, ArrowUpDown, RotateCcw, Video, Camera, ShieldCheck } from 'lucide-react';
import ProfessionalCard from '../../components/cards/ProfessionalCard';
import { ROLES } from '../../constants/roles';
import { usePlatform } from '../../context/PlatformContext';

const EditorsPage = () => {
  const { professionals, favorites, toggleFavorite } = usePlatform();
  const [search, setSearch] = useState('');
  const [disciplineFilter, setDisciplineFilter] = useState('all');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');

  const editors = professionals.filter(
    (p) => p.role === ROLES.EDITOR || p.category?.toLowerCase().includes('edit') || p.category?.toLowerCase().includes('color') || p.category?.toLowerCase().includes('post')
  );

  const filtered = editors
    .filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.tagline?.toLowerCase().includes(search.toLowerCase()) ||
        p.category?.toLowerCase().includes(search.toLowerCase()) ||
        (p.specialties || []).some((s) => s.toLowerCase().includes(search.toLowerCase()));

      const matchesDiscipline =
        disciplineFilter === 'all' ||
        (disciplineFilter === 'photo' && (p.category?.toLowerCase().includes('photo') || p.category?.toLowerCase().includes('retouch'))) ||
        (disciplineFilter === 'video' && (p.category?.toLowerCase().includes('video') || p.category?.toLowerCase().includes('color')));

      const matchesSpecialty =
        specialtyFilter === 'all' ||
        (p.specialties || []).some((s) => s.toLowerCase().includes(specialtyFilter.toLowerCase()));

      const matchesPrice =
        priceFilter === 'all' ||
        (priceFilter === 'under15k' && p.startingPrice <= 15000) ||
        (priceFilter === 'under25k' && p.startingPrice <= 25000) ||
        (priceFilter === 'luxury' && p.startingPrice > 25000);

      return matchesSearch && matchesDiscipline && matchesSpecialty && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return (a.startingPrice || 0) - (b.startingPrice || 0);
      if (sortBy === 'price-high') return (b.startingPrice || 0) - (a.startingPrice || 0);
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'reviews') return (b.reviewCount || 0) - (a.reviewCount || 0);
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 pb-24 text-left relative">
      {/* Header Banner */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-sky-500/15 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono uppercase tracking-widest">
            <Wand2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Post-Production & Color Grading Directory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white">
            RETURNING & <span className="text-gradient-cyan text-glow-cyan">COLOR EDITORS</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Discover verified high-end retouchers, DaVinci Resolve colorists, sound designers, and post-production studios.
          </p>
        </div>
      </section>

      {/* Discovery & Filter Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6 relative z-10">
        <div className="p-5 sm:p-6 rounded-3xl glass-panel border border-sky-500/25 space-y-4 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="relative lg:col-span-2">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search retouchers, film colorists..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl glass-input text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-all"
              />
            </div>

            {/* Discipline Selector */}
            <select
              value={disciplineFilter}
              onChange={(e) => setDisciplineFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-2xl glass-input text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="all" className="bg-midnight-950">All Post Disciplines</option>
              <option value="photo" className="bg-midnight-950">Photo Editing & Retouching</option>
              <option value="video" className="bg-midnight-950">Video Editing & Color Grading</option>
            </select>

            {/* Price Tier */}
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-2xl glass-input text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="all" className="bg-midnight-950">Any Budget Tier</option>
              <option value="under15k" className="bg-midnight-950">Under ₹15,000</option>
              <option value="under25k" className="bg-midnight-950">₹15,000 - ₹25,000</option>
              <option value="luxury" className="bg-midnight-950">Master Retouch (₹25,000+)</option>
            </select>
          </div>

          {/* Sub Filters & Sorting */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs">
            <div>
              {(search || disciplineFilter !== 'all' || specialtyFilter !== 'all' || priceFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearch('');
                    setDisciplineFilter('all');
                    setSpecialtyFilter('all');
                    setPriceFilter('all');
                    setSortBy('recommended');
                  }}
                  className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-all flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 rounded-full glass-input text-xs text-white focus:outline-none cursor-pointer"
              >
                <option value="recommended" className="bg-midnight-950">Recommended</option>
                <option value="price-low" className="bg-midnight-950">Price: Low to High</option>
                <option value="price-high" className="bg-midnight-950">Price: High to Low</option>
                <option value="rating" className="bg-midnight-950">Highest Rating</option>
                <option value="reviews" className="bg-midnight-950">Most Reviews</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <p>
            Showing <span className="text-white font-mono font-bold">{filtered.length}</span> verified master editors
          </p>
          <div className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Escrow Protected Delivery</span>
          </div>
        </div>

        {/* Grid Results */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((pro) => (
              <ProfessionalCard
                key={pro.id}
                professional={pro}
                isWishlisted={favorites?.some((f) => f.id === pro.id)}
                onWishlistToggle={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center glass-panel rounded-3xl border border-sky-500/20 p-8 space-y-4">
            <Wand2 className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-xl font-display font-bold text-white">No Editors Found</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              No editors matched your active search criteria. Try loosening your filters or resetting your search.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setDisciplineFilter('all');
                setSpecialtyFilter('all');
                setPriceFilter('all');
              }}
              className="px-6 py-2.5 rounded-full glow-btn-primary text-xs uppercase tracking-wider font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default EditorsPage;
