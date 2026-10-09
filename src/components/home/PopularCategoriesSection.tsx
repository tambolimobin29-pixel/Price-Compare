import React from 'react';
import Link from 'next/link';
import { ArrowRight, Layers } from 'lucide-react';
import { CategoryCard, CategoryItem } from './CategoryCard';
import { Product } from '@/types/product';

export const POPULAR_CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-mobiles',
    name: 'Mobiles',
    shortDescription: 'Flagships, 5G phones & foldable tech',
    productCount: 42,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02540?auto=format&fit=crop&w=500&q=80',
    slug: 'Mobiles & Tablets',
  },
  {
    id: 'cat-laptops',
    name: 'Laptops',
    shortDescription: 'MacBooks, gaming laptops & ultrabooks',
    productCount: 28,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80',
    slug: 'Laptops & Computers',
  },
  {
    id: 'cat-headphones',
    name: 'Headphones',
    shortDescription: 'Noise-canceling & wireless earbuds',
    productCount: 35,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80',
    slug: 'Headphones & Audio',
  },
  {
    id: 'cat-tvs',
    name: 'TVs',
    shortDescription: '4K OLED, QLED & smart screens',
    productCount: 19,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=500&q=80',
    slug: 'TVs & Home Theatre',
  },
  {
    id: 'cat-smartwatches',
    name: 'Smartwatches',
    shortDescription: 'Fitness trackers, Apple & Galaxy watch',
    productCount: 24,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80',
    slug: 'Smartwatches & Wearables',
  },
  {
    id: 'cat-cameras',
    name: 'Cameras',
    shortDescription: 'Mirrorless, DSLR & action vlogging',
    productCount: 16,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80',
    slug: 'Cameras & Photography',
  },
  {
    id: 'cat-gaming',
    name: 'Gaming',
    shortDescription: 'PlayStation 5, Xbox, GPUs & gear',
    productCount: 22,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=500&q=80',
    slug: 'Gaming & Consoles',
  },
  {
    id: 'cat-appliances',
    name: 'Home Appliances',
    shortDescription: 'Vacuums, air purifiers & smart home',
    productCount: 31,
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=500&q=80',
    slug: 'Home & Kitchen',
  },
  {
    id: 'cat-fashion',
    name: 'Fashion',
    shortDescription: 'Sneakers, apparel & accessories',
    productCount: 50,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=500&q=80',
    slug: 'Fashion & Footwear',
  },
  {
    id: 'cat-beauty',
    name: 'Beauty',
    shortDescription: 'Grooming tech, fragrances & care',
    productCount: 18,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=500&q=80',
    slug: 'Beauty & Personal Care',
  },
];

export const PopularCategoriesSection: React.FC<{ products: Product[] }> = ({ products }) => {
  const categories = POPULAR_CATEGORIES.map((category) => ({
    ...category,
    productCount: products.filter((product) => product.category === category.slug).length,
  }));

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Layers size={13} />
            <span>Popular Categories</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Shop by Department
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Compare verified prices across 10 top consumer categories in India
          </p>
        </div>

        <Link
          href="/search"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-700 transition group"
        >
          <span>View All Categories</span>
          <ArrowRight
            size={15}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      {/* Responsive Grid: 5 cols desktop, 3 cols tablet, 2 cols mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </section>
  );
};
