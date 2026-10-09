import React from 'react';
import Link from 'next/link';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';
import { Product } from '@/types/product';
import { ProductGrid } from '../product/ProductGrid';

interface TrendingProductsSectionProps {
  products: Product[];
}

export const TrendingProductsSection: React.FC<TrendingProductsSectionProps> = ({
  products,
}) => {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Flame size={14} className="text-rose-600" />
            <span>Trending Products</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Most Compared Products Today
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time price comparisons across India&apos;s leading e-commerce platforms
          </p>
        </div>

        <Link
          href="/search"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-indigo-600 bg-white hover:bg-indigo-50/50 text-slate-800 hover:text-indigo-600 font-bold text-xs transition shadow-2xs group"
        >
          <span>View All Products</span>
          <ArrowRight
            size={14}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      <ProductGrid products={products} />
    </section>
  );
};
