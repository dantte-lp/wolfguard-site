import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { siteConfig, generateMetadata, pageMetadata } from '@/lib/metadata'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

// Enhanced SEO metadata using centralized configuration
export const metadata: Metadata = {
  ...generateMetadata(pageMetadata.home),
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'WolfGuard - Secure VPN Server',
    template: '%s | WolfGuard',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: 'TODO', // TODO: Add Google Search Console verification
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.svg', sizes: '192x192', type: 'image/svg+xml' },
      { url: '/icon-512.svg', sizes: '512x512', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.svg', sizes: '180x180', type: 'image/svg+xml' }],
    other: [
      {
        rel: 'mask-icon',
        url: '/logo.svg',
        color: '#6b21ff',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'WolfGuard',
              description: siteConfig.description,
              url: siteConfig.url,
              inLanguage: 'en-US',
              publisher: {
                '@type': 'Organization',
                name: 'WolfGuard Team',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'WolfGuard VPN Server',
              applicationCategory: 'SecurityApplication',
              operatingSystem: 'Linux, Windows, macOS, BSD',
              description:
                'Open-source VPN server with TLS 1.3/DTLS 1.3 support, compatible with Cisco Secure Client',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              downloadUrl: 'https://github.com/dantte-lp/wolfguard',
              url: siteConfig.url,
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col">
        <Providers>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
