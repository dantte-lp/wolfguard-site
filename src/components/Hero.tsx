import React from 'react';
import { Button, Link, Chip, Card, CardBody } from '@heroui/react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-background to-secondary-50 dark:from-primary-900/10 dark:via-background dark:to-secondary-900/10">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <Chip
            color="primary"
            variant="flat"
            size="lg"
            className="mb-6"
            startContent={
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
            }
          >
            Modern OpenConnect VPN Server
          </Chip>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            WolfGuard
          </h1>

          <p className="text-xl md:text-2xl text-foreground/80 mb-4">
            Next-Generation VPN Server
          </p>

          <p className="text-lg text-foreground/60 mb-12 max-w-2xl mx-auto">
            Built with modern C23, powered by WolfSSL cryptography, featuring DTLS 1.3 support
            and full compatibility with Cisco Secure Client 5.x
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              as={Link}
              href="#quickstart"
              color="primary"
              size="lg"
              className="font-semibold min-w-[200px]"
              aria-label="Get started with WolfGuard"
            >
              Get Started
            </Button>

            <Button
              as={Link}
              href="https://github.com/dantte-lp/wolfguard"
              variant="bordered"
              size="lg"
              isExternal
              className="font-semibold min-w-[200px] border-2"
              aria-label="View WolfGuard on GitHub"
              startContent={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z" />
                </svg>
              }
            >
              View on GitHub
            </Button>

            <Button
              as={Link}
              href="#"
              variant="light"
              size="lg"
              className="font-semibold min-w-[200px]"
              aria-label="View WolfGuard documentation"
            >
              Documentation
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <Card className="shadow-md bg-content1/50 backdrop-blur-sm">
              <CardBody className="text-center py-6">
                <div className="text-3xl font-bold text-primary mb-2">C23</div>
                <div className="text-sm text-foreground/60">Modern C Standard</div>
              </CardBody>
            </Card>
            <Card className="shadow-md bg-content1/50 backdrop-blur-sm">
              <CardBody className="text-center py-6">
                <div className="text-3xl font-bold text-primary mb-2">DTLS 1.3</div>
                <div className="text-sm text-foreground/60">Latest Protocol</div>
              </CardBody>
            </Card>
            <Card className="shadow-md bg-content1/50 backdrop-blur-sm">
              <CardBody className="text-center py-6">
                <div className="text-3xl font-bold text-primary mb-2">WolfSSL</div>
                <div className="text-sm text-foreground/60">Secure Crypto</div>
              </CardBody>
            </Card>
            <Card className="shadow-md bg-content1/50 backdrop-blur-sm">
              <CardBody className="text-center py-6">
                <div className="text-3xl font-bold text-primary mb-2">5.x</div>
                <div className="text-sm text-foreground/60">Cisco Compatible</div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
