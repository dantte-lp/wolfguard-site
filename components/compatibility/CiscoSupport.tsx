'use client'

import { motion } from 'framer-motion'
import { Card, CardBody, Chip, Button } from '@heroui/react'
import { Download, ExternalLink, CheckCircle2, Info } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: 0.3 },
}

const supportedVersions = [
  {
    version: '5.x',
    status: 'Fully Supported',
    features: ['TLS 1.3', 'DTLS 1.3', 'Certificate Auth', 'Password Auth'],
  },
  {
    version: '4.x',
    status: 'Supported',
    features: ['TLS 1.2+', 'DTLS 1.2', 'All Auth Methods'],
  },
]

const supportedFeatures = [
  'Multi-factor authentication (MFA)',
  'Certificate-based authentication',
  'Username/password authentication',
  'Client certificate validation',
  'Always-On VPN',
  'Trusted Network Detection',
  'Split tunneling and split DNS',
  'IPv4 and IPv6 dual-stack',
  'Compression (LZS, Deflate)',
  'Custom connection profiles',
]

export function CiscoSupport() {
  return (
    <motion.div {...fadeInUp} className="mt-16 space-y-8">
      {/* Section Header */}
      <div className="space-y-3">
        <h2 className="text-3xl font-bold text-foreground">Cisco Secure Client (AnyConnect)</h2>
        <p className="text-default-600">
          WolfGuard is fully compatible with Cisco Secure Client (formerly Cisco AnyConnect),
          allowing you to use the official client with your WolfGuard server deployment.
        </p>
      </div>

      {/* Supported Versions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {supportedVersions.map((version) => (
          <Card
            key={version.version}
            className="bg-background/60 backdrop-blur-sm border border-border"
          >
            <CardBody className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Version {version.version}
                  </h3>
                  <Chip
                    color={version.status === 'Fully Supported' ? 'success' : 'primary'}
                    variant="flat"
                    size="sm"
                    className="mt-2"
                  >
                    {version.status}
                  </Chip>
                </div>
                <CheckCircle2 className="w-6 h-6 text-success" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-default-700">Supported Features:</p>
                <div className="space-y-1">
                  {version.features.map((feature) => (
                    <div key={feature} className="text-sm text-default-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Features Grid */}
      <Card className="bg-background/60 backdrop-blur-sm border border-border">
        <CardBody className="p-8 space-y-6">
          <h3 className="text-2xl font-bold text-foreground">Supported Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            {supportedFeatures.map((feature) => (
              <div key={feature} className="flex items-start gap-3 text-default-700">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Download Information */}
      <Card className="bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/30">
        <CardBody className="p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold text-foreground">Get Cisco Secure Client</h3>
              </div>
              <p className="text-default-700">
                Download the official Cisco Secure Client (AnyConnect) from Cisco&apos;s website.
                The client is available for Windows, macOS, Linux, iOS, and Android.
              </p>
              <div className="flex items-start gap-2 text-sm text-default-600 bg-default-100 p-3 rounded-lg">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  You may need a Cisco account to download. Alternatively, some VPN providers offer
                  the client for download.
                </span>
              </div>
            </div>
            <Button
              as="a"
              href="https://www.cisco.com/c/en/us/support/security/anyconnect-secure-mobility-client/series.html"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              size="lg"
              endContent={<ExternalLink className="w-4 h-4" />}
            >
              Visit Cisco
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Configuration Example */}
      <Card className="bg-background/60 backdrop-blur-sm border border-border">
        <CardBody className="p-8 space-y-4">
          <h3 className="text-xl font-bold text-foreground">Connecting to WolfGuard</h3>
          <p className="text-default-700">
            To connect to your WolfGuard server using Cisco Secure Client:
          </p>
          <ol className="space-y-3 text-default-700 list-decimal list-inside">
            <li>Launch Cisco Secure Client (AnyConnect)</li>
            <li>
              Enter your WolfGuard server address (e.g.,{' '}
              <code className="px-2 py-1 bg-default-100 rounded text-sm font-mono text-primary">
                vpn.example.com
              </code>
              )
            </li>
            <li>Click Connect and accept the server certificate if prompted</li>
            <li>Enter your credentials (username/password or certificate as configured)</li>
            <li>The client will establish a secure VPN connection</li>
          </ol>
          <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="text-sm text-default-700">
              <strong>Note:</strong> WolfGuard supports the same connection profiles and
              configuration options as Cisco AnyConnect Server, so existing client configurations
              will work without modification.
            </p>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  )
}
