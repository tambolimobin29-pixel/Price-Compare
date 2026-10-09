import { Offer, StoreId } from '@/types/product';

export interface StoreAdapter {
  readonly storeId: StoreId;
  readonly storeName: string;
  readonly isLive: boolean;
  readonly dataSourceDescription: string;

  /**
   * Search for store-specific offers for a given search query
   */
  searchOffers(query: string): Promise<Offer[]>;

  /**
   * Fetch an offer for a given product or SKU
   */
  getOffer(productId: string): Promise<Offer | null>;

  /**
   * Generate an authorized affiliate or direct product URL
   */
  buildStoreUrl(skuOrQuery: string): string;
}

export abstract class BaseStoreAdapter implements StoreAdapter {
  abstract readonly storeId: StoreId;
  abstract readonly storeName: string;
  abstract readonly baseUrl: string;
  abstract readonly affiliateTagEnvVar?: string;

  get isLive(): boolean {
    // Returns true when real affiliate / partner API key is detected in environment
    if (!this.affiliateTagEnvVar) return false;
    return Boolean(process.env[this.affiliateTagEnvVar]);
  }

  get dataSourceDescription(): string {
    return this.isLive
      ? `Live API connected via ${this.affiliateTagEnvVar}`
      : 'Catalog Feed / Verified Store Price Mapping (Demo/Staging Mode)';
  }

  abstract searchOffers(query: string): Promise<Offer[]>;
  abstract getOffer(productId: string): Promise<Offer | null>;
  abstract buildStoreUrl(skuOrQuery: string): string;
}
