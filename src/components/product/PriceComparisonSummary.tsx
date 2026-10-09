import React from 'react';
import { Offer } from '@/types/product';
import { formatINR } from '../common/PriceTag';
import { StoreBadge } from '../common/StoreBadge';
import { Sparkles, TrendingDown, Clock } from 'lucide-react';

interface PriceComparisonSummaryProps {
  offers: Offer[];
  compact?: boolean;
  className?: string;
}

export const PriceComparisonSummary: React.FC<PriceComparisonSummaryProps> = ({
  offers,
  compact = false,
  className = '',
}) => {
  if (!offers || offers.length === 0) return null;

  const sortedOffers = [...offers].sort((a, b) => a.price - b.price);
  const lowestOffer = sortedOffers[0];
  const highestOffer = sortedOffers[sortedOffers.length - 1];
  const savings = highestOffer.price - lowestOffer.price;

  if (compact) {
    return (
      <div
        className={`flex items-center justify-between gap-2 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-xs ${className}`}
      >
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
          <span className="font-semibold text-emerald-950 truncate">
            Lowest at {lowestOffer.storeName}:
          </span>
          <span className="font-extrabold text-emerald-700">
            {formatINR(lowestOffer.price)}
          </span>
        </div>

        {savings > 0 && (
          <span className="font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md flex-shrink-0">
            Save {formatINR(savings)}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border border-emerald-200/90 bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/30 p-5 shadow-xs ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-emerald-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <Sparkles size={18} />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
              Best Deal Guaranteed
            </span>
            <h4 className="text-base font-bold text-slate-900">
              Lowest Price: {formatINR(lowestOffer.price)} at {lowestOffer.storeName}
            </h4>
          </div>
        </div>

        {savings > 0 && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-xs">
            <TrendingDown size={15} />
            <span>You save {formatINR(savings)} vs {highestOffer.storeName}</span>
          </div>
        )}
      </div>

      {/* Cross-store quick ladder */}
      <div className="mt-4 space-y-2">
        <span className="text-xs font-semibold text-slate-500 block">
          Price across {offers.length} verified stores:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {sortedOffers.map((offer, idx) => {
            const isLowest = idx === 0;
            const diff = offer.price - lowestOffer.price;

            return (
              <div
                key={offer.id}
                className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition ${
                  isLowest
                    ? 'bg-emerald-50 border-emerald-300 font-semibold'
                    : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <StoreBadge storeId={offer.storeId} size="sm" />
                </div>
                <div className="text-right">
                  <span
                    className={`block font-bold ${
                      isLowest ? 'text-emerald-700' : 'text-slate-900'
                    }`}
                  >
                    {formatINR(offer.price)}
                  </span>
                  {diff > 0 ? (
                    <span className="text-[10px] text-slate-400">
                      +{formatINR(diff)}
                    </span>
                  ) : (
                    <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
                      Cheapest
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
