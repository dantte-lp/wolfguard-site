import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* Essential Next.js configuration */
  reactStrictMode: true,

  /* Image optimization - external domains if needed */
  images: {
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  /* Production optimizations */
  compress: true,
  poweredByHeader: false,

  /* Performance optimizations */
  swcMinify: true,
  productionBrowserSourceMaps: false,

  /* TypeScript */
  typescript: {
    ignoreBuildErrors: false,
  },

  /* Experimental features for better performance */
  experimental: {
    optimizePackageImports: ['@heroui/react', 'lucide-react', 'framer-motion'],
  },

  /* Security Headers for development */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              process.env.NODE_ENV === 'development'
                ? [
                    "default-src 'self'",
                    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
                    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                    "img-src 'self' data: https: blob:",
                    "font-src 'self' data: https://fonts.gstatic.com",
                    "connect-src 'self' ws: wss: https:",
                    "frame-ancestors 'self'",
                    "base-uri 'self'",
                    "form-action 'self'",
                  ].join('; ')
                : [
                    "default-src 'self'",
                    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
                    "style-src 'self' 'unsafe-inline'",
                    "img-src 'self' data: https:",
                    "font-src 'self' data:",
                    "connect-src 'self'",
                    "frame-ancestors 'self'",
                    "base-uri 'self'",
                    "form-action 'self'",
                  ].join('; '),
          },
        ],
      },
    ]
  },
}

export default nextConfig
