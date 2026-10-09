import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatBot } from '@/components/chat/ChatBot';
import { WishlistCompareProvider } from "@/context/WishlistCompareContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | PricePilot India",
    default: "PricePilot - Intelligent E-Commerce Price Comparison Engine",
  },
  description:
    "Browse a demo product catalog with retailer search links across Amazon, Flipkart, Croma, Reliance Digital, Tata CLiQ, Myntra, and Ajio. Confirm live prices and availability with each retailer.",
  keywords: [
    "price comparison",
    "compare prices india",
    "lowest price online",
    "amazon vs flipkart",
    "croma reliance digital",
    "best electronics deals",
  ],
  openGraph: {
    title: "PricePilot - India's Smart Price Comparison Engine",
    description:
      "Browse sample catalog products and retailer search links. Confirm current prices and stock with each store.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <WishlistCompareProvider>
          <Navbar />
          <div
            role="note"
            className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-[11px] leading-relaxed text-amber-900 sm:text-xs"
          >
            Demo catalog: prices, ratings and availability are examples, not live feeds. Retailer links open search results; confirm the exact product and current price before buying.
          </div>
          <main className="flex-1">{children}</main>
          <Footer />
          <ChatBot/>
        </WishlistCompareProvider>
      </body>
    </html>
  );
}

