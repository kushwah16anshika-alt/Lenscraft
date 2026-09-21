import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Sparkles } from 'lucide-react';
import ProfessionalCard from '../../components/cards/ProfessionalCard';
import EmptyState from '../../components/common/EmptyState';
import { usePlatform } from '../../hooks/usePlatform';

const UserWishlistPage = () => {
  const { wishlist, professionals, toggleWishlist } = usePlatform();
  const navigate = useNavigate();

  const wishlistedPros = professionals.filter((pro) => wishlist.includes(pro.id));

  return (
    <div className="space-y-6 text-left animate-reveal">
      <div className="pb-4 border-b border-sky-500/15">
        <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Saved Talents</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
          My Curated <span className="text-gradient-cyan">Creators</span> ({wishlistedPros.length})
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Keep track of photographers, videographers, and editors you want to hire for upcoming shoots and campaigns.
        </p>
      </div>

      {wishlistedPros.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistedPros.map((pro) => (
            <ProfessionalCard
              key={pro.id}
              professional={pro}
              isWishlisted={true}
              onWishlistToggle={() => toggleWishlist(pro.id)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Heart}
          title="Your Wishlist is Empty"
          description="Browse our curated roster of fine art photographers, videographers, and editors, and tap the heart to save them."
          actionLabel="Explore Creators"
          onAction={() => navigate('/photographers')}
        />
      )}
    </div>
  );
};

export default UserWishlistPage;
