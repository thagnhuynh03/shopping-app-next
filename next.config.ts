import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shopping-otkd.onrender.com',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
