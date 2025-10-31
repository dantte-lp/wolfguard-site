'use client'

import { motion } from 'framer-motion'
import { Card, CardBody, Button, Chip } from '@heroui/react'
import { ExternalLink, Terminal, Monitor, Smartphone, CheckCircle2 } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: 0.4 },
}

const alternativeClients = [
  {
    name: 'OpenConnect',
    platform: 'Linux, macOS, Windows, BSD',
    type: 'CLI & GUI',
    icon: Terminal,
    description: 'Open-source AnyConnect-compatible client with excellent Linux support',
    features: [
      'Command-line interface',
      'NetworkManager GUI integration (Linux)',
      'macOS Tunnelblick support',
      'Full protocol compatibility',
      'OTP support via --token-mode',
    ],
    status: 'Recommended',
    statusColor: 'success' as const,
    website: 'https://www.infradead.org/openconnect/',
    installation: {
      ubuntu: 'sudo apt install openconnect',
      fedora: 'sudo dnf install openconnect',
      macos: 'brew install openconnect',
    },
  },
  {
    name: 'OpenConnect GUI',
    platform: 'Windows, Linux',
    type: 'GUI',
    icon: Monitor,
    description: 'Graphical user interface for OpenConnect on Windows and Linux',
    features: [
      'Native Windows GUI',
      'Easy connection management',
      'Profile configuration',
      'System tray integration',
      'OTP/TOTP support',
    ],
    status: 'Supported',
    statusColor: 'primary' as const,
    website: 'https://openconnect.github.io/openconnect-gui/',
  },
  {
    name: 'NetworkManager OpenConnect',
    platform: 'Linux (GNOME, KDE)',
    type: 'GUI Plugin',
    icon: Monitor,
    description: 'NetworkManager plugin for seamless VPN integration in Linux desktop environments',
    features: [
      'Native desktop integration',
      'GNOME and KDE support',
      'Auto-connect on boot',
      'Connection profiles',
      'TOTP/HOTP configuration',
    ],
    status: 'Recommended',
    statusColor: 'success' as const,
    installation: {
      ubuntu: 'sudo apt install network-manager-openconnect-gnome',
      fedora: 'sudo dnf install NetworkManager-openconnect-gnome',
    },
  },
  {
    name: 'Mobile Clients',
    platform: 'iOS, Android',
    type: 'Mobile Apps',
    icon: Smartphone,
    description: 'Cisco Secure Client official mobile apps for iOS and Android',
    features: [
      'Native mobile experience',
      'Always-On VPN',
      'Per-app VPN (iOS)',
      'Trusted Network Detection',
    ],
    status: 'Supported',
    statusColor: 'primary' as const,
    website:
      'https://www.cisco.com/c/en/us/support/security/anyconnect-secure-mobility-client/series.html',
  },
]

export function AlternativeClients() {
  return (
    <motion.div {...fadeInUp} className="mt-16 space-y-8">
      {/* Section Header */}
      <div className="space-y-3">
        <h2 className="text-3xl font-bold text-foreground">Alternative VPN Clients</h2>
        <p className="text-default-600">
          WolfGuard works with any AnyConnect-compatible VPN client. Here are some popular
          open-source and third-party alternatives to Cisco Secure Client.
        </p>
      </div>

      {/* Client Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {alternativeClients.map((client) => (
          <Card
            key={client.name}
            className="bg-background/60 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300"
          >
            <CardBody className="p-6 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <client.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-foreground">{client.name}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-default-600">
                      <span>{client.platform}</span>
                      <span>•</span>
                      <span>{client.type}</span>
                    </div>
                  </div>
                </div>
                <Chip
                  color={client.statusColor}
                  variant="flat"
                  size="sm"
                  startContent={<CheckCircle2 className="w-3 h-3" />}
                >
                  {client.status}
                </Chip>
              </div>

              {/* Description */}
              <p className="text-default-700">{client.description}</p>

              {/* Features */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-default-700">Key Features:</p>
                <div className="grid grid-cols-1 gap-1">
                  {client.features.map((feature) => (
                    <div key={feature} className="text-sm text-default-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Installation */}
              {client.installation && (
                <div className="space-y-2 p-3 bg-default-50 rounded-lg">
                  <p className="text-sm font-medium text-default-700">Quick Install:</p>
                  <div className="space-y-1">
                    {Object.entries(client.installation).map(([os, cmd]) => (
                      <div key={os} className="space-y-1">
                        <p className="text-xs text-default-500 uppercase">{os}:</p>
                        <code className="block px-3 py-2 bg-default-100 rounded text-xs font-mono text-foreground overflow-x-auto">
                          {cmd}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Website Link */}
              {client.website && (
                <Button
                  as="a"
                  href={client.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="flat"
                  color="primary"
                  size="sm"
                  endContent={<ExternalLink className="w-3 h-3" />}
                  className="w-full"
                >
                  Official Website
                </Button>
              )}
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Compatibility Matrix */}
      <Card className="bg-background/60 backdrop-blur-sm border border-border">
        <CardBody className="p-8 space-y-6">
          <h3 className="text-2xl font-bold text-foreground">Compatibility Matrix</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Client</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">TLS 1.3</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">DTLS 1.3</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">
                    Certificate Auth
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">
                    Password Auth
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">OTP/2FA</th>
                </tr>
              </thead>
              <tbody className="text-default-700">
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">Cisco Secure Client 5.x</td>
                  <td className="text-center">
                    <CheckCircle2 className="w-5 h-5 text-success inline" />
                  </td>
                  <td className="text-center">
                    <CheckCircle2 className="w-5 h-5 text-success inline" />
                  </td>
                  <td className="text-center">
                    <CheckCircle2 className="w-5 h-5 text-success inline" />
                  </td>
                  <td className="text-center">
                    <CheckCircle2 className="w-5 h-5 text-success inline" />
                  </td>
                  <td className="text-center">
                    <CheckCircle2 className="w-5 h-5 text-success inline" />
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">OpenConnect 9.x</td>
                  <td className="text-center">
                    <CheckCircle2 className="w-5 h-5 text-success inline" />
                  </td>
                  <td className="text-center">
                    <CheckCircle2 className="w-5 h-5 text-success inline" />
                  </td>
                  <td className="text-center">
                    <CheckCircle2 className="w-5 h-5 text-success inline" />
                  </td>
                  <td className="text-center">
                    <CheckCircle2 className="w-5 h-5 text-success inline" />
                  </td>
                  <td className="text-center">
                    <CheckCircle2 className="w-5 h-5 text-success inline" />
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">NetworkManager Plugin</td>
                  <td className="text-center">
                    <CheckCircle2 className="w-5 h-5 text-success inline" />
                  </td>
                  <td className="text-center">
                    <CheckCircle2 className="w-5 h-5 text-success inline" />
                  </td>
                  <td className="text-center">
                    <CheckCircle2 className="w-5 h-5 text-success inline" />
                  </td>
                  <td className="text-center">
                    <CheckCircle2 className="w-5 h-5 text-success inline" />
                  </td>
                  <td className="text-center">
                    <CheckCircle2 className="w-5 h-5 text-success inline" />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4">OpenConnect GUI</td>
                  <td className="text-center">
                    <CheckCircle2 className="w-5 h-5 text-success inline" />
                  </td>
                  <td className="text-center">
                    <CheckCircle2 className="w-5 h-5 text-success inline" />
                  </td>
                  <td className="text-center">
                    <CheckCircle2 className="w-5 h-5 text-success inline" />
                  </td>
                  <td className="text-center">
                    <CheckCircle2 className="w-5 h-5 text-success inline" />
                  </td>
                  <td className="text-center">
                    <CheckCircle2 className="w-5 h-5 text-success inline" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="text-sm text-default-700">
              <strong>OTP/2FA Support:</strong> All clients support One-Time Password authentication
              via RADIUS integration. WolfGuard server can authenticate users using TOTP (Time-based
              One-Time Password) or HOTP (HMAC-based One-Time Password) tokens. Compatible with
              Google Authenticator, Microsoft Authenticator, Authy, and other RFC 6238/4226
              compliant authenticator apps.
            </p>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  )
}
