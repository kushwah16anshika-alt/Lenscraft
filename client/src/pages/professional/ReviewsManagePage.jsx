import React from 'react';
import Card from '../../components/common/Card';
import StarRating from '../../components/common/StarRating';
import Avatar from '../../components/common/Avatar';
import { formatDate } from '../../utils/formatters';

const ReviewsManagePage = () => {
  const reviews = [
    {
      id: 1,
      clientName: 'Pooja & Rohan',
      clientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      rating: 5,
      date: '2025-06-15',
      event: 'Royal Wedding in Udaipur',
      comment:
        'Aarav and his team were absolutely phenomenal at our Udaipur wedding. Every single photograph looks like a frame from an editorial bridal magazine. Highly recommended!',
    },
    {
      id: 2,
      clientName: 'Vikram Sethi',
      clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      rating: 5,
      date: '2025-05-20',
      event: 'Cinematic Pre-Wedding',
      comment:
        'Incredible visual sensitivity and extremely punctual. Delivered the 4K color graded video trailer within 4 days.',
    },
  ];

  return (
    <div className="space-y-6 text-left">
      <div className="pb-4 border-b border-[#E5E0D8]">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#B88A5A] block mb-1">
          Social Proof
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
          Client Reviews & Testimonials
        </h1>
      </div>

      <div className="space-y-4">
        {reviews.map((r) => (
          <Card key={r.id} className="p-6 bg-white border border-[#E5E0D8] space-y-3 shadow-2xs">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar src={r.clientAvatar} name={r.clientName} size="md" />
                <div>
                  <h4 className="text-sm font-bold text-[#171717]">{r.clientName}</h4>
                  <span className="text-xs text-[#6B6258]">{r.event}</span>
                </div>
              </div>
              <div className="text-right">
                <StarRating rating={r.rating} showText={false} size="xs" />
                <span className="text-[10px] text-[#8C8276] block mt-1">{formatDate(r.date)}</span>
              </div>
            </div>

            <p className="text-xs text-[#6B6258] italic font-serif leading-relaxed">
              "{r.comment}"
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewsManagePage;
