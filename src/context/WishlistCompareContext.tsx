'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface WishlistCompareContextType {
  wishlistIds: string[];
  compareIds: string[];
  isInWishlist: (productId: string) => boolean;
  isInCompare: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
  toggleCompare: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  wishlistCount: number;
  compareCount: number;
}

const WishlistCompareContext = createContext<WishlistCompareContextType | undefined>(
  undefined
);

export const WishlistCompareProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem('PricePilot_wishlist');
      const savedCompare = localStorage.getItem('PricePilot_compare');
      if (savedWishlist) setWishlistIds(JSON.parse(savedWishlist));
      if (savedCompare) setCompareIds(JSON.parse(savedCompare));
    } catch (e) {
      console.error('Failed to load wishlist/compare from localStorage', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem('PricePilot_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error('Failed to write wishlist to localStorage', e);
    }
  }, [wishlistIds, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem('PricePilot_compare', JSON.stringify(compareIds));
    } catch (e) {
      console.error('Failed to write compare to localStorage', e);
    }
  }, [compareIds, isInitialized]);

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);
  const isInCompare = (productId: string) => compareIds.includes(productId);

  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleCompare = (productId: string) => {
    setCompareIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      if (prev.length >= 4) {
        alert('You can compare a maximum of 4 products at a time.');
        return prev;
      }
      return [...prev, productId];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  };

  const removeFromCompare = (productId: string) => {
    setCompareIds((prev) => prev.filter((id) => id !== productId));
  };

  const clearCompare = () => setCompareIds([]);

  return (
    <WishlistCompareContext.Provider
      value={{
        wishlistIds,
        compareIds,
        isInWishlist,
        isInCompare,
        toggleWishlist,
        toggleCompare,
        removeFromWishlist,
        removeFromCompare,
        clearCompare,
        wishlistCount: wishlistIds.length,
        compareCount: compareIds.length,
      }}
    >
      {children}
    </WishlistCompareContext.Provider>
  );
};

export const useWishlistCompare = () => {
  const context = useContext(WishlistCompareContext);
  if (!context) {
    throw new Error(
      'useWishlistCompare must be used within a WishlistCompareProvider'
    );
  }
  return context;
};
