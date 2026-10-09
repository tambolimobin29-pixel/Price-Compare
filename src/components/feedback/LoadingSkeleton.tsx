import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 flex flex-col justify-between gap-3 animate-pulse shadow-xs">
      <div className="aspect-square w-full bg-slate-100 rounded-xl" />
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="h-3 w-16 bg-slate-200 rounded" />
          <div className="h-4 w-12 bg-slate-200 rounded" />
        </div>
        <div className="h-4 w-full bg-slate-200 rounded" />
        <div className="h-4 w-3/4 bg-slate-200 rounded" />
      </div>
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
        <div className="h-3 w-20 bg-slate-200 rounded" />
        <div className="h-6 w-32 bg-slate-300 rounded" />
      </div>
      <div className="grid grid-cols-2 gap-2 pt-1">
        <div className="h-9 rounded-xl bg-slate-200" />
        <div className="h-9 rounded-xl bg-slate-200" />
      </div>
    </div>
  );
};

export const ProductGridSkeleton: React.FC<{ count?: number }> = ({
  count = 8,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};

export const ComparisonSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 animate-pulse space-y-6">
      <div className="h-8 w-64 bg-slate-200 rounded-xl" />
      <div className="grid grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="w-full aspect-square bg-slate-100 rounded-2xl" />
            <div className="h-4 w-3/4 bg-slate-200 rounded mx-auto" />
            <div className="h-5 w-1/2 bg-slate-300 rounded mx-auto" />
          </div>
        ))}
      </div>
      <div className="space-y-4 pt-4 border-t border-slate-100">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 bg-slate-50 rounded-xl" />
        ))}
      </div>
    </div>
  );
};

export const SearchLoading: React.FC = () => {
  return (
    <div className="py-12 flex flex-col items-center justify-center gap-3 text-center">
      <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-xs font-semibold text-slate-500">
        Scanning live store offers and checking lowest prices...
      </p>
    </div>
  );
};

export const LoadingSkeleton = {
  ProductCard: ProductCardSkeleton,
  ProductGrid: ProductGridSkeleton,
  Comparison: ComparisonSkeleton,
  Search: SearchLoading,
};
