import React from 'react';
import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';
import { ProductGridSkeleton } from '../feedback/LoadingSkeleton';
import { EmptyState } from '../feedback/EmptyState';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  onResetFilters?: () => void;
  className?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading = false,
  emptyTitle,
  emptyDescription,
  onResetFilters,
  className = '',
}) => {
  if (isLoading) {
    return <ProductGridSkeleton count={8} />;
  }

  if (!products || products.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        onReset={onResetFilters}
      />
    );
  }

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
