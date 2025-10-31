'use client'

import { motion } from 'framer-motion'
import { Card, CardBody, Button, Chip } from '@heroui/react'
import { Rocket, Github, Monitor, Smartphone, Zap, Shield, Palette } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: 0.5 },
}

const plannedFeatures = [
  {
    icon: Monitor,
    title: 'Cross-Platform Desktop',
    description: 'Native applications for Windows, macOS, and Linux',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'iOS and Android applications with platform-specific features',
  },
  {
    icon: Palette,
    title: 'Modern UI',
    description: 'Clean, intuitive interface built with Qt6 framework',
  },
  {
    icon: Zap,
    title: 'High Performance',
    description: 'Optimized C++ implementation for minimal resource usage',
  },
  {
    icon: Shield,
    title: 'Enhanced Security',
    description: 'Built-in security features and wolfSSL integration',
  },
]

export function WolfGuardConnect() {
  return (
    <motion.div {...fadeInUp} className="mt-16 space-y-8">
      {/* Section Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-bold text-foreground">WolfGuard Connect</h2>
          <Chip color="warning" variant="flat" startContent={<Rocket className="w-3 h-3" />}>
            In Development
          </Chip>
        </div>
        <p className="text-default-600">
          The official WolfGuard VPN client is currently under development. It will provide a
          native, cross-platform experience optimized specifically for WolfGuard servers.
        </p>
      </div>

      {/* Main Card */}
      <Card className="bg-gradient-to-br from-primary/10 to-purple-500/10 border-2 border-primary/30">
        <CardBody className="p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/20 rounded-xl">
              <Rocket className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1 space-y-3">
              <h3 className="text-2xl font-bold text-foreground">Native Client Coming Soon</h3>
              <p className="text-default-700">
                WolfGuard Connect will be a modern, open-source VPN client built with C++ and Qt6,
                providing first-class support for all WolfGuard server features while maintaining
                compatibility with other AnyConnect servers.
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="p-4 bg-background/60 rounded-lg space-y-2">
            <p className="text-sm font-semibold text-foreground">Technology Stack:</p>
            <div className="flex flex-wrap gap-2">
              <Chip variant="flat" size="sm">
                C++23
              </Chip>
              <Chip variant="flat" size="sm">
                Qt6
              </Chip>
              <Chip variant="flat" size="sm">
                wolfSSL
              </Chip>
              <Chip variant="flat" size="sm">
                Cross-Platform
              </Chip>
              <Chip variant="flat" size="sm">
                Open Source
              </Chip>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Planned Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plannedFeatures.map((feature) => (
          <Card
            key={feature.title}
            className="bg-background/60 backdrop-blur-sm border border-border"
          >
            <CardBody className="p-6 space-y-3">
              <div className="p-3 bg-primary/10 rounded-lg w-fit">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-foreground">{feature.title}</h4>
              <p className="text-sm text-default-600">{feature.description}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Development Timeline */}
      <Card className="bg-background/60 backdrop-blur-sm border border-border">
        <CardBody className="p-8 space-y-6">
          <h3 className="text-2xl font-bold text-foreground">Development Roadmap</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-foreground">Phase 1: Core Functionality</p>
                <p className="text-sm text-default-600 mt-1">
                  Basic VPN connection, authentication, and tunnel management
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-default-300 mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-foreground">Phase 2: Platform Integration</p>
                <p className="text-sm text-default-600 mt-1">
                  Native OS integration, system tray, auto-connect features
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-default-300 mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-foreground">Phase 3: Advanced Features</p>
                <p className="text-sm text-default-600 mt-1">
                  Split tunneling, connection profiles, diagnostics tools
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-default-300 mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-foreground">Phase 4: Mobile Clients</p>
                <p className="text-sm text-default-600 mt-1">
                  iOS and Android applications with mobile-specific features
                </p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Repository Information */}
      <Card className="bg-background/60 backdrop-blur-sm border border-border">
        <CardBody className="p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4 flex-1">
              <div className="p-2 bg-default-100 rounded-lg">
                <Github className="w-6 h-6 text-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Follow Development</h3>
                <p className="text-default-600">
                  The WolfGuard Connect client will be developed openly on GitHub. Watch the
                  repository to stay updated on progress, or contribute to development.
                </p>
              </div>
            </div>
            <Button
              as="a"
              href="https://github.com/dantte-lp/wolfguard-connect"
              target="_blank"
              rel="noopener noreferrer"
              variant="bordered"
              className="border-primary text-primary hover:bg-primary/10"
              startContent={<Github className="w-4 h-4" />}
            >
              View on GitHub
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Current Recommendations */}
      <Card className="bg-default-50 border border-default-200">
        <CardBody className="p-6">
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-foreground">In the Meantime</h4>
            <p className="text-sm text-default-700">
              While WolfGuard Connect is under development, we recommend using:
            </p>
            <ul className="space-y-2 text-sm text-default-600 pl-5">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>
                  <strong>OpenConnect</strong> for Linux and macOS users seeking an open-source
                  solution
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>
                  <strong>Cisco Secure Client</strong> for the most feature-complete experience
                  across all platforms
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>
                  <strong>NetworkManager OpenConnect Plugin</strong> for seamless Linux desktop
                  integration
                </span>
              </li>
            </ul>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  )
}
