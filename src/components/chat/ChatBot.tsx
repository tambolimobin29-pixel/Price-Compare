'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageSquare, X, Send, Bot, Sparkles, ShoppingBag, ExternalLink } from 'lucide-react';

interface ProductItem {
  id: string | number;
  title?: string;
  name?: string;
  brand?: string;
  category?: string;
  price?: number;
  min_price?: number;
  lowest_price?: number;
  original_price?: number;
  image?: string;
  image_url?: string;
  slug?: string;
}

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Array<{
    sender: 'bot' | 'user';
    text: string;
    productCards?: ProductItem[];
  }>>([
    {
      sender: 'bot',
      text: 'Namaste! Main PricePilot AI assistant hoon. Hamare catalogue me 7 live verified products hain. Aap kiska price compare karna chahte hain?',
    },
  ]);

  // Live Database ke saare products fetch karo
  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.products || [];
        setProducts(list);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const getLowestPrice = (p: ProductItem) => {
    return p.min_price || p.lowest_price || p.price || 0;
  };

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    setMessages((prev) => [...prev, { sender: 'user', text: query }]);
    if (!textToSend) setInput('');

    setTimeout(() => {
      const q = query.toLowerCase();

      // 1. Agar user saare products mang raha hai
      if (q.includes('all') || q.includes('sab') || q.includes('list') || q.includes('kya hai') || q.includes('products')) {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: `Hamare live store me ye saare ${products.length} products track ho rahe hain:`,
            productCards: products,
          },
        ]);
        return;
      }

      // 2. Deals / Sasta / Discount search
      if (q.includes('sasta') || q.includes('deal') || q.includes('discount') || q.includes('cheap') || q.includes('offer')) {
        const sorted = [...products].sort((a, b) => getLowestPrice(a) - getLowestPrice(b));
        setMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: '🔥 Ye hain sabse saste aur best discounted deals across stores:',
            productCards: sorted.slice(0, 3),
          },
        ]);
        return;
      }

      // 3. Keyword / Brand / Title matching
      const matches = products.filter((p) => {
        const title = (p.title || p.name || '').toLowerCase();
        const brand = (p.brand || '').toLowerCase();
        const cat = (p.category || '').toLowerCase();
        return title.includes(q) || brand.includes(q) || cat.includes(q) || q.includes(brand) || q.includes(cat);
      });

      if (matches.length > 0) {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: `Aapki query "${query}" ke liye ye ${matches.length} matches mile hain lowest price guarantee ke saath:`,
            productCards: matches,
          },
        ]);
      } else {
        // Fallback with quick suggestions
        setMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: `Bhai "${query}" se matching item nahi mila. Aap in 7 verified products me se choose kar sakte hain:`,
            productCards: products.slice(0, 4),
          },
        ]);
      }
    }, 300);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-2xl transition hover:scale-105 cursor-pointer relative"
          aria-label="Open PricePilot Chat"
        >
          <MessageSquare size={24} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
        </button>
      ) : (
        <div className="w-84 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in duration-200 h-[520px]">
          {/* Header */}
          <div className="bg-slate-950 text-white p-3.5 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm">
                <Bot size={18} />
              </div>
              <div>
                <span className="font-bold text-xs block">PricePilot Assistant</span>
                <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                  ● {products.length > 0 ? `${products.length} Products Synced` : 'Connecting DB...'}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick Chips Bar */}
          <div className="bg-slate-100/80 px-3 py-2 flex items-center gap-1.5 overflow-x-auto text-[11px] border-b border-slate-200 scrollbar-none">
            <button
              onClick={() => handleSend('all products')}
              className="px-2.5 py-1 bg-white hover:bg-indigo-50 hover:text-indigo-600 rounded-full border border-slate-200 whitespace-nowrap font-medium transition cursor-pointer"
            >
              📦 All 7 Products
            </button>
            <button
              onClick={() => handleSend('apple')}
              className="px-2.5 py-1 bg-white hover:bg-indigo-50 hover:text-indigo-600 rounded-full border border-slate-200 whitespace-nowrap font-medium transition cursor-pointer"
            >
              🍎 Apple
            </button>
            <button
              onClick={() => handleSend('samsung')}
              className="px-2.5 py-1 bg-white hover:bg-indigo-50 hover:text-indigo-600 rounded-full border border-slate-200 whitespace-nowrap font-medium transition cursor-pointer"
            >
              📱 Samsung
            </button>
            <button
              onClick={() => handleSend('sasta deal')}
              className="px-2.5 py-1 bg-white hover:bg-indigo-50 hover:text-indigo-600 rounded-full border border-slate-200 whitespace-nowrap font-medium transition cursor-pointer"
            >
              🔥 Best Deals
            </button>
          </div>

          {/* Message List */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs bg-slate-50/60">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-xs'
                      : 'bg-white border border-slate-200 text-slate-800 shadow-xs rounded-bl-xs'
                  }`}
                >
                  {m.text}
                </div>

                {/* Interactive Product Cards */}
                {m.productCards && m.productCards.length > 0 && (
                  <div className="w-full mt-2 space-y-2">
                    {m.productCards.map((p) => {
                      const title = p.title || p.name || 'Product';
                      const price = getLowestPrice(p);
                      return (
                        <div
                          key={p.id}
                          className="bg-white border border-slate-200 rounded-xl p-2.5 flex items-center justify-between gap-2 shadow-xs hover:border-indigo-300 transition"
                        >
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-slate-900 truncate text-[11px]">{title}</h4>
                            <p className="text-[10px] text-slate-500">
                              Lowest Price:{' '}
                              <span className="font-extrabold text-emerald-600">
                                {price > 0 ? `₹${price.toLocaleString('en-IN')}` : 'Best Online'}
                              </span>
                            </p>
                          </div>
                          <Link
                            href={p.slug ? `/product/${p.slug}` : `/search?category=${encodeURIComponent(p.category || '')}`}
                            onClick={() => setIsOpen(false)}
                            className="px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white font-bold text-[10px] flex items-center gap-1 transition flex-shrink-0"
                          >
                            <span>View</span>
                            <ExternalLink size={10} />
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 bg-white border-t border-slate-200 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for Apple, Samsung, Laptops, or 'all'..."
              className="flex-1 px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600"
            />
            <button
              type="submit"
              className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl cursor-pointer transition shadow-xs flex-shrink-0"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};