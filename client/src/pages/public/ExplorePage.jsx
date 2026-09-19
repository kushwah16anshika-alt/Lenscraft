import React, { useState, useMemo } from 'react';
import { Search, MapPin, SlidersHorizontal, Star, Sparkles, RotateCcw, ArrowUpDown, Filter, Grid, List } from 'lucide-react';
import ProfessionalCard from '../../components/cards/ProfessionalCard';
import { usePlatform } from '../../context/PlatformContext';

const ExplorePage = () => {
  const { professionals, searchFilters, setSearchFilters, favorites, toggleFavorite } = usePlatform();

  // Local filter states (prefilled from global searchFilters if any)
  const [searchQuery, setSearchQuery] = useState(searchFilters?.search || '');
  const [selectedCity, setSelectedCity] = useState(searchFilters?.city || 'all');
  const [selectedService, setSelectedService] = useState(searchFilters?.service || 'all');
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');

  const filteredAndSortedCreators = useMemo(() => {
    let result = professionals.filter((p) => {
      // Query filter
      const matchesQuery =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.specialties || []).some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      // Location filter
      const pCity = typeof p.location === 'string' ? p.location : p.location?.city || '';
      const matchesCity = selectedCity === 'all' || pCity.toLowerCase().includes(selectedCity.toLowerCase());

      // Service filter
      const matchesService =
        selectedService === 'all' ||
        p.role?.toLowerCase() === selectedService.toLowerCase() ||
        p.category?.toLowerCase().includes(selectedService.toLowerCase());

      // Event filter
      const matchesEvent =
        selectedEvent === 'all' ||
        (p.specialties || []).some((s) => s.toLowerCase().includes(selectedEvent.toLowerCase())) ||
        p.tagline?.toLowerCase().includes(selectedEvent.toLowerCase());

      // Budget filter
      const matchesBudget =
        selectedBudget === 'all' ||
        (selectedBudget === 'under20k' && p.startingPrice <= 20000) ||
        (selectedBudget === '20k-40k' && p.startingPrice > 20000 && p.startingPrice <= 40000) ||
        (selectedBudget === 'luxury' && p.startingPrice > 40000);

      // Rating filter
      const matchesRating = selectedRating === 'all' || p.rating >= parseFloat(selectedRating);

      return matchesQuery && matchesCity && matchesService && matchesEvent && matchesBudget && matchesRating;
    });

    // Sorting
    switch (sortBy) {
      case 'most_reviewed':
        result.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        break;
      case 'newest':
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'price_low_high':
        result.sort((a, b) => (a.startingPrice || 0) - (b.startingPrice || 0));
        break;
      case 'price_high_low':
        result.sort((a, b) => (b.startingPrice || 0) - (a.startingPrice || 0));
        break;
      case 'recommended':
      default:
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }

    return result;
  }, [
    professionals,
    searchQuery,
    selectedCity,
    selectedService,
    selectedEvent,
    selectedBudget,
    selectedRating,
    selectedAvailability,
    selectedStyle,
    sortBy,
  ]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCity('all');
    setSelectedService('all');
    setSelectedEvent('all');
    setSelectedBudget('all');
    setSelectedRating('all');
    setSelectedAvailability('all');
    setSelectedStyle('all');
    setSortBy('recommended');
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#FBF9F5] pb-24 text-left">
      
      {/* Header Banner */}
      <section className="relative py-14 px-4 sm:px-6 lg:px-8 border-b border-[#262626]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Creative Discovery</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-editorial font-medium text-[#FBF9F5] uppercase tracking-tight mb-3">
            DISCOVER CREATORS
          </h1>
          <p className="text-xs sm:text-sm text-[#A39E93] max-w-2xl leading-relaxed">
            Explore verified photographers, videographers, and post-production artists across India. Compare full visual portfolios and book with escrow protection.
          </p>
        </div>
      </section>

      {/* Discovery & Multi-Filter Control Panel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* Main Search Bar & Quick Filters */}
        <div className="p-5 sm:p-6 bg-[#111111] border border-[#262626] rounded-xs shadow-xl space-y-4">
          
          {/* Row 1: Search + Location + Service + Sort */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
            
            {/* Search Input */}
            <div className="lg:col-span-4 relative">
              <Search className="w-4 h-4 text-[#A39E93] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search photographers, videographers, editors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#171717] border border-[#262626] text-xs sm:text-sm text-[#FBF9F5] placeholder-[#6B665E] rounded-xs focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            {/* Location Selector */}
            <div className="lg:col-span-3">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#171717] border border-[#262626] text-xs sm:text-sm text-[#FBF9F5] rounded-xs focus:outline-none focus:border-[#C5A059] cursor-pointer"
              >
                <option value="all">All Locations / Nationwide</option>
                <option value="Indore">Indore, Madhya Pradesh</option>
                <option value="Mumbai">Mumbai, Maharashtra</option>
                <option value="Bengaluru">Bengaluru, Karnataka</option>
                <option value="Delhi">Delhi NCR</option>
                <option value="Udaipur">Udaipur, Rajasthan</option>
                <option value="Goa">Goa</option>
                <option value="Ladakh">Ladakh / Himalayas</option>
                <option value="Kolkata">Kolkata, West Bengal</option>
              </select>
            </div>

            {/* Service Discipline */}
            <div className="lg:col-span-3">
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#171717] border border-[#262626] text-xs sm:text-sm text-[#FBF9F5] rounded-xs focus:outline-none focus:border-[#C5A059] cursor-pointer"
              >
                <option value="all">All Creative Services</option>
                <option value="photographer">Photographers</option>
                <option value="videographer">Videographers & Cinematographers</option>
                <option value="editor">Photo & Video Editors</option>
              </select>
            </div>

            {/* Sort Order */}
            <div className="lg:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#171717] border border-[#262626] text-xs text-[#DFCA9B] rounded-xs focus:outline-none focus:border-[#C5A059] cursor-pointer font-medium"
              >
                <option value="recommended">Recommended</option>
                <option value="most_reviewed">Most Reviewed</option>
                <option value="newest">Newest</option>
                <option value="price_low_high">Price: Low to High</option>
                <option value="price_high_low">Price: High to Low</option>
              </select>
            </div>

          </div>

          {/* Row 2: Secondary Refinements (Event, Price, Rating) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#262626]/80 text-xs">
            
            {/* Event / Genre */}
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="px-3 py-2 bg-[#171717] border border-[#262626] text-[#A39E93] focus:text-[#FBF9F5] rounded-xs focus:outline-none focus:border-[#C5A059]"
            >
              <option value="all">Event: All Types</option>
              <option value="Wedding">Weddings & Nuptials</option>
              <option value="Pre-Wedding">Pre-Wedding Shoots</option>
              <option value="Fashion">Fashion & Haute Couture</option>
              <option value="Product">Product & Commercial</option>
              <option value="Portrait">Editorial Portraits</option>
              <option value="Music Video">Music Videos & Reels</option>
            </select>

            {/* Budget Range */}
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="px-3 py-2 bg-[#171717] border border-[#262626] text-[#A39E93] focus:text-[#FBF9F5] rounded-xs focus:outline-none focus:border-[#C5A059]"
            >
              <option value="all">Budget: All Tiers</option>
              <option value="under20k">Under ₹20,000</option>
              <option value="20k-40k">₹20,000 – ₹40,000</option>
              <option value="luxury">Luxury (₹40,000+)</option>
            </select>

            {/* Rating */}
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="px-3 py-2 bg-[#171717] border border-[#262626] text-[#A39E93] focus:text-[#FBF9F5] rounded-xs focus:outline-none focus:border-[#C5A059]"
            >
              <option value="all">Rating: Any Score</option>
              <option value="4.8">4.8+ Stars</option>
              <option value="4.9">4.9+ Stars</option>
              <option value="5.0">5.0 Perfect Stars</option>
            </select>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="px-3 py-2 bg-[#171717] hover:bg-[#202020] border border-[#262626] text-[#A39E93] hover:text-[#FBF9F5] rounded-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3 h-3 text-[#C5A059]" />
              <span>Reset Filters</span>
            </button>

          </div>

          {/* Status Ticker */}
          <div className="flex items-center justify-between text-xs text-[#A39E93] pt-1 font-mono">
            <span>
              Showing <strong className="text-[#FBF9F5] font-semibold">{filteredAndSortedCreators.length}</strong> of {professionals.length} Creators
            </span>
            <span className="text-[#C5A059]">Escrow Protected · 100% Verified</span>
          </div>

        </div>

        {/* Results Grid - Responsive Editorial Masonry */}
        {filteredAndSortedCreators.length === 0 ? (
          <div className="py-20 text-center bg-[#111111] border border-[#262626] rounded-xs p-8 space-y-4">
            <Search className="w-10 h-10 text-[#6B665E] mx-auto" />
            <h3 className="text-xl font-editorial text-[#FBF9F5]">No matching creators found</h3>
            <p className="text-xs text-[#A39E93] max-w-sm mx-auto">
              Try adjusting your search criteria, widening your location, or resetting the filter options.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 gold-btn text-xs uppercase tracking-wider font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedCreators.map((creator, idx) => (
              <ProfessionalCard
                key={creator.id}
                professional={creator}
                aspectRatio={idx % 4 === 0 ? 'aspect-[3/4]' : 'aspect-[4/5]'}
                isWishlisted={favorites?.some(f => f.id === creator.id)}
                onWishlistToggle={() => toggleFavorite(creator)}
              />
            ))}
          </div>
        )}

      </section>

    </div>
  );
};

export default ExplorePage;
