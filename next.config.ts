import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // 1. Atur Limit Upload agar tidak error "Body exceeded 1 MB limit"
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb', // Disamakan dengan settingan Nginx
    },
  },

  // 2. Izin akses gambar (Hanya untuk domain sendiri)
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
    // Opsional: Jika gambar terasa lambat/error saat di-load, uncomment baris bawah ini
     unoptimized: true, 
  },
}

export default nextConfig