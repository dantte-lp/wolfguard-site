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
    icon: Shield,
    title: 'DTLS 1.3 Support',
    description:
      'Next-generation datagram protocol for secure UDP VPN connections - not available in current Cisco clients',
    highlight: true,
  },
  {
    icon: Zap,
    title: 'QUIC Protocol',
    description:
      'Modern transport protocol combining TCP reliability with UDP performance for superior VPN experience',
    highlight: true,
  },
  {
    icon: Monitor,
    title: 'Cross-Platform Desktop',
    description: 'Native applications for Windows, macOS, and Linux with consistent UI/UX',
    highlight: false,
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'iOS and Android applications with platform-specific features and optimizations',
    highlight: false,
  },
  {
    icon: Palette,
    title: 'Modern Qt6 UI',
    description: 'Clean, intuitive interface with native look and feel on each platform',
    highlight: false,
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
          The official WolfGuard VPN client is currently under development. It will unlock the full
          potential of WolfGuard server with support for <strong>DTLS 1.3</strong> and{' '}
          <strong>QUIC protocol</strong> - modern features that current Cisco clients cannot
          provide.
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
              <h3 className="text-2xl font-bold text-foreground">
                Unlock Full Server Capabilities
              </h3>
              <p className="text-default-700">
                WolfGuard Connect will be a modern, open-source VPN client built with C++ and Qt6,
                unlocking advanced protocols that legacy clients cannot support:
              </p>
              <div className="space-y-2 mt-4">
                <div className="flex items-start gap-3 text-sm">
                  <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground">DTLS 1.3:</strong>{' '}
                    <span className="text-default-600">
                      Faster handshakes, improved security, and better performance for UDP
                      connections
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-foreground">QUIC Protocol:</strong>{' '}
                    <span className="text-default-600">
                      Next-generation transport combining TCP reliability with UDP speed - ideal for
                      mobile and unstable networks
                    </span>
                  </div>
                </div>
              </div>
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
      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-foreground">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plannedFeatures.map((feature) => (
            <Card
              key={feature.title}
              className={
                feature.highlight
                  ? 'bg-gradient-to-br from-primary/10 to-purple-500/10 border-2 border-primary/40'
                  : 'bg-background/60 backdrop-blur-sm border border-border'
              }
            >
              <CardBody className="p-6 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-primary/10 rounded-lg w-fit">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  {feature.highlight && (
                    <Chip color="primary" variant="flat" size="sm">
                      Modern
                    </Chip>
                  )}
                </div>
                <h4 className="text-lg font-semibold text-foreground">{feature.title}</h4>
                <p className="text-sm text-default-600">{feature.description}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Protocol Comparison */}
      <Card className="bg-background/60 backdrop-blur-sm border border-border">
        <CardBody className="p-8 space-y-6">
          <h3 className="text-2xl font-bold text-foreground">Protocol Advantage</h3>
          <p className="text-default-700">
            WolfGuard Connect will support next-generation protocols that provide significant
            advantages over legacy implementations:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Protocol</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">
                    Cisco Clients
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">
                    WolfGuard Connect
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Benefit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="py-3 px-4 font-medium text-default-700">TLS (TCP)</td>
                  <td className="py-3 px-4 text-default-600">1.3 (v5.x), 1.2 (v4.x)</td>
                  <td className="py-3 px-4">
                    <Chip color="success" variant="flat" size="sm">
                      TLS 1.3
                    </Chip>
                  </td>
                  <td className="py-3 px-4 text-default-600">Faster handshakes</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-default-700">DTLS (UDP)</td>
                  <td className="py-3 px-4 text-default-600">1.2 only</td>
                  <td className="py-3 px-4">
                    <Chip color="primary" variant="flat" size="sm">
                      DTLS 1.3
                    </Chip>
                  </td>
                  <td className="py-3 px-4 text-default-600">Better performance, security</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-default-700">QUIC</td>
                  <td className="py-3 px-4 text-default-600">Not supported</td>
                  <td className="py-3 px-4">
                    <Chip color="primary" variant="flat" size="sm">
                      Supported
                    </Chip>
                  </td>
                  <td className="py-3 px-4 text-default-600">Mobile optimization, 0-RTT</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <p className="text-sm text-default-700">
              <strong>Why this matters:</strong> DTLS 1.3 and QUIC provide faster connection
              establishment, improved security, and better performance on unreliable networks -
              making them ideal for modern VPN deployments, especially on mobile devices.
            </p>
          </div>
        </CardBody>
      </Card>

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
                  Basic VPN connection with DTLS 1.3 and QUIC support, authentication, tunnel
                  management
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-default-300 mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-foreground">Phase 2: Platform Integration</p>
                <p className="text-sm text-default-600 mt-1">
                  Native OS integration, system tray, auto-connect features, network detection
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-default-300 mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-foreground">Phase 3: Advanced Features</p>
                <p className="text-sm text-default-600 mt-1">
                  Split tunneling, connection profiles, diagnostics tools, performance monitoring
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-default-300 mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-foreground">Phase 4: Mobile Clients</p>
                <p className="text-sm text-default-600 mt-1">
                  iOS and Android applications with QUIC optimization for mobile networks
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
