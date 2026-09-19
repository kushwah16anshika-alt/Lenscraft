import React, { useState } from 'react';
import { Camera, Search, RotateCcw, Sparkles } from 'lucide-react';
import ProfessionalCard from '../../components/cards/ProfessionalCard';
import { usePlatform } from '../../context/PlatformContext';

const PhotographersPage = () => {
  const { professionals, favorites, toggleFavorite } = usePlatform();
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [budgetFilter, setBudgetFilter] = useState('all');

  const photographers = professionals.filter(
    (p) => p.role === 'photographer' || p.category?.toLowerCase().includes('photo')
  );

  const filtered = photographers.filter((p) => {
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.tagline?.toLowerCase().includes(search.toLowerCase()) ||
      (p.specialties || []).some((s) => s.toLowerCase().includes(search.toLowerCase()));

    const pCity = typeof p.location === 'string' ? p.location : p.location?.city || '';
    const matchesCity = cityFilter === 'all' || pCity.toLowerCase().includes(cityFilter.toLowerCase());
    const matchesSpecialty = specialtyFilter === 'all' || (p.specialties || []).some(s => s.toLowerCase().includes(specialtyFilter.toLowerCase()));
    const matchesBudget =
      budgetFilter === 'all' ||
      (budgetFilter === 'under25k' && p.startingPrice <= 25000) ||
      (budgetFilter === 'under40k' && p.startingPrice <= 40000) ||
      (budgetFilter === 'luxury' && p.startingPrice > 40000);

    return matchesSearch && matchesCity && matchesSpecialty && matchesBudget;
  });

  return (
    <div className="min-h-screen bg-[#080808] text-[#FBF9F5] pb-24 text-left">
      {/* Header Banner */}
      <section className="relative py-14 px-4 sm:px-6 lg:px-8 border-b border-[#262626]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium mb-2">
            <Camera className="w-3.5 h-3.5" />
            <span>Master Photography Roster</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-editorial font-medium text-[#FBF9F5] uppercase tracking-tight mb-3">
            FINE ART & COMMERCIAL PHOTOGRAPHERS
          </h1>
          <p className="text-xs sm:text-sm text-[#A39E93] max-w-2xl leading-relaxed">
            Discover verified wedding, editorial, fashion, portrait, and commercial photographers ready to shoot your next story with certified escrow protection.
          </p>
        </div>
      </section>

      {/* Discovery & Filter Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div className="p-5 sm:p-6 bg-[#111111] border border-[#262626] rounded-xs shadow-xl space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#A39E93] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search photographers, styles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#171717] border border-[#262626] text-xs sm:text-sm text-[#FBF9F5] placeholder-[#6B665E] rounded-xs focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            {/* City Selector */}
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#171717] border border-[#262626] text-xs sm:text-sm text-[#FBF9F5] rounded-xs focus:outline-none focus:border-[#C5A059] cursor-pointer"
            >
              <option value="all">All Locations</option>
              <option value="Indore">Indore, Madhya Pradesh</option>
              <option value="Mumbai">Mumbai, Maharashtra</option>
              <option value="Bengaluru">Bengaluru, Karnataka</option>
              <option value="Delhi">Delhi NCR</option>
              <option value="Udaipur">Udaipur, Rajasthan</option>
            </select>

            {/* Specialty */}
            <select
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#171717] border border-[#262626] text-xs sm:text-sm text-[#FBF9F5] rounded-xs focus:outline-none focus:border-[#C5A059] cursor-pointer"
            >
              <option value="all">All Specialties</option>
              <option value="Wedding">Royal & Destination Weddings</option>
              <option value="Fashion">Fashion & Lookbooks</option>
              <option value="Portrait">Editorial Portraits</option>
              <option value="Product">Commercial Product Stills</option>
            </select>

            {/* Budget */}
            <select
              value={budgetFilter}
              onChange={(e) => setBudgetFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#171717] border border-[#262626] text-xs sm:text-sm text-[#FBF9F5] rounded-xs focus:outline-none focus:border-[#C5A059] cursor-pointer"
            >
              <option value="all">Any Budget Tier</option>
              <option value="under25k">Under ₹25,000</option>
              <option value="under40k">Under ₹40,000</option>
              <option value="luxury">Luxury Tier (₹40,000+)</option>
            </select>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#262626] text-xs text-[#A39E93] font-mono">
            <span>Showing <strong className="text-[#FBF9F5]">{filtered.length}</strong> photographers</span>
            {(search || cityFilter !== 'all' || specialtyFilter !== 'all' || budgetFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearch('');
                  setCityFilter('all');
                  setSpecialtyFilter('all');
                  setBudgetFilter('all');
                }}
                className="text-xs text-[#C5A059] hover:text-[#DFCA9B] flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center bg-[#111111] border border-[#262626] rounded-xs p-8 space-y-4">
            <Camera className="w-10 h-10 text-[#6B665E] mx-auto" />
            <h3 className="text-lg font-editorial text-[#FBF9F5]">No photographers found</h3>
            <p className="text-xs text-[#A39E93] max-w-sm mx-auto">
              Try adjusting your filters or search keywords.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((creator) => (
              <ProfessionalCard
                key={creator.id}
                professional={creator}
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

export default PhotographersPage;
