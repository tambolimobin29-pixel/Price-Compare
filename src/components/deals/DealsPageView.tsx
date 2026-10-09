'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Percent,
  Sparkles,
  TrendingDown,
  Filter,
  ExternalLink,
  ArrowRight,
  Flame,
  Zap,
  Tag,
} from 'lucide-react';
import { Product, StoreId } from '@/types/product';
import { getDealUrl } from '@/services/dealUrl';
import { SafeImage } from '../common/SafeImage';
import { StoreBadge } from '../common/StoreBadge';
import { PriceTag, formatINR } from '../common/PriceTag';
import { STORE_REGISTRY } from '@/services/storeMeta';

interface DealsPageViewProps {
  initialProducts: Product[];
  categories: { name: string; count: number }[];
}

export const DealsPageView: React.FC<DealsPageViewProps> = ({
  initialProducts,
  categories,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStore, setSelectedStore] = useState<StoreId | 'all'>('all');
  const [selectedDiscount, setSelectedDiscount] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<string>('all');

  // Filtered deals
  const deals = useMemo(() => {
    return initialProducts.filter((p) => {
      const bestOffer = [...p.offers].sort((a, b) => a.price - b.price)[0];
      if (!bestOffer) return false;

      // Category
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }

      // Store
      if (selectedStore !== 'all' && bestOffer.storeId !== selectedStore) {
        return false;
      }

      // Discount %
      if (bestOffer.discountPercentage < selectedDiscount) {
        return false;
      }

      // Price Range filter
      if (priceRange === 'under-30k' && bestOffer.price > 30000) return false;
      if (priceRange === 'under-70k' && (bestOffer.price <= 30000 || bestOffer.price > 70000)) return false;
      if (priceRange === 'above-70k' && bestOffer.price <= 70000) return false;

      return true;
    });
  }, [initialProducts, selectedCategory, selectedStore, selectedDiscount, priceRange]);

  // Section Groupings
  const trendingDeals = useMemo(
    () => [...deals].sort((a, b) => b.maxSavings - a.maxSavings).slice(0, 4),
    [deals]
  );

  const bigDiscounts = useMemo(
    () =>
      [...deals]
        .sort((a, b) => {
          const discA = a.offers.sort((x, y) => x.price - y.price)[0]?.discountPercentage || 0;
          const discB = b.offers.sort((x, y) => x.price - y.price)[0]?.discountPercentage || 0;
          return discB - discA;
        })
        .slice(0, 4),
    [deals]
  );

  const techDeals = useMemo(
    () =>
      deals.filter(
        (p) =>
          p.category === 'Mobiles & Tablets' ||
          p.category === 'Laptops & Computers' ||
          p.category === 'Audio & Wearables'
      ),
    [deals]
  );

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Hero Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold uppercase tracking-wider">
              <Percent size={14} className="text-rose-400" />
              <span>Sample Retailer Listings</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Today&apos;s Best Deals
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Browse sample catalog products and open retailer search pages to check current products, prices and availability.
            </p>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:border-indigo-600"
            >
              <option value="All">All Categories</option>
              {categories.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Store Filter */}
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value as StoreId | 'all')}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:border-indigo-600"
            >
              <option value="all">All Retailers</option>
              <option value="amazon">Amazon India</option>
              <option value="flipkart">Flipkart</option>
              <option value="croma">Croma</option>
              <option value="reliance-digital">Reliance Digital</option>
              <option value="tata-cliq">Tata CLiQ</option>
              <option value="myntra">Myntra</option>
            </select>

            {/* Price Filter */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:border-indigo-600"
            >
              <option value="all">All Price Ranges</option>
              <option value="under-30k">Under ?30,000</option>
              <option value="under-70k">?30,000 - ?70,000</option>
              <option value="above-70k">Above ?70,000</option>
            </select>

            {/* Min Discount Filter */}
            <select
              value={selectedDiscount}
              onChange={(e) => setSelectedDiscount(Number(e.target.value))}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:border-indigo-600"
            >
              <option value="0">Any Discount</option>
              <option value="5">5% OFF or higher</option>
              <option value="10">10% OFF or higher</option>
              <option value="20">20% OFF or higher</option>
            </select>
          </div>

          <span className="text-xs font-semibold text-slate-500">
            Showing <strong>{deals.length}</strong> deals
          </span>
        </div>

        {/* Section 1: Trending Deals */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Flame size={20} className="text-rose-500" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Trending Price Drops & Top Savings
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingDeals.map((prod) => {
              const bestOffer = [...prod.offers].sort((a, b) => a.price - b.price)[0];
              const highestOffer = [...prod.offers].sort((a, b) => b.price - a.price)[0];
              const savings = highestOffer.price - bestOffer.price;

              return (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300 p-4 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-square rounded-xl bg-slate-50 overflow-hidden mb-3 p-3">
                      <SafeImage
                        src={prod.thumbnail || prod.images[0]}
                        alt={prod.title}
                        aspectRatio="square"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-extrabold uppercase">
                        {bestOffer.discountPercentage}% OFF
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-bold text-indigo-600 uppercase">
                        {prod.brand}
                      </span>
                      <StoreBadge storeId={bestOffer.storeId} size="sm" />
                    </div>

                    <Link href={`/product/${prod.slug}`}>
                      <h3 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2 hover:text-indigo-600 transition mb-2">
                        {prod.title}
                      </h3>
                    </Link>

                    <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 mb-2">
                      <span className="text-[10px] font-bold uppercase text-emerald-700 block mb-0.5">
                        Lowest at {bestOffer.storeName}
                      </span>
                      <PriceTag
                        price={bestOffer.price}
                        originalPrice={bestOffer.originalPrice}
                        discountPercentage={bestOffer.discountPercentage}
                        isLowestPrice={true}
                        size="md"
                      />
                      {savings > 0 && (
                        <span className="text-[11px] text-emerald-700 font-bold block mt-1">
                          Save {formatINR(savings)} vs {highestOffer.storeName}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Link
                      href={`/product/${prod.slug}`}
                      className="py-2 px-3 rounded-xl border border-slate-200 hover:border-indigo-600 text-slate-700 font-bold text-xs text-center transition"
                    >
                      Compare
                    </Link>
                    <a
                      href={getDealUrl(bestOffer, prod.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center transition flex items-center justify-center gap-1"
                    >
                      <span>View Deal</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: Big Discounts (>= 15% OFF) */}
        <section className="space-y-4 pt-6">
          <div className="flex items-center gap-2">
            <Zap size={20} className="text-amber-500" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Big Discounts & Super Saver Deals
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bigDiscounts.map((prod) => {
              const bestOffer = [...prod.offers].sort((a, b) => a.price - b.price)[0];
              const highestOffer = [...prod.offers].sort((a, b) => b.price - a.price)[0];
              const savings = highestOffer.price - bestOffer.price;

              return (
                <div
                  key={`big-${prod.id}`}
                  className="bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300 p-4 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-square rounded-xl bg-slate-50 overflow-hidden mb-3 p-3">
                      <SafeImage
                        src={prod.thumbnail || prod.images[0]}
                        alt={prod.title}
                        aspectRatio="square"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold uppercase">
                        Super Value
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-bold text-indigo-600 uppercase">
                        {prod.brand}
                      </span>
                      <StoreBadge storeId={bestOffer.storeId} size="sm" />
                    </div>

                    <Link href={`/product/${prod.slug}`}>
                      <h3 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2 hover:text-indigo-600 transition mb-2">
                        {prod.title}
                      </h3>
                    </Link>

                    <div className="bg-emerald-50/60 rounded-xl p-2.5 border border-emerald-100 mb-2">
                      <span className="text-[10px] font-bold uppercase text-emerald-800 block mb-0.5">
                        Lowest at {bestOffer.storeName}
                      </span>
                      <PriceTag
                        price={bestOffer.price}
                        originalPrice={bestOffer.originalPrice}
                        discountPercentage={bestOffer.discountPercentage}
                        isLowestPrice={true}
                        size="md"
                      />
                      {savings > 0 && (
                        <span className="text-[11px] text-emerald-700 font-bold block mt-1">
                          Save {formatINR(savings)} vs {highestOffer.storeName}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Link
                      href={`/product/${prod.slug}`}
                      className="py-2 px-3 rounded-xl border border-slate-200 hover:border-indigo-600 text-slate-700 font-bold text-xs text-center transition"
                    >
                      Compare
                    </Link>
                    <a
                      href={getDealUrl(bestOffer, prod.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs text-center transition flex items-center justify-center gap-1"
                    >
                      <span>View Deal</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
