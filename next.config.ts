import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "rukminim2.flixcart.com" },
      { protocol: "https", hostname: "media-ik.croma.com" },
      { protocol: "https", hostname: "assets.tatacliq.com" },
      { protocol: "https", hostname: "assets.myntassets.com" },
    ],
  },
};

export default nextConfig;
