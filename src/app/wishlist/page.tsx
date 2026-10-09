import React from 'react';
import { Metadata } from 'next';
import { productService } from '@/services/productService';
import { WishlistPageView } from '@/components/wishlist/WishlistPageView';

export const metadata: Metadata = {
  title: 'My Saved Wishlist & Price Drop Tracker',
  description:
    'Monitor price drops and multi-store deal movements for your saved products.',
};

export default async function WishlistPage() {
  const products = await productService.getProducts();

  return <WishlistPageView allProducts={products} />;
}
