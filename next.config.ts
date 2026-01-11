import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb', // PASTIKAN INI ADA
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ahmadfauzaan.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'www.ahmadfauzaan.com',
        pathname: '/uploads/**',
      },
    ],
  },
}

export default nextConfig