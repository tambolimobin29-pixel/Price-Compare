import React from 'react';
import { Metadata } from 'next';
import { productService } from '@/services/productService';
import { AdminDashboardView } from '@/components/admin/AdminDashboardView';

export const metadata: Metadata = {
  title: 'Operations Admin Console | PricePilot',
  description: 'Manage products, retailer integrations, and price comparison feeds.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const products = await productService.getProducts();

  return <AdminDashboardView initialProducts={products} />;
}
