'use client'

import { motion } from 'framer-motion'
import { Card, CardBody } from '@heroui/react'
import { CheckCircle2, Network, Shield, Zap, Lock, Globe, Container } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const compatibilityHighlights = [
  {
    icon: CheckCircle2,
    title: 'Full Cisco Compatibility',
    description: 'Drop-in replacement for Cisco AnyConnect Server with complete protocol support',
  },
  {
    icon: Network,
    title: 'Open Standards',
    description: 'Works with any AnyConnect-compatible client implementation',
  },
  {
    icon: Shield,
    title: 'Modern Protocols',
    description: 'TLS 1.3 and DTLS 1.3 support for enhanced security',
  },
  {
    icon: Zap,
    title: 'High Performance',
    description: 'Optimized with wolfSSL for minimal overhead and maximum throughput',
  },
  {
    icon: Lock,
    title: 'FIPS Certified',
    description: 'wolfSSL FIPS 140-3 certified cryptography for compliance requirements',
  },
  {
    icon: Globe,
    title: 'Cross-Platform',
    description: 'Linux, Windows, macOS support with consistent functionality',
  },
  {
    icon: Container,
    title: 'Container Ready',
    description: 'Docker and Podman support with official container images for easy deployment',
  },
]

export function CompatibilityOverview() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="space-y-12"
    >
      {/* Header */}
      <motion.div variants={fadeInUp} className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
          Client Compatibility
        </h1>
        <p className="text-lg text-default-600 max-w-3xl mx-auto">
          WolfGuard implements the industry-standard AnyConnect protocol, ensuring compatibility
          with existing VPN clients while adding modern security features.
        </p>
      </motion.div>

      {/* Compatibility Highlights - 2x3 grid */}
      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {compatibilityHighlights.map((item) => (
          <motion.div key={item.title} variants={fadeInUp}>
            <Card className="h-full bg-background/60 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300">
              <CardBody className="p-6 space-y-3 text-center">
                <div className="inline-flex p-3 bg-primary/10 rounded-lg">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-default-600">{item.description}</p>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Protocol Information */}
      <motion.div variants={fadeInUp}>
        <Card className="bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/20">
          <CardBody className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">AnyConnect Protocol Support</h2>
            <p className="text-default-700 mb-4">
              WolfGuard implements the Cisco AnyConnect SSL VPN protocol, providing full
              compatibility with official and third-party clients. The server supports both the TLS
              control channel and DTLS data channel for optimal performance.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-default-600">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>
                    <strong>TLS 1.3</strong> for control channel
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>
                    <strong>DTLS 1.3</strong> for data channel
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Certificate and password authentication</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>IPv4 and IPv6 tunneling</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Split tunneling configuration</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>DNS and routing policy distribution</span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </motion.div>
  )
}
