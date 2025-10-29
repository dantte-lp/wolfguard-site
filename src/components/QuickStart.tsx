import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Button, Tabs, Tab } from '@heroui/react';

export const QuickStart: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const installCommands = {
    debian: `# Clone the repository
git clone https://github.com/dantte-lp/wolfguard.git
cd wolfguard

# Install dependencies
sudo apt-get update
sudo apt-get install build-essential libwolfssl-dev

# Build and install
make
sudo make install`,

    rhel: `# Clone the repository
git clone https://github.com/dantte-lp/wolfguard.git
cd wolfguard

# Install dependencies
sudo dnf install gcc make wolfssl-devel

# Build and install
make
sudo make install`,

    arch: `# Clone the repository
git clone https://github.com/dantte-lp/wolfguard.git
cd wolfguard

# Install dependencies
sudo pacman -S base-devel wolfssl

# Build and install
make
sudo make install`,
  };

  const configExample = `# Basic WolfGuard configuration
listen = 0.0.0.0:443
ipv4-network = 192.168.1.0/24
route = default

# Authentication
auth = certificate
ca-cert = /etc/wolfguard/ca.pem
server-cert = /etc/wolfguard/server.pem
server-key = /etc/wolfguard/server-key.pem

# Security
max-clients = 100
dpd = 90
mobile-dpd = 300

# DTLS settings
dtls = true
dtls-legacy = false`;

  return (
    <section id="quickstart" className="py-20 bg-gradient-to-br from-content1 to-content2">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Quick Start
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Get up and running with WolfGuard in minutes.
          </p>
        </div>

        <div className="grid gap-8">
          {/* Installation */}
          <Card className="shadow-xl">
            <CardHeader className="pb-4">
              <div>
                <h3 className="text-2xl font-bold text-foreground">Installation</h3>
                <p className="text-foreground/60 mt-1">Choose your Linux distribution</p>
              </div>
            </CardHeader>
            <CardBody>
              <Tabs
                aria-label="Installation options"
                color="primary"
                variant="underlined"
                classNames={{
                  tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                  cursor: "w-full bg-primary",
                  tab: "max-w-fit px-0 h-12",
                  tabContent: "group-data-[selected=true]:text-primary"
                }}
              >
                <Tab
                  key="debian"
                  title={
                    <div className="flex items-center space-x-2">
                      <span>Debian/Ubuntu</span>
                    </div>
                  }
                >
                  <div className="mt-4 relative">
                    <pre className="bg-content2 p-4 rounded-lg overflow-x-auto text-sm border border-divider">
                      <code className="text-foreground">{installCommands.debian}</code>
                    </pre>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      className="absolute top-2 right-2"
                      onPress={() => copyToClipboard(installCommands.debian, 'debian')}
                    >
                      {copied === 'debian' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                      )}
                    </Button>
                  </div>
                </Tab>

                <Tab
                  key="rhel"
                  title={
                    <div className="flex items-center space-x-2">
                      <span>RHEL/Fedora</span>
                    </div>
                  }
                >
                  <div className="mt-4 relative">
                    <pre className="bg-content2 p-4 rounded-lg overflow-x-auto text-sm border border-divider">
                      <code className="text-foreground">{installCommands.rhel}</code>
                    </pre>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      className="absolute top-2 right-2"
                      onPress={() => copyToClipboard(installCommands.rhel, 'rhel')}
                    >
                      {copied === 'rhel' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                      )}
                    </Button>
                  </div>
                </Tab>

                <Tab
                  key="arch"
                  title={
                    <div className="flex items-center space-x-2">
                      <span>Arch Linux</span>
                    </div>
                  }
                >
                  <div className="mt-4 relative">
                    <pre className="bg-content2 p-4 rounded-lg overflow-x-auto text-sm border border-divider">
                      <code className="text-foreground">{installCommands.arch}</code>
                    </pre>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      className="absolute top-2 right-2"
                      onPress={() => copyToClipboard(installCommands.arch, 'arch')}
                    >
                      {copied === 'arch' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                      )}
                    </Button>
                  </div>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>

          {/* Configuration Example */}
          <Card className="shadow-xl">
            <CardHeader className="pb-4">
              <div>
                <h3 className="text-2xl font-bold text-foreground">Basic Configuration</h3>
                <p className="text-foreground/60 mt-1">Example configuration file</p>
              </div>
            </CardHeader>
            <CardBody>
              <div className="relative">
                <pre className="bg-content2 p-4 rounded-lg overflow-x-auto text-sm border border-divider">
                  <code className="text-foreground">{configExample}</code>
                </pre>
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  className="absolute top-2 right-2"
                  onPress={() => copyToClipboard(configExample, 'config')}
                >
                  {copied === 'config' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  )}
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* Next Steps */}
          <Card className="shadow-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20">
            <CardBody className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    Need More Help?
                  </h3>
                  <p className="text-foreground/70 mb-4">
                    For detailed documentation, advanced configuration options, and troubleshooting guides,
                    visit our comprehensive documentation.
                  </p>
                  <Button
                    color="primary"
                    variant="flat"
                    className="font-semibold"
                  >
                    View Full Documentation
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
};
