import { Metadata } from 'next'

/**
 * SEO Configuration for WolfGuard Website
 * According to Technical Specifications Section: SEO и метаданные
 */

export const siteConfig = {
  name: 'WolfGuard',
  description:
    'WolfGuard is an open-source VPN server (TLS 1.3/DTLS 1.3) compatible with Cisco Secure Client. Installation guides, documentation, and community resources.',
  url: 'https://wolfguard.io',
  ogImage: '/og-image.png', // TODO: Create OG image (1200x630px)
  keywords: [
    'vpn server',
    'TLS 1.3',
    'DTLS 1.3',
    'Cisco AnyConnect',
    'Cisco Secure Client',
    'wolfSSL',
    'wolfSentry',
    'cybersecurity',
    'open source vpn',
    'secure vpn',
    'anyconnect compatible',
    'VPN protocol',
    'network security',
    'IDPS',
    'C23',
  ],
  authors: [{ name: 'WolfGuard Team', url: 'https://github.com/dantte-lp' }],
  creator: 'WolfGuard Team',
  twitter: {
    handle: '@wolfguard',
    site: '@wolfguard',
    cardType: 'summary_large_image',
  },
}

export interface PageSEO {
  title: string
  description: string
  path: string
  keywords?: string[]
  ogType?: 'website' | 'article'
}

/**
 * Generate comprehensive metadata for a page
 * Includes: title, description, Open Graph, Twitter Cards, canonical URL
 */
export function generateMetadata({
  title,
  description,
  path,
  keywords = [],
  ogType = 'website',
}: PageSEO): Metadata {
  const url = `${siteConfig.url}${path}`
  const fullTitle = title.includes('WolfGuard') ? title : `${title} | WolfGuard`

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    publisher: siteConfig.name,

    // Canonical URL
    alternates: {
      canonical: url,
    },

    // Open Graph
    openGraph: {
      type: ogType,
      locale: 'en_US',
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - ${title}`,
        },
      ],
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: siteConfig.twitter.handle,
      site: siteConfig.twitter.site,
      images: [siteConfig.ogImage],
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

/**
 * Page-specific SEO configurations
 * Each page has unique title, description, and keywords
 */
export const pageMetadata = {
  home: {
    title: 'WolfGuard - Secure VPN Server',
    description:
      'WolfGuard is an open-source VPN server (TLS 1.3/DTLS 1.3) compatible with Cisco Secure Client. Installation guides, documentation, and community resources.',
    path: '/',
    keywords: ['home', 'vpn solution', 'secure networking'],
  },

  about: {
    title: 'About',
    description:
      'Learn about WolfGuard VPN Server - our mission, architecture, history, and open-source philosophy. Built with wolfSSL and wolfSentry for enterprise-grade security.',
    path: '/about',
    keywords: [
      'about wolfguard',
      'project history',
      'architecture',
      'mission',
      'open source philosophy',
    ],
  },

  installation: {
    title: 'Installation',
    description:
      'Install WolfGuard VPN Server on Linux, Windows, macOS, or using containers (Podman/Docker). Step-by-step installation guides with systemd integration and security hardening.',
    path: '/installation',
    keywords: [
      'install',
      'setup',
      'deployment',
      'linux',
      'container',
      'podman',
      'docker',
      'systemd',
      'configuration',
    ],
  },

  documentation: {
    title: 'Documentation',
    description:
      'Complete technical documentation for WolfGuard VPN Server. Architecture guides, API reference, configuration options, user guides, and troubleshooting resources.',
    path: '/documentation',
    keywords: [
      'docs',
      'documentation',
      'api',
      'reference',
      'user guide',
      'technical docs',
      'configuration',
      'troubleshooting',
    ],
  },

  compatibility: {
    title: 'Compatibility',
    description:
      'WolfGuard VPN Server compatibility with Cisco Secure Client (AnyConnect), OpenConnect, and other AnyConnect-compatible VPN clients. Multi-platform support.',
    path: '/compatibility',
    keywords: [
      'compatibility',
      'cisco client',
      'anyconnect',
      'openconnect',
      'vpn clients',
      'supported platforms',
      'client support',
    ],
  },

  contribute: {
    title: 'Contribute',
    description:
      'Join the WolfGuard community. Contribute code, report bugs, improve documentation, and help build a secure, modern VPN solution. Open source and welcoming to all skill levels.',
    path: '/contribute',
    keywords: [
      'contribute',
      'community',
      'open source',
      'development',
      'github',
      'pull requests',
      'issues',
      'collaboration',
    ],
  },
}

/**
 * JSON-LD Structured Data for Organization
 * Helps search engines understand the WolfGuard project
 */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'WolfGuard',
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.svg`,
  sameAs: ['https://github.com/dantte-lp/wolfguard', 'https://github.com/dantte-lp/wolfguard-site'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Community Support',
    url: 'https://github.com/dantte-lp/wolfguard/discussions',
  },
}

/**
 * JSON-LD Structured Data for Software Application
 * Describes WolfGuard VPN Server as a software product
 */
export const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'WolfGuard VPN Server',
  applicationCategory: 'SecurityApplication',
  operatingSystem: 'Linux, Windows, macOS, BSD',
  softwareVersion: '1.0.0', // TODO: Make dynamic from package.json or git tags
  description:
    'Open-source VPN server with TLS 1.3/DTLS 1.3 support, compatible with Cisco Secure Client',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  downloadUrl: 'https://github.com/dantte-lp/wolfguard',
  url: siteConfig.url,
  author: {
    '@type': 'Organization',
    name: 'WolfGuard Team',
  },
  license: 'https://opensource.org/licenses/GPL-3.0',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    ratingCount: '1',
  },
}

/**
 * JSON-LD Structured Data for Website
 * Provides search engines with site-wide information
 */
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  inLanguage: 'en-US',
  publisher: {
    '@type': 'Organization',
    name: 'WolfGuard Team',
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/logo.svg`,
    },
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteConfig.url}/documentation?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}
