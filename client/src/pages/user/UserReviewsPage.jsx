import React from 'react';
import { Star } from 'lucide-react';
import Card from '../../components/common/Card';
import StarRating from '../../components/common/StarRating';
import Avatar from '../../components/common/Avatar';
import { formatDate } from '../../utils/formatters';

const UserReviewsPage = () => {
  const reviews = [
    {
      id: 1,
      creatorName: 'Aarav Sharma Photography',
      creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      rating: 5,
      date: '2025-06-15',
      event: 'Royal Wedding in Udaipur',
      comment:
        'Aarav and his team were absolutely phenomenal at our Udaipur wedding. Every single photograph looks like a frame from an editorial bridal magazine. Highly recommended!',
    },
  ];

  return (
    <div className="space-y-6 text-left">
      <div className="pb-4 border-b border-[#E5E0D8]">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#B88A5A] block mb-1">
          Feedback History
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
          My Submitted Reviews
        </h1>
      </div>

      <div className="space-y-4">
        {reviews.map((r) => (
          <Card key={r.id} className="p-6 bg-white border border-[#E5E0D8] space-y-4 shadow-2xs">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar src={r.creatorAvatar} name={r.creatorName} size="md" />
                <div>
                  <h4 className="text-sm font-bold text-[#171717]">{r.creatorName}</h4>
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

export default UserReviewsPage;
