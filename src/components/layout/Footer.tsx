import React from 'react';
import Link from 'next/link';
import {
  TrendingDown,
  ShieldCheck,
  Globe,
  Share2,
  MessageCircle,
  Mail,
  ExternalLink,
  Heart,
  Scale,
  Percent,
} from 'lucide-react';
import { StoreBadge } from '../common/StoreBadge';
import { StoreId } from '@/types/product';

export const Footer: React.FC = () => {
  const stores: StoreId[] = [
    'amazon',
    'flipkart',
    'croma',
    'reliance-digital',
    'tata-cliq',
    'myntra',
    'ajio',
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pb-12 border-b border-slate-800">
          {/* Col 1 & 2: Brand Story */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white">
                <TrendingDown size={20} className="stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-tight text-white">
                  Price<span className="text-indigo-400">Pulse</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-500 tracking-wider">
                  Compare. Save. Shop.
                </span>
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              India&apos;s intelligent multi-store price discovery engine. We track and verify product prices across Amazon, Flipkart, Croma, and Reliance Digital so you always get the lowest price.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://PricePilot.in"
                className="w-8 h-8 rounded-xl bg-slate-900 hover:bg-indigo-600 text-slate-400 hover:text-white flex items-center justify-center transition"
                aria-label="Website"
              >
                <Globe size={15} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-slate-900 hover:bg-indigo-600 text-slate-400 hover:text-white flex items-center justify-center transition"
                aria-label="Share"
              >
                <Share2 size={15} />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-slate-900 hover:bg-indigo-600 text-slate-400 hover:text-white flex items-center justify-center transition"
                aria-label="Community"
              >
                <MessageCircle size={15} />
              </a>
              <a
                href="mailto:contact@PricePilot.in"
                className="w-8 h-8 rounded-xl bg-slate-900 hover:bg-indigo-600 text-slate-400 hover:text-white flex items-center justify-center transition"
                aria-label="Email"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* Col 3: Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/search?category=Mobiles%20%26%20Tablets" className="hover:text-indigo-400 transition">
                  Smartphones
                </Link>
              </li>
              <li>
                <Link href="/search?category=Laptops%20%26%20Computers" className="hover:text-indigo-400 transition">
                  Laptops & MacBooks
                </Link>
              </li>
              <li>
                <Link href="/search?category=Audio%20%26%20Wearables" className="hover:text-indigo-400 transition">
                  Headphones & Audio
                </Link>
              </li>
              <li>
                <Link href="/search?category=Home%20%26%20Kitchen" className="hover:text-indigo-400 transition">
                  Smart 4K TVs
                </Link>
              </li>
              <li>
                <Link href="/search?category=Fashion%20%26%20Footwear" className="hover:text-indigo-400 transition">
                  Fashion & Footwear
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: For Shoppers */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              For Shoppers
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/deals" className="hover:text-indigo-400 transition">
                  Today&apos;s Best Deals
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-indigo-400 transition">
                  Compare Specs Tool
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-indigo-400 transition">
                  Price Drop Wishlist
                </Link>
              </li>
              <li>
                <Link href="/search?sort=highest_discount" className="hover:text-indigo-400 transition">
                  Top Savings Feed
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-indigo-400 transition">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Popular Searches */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Popular Searches
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/search?q=iPhone+16" className="hover:text-indigo-400 transition">
                  iPhone 16 Pro Deals
                </Link>
              </li>
              <li>
                <Link href="/search?q=Galaxy+S24" className="hover:text-indigo-400 transition">
                  Galaxy S24 Ultra
                </Link>
              </li>
              <li>
                <Link href="/search?q=MacBook" className="hover:text-indigo-400 transition">
                  MacBook Air M3
                </Link>
              </li>
              <li>
                <Link href="/search?q=Sony" className="hover:text-indigo-400 transition">
                  Sony WH-1000XM5
                </Link>
              </li>
              <li>
                <Link href="/search?q=LG+OLED" className="hover:text-indigo-400 transition">
                  LG 55 OLED TV
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 6: Company & Support */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Company & Help
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/" className="hover:text-indigo-400 transition">
                  About PricePilot
                </Link>
              </li>
              <li>
                <Link href="/deals" className="hover:text-indigo-400 transition">
                  Partner with Us
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-indigo-400 transition">
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-indigo-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-indigo-400 transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Supported Stores Row */}
        <div className="py-6 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-400 font-semibold">
            Supported Partner Stores:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {stores.map((s) => (
              <StoreBadge
                key={s}
                storeId={s}
                size="sm"
                className="bg-slate-900 border-slate-800 text-slate-300"
              />
            ))}
          </div>
        </div>

        {/* Mandatory Transparency Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <p className="max-w-3xl leading-relaxed text-center md:text-left">
            <strong className="text-slate-400">Notice:</strong> Prices and availability may change. Always verify the final price on the retailer&apos;s website before purchasing. When you purchase through merchant links on our website, we may earn an affiliate commission at no additional cost to you.
          </p>
          <div className="text-slate-400 whitespace-nowrap">
                2026 PricePilot India. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
