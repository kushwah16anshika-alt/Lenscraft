import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ShieldCheck, Heart, ArrowUpRight, Star } from 'lucide-react';
import Avatar from '../common/Avatar';
import { formatCurrency, formatPriceUnit } from '../../utils/formatters';
import { ROLE_LABELS } from '../../constants/roles';

const ProfessionalCard = ({ professional, onWishlist, isWishlisted = false, variant = 'default' }) => {
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

  return (
    <div className="group flex flex-col h-full bg-white border border-[#E8E2D8] rounded-lg overflow-hidden transition-all duration-300 hover:border-[#121212] hover:shadow-xl text-left">
      {/* Visual Cover / Image Showcase */}
      <Link to={`/professionals/${id}`} className="relative h-56 sm:h-60 w-full overflow-hidden bg-[#F3EFEA] block">
        <img
          src={coverImage || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        {/* Role Pill */}
        <div className="absolute top-3 left-3">
          <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-white border border-white/20">
            {ROLE_LABELS[role] || role}
          </span>
        </div>

        {/* Wishlist Icon Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onWishlist) onWishlist(professional);
            else if (onWishlistToggle) onWishlistToggle(professional);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-white text-white hover:text-[#99453F] backdrop-blur-md border border-white/20 transition-all shadow-sm"
          title="Save Creator"
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#99453F] text-[#99453F]' : ''}`} />
        </button>

        {/* Starting Price & Rating Pill */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
          <div className="flex items-center gap-1 text-xs font-bold bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-white/10">
            <Star className="w-3 h-3 fill-[#C4683C] text-[#C4683C]" />
            <span>{rating}</span>
            <span className="text-white/60 text-[10px] font-normal">({reviewCount})</span>
          </div>

          <div className="text-right bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
            <span className="text-xs font-serif font-bold text-white">
              {formatCurrency(startingPrice)}
            </span>
            <span className="text-[10px] text-white/70 ml-1">{formatPriceUnit(priceUnit)}</span>
          </div>
        </div>
      </Link>

      {/* Details Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Avatar and Name */}
          <div className="flex items-start gap-3">
            <Avatar
              src={avatar}
              name={name}
              size="md"
              className="ring-2 ring-white shadow-sm shrink-0"
            />
            <div className="flex-1 min-w-0">
              <Link to={`/professionals/${id}`}>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-serif font-bold text-[#121212] truncate group-hover:text-[#C4683C] transition-colors">
                    {name}
                  </h3>
                  {isVerified && (
                    <ShieldCheck className="w-4 h-4 text-[#C4683C] shrink-0" title="Verified Creator" />
                  )}
                </div>
              </Link>
              <div className="flex items-center gap-1 text-xs text-[#6B6258] mt-0.5">
                <MapPin className="w-3 h-3 text-[#8C8276] shrink-0" />
                <span className="truncate">{location?.city || 'India'}</span>
                {experienceYears && (
                  <>
                    <span className="text-[#8C8276]">·</span>
                    <span className="text-[#8C8276] text-[11px]">{experienceYears}y exp</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-xs text-[#6B6258] line-clamp-2 mt-3 leading-relaxed">
            {tagline}
          </p>

          {/* Specialties Pills */}
          {specialties && specialties.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[#E8E2D8]">
              {specialties.slice(0, 3).map((spec, sIdx) => (
                <span
                  key={sIdx}
                  className="text-[10px] px-2 py-0.5 rounded bg-[#F3EFEA] text-[#4A433B] border border-[#E8E2D8]"
                >
                  {spec}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* View Profile Action */}
        <Link
          to={`/professionals/${id}`}
          className="w-full flex items-center justify-between p-2.5 rounded bg-[#FAF8F5] hover:bg-[#121212] text-[#121212] hover:text-white border border-[#E8E2D8] hover:border-[#121212] transition-all text-xs font-semibold"
        >
          <span>View Studio Portfolio</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default ProfessionalCard;
