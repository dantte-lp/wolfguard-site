'use client'

import { motion } from 'framer-motion'
import { Card, CardBody } from '@heroui/react'
import { Shield, Eye, Users, Code } from 'lucide-react'

const principles = [
  {
    icon: Shield,
    title: 'Security First',
    description:
      'Every decision prioritizes security. We use certified cryptography, follow best practices, and design with defense in depth.',
  },
  {
    icon: Eye,
    title: 'Transparency',
    description:
      'Open-source code means anyone can audit, verify, and trust our security claims. No security through obscurity.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description:
      'Built by the community, for the community. We welcome contributions, feedback, and collaboration.',
  },
  {
    icon: Code,
    title: 'Standards Compliance',
    description:
      'Adherence to modern standards (TLS 1.3, DTLS 1.3, C23) ensures compatibility, security, and longevity.',
  },
]

export function Philosophy() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-8">Our Philosophy</h2>

      <Card className="mb-8">
        <CardBody className="p-8">
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            WolfGuard is built on core principles that guide every technical decision and
            community interaction. These values ensure we deliver not just software, but a
            trustworthy security solution.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {principles.map((principle, index) => {
              const Icon = principle.icon
              return (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">{principle.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="p-8">
          <h3 className="text-xl font-bold mb-4">Why Open Source Matters</h3>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              In the security industry, trust cannot be assumed—it must be earned through
              transparency and verification. By releasing WolfGuard under the GPLv3 license,
              we enable:
            </p>
            <ul className="space-y-2 pl-6">
              <li>
                <strong className="text-foreground">Independent Security Audits:</strong> Anyone
                can review the code for vulnerabilities
              </li>
              <li>
                <strong className="text-foreground">Community Contributions:</strong> Benefit
                from collective expertise
              </li>
              <li>
                <strong className="text-foreground">No Vendor Lock-in:</strong> Freedom to
                modify and deploy as needed
              </li>
              <li>
                <strong className="text-foreground">Long-term Sustainability:</strong> The
                project survives beyond any single entity
              </li>
            </ul>
          </div>
        </CardBody>
      </Card>
    </motion.section>
  )
}
