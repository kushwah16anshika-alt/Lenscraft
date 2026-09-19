import React, { useState } from 'react';
import { Camera, Search, SlidersHorizontal, Sparkles, RotateCcw, MapPin, ArrowUpDown, Star, ShieldCheck } from 'lucide-react';
import ProfessionalCard from '../../components/cards/ProfessionalCard';
import { ROLES } from '../../constants/roles';
import { usePlatform } from '../../context/PlatformContext';

const PhotographersPage = () => {
  const { professionals, favorites, toggleFavorite } = usePlatform();
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [genreFilter, setGenreFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');

  const photographers = professionals.filter((p) => p.role === ROLES.PHOTOGRAPHER || p.category?.toLowerCase().includes('photograph'));

  const filtered = photographers
    .filter((p) => {
      const city = typeof p.location === 'object' ? p.location.city : p.location;
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.tagline?.toLowerCase().includes(search.toLowerCase()) ||
        p.category?.toLowerCase().includes(search.toLowerCase()) ||
        (p.specialties || []).some((s) => s.toLowerCase().includes(search.toLowerCase()));

      const matchesCity = cityFilter === 'all' || city?.toLowerCase() === cityFilter.toLowerCase();
      const matchesGenre = genreFilter === 'all' || (p.specialties || []).includes(genreFilter) || p.category?.toLowerCase().includes(genreFilter.toLowerCase());
      const matchesPrice =
        priceFilter === 'all' ||
        (priceFilter === 'under20k' && p.startingPrice <= 20000) ||
        (priceFilter === 'under35k' && p.startingPrice <= 35000) ||
        (priceFilter === 'luxury' && p.startingPrice > 35000);
      const matchesRating =
        ratingFilter === 'all' || (ratingFilter === '4.8plus' && (p.rating || 5.0) >= 4.8);

      return matchesSearch && matchesCity && matchesGenre && matchesPrice && matchesRating;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return (a.startingPrice || 0) - (b.startingPrice || 0);
      if (sortBy === 'price-high') return (b.startingPrice || 0) - (a.startingPrice || 0);
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'reviews') return (b.reviewCount || 0) - (a.reviewCount || 0);
      return 0; // recommended
    });

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 pb-24 text-left relative">
      {/* Header Banner */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-sky-500/15 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono uppercase tracking-widest">
            <Camera className="w-3.5 h-3.5 text-cyan-400" />
            <span>Curated Photography Directory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white">
            EXPLORE <span className="text-gradient-cyan text-glow-cyan">PHOTOGRAPHERS</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Discover verified wedding, editorial, fashion, portrait, and commercial photographers ready to shoot your next project with certified escrow protection.
          </p>
        </div>
      </section>

      {/* Discovery & Filter Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6 relative z-10">
        <div className="p-5 sm:p-6 rounded-3xl glass-panel border border-sky-500/25 space-y-4 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Search Input */}
            <div className="relative lg:col-span-2">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, style, genre..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl glass-input text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-all"
              />
            </div>

            {/* City Selector */}
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-2xl glass-input text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="all" className="bg-midnight-950">All Locations</option>
              <option value="Indore" className="bg-midnight-950">Indore</option>
              <option value="Mumbai" className="bg-midnight-950">Mumbai</option>
              <option value="Delhi" className="bg-midnight-950">Delhi NCR</option>
              <option value="Bengaluru" className="bg-midnight-950">Bengaluru</option>
              <option value="Jaipur" className="bg-midnight-950">Jaipur / Rajasthan</option>
              <option value="Goa" className="bg-midnight-950">Goa</option>
            </select>

            {/* Genre Selector */}
            <select
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-2xl glass-input text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="all" className="bg-midnight-950">All Photography Genres</option>
              <option value="Wedding" className="bg-midnight-950">Wedding Photography</option>
              <option value="Portrait" className="bg-midnight-950">Portrait & Headshots</option>
              <option value="Fashion" className="bg-midnight-950">Fashion & Editorial</option>
              <option value="Travel" className="bg-midnight-950">Travel & Destination</option>
              <option value="Product" className="bg-midnight-950">Product & Commercial</option>
              <option value="Event" className="bg-midnight-950">Events & Parties</option>
            </select>

            {/* Price Tier */}
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-2xl glass-input text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="all" className="bg-midnight-950">Any Budget Tier</option>
              <option value="under20k" className="bg-midnight-950">Under ₹20,000</option>
              <option value="under35k" className="bg-midnight-950">₹20,000 - ₹35,000</option>
              <option value="luxury" className="bg-midnight-950">Luxury / Studio (₹35,000+)</option>
            </select>
          </div>

          {/* Sub Filters & Sorting */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setRatingFilter(ratingFilter === '4.8plus' ? 'all' : '4.8plus')}
                className={`px-3 py-1.5 rounded-full border transition-all flex items-center gap-1 cursor-pointer ${
                  ratingFilter === '4.8plus'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,210,255,0.3)]'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span>Top Rated (4.8+)</span>
              </button>

              {(search || cityFilter !== 'all' || genreFilter !== 'all' || priceFilter !== 'all' || ratingFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearch('');
                    setCityFilter('all');
                    setGenreFilter('all');
                    setPriceFilter('all');
                    setRatingFilter('all');
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
            Showing <span className="text-white font-mono font-bold">{filtered.length}</span> verified photographers
          </p>
          <div className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Escrow Protected Bookings</span>
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
            <Camera className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-xl font-display font-bold text-white">No Photographers Found</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              No photographers matched your active search criteria. Try loosening your filters or resetting your search.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setCityFilter('all');
                setGenreFilter('all');
                setPriceFilter('all');
                setRatingFilter('all');
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

export default PhotographersPage;
