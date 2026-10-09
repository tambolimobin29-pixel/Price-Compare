export type StoreId =
  | 'amazon'
  | 'flipkart'
  | 'croma'
  | 'reliance-digital'
  | 'tata-cliq'
  | 'myntra'
  | 'ajio';

export interface StoreMeta {
  id: StoreId;
  name: string;
  shortName: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  primaryColor: string;
  domain: string;
}

export interface Offer {
  id: string;
  storeId: StoreId;
  storeName: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  availability: 'in_stock' | 'out_of_stock' | 'limited';
  deliveryInfo: string;
  deliveryDays?: number;
  productUrl: string;
  seller: string;
  sellerRating?: number;
  isLowestPrice?: boolean;
  priceDifferenceFromLowest?: number;
  lastUpdated: string;
  specialOfferBadge?: string;
}

export interface PriceHistoryPoint {
  date: string;
  storeId: StoreId;
  price: number;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  brand: string;
  category: string;
  subCategory?: string;
  description: string;
  images: string[];
  thumbnail: string;
  rating: number;
  reviewCount: number;
  specifications: Record<string, string>;
  highlights: string[];
  offers: Offer[];
  lowestPrice: number;
  highestPrice: number;
  maxSavings: number;
  priceHistory?: PriceHistoryPoint[];
  tags: string[];
  featured?: boolean;
  createdAt: string;
}

export interface FilterState {
  query?: string;
  category?: string;
  brands: string[];
  stores: StoreId[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  minDiscount?: number;
  inStockOnly?: boolean;
}

export type SortOption =
  | 'lowest_price'
  | 'highest_price'
  | 'highest_discount'
  | 'rating'
  | 'popularity'
  | 'newest';

export interface SearchSuggestion {
  text: string;
  type: 'product' | 'brand' | 'category';
  category?: string;
  brand?: string;
  slug?: string;
  image?: string;
}
