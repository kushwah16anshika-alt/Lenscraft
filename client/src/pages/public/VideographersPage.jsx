import React, { useState } from 'react';
import { Video, Search, RotateCcw } from 'lucide-react';
import ProfessionalCard from '../../components/cards/ProfessionalCard';
import Button from '../../components/common/Button';
import { ROLES } from '../../constants/roles';
import { usePlatform } from '../../hooks/usePlatform';

const VideographersPage = () => {
  const { professionals, toggleWishlist, isWishlisted } = usePlatform();
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [styleFilter, setStyleFilter] = useState('all');

  const videographers = professionals.filter((p) => p.role === ROLES.VIDEOGRAPHER);

  const filtered = videographers.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.tagline.toLowerCase().includes(search.toLowerCase()) ||
      (p.specialties || []).some((s) => s.toLowerCase().includes(search.toLowerCase()));

    const matchesCity = cityFilter === 'all' || p.location?.city?.toLowerCase() === cityFilter.toLowerCase();
    const matchesStyle = styleFilter === 'all' || (p.specialties || []).includes(styleFilter);

    return matchesSearch && matchesCity && matchesStyle;
  });

  return (
    <div className="space-y-12 pb-24 text-left">
      {/* Header Banner */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 overflow-hidden">
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-[11px] font-semibold uppercase tracking-[0.2em] shadow-sm">
            <Video className="w-3.5 h-3.5 text-indigo-400" />
            <span>Cinematography & Film Direction</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white">
            Cinematographers & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-cyan-400">Commercial DPs</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            From 4K cinematic wedding teasers to luxury brand commercials, FPV drone aerial sweeps, and narrative documentaries.
          </p>
        </div>
      </section>

      {/* Discovery & Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="p-6 rounded-2xl glass-panel space-y-4 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search styles, cinema gear (RED, FX6, Drone)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/70 focus:ring-1 focus:ring-cyan-500/30 transition-all shadow-inner"
              />
            </div>

            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/70 focus:ring-1 focus:ring-cyan-500/30 transition-all shadow-inner cursor-pointer"
            >
              <option value="all" className="bg-slate-900 text-slate-200">All Locations / Cities</option>
              <option value="Bengaluru" className="bg-slate-900 text-slate-200">Bengaluru, Karnataka</option>
              <option value="Mumbai" className="bg-slate-900 text-slate-200">Mumbai, Maharashtra</option>
              <option value="New Delhi" className="bg-slate-900 text-slate-200">Delhi NCR</option>
              <option value="Goa" className="bg-slate-900 text-slate-200">Goa</option>
            </select>

            <select
              value={styleFilter}
              onChange={(e) => setStyleFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/70 focus:ring-1 focus:ring-cyan-500/30 transition-all shadow-inner cursor-pointer"
            >
              <option value="all" className="bg-slate-900 text-slate-200">All Cinema Genres</option>
              <option value="Cinematic Wedding Films" className="bg-slate-900 text-slate-200">Cinematic Wedding Films</option>
              <option value="Commercial Ads" className="bg-slate-900 text-slate-200">Commercial Ads & Products</option>
              <option value="Music Videos" className="bg-slate-900 text-slate-200">Music Videos & Narrative</option>
              <option value="FPV & Drone Cinema" className="bg-slate-900 text-slate-200">FPV & Drone Cinema</option>
            </select>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs text-slate-400">
            <span>
              Showing <strong className="text-cyan-400 font-mono font-bold">{filtered.length}</strong> verified cinematographer{filtered.length === 1 ? '' : 's'}
            </span>
            {(search || cityFilter !== 'all' || styleFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearch('');
                  setCityFilter('all');
                  setStyleFilter('all');
                }}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="p-16 text-center glass-panel rounded-2xl space-y-4">
            <Video className="w-12 h-12 text-slate-500 mx-auto opacity-50 animate-pulse" />
            <h3 className="text-lg font-serif font-bold text-white">No cinematographers found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try adjusting your search terms or city filters to find available DPs.
            </p>
            <Button variant="outline" size="sm" onClick={() => { setSearch(''); setCityFilter('all'); setStyleFilter('all'); }}>
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

export default VideographersPage;
