import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    remotePatterns: process.env.SUPABASE_PROJECT_HOST
      ? [
          {
            protocol: 'https',
            hostname: process.env.SUPABASE_PROJECT_HOST,
            pathname: '/storage/v1/object/public/**',
          },
        ]
      : [],
  },
}

export default nextConfig
