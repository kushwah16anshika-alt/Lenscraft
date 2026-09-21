import React from 'react';
import Card from '../../components/common/Card';
import StarRating from '../../components/common/StarRating';
import Avatar from '../../components/common/Avatar';
import { formatDate } from '../../utils/formatters';
import { usePlatform } from '../../hooks/usePlatform';
import { Sparkles } from 'lucide-react';

const ReviewsManagePage = () => {
  const { reviews, professionals } = usePlatform();
  const currentPro = professionals[0] || {};
  const studioReviews = reviews.filter((r) => r.creatorId === currentPro.id || !r.creatorId);

  return (
    <div className="space-y-6 text-left animate-reveal">
      <div className="pb-4 border-b border-sky-500/15">
        <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Social Proof</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
          Client Reviews & <span className="text-gradient-cyan">Testimonials</span> ({studioReviews.length})
        </h1>
      </div>

      <div className="space-y-4">
        {studioReviews.length > 0 ? (
          studioReviews.map((r) => (
            <Card key={r.id} className="p-6 glass-card border border-sky-500/20 space-y-3 shadow-xl">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar src={r.clientAvatar || r.userAvatar} name={r.clientName || r.userName} size="md" />
                  <div>
                    <h4 className="text-sm font-display font-bold text-white">{r.clientName || r.userName}</h4>
                    <span className="text-xs text-cyan-400 font-mono">{r.event}</span>
                  </div>
                </div>
                <div className="text-right">
                  <StarRating rating={r.rating} showText={false} size="xs" />
                  <span className="text-[11px] font-mono text-slate-400 block mt-1">{formatDate(r.date || r.createdAt)}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 italic leading-relaxed border-l-2 border-cyan-400 pl-3">
                "{r.comment}"
              </p>
            </Card>
          ))
        ) : (
          <div className="p-12 text-center glass-card rounded-2xl border border-sky-500/20">
            <p className="text-xs text-slate-400">No client reviews received yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsManagePage;
