import React from "react";
import Link from "next/link";
import {
  Smartphone,
  Laptop,
  Headphones,
  Tv,
  Shirt,
  Sparkles,
  ArrowRight,
  TrendingDown,
  ShieldCheck,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { HeroSection } from "@/components/home/HeroSection";
import { PopularCategoriesSection } from "@/components/home/PopularCategoriesSection";
import { TrendingProductsSection } from "@/components/home/TrendingProductsSection";
import { ProductGrid } from "@/components/product/ProductGrid";
import { productService } from "@/services/productService";

export default async function Home() {
  const [featuredProducts, topDeals, products] = await Promise.all([
    productService.getFeaturedProducts(),
    productService.getTopDeals(),
    productService.getProducts(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section (Component 3) */}
      <HeroSection />

      {/* 2. Popular Categories Section (Component 4) */}
      <PopularCategoriesSection products={products} />

      {/* 3. Trending Products Section (Component 5) */}
      <TrendingProductsSection products={featuredProducts} />

      {/* 4. Top Price Drops & High Savings Deals */}
      <section className="py-16 bg-white border-y border-slate-200/80 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles size={13} />
                <span>Maximum Savings Today</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Biggest Price Differences
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Products where buying from the right store saves you up to ₹10,000
              </p>
            </div>
            <Link
              href="/deals"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-700"
            >
              <span>Explore All Deals</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <ProductGrid products={topDeals} />
        </div>
      </section>

      {/* 4. Why Compare with PricePilot */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            How It Works
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Built for Smart Online Shoppers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            The simplest, most honest way to ensure you never overpay at any checkout
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              Multi-Store Cross-Reference
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We monitor identical SKUs across Amazon, Flipkart, Croma, Reliance Digital, and more, matching specs and model numbers.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-lg">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              Spot the Lowest Price & Savings
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We calculate the exact price difference so you know immediately: Where is it cheapest, and how much are you saving?
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              Direct Official Merchant Links
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Click &quot;View Deal&quot; to land directly on the merchant&apos;s product page. No intermediary markups or delays.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

