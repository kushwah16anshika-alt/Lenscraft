import React from 'react';
import Card from '../../components/common/Card';
import StarRating from '../../components/common/StarRating';
import Badge from '../../components/common/Badge';
import { Sparkles } from 'lucide-react';

const AdminReviewsPage = () => {
  const reviews = [
    {
      id: 'rev-1',
      client: 'Pooja & Rohan',
      creator: 'Aarav Sharma Photography',
      rating: 5,
      comment: 'Aarav and his team were absolutely phenomenal at our Udaipur wedding. Every photograph looks like high fashion.',
      status: 'published',
    },
  ];

  return (
    <div className="space-y-6 text-left animate-reveal">
      <div className="pb-4 border-b border-sky-500/15">
        <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Review Moderation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
          Published <span className="text-gradient-cyan">Testimonials</span>
        </h1>
      </div>

      <div className="space-y-4">
        {reviews.map((r) => (
          <Card key={r.id} className="p-6 glass-card border border-sky-500/20 space-y-3 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-display font-bold text-white">{r.client} → {r.creator}</h4>
                <div className="mt-1">
                  <StarRating rating={r.rating} size="xs" />
                </div>
              </div>
              <Badge variant="success" size="sm">
                {r.status}
              </Badge>
            </div>
            <p className="text-xs text-slate-300 italic border-l-2 border-cyan-400 pl-3">"{r.comment}"</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminReviewsPage;
