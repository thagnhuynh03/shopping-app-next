import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: 'shopping-app-nest.onrender.com',
      //   pathname: '/images/**',
      // },
      {
        hostname: 'localhost'
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
    ],
  },
};
export default nextConfig;