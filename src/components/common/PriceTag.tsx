import React from 'react';

interface PriceTagProps {
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  isLowestPrice?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export const PriceTag: React.FC<PriceTagProps> = ({
  price,
  originalPrice,
  discountPercentage,
  isLowestPrice = false,
  size = 'md',
  className = '',
}) => {
  const priceSizes = {
    sm: 'text-sm font-semibold',
    md: 'text-base font-bold',
    lg: 'text-xl font-extrabold',
    xl: 'text-3xl font-extrabold tracking-tight',
  };

  const originalSizes = {
    sm: 'text-xs',
    md: 'text-xs',
    lg: 'text-sm',
    xl: 'text-base',
  };

  const discountPillSizes = {
    sm: 'text-[10px] px-1.5 py-0.5',
    md: 'text-xs px-2 py-0.5',
    lg: 'text-xs px-2.5 py-1',
    xl: 'text-sm px-3 py-1',
  };

  const hasDiscount = originalPrice && originalPrice > price;
  const calculatedDiscount =
    discountPercentage ??
    (hasDiscount ? Math.round(((originalPrice! - price) / originalPrice!) * 100) : 0);

  return (
    <div className={`flex items-baseline flex-wrap gap-2 ${className}`}>
      <span
        className={`${priceSizes[size]} ${
          isLowestPrice ? 'text-emerald-600' : 'text-slate-900'
        }`}
      >
        {formatINR(price)}
      </span>

      {hasDiscount && (
        <span
          className={`${originalSizes[size]} text-slate-400 line-through font-normal`}
        >
          {formatINR(originalPrice!)}
        </span>
      )}

      {calculatedDiscount > 0 && (
        <span
          className={`font-semibold rounded-md bg-rose-50 text-rose-600 border border-rose-100 ${discountPillSizes[size]}`}
        >
          {calculatedDiscount}% OFF
        </span>
      )}
    </div>
  );
};
