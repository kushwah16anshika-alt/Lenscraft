import React, { useState } from 'react';
import { Video, Search } from 'lucide-react';
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
      <section className="bg-zinc-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-zinc-300 text-[10px] font-semibold uppercase tracking-[0.2em] border border-white/10">
            <Video className="w-3.5 h-3.5" />
            <span>Cinematography & Film Direction</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-white">
            Cinematographers & Commercial DPs
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
            From 4K cinematic wedding teasers to luxury brand commercials, FPV drone aerial sweeps, and narrative documentaries.
          </p>
        </div>
      </section>

      {/* Discovery & Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="p-5 rounded-xl bg-white border border-zinc-200 shadow-subtle space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search cinematic styles, cinema gear (RED, FX6, Drone)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-md bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-zinc-900 transition-all"
              />
            </div>

            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-zinc-900 transition-all"
            >
              <option value="all">All Locations / Cities</option>
              <option value="Bengaluru">Bengaluru, Karnataka</option>
              <option value="Mumbai">Mumbai, Maharashtra</option>
              <option value="New Delhi">Delhi NCR</option>
              <option value="Goa">Goa</option>
            </select>

            <select
              value={styleFilter}
              onChange={(e) => setStyleFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-zinc-900 transition-all"
            >
              <option value="all">All Cinema Genres</option>
              <option value="Cinematic Wedding Films">Cinematic Wedding Films</option>
              <option value="Commercial Ads">Commercial Ads & Products</option>
              <option value="Music Videos">Music Videos & Narrative</option>
              <option value="FPV & Drone Cinema">FPV & Drone Cinema</option>
            </select>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-zinc-100 text-xs text-zinc-500">
            <span className="font-semibold text-zinc-900">
              Showing {filtered.length} verified cinematographer{filtered.length === 1 ? '' : 's'}
            </span>
            {(search || cityFilter !== 'all' || styleFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearch('');
                  setCityFilter('all');
                  setStyleFilter('all');
                }}
                className="text-xs font-semibold text-zinc-900 hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="p-16 text-center bg-white rounded-xl border border-zinc-200 space-y-4">
            <Video className="w-10 h-10 text-zinc-400 mx-auto opacity-50" />
            <h3 className="text-lg font-serif font-bold text-zinc-900">No cinematographers found</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
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
