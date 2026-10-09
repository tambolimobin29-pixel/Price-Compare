import React from 'react';
import { ExternalLink, CheckCircle2, Truck, ShieldCheck, Tag } from 'lucide-react';
import { Offer } from '@/types/product';
import { getDealUrl } from '@/services/dealUrl';
import { StoreBadge } from '../common/StoreBadge';
import { formatINR } from '../common/PriceTag';

interface StoreOfferTableProps {
  offers: Offer[];
  productTitle?: string;
  className?: string;
}

export const StoreOfferTable: React.FC<StoreOfferTableProps> = ({
  offers,
  productTitle,
  className = '',
}) => {
  const sortedOffers = [...offers].sort((a, b) => a.price - b.price);
  const lowestPrice = sortedOffers[0]?.price || 0;

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            <th className="py-3 px-4 rounded-l-xl">Retail Store</th>
            <th className="py-3 px-4">Seller & Rating</th>
            <th className="py-3 px-4">Delivery & Perks</th>
            <th className="py-3 px-4">Listed Price</th>
            <th className="py-3 px-4 text-right rounded-r-xl">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm">
          {sortedOffers.map((offer, idx) => {
            const isLowest = idx === 0;
            const diff = offer.price - lowestPrice;

            return (
              <tr
                key={offer.id}
                className={`transition-colors ${
                  isLowest
                    ? 'bg-emerald-50/50 hover:bg-emerald-50'
                    : 'hover:bg-slate-50/80'
                }`}
              >
                {/* Store Name & Badge */}
                <td className="py-4 px-4 align-middle">
                  <div className="flex flex-col gap-1">
                    <StoreBadge storeId={offer.storeId} size="md" showDomain={true} />
                    {isLowest && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 mt-1">
                        <CheckCircle2 size={13} className="text-emerald-600" />
                        Lowest Price
                      </span>
                    )}
                  </div>
                </td>

                {/* Seller & Rating */}
                <td className="py-4 px-4 align-middle">
                  <div className="text-xs">
                    <span className="font-semibold text-slate-800 block">
                      {offer.seller}
                    </span>
                    {offer.sellerRating && (
                      <span className="text-slate-500 text-[11px]">
                        ★ {offer.sellerRating} / 5 seller score
                      </span>
                    )}
                  </div>
                </td>

                {/* Delivery Information */}
                <td className="py-4 px-4 align-middle">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-slate-700">
                      <Truck size={14} className="text-slate-400 flex-shrink-0" />
                      <span>{offer.deliveryInfo}</span>
                    </div>
                    {offer.specialOfferBadge && (
                      <div className="flex items-center gap-1 text-[11px] font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md w-fit">
                        <Tag size={11} />
                        <span>{offer.specialOfferBadge}</span>
                      </div>
                    )}
                  </div>
                </td>

                {/* Price and Comparison */}
                <td className="py-4 px-4 align-middle">
                  <div className="space-y-0.5">
                    <div className="flex items-baseline gap-2">
                      <span
                        className={`text-lg font-extrabold ${
                          isLowest ? 'text-emerald-700' : 'text-slate-900'
                        }`}
                      >
                        {formatINR(offer.price)}
                      </span>
                      {offer.originalPrice > offer.price && (
                        <span className="text-xs text-slate-400 line-through">
                          {formatINR(offer.originalPrice)}
                        </span>
                      )}
                    </div>
                    {diff > 0 ? (
                      <span className="text-[11px] text-slate-400 font-medium block">
                        +{formatINR(diff)} higher than {sortedOffers[0].storeName}
                      </span>
                    ) : (
                      <span className="text-[11px] text-emerald-600 font-bold block">
                        Best price available
                      </span>
                    )}
                  </div>
                </td>

                {/* Buy Button */}
                <td className="py-4 px-4 align-middle text-right">
                  <a
                    href={getDealUrl(offer, productTitle)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs transition shadow-xs cursor-pointer ${
                      isLowest
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-slate-900 hover:bg-indigo-600 text-white'
                    }`}
                  >
                    <span>View Deal</span>
                    <ExternalLink size={13} />
                  </a>
                  <span className="block text-[10px] text-slate-400 mt-1">
                    Opens {offer.storeName}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
