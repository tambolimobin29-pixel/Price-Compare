'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  SlidersHorizontal,
  X,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { FilterState, Product, SortOption, StoreId } from '@/types/product';
import { ProductGrid } from '../product/ProductGrid';
import { FilterSidebar } from '../filters/FilterSidebar';
import { SortDropdown } from '../filters/SortDropdown';

interface SearchCatalogViewProps {
  initialProducts: Product[];
  categories: { name: string; count: number }[];
  brands: { name: string; count: number }[];
  initialQuery?: string;
  initialCategory?: string;
}

export const SearchCatalogView: React.FC<SearchCatalogViewProps> = ({
  initialProducts,
  categories,
  brands,
  initialQuery = '',
  initialCategory,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [filters, setFilters] = useState<FilterState>({
    query: initialQuery || searchParams.get('q') || '',
    category: initialCategory || searchParams.get('category') || undefined,
    brands: searchParams.get('brands') ? [searchParams.get('brands')!] : [],
    stores: [],
    minPrice: undefined,
    maxPrice: undefined,
    minRating: undefined,
    inStockOnly: false,
  });

  // Keep query in sync if URL changes
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const cat = searchParams.get('category') || undefined;
    setFilters((prev) => ({
      ...prev,
      query: q,
      category: cat || prev.category,
    }));
  }, [searchParams]);

  const handleResetFilters = () => {
    setFilters({
      query: '',
      category: undefined,
      brands: [],
      stores: [],
      minPrice: undefined,
      maxPrice: undefined,
      minRating: undefined,
      inStockOnly: false,
    });
    router.push('/search');
  };

  // Filter & sort products locally for instant response
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Query filter
    if (filters.query && filters.query.trim() !== '') {
      const q = filters.query.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (filters.category && filters.category !== 'All') {
      result = result.filter(
        (p) => p.category.toLowerCase() === filters.category!.toLowerCase()
      );
    }

    // Brands filter
    if (filters.brands && filters.brands.length > 0) {
      const brandsLower = filters.brands.map((b) => b.toLowerCase());
      result = result.filter((p) =>
        brandsLower.includes(p.brand.toLowerCase())
      );
    }

    // Stores filter
    if (filters.stores && filters.stores.length > 0) {
      result = result.filter((p) =>
        p.offers.some((o) => filters.stores.includes(o.storeId))
      );
    }

    // Price bounds
    if (typeof filters.minPrice === 'number') {
      result = result.filter((p) => p.lowestPrice >= filters.minPrice!);
    }
    if (typeof filters.maxPrice === 'number') {
      result = result.filter((p) => p.lowestPrice <= filters.maxPrice!);
    }

    // Rating
    if (typeof filters.minRating === 'number') {
      result = result.filter((p) => p.rating >= filters.minRating!);
    }

    // Discount filter
    if (typeof filters.minDiscount === 'number') {
      result = result.filter((p) => {
        const sorted = [...p.offers].sort((a, b) => a.price - b.price);
        return sorted[0] && sorted[0].discountPercentage >= filters.minDiscount!;
      });
    }

    // In stock
    if (filters.inStockOnly) {
      result = result.filter((p) =>
        p.offers.some((o) => o.availability === 'in_stock')
      );
    }

    // Sorting
    switch (sortBy) {
      case 'lowest_price':
        result.sort((a, b) => a.lowestPrice - b.lowestPrice);
        break;
      case 'highest_price':
        result.sort((a, b) => b.lowestPrice - a.lowestPrice);
        break;
      case 'highest_discount':
        result.sort((a, b) => b.maxSavings - a.maxSavings);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'popularity':
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return result;
  }, [initialProducts, filters, sortBy]);

  // Pagination logic (6 items per page for clean multi-column layout)
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  const activeFiltersCount =
    (filters.category ? 1 : 0) +
    filters.brands.length +
    filters.stores.length +
    (filters.minPrice || filters.maxPrice ? 1 : 0) +
    (filters.minRating ? 1 : 0) +
    (filters.minDiscount ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Banner / Breadcrumb Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Home</span>
            <span>/</span>
            <span>Search</span>
            {filters.category && (
              <>
                <span>/</span>
                <span className="font-semibold text-slate-800">
                  {filters.category}
                </span>
              </>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {filters.query
              ? `Search results for "${filters.query}"`
              : filters.category || 'All Products'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            <strong className="text-slate-800">{filteredProducts.length} products found</strong> across partner stores
          </p>
        </div>

        {/* Controls: Sort and Mobile Filter Trigger */}
        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs shadow-2xs hover:bg-slate-50 cursor-pointer"
          >
            <SlidersHorizontal size={15} />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Sort Dropdown */}
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-28">
            <FilterSidebar
              categories={categories}
              brands={brands}
              filters={filters}
              onFilterChange={setFilters}
              onReset={handleResetFilters}
            />
          </div>
        </div>

        {/* Product Grid Area & Pagination */}
        <div className="lg:col-span-3 space-y-8">
          <ProductGrid
            products={paginatedProducts}
            emptyTitle="No products found"
            emptyDescription="Try searching for another product or adjusting your filters."
            onResetFilters={handleResetFilters}
          />

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Page {currentPage} of {totalPages} ({filteredProducts.length} total)
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer Filter Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex bg-slate-900/60 backdrop-blur-xs lg:hidden">
          <div className="relative ml-auto w-full max-w-xs h-full bg-white shadow-2xl p-4 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
                <span className="font-bold text-slate-900 text-sm">
                  Filter Products
                </span>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              <FilterSidebar
                categories={categories}
                brands={brands}
                filters={filters}
                onFilterChange={setFilters}
                onReset={handleResetFilters}
                className="border-none shadow-none p-0"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 mt-4">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
