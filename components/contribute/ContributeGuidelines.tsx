'use client'

import { motion } from 'framer-motion'
import { Card, CardBody, Chip } from '@heroui/react'
import { Code, Bug, FileText, Shield, GitPullRequest, CheckCircle2 } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: 0.2 },
}

const contributionAreas = [
  {
    icon: Code,
    title: 'Code Contributions',
    description: 'Help build and improve WolfGuard server, clients, and tools',
    areas: [
      'Server development (C23)',
      'CLI client improvements',
      'GUI client (Qt6/C++23)',
      'Website and documentation site',
    ],
    difficulty: 'Intermediate to Advanced',
  },
  {
    icon: Bug,
    title: 'Bug Reports & Testing',
    description: 'Find and report bugs, test new features, improve stability',
    areas: [
      'Report bugs with detailed reproduction steps',
      'Test releases on different platforms',
      'Verify fixes and regressions',
      'Load testing and performance analysis',
    ],
    difficulty: 'All Levels',
  },
  {
    icon: FileText,
    title: 'Documentation',
    description: 'Improve guides, add examples, translate content',
    areas: [
      'Write installation guides',
      'Create usage examples',
      'Improve API documentation',
      'Translate documentation (if multilingual support planned)',
    ],
    difficulty: 'Beginner to Intermediate',
  },
  {
    icon: Shield,
    title: 'Security Audits',
    description: 'Review code for security issues, cryptographic correctness',
    areas: [
      'Code security review',
      'Cryptographic implementation audit',
      'Protocol compliance verification',
      'Responsible disclosure of vulnerabilities',
    ],
    difficulty: 'Advanced',
  },
]

const prProcess = [
  'Fork the repository on GitHub',
  'Create a feature branch from main/master',
  'Make your changes following code style guidelines',
  'Write or update tests as needed',
  'Ensure all tests pass and code is linted',
  'Commit with clear, descriptive messages',
  'Push to your fork and submit a pull request',
  'Respond to review feedback and iterate',
]

export function ContributeGuidelines() {
  return (
    <motion.div {...fadeInUp} className="mt-16 space-y-8">
      {/* Section Header */}
      <div className="space-y-3">
        <h2 className="text-3xl font-bold text-foreground">Ways to Contribute</h2>
        <p className="text-default-600">
          There are many ways to help WolfGuard grow. Choose an area that matches your skills and
          interests.
        </p>
      </div>

      {/* Contribution Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contributionAreas.map((area) => (
          <Card key={area.title} className="bg-background/60 backdrop-blur-sm border border-border">
            <CardBody className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <area.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{area.title}</h3>
                    <p className="text-sm text-default-600 mt-1">{area.description}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-default-700">What you can do:</p>
                <ul className="space-y-1.5">
                  {area.areas.map((item) => (
                    <li key={item} className="text-sm text-default-600 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-3 border-t border-border">
                <Chip variant="flat" size="sm">
                  {area.difficulty}
                </Chip>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Development Guidelines */}
      <Card className="bg-background/60 backdrop-blur-sm border border-border">
        <CardBody className="p-8 space-y-6">
          <h3 className="text-2xl font-bold text-foreground">Code Style & Guidelines</h3>
          <div className="space-y-4">
            <p className="text-default-700">
              Before contributing code, please familiarize yourself with our development practices:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">For Server (C):</h4>
                <ul className="space-y-1 text-sm text-default-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span>Follow C23 standard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span>Use consistent formatting (clang-format)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span>Write unit tests for new features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span>Document public APIs</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">For Client (C++/Qt6):</h4>
                <ul className="space-y-1 text-sm text-default-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span>Follow C++23 best practices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span>Qt6 coding conventions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span>Cross-platform compatibility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span>UI/UX consistency</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-default-50 border border-default-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-default-700">
                <strong>Note:</strong> Check for CONTRIBUTING.md in each repository for detailed
                guidelines specific to that project.
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* PR Process */}
      <Card className="bg-gradient-to-br from-primary/10 to-purple-500/10 border-2 border-primary/30">
        <CardBody className="p-8 space-y-6">
          <div className="flex items-center gap-3">
            <GitPullRequest className="w-8 h-8 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">Pull Request Process</h3>
          </div>
          <p className="text-default-700">Follow these steps to submit your code contributions:</p>
          <ol className="space-y-3">
            {prProcess.map((step, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-semibold text-sm flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <span className="text-default-700 pt-1">{step}</span>
              </li>
            ))}
          </ol>
          <div className="bg-background/60 border border-border rounded-lg p-4 mt-6">
            <p className="text-sm text-default-700">
              <strong>Tip:</strong> Small, focused PRs are easier to review and more likely to be
              merged quickly. Consider breaking large changes into multiple PRs.
            </p>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  )
}
