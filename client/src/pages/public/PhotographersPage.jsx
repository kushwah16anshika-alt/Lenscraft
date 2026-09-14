import React, { useState } from 'react';
import { Camera, Search, SlidersHorizontal, MapPin, Sparkles, Filter, Award } from 'lucide-react';
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
      <section className="bg-[#121212] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#242424]">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#C4683C] text-[10px] font-bold uppercase tracking-[0.2em] border border-white/10">
            <Camera className="w-3.5 h-3.5" />
            <span>Curated Photography Roster</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-white">
            Fine Art & Commercial Photographers
          </h1>
          <p className="text-xs sm:text-sm text-[#8C8276] max-w-2xl leading-relaxed">
            Discover verified wedding, editorial, fashion, portrait, and commercial photographers ready to shoot your next project with certified escrow protection.
          </p>
        </div>
      </section>

      {/* Discovery & Filter Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="p-5 rounded-xl bg-white border border-[#E8E2D8] shadow-2xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#8C8276] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, style, gear..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded bg-[#FAF8F5] border border-[#E8E2D8] text-xs focus:outline-none focus:border-[#121212] transition-all"
              />
            </div>

            {/* City Selector */}
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded bg-[#FAF8F5] border border-[#E8E2D8] text-xs focus:outline-none focus:border-[#121212] transition-all"
            >
              <option value="all">All Cities / Regions</option>
              <option value="Mumbai">Mumbai, Maharashtra</option>
              <option value="Bengaluru">Bengaluru, Karnataka</option>
              <option value="New Delhi">Delhi NCR</option>
              <option value="Pune">Pune, Maharashtra</option>
              <option value="Goa">Goa</option>
              <option value="Jaipur">Jaipur / Rajasthan</option>
            </select>

            {/* Specialty Selector */}
            <select
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded bg-[#FAF8F5] border border-[#E8E2D8] text-xs focus:outline-none focus:border-[#121212] transition-all"
            >
              <option value="all">All Photography Genres</option>
              <option value="Royal Weddings">Royal & Destination Weddings</option>
              <option value="Pre-Wedding">Cinematic Pre-Wedding</option>
              <option value="Candid Moments">Candid & Emotional Moments</option>
              <option value="Drone Photography">Drone Aerial Photography</option>
              <option value="Product Commercials">Product & Advertising Commercial</option>
            </select>

            {/* Budget Selector */}
            <select
              value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value)}
              className="w-full px-3 py-2.5 rounded bg-[#FAF8F5] border border-[#E8E2D8] text-xs focus:outline-none focus:border-[#121212] transition-all"
            >
              <option value="all">Any Budget Tier</option>
              <option value="under20k">Under ₹20,000 / day</option>
              <option value="under35k">Under ₹35,000 / day</option>
              <option value="luxury">Luxury Tier (₹35,000+)</option>
            </select>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#E8E2D8]/60 text-xs text-[#6B6258]">
            <span>Showing <strong className="text-[#121212]">{filtered.length}</strong> master photographers</span>
            {(search || cityFilter !== 'all' || specialtyFilter !== 'all' || maxBudget !== 'all') && (
              <button
                onClick={() => {
                  setSearch('');
                  setCityFilter('all');
                  setSpecialtyFilter('all');
                  setMaxBudget('all');
                }}
                className="text-xs font-bold text-[#C4683C] hover:underline"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* Results Grid */}
        {filtered.length === 0 ? (
          <div className="p-16 text-center bg-white rounded-xl border border-[#E8E2D8] space-y-4">
            <Camera className="w-10 h-10 text-[#8C8276] mx-auto opacity-50" />
            <h3 className="text-lg font-serif font-bold text-[#121212]">No photographers found</h3>
            <p className="text-xs text-[#6B6258] max-w-sm mx-auto">
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
