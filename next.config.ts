import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* Essential Next.js configuration */
  reactStrictMode: true,

  /* Image optimization - external domains if needed */
  images: {
    remotePatterns: [],
  },

  /* Production optimizations */
  compress: true,

  /* TypeScript */
  typescript: {
    ignoreBuildErrors: false,
  },

  /* Security Headers for development */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: process.env.NODE_ENV === 'development'
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
