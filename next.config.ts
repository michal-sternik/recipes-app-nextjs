import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
      },
    ],
  },
  async redirects() {
    return [
      // Basic redirect
      {
        //regex, accepts routes starting with /recipes
        source: '/',
        destination: '/recipes',
        permanent: true,
      },
    ]
  },

}

export default nextConfig;
