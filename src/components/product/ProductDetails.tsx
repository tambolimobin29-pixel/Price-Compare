'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  Truck,
  Sparkles,
  Heart,
  Scale,
  MessageSquare,
  History,
  Layers,
  Info,
} from 'lucide-react';
import { Product } from '@/types/product';
import { SafeImage } from '../common/SafeImage';
import { PriceTag, formatINR } from '../common/PriceTag';
import { RatingStars } from '../common/RatingStars';
import { StoreBadge } from '../common/StoreBadge';
import { WishlistButton } from '../common/WishlistButton';
import { PriceComparisonSummary } from './PriceComparisonSummary';
import { StoreOfferTable } from './StoreOfferTable';
import { PriceHistoryChart } from './PriceHistoryChart';
import { useWishlistCompare } from '@/context/WishlistCompareContext';

interface ProductDetailsProps {
  product: Product;
}

type TabKey = 'overview' | 'specs' | 'comparison' | 'history' | 'reviews';

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(
    product.images[0] || product.thumbnail
  );
  const [activeTab, setActiveTab] = useState<TabKey>('overview');

  const { isInWishlist, isInCompare, toggleWishlist, toggleCompare } =
    useWishlistCompare();

  const sortedOffers = [...product.offers].sort((a, b) => a.price - b.price);
  const bestOffer = sortedOffers[0];
  const highestOffer = sortedOffers[sortedOffers.length - 1];
  const maxSavings = highestOffer.price - bestOffer.price;

  const tabs: { key: TabKey; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
    { key: 'overview', label: 'Overview', icon: Info },
    { key: 'comparison', label: 'Price Comparison', icon: Scale },
    { key: 'specs', label: 'Specifications', icon: Layers },
    { key: 'history', label: 'Price History', icon: History },
    { key: 'reviews', label: 'Reviews', icon: MessageSquare },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-12">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap"
      >
        <Link href="/" className="hover:text-indigo-600 transition">
          Home
        </Link>
        <ChevronRight size={14} className="text-slate-400" />
        <Link
          href={`/search?category=${encodeURIComponent(product.category)}`}
          className="hover:text-indigo-600 transition"
        >
          {product.category}
        </Link>
        <ChevronRight size={14} className="text-slate-400" />
        <Link
          href={`/search?brands=${encodeURIComponent(product.brand)}`}
          className="hover:text-indigo-600 transition font-medium text-slate-700"
        >
          {product.brand}
        </Link>
        <ChevronRight size={14} className="text-slate-400" />
        <span className="text-slate-400 truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main Top Layout: Image Gallery (Left) & Key Purchase Card (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-10">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex items-center justify-center">
            <SafeImage
              src={selectedImage}
              alt={product.title}
              aspectRatio="square"
              className="max-h-96"
            />
            {maxSavings > 0 && (
              <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-emerald-600 text-white font-extrabold text-xs shadow-md">
                Save up to {formatINR(maxSavings)}
              </div>
            )}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
              <WishlistButton productId={product.id} size="md" />
            </div>
          </div>

          {/* Thumbnail list */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`w-18 h-18 rounded-xl border-2 overflow-hidden bg-white p-1 transition flex-shrink-0 cursor-pointer ${
                    selectedImage === img
                      ? 'border-indigo-600 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <SafeImage
                    src={img}
                    alt={`${product.title} thumb ${idx + 1}`}
                    aspectRatio="square"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Title, Quick Comparison Summary & Instant CTAs */}
        <div className="lg:col-span-7 space-y-5">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="px-3 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                {product.brand}
              </span>
              <RatingStars
                rating={product.rating}
                reviewCount={product.reviewCount}
                size="md"
              />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug mb-3">
              {product.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Lowest Price Banner Card */}
          <PriceComparisonSummary offers={product.offers} />

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href={bestOffer.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Go to Deal at {bestOffer.storeName} ({formatINR(bestOffer.price)})</span>
              <ExternalLink size={16} />
            </a>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`flex-1 sm:flex-initial p-3.5 rounded-2xl border transition flex items-center justify-center gap-1.5 text-xs font-bold ${
                  isInWishlist(product.id)
                    ? 'bg-rose-50 text-rose-600 border-rose-200'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-rose-50/40'
                }`}
                title="Add to Wishlist"
              >
                <Heart size={16} className={isInWishlist(product.id) ? 'fill-rose-500' : ''} />
                <span className="sm:hidden">Wishlist</span>
              </button>

              <button
                type="button"
                onClick={() => toggleCompare(product.id)}
                className={`flex-1 sm:flex-initial p-3.5 rounded-2xl border transition flex items-center justify-center gap-1.5 text-xs font-bold ${
                  isInCompare(product.id)
                    ? 'bg-indigo-50 text-indigo-600 border-indigo-200'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-indigo-50/40'
                }`}
                title="Compare side-by-side"
              >
                <Scale size={16} />
                <span className="sm:hidden">Compare</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation Header */}
      <div className="border-b border-slate-200 mb-8 sticky top-18 bg-white/95 backdrop-blur-md z-30 pt-2">
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-1 text-xs sm:text-sm font-bold">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 py-3 px-3.5 sm:px-5 border-b-2 transition whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Panels */}
      <div className="space-y-8">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            {/* Highlights */}
            {product.highlights && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
                <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
                  <Sparkles size={18} className="text-indigo-600" />
                  <span>Key Highlights & Features</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
                  {product.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <CheckCircle size={15} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Multi-Store Table Preview */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
              <h3 className="font-bold text-slate-900 text-base mb-2">Compare Prices Across Retailers</h3>
              <p className="text-xs text-slate-500 mb-4">Live comparison matrix showing genuine delivery and seller data</p>
              <StoreOfferTable offers={product.offers} />
            </div>
          </div>
        )}

        {/* TAB 2: PRICE COMPARISON */}
        {activeTab === 'comparison' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
              <h3 className="font-bold text-slate-900 text-base mb-1">
                Where Can I Buy This at the Lowest Price?
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                Every &apos;View Deal&apos; button redirects directly to the authorized merchant product page.
              </p>
              <StoreOfferTable offers={product.offers} />

              <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-500 flex items-start gap-2">
                <ShieldCheck size={16} className="text-slate-400 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Notice:</strong> Prices and availability may change. Verify the final price on the retailer&apos;s website before purchasing.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SPECIFICATIONS */}
        {activeTab === 'specs' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs animate-in fade-in duration-150">
            <h3 className="font-bold text-slate-900 text-base mb-4">Technical Specifications</h3>
            <div className="divide-y divide-slate-100 text-xs">
              {Object.entries(product.specifications).map(([key, val]) => (
                <div key={key} className="py-3.5 flex justify-between gap-4">
                  <span className="text-slate-500 font-semibold w-1/3">{key}</span>
                  <span className="text-slate-900 font-bold text-right flex-1">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PRICE HISTORY */}
        {activeTab === 'history' && (
          <div className="animate-in fade-in duration-150">
            <PriceHistoryChart
              history={product.priceHistory}
              currentPrice={bestOffer.price}
            />
          </div>
        )}

        {/* TAB 5: REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs animate-in fade-in duration-150 space-y-6">
            <h3 className="font-bold text-slate-900 text-base">Customer Reviews & Ratings</h3>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-6 border-b border-slate-100">
              <div className="md:col-span-4 text-center md:text-left">
                <span className="text-5xl font-black text-slate-900 block leading-none mb-2">
                  {product.rating.toFixed(1)}
                </span>
                <RatingStars rating={product.rating} size="md" />
                <span className="text-xs text-slate-500 block mt-1.5">
                  Over {product.reviewCount} verified consumer ratings
                </span>
              </div>
              <div className="md:col-span-8 space-y-2 text-xs">
                {[
                  { star: 5, pct: '82%' },
                  { star: 4, pct: '12%' },
                  { star: 3, pct: '4%' },
                  { star: 2, pct: '1%' },
                  { star: 1, pct: '1%' },
                ].map((row) => (
                  <div key={row.star} className="flex items-center gap-3">
                    <span className="w-8 font-semibold text-slate-600">{row.star}?</span>
                    <div className="flex-1 h-2.5 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: row.pct }} />
                    </div>
                    <span className="w-10 text-right text-slate-400 text-xs font-semibold">{row.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MOBILE STICKY BOTTOM ACTION BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3.5 shadow-2xl flex items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Lowest at {bestOffer.storeName}
          </span>
          <span className="text-base font-extrabold text-emerald-600">
            {formatINR(bestOffer.price)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('comparison')}
            className="py-2.5 px-3.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs"
          >
            Compare
          </button>
          <a
            href={bestOffer.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-4 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center gap-1 shadow-md shadow-indigo-600/20"
          >
            <span>View Deal</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
};
