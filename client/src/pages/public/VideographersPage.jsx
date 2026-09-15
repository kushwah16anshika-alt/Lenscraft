import React, { useState } from 'react';
import { Video, Search, MapPin, Sparkles, Filter, Award } from 'lucide-react';
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
      <section className="bg-[#121212] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#242424]">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#C4683C] text-[10px] font-bold uppercase tracking-[0.2em] border border-white/10">
            <Video className="w-3.5 h-3.5" />
            <span>Cinematography & Film Direction</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-white">
            Cinematographers & Commercial DPs
          </h1>
          <p className="text-xs sm:text-sm text-[#8C8276] max-w-2xl leading-relaxed">
            From 4K cinematic wedding teasers to luxury brand commercials, FPV drone aerial sweeps, and narrative documentaries.
          </p>
        </div>
      </section>

      {/* Discovery & Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="p-5 rounded-xl bg-white border border-[#E8E2D8] shadow-2xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[#8C8276] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search cinematic styles, cinema gear (RED, FX6, Drone)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded bg-[#FAF8F5] border border-[#E8E2D8] text-xs focus:outline-none focus:border-[#121212] transition-all"
              />
            </div>

            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded bg-[#FAF8F5] border border-[#E8E2D8] text-xs focus:outline-none focus:border-[#121212] transition-all"
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
              className="w-full px-3 py-2.5 rounded bg-[#FAF8F5] border border-[#E8E2D8] text-xs focus:outline-none focus:border-[#121212] transition-all"
            >
              <option value="all">All Cinema Genres</option>
              <option value="Cinematic Wedding Films">Cinematic Wedding Films</option>
              <option value="Commercial Ads">Commercial Ads & Products</option>
              <option value="Music Videos">Music Videos & Narrative</option>
              <option value="FPV & Drone Cinema">FPV & Drone Cinema</option>
            </select>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#E8E2D8] text-xs text-[#6B6258]">
            <span className="font-semibold text-[#121212]">
              Showing {filtered.length} verified cinematographer{filtered.length === 1 ? '' : 's'}
            </span>
            {(search || cityFilter !== 'all' || styleFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearch('');
                  setCityFilter('all');
                  setStyleFilter('all');
                }}
                className="text-xs font-bold text-[#C4683C] hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="p-16 text-center bg-white rounded-xl border border-[#E8E2D8] space-y-4">
            <Video className="w-10 h-10 text-[#8C8276] mx-auto opacity-50" />
            <h3 className="text-lg font-serif font-bold text-[#121212]">No cinematographers found</h3>
            <p className="text-xs text-[#6B6258] max-w-sm mx-auto">
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
