import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shopping-app-nest.onrender.com',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
