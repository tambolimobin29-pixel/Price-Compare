'use client';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hduvhpexwnseomkchgmi.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_OKE_Msy0AQdPRccNoN1u2A_RfHohcTg'
);

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  TrendingDown,
  Menu,
  X,
  ShieldCheck,
  Heart,
  Scale,
  User,
  LogIn,
  Search,
  SlidersHorizontal,
  Smartphone,
  Laptop,
  Headphones,
  Tv,
  Percent,
} from 'lucide-react';
import { SearchBar } from '../search/SearchBar';
import { useWishlistCompare } from '@/context/WishlistCompareContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const { wishlistCount, compareCount } = useWishlistCompare();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'All Products', href: '/search', icon: SlidersHorizontal },
    { label: 'Top Deals', href: '/deals', icon: Percent },
    { label: 'Compare Specs', href: '/compare', icon: Scale },
    { label: 'Mobiles', href: '/search?category=Mobiles%20%26%20Tablets', icon: Smartphone },
    { label: 'Laptops', href: '/search?category=Laptops%20%26%20Computers', icon: Laptop },
    { label: 'Audio', href: '/search?category=Audio%20%26%20Wearables', icon: Headphones },
    { label: 'Smart TVs', href: '/search?category=Home%20%26%20Kitchen', icon: Tv },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b transition-all duration-200 ${
          scrolled
            ? 'border-slate-200 shadow-md shadow-slate-900/5'
            : 'border-slate-200/80 shadow-xs'
        }`}
      >
        <div className="bg-slate-950 text-slate-300 text-xs py-1.5 px-4 hidden md:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-white">Live Retail Price Intelligence:</span>
              <span className="text-slate-400">
                Comparing Amazon, Flipkart, Croma, Reliance Digital & Tata CLiQ
              </span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <ShieldCheck size={13} /> 100% Genuine Retailer Links
              </span>
              <span>•</span>
              <span className="text-slate-300">Unbiased & Independent</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 gap-4 lg:gap-8">
            <Link
              href="/"
              className="flex items-center gap-3 flex-shrink-0 group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
                <TrendingDown size={22} className="stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Price<span className="text-indigo-600">Pilot</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-400 -mt-1 tracking-wider">
                  Compare. Save. Shop.
                </span>
              </div>
            </Link>

            <div className="hidden md:flex flex-1 max-w-2xl mx-auto">
              <SearchBar size="md" placeholder="Search products, brands and categories..." />
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <Link
                href="/compare"
                className="relative p-2.5 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60 transition"
                title="Product Comparison Tool"
                aria-label="Compare products"
              >
                <Scale size={20} />
                {compareCount > 0 && (
                  <span className="absolute top-1 right-1 w-4.5 h-4.5 rounded-full bg-indigo-600 text-white text-[10px] font-extrabold flex items-center justify-center shadow-xs">
                    {compareCount}
                  </span>
                )}
              </Link>

              <Link
                href="/wishlist"
                className="relative p-2.5 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-rose-50/60 transition"
                title="Your Wishlist"
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4.5 h-4.5 rounded-full bg-rose-600 text-white text-[10px] font-extrabold flex items-center justify-center shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <button
                type="button"
                onClick={() => setAuthModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-indigo-600 text-white transition shadow-xs cursor-pointer ml-1"
              >
                <User size={15} />
                <span>Sign In</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {mobileSearchOpen && (
            <div className="md:hidden pb-3 animate-in fade-in slide-in-from-top-1 duration-150">
              <SearchBar size="md" placeholder="Search products, brands, categories..." />
            </div>
          )}
        </div>

        <nav className="hidden md:block border-t border-slate-100 bg-slate-50/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ul className="flex items-center gap-1 py-1.5 overflow-x-auto text-xs font-medium text-slate-600">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white hover:text-indigo-600 hover:shadow-xs transition"
                    >
                      <Icon size={14} className="text-slate-400" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 shadow-xl px-4 py-4 space-y-3 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                Quick Navigation
              </span>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthModalOpen(true);
                }}
                className="text-xs font-bold text-indigo-600 flex items-center gap-1"
              >
                <LogIn size={13} />
                <span>Sign In / Profile</span>
              </button>
            </div>
            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
                  >
                    <Icon size={17} className="text-slate-400" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 relative">
            <button
              type="button"
              onClick={() => setAuthModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X size={18} />
            </button>
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-3">
                <User size={24} />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Welcome to PricePilot
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Save wishlists, track price drops across stores, and personalize alerts.
              </p>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const emailInput = form.elements[0] as HTMLInputElement;
                const passwordInput = form.elements[1] as HTMLInputElement;
                const { data, error } = await supabase.auth.signUp({
                  email: emailInput.value,
                  password: passwordInput.value,
                });
                if (error) {
                  alert(`Auth Error: ${error.message}`);
                } else {
                  alert(`User registered in Supabase successfully! UID: ${data.user?.id || 'Done'}`);
                  setAuthModalOpen(false);
                }
              }}
              className="space-y-3"
            >
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  defaultValue="shopper@pricepilot.in"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-600"
                  required
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Minimum 6 characters"
                  defaultValue="secret123"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-600"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition cursor-pointer"
              >
                Sign In / Register
              </button>
            </form>

            <p className="text-[11px] text-slate-400 text-center mt-4">
              Demo environment: Local storage active for Wishlist and Compare items.
            </p>
          </div>
        </div>
      )}
    </>
  );
};