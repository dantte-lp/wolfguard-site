'use client'

import { motion } from 'framer-motion'
import { Card, CardBody } from '@heroui/react'
import { BookOpen, Code, Wrench, LifeBuoy } from 'lucide-react'

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

const docCategories = [
  {
    icon: BookOpen,
    title: 'User Guides',
    description: 'Step-by-step guides for installation, configuration, and daily operations',
    topics: ['Getting Started', 'Server Configuration', 'Client Setup', 'Best Practices'],
  },
  {
    icon: Code,
    title: 'Architecture & API',
    description: 'Technical deep-dives into WolfGuard architecture and API reference',
    topics: [
      'System Architecture',
      'Protocol Implementation',
      'API Documentation',
      'Internal Modules',
    ],
  },
  {
    icon: Wrench,
    title: 'Configuration Reference',
    description: 'Complete reference for all configuration options and parameters',
    topics: ['Server Settings', 'Security Options', 'Network Configuration', 'Advanced Features'],
  },
  {
    icon: LifeBuoy,
    title: 'Troubleshooting',
    description: 'Common issues, debugging guides, and FAQ',
    topics: ['Common Problems', 'Debug Procedures', 'Performance Tuning', 'FAQ'],
  },
]

export function DocumentationOverview() {
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
          Documentation
        </h1>
        <p className="text-lg text-default-600 max-w-3xl mx-auto">
          Complete technical documentation for WolfGuard VPN Server. Everything you need to deploy,
          configure, and maintain a secure VPN infrastructure.
        </p>
      </motion.div>

      {/* Documentation Categories */}
      <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {docCategories.map((category) => (
          <motion.div key={category.title} variants={fadeInUp}>
            <Card className="h-full bg-background/60 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300">
              <CardBody className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
                    <p className="text-sm text-default-600">{category.description}</p>
                  </div>
                </div>

                {/* Topics */}
                <div className="pl-16 space-y-1">
                  {category.topics.map((topic) => (
                    <div key={topic} className="text-sm text-default-500 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                      {topic}
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* What's Included */}
      <motion.div variants={fadeInUp} className="mt-12">
        <Card className="bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/20">
          <CardBody className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">What&apos;s Included</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-default-700">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Comprehensive installation guides for all platforms</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Detailed configuration reference with examples</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Protocol specifications and technical architecture</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Security best practices and hardening guides</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>API documentation for integration and automation</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Troubleshooting guides and performance optimization</span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </motion.div>
  )
}
