import { Offer, StoreId } from '@/types/product';

type DealLinkOffer = Pick<Offer, 'storeId' | 'storeName'> & {
  productUrl?: unknown;
  product_url?: unknown;
};

function buildStoreSearchUrl(storeId: StoreId, query: string): string {
  const encodedQuery = encodeURIComponent(query.trim() || 'deals');

  switch (storeId) {
    case 'amazon':
      return `https://www.amazon.in/s?k=${encodedQuery}`;
    case 'flipkart':
      return `https://www.flipkart.com/search?q=${encodedQuery}`;
    case 'croma':
      return `https://www.croma.com/searchB?q=${encodedQuery}`;
    case 'reliance-digital':
      return `https://www.reliancedigital.in/search?q=${encodedQuery}`;
    case 'tata-cliq':
      return `https://www.tatacliq.com/search/?text=${encodedQuery}`;
    case 'myntra':
      return `https://www.myntra.com/${query.trim().split(/\\s+/).map(encodeURIComponent).join('-')}`;
    case 'ajio':
      return `https://www.ajio.com/search/?text=${encodedQuery}`;
    default:
      return `https://www.google.com/search?q=${encodeURIComponent(query + ' ' + storeId)}`;
  }
}

/**
 * Return a safe external deal URL. If catalog data has a missing or invalid
 * URL (including a snake_case product_url field from an API), use the
 * retailer's search page instead of rendering a dead link.
 */
export function getDealUrl(
  offer: DealLinkOffer,
  productTitle?: string
): string {
  const rawUrl =
    typeof offer.productUrl === 'string'
      ? offer.productUrl.trim()
      : typeof offer.product_url === 'string'
        ? offer.product_url.trim()
        : '';

  if (rawUrl) {
    try {
      const parsedUrl = new URL(rawUrl);
      if (
        (parsedUrl.protocol === 'https:' || parsedUrl.protocol === 'http:') &&
        parsedUrl.hostname
      ) {
        return parsedUrl.toString();
      }
    } catch {
      // Fall through to a working retailer search URL.
    }
  }

  return buildStoreSearchUrl(
    offer.storeId,
    productTitle?.trim() || offer.storeName || 'deals'
  );
}
