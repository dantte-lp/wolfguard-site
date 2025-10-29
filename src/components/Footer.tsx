import React from 'react';
import { Link } from '@heroui/react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-divider bg-content1">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="font-bold text-xl text-foreground">WolfGuard</span>
            </div>
            <p className="text-sm text-foreground/60 leading-relaxed">
              Modern OpenConnect VPN Server built with C23, WolfSSL, and DTLS 1.3.
            </p>
          </div>

          {/* Project Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Project</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://github.com/dantte-lp/wolfguard"
                  color="foreground"
                  className="text-sm hover:text-primary transition-colors"
                  isExternal
                >
                  GitHub Repository
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  color="foreground"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/dantte-lp/wolfguard/releases"
                  color="foreground"
                  className="text-sm hover:text-primary transition-colors"
                  isExternal
                >
                  Releases
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/dantte-lp/wolfguard/blob/main/CHANGELOG.md"
                  color="foreground"
                  className="text-sm hover:text-primary transition-colors"
                  isExternal
                >
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://github.com/dantte-lp/wolfguard/issues"
                  color="foreground"
                  className="text-sm hover:text-primary transition-colors"
                  isExternal
                >
                  Issues
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/dantte-lp/wolfguard/discussions"
                  color="foreground"
                  className="text-sm hover:text-primary transition-colors"
                  isExternal
                >
                  Discussions
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/dantte-lp/wolfguard/pulls"
                  color="foreground"
                  className="text-sm hover:text-primary transition-colors"
                  isExternal
                >
                  Pull Requests
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/dantte-lp/wolfguard/blob/main/CONTRIBUTING.md"
                  color="foreground"
                  className="text-sm hover:text-primary transition-colors"
                  isExternal
                >
                  Contributing
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://www.wolfssl.com/"
                  color="foreground"
                  className="text-sm hover:text-primary transition-colors"
                  isExternal
                >
                  WolfSSL
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.infradead.org/openconnect/"
                  color="foreground"
                  className="text-sm hover:text-primary transition-colors"
                  isExternal
                >
                  OpenConnect
                </Link>
              </li>
              <li>
                <Link
                  href="https://datatracker.ietf.org/doc/html/rfc9147"
                  color="foreground"
                  className="text-sm hover:text-primary transition-colors"
                  isExternal
                >
                  DTLS 1.3 RFC
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.cisco.com/c/en/us/products/security/secure-client/index.html"
                  color="foreground"
                  className="text-sm hover:text-primary transition-colors"
                  isExternal
                >
                  Cisco Secure Client
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-divider">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-foreground/60">
              © {currentYear} WolfGuard. Open source software licensed under MIT.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="https://github.com/dantte-lp/wolfguard/blob/main/LICENSE"
                color="foreground"
                className="text-sm hover:text-primary transition-colors"
                isExternal
              >
                License
              </Link>
              <Link
                href="https://github.com/dantte-lp/wolfguard/blob/main/README.md"
                color="foreground"
                className="text-sm hover:text-primary transition-colors"
                isExternal
              >
                README
              </Link>
              <Link
                href="https://github.com/dantte-lp"
                color="foreground"
                className="text-sm hover:text-primary transition-colors"
                isExternal
                aria-label="GitHub Profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
