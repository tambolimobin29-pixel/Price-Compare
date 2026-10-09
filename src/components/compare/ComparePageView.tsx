'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Scale,
  Plus,
  Trash2,
  X,
  ExternalLink,
  Check,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useWishlistCompare } from '@/context/WishlistCompareContext';
import { Product } from '@/types/product';
import { SafeImage } from '../common/SafeImage';
import { StoreBadge } from '../common/StoreBadge';
import { PriceTag, formatINR } from '../common/PriceTag';
import { RatingStars } from '../common/RatingStars';

interface ComparePageViewProps {
  allProducts: Product[];
}

export const ComparePageView: React.FC<ComparePageViewProps> = ({
  allProducts,
}) => {
  const { compareIds, removeFromCompare, toggleCompare, clearCompare } =
    useWishlistCompare();

  const [addModalOpen, setAddModalOpen] = useState(false);

  // If no products in compare, pre-select first 2 products as helpful defaults
  const activeProducts = useMemo(() => {
    if (compareIds.length > 0) {
      return allProducts.filter((p) => compareIds.includes(p.id));
    }
    return allProducts.slice(0, 2);
  }, [allProducts, compareIds]);

  // Aggregate all unique specification keys
  const specKeys = useMemo(() => {
    const keys = new Set<string>();
    activeProducts.forEach((p) => {
      if (p.specifications) {
        Object.keys(p.specifications).forEach((k) => keys.add(k));
      }
    });
    return Array.from(keys);
  }, [activeProducts]);

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                <Scale size={20} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Product Comparison Tool
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Objective side-by-side technical specs and cross-store pricing breakdown (Up to 4 products)
            </p>
          </div>

          <div className="flex items-center gap-3">
            {activeProducts.length < 4 && (
              <button
                type="button"
                onClick={() => setAddModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
              >
                <Plus size={15} />
                <span>Add Product ({activeProducts.length}/4)</span>
              </button>
            )}

            {activeProducts.length > 0 && (
              <button
                type="button"
                onClick={clearCompare}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-rose-600 font-semibold text-xs shadow-2xs transition cursor-pointer"
              >
                <RotateCcw size={13} />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>

        {/* Side-by-side Comparison Matrix */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <tbody>
              {/* Row 1: Product Header & Media */}
              <tr className="border-b border-slate-200">
                <td className="w-48 p-4 font-bold text-xs uppercase tracking-wider text-slate-400 bg-slate-50/50 align-top">
                  Product
                </td>
                {activeProducts.map((prod) => (
                  <td key={prod.id} className="p-5 align-top w-72">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => removeFromCompare(prod.id)}
                        className="absolute -top-2 -right-2 p-1.5 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition"
                        title="Remove"
                      >
                        <X size={15} />
                      </button>

                      <div className="w-32 h-32 mx-auto rounded-xl bg-slate-50 p-2 mb-3">
                        <SafeImage
                          src={prod.thumbnail || prod.images[0]}
                          alt={prod.title}
                          aspectRatio="square"
                        />
                      </div>

                      <span className="text-[10px] font-bold text-indigo-600 uppercase block text-center mb-1">
                        {prod.brand}
                      </span>
                      <Link href={`/product/${prod.slug}`}>
                        <h3 className="font-bold text-sm text-slate-900 hover:text-indigo-600 transition text-center line-clamp-2">
                          {prod.title}
                        </h3>
                      </Link>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Row 2: Customer Rating */}
              <tr className="border-b border-slate-100">
                <td className="p-4 font-bold text-xs text-slate-500 bg-slate-50/50">
                  Rating & Reviews
                </td>
                {activeProducts.map((prod) => (
                  <td key={prod.id} className="p-4">
                    <RatingStars
                      rating={prod.rating}
                      reviewCount={prod.reviewCount}
                      size="sm"
                    />
                  </td>
                ))}
              </tr>

              {/* Row 3: Lowest Price across stores */}
              <tr className="border-b border-slate-100 bg-emerald-50/20">
                <td className="p-4 font-bold text-xs text-emerald-800 bg-emerald-50/50">
                  Lowest Price
                </td>
                {activeProducts.map((prod) => {
                  const best = [...prod.offers].sort((a, b) => a.price - b.price)[0];
                  return (
                    <td key={prod.id} className="p-4">
                      <div className="space-y-1">
                        <PriceTag
                          price={best.price}
                          originalPrice={best.originalPrice}
                          discountPercentage={best.discountPercentage}
                          isLowestPrice={true}
                          size="lg"
                        />
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="text-[10px] text-slate-500">at</span>
                          <StoreBadge storeId={best.storeId} size="sm" />
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Row 4: Stores Compared */}
              <tr className="border-b border-slate-100">
                <td className="p-4 font-bold text-xs text-slate-500 bg-slate-50/50">
                  Retailer Coverage
                </td>
                {activeProducts.map((prod) => (
                  <td key={prod.id} className="p-4 text-xs">
                    <span className="font-bold text-slate-800 block mb-1">
                      {prod.offers.length} stores compared
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {prod.offers.map((o) => (
                        <StoreBadge key={o.id} storeId={o.storeId} size="sm" />
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Row 5: Action Link */}
              <tr className="border-b border-slate-200">
                <td className="p-4 font-bold text-xs text-slate-500 bg-slate-50/50">
                  Direct Buy
                </td>
                {activeProducts.map((prod) => {
                  const best = [...prod.offers].sort((a, b) => a.price - b.price)[0];
                  return (
                    <td key={prod.id} className="p-4">
                      <a
                        href={best.productUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs shadow-xs transition"
                      >
                        <span>View Deal on {best.storeName}</span>
                        <ExternalLink size={12} />
                      </a>
                    </td>
                  );
                })}
              </tr>

              {/* Technical Specifications Comparison Rows */}
              {specKeys.map((key) => {
                const values = activeProducts.map((p) => p.specifications[key] || '   ');
                const isDifferent = new Set(values).size > 1;

                return (
                  <tr
                    key={key}
                    className={`border-b border-slate-100 text-xs ${
                      isDifferent ? 'bg-amber-50/20' : ''
                    }`}
                  >
                    <td className="p-4 font-semibold text-slate-500 bg-slate-50/50">
                      {key}
                      {isDifferent && (
                        <span className="block text-[9px] text-amber-700 font-bold uppercase tracking-wider">
                          Differences noted
                        </span>
                      )}
                    </td>
                    {activeProducts.map((prod) => (
                      <td key={prod.id} className="p-4 font-medium text-slate-800">
                        {prod.specifications[key] || (
                          <span className="text-slate-300">N/A</span>
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Add Product Modal */}
        {addModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[80vh] flex flex-col">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <h3 className="font-extrabold text-base text-slate-900">
                  Select Product to Compare
                </h3>
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-2 overflow-y-auto flex-1 pr-1">
                {allProducts
                  .filter((p) => !activeProducts.some((a) => a.id === p.id))
                  .map((prod) => {
                    const best = [...prod.offers].sort((a, b) => a.price - b.price)[0];
                    return (
                      <button
                        key={prod.id}
                        type="button"
                        onClick={() => {
                          toggleCompare(prod.id);
                          setAddModalOpen(false);
                        }}
                        className="w-full text-left p-3 rounded-2xl border border-slate-200 hover:border-indigo-600 hover:bg-indigo-50/40 transition flex items-center gap-3 cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-xl bg-slate-50 p-1 flex-shrink-0">
                          <SafeImage
                            src={prod.thumbnail || prod.images[0]}
                            alt={prod.title}
                            aspectRatio="square"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold text-indigo-600 uppercase block">
                            {prod.brand}
                          </span>
                          <span className="text-xs font-bold text-slate-900 truncate block">
                            {prod.title}
                          </span>
                          <span className="text-xs font-extrabold text-emerald-600">
                            {formatINR(best.price)}
                          </span>
                        </div>
                        <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                          <Plus size={16} />
                        </span>
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
