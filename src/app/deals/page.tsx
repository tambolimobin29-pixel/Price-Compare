import React from 'react';
import { Metadata } from 'next';
import { productService } from '@/services/productService';
import { DealsPageView } from '@/components/deals/DealsPageView';

export const metadata: Metadata = {
  title: "Today's Best Deals & Price Drops Across Stores",
  description:
    'Discover verified price drops and highest savings across Amazon, Flipkart, Croma, and Reliance Digital.',
};

export default async function DealsPage() {
  const [products, categories] = await Promise.all([
    productService.getProducts(),
    productService.getCategories(),
  ]);

  return (
    <DealsPageView
      initialProducts={products}
      categories={categories}
    />
  );
}
