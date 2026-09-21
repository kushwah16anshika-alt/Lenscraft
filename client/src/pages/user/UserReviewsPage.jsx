import React from 'react';
import { Star, Sparkles } from 'lucide-react';
import Card from '../../components/common/Card';
import StarRating from '../../components/common/StarRating';
import Avatar from '../../components/common/Avatar';
import { formatDate } from '../../utils/formatters';
import { usePlatform } from '../../hooks/usePlatform';

const UserReviewsPage = () => {
  const { reviews } = usePlatform();

  return (
    <div className="space-y-6 text-left animate-reveal">
      <div className="pb-4 border-b border-sky-500/15">
        <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Feedback History</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
          My Submitted <span className="text-gradient-cyan">Reviews</span> ({reviews.length})
        </h1>
      </div>

      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((r) => (
            <Card key={r.id} className="p-6 glass-card border border-sky-500/20 space-y-4 shadow-xl">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar src={r.creatorAvatar} name={r.creatorName} size="md" />
                  <div>
                    <h4 className="text-sm font-display font-bold text-white">{r.creatorName}</h4>
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
            <p className="text-xs text-slate-400">You haven't submitted any reviews yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserReviewsPage;
