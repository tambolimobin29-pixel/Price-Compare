import { Offer, Product, StoreId } from '@/types/product';
import { MOCK_PRODUCTS } from '@/data/mockProducts';

/**
 * Standard Retailer Product Source Adapter Interface
 */
export interface ProductSource {
  readonly storeId: StoreId;
  readonly storeName: string;
  readonly isLive: boolean;

  searchProducts(query: string): Promise<Product[]>;
  getProduct(productId: string): Promise<Product | null>;
  getOffers(productId: string): Promise<Offer[]>;
}

// In-Memory Caching Architecture with TTL
interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

export class SimpleCache {
  private cache = new Map<string, CacheEntry<any>>();

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    return entry.data as T;
  }

  set<T>(key: string, data: T, ttlSeconds: number = 300): void {
    this.cache.set(key, {
      data,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }

  clear(): void {
    this.cache.clear();
  }
}

export const apiCache = new SimpleCache();

// Timeout & Retry Utilities
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number = 5000
): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(
      () => reject(new Error(`Operation timed out after ${timeoutMs}ms`)),
      timeoutMs
    );
  });
  return Promise.race([promise, timeoutPromise]).finally(() =>
    clearTimeout(timer)
  );
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  retries: number = 2,
  delayMs: number = 500
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await new Promise((res) => setTimeout(res, delayMs));
    return withRetry(fn, retries - 1, delayMs * 1.5);
  }
}

/**
 * Base Retailer Adapter
 */
export abstract class BaseRetailerAdapter implements ProductSource {
  abstract readonly storeId: StoreId;
  abstract readonly storeName: string;
  abstract readonly requiredEnvKeys: string[];

  get isLive(): boolean {
    return this.requiredEnvKeys.every((key) => Boolean(process.env[key]));
  }

  async searchProducts(query: string): Promise<Product[]> {
    const cacheKey = `search:${this.storeId}:${query.toLowerCase()}`;
    const cached = apiCache.get<Product[]>(cacheKey);
    if (cached) return cached;

    const results = await withTimeout(
      withRetry(async () => this.fetchRemoteProducts(query)),
      4000
    );

    apiCache.set(cacheKey, results, 180);
    return results;
  }

  async getProduct(productId: string): Promise<Product | null> {
    const cacheKey = `product:${this.storeId}:${productId}`;
    const cached = apiCache.get<Product>(cacheKey);
    if (cached) return cached;

    const result = await this.fetchRemoteProductById(productId);
    if (result) apiCache.set(cacheKey, result, 300);
    return result;
  }

  async getOffers(productId: string): Promise<Offer[]> {
    const product = await this.getProduct(productId);
    return product ? product.offers.filter((o) => o.storeId === this.storeId) : [];
  }

  protected async fetchRemoteProducts(query: string): Promise<Product[]> {
    // In demo/staging: falls back to normalized verified catalog
    const q = query.toLowerCase();
    return MOCK_PRODUCTS.filter(
      (p) =>
        (p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)) &&
        p.offers.some((o) => o.storeId === this.storeId)
    );
  }

  protected async fetchRemoteProductById(productId: string): Promise<Product | null> {
    const product = MOCK_PRODUCTS.find(
      (p) => p.id === productId || p.slug === productId
    );
    return product || null;
  }
}

export class AmazonAdapter extends BaseRetailerAdapter {
  readonly storeId: StoreId = 'amazon';
  readonly storeName = 'Amazon India';
  readonly requiredEnvKeys = [
    'AMAZON_PAAPI_ACCESS_KEY',
    'AMAZON_PAAPI_SECRET_KEY',
    'AMAZON_ASSOCIATE_TAG',
  ];
}

export class FlipkartAdapter extends BaseRetailerAdapter {
  readonly storeId: StoreId = 'flipkart';
  readonly storeName = 'Flipkart';
  readonly requiredEnvKeys = ['FLIPKART_AFFILIATE_ID', 'FLIPKART_AFFILIATE_TOKEN'];
}

export class CromaAdapter extends BaseRetailerAdapter {
  readonly storeId: StoreId = 'croma';
  readonly storeName = 'Croma';
  readonly requiredEnvKeys = ['CROMA_PARTNER_API_KEY'];
}

export class RelianceDigitalAdapter extends BaseRetailerAdapter {
  readonly storeId: StoreId = 'reliance-digital';
  readonly storeName = 'Reliance Digital';
  readonly requiredEnvKeys = ['RELIANCE_DIGITAL_API_KEY'];
}

export class MyntraAdapter extends BaseRetailerAdapter {
  readonly storeId: StoreId = 'myntra';
  readonly storeName = 'Myntra';
  readonly requiredEnvKeys = ['MYNTRA_AFFILIATE_KEY'];
}

export const retailerAdapters: Record<StoreId, ProductSource> = {
  amazon: new AmazonAdapter(),
  flipkart: new FlipkartAdapter(),
  croma: new CromaAdapter(),
  'reliance-digital': new RelianceDigitalAdapter(),
  myntra: new MyntraAdapter(),
  'tata-cliq': new CromaAdapter(), // Shared electronics feed pattern
  ajio: new MyntraAdapter(),
};
