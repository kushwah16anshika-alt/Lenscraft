import React from 'react';
import Card from '../../components/common/Card';
import StarRating from '../../components/common/StarRating';
import Badge from '../../components/common/Badge';
import { Sparkles } from 'lucide-react';

import { usePlatform } from '../../hooks/usePlatform';
import { formatDate } from '../../utils/formatters';

const AdminReviewsPage = () => {
  const { reviews } = usePlatform();

  return (
    <div className="space-y-6 text-left animate-reveal">
      <div className="pb-4 border-b border-sky-500/15">
        <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Review Moderation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
          Published <span className="text-gradient-cyan">Testimonials</span> ({reviews.length})
        </h1>
      </div>

      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((r) => (
            <Card key={r.id} className="p-6 glass-card border border-sky-500/20 space-y-3 shadow-xl">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-display font-bold text-white">
                    {r.clientName || r.userName || r.client || 'Client'} → {r.creatorName || r.professionalName || r.creator || 'Creator'}
                  </h4>
                  <div className="mt-1 flex items-center gap-2">
                    <StarRating rating={r.rating} size="xs" />
                    <span className="text-[11px] font-mono text-slate-400">{formatDate(r.date || r.createdAt)}</span>
                  </div>
                </div>
                <Badge variant="success" size="sm">
                  published
                </Badge>
              </div>
              <p className="text-xs text-slate-300 italic border-l-2 border-cyan-400 pl-3">"{r.comment}"</p>
            </Card>
          ))
        ) : (
          <div className="p-12 text-center glass-card rounded-2xl border border-sky-500/20">
            <p className="text-xs text-slate-400">No reviews submitted yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReviewsPage;
