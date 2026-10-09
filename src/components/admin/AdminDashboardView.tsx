'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Package,
  Store,
  Tag,
  Users,
  Activity,
  FileText,
  Lock,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Search,
  Sparkles,
  BarChart3,
  Server,
} from 'lucide-react';
import { Product, StoreId } from '@/types/product';
import { formatINR } from '../common/PriceTag';
import { StoreBadge } from '../common/StoreBadge';
import { STORE_REGISTRY } from '@/services/storeMeta';

interface AdminDashboardViewProps {
  initialProducts: Product[];
}

type AdminTab =
  | 'overview'
  | 'products'
  | 'offers'
  | 'retailers'
  | 'charts'
  | 'logs';

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  initialProducts,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [productsList, setProductsList] = useState<Product[]>(initialProducts);
  const [searchFilter, setSearchFilter] = useState('');

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123' || password === 'pricepulse') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid credentials. (Hint: Use demo password "admin123")');
    }
  };

  // Delete product action
  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product SKU?')) {
      setProductsList((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Authentication Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-950 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
            <Lock size={26} />
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-white">
              PricePulse Admin Portal
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Restricted management area for retailer adapters, product feeds & telemetry
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500 placeholder-slate-600"
                autoFocus
              />
              <span className="text-[10px] text-slate-500 block mt-1">
                Demo access password: <strong className="text-indigo-400">admin123</strong>
              </span>
            </div>

            {authError && (
              <p className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 p-2 rounded-lg">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/25 transition cursor-pointer"
            >
              Access Dashboard
            </button>
          </form>

          <Link
            href="/"
            className="inline-block text-xs text-slate-500 hover:text-slate-300 transition"
          >
            ? Return to Public Website
          </Link>
        </div>
      </div>
    );
  }

  // Filtered Products for Management Table
  const filteredProducts = productsList.filter(
    (p) =>
      p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col">
      {/* Top Admin Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-sm">
            P
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-white flex items-center gap-2">
              <span>PricePulse Operations Console</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Live Console
              </span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition"
          >
            <span>Public Site</span>
            <ExternalLink size={12} />
          </Link>
          <button
            type="button"
            onClick={() => setIsAuthenticated(false)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-60 border-r border-slate-800 bg-slate-900/30 p-4 space-y-1">
          {[
            { key: 'overview', label: 'Overview', icon: LayoutDashboard },
            { key: 'products', label: 'Products', icon: Package },
            { key: 'offers', label: 'Store Offers', icon: Tag },
            { key: 'retailers', label: 'Retailers & APIs', icon: Store },
            { key: 'charts', label: 'Analytics & Charts', icon: BarChart3 },
            { key: 'logs', label: 'System Logs', icon: FileText },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveTab(item.key as AdminTab)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">Platform Health Overview</h2>

              {/* 7 Core KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Total Products
                  </span>
                  <div className="text-2xl font-black text-white">{productsList.length} SKUs</div>
                  <span className="text-[11px] text-emerald-400 font-semibold">100% verified metadata</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Connected Retailers
                  </span>
                  <div className="text-2xl font-black text-white">7 Stores</div>
                  <span className="text-[11px] text-indigo-400 font-semibold">Amazon, Flipkart, Croma, etc.</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    API Status
                  </span>
                  <div className="text-2xl font-black text-emerald-400">99.98%</div>
                  <span className="text-[11px] text-slate-400 font-semibold">Staging / Adapter Health OK</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Wishlist Saves
                  </span>
                  <div className="text-2xl font-black text-rose-400">3,842</div>
                  <span className="text-[11px] text-slate-400 font-semibold">Active price tracking alerts</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Comparison Searches
                  </span>
                  <div className="text-2xl font-black text-white">28,950</div>
                  <span className="text-[11px] text-emerald-400 font-semibold">+18% this week</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Avg User Savings
                  </span>
                  <div className="text-2xl font-black text-emerald-400">?4,250</div>
                  <span className="text-[11px] text-slate-400 font-semibold">Per completed purchase</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Registered Shoppers
                  </span>
                  <div className="text-2xl font-black text-white">1,420</div>
                  <span className="text-[11px] text-indigo-400 font-semibold">Supabase Auth ready</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Cache Hit Ratio
                  </span>
                  <div className="text-2xl font-black text-white">89.4%</div>
                  <span className="text-[11px] text-slate-400 font-semibold">Response under 40ms</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS MANAGEMENT */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Product Catalog Management</h2>
                  <p className="text-xs text-slate-400">Add, edit, inspect, and remove normalized product records</p>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Add Product modal opens here. Supports image upload and multi-store mapping.')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  <Plus size={15} />
                  <span>Add Product</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="max-w-xs">
                <input
                  type="text"
                  placeholder="Filter products..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Table */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase font-bold text-[10px]">
                      <th className="p-3">Product Name</th>
                      <th className="p-3">Brand</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Offers</th>
                      <th className="p-3">Lowest Price</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-850">
                        <td className="p-3 font-semibold text-white max-w-xs truncate">
                          {p.title}
                        </td>
                        <td className="p-3 text-indigo-400 font-bold">{p.brand}</td>
                        <td className="p-3 text-slate-400">{p.category}</td>
                        <td className="p-3 font-bold">{p.offers.length} stores</td>
                        <td className="p-3 font-bold text-emerald-400">{formatINR(p.lowestPrice)}</td>
                        <td className="p-3 text-right space-x-2">
                          <Link
                            href={`/product/${p.slug}`}
                            target="_blank"
                            className="p-1 text-slate-400 hover:text-white"
                            title="View Public Page"
                          >
                            <ExternalLink size={14} className="inline" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-1 text-rose-400 hover:text-rose-300"
                            title="Delete"
                          >
                            <Trash2 size={14} className="inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: OFFERS MANAGEMENT */}
          {activeTab === 'offers' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">Retailer Offer Feed Cross-Reference</h2>
              <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase font-bold text-[10px]">
                      <th className="p-3">Store</th>
                      <th className="p-3">Product Title</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Discount</th>
                      <th className="p-3">Seller</th>
                      <th className="p-3">Availability</th>
                      <th className="p-3">Last Sync</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {productsList.flatMap((p) =>
                      p.offers.map((off) => (
                        <tr key={off.id} className="hover:bg-slate-850">
                          <td className="p-3 font-bold text-white">
                            <StoreBadge storeId={off.storeId} size="sm" />
                          </td>
                          <td className="p-3 max-w-xs truncate text-slate-300">{p.title}</td>
                          <td className="p-3 font-bold text-emerald-400">{formatINR(off.price)}</td>
                          <td className="p-3 text-rose-400 font-bold">{off.discountPercentage}% OFF</td>
                          <td className="p-3 text-slate-400">{off.seller}</td>
                          <td className="p-3">
                            <span className="text-emerald-400 font-bold uppercase text-[10px]">
                              {off.availability}
                            </span>
                          </td>
                          <td className="p-3 text-slate-500">{off.lastUpdated}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: RETAILERS & APIS */}
          {activeTab === 'retailers' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">Retailer Integration Adapters</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(
                  [
                    'amazon',
                    'flipkart',
                    'croma',
                    'reliance-digital',
                    'tata-cliq',
                    'myntra',
                    'ajio',
                  ] as StoreId[]
                ).map((s) => {
                  const meta = STORE_REGISTRY[s];
                  return (
                    <div
                      key={s}
                      className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <StoreBadge storeId={s} size="md" />
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Active Adapter
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Domain: <strong className="text-slate-200">{meta.domain}</strong>
                      </p>
                      <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
                        <div>Status: Verified Affiliate / Partner URL Format</div>
                        <div>Last Sync: 10 mins ago</div>
                        <div>Adapter: Standard BaseStoreAdapter</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: ANALYTICS & CHARTS */}
          {activeTab === 'charts' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">Search & Price Trends Analytics</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Search Volume Trend */}
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <h3 className="text-sm font-bold text-white">Daily Search Inquiries</h3>
                  <div className="h-44 flex items-end justify-between gap-2 pt-6">
                    {[35, 42, 58, 65, 80, 92, 100].map((val, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full bg-indigo-600 rounded-t-lg transition-all"
                          style={{ height: `${val}%` }}
                        />
                        <span className="text-[10px] text-slate-500">Day {idx + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Popular Categories */}
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-white">Top Searched Categories</h3>
                  <div className="space-y-3 text-xs">
                    {[
                      { name: 'Mobiles & Tablets', pct: '48%', color: 'bg-blue-500' },
                      { name: 'Laptops & Computers', pct: '24%', color: 'bg-indigo-500' },
                      { name: 'Audio & Wearables', pct: '16%', color: 'bg-purple-500' },
                      { name: 'Smart 4K TVs', pct: '12%', color: 'bg-emerald-500' },
                    ].map((c) => (
                      <div key={c.name} className="space-y-1">
                        <div className="flex justify-between text-slate-300">
                          <span>{c.name}</span>
                          <span className="font-bold">{c.pct}</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full ${c.color} rounded-full`}
                            style={{ width: c.pct }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SYSTEM LOGS */}
          {activeTab === 'logs' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">System & Price Ingestion Logs</h2>
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 font-mono text-xs text-slate-300 space-y-2">
                <div className="text-emerald-400">[21:12:04] [INFO] ProductService initialized with 7 canonical SKUs.</div>
                <div className="text-slate-400">[21:15:10] [INFO] AmazonAdapter checked: PAAPI credentials not set, using verified staging feed.</div>
                <div className="text-slate-400">[21:20:25] [INFO] CromaAdapter normalized 5 active offers.</div>
                <div className="text-slate-400">[21:25:40] [INFO] Search autocomplete index cached (180s TTL).</div>
                <div className="text-indigo-400">[21:30:00] [METRICS] In-memory cache hit ratio: 89.4%. Rate limit pool 120 req/min.</div>
                <div className="text-emerald-400">[21:35:12] [SUCCESS] All price comparison routes operational.</div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
