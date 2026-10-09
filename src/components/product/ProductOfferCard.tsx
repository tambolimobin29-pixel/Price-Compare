import React from 'react';
import { ExternalLink, Truck, ShieldCheck, Clock, CheckCircle } from 'lucide-react';
import { Offer } from '@/types/product';
import { getDealUrl } from '@/services/dealUrl';
import { StoreBadge } from '../common/StoreBadge';
import { PriceTag, formatINR } from '../common/PriceTag';

interface ProductOfferCardProps {
  offer: Offer;
  isLowestPrice?: boolean;
  className?: string;
  compact?: boolean;
}

export const ProductOfferCard: React.FC<ProductOfferCardProps> = ({
  offer,
  isLowestPrice = false,
  className = '',
  compact = false,
}) => {
  const isCheapest = isLowestPrice || offer.isLowestPrice;

  return (
    <div
      className={`relative rounded-2xl border transition-all duration-200 p-4.5 flex flex-col justify-between ${
        isCheapest
          ? 'bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/30 border-emerald-300 shadow-sm'
          : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-md'
      } ${className}`}
    >
      {/* Top Banner if Lowest Available Price */}
      {isCheapest && (
        <div className="absolute -top-3 left-4 px-3 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-xs flex items-center gap-1">
          <CheckCircle size={11} />
          <span>Lowest Available Price</span>
        </div>
      )}

      {/* Header: Store badge & availability */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <StoreBadge storeId={offer.storeId} size="md" showDomain={true} />
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
              offer.availability === 'in_stock'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}
          >
            {offer.availability === 'in_stock' ? 'In Stock' : 'Limited Stock'}
          </span>
        </div>

        {/* Pricing */}
        <div className="mb-3">
          <PriceTag
            price={offer.price}
            originalPrice={offer.originalPrice}
            discountPercentage={offer.discountPercentage}
            isLowestPrice={isCheapest}
            size="lg"
          />
          {offer.priceDifferenceFromLowest && offer.priceDifferenceFromLowest > 0 ? (
            <span className="text-[11px] text-slate-400 block mt-0.5">
              +{formatINR(offer.priceDifferenceFromLowest)} vs lowest store
            </span>
          ) : null}
        </div>

        {/* Seller and Delivery Info */}
        <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100 mb-4">
          <div className="flex items-center gap-1.5">
            <Truck size={13} className="text-slate-400 flex-shrink-0" />
            <span className="truncate">{offer.deliveryInfo}</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="truncate">Seller: {offer.seller}</span>
            <span className="flex items-center gap-1 flex-shrink-0">
              <Clock size={11} />
              {offer.lastUpdated}
            </span>
          </div>
        </div>
      </div>

      {/* View Deal Button */}
      <a
        href={getDealUrl(offer)}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer ${
          isCheapest
            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
            : 'bg-slate-900 hover:bg-indigo-600 text-white'
        }`}
        title={`View Deal on ${offer.storeName}`}
      >
        <span>View Deal</span>
        <ExternalLink size={13} />
      </a>
    </div>
  );
};
