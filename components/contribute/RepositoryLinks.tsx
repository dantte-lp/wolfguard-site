'use client'

import { motion } from 'framer-motion'
import { Card, CardBody, Button } from '@heroui/react'
import { Github, Star, GitFork, Server, FileText, Terminal, Monitor, Globe } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: 0.4 },
}

const repositories = [
  {
    icon: Server,
    name: 'wolfguard',
    description:
      'Core VPN server (C23) with TLS 1.3/DTLS 1.3 support, compatible with Cisco Secure Client',
    url: 'https://github.com/dantte-lp/wolfguard',
    status: 'Active Development',
    language: 'C',
  },
  {
    icon: FileText,
    name: 'wolfguard-docs',
    description:
      'Comprehensive technical documentation, protocol specifications, and developer guides',
    url: 'https://github.com/dantte-lp/wolfguard-docs',
    status: 'Active',
    language: 'Markdown',
  },
  {
    icon: Terminal,
    name: 'wolfguard-client',
    description: 'Command-line VPN client (C) for connecting to WolfGuard servers',
    url: 'https://github.com/dantte-lp/wolfguard-client',
    status: 'Active Development',
    language: 'C',
  },
  {
    icon: Monitor,
    name: 'wolfguard-connect',
    description: 'Modern GUI client (Qt6/C++23) with DTLS 1.3 and QUIC protocol support',
    url: 'https://github.com/dantte-lp/wolfguard-connect',
    status: 'Planned',
    language: 'C++/Qt6',
  },
  {
    icon: Globe,
    name: 'wolfguard-site',
    description: 'Official website built with Next.js, showcasing features and documentation',
    url: 'https://github.com/dantte-lp/wolfguard-site',
    status: 'Active Development',
    language: 'TypeScript',
  },
]

export function RepositoryLinks() {
  return (
    <motion.div {...fadeInUp} className="mt-16 space-y-8">
      {/* Section Header */}
      <div className="space-y-3">
        <h2 className="text-3xl font-bold text-foreground">WolfGuard Repositories</h2>
        <p className="text-default-600">
          Explore the WolfGuard ecosystem. Each repository welcomes contributions - star the ones
          you are interested in!
        </p>
      </div>

      {/* GitHub CTA */}
      <Card className="bg-gradient-to-br from-primary/10 to-purple-500/10 border-2 border-primary/30">
        <CardBody className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/20 rounded-xl">
                <Github className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Star us on GitHub</h3>
                <p className="text-default-600 mt-1">
                  Show your support and stay updated with project development
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                as="a"
                href="https://github.com/dantte-lp/wolfguard"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                startContent={<Star className="w-4 h-4" />}
              >
                Star
              </Button>
              <Button
                as="a"
                href="https://github.com/dantte-lp/wolfguard"
                target="_blank"
                rel="noopener noreferrer"
                variant="bordered"
                className="border-primary text-primary"
                startContent={<GitFork className="w-4 h-4" />}
              >
                Fork
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Repository List */}
      <div className="grid grid-cols-1 gap-6">
        {repositories.map((repo) => (
          <Card
            key={repo.name}
            className="bg-background/60 backdrop-blur-sm border border-border hover:border-primary/50 transition-colors"
          >
            <CardBody className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <repo.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-xl font-semibold text-foreground font-mono">
                          {repo.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              repo.status === 'Active Development'
                                ? 'bg-success/10 text-success'
                                : repo.status === 'Active'
                                  ? 'bg-primary/10 text-primary'
                                  : 'bg-warning/10 text-warning'
                            }`}
                          >
                            {repo.status}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-default-100 text-default-700">
                            {repo.language}
                          </span>
                        </div>
                      </div>
                      <p className="text-default-600 mt-2">{repo.description}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Button
                    as="a"
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="bordered"
                    className="border-primary text-primary"
                    startContent={<Github className="w-4 h-4" />}
                  >
                    View Repo
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Additional Resources */}
      <Card className="bg-default-50 border border-default-200">
        <CardBody className="p-6">
          <h4 className="text-lg font-semibold text-foreground mb-3">Getting Started</h4>
          <div className="space-y-2 text-sm text-default-700">
            <p>
              <strong>New to the project?</strong> Start by exploring the{' '}
              <a
                href="https://github.com/dantte-lp/wolfguard-docs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                documentation repository
              </a>{' '}
              to understand the architecture and protocols.
            </p>
            <p>
              <strong>Ready to code?</strong> Check the &quot;good first issue&quot; label in each
              repository for beginner-friendly tasks.
            </p>
            <p>
              <strong>Want to discuss?</strong> Open a discussion in the relevant repository or
              reach out through our communication channels below.
            </p>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  )
}
