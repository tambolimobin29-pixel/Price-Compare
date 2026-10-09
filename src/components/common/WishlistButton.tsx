'use client';

import React, { useState } from 'react';
import { Heart } from 'lucide-react';

interface WishlistButtonProps {
  productId: string;
  className?: string;
  size?: 'sm' | 'md';
}

export const WishlistButton: React.FC<WishlistButtonProps> = ({
  productId,
  className = '',
  size = 'md',
}) => {
  const [isSaved, setIsSaved] = useState(false);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved((prev) => !prev);
  };

  const iconSizes = {
    sm: 16,
    md: 18,
  };

  return (
    <button
      type="button"
      onClick={toggleWishlist}
      className={`p-2 rounded-full transition-all duration-200 border ${
        isSaved
          ? 'bg-rose-50 border-rose-200 text-rose-500 hover:bg-rose-100'
          : 'bg-white/90 backdrop-blur-sm border-slate-200 text-slate-400 hover:text-rose-500 hover:border-slate-300'
      } shadow-xs ${className}`}
      aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
      title={isSaved ? 'In Wishlist' : 'Add to Wishlist'}
    >
      <Heart
        size={iconSizes[size]}
        className={`transition-transform duration-200 ${
          isSaved ? 'fill-rose-500 scale-110' : 'hover:scale-105'
        }`}
      />
    </button>
  );
};
