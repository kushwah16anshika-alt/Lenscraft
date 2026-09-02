import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';
import Card from '../common/Card';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import StarRating from '../common/StarRating';
import Button from '../common/Button';
import { formatCurrency, formatPriceUnit } from '../../utils/formatters';
import { ROLE_LABELS } from '../../constants/roles';

const ProfessionalCard = ({ professional, onWishlist, isWishlisted = false }) => {
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
    <Card hoverEffect className="group flex flex-col h-full bg-white border border-[#E5E0D8] rounded-md shadow-2xs">
      {/* Cover / Media Banner */}
      <div className="relative h-48 w-full overflow-hidden bg-[#EEEAE4]">
        <img
          src={coverImage || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/80 via-transparent to-transparent opacity-80" />

        {/* Role Pill */}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-xs backdrop-blur-md bg-white/90 text-[#171717] border border-white/40 shadow-xs">
            {ROLE_LABELS[role] || role}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onWishlist && onWishlist(professional);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md border border-white/40 text-[#171717] hover:text-[#99453F] transition-colors shadow-xs"
          title="Save Creator"
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#99453F] text-[#99453F]' : ''}`} />
        </button>

        {/* Starting Price Overlay */}
        <div className="absolute bottom-2.5 right-3 px-2.5 py-1 rounded-sm bg-[#171717]/90 backdrop-blur-md text-right border border-white/10">
          <span className="text-[9px] text-[#D6CFC4] block uppercase tracking-wider">Starting from</span>
          <span className="text-xs font-bold text-white">
            {formatCurrency(startingPrice)}
          </span>
          <span className="text-[10px] text-[#D6CFC4] ml-1">{formatPriceUnit(priceUnit)}</span>
        </div>
      </div>

      {/* Profile Details */}
      <div className="p-5 flex-1 flex flex-col justify-between text-left">
        <div>
          {/* Avatar and Name */}
          <div className="flex items-start gap-3 -mt-8 mb-3 relative z-10">
            <Avatar
              src={avatar}
              name={name}
              size="lg"
              className="ring-3 ring-white shadow-sm"
            />
            <div className="pt-4 flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-serif font-bold text-[#171717] truncate group-hover:text-[#B88A5A] transition-colors">
                  {name}
                </h3>
                {isVerified && (
                  <ShieldCheck className="w-4 h-4 text-[#B88A5A] shrink-0" title="Verified Creator" />
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-[#6B6258] mt-0.5">
                <MapPin className="w-3 h-3 text-[#8C8276] shrink-0" />
                <span className="truncate">{location?.city || 'India'}, {location?.state || ''}</span>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-xs text-[#6B6258] line-clamp-2 mb-3 min-h-[32px] leading-relaxed">
            {tagline}
          </p>

          {/* Rating & Experience */}
          <div className="flex items-center justify-between py-2 border-y border-[#E5E0D8] mb-3 text-xs">
            <StarRating rating={rating} reviewsCount={reviewCount} size="xs" />
            <span className="text-[#6B6258] font-medium">{experienceYears} yrs exp</span>
          </div>

          {/* Specialties Pills */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {specialties.slice(0, 3).map((spec, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded-xs bg-[#F7F5F2] border border-[#E5E0D8] text-[#6B6258] font-medium"
              >
                {spec}
              </span>
            ))}
            {specialties.length > 3 && (
              <span className="text-[10px] text-[#8C8276] self-center font-medium">
                +{specialties.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Card CTA */}
        <div className="pt-1">
          <Link to={`/professionals/${id}`} className="block">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-between group-hover:bg-[#171717] group-hover:text-white group-hover:border-[#171717] transition-all"
              rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
            >
              <span>View Portfolio</span>
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default ProfessionalCard;
