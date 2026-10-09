import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { productService } from '@/services/productService';
import { SearchCatalogView } from '@/components/search/SearchCatalogView';
import { ProductGridSkeleton } from '@/components/feedback/LoadingSkeleton';

export const metadata: Metadata = {
  title: 'Search & Compare Products Across Stores',
  description:
    'Search and compare real-time prices across Amazon, Flipkart, Croma, Reliance Digital, and more.',
};

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    brands?: string;
    sort?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || '';
  const category = resolvedParams.category || undefined;

  const [products, categories, brands] = await Promise.all([
    productService.getProducts(),
    productService.getCategories(),
    productService.getBrands(),
  ]);

  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-12">
          <ProductGridSkeleton count={8} />
        </div>
      }
    >
      <SearchCatalogView
        initialProducts={products}
        categories={categories}
        brands={brands}
        initialQuery={query}
        initialCategory={category}
      />
    </Suspense>
  );
}
