import React from 'react';
import Card from '../../components/common/Card';
import StarRating from '../../components/common/StarRating';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

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
    <div className="space-y-6 text-left">
      <div className="pb-4 border-b border-zinc-200">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 block mb-1">
          Review Moderation
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
          Published Testimonials
        </h1>
      </div>

      <div className="space-y-4">
        {reviews.map((r) => (
          <Card key={r.id} className="p-6 bg-white border border-zinc-200 space-y-3 shadow-2xs">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-semibold text-zinc-900">{r.client} → {r.creator}</h4>
                <div className="mt-1">
                  <StarRating rating={r.rating} size="xs" />
                </div>
              </div>
              <Badge variant="success" size="sm">
                {r.status}
              </Badge>
            </div>
            <p className="text-xs text-zinc-600 italic">"{r.comment}"</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminReviewsPage;
