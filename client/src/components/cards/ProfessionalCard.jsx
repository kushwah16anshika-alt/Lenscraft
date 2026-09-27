import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  ShieldCheck,
  Heart,
  ArrowUpRight,
  Star,
  Calendar,
  Sparkles,
  CheckCircle,
  Clock,
} from 'lucide-react';
import Avatar from '../common/Avatar';
import { formatCurrency } from '../../utils/formatters';
import { ROLE_LABELS } from '../../constants/roles';
import BookingModal from '../common/BookingModal';

const ProfessionalCard = ({
  professional,
  onWishlist,
  onWishlistToggle,
  isWishlisted = false,
  onBookNow,
}) => {
  const [bookingOpen, setBookingOpen] = useState(false);

  if (!professional) return null;

  const {
    id,
    name,
    role = 'photographer',
    category,
    tagline,
    rating = 4.9,
    reviewCount = 24,
    completedShoots = 112,
    startingPrice = 25000,
    priceUnit = 'day',
    location = 'Indore',
    avatar,
    coverImage,
    isVerified = true,
    specialties = [],
    experienceYears = 6,
    availability = 'Available this week',
  } = professional;

  const city = typeof location === 'object' ? location.city || 'Indore' : location || 'Indore';
  const displayCategory = category || ROLE_LABELS[role] || role || 'Wedding Photographer';
  const priceFormatted = `₹${startingPrice.toLocaleString('en-IN')}`;

  const renderStars = (score) => {
    return (
      <div className="flex items-center gap-0.5 text-amber-400">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${i < Math.floor(score) ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`}
          />
        ))}
      </div>
    );
  };

  const handleBookClick = () => {
    if (onBookNow) {
      onBookNow(professional);
    } else {
      setBookingOpen(true);
    }
  };

  return (
    <>
      <div className="group relative flex flex-col glass-card border border-sky-500/15 hover:border-sky-400/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(0,210,255,0.18)] hover:-translate-y-1.5 text-left">
        {/* 1. Primary Visual Hero: Portfolio Image Container */}
        <Link to={`/professionals/${id}`} className="relative aspect-[4/3] w-full overflow-hidden bg-midnight-950 block">
          <img
            src={coverImage || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 filter brightness-95 group-hover:brightness-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060b19] via-transparent to-black/40" />

          {/* Specialty Badge (Top-Left) */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full bg-midnight-950/85 backdrop-blur-md text-cyan-300 border border-sky-500/30">
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
            className="absolute top-3 right-3 p-2 rounded-full bg-midnight-950/85 hover:bg-midnight-900 text-slate-400 hover:text-cyan-300 backdrop-blur-md border border-sky-500/20 transition-all hover:scale-110 active:scale-95"
            aria-label="Save Creator to favorites"
            title={isWishlisted ? 'Remove from Saved' : 'Save Creator'}
          >
            <Heart className={`w-3.5 h-3.5 transition-transform ${isWishlisted ? 'fill-cyan-400 text-cyan-400' : ''}`} />
          </button>

          {/* Creator Profile Avatar Overlay (Bottom-Left) */}
          <div className="absolute -bottom-3 left-3 z-10 flex items-center gap-2">
            <Avatar
              src={avatar || coverImage}
              name={name}
              size="md"
              className="border-2 border-midnight-950 shadow-lg shadow-black/60"
            />
          </div>

          {/* Availability Status Pill (Bottom-Right of image) */}
          <div className="absolute bottom-2.5 right-3 flex items-center gap-1 text-[10px] font-mono text-emerald-300 bg-midnight-950/85 backdrop-blur-md px-2 py-0.5 rounded-full border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{availability || 'Available'}</span>
          </div>
        </Link>

        {/* 2. Creator Info & Metadata */}
        <div className="p-4 sm:p-5 pt-5 flex-1 flex flex-col justify-between space-y-3">
          <div>
            {/* Creator Name & Verified Shield */}
            <div className="flex items-center justify-between gap-2">
              <Link to={`/professionals/${id}`} className="min-w-0 flex-1">
                <h3 className="text-base sm:text-lg font-display font-semibold text-white group-hover:text-cyan-300 transition-colors truncate">
                  {name}
                </h3>
              </Link>
              {isVerified && (
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" title="Verified Creator" />
              )}
            </div>

            {/* Location & Rating */}
            <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
              <div className="flex items-center gap-1 truncate">
                <MapPin className="w-3.5 h-3.5 text-cyan-400/80 shrink-0" />
                <span className="truncate">{city}, India</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold text-white text-xs">{rating.toFixed(1)}</span>
                <span className="text-slate-500 text-[11px]">({reviewCount})</span>
              </div>
            </div>

            {/* Event Specialty Tags */}
            {specialties && specialties.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2.5 pt-2 border-t border-white/10">
                {specialties.slice(0, 3).map((spec, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10"
                  >
                    {spec}
                  </span>
                ))}
                {specialties.length > 3 && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md text-slate-500">
                    +{specialties.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Starting Price */}
            <div className="flex items-center justify-between text-xs text-slate-300 mt-2.5 pt-2.5 border-t border-white/10">
              <span className="text-[11px] text-slate-400">Starting Rate</span>
              <div className="text-right">
                <span className="font-mono text-cyan-300 font-bold text-sm">{priceFormatted}</span>
                <span className="text-[10px] text-slate-500 font-mono ml-1">/ {priceUnit || 'shoot'}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions: View Profile & Book Now */}
          <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-white/10">
            <Link
              to={`/professionals/${id}`}
              className="py-2 px-3 rounded-xl bg-white/5 hover:bg-sky-500/10 text-slate-200 hover:text-cyan-300 border border-white/10 hover:border-sky-500/40 text-xs font-semibold text-center transition-all flex items-center justify-center gap-1"
            >
              <span>View Profile</span>
              <ArrowUpRight className="w-3 h-3 text-cyan-400" />
            </Link>

            <button
              type="button"
              onClick={handleBookClick}
              className="py-2 px-3 rounded-xl glow-btn-primary text-xs uppercase tracking-wider font-bold text-center transition-all shadow-[0_0_15px_rgba(0,210,255,0.3)] hover:scale-102 cursor-pointer"
            >
              Book Now
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

