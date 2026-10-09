'use client';

import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { SortOption } from '@/types/product';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  className?: string;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({
  value,
  onChange,
  className = '',
}) => {
  const options: { value: SortOption; label: string }[] = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'lowest_price', label: 'Price: Low to High' },
    { value: 'highest_price', label: 'Price: High to Low' },
    { value: 'highest_discount', label: 'Highest Savings & Discount' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'newest', label: 'Newest Arrivals' },
  ];

  return (
    <div className={`flex items-center gap-2 text-xs ${className}`}>
      <label
        htmlFor="sort-select"
        className="flex items-center gap-1 font-semibold text-slate-500 whitespace-nowrap"
      >
        <ArrowUpDown size={14} />
        <span>Sort By:</span>
      </label>
      <select
        id="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium text-xs shadow-2xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
