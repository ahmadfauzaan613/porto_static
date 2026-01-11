/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Next.js 15/16: Settingan ini WAJIB di Root (Luar experimental)
  serverActions: {
    bodySizeLimit: '50mb',
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
};

export default nextConfig;