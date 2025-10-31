'use client'

import { motion } from 'framer-motion'
import { Card, CardBody, Button, Chip } from '@heroui/react'
import { ExternalLink, FileText, Github } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: 0.3 },
}

export function DocumentationAccess() {
  return (
    <motion.div {...fadeInUp} className="mt-16 space-y-8">
      {/* Primary Documentation Link */}
      <Card className="bg-gradient-to-br from-primary/10 to-purple-500/10 border-2 border-primary/30">
        <CardBody className="p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Full Documentation Site</h2>
                <Chip color="success" variant="flat" size="sm">
                  Always Updated
                </Chip>
              </div>
              <p className="text-default-600">
                Access the complete WolfGuard documentation at{' '}
                <code className="px-2 py-1 bg-default-100 rounded text-sm font-mono text-primary">
                  docs.wolfguard.io
                </code>
              </p>
              <p className="text-sm text-default-500">
                The documentation is maintained separately and includes interactive examples,
                searchable content, and version-specific guides.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                as="a"
                href="https://docs.wolfguard.io"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                size="lg"
                endContent={<ExternalLink className="w-4 h-4" />}
                className="font-semibold"
              >
                Open Documentation
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Alternative Access Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* GitHub Repository */}
        <Card className="bg-background/60 backdrop-blur-sm border border-border">
          <CardBody className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-default-100 rounded-lg">
                <Github className="w-5 h-5 text-foreground" />
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="text-lg font-semibold text-foreground">Documentation Repository</h3>
                <p className="text-sm text-default-600">
                  Browse documentation source files, contribute improvements, or build docs locally.
                </p>
                <Button
                  as="a"
                  href="https://github.com/dantte-lp/wolfguard-docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="flat"
                  size="sm"
                  endContent={<ExternalLink className="w-3 h-3" />}
                >
                  wolfguard-docs
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Embedded Docs Info */}
        <Card className="bg-background/60 backdrop-blur-sm border border-border">
          <CardBody className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-default-100 rounded-lg">
                <FileText className="w-5 h-5 text-foreground" />
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="text-lg font-semibold text-foreground">Quick Reference</h3>
                <p className="text-sm text-default-600">
                  Essential configuration examples and common commands are available in the
                  Installation section.
                </p>
                <Button
                  as="a"
                  href="/installation"
                  variant="flat"
                  size="sm"
                  className="text-primary"
                >
                  View Installation Guide
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Documentation Integration Note */}
      <Card className="bg-default-50 border border-default-200">
        <CardBody className="p-6">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Why Separate Documentation?</h3>
            <p className="text-sm text-default-700">
              WolfGuard documentation is maintained as a separate site (docs.wolfguard.io) to
              provide:
            </p>
            <ul className="space-y-2 text-sm text-default-600 pl-5">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>
                  <strong>Version-specific documentation</strong> - Different guides for each
                  WolfGuard release
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>
                  <strong>Advanced search capabilities</strong> - Full-text search across all
                  documentation
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>
                  <strong>Interactive examples</strong> - Code samples with syntax highlighting and
                  copy functionality
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>
                  <strong>Community contributions</strong> - Easy workflow for documentation
                  improvements via GitHub
                </span>
              </li>
            </ul>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  )
}
