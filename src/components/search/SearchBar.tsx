'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight, Tag, Layers, Smartphone } from 'lucide-react';
import { productService } from '@/services/productService';
import { SearchSuggestion } from '@/types/product';

interface SearchBarProps {
  placeholder?: string;
  initialQuery?: string;
  className?: string;
  size?: 'md' | 'lg';
  onSearchSubmit?: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search products, brands and categories...',
  initialQuery = '',
  className = '',
  size = 'md',
  onSearchSubmit,
}) => {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync initial query
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  // Debounced search suggestions
  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const results = await productService.getSearchSuggestions(query);
        setSuggestions(results);
        setIsOpen(true);
        setActiveIndex(-1);
      } finally {
        setIsLoading(false);
      }
    }, 180);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSuggestion = (suggestion: SearchSuggestion) => {
    setIsOpen(false);
    if (suggestion.type === 'product' && suggestion.slug) {
      router.push(`/product/${suggestion.slug}`);
    } else {
      setQuery(suggestion.text);
      if (onSearchSubmit) {
        onSearchSubmit(suggestion.text);
      } else {
        router.push(`/search?q=${encodeURIComponent(suggestion.text)}`);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsOpen(false);
    if (activeIndex >= 0 && suggestions[activeIndex]) {
      handleSelectSuggestion(suggestions[activeIndex]);
      return;
    }

    if (onSearchSubmit) {
      onSearchSubmit(query.trim());
    } else {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const clearQuery = () => {
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const heightClasses = size === 'lg' ? 'h-13 text-base' : 'h-11 text-sm';

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative w-full">
        <div className="relative flex items-center w-full">
          <div className="absolute left-4 pointer-events-none text-slate-400">
            <Search size={size === 'lg' ? 20 : 18} />
          </div>

          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (suggestions.length > 0) setIsOpen(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoComplete="off"
            className={`w-full pl-11 pr-24 ${heightClasses} rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all`}
            aria-label="Search products and stores"
          />

          <div className="absolute right-2 flex items-center gap-1">
            {query && (
              <button
                type="button"
                onClick={clearQuery}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
            <button
              type="submit"
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white font-medium text-xs md:text-sm hover:bg-indigo-700 transition shadow-xs flex items-center gap-1 cursor-pointer"
            >
              <span>Compare</span>
              <ArrowRight size={14} className="hidden sm:inline" />
            </button>
          </div>
        </div>
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="p-2 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between text-[11px] text-slate-500 px-3 font-semibold uppercase tracking-wider">
            <span>Instant Suggestions</span>
            <span>{isLoading ? 'Searching...' : 'Use ↑↓ to navigate'}</span>
          </div>

          {isLoading ? (
            <div className="p-4 space-y-2.5 animate-pulse">
              <div className="h-4 bg-slate-100 rounded w-3/4" />
              <div className="h-4 bg-slate-100 rounded w-1/2" />
              <div className="h-4 bg-slate-100 rounded w-2/3" />
            </div>
          ) : suggestions.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500">
              No matching products or categories found for &quot;<strong>{query}</strong>&quot;.
            </div>
          ) : (
            <ul className="py-1.5 max-h-72 overflow-y-auto">
              {suggestions.map((item, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <li key={`${item.type}-${item.text}-${idx}`}>
                    <button
                      type="button"
                      onClick={() => handleSelectSuggestion(item)}
                      className={`w-full px-4 py-2.5 text-left flex items-center gap-3 transition cursor-pointer ${
                        isActive
                          ? 'bg-indigo-50 text-indigo-900'
                          : 'hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      {item.image ? (
                        <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 flex items-center justify-center p-0.5">
                          <img
                            src={item.image}
                            alt={item.text}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <span className="p-1.5 rounded-lg bg-slate-100 text-slate-500 flex-shrink-0">
                          {item.type === 'product' && <Smartphone size={14} />}
                          {item.type === 'brand' && <Tag size={14} />}
                          {item.type === 'category' && <Layers size={14} />}
                        </span>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          {item.brand && (
                            <span className="text-[10px] font-bold uppercase text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded">
                              {item.brand}
                            </span>
                          )}
                          <span className="font-medium text-sm truncate text-slate-800">
                            {item.text}
                          </span>
                        </div>
                        {item.category && (
                          <span className="text-[11px] text-slate-400 block truncate">
                            in {item.category}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                        {item.type}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
