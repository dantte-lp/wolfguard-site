'use client'

import { motion } from 'framer-motion'
import { Card, CardBody, Chip } from '@heroui/react'

export function AboutOverview() {
  return (
    <motion.section
      className="mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About <span className="text-foreground">Wolf</span>
          <span className="text-primary">Guard</span>
        </h1>
        <div className="flex flex-wrap gap-2 mb-6">
          <Chip color="primary" variant="flat">
            Version 1.0.0-alpha
          </Chip>
          <Chip color="success" variant="flat">
            GPLv3 License
          </Chip>
          <Chip color="secondary" variant="flat">
            Active Development
          </Chip>
        </div>
      </div>

      <Card>
        <CardBody className="p-8">
          <h2 className="text-2xl font-bold mb-4">Mission & Goals</h2>
          <div className="space-y-4 text-muted-foreground">
            <p className="text-lg leading-relaxed">
              WolfGuard aims to provide an{' '}
              <strong className="text-foreground">enterprise-grade, open-source VPN server</strong>{' '}
              that combines modern cryptographic standards with compatibility for existing
              enterprise infrastructure.
            </p>
            <p className="leading-relaxed">
              Our mission is to eliminate the dependency on proprietary VPN solutions while
              maintaining full compatibility with industry-standard clients like Cisco Secure Client
              (AnyConnect). By leveraging the power of{' '}
              <strong className="text-foreground">wolfSSL</strong> and{' '}
              <strong className="text-foreground">wolfSentry</strong>, we deliver enterprise-grade
              cryptography and integrated intrusion detection in a single, auditable codebase.
            </p>
            <p className="leading-relaxed">
              WolfGuard is designed for DevOps engineers, system administrators, and security
              professionals who require transparent, auditable security without vendor lock-in.
            </p>
          </div>
        </CardBody>
      </Card>

      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <Card>
          <CardBody className="p-6">
            <h3 className="text-xl font-bold mb-3 text-primary">Current Status</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                • <strong className="text-foreground">Version:</strong> 1.0.0-alpha
              </li>
              <li>
                • <strong className="text-foreground">Stage:</strong> Active development
              </li>
              <li>
                • <strong className="text-foreground">TLS:</strong> 1.3 / DTLS 1.3 support
              </li>
              <li>
                • <strong className="text-foreground">Cisco Client:</strong> Fully compatible
              </li>
            </ul>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-6">
            <h3 className="text-xl font-bold mb-3 text-primary">License</h3>
            <p className="text-muted-foreground mb-3">
              WolfGuard is released under the{' '}
              <strong className="text-foreground">GNU General Public License v3.0 (GPLv3)</strong>.
            </p>
            <p className="text-sm text-muted-foreground">
              This ensures the code remains free and open-source, allowing for security audits and
              community contributions while protecting user freedoms.
            </p>
          </CardBody>
        </Card>
      </div>
    </motion.section>
  )
}
