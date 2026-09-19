import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Compass, Search, ArrowUpDown, RotateCcw, Filter, MapPin, Camera, Film, Wand2 } from 'lucide-react';
import ProfessionalCard from '../../components/cards/ProfessionalCard';
import { usePlatform } from '../../context/PlatformContext';

const ExplorePage = () => {
  const [searchParams] = useSearchParams();
  const { professionals, favorites, toggleFavorite } = usePlatform();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [discipline, setDiscipline] = useState(searchParams.get('category') || 'all');
  const [cityFilter, setCityFilter] = useState(searchParams.get('city') || 'all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');

  useEffect(() => {
    const qCity = searchParams.get('city');
    const qCat = searchParams.get('category');
    const qSearch = searchParams.get('search');
    if (qCity) setCityFilter(qCity);
    if (qCat) setDiscipline(qCat);
    if (qSearch) setSearch(qSearch);
  }, [searchParams]);

  const filtered = professionals
    .filter((p) => {
      const city = typeof p.location === 'object' ? p.location.city : p.location;
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.tagline?.toLowerCase().includes(search.toLowerCase()) ||
        p.category?.toLowerCase().includes(search.toLowerCase()) ||
        (p.specialties || []).some((s) => s.toLowerCase().includes(search.toLowerCase()));

      const matchesDiscipline =
        discipline === 'all' ||
        p.category?.toLowerCase().includes(discipline.toLowerCase()) ||
        p.role?.toLowerCase() === discipline.toLowerCase();

      const matchesCity = cityFilter === 'all' || city?.toLowerCase() === cityFilter.toLowerCase();

      const matchesPrice =
        priceFilter === 'all' ||
        (priceFilter === 'under20k' && p.startingPrice <= 20000) ||
        (priceFilter === 'under35k' && p.startingPrice <= 35000) ||
        (priceFilter === 'luxury' && p.startingPrice > 35000);

      const matchesRating =
        ratingFilter === 'all' || (ratingFilter === '4.8plus' && (p.rating || 5.0) >= 4.8);

      return matchesSearch && matchesDiscipline && matchesCity && matchesPrice && matchesRating;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return (a.startingPrice || 0) - (b.startingPrice || 0);
      if (sortBy === 'price-high') return (b.startingPrice || 0) - (a.startingPrice || 0);
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'reviews') return (b.reviewCount || 0) - (a.reviewCount || 0);
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#080808] text-[#FBF9F5] pb-24 text-left">
      {/* Header Banner */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#262626] overflow-hidden">
        <div className="absolute inset-0 ambient-gold-glow" />
        <div className="max-w-7xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#171717] border border-[#262626] text-[#C5A059] text-xs font-mono uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5" />
            <span>Master Discovery Directory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-cinzel font-normal tracking-tight text-[#FBF9F5]">
            EXPLORE ALL <span className="text-gold-gradient font-semibold">CREATIVE TALENT</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#A39E93] max-w-2xl leading-relaxed">
            Search top photographers, cinematographers, photo editors, video colorists, and studios across India.
          </p>
        </div>
      </section>

      {/* Discovery & Filter Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div className="p-5 sm:p-6 rounded bg-[#111111] border border-[#262626] space-y-4 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Search Input */}
            <div className="relative lg:col-span-2">
              <Search className="w-4 h-4 text-[#A39E93] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by creator, category, event..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2 rounded bg-[#171717] border border-[#262626] text-xs text-[#FBF9F5] placeholder-[#6B665E] focus:outline-none focus:border-[#C5A059] transition-all"
              />
            </div>

            {/* Discipline Selector */}
            <select
              value={discipline}
              onChange={(e) => setDiscipline(e.target.value)}
              className="w-full px-3 py-2 rounded bg-[#171717] border border-[#262626] text-xs text-[#EAE6DF] focus:outline-none focus:border-[#C5A059] cursor-pointer"
            >
              <option value="all">All Disciplines</option>
              <option value="photographer">Photographers</option>
              <option value="videographer">Videographers & Drone</option>
              <option value="editor">Photo / Video Editors</option>
            </select>

            {/* City Selector */}
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full px-3 py-2 rounded bg-[#171717] border border-[#262626] text-xs text-[#EAE6DF] focus:outline-none focus:border-[#C5A059] cursor-pointer"
            >
              <option value="all">All Locations</option>
              <option value="Indore">Indore</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi NCR</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Jaipur">Jaipur / Rajasthan</option>
              <option value="Goa">Goa</option>
            </select>

            {/* Budget Selector */}
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="w-full px-3 py-2 rounded bg-[#171717] border border-[#262626] text-xs text-[#EAE6DF] focus:outline-none focus:border-[#C5A059] cursor-pointer"
            >
              <option value="all">Any Price</option>
              <option value="under20k">Under ₹20,000</option>
              <option value="under35k">Under ₹35,000</option>
              <option value="luxury">Luxury Tier (₹35,000+)</option>
            </select>
          </div>

          {/* Secondary Filter & Sort bar */}
          <div className="flex flex-wrap items-center justify-between pt-3 border-t border-[#262626] text-xs text-[#A39E93] gap-3">
            <span>
              Showing <strong className="text-[#DFCA9B] font-mono font-bold">{filtered.length}</strong> verified creators
            </span>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="text-[11px] uppercase tracking-wider text-[#A39E93]">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs text-[#DFCA9B] focus:outline-none cursor-pointer font-medium"
                >
                  <option value="recommended" className="bg-[#111111]">Recommended</option>
                  <option value="rating" className="bg-[#111111]">Highest Rated</option>
                  <option value="reviews" className="bg-[#111111]">Most Reviewed</option>
                  <option value="price-low" className="bg-[#111111]">Price: Low to High</option>
                  <option value="price-high" className="bg-[#111111]">Price: High to Low</option>
                </select>
              </div>

              {(search || discipline !== 'all' || cityFilter !== 'all' || priceFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearch('');
                    setDiscipline('all');
                    setCityFilter('all');
                    setPriceFilter('all');
                  }}
                  className="text-xs font-medium text-[#C5A059] hover:text-[#FFF] flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {filtered.length === 0 ? (
          <div className="p-16 text-center bg-[#111111] border border-[#262626] rounded space-y-4">
            <Compass className="w-10 h-10 text-[#6B665E] mx-auto" />
            <h3 className="text-lg font-cinzel text-[#FBF9F5]">No creators found</h3>
            <p className="text-xs text-[#A39E93] max-w-sm mx-auto">
              We couldn't find any creators matching your search. Try resetting your filter criteria.
            </p>
          </div>
        ) : (
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
        )}
      </section>
    </div>
  );
};

export default ExplorePage;
