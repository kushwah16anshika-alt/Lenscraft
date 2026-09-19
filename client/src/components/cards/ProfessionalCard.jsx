import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ShieldCheck, Heart, ArrowUpRight, Star, Calendar } from 'lucide-react';
import Avatar from '../common/Avatar';
import { formatCurrency, formatPriceUnit } from '../../utils/formatters';
import { ROLE_LABELS } from '../../constants/roles';
import BookingModal from '../common/BookingModal';

const ProfessionalCard = ({
  professional,
  onWishlist,
  onWishlistToggle,
  isWishlisted = false,
  aspectRatio = 'aspect-[4/5]',
  featured = false
}) => {
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
    location,
    avatar,
    coverImage,
    isVerified = true,
    specialties = [],
  } = professional;

  const city = typeof location === 'string' ? location : (location?.city || 'Indore, India');
  const displayCategory = category || ROLE_LABELS[role] || role || 'Photographer';
  const priceFormatted = startingPrice >= 1000 ? `₹${Math.round(startingPrice / 1000)}K` : `₹${startingPrice}`;

  return (
    <>
      <div className={`group flex flex-col bg-[#171717] border border-[#262626] hover:border-[#C5A059]/60 rounded-sm overflow-hidden transition-all duration-500 hover:shadow-2xl text-left relative ${featured ? 'md:row-span-2' : ''}`}>
        
        {/* Visual Cover / Image Showcase */}
        <Link to={`/professionals/${id}`} className={`relative ${aspectRatio} w-full overflow-hidden bg-[#111111] block`}>
          <img
            src={coverImage || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-100"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-black/20" />

          {/* Discipline Badge (top left) */}
          <div className="absolute top-3.5 left-3.5">
            <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-xs bg-[#080808]/85 backdrop-blur-md text-[#EAE6DF] border border-[#262626]">
              {displayCategory}
            </span>
          </div>

          {/* Favorite Heart Button (top right) */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onWishlist) onWishlist(professional);
              else if (onWishlistToggle) onWishlistToggle(professional);
            }}
            className="absolute top-3.5 right-3.5 p-2 rounded-full bg-[#080808]/85 hover:bg-[#171717] text-[#A39E93] hover:text-[#C5A059] backdrop-blur-md border border-[#262626] transition-all"
            aria-label="Save Creator"
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#C5A059] text-[#C5A059]' : ''}`} />
          </button>
        </Link>

        {/* Creator Info Area */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
          <div>
            {/* Header: Name & Verification */}
            <div className="flex items-baseline justify-between gap-2">
              <Link to={`/professionals/${id}`} className="flex items-center gap-1.5 min-w-0">
                <h3 className="text-base sm:text-lg font-editorial font-semibold text-[#FBF9F5] group-hover:text-[#DFCA9B] transition-colors truncate">
                  {name}
                </h3>
                {isVerified && (
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059] shrink-0" title="Verified Creator" />
                )}
              </Link>
            </div>

            {/* Sub-label: Category */}
            <p className="text-xs text-[#C5A059] font-medium tracking-wide mt-0.5 truncate">
              {displayCategory}
            </p>

            {/* Location + Price Line + Rating */}
            <div className="flex items-center justify-between text-xs text-[#A39E93] mt-2 pt-2 border-t border-[#262626]/80">
              <span className="truncate">
                {city.split(',')[0]} · <strong className="text-[#FBF9F5] font-normal">{priceFormatted} onwards</strong>
              </span>
              
              <div className="flex items-center gap-1 shrink-0">
                <Star className="w-3 h-3 fill-[#C5A059] text-[#C5A059]" />
                <span className="text-xs font-mono font-medium text-[#FBF9F5]">{rating}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions (View Profile / Book Now) */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#262626]/50">
            <Link
              to={`/professionals/${id}`}
              className="flex items-center justify-center gap-1 py-2 px-3 rounded-xs bg-[#111111] hover:bg-[#1E1E1E] text-[#EAE6DF] hover:text-[#DFCA9B] border border-[#262626] hover:border-[#C5A059]/40 transition-all text-xs font-medium"
            >
              <span>Portfolio</span>
              <ArrowUpRight className="w-3 h-3 text-[#A39E93]" />
            </Link>

            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="flex items-center justify-center gap-1 py-2 px-3 rounded-xs gold-btn text-[#080808] font-semibold text-xs transition-all"
            >
              <Calendar className="w-3 h-3" />
              <span>Book</span>
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal Instance */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        professional={professional}
      />
    </>
  );
};

export default ProfessionalCard;
