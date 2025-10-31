'use client'

import { motion } from 'framer-motion'
import { Card, CardBody, Button } from '@heroui/react'
import { Github, Mail, MessageCircle, Clock, Shield, AlertCircle } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: 0.6 },
}

const channels = [
  {
    icon: Github,
    name: 'GitHub Issues',
    description: 'Report bugs, request features, and track development progress',
    url: 'https://github.com/dantte-lp/wolfguard/issues',
    recommended: 'Bug reports, feature requests, technical discussions',
    responseTime: 'Usually within 24-48 hours',
  },
  {
    icon: Github,
    name: 'GitHub Discussions',
    description: 'Ask questions, share ideas, and engage with the community',
    url: 'https://github.com/dantte-lp/wolfguard/discussions',
    recommended: 'General questions, project ideas, community engagement',
    responseTime: 'Community-driven, varies',
  },
  {
    icon: Mail,
    name: 'Email Contact',
    description: 'Reach out to maintainers directly for private matters',
    url: 'mailto:dantte-lp@example.com',
    recommended: 'Security issues, partnership inquiries, private matters',
    responseTime: 'Within 3-5 business days',
  },
]

export function CommunicationChannels() {
  return (
    <motion.div {...fadeInUp} className="mt-16 space-y-8">
      {/* Section Header */}
      <div className="space-y-3">
        <h2 className="text-3xl font-bold text-foreground">Get in Touch</h2>
        <p className="text-default-600">
          Have questions or ideas? Choose the best channel for your needs. We welcome all
          constructive communication.
        </p>
      </div>

      {/* Security Disclosure Notice */}
      <Card className="bg-danger-50 border-2 border-danger-200 dark:bg-danger-950/20 dark:border-danger-800">
        <CardBody className="p-6">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-danger flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                Security Vulnerability Disclosure
              </h3>
              <p className="text-sm text-default-700">
                If you discover a security vulnerability, please <strong>DO NOT</strong> open a
                public issue. Instead, email us directly at{' '}
                <a
                  href="mailto:security@wolfguard.io"
                  className="text-danger font-medium hover:underline"
                >
                  security@wolfguard.io
                </a>{' '}
                with details. We follow responsible disclosure practices and will work with you to
                address the issue promptly.
              </p>
              <p className="text-sm text-default-700">
                We appreciate security researchers who help keep WolfGuard and our users safe.
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Communication Channels */}
      <div className="grid grid-cols-1 gap-6">
        {channels.map((channel) => (
          <Card
            key={channel.name}
            className="bg-background/60 backdrop-blur-sm border border-border"
          >
            <CardBody className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <channel.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="text-xl font-semibold text-foreground">{channel.name}</h3>
                      <p className="text-default-600">{channel.description}</p>
                      <div className="space-y-1.5 pt-2">
                        <div className="flex items-start gap-2 text-sm">
                          <MessageCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-default-700">
                            <strong>Best for:</strong> {channel.recommended}
                          </span>
                        </div>
                        <div className="flex items-start gap-2 text-sm">
                          <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-default-700">
                            <strong>Response time:</strong> {channel.responseTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Button
                    as="a"
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                    variant="flat"
                  >
                    {channel.name === 'Email Contact' ? 'Send Email' : 'Visit'}
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-background/60 backdrop-blur-sm border border-border">
          <CardBody className="p-6 space-y-3">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              <h4 className="text-lg font-semibold text-foreground">Community Guidelines</h4>
            </div>
            <ul className="space-y-2 text-sm text-default-700">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Be respectful and constructive in all communications</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Search existing issues/discussions before creating new ones</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Provide detailed information when reporting bugs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Stay on topic and keep discussions focused</span>
              </li>
            </ul>
          </CardBody>
        </Card>

        <Card className="bg-background/60 backdrop-blur-sm border border-border">
          <CardBody className="p-6 space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <h4 className="text-lg font-semibold text-foreground">What to Expect</h4>
            </div>
            <ul className="space-y-2 text-sm text-default-700">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Maintainers are volunteers - please be patient</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Security issues receive highest priority</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Well-documented issues get faster responses</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Community members often help each other</span>
              </li>
            </ul>
          </CardBody>
        </Card>
      </div>

      {/* wolfSSL Community */}
      <Card className="bg-primary/5 border border-primary/20">
        <CardBody className="p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-foreground">wolfSSL Community</h4>
              <p className="text-sm text-default-700">
                WolfGuard uses <strong>wolfSSL</strong> for cryptographic operations. For questions
                about wolfSSL itself (not WolfGuard-specific usage), consider visiting the{' '}
                <a
                  href="https://www.wolfssl.com/forums/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  wolfSSL forums
                </a>
                . The wolfSSL team and community are very helpful for library-specific questions.
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  )
}
