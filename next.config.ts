import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // protocol: 'https',
        // hostname: 'shopping-app-nest.onrender.com',
        // pathname: '/images/**',
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/images/**',
      },
    ],
  },
};
export default nextConfig;