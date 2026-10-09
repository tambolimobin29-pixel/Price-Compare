import { Offer, StoreId } from '@/types/product';
import { BaseStoreAdapter, StoreAdapter } from './storeAdapter';

export class AmazonAdapter extends BaseStoreAdapter {
  readonly storeId: StoreId = 'amazon';
  readonly storeName = 'Amazon India';
  readonly baseUrl = 'https://www.amazon.in';
  readonly affiliateTagEnvVar = 'AMAZON_ASSOCIATE_TAG';

  buildStoreUrl(skuOrQuery: string): string {
    const affiliateTag = process.env.AMAZON_ASSOCIATE_TAG;
    const tagParam = affiliateTag ? `&tag=${affiliateTag}` : '';
    if (skuOrQuery.startsWith('http')) return skuOrQuery;
    if (skuOrQuery.length === 10 && /^[A-Z0-9]+$/.test(skuOrQuery)) {
      return `${this.baseUrl}/dp/${skuOrQuery}?th=1${tagParam}`;
    }
    return `${this.baseUrl}/s?k=${encodeURIComponent(skuOrQuery)}${tagParam}`;
  }

  async searchOffers(query: string): Promise<Offer[]> {
    // In production, queries the Amazon Product Advertising API (PAAPI 5.0)
    return [];
  }

  async getOffer(productId: string): Promise<Offer | null> {
    return null;
  }
}

export class FlipkartAdapter extends BaseStoreAdapter {
  readonly storeId: StoreId = 'flipkart';
  readonly storeName = 'Flipkart';
  readonly baseUrl = 'https://www.flipkart.com';
  readonly affiliateTagEnvVar = 'FLIPKART_AFFILIATE_ID';

  buildStoreUrl(skuOrQuery: string): string {
    const affiliateId = process.env.FLIPKART_AFFILIATE_ID;
    const affParam = affiliateId ? `&affid=${affiliateId}` : '';
    if (skuOrQuery.startsWith('http')) return skuOrQuery;
    return `${this.baseUrl}/search?q=${encodeURIComponent(skuOrQuery)}${affParam}`;
  }

  async searchOffers(query: string): Promise<Offer[]> {
    // In production, queries Flipkart Affiliate API / Product Feed
    return [];
  }

  async getOffer(productId: string): Promise<Offer | null> {
    return null;
  }
}

export class CromaAdapter extends BaseStoreAdapter {
  readonly storeId: StoreId = 'croma';
  readonly storeName = 'Croma';
  readonly baseUrl = 'https://www.croma.com';
  readonly affiliateTagEnvVar = 'CROMA_PARTNER_KEY';

  buildStoreUrl(skuOrQuery: string): string {
    if (skuOrQuery.startsWith('http')) return skuOrQuery;
    return `${this.baseUrl}/searchB?q=${encodeURIComponent(skuOrQuery)}%3Arelevance&text=${encodeURIComponent(skuOrQuery)}`;
  }

  async searchOffers(query: string): Promise<Offer[]> {
    return [];
  }

  async getOffer(productId: string): Promise<Offer | null> {
    return null;
  }
}

export class RelianceDigitalAdapter extends BaseStoreAdapter {
  readonly storeId: StoreId = 'reliance-digital';
  readonly storeName = 'Reliance Digital';
  readonly baseUrl = 'https://www.reliancedigital.in';
  readonly affiliateTagEnvVar = 'RELIANCE_DIGITAL_API_KEY';

  buildStoreUrl(skuOrQuery: string): string {
    if (skuOrQuery.startsWith('http')) return skuOrQuery;
    return `${this.baseUrl}/search?q=${encodeURIComponent(skuOrQuery)}:relevance`;
  }

  async searchOffers(query: string): Promise<Offer[]> {
    return [];
  }

  async getOffer(productId: string): Promise<Offer | null> {
    return null;
  }
}

export class TataCliqAdapter extends BaseStoreAdapter {
  readonly storeId: StoreId = 'tata-cliq';
  readonly storeName = 'Tata CLiQ';
  readonly baseUrl = 'https://www.tatacliq.com';
  readonly affiliateTagEnvVar = 'TATACLIQ_PARTNER_ID';

  buildStoreUrl(skuOrQuery: string): string {
    if (skuOrQuery.startsWith('http')) return skuOrQuery;
    return `${this.baseUrl}/search/?searchCategory=all&text=${encodeURIComponent(skuOrQuery)}`;
  }

  async searchOffers(query: string): Promise<Offer[]> {
    return [];
  }

  async getOffer(productId: string): Promise<Offer | null> {
    return null;
  }
}

export class MyntraAdapter extends BaseStoreAdapter {
  readonly storeId: StoreId = 'myntra';
  readonly storeName = 'Myntra';
  readonly baseUrl = 'https://www.myntra.com';
  readonly affiliateTagEnvVar = 'MYNTRA_AFFILIATE_CODE';

  buildStoreUrl(skuOrQuery: string): string {
    if (skuOrQuery.startsWith('http')) return skuOrQuery;
    return `${this.baseUrl}/${encodeURIComponent(skuOrQuery.replace(/\s+/g, '-'))}`;
  }

  async searchOffers(query: string): Promise<Offer[]> {
    return [];
  }

  async getOffer(productId: string): Promise<Offer | null> {
    return null;
  }
}

export class AjioAdapter extends BaseStoreAdapter {
  readonly storeId: StoreId = 'ajio';
  readonly storeName = 'Ajio';
  readonly baseUrl = 'https://www.ajio.com';
  readonly affiliateTagEnvVar = 'AJIO_PARTNER_CODE';

  buildStoreUrl(skuOrQuery: string): string {
    if (skuOrQuery.startsWith('http')) return skuOrQuery;
    return `${this.baseUrl}/s/${encodeURIComponent(skuOrQuery)}`;
  }

  async searchOffers(query: string): Promise<Offer[]> {
    return [];
  }

  async getOffer(productId: string): Promise<Offer | null> {
    return null;
  }
}

export const storeAdapters: Record<StoreId, StoreAdapter> = {
  amazon: new AmazonAdapter(),
  flipkart: new FlipkartAdapter(),
  croma: new CromaAdapter(),
  'reliance-digital': new RelianceDigitalAdapter(),
  'tata-cliq': new TataCliqAdapter(),
  myntra: new MyntraAdapter(),
  ajio: new AjioAdapter(),
};
