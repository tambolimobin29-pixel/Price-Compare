'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ArrowRight,
  TrendingDown,
  Percent,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { SearchBar } from '../search/SearchBar';
import { SafeImage } from '../common/SafeImage';
import { formatINR } from '../common/PriceTag';
import { STORE_REGISTRY } from '@/services/storeMeta';

export const HeroSection: React.FC = () => {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 border-b border-slate-200/70">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT: Core Message & Search */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Small badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold tracking-wide shadow-2xs">
              <Sparkles size={14} className="text-indigo-600 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Smart Shopping Starts Here</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Compare Prices.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800">
                Shop Smarter.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Compare prices from multiple online stores and find the deal that fits your budget.
            </p>

            {/* Main Search Bar */}
            <div className="max-w-xl mx-auto lg:mx-0 shadow-lg shadow-indigo-500/5 rounded-2xl">
              <SearchBar
                size="lg"
                placeholder="Search products, brands and categories..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                href="/search"
                className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition shadow-md shadow-indigo-600/20 flex items-center gap-2 group cursor-pointer"
              >
                <span>Start Comparing</span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="/deals"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm transition shadow-2xs flex items-center gap-2 cursor-pointer"
              >
                <Percent size={15} className="text-rose-500" />
                <span>Explore Deals</span>
              </Link>
            </div>

            {/* Store logos trust strip */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5 text-slate-600">
                <CheckCircle2 size={15} className="text-emerald-500" /> Amazon
              </span>
              <span>   </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <CheckCircle2 size={15} className="text-emerald-500" /> Flipkart
              </span>
              <span>   </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <CheckCircle2 size={15} className="text-emerald-500" /> Croma
              </span>
              <span>   </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <CheckCircle2 size={15} className="text-emerald-500" /> Reliance
              </span>
            </div>
          </div>

          {/* RIGHT: Visually Impressive Composition with Floating Product Cards */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Background circular soft glow */}
            <div className="w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-indigo-100/80 via-purple-100/50 to-pink-100/40 absolute -z-10 animate-pulse" style={{ animationDuration: '4s' }} />

            <div className="relative w-full max-w-md h-[430px] sm:h-[480px]">
              {/* Product 1: Smartphone (Main Central Hero Card) */}
              <div className="absolute top-10 left-4 sm:left-8 w-60 sm:w-68 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 p-4 shadow-xl shadow-slate-900/10 z-20 hover:scale-102 transition-transform duration-300">
                <div className="relative h-32 rounded-xl bg-slate-50 overflow-hidden mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=400&q=80"
                    alt="iPhone 16 Pro"
                    className="w-full h-full object-contain p-2"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold uppercase tracking-wider">
                    Lowest Price
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-indigo-600">Apple</span>
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    iPhone 16 Pro (128 GB)
                  </h4>
                  {/* Store Comparison Ladder */}
                  <div className="grid grid-cols-2 gap-1.5 pt-1.5 text-[11px]">
                    <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-slate-400 block text-[9px]">Amazon</span>
                      <span className="font-semibold text-slate-700">?1,19,900</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
                      <span className="text-emerald-700 font-bold block text-[9px]">Croma (Lowest)</span>
                      <span className="font-extrabold text-emerald-800">?1,17,900</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product 2: Sony Headphones (Floating Upper Right) */}
              <div className="absolute -top-3 right-0 sm:-right-4 w-48 sm:w-54 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 p-3 shadow-lg z-30 animate-bounce" style={{ animationDuration: '5s' }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-12 h-12 rounded-lg bg-slate-50 p-1 flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80"
                      alt="Sony WH-1000XM5"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">Sony ANC</span>
                    <h5 className="text-[11px] font-bold text-slate-800 truncate">WH-1000XM5</h5>
                    <span className="text-xs font-black text-emerald-600 block">
                      ?26,990 <span className="text-[9px] text-slate-400 line-through">?34,990</span>
                    </span>
                  </div>
                </div>
                <div className="mt-1.5 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                  <span className="text-slate-500 font-medium">Flipkart: ?28,490</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">Save ?1,500</span>
                </div>
              </div>

              {/* Product 3: Laptop (Floating Bottom Right) */}
              <div className="absolute bottom-6 right-2 sm:right-6 w-52 sm:w-60 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 p-3 shadow-lg z-25 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-2.5">
                  <div className="w-12 h-12 rounded-lg bg-slate-50 p-1 flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=200&q=80"
                      alt="MacBook Air M3"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">Apple M3</span>
                    <h5 className="text-[11px] font-bold text-slate-800 truncate">MacBook Air 16GB</h5>
                    <span className="text-xs font-black text-emerald-600 block">?1,21,900</span>
                  </div>
                </div>
                <div className="mt-1.5 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400">Save ?6,000</span>
                  <span className="font-bold text-indigo-600">Reliance Digital</span>
                </div>
              </div>

              {/* Floating Comparison Badge Pill */}
              <div className="absolute bottom-2 left-6 z-30 px-3.5 py-2 rounded-2xl bg-slate-900 text-white text-xs font-bold shadow-xl flex items-center gap-2 animate-pulse" style={{ animationDuration: '3s' }}>
                <TrendingDown size={16} className="text-emerald-400" />
                <span>Real-Time Store Sync: ?8,000+ Max Savings</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
