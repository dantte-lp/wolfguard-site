'use client'

import { Link } from '@heroui/react'
import { ThemeAwareLogo } from './ThemeAwareLogo'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-border bg-background/50 backdrop-blur-md mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Project Info */}
          <div>
            <div className="mb-4">
              <ThemeAwareLogo width={150} height={36} className="h-9" />
            </div>
            <p className="text-sm text-muted-foreground">
              Open-source VPN server with TLS 1.3/DTLS 1.3 support, compatible with Cisco Secure
              Client.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/installation"
                  color="foreground"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Installation Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/documentation"
                  color="foreground"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/contribute"
                  color="foreground"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Contribute
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://github.com/dantte-lp/wolfguard"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="foreground"
                  className="text-sm hover:text-primary transition-colors"
                >
                  GitHub Repository
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/dantte-lp/wolfguard/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="foreground"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Issue Tracker
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.wolfssl.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="foreground"
                  className="text-sm hover:text-primary transition-colors"
                >
                  wolfSSL
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} WolfGuard. Licensed under GPLv3.
            </p>
            <p className="text-xs text-muted-foreground">
              Built with Next.js 15, React 19, and HeroUI 2.8.5
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
