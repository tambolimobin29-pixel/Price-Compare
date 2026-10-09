'use client';

import React from 'react';
import { Filter, RotateCcw, Check, Star } from 'lucide-react';
import { FilterState, StoreId } from '@/types/product';
import { STORE_REGISTRY } from '@/services/storeMeta';

interface FilterSidebarProps {
  categories: { name: string; count: number }[];
  brands: { name: string; count: number }[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  className?: string;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  brands,
  filters,
  onFilterChange,
  onReset,
  className = '',
}) => {
  const storeList: StoreId[] = [
    'amazon',
    'flipkart',
    'croma',
    'reliance-digital',
    'tata-cliq',
    'myntra',
    'ajio',
  ];

  const handleCategoryClick = (categoryName: string) => {
    onFilterChange({
      ...filters,
      category: filters.category === categoryName ? undefined : categoryName,
    });
  };

  const handleBrandToggle = (brandName: string) => {
    const isSelected = filters.brands.includes(brandName);
    const updated = isSelected
      ? filters.brands.filter((b) => b !== brandName)
      : [...filters.brands, brandName];
    onFilterChange({ ...filters, brands: updated });
  };

  const handleStoreToggle = (storeId: StoreId) => {
    const isSelected = filters.stores.includes(storeId);
    const updated = isSelected
      ? filters.stores.filter((s) => s !== storeId)
      : [...filters.stores, storeId];
    onFilterChange({ ...filters, stores: updated });
  };

  const handleRatingClick = (rating: number) => {
    onFilterChange({
      ...filters,
      minRating: filters.minRating === rating ? undefined : rating,
    });
  };

  const hasActiveFilters = Boolean(
    filters.category ||
      filters.brands.length > 0 ||
      filters.stores.length > 0 ||
      filters.minPrice ||
      filters.maxPrice ||
      filters.minRating ||
      filters.inStockOnly
  );

  return (
    <aside
      className={`bg-white rounded-2xl border border-slate-200/90 p-5 divide-y divide-slate-100 shadow-xs ${className}`}
    >
      {/* Header */}
      <div className="pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-indigo-600" />
          <h3 className="font-bold text-slate-900 text-sm">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-medium transition cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="py-4">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
          Category
        </h4>
        <ul className="space-y-1 text-xs">
          <li>
            <button
              type="button"
              onClick={() => onFilterChange({ ...filters, category: undefined })}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center justify-between ${
                !filters.category
                  ? 'bg-indigo-50 font-semibold text-indigo-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>All Categories</span>
            </button>
          </li>
          {categories.map((cat) => {
            const isSelected = filters.category === cat.name;
            return (
              <li key={cat.name}>
                <button
                  type="button"
                  onClick={() => handleCategoryClick(cat.name)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-indigo-50 font-semibold text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <span className="text-[11px] text-slate-400 font-normal ml-2">
                    {cat.count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Stores */}
      <div className="py-4">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
          E-Commerce Stores
        </h4>
        <div className="space-y-2">
          {storeList.map((storeId) => {
            const store = STORE_REGISTRY[storeId];
            const isSelected = filters.stores.includes(storeId);
            return (
              <label
                key={storeId}
                className="flex items-center gap-2.5 text-xs text-slate-700 hover:text-slate-900 cursor-pointer select-none group"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleStoreToggle(storeId)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                />
                <span className="flex-1 truncate">{store.name}</span>
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: store.primaryColor }}
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Brands */}
      <div className="py-4">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
          Brands
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {brands.map((b) => {
            const isSelected = filters.brands.includes(b.name);
            return (
              <label
                key={b.name}
                className="flex items-center gap-2.5 text-xs text-slate-700 hover:text-slate-900 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleBrandToggle(b.name)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                />
                <span className="flex-1 truncate">{b.name}</span>
                <span className="text-[11px] text-slate-400 font-normal">
                  ({b.count})
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="py-4">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
          Price Range (₹)
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Min Price</label>
            <input
              type="number"
              placeholder="0"
              value={filters.minPrice || ''}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  minPrice: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Max Price</label>
            <input
              type="number"
              placeholder="200000"
              value={filters.maxPrice || ''}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  maxPrice: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600"
            />
          </div>
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="py-4">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
          Customer Rating
        </h4>
        <div className="space-y-1.5 text-xs">
          {[4.5, 4.0, 3.5].map((rating) => {
            const isSelected = filters.minRating === rating;
            return (
              <button
                key={rating}
                type="button"
                onClick={() => handleRatingClick(rating)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition ${
                  isSelected
                    ? 'bg-amber-50 text-amber-900 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Star
                    size={14}
                    className="fill-amber-400 text-amber-400"
                  />
                  <span>{rating}★ & above</span>
                </div>
                {isSelected && <Check size={14} className="text-amber-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Minimum Discount */}
      <div className="py-4">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
          Discount
        </h4>
        <div className="grid grid-cols-2 gap-1.5 text-xs">
          {[10, 20, 30, 40].map((disc) => {
            const isSelected = filters.minDiscount === disc;
            return (
              <button
                key={disc}
                type="button"
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    minDiscount: isSelected ? undefined : disc,
                  })
                }
                className={`px-2.5 py-1.5 rounded-lg border text-center transition font-semibold cursor-pointer ${
                  isSelected
                    ? 'bg-rose-50 border-rose-300 text-rose-700'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {disc}% & above
              </button>
            );
          })}
        </div>
      </div>

      {/* In-Stock Toggle */}
      <div className="pt-4">
        <label className="flex items-center justify-between text-xs text-slate-800 font-medium cursor-pointer">
          <span>In-Stock Only</span>
          <input
            type="checkbox"
            checked={Boolean(filters.inStockOnly)}
            onChange={() =>
              onFilterChange({ ...filters, inStockOnly: !filters.inStockOnly })
            }
            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
          />
        </label>
      </div>
    </aside>
  );
};
