import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md';
  className?: string;
}

export function formatReviewCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  reviewCount,
  size = 'sm',
  className = '',
}) => {
  const iconSize = size === 'sm' ? 14 : 16;

  return (
    <div
      className={`inline-flex items-center gap-1.5 ${className}`}
      aria-label={`Rating ${rating} out of 5 stars`}
    >
      <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200/60 text-amber-700 font-bold text-xs">
        <Star
          size={iconSize}
          className="fill-amber-400 text-amber-400"
          aria-hidden="true"
        />
        <span>{rating.toFixed(1)}</span>
      </div>

      {typeof reviewCount === 'number' && (
        <span className="text-xs text-slate-500 font-normal">
          ({formatReviewCount(reviewCount)} reviews)
        </span>
      )}
    </div>
  );
};
