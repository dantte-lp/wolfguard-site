'use client'

import { motion } from 'framer-motion'
import { Card, CardBody } from '@heroui/react'

const timeline = [
  {
    year: '2025',
    title: 'WolfGuard Launch',
    description:
      'Official launch of WolfGuard, establishing clear identity and mission focused on wolfSSL integration for enterprise-grade VPN security.',
  },
  {
    year: '2024',
    title: 'ocserv Foundation',
    description:
      'OpenConnect Server (ocserv) project reached version 1.3.0 in May 2024, introducing enhanced HTTP parsing with llhttp, expanded group management (up to 512 groups), and URL-based group selection. The project continues active development with regular security and compatibility updates.',
  },
  {
    year: '2013',
    title: 'ocserv Creation',
    description:
      'Original OpenConnect Server (ocserv) created by Nikos Mavrogiannopoulos, establishing the protocol foundation for Cisco AnyConnect compatible VPN servers.',
  },
]

export function ProjectHistory() {
  return (
    <motion.section
      className="mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-8">Project History</h2>

      <Card>
        <CardBody className="p-8">
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              WolfGuard evolved from the need for a modern, secure VPN server that could replace
              proprietary solutions while maintaining compatibility with existing enterprise
              infrastructure.
            </p>

            <div className="border-l-2 border-primary/30 pl-6 space-y-8 mt-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-[33px] w-4 h-4 rounded-full bg-primary" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-primary">{item.year}</span>
                      <span className="text-xl font-semibold">{item.title}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
              <h3 className="text-lg font-bold mb-2">Fork & Evolution</h3>
              <p className="text-muted-foreground leading-relaxed">
                WolfGuard is a modernized fork of the OpenConnect Server (ocserv) project. While
                maintaining protocol compatibility, we&apos;ve completely rebuilt the architecture
                with:
              </p>
              <ul className="mt-3 space-y-1 text-muted-foreground">
                <li>• Modern C23 standards</li>
                <li>• wolfSSL cryptographic backend (replacing OpenSSL)</li>
                <li>• wolfSentry intrusion detection integration</li>
                <li>• Enhanced security and performance optimizations</li>
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.section>
  )
}
