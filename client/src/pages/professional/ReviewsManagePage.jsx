import React from 'react';
import Card from '../../components/common/Card';
import StarRating from '../../components/common/StarRating';
import Avatar from '../../components/common/Avatar';
import { formatDate } from '../../utils/formatters';
import { usePlatform } from '../../hooks/usePlatform';

const ReviewsManagePage = () => {
  const { reviews, professionals } = usePlatform();
  const currentPro = professionals[0] || {};
  const studioReviews = reviews.filter((r) => r.creatorId === currentPro.id || !r.creatorId);

  return (
    <div className="space-y-6 text-left">
      <div className="pb-4 border-b border-zinc-200">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 block mb-1">
          Social Proof
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
          Client Reviews & Testimonials ({studioReviews.length})
        </h1>
      </div>

      <div className="space-y-4">
        {studioReviews.length > 0 ? (
          studioReviews.map((r) => (
            <Card key={r.id} className="p-6 bg-white border border-zinc-200 space-y-3 shadow-2xs">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar src={r.clientAvatar || r.userAvatar} name={r.clientName || r.userName} size="md" />
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-900">{r.clientName || r.userName}</h4>
                    <span className="text-xs text-zinc-500">{r.event}</span>
                  </div>
                </div>
                <div className="text-right">
                  <StarRating rating={r.rating} showText={false} size="xs" />
                  <span className="text-[11px] text-zinc-400 block mt-1">{formatDate(r.date || r.createdAt)}</span>
                </div>
              </div>

              <p className="text-xs text-zinc-600 italic leading-relaxed">
                "{r.comment}"
              </p>
            </Card>
          ))
        ) : (
          <div className="p-12 text-center bg-white rounded-xl border border-zinc-200">
            <p className="text-xs text-zinc-500">No client reviews received yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsManagePage;
