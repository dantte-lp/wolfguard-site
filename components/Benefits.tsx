'use client'

import { motion } from 'framer-motion'
import { Card, CardBody } from '@heroui/react'
import { Shield, Check, Zap, Server, Github, BookOpen } from 'lucide-react'

const benefits = [
  {
    icon: Shield,
    title: 'Security',
    description:
      'TLS 1.3/DTLS 1.3 support with enterprise-grade wolfSSL cryptography and integrated wolfSentry IDPS protection.',
  },
  {
    icon: Check,
    title: 'Compatibility',
    description:
      'Full compatibility with Cisco Secure Client (AnyConnect) - use your existing client without modifications.',
  },
  {
    icon: Zap,
    title: 'Performance',
    description:
      'High-speed operation powered by wolfSSL optimizations and modern protocols with minimal overhead.',
  },
  {
    icon: Server,
    title: 'Enterprise-Ready',
    description:
      'Linux-based server deployment with container support, perfect for production environments and modern infrastructure.',
  },
  {
    icon: Github,
    title: 'Open-Source',
    description:
      'Transparent GPLv3 licensed code, auditable security, and community-driven development.',
  },
  {
    icon: BookOpen,
    title: 'Documentation',
    description:
      'Comprehensive guides, API references, and installation instructions to get you started quickly and efficiently.',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function Benefits() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="text-foreground">Wolf</span>
            <span className="text-primary">Guard</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade VPN security with the flexibility of open-source
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <motion.div key={benefit.title} variants={item}>
                <Card
                  className="h-full group hover:border-primary/50 transition-all duration-300 cursor-default"
                  isPressable={false}
                >
                  <CardBody className="p-6">
                    <div className="mb-4 inline-block p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </CardBody>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
