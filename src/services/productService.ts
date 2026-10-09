import { MOCK_PRODUCTS } from '@/data/mockProducts';
import { FilterState, Offer, Product, SearchSuggestion, SortOption, StoreId } from '@/types/product';

export class ProductService {
  private products: Product[] = MOCK_PRODUCTS;

  /**
   * Return all products
   */
  async getProducts(): Promise<Product[]> {
    return this.products;
  }

  /**
   * Return featured products for the home page showcase
   */
  async getFeaturedProducts(): Promise<Product[]> {
    return this.products.filter((p) => p.featured);
  }

  /**
   * Return top deals sorted by maximum savings percentage or amount
   */
  async getTopDeals(): Promise<Product[]> {
    return [...this.products]
      .sort((a, b) => b.maxSavings - a.maxSavings)
      .slice(0, 6);
  }

  /**
   * Lookup product by URL slug or id
   */
  async getProductBySlug(slug: string): Promise<Product | null> {
    const product = this.products.find(
      (p) => p.slug === slug || p.id === slug
    );
    return product || null;
  }

  /**
   * Filter, search and sort catalog products
   */
  async queryProducts(
    filters: FilterState,
    sortBy: SortOption = 'popularity'
  ): Promise<{ products: Product[]; total: number }> {
    let result = [...this.products];

    // 1. Text Search across title, brand, category, tags
    if (filters.query && filters.query.trim() !== '') {
      const q = filters.query.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.subCategory && p.subCategory.toLowerCase().includes(q)) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // 2. Category filter
    if (filters.category && filters.category !== 'All') {
      result = result.filter(
        (p) => p.category.toLowerCase() === filters.category!.toLowerCase()
      );
    }

    // 3. Brand filter (multi-select)
    if (filters.brands && filters.brands.length > 0) {
      const brandsLower = filters.brands.map((b) => b.toLowerCase());
      result = result.filter((p) => brandsLower.includes(p.brand.toLowerCase()));
    }

    // 4. Store filter (multi-select: product must have offer from one of selected stores)
    if (filters.stores && filters.stores.length > 0) {
      result = result.filter((p) =>
        p.offers.some((o) => filters.stores.includes(o.storeId))
      );
    }

    // 5. Price bounds
    if (typeof filters.minPrice === 'number') {
      result = result.filter((p) => p.lowestPrice >= filters.minPrice!);
    }
    if (typeof filters.maxPrice === 'number') {
      result = result.filter((p) => p.lowestPrice <= filters.maxPrice!);
    }

    // 6. Minimum Rating
    if (typeof filters.minRating === 'number') {
      result = result.filter((p) => p.rating >= filters.minRating!);
    }

    // 7. In stock only
    if (filters.inStockOnly) {
      result = result.filter((p) =>
        p.offers.some((o) => o.availability === 'in_stock')
      );
    }

    // 8. Sorting
    switch (sortBy) {
      case 'lowest_price':
        result.sort((a, b) => a.lowestPrice - b.lowestPrice);
        break;
      case 'highest_price':
        result.sort((a, b) => b.lowestPrice - a.lowestPrice);
        break;
      case 'highest_discount':
        result.sort((a, b) => b.maxSavings - a.maxSavings);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'popularity':
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return {
      products: result,
      total: result.length,
    };
  }

  /**
   * Fast autocomplete suggestions for SearchBar
   */
  async getSearchSuggestions(query: string): Promise<SearchSuggestion[]> {
    if (!query || query.trim().length < 2) return [];
    const q = query.toLowerCase().trim();
    const suggestions: SearchSuggestion[] = [];

    // Exact or partial product matches
    for (const p of this.products) {
      if (
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      ) {
        suggestions.push({
          text: p.title,
          type: 'product',
          category: p.category,
          brand: p.brand,
          slug: p.slug,
          image: p.thumbnail || p.images[0],
        });
      }
      if (suggestions.length >= 5) break;
    }

    // Brand matches
    const brands = Array.from(new Set(this.products.map((p) => p.brand)));
    for (const b of brands) {
      if (b.toLowerCase().includes(q)) {
        suggestions.push({
          text: b,
          type: 'brand',
        });
      }
      if (suggestions.length >= 7) break;
    }

    return suggestions;
  }

  /**
   * Get distinct categories with product counts
   */
  async getCategories(): Promise<{ name: string; count: number }[]> {
    const map = new Map<string, number>();
    for (const p of this.products) {
      map.set(p.category, (map.get(p.category) || 0) + 1);
    }
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  }

  /**
   * Get distinct brands with product counts
   */
  async getBrands(): Promise<{ name: string; count: number }[]> {
    const map = new Map<string, number>();
    for (const p of this.products) {
      map.set(p.brand, (map.get(p.brand) || 0) + 1);
    }
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  }

  /**
   * Analyzes multi-store offers to determine lowest price, price differences, and savings
   */
  static analyzeOffers(offers: Offer[]) {
    if (!offers || offers.length === 0) {
      return {
        lowestOffer: null,
        highestOffer: null,
        savings: 0,
        lowestPrice: 0,
        highestPrice: 0,
      };
    }

    const sorted = [...offers].sort((a, b) => a.price - b.price);
    const lowestOffer = sorted[0];
    const highestOffer = sorted[sorted.length - 1];
    const savings = highestOffer.price - lowestOffer.price;

    return {
      lowestOffer,
      highestOffer,
      savings,
      lowestPrice: lowestOffer.price,
      highestPrice: highestOffer.price,
    };
  }
}

export const productService = new ProductService();
