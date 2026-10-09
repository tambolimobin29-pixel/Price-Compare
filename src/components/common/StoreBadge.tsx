import React from 'react';
import { StoreId } from '@/types/product';
import { getStoreMeta } from '@/services/storeMeta';

interface StoreBadgeProps {
  storeId: StoreId;
  size?: 'sm' | 'md' | 'lg';
  showDomain?: boolean;
  className?: string;
}

export const StoreBadge: React.FC<StoreBadgeProps> = ({
  storeId,
  size = 'md',
  showDomain = false,
  className = '',
}) => {
  const meta = getStoreMeta(storeId);

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold',
    lg: 'text-sm px-3.5 py-1.5 font-bold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border transition-colors ${meta.badgeBg} ${meta.badgeText} ${meta.badgeBorder} ${sizeClasses[size]} ${className}`}
      title={`${meta.name} (${meta.domain})`}
    >
      <span
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: meta.primaryColor }}
        aria-hidden="true"
      />
      <span>{meta.shortName}</span>
      {showDomain && (
        <span className="opacity-60 text-[10px] font-normal">
          · {meta.domain}
        </span>
      )}
    </span>
  );
};
