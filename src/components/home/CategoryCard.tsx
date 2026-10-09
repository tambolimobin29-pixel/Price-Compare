import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface CategoryItem {
  id: string;
  name: string;
  shortDescription: string;
  productCount: number;
  image: string;
  slug: string;
}

interface CategoryCardProps {
  category: CategoryItem;
  className?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  className = '',
}) => {
  return (
    <Link
      href={`/search?category=${encodeURIComponent(category.slug || category.name)}`}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-300 p-4 transition-all duration-300 shadow-xs hover:shadow-xl hover:-translate-y-1.5 focus:outline-none ${className}`}
    >
      {/* Category Image Container */}
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-50 mb-3.5 flex items-center justify-center">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-white/90 backdrop-blur-xs text-slate-700 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-300">
          <ArrowRight size={14} className="text-indigo-600" />
        </span>
      </div>

      {/* Category Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors truncate">
              {category.name}
            </h3>
            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full flex-shrink-0">
              {category.productCount} items
            </span>
          </div>
          <p className="text-xs text-slate-500 line-clamp-1 leading-snug">
            {category.shortDescription}
          </p>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400 group-hover:text-indigo-600 transition-colors">
          <span>Compare Deals</span>
          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};
