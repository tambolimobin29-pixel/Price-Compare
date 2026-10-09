'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import {
  Heart,
  Trash2,
  ExternalLink,
  ArrowRight,
  TrendingDown,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import { useWishlistCompare } from '@/context/WishlistCompareContext';
import { Product } from '@/types/product';
import { SafeImage } from '../common/SafeImage';
import { StoreBadge } from '../common/StoreBadge';
import { PriceTag, formatINR } from '../common/PriceTag';

interface WishlistPageViewProps {
  allProducts: Product[];
}

export const WishlistPageView: React.FC<WishlistPageViewProps> = ({
  allProducts,
}) => {
  const { wishlistIds, removeFromWishlist } = useWishlistCompare();

  const savedProducts = useMemo(() => {
    return allProducts.filter((p) => wishlistIds.includes(p.id));
  }, [allProducts, wishlistIds]);

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
                <Heart size={20} className="fill-rose-500" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                My Saved Wishlist
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Track price drops and real-time retailer movements for your favorite products
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 shadow-2xs self-start sm:self-center">
            {savedProducts.length} {savedProducts.length === 1 ? 'Product Saved' : 'Products Saved'}
          </span>
        </div>

        {/* Empty State */}
        {savedProducts.length === 0 ? (
          <div className="py-20 px-6 text-center max-w-md mx-auto bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
              <Heart size={32} className="stroke-1" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Your wishlist is empty
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Save products to track their prices and compare deals later.
            </p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition cursor-pointer"
            >
              <ShoppingBag size={14} />
              <span>Browse Products</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProducts.map((prod) => {
              const bestOffer = [...prod.offers].sort((a, b) => a.price - b.price)[0];
              const highestOffer = [...prod.offers].sort((a, b) => b.price - a.price)[0];
              const priceDrop = prod.maxSavings || (highestOffer.price - bestOffer.price);

              return (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4.5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Media with Remove button */}
                    <div className="relative aspect-square rounded-xl bg-slate-50 overflow-hidden mb-3 p-3">
                      <SafeImage
                        src={prod.thumbnail || prod.images[0]}
                        alt={prod.title}
                        aspectRatio="square"
                      />
                      <button
                        type="button"
                        onClick={() => removeFromWishlist(prod.id)}
                        className="absolute top-2.5 right-2.5 p-2 rounded-xl bg-white/95 text-slate-400 hover:text-rose-600 hover:bg-white border border-slate-200 shadow-xs transition"
                        title="Remove from Wishlist"
                        aria-label="Remove"
                      >
                        <Trash2 size={15} />
                      </button>

                      {/* Price Drop Indicator */}
                      {priceDrop > 0 && (
                        <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold flex items-center gap-1 shadow-xs">
                          <TrendingDown size={12} />
                          <span>Price dropped {formatINR(priceDrop)}</span>
                        </div>
                      )}
                    </div>

                    {/* Brand and Title */}
                    <span className="text-[10px] font-bold text-indigo-600 uppercase">
                      {prod.brand}
                    </span>
                    <Link href={`/product/${prod.slug}`}>
                      <h3 className="font-bold text-sm text-slate-900 line-clamp-2 hover:text-indigo-600 transition mb-3">
                        {prod.title}
                      </h3>
                    </Link>

                    {/* Price details */}
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 mb-3 space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase">
                        <span>Current Lowest</span>
                        <StoreBadge storeId={bestOffer.storeId} size="sm" />
                      </div>
                      <PriceTag
                        price={bestOffer.price}
                        originalPrice={bestOffer.originalPrice}
                        discountPercentage={bestOffer.discountPercentage}
                        isLowestPrice={true}
                        size="md"
                      />
                    </div>

                    {/* Stores available */}
                    <div className="text-xs text-slate-500 mb-3 flex items-center justify-between">
                      <span>Available in {prod.offers.length} stores</span>
                      <div className="flex -space-x-1">
                        {prod.offers.slice(0, 3).map((o) => (
                          <span
                            key={o.id}
                            className="w-4 h-4 rounded-full bg-slate-200 border-2 border-white text-[8px] flex items-center justify-center font-bold"
                          >
                            {o.storeName[0]}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                    <Link
                      href={`/product/${prod.slug}`}
                      className="py-2.5 px-3 rounded-xl border border-slate-200 hover:border-indigo-600 text-slate-700 font-bold text-xs text-center transition flex items-center justify-center gap-1"
                    >
                      <span>View Product</span>
                      <ArrowRight size={13} />
                    </Link>
                    <a
                      href={bestOffer.productUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs text-center transition flex items-center justify-center gap-1"
                    >
                      <span>Buy Now</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
