import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

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

export const metadata: Metadata = {
  title: {
    default: 'WolfGuard - Secure VPN Server',
    template: '%s | WolfGuard',
  },
  description:
    'WolfGuard is an open-source VPN server with TLS 1.3/DTLS 1.3 support, compatible with Cisco Secure Client (AnyConnect). Built with wolfSSL for enterprise-grade security.',
  keywords: [
    'vpn server',
    'TLS 1.3',
    'DTLS 1.3',
    'Cisco AnyConnect',
    'wolfSSL',
    'cybersecurity',
    'open source',
    'VPN',
    'secure connection',
    'wolfSentry',
  ],
  authors: [{ name: 'WolfGuard Team' }],
  creator: 'WolfGuard Team',
  publisher: 'WolfGuard',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://wolfguard.io',
    title: 'WolfGuard - Secure VPN Server',
    description: 'Open-source VPN server with TLS 1.3 and Cisco Secure Client support',
    siteName: 'WolfGuard',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WolfGuard - Secure VPN Server',
    description: 'Open-source VPN server with TLS 1.3 and Cisco Secure Client support',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
