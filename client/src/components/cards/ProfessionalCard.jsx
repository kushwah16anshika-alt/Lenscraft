import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ShieldCheck, Heart, ArrowUpRight, Star, Calendar, Sparkles } from 'lucide-react';
import Avatar from '../common/Avatar';
import { formatCurrency, formatPriceUnit } from '../../utils/formatters';
import { ROLE_LABELS } from '../../constants/roles';
import BookingModal from '../common/BookingModal';

const ProfessionalCard = ({ professional, onWishlist, onWishlistToggle, isWishlisted = false }) => {
  const [bookingOpen, setBookingOpen] = useState(false);

  const {
    id,
    name,
    role,
    tagline,
    rating,
    reviewCount,
    startingPrice,
    priceUnit,
    location,
    avatar,
    coverImage,
    isVerified,
    specialties = [],
    experienceYears,
  } = professional;

  const completedShoots = Math.floor((reviewCount || 12) * 1.8);

  return (
    <>
      <div className="group flex flex-col h-full bg-[#060b19]/80 backdrop-blur-xl border border-sky-500/20 rounded-2xl overflow-hidden transition-all duration-300 hover:border-sky-400/60 hover:shadow-[0_15px_45px_-5px_rgba(0,210,255,0.2)] text-left relative">
        {/* Subtle top glow line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Visual Cover / Image Showcase */}
        <Link to={`/professionals/${id}`} className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-900 block">
          <img
            src={coverImage || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 opacity-90 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060b19] via-[#060b19]/30 to-transparent" />

          {/* Role Pill */}
          <div className="absolute top-3.5 left-3.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-sky-300 border border-sky-500/30 shadow-xs">
              {ROLE_LABELS[role] || role}
            </span>
          </div>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onWishlist) onWishlist(professional);
              else if (onWishlistToggle) onWishlistToggle(professional);
            }}
            className="absolute top-3.5 right-3.5 p-2 rounded-full bg-slate-950/80 hover:bg-white text-slate-300 hover:text-red-500 backdrop-blur-md border border-white/10 transition-all shadow-xs"
            title="Save Creator"
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
          </button>

          {/* Starting Price & Rating Badges */}
          <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white">
            <div className="flex items-center gap-1.5 text-xs font-bold bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-sky-500/20">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-white">{rating}</span>
              <span className="text-slate-400 text-[10px] font-normal">({reviewCount})</span>
            </div>

            <div className="text-right bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-lg border border-sky-500/20">
              <span className="text-xs font-mono font-bold text-sky-300">
                {formatCurrency(startingPrice)}
              </span>
              <span className="text-[10px] text-slate-400 ml-1">{formatPriceUnit(priceUnit)}</span>
            </div>
          </div>
        </Link>

        {/* Details Area */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
          <div>
            {/* Avatar and Name */}
            <div className="flex items-start gap-3">
              <Avatar
                src={avatar}
                name={name}
                size="md"
                className="ring-2 ring-sky-500/30 shadow-xs shrink-0"
              />
              <div className="flex-1 min-w-0">
                <Link to={`/professionals/${id}`}>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-display font-bold text-white truncate group-hover:text-sky-300 transition-colors">
                      {name}
                    </h3>
                    {isVerified && (
                      <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" title="Verified Visual Master" />
                    )}
                  </div>
                </Link>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-sky-400/70 shrink-0" />
                    <span className="truncate">{location?.city || 'India'}</span>
                  </div>
                  <span className="text-slate-600">·</span>
                  <span className="text-sky-400 font-mono text-[10px]">{completedShoots}+ shoots</span>
                </div>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-xs text-slate-300 line-clamp-2 mt-3 leading-relaxed">
              {tagline}
            </p>

            {/* Specialties Badges */}
            {specialties && specialties.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/5">
                {specialties.slice(0, 3).map((spec, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-900 border border-sky-500/20 text-slate-300"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons: View Profile & Book Now */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <Link
              to={`/professionals/${id}`}
              className="flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-sky-500/20 hover:border-sky-400/40 transition-all text-xs font-semibold"
            >
              <span>View Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-sky-400" />
            </Link>

            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all hover:scale-[1.02]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Direct Booking Modal for this Professional */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        professional={professional}
      />
    </>
  );
};

export default ProfessionalCard;

