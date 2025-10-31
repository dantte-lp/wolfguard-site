'use client'

import { motion } from 'framer-motion'
import { Card, CardBody, Chip } from '@heroui/react'
import { AlertCircle } from 'lucide-react'

export function InstallationOverview() {
  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Installation <span className="text-primary">Guide</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          Get WolfGuard VPN Server up and running on your preferred platform
        </p>
      </div>

      <Card className="mb-6">
        <CardBody className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="w-5 h-5 text-primary mt-1" />
            <div>
              <h3 className="text-lg font-bold mb-2">Before You Begin</h3>
              <p className="text-muted-foreground leading-relaxed mb-3">
                WolfGuard is currently in active development (version 1.0.0-alpha). While the server
                is functional and compatible with Cisco Secure Client, some features are still being
                refined.
              </p>
              <div className="flex flex-wrap gap-2">
                <Chip color="primary" variant="flat" size="sm">
                  TLS 1.3 / DTLS 1.3
                </Chip>
                <Chip color="success" variant="flat" size="sm">
                  Cisco Compatible
                </Chip>
                <Chip color="secondary" variant="flat" size="sm">
                  wolfSSL Powered
                </Chip>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="p-6">
          <h3 className="text-lg font-bold mb-3">Server Deployment Options</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            WolfGuard server runs on Linux systems or in containers. Select the appropriate tab
            below for detailed installation instructions. For production deployments, we recommend
            using the container-based approach for easier management and updates.
          </p>
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground font-semibold">Note:</span> WolfGuard server is
              designed for Linux environments only. Client applications for Windows, macOS, iOS, and
              Android will connect to the server using Cisco Secure Client or the upcoming WolfGuard
              Connect client.
            </p>
          </div>
        </CardBody>
      </Card>
    </motion.section>
  )
}
