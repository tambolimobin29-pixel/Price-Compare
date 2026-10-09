'use client';

import React from 'react';
import Link from 'next/link';
import {
  ExternalLink,
  ArrowRight,
  Truck,
  Scale,
  Heart,
  Check,
  Sparkles,
} from 'lucide-react';
import { Product } from '@/types/product';
import { getDealUrl } from '@/services/dealUrl';
import { SafeImage } from '../common/SafeImage';
import { PriceTag, formatINR } from '../common/PriceTag';
import { RatingStars } from '../common/RatingStars';
import { StoreBadge } from '../common/StoreBadge';
import { useWishlistCompare } from '@/context/WishlistCompareContext';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = '',
}) => {
  const { isInWishlist, isInCompare, toggleWishlist, toggleCompare } =
    useWishlistCompare();

  const isFavorited = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  // Sort offers by price ascending
  const sortedOffers = [...product.offers].sort((a, b) => a.price - b.price);
  const bestOffer = sortedOffers[0];
  const highestOffer = sortedOffers[sortedOffers.length - 1];
  const savings = highestOffer ? highestOffer.price - bestOffer.price : 0;

  return (
    <div
      className={`group relative bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 ${className}`}
    >
      {/* Top Media & Floating Action Buttons */}
      <div className="relative p-3.5 pb-0">
        <Link
          href={`/product/${product.slug}`}
          className="block relative rounded-xl overflow-hidden bg-slate-50 focus:outline-none"
        >
          <SafeImage
            src={product.thumbnail || product.images[0]}
            alt={product.title}
            aspectRatio="square"
            className="group-hover:scale-106 transition-transform duration-500 ease-out"
          />

          {/* LOWEST PRICE Badge */}
          <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
            <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold tracking-wider uppercase shadow-xs">
              Lowest Price
            </span>
            {savings > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-xs text-emerald-800 text-[10px] font-bold border border-emerald-200 shadow-2xs">
                Save {formatINR(savings)}
              </span>
            )}
          </div>
        </Link>

        {/* Quick Action Buttons (Wishlist & Compare) */}
        <div className="absolute top-5 right-5 z-20 flex flex-col gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {/* Wishlist Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
            className={`p-2 rounded-xl transition shadow-md border ${
              isFavorited
                ? 'bg-rose-50 text-rose-600 border-rose-200'
                : 'bg-white/95 text-slate-500 hover:text-rose-600 hover:bg-white border-slate-200'
            }`}
            title={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-label="Wishlist"
          >
            <Heart size={15} className={isFavorited ? 'fill-rose-500' : ''} />
          </button>

          {/* Compare Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleCompare(product.id);
            }}
            className={`p-2 rounded-xl transition shadow-md border ${
              isCompared
                ? 'bg-indigo-50 text-indigo-600 border-indigo-200'
                : 'bg-white/95 text-slate-500 hover:text-indigo-600 hover:bg-white border-slate-200'
            }`}
            title={isCompared ? 'Remove from comparison' : 'Compare product'}
            aria-label="Compare"
          >
            <Scale size={15} />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between gap-2 mb-1.5 text-xs">
            <span className="font-bold text-indigo-600 tracking-wider uppercase text-[10px]">
              {product.brand}
            </span>
            <RatingStars
              rating={product.rating}
              reviewCount={product.reviewCount}
              size="sm"
            />
          </div>

          {/* Product Title */}
          <Link
            href={`/product/${product.slug}`}
            className="block group-hover:text-indigo-600 transition-colors focus:outline-none"
          >
            <h3
              className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug mb-2"
              title={product.title}
            >
              {product.title}
            </h3>
          </Link>
        </div>

        <div>
          {/* Price Box */}
          <div className="bg-slate-50/90 rounded-xl p-3 border border-slate-100 mb-3">
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                From
              </span>
              <StoreBadge storeId={bestOffer.storeId} size="sm" />
            </div>

            <PriceTag
              price={bestOffer.price}
              originalPrice={bestOffer.originalPrice}
              discountPercentage={bestOffer.discountPercentage}
              isLowestPrice={true}
              size="lg"
            />

            {/* Delivery snippet */}
            {bestOffer.deliveryInfo && (
              <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1.5 truncate">
                <Truck size={13} className="text-slate-400 flex-shrink-0" />
                <span className="truncate">{bestOffer.deliveryInfo}</span>
              </div>
            )}
          </div>

          {/* Number of Stores Compared */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-3 px-1">
            <span className="font-semibold text-slate-700">
              Compare prices from {product.offers.length} stores
            </span>
            <div className="flex -space-x-1 overflow-hidden">
              {product.offers.slice(0, 4).map((off) => (
                <span
                  key={off.id}
                  className="inline-block w-4.5 h-4.5 rounded-full border-2 border-white bg-slate-200 text-[8px] flex items-center justify-center font-bold text-slate-700 shadow-2xs"
                  title={`${off.storeName}: ${formatINR(off.price)}`}
                >
                  {off.storeName.charAt(0)}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons: Compare & View Deal */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/product/${product.slug}`}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 hover:border-indigo-600 bg-white hover:bg-indigo-50/50 text-slate-800 hover:text-indigo-600 font-bold text-xs transition flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Compare</span>
              <ArrowRight size={13} />
            </Link>

            <a
              href={getDealUrl(bestOffer, product.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              title={`View Deal on ${bestOffer.storeName}`}
            >
              <span>View Deal</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
