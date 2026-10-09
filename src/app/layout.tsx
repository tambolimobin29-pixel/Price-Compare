import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
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
    template: "%s | PricePulse India",
    default: "PricePulse - Intelligent E-Commerce Price Comparison Engine",
  },
  description:
    "Compare real-time product prices across Amazon, Flipkart, Croma, Reliance Digital, Tata CLiQ, Myntra, and Ajio. Discover the guaranteed lowest price before you buy.",
  keywords: [
    "price comparison",
    "compare prices india",
    "lowest price online",
    "amazon vs flipkart",
    "croma reliance digital",
    "best electronics deals",
  ],
  openGraph: {
    title: "PricePulse - India's Smart Price Comparison Engine",
    description:
      "Find the lowest prices and save thousands across Amazon, Flipkart, Croma, and Reliance Digital.",
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
          <main className="flex-1">{children}</main>
          <Footer />
        </WishlistCompareProvider>
      </body>
    </html>
  );
}

