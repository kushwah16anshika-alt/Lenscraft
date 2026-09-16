import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import ProfessionalCard from '../../components/cards/ProfessionalCard';
import EmptyState from '../../components/common/EmptyState';
import Button from '../../components/common/Button';
import { usePlatform } from '../../hooks/usePlatform';

const UserWishlistPage = () => {
  const { wishlist, professionals, toggleWishlist } = usePlatform();

  const wishlistedPros = professionals.filter((pro) => wishlist.includes(pro.id));

  return (
    <div className="space-y-6 text-left">
      <div className="pb-4 border-b border-zinc-200">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 block mb-1">
          Saved Talents
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
          My Curated Creators ({wishlistedPros.length})
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Keep track of photographers, videographers, and editors you want to hire for upcoming projects.
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
          onAction={() => {}}
        />
      )}
    </div>
  );
};

export default UserWishlistPage;
