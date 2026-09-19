import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ShieldCheck, Heart, ArrowUpRight, Star, Calendar, Sparkles } from 'lucide-react';
import Avatar from '../common/Avatar';
import { formatCurrency, formatPriceUnit } from '../../utils/formatters';
import { ROLE_LABELS } from '../../constants/roles';
import BookingModal from '../common/BookingModal';

const ProfessionalCard = ({ professional, onWishlist, onWishlistToggle, isWishlisted = false, variant = 'standard' }) => {
  const [bookingOpen, setBookingOpen] = useState(false);

  if (!professional) return null;

  const {
    id,
    name,
    role,
    category,
    tagline,
    rating = 4.9,
    reviewCount = 18,
    startingPrice = 25000,
    priceUnit = 'shoot',
    location = 'Indore',
    avatar,
    coverImage,
    isVerified = true,
    specialties = [],
    experienceYears = 6,
  } = professional;

  const city = typeof location === 'object' ? (location.city || 'Indore') : (location || 'Indore');
  const displayCategory = category || ROLE_LABELS[role] || role || 'Wedding Photographer';
  const priceDisplay = startingPrice >= 1000 
    ? `₹${(startingPrice / 1000).toFixed(0)}K onwards`
    : `₹${startingPrice.toLocaleString('en-IN')}`;

  const renderStars = (score) => {
    return (
      <div className="flex items-center gap-0.5 text-[#C5A059]">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${i < Math.floor(score) ? 'fill-[#C5A059]' : 'text-[#6B665E]'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="group relative flex flex-col bg-[#171717] border border-[#262626] hover:border-[#C5A059]/60 rounded overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/80 hover:-translate-y-1 text-left">
        
        {/* Visual Showcase / Image Container */}
        <Link to={`/professionals/${id}`} className="relative aspect-[4/3] w-full overflow-hidden bg-[#111111] block">
          <img
            src={coverImage || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-black/20" />

          {/* Discipline Badge (Subtle top-left) */}
          <div className="absolute top-3 left-3">
            <span className="text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded bg-[#080808]/80 backdrop-blur-md text-[#DFCA9B] border border-[#262626]">
              {displayCategory}
            </span>
          </div>

          {/* Favorite Heart Button (Top-Right) */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onWishlistToggle) onWishlistToggle(professional);
              else if (onWishlist) onWishlist(professional);
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-[#080808]/75 hover:bg-[#171717] text-[#A39E93] hover:text-[#C5A059] backdrop-blur-md border border-[#262626] transition-all"
            aria-label="Save Creator to favorites"
          >
            <Heart className={`w-4 h-4 transition-transform active:scale-125 ${isWishlisted ? 'fill-[#C5A059] text-[#C5A059]' : ''}`} />
          </button>
        </Link>

        {/* Creator Info & Metadata */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
          <div>
            {/* Creator Name & Category */}
            <div className="flex items-baseline justify-between gap-2">
              <Link to={`/professionals/${id}`} className="min-w-0 flex-1">
                <h3 className="text-base sm:text-lg font-cinzel font-semibold text-[#FBF9F5] group-hover:text-[#DFCA9B] transition-colors truncate">
                  {name}
                </h3>
              </Link>
              {isVerified && (
                <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" title="Verified Creator" />
              )}
            </div>

            <p className="text-xs text-[#C5A059] font-medium mt-0.5 truncate">
              {displayCategory}
            </p>

            {/* Location & Starting Price */}
            <div className="flex items-center justify-between text-xs text-[#A39E93] mt-2 pt-2 border-t border-[#262626]">
              <div className="flex items-center gap-1 truncate">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]/70 shrink-0" />
                <span className="truncate">{city}</span>
                <span className="text-[#6B665E]">·</span>
                <span className="font-mono text-[#DFCA9B] font-semibold">{priceDisplay}</span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              {renderStars(rating)}
              <span className="text-xs font-semibold text-[#FBF9F5]">{rating.toFixed(1)}</span>
              <span className="text-[10px] text-[#6B665E]">({reviewCount})</span>
            </div>
          </div>

          {/* Quick Actions: View Profile & Book */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#262626]">
            <Link
              to={`/professionals/${id}`}
              className="py-1.5 px-3 rounded bg-[#111111] hover:bg-[#1E1E1E] text-[#EAE6DF] hover:text-[#DFCA9B] border border-[#262626] hover:border-[#C5A059]/40 text-xs font-medium text-center transition-all flex items-center justify-center gap-1"
            >
              <span>Profile</span>
              <ArrowUpRight className="w-3 h-3 text-[#C5A059]" />
            </Link>

            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="py-1.5 px-3 rounded gold-btn text-xs uppercase tracking-wider font-semibold text-center transition-all"
            >
              Book
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal for this creator */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        professional={professional}
      />
    </>
  );
};

export default ProfessionalCard;
