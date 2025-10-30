'use client'

import { motion } from 'framer-motion'
import { Card, CardBody } from '@heroui/react'
import { Layers, Lock, Shield, Zap, Network, Server } from 'lucide-react'

const architectureComponents = [
  {
    icon: Server,
    title: 'Core Server',
    description: 'Written in modern C23, providing high performance and low resource usage',
    features: ['Modular design', 'Event-driven architecture', 'Multi-threaded support'],
  },
  {
    icon: Lock,
    title: 'wolfSSL/wolfCrypt',
    description: 'Enterprise-grade cryptography with wolfSSL for maximum security',
    features: ['TLS 1.3 / DTLS 1.3', 'Hardware acceleration', 'Post-quantum ready'],
  },
  {
    icon: Shield,
    title: 'wolfSentry IDPS',
    description: 'Integrated intrusion detection and prevention system',
    features: ['Real-time threat detection', 'IP filtering', 'Rate limiting'],
  },
  {
    icon: Network,
    title: 'Cisco Protocol',
    description: 'Full AnyConnect SSL VPN protocol implementation',
    features: ['Certificate auth', 'DTLS transport', 'Split tunneling'],
  },
]

export function Architecture() {
  return (
    <motion.section
      className="mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-8">Technical Architecture</h2>

      <Card className="mb-8">
        <CardBody className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-lg bg-primary/10">
              <Layers className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Modular Design</h3>
              <p className="text-muted-foreground leading-relaxed">
                WolfGuard is built with a clean, modular architecture that separates concerns
                and enables independent development, testing, and optimization of each component.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {architectureComponents.map((component, index) => {
              const Icon = component.icon
              return (
                <motion.div
                  key={component.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded bg-primary/10">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-bold text-lg">{component.title}</h4>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    {component.description}
                  </p>
                  <ul className="space-y-1">
                    {component.features.map((feature) => (
                      <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </CardBody>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold">Performance</h3>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Optimized for high throughput and low latency:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong className="text-foreground">Zero-copy networking:</strong> Minimized data copying</li>
              <li>• <strong className="text-foreground">Hardware acceleration:</strong> AES-NI, AVX support</li>
              <li>• <strong className="text-foreground">Efficient TLS:</strong> wolfSSL optimizations</li>
              <li>• <strong className="text-foreground">Low memory footprint:</strong> \u003C50MB typical usage</li>
            </ul>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Network className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold">Protocol Stack</h3>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Complete implementation of AnyConnect protocol:
            </p>
            <div className="space-y-3">
              <div className="border-l-2 border-primary/30 pl-4">
                <p className="text-sm font-semibold">Control Channel (TLS 1.3)</p>
                <p className="text-xs text-muted-foreground">Authentication, configuration, keepalive</p>
              </div>
              <div className="border-l-2 border-primary/30 pl-4">
                <p className="text-sm font-semibold">Data Channel (DTLS 1.3)</p>
                <p className="text-xs text-muted-foreground">Encrypted VPN traffic, UDP transport</p>
              </div>
              <div className="border-l-2 border-primary/30 pl-4">
                <p className="text-sm font-semibold">Tunneling Layer</p>
                <p className="text-xs text-muted-foreground">IP packet encapsulation, routing</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card className="mt-6">
        <CardBody className="p-8">
          <h3 className="text-xl font-bold mb-4">Security-First Design</h3>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Every architectural decision in WolfGuard prioritizes security without
              compromising performance:
            </p>
            <ul className="space-y-2 pl-6">
              <li>
                <strong className="text-foreground">Memory Safety:</strong> Strict bounds
                checking, safe string handling, no unsafe operations
              </li>
              <li>
                <strong className="text-foreground">Privilege Separation:</strong> Worker
                processes drop privileges after initialization
              </li>
              <li>
                <strong className="text-foreground">Defense in Depth:</strong> Multiple layers
                of security validation (wolfSentry, protocol checks, input validation)
              </li>
              <li>
                <strong className="text-foreground">Secure Defaults:</strong> Strong cipher
                suites, perfect forward secrecy enabled by default
              </li>
            </ul>
          </div>
        </CardBody>
      </Card>
    </motion.section>
  )
}
