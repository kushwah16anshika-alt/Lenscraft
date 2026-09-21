import React from 'react';
import Card from '../common/Card';
import Avatar from '../common/Avatar';
import StarRating from '../common/StarRating';
import { formatDate } from '../../utils/formatters';

const ReviewCard = ({ review }) => {
  const {
    userName = 'Client',
    userAvatar,
    rating = 5,
    comment,
    date = new Date().toISOString(),
    eventCategory = 'Wedding Shoot',
  } = review;

  return (
    <Card className="p-6 glass-card border border-sky-500/20 text-left hover:border-cyan-400/40 transition-all">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <Avatar src={userAvatar} name={userName} size="sm" />
          <div>
            <h4 className="text-sm font-bold text-slate-100">{userName}</h4>
            <span className="text-[11px] text-cyan-400/80 block">{eventCategory}</span>
          </div>
        </div>
        <div className="text-right">
          <StarRating rating={rating} showText={false} size="xs" />
          <span className="text-[10px] text-slate-400 block mt-1 font-mono">{formatDate(date)}</span>
        </div>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed italic">"{comment}"</p>
    </Card>
  );
};

export default ReviewCard;
