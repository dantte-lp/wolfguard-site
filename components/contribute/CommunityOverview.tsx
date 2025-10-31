'use client'

import { motion } from 'framer-motion'
import { Heart, Users, Code, Shield } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const values = [
  {
    icon: Heart,
    title: 'Open Source',
    description: 'Built in the open, for everyone. Free to use, modify, and distribute.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Guided by user needs and community contributions.',
  },
  {
    icon: Code,
    title: 'Modern Tech',
    description: 'Leveraging cutting-edge protocols and security standards.',
  },
  {
    icon: Shield,
    title: 'Security First',
    description: 'Built with wolfSSL - proven cryptography and security.',
  },
]

export function CommunityOverview() {
  return (
    <motion.div {...fadeInUp} className="space-y-8">
      {/* Hero Section */}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          Join the WolfGuard Community
        </h1>
        <p className="text-lg text-default-600 max-w-3xl">
          WolfGuard is an open-source project built by developers, for developers. Whether you are
          an experienced systems programmer, a documentation enthusiast, or just getting started
          with open source - there is a place for you here.
        </p>
      </div>

      {/* Welcome Message */}
      <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 border-2 border-primary/30 rounded-2xl p-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/20 rounded-xl">
            <Heart className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1 space-y-3">
            <h2 className="text-2xl font-bold text-foreground">Welcome Contributors!</h2>
            <p className="text-default-700">
              We believe in the power of collaboration and community. Every contribution matters -
              whether it is a bug fix, a feature enhancement, documentation improvement, or even
              just spreading the word about WolfGuard. Your expertise and enthusiasm help make this
              project better for everyone.
            </p>
            <p className="text-default-700">
              WolfGuard is more than just a VPN server - it is a commitment to building secure,
              modern, and accessible networking technology. By contributing, you are helping shape
              the future of open-source security infrastructure.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <motion.div variants={staggerChildren} initial="initial" animate="animate" className="mt-12">
        <h3 className="text-2xl font-bold text-foreground mb-6">What We Stand For</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <motion.div
              key={value.title}
              variants={fadeInUp}
              className="bg-background/60 backdrop-blur-sm border border-border rounded-xl p-6 space-y-3"
            >
              <div className="p-3 bg-primary/10 rounded-lg w-fit">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-foreground">{value.title}</h4>
              <p className="text-sm text-default-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
