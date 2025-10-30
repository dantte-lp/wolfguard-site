import React from 'react';
import { Card, CardBody, Link, Button } from '@heroui/react';

interface LinkItem {
  title: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  external: boolean;
}

const links: LinkItem[] = [
  {
    title: 'GitHub Repository',
    description: 'View source code, contribute, and report issues on GitHub.',
    url: 'https://github.com/dantte-lp/wolfguard',
    external: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z" />
      </svg>
    ),
  },
  {
    title: 'Documentation',
    description: 'Comprehensive guides, API reference, and tutorials.',
    url: '#',
    external: false,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
    ),
  },
  {
    title: 'WolfSSL',
    description: 'Learn more about the WolfSSL cryptography library.',
    url: 'https://www.wolfssl.com/',
    external: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    ),
  },
  {
    title: 'OpenConnect Protocol',
    description: 'Information about the OpenConnect VPN protocol.',
    url: 'https://www.infradead.org/openconnect/',
    external: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    ),
  },
];

export const Links: React.FC = () => {
  return (
    <section id="links" className="py-24 bg-background" aria-labelledby="links-heading">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 id="links-heading" className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Resources & Links
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Explore additional resources, documentation, and related projects.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {links.map((link, index) => (
            <Card
              key={index}
              as={Link}
              href={link.url}
              isExternal={link.external}
              className="border-none bg-gradient-to-br from-content1 to-content2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <CardBody className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary flex-shrink-0">
                    {link.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-foreground">
                        {link.title}
                      </h3>
                      {link.external && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="flex-shrink-0 text-foreground/40"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      )}
                    </div>
                    <p className="text-foreground/70 leading-relaxed">
                      {link.description}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Community Section */}
        <div className="mt-12">
          <Card className="shadow-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20">
            <CardBody className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-3 text-foreground">
                Join the Community
              </h3>
              <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
                Contribute to WolfGuard, report issues, request features, or ask questions.
                We welcome contributions from developers of all skill levels.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  as={Link}
                  href="https://github.com/dantte-lp/wolfguard/issues"
                  color="primary"
                  variant="flat"
                  isExternal
                  className="font-semibold"
                  aria-label="Report an issue on GitHub"
                  startContent={
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  }
                >
                  Report an Issue
                </Button>
                <Button
                  as={Link}
                  href="https://github.com/dantte-lp/wolfguard/pulls"
                  variant="bordered"
                  isExternal
                  className="font-semibold border-2"
                  aria-label="Submit a pull request on GitHub"
                  startContent={
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="18" cy="18" r="3"></circle>
                      <circle cx="6" cy="6" r="3"></circle>
                      <path d="M13 6h3a2 2 0 0 1 2 2v7"></path>
                      <line x1="6" y1="9" x2="6" y2="21"></line>
                    </svg>
                  }
                >
                  Submit a PR
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
};
