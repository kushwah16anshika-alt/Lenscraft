import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({
  rating = 5,
  maxStars = 5,
  size = 'sm',
  showText = true,
  reviewsCount,
  interactive = false,
  onChange,
  className = '',
}) => {
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5">
        {[...Array(maxStars)].map((_, i) => {
          const starValue = i + 1;
          const isFilled = rating >= starValue;
          const isHalf = rating >= starValue - 0.5 && rating < starValue;

          return (
            <button
              type="button"
              key={i}
              disabled={!interactive}
              onClick={() => interactive && onChange && onChange(starValue)}
              className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
            >
              <Star
                className={`${sizes[size] || sizes.sm} ${
                  isFilled
                    ? 'fill-amber-400 text-amber-400'
                    : isHalf
                    ? 'fill-amber-400/50 text-amber-400'
                    : 'text-zinc-300'
                }`}
              />
            </button>
          );
        })}
      </div>
      {showText && (
        <span className="text-xs font-bold text-zinc-900 ml-0.5">
          {Number(rating).toFixed(1)}
          {reviewsCount !== undefined && (
            <span className="text-zinc-500 font-normal ml-1">({reviewsCount})</span>
          )}
        </span>
      )}
    </div>
  );
};

export default StarRating;
