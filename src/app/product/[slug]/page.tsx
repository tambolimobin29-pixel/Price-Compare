import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { productService } from '@/services/productService';
import { ProductDetails } from '@/components/product/ProductDetails';
import { formatINR } from '@/components/common/PriceTag';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await productService.getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const sortedOffers = [...product.offers].sort((a, b) => a.price - b.price);
  const bestOffer = sortedOffers[0];

  return {
    title: `Lowest Price: ${product.title} - ${formatINR(bestOffer.price)} at ${bestOffer.storeName}`,
    description: `Compare prices for ${product.title} across Amazon, Flipkart, Croma, and Reliance Digital. Lowest price is ${formatINR(bestOffer.price)} with instant savings up to ${formatINR(product.maxSavings)}.`,
    openGraph: {
      title: `${product.title} - Best Price Comparison`,
      description: `Best deal: ${formatINR(bestOffer.price)} at ${bestOffer.storeName}. Save up to ${formatINR(product.maxSavings)}.`,
      images: [
        {
          url: product.thumbnail || product.images[0],
          width: 800,
          height: 800,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await productService.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Generate Google Schema.org Product Structured Data (JSON-LD)
  const structuredData = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.title,
    image: product.images,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: product.lowestPrice,
      highPrice: product.highestPrice,
      offerCount: product.offers.length,
      offers: product.offers.map((offer) => ({
        '@type': 'Offer',
        price: offer.price,
        priceCurrency: 'INR',
        seller: {
          '@type': 'Organization',
          name: offer.storeName,
        },
        availability:
          offer.availability === 'in_stock'
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
        url: offer.productUrl,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ProductDetails product={product} />
    </>
  );
}
