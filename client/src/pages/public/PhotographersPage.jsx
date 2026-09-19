import React, { useState } from 'react';
import { Camera, Search, SlidersHorizontal, Sparkles, RotateCcw } from 'lucide-react';
import ProfessionalCard from '../../components/cards/ProfessionalCard';
import Button from '../../components/common/Button';
import { ROLES } from '../../constants/roles';
import { usePlatform } from '../../hooks/usePlatform';

const PhotographersPage = () => {
  const { professionals, toggleWishlist, isWishlisted } = usePlatform();
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [maxBudget, setMaxBudget] = useState('all');

  const photographers = professionals.filter((p) => p.role === ROLES.PHOTOGRAPHER);

  const filtered = photographers.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.tagline.toLowerCase().includes(search.toLowerCase()) ||
      (p.specialties || []).some((s) => s.toLowerCase().includes(search.toLowerCase()));

    const matchesCity = cityFilter === 'all' || p.location?.city?.toLowerCase() === cityFilter.toLowerCase();
    const matchesSpecialty = specialtyFilter === 'all' || (p.specialties || []).includes(specialtyFilter);
    const matchesBudget =
      maxBudget === 'all' ||
      (maxBudget === 'under20k' && p.startingPrice <= 20000) ||
      (maxBudget === 'under35k' && p.startingPrice <= 35000) ||
      (maxBudget === 'luxury' && p.startingPrice > 35000);

    return matchesSearch && matchesCity && matchesSpecialty && matchesBudget;
  });

  return (
    <div className="space-y-12 pb-24 text-left">
      {/* Header Banner */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-[11px] font-semibold uppercase tracking-[0.2em] shadow-sm">
            <Camera className="w-3.5 h-3.5 text-cyan-400" />
            <span>Curated Photography Roster</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white">
            Fine Art & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">Commercial Photographers</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Discover verified wedding, editorial, fashion, portrait, and commercial photographers ready to shoot your next project with certified escrow protection.
          </p>
        </div>
      </section>

      {/* Discovery & Filter Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="p-6 rounded-2xl glass-panel space-y-4 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, style, gear..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/70 focus:ring-1 focus:ring-cyan-500/30 transition-all shadow-inner"
              />
            </div>

            {/* City Selector */}
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/70 focus:ring-1 focus:ring-cyan-500/30 transition-all shadow-inner cursor-pointer"
            >
              <option value="all" className="bg-slate-900 text-slate-200">All Cities / Regions</option>
              <option value="Mumbai" className="bg-slate-900 text-slate-200">Mumbai, Maharashtra</option>
              <option value="Bengaluru" className="bg-slate-900 text-slate-200">Bengaluru, Karnataka</option>
              <option value="New Delhi" className="bg-slate-900 text-slate-200">Delhi NCR</option>
              <option value="Pune" className="bg-slate-900 text-slate-200">Pune, Maharashtra</option>
              <option value="Goa" className="bg-slate-900 text-slate-200">Goa</option>
              <option value="Jaipur" className="bg-slate-900 text-slate-200">Jaipur / Rajasthan</option>
            </select>

            {/* Specialty Selector */}
            <select
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/70 focus:ring-1 focus:ring-cyan-500/30 transition-all shadow-inner cursor-pointer"
            >
              <option value="all" className="bg-slate-900 text-slate-200">All Photography Genres</option>
              <option value="Royal Weddings" className="bg-slate-900 text-slate-200">Royal & Destination Weddings</option>
              <option value="Pre-Wedding" className="bg-slate-900 text-slate-200">Cinematic Pre-Wedding</option>
              <option value="Candid Moments" className="bg-slate-900 text-slate-200">Candid & Emotional Moments</option>
              <option value="Drone Photography" className="bg-slate-900 text-slate-200">Drone Aerial Photography</option>
              <option value="Product Commercials" className="bg-slate-900 text-slate-200">Product & Advertising Commercial</option>
            </select>

            {/* Budget Selector */}
            <select
              value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/70 focus:ring-1 focus:ring-cyan-500/30 transition-all shadow-inner cursor-pointer"
            >
              <option value="all" className="bg-slate-900 text-slate-200">Any Budget Tier</option>
              <option value="under20k" className="bg-slate-900 text-slate-200">Under ₹20,000 / day</option>
              <option value="under35k" className="bg-slate-900 text-slate-200">Under ₹35,000 / day</option>
              <option value="luxury" className="bg-slate-900 text-slate-200">Luxury Tier (₹35,000+)</option>
            </select>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs text-slate-400">
            <span>Showing <strong className="text-cyan-400 font-mono font-bold">{filtered.length}</strong> master photographers</span>
            {(search || cityFilter !== 'all' || specialtyFilter !== 'all' || maxBudget !== 'all') && (
              <button
                onClick={() => {
                  setSearch('');
                  setCityFilter('all');
                  setSpecialtyFilter('all');
                  setMaxBudget('all');
                }}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Grid */}
        {filtered.length === 0 ? (
          <div className="p-16 text-center glass-panel rounded-2xl space-y-4">
            <Camera className="w-12 h-12 text-slate-500 mx-auto opacity-50 animate-pulse" />
            <h3 className="text-lg font-serif font-bold text-white">No photographers found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              We couldn't find any photographers matching your search. Try resetting your filter criteria.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearch('');
                setCityFilter('all');
                setSpecialtyFilter('all');
                setMaxBudget('all');
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((pro) => (
              <ProfessionalCard
                key={pro.id}
                professional={pro}
                isWishlisted={isWishlisted(pro.id)}
                onWishlistToggle={() => toggleWishlist(pro.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default PhotographersPage;
