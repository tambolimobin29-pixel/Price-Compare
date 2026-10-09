import React from 'react';
import { Metadata } from 'next';
import { productService } from '@/services/productService';
import { ComparePageView } from '@/components/compare/ComparePageView';

export const metadata: Metadata = {
  title: 'Side-by-Side Product Comparison Tool',
  description:
    'Compare technical specifications, prices, and merchant offers side-by-side.',
};

export default async function ComparePage() {
  const products = await productService.getProducts();

  return <ComparePageView allProducts={products} />;
}
