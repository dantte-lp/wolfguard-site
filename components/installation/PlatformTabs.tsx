'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Tabs, Tab, Card, CardBody } from '@heroui/react'
import { Monitor, Package, Apple, Container } from 'lucide-react'

export function PlatformTabs() {
  const [selected, setSelected] = useState('linux')

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Tabs
        aria-label="Installation platforms"
        selectedKey={selected}
        onSelectionChange={(key) => setSelected(key as string)}
        color="primary"
        variant="underlined"
        classNames={{
          tabList: 'gap-6 w-full',
          cursor: 'w-full bg-primary',
          tab: 'max-w-fit px-4 h-12',
          tabContent: 'group-data-[selected=true]:text-primary',
        }}
      >
        <Tab
          key="linux"
          title={
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              <span className="font-semibold">Linux</span>
            </div>
          }
        >
          <Card className="mt-6">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold mb-4">Linux Installation</h2>
              <div className="space-y-6 text-muted-foreground">
                <p className="leading-relaxed">
                  Linux installation instructions will be added here. This will include:
                </p>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>System requirements and dependencies</li>
                  <li>Building from source with CMake/Make</li>
                  <li>Configuration file setup</li>
                  <li>Systemd service configuration</li>
                  <li>Firewall and port configuration</li>
                  <li>Testing the installation</li>
                </ul>
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-foreground font-semibold mb-2">
                    🚧 Coming Soon
                  </p>
                  <p className="text-sm">
                    Detailed installation instructions are currently being prepared. For
                    now, please refer to the{' '}
                    <a
                      href="https://github.com/dantte-lp/wolfguard"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub repository
                    </a>{' '}
                    for build instructions.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>

        <Tab
          key="windows"
          title={
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="font-semibold">Windows</span>
            </div>
          }
        >
          <Card className="mt-6">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold mb-4">Windows Installation</h2>
              <div className="space-y-6 text-muted-foreground">
                <p className="leading-relaxed">
                  Windows installation instructions will be added here. This will include:
                </p>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>Build environment setup (MinGW/MSVC)</li>
                  <li>wolfSSL/wolfSentry compilation</li>
                  <li>WolfGuard server build process</li>
                  <li>Windows service configuration</li>
                  <li>Alternative: WSL2 installation guide</li>
                </ul>
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-foreground font-semibold mb-2">
                    🚧 Coming Soon
                  </p>
                  <p className="text-sm">
                    For Windows users, we recommend using WSL2 or the container-based
                    deployment until native Windows support is fully documented.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>

        <Tab
          key="macos"
          title={
            <div className="flex items-center gap-2">
              <Apple className="w-4 h-4" />
              <span className="font-semibold">macOS</span>
            </div>
          }
        >
          <Card className="mt-6">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold mb-4">macOS Installation</h2>
              <div className="space-y-6 text-muted-foreground">
                <p className="leading-relaxed">
                  macOS installation instructions will be added here. This will include:
                </p>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>Xcode and command-line tools setup</li>
                  <li>Homebrew dependencies installation</li>
                  <li>Building wolfSSL and wolfSentry</li>
                  <li>WolfGuard compilation and installation</li>
                  <li>TUN/TAP driver configuration</li>
                  <li>LaunchDaemon service setup</li>
                </ul>
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-foreground font-semibold mb-2">
                    🚧 Coming Soon
                  </p>
                  <p className="text-sm">
                    macOS support is planned. For now, consider using the Docker/Podman
                    container deployment method.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>

        <Tab
          key="container"
          title={
            <div className="flex items-center gap-2">
              <Container className="w-4 h-4" />
              <span className="font-semibold">Container</span>
            </div>
          }
        >
          <Card className="mt-6">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold mb-4">Container Deployment</h2>
              <div className="space-y-6 text-muted-foreground">
                <p className="leading-relaxed">
                  Deploy WolfGuard using Docker or Podman for easy installation and
                  management.
                </p>
                <p className="text-foreground font-semibold">
                  ✅ Recommended for Production
                </p>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>Quick start with pre-built container images</li>
                  <li>Easy updates and version management</li>
                  <li>Isolated environment with all dependencies</li>
                  <li>Production-ready with Podman Compose</li>
                  <li>Integration with reverse proxies (Traefik)</li>
                </ul>
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-foreground font-semibold mb-2">
                    🚧 Coming Soon
                  </p>
                  <p className="text-sm">
                    Container deployment guide with Podman Compose examples is being
                    prepared. Official container images will be published to GitHub
                    Container Registry.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </motion.section>
  )
}
