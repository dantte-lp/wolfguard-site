'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button, Card, CardBody, Input } from '@heroui/react'
import { Home, BookOpen, Download, Info, Users, Shield, Search, ArrowRight } from 'lucide-react'
import { useState } from 'react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.5 },
}

const quickLinks = [
  {
    name: 'Home',
    href: '/',
    icon: Home,
    description: 'Return to homepage',
  },
  {
    name: 'About',
    href: '/about',
    icon: Info,
    description: 'Learn about WolfGuard',
  },
  {
    name: 'Installation',
    href: '/installation',
    icon: Download,
    description: 'Get started with WolfGuard',
  },
  {
    name: 'Documentation',
    href: '/documentation',
    icon: BookOpen,
    description: 'Browse the docs',
  },
  {
    name: 'Compatibility',
    href: '/compatibility',
    icon: Shield,
    description: 'Check client compatibility',
  },
  {
    name: 'Contribute',
    href: '/contribute',
    icon: Users,
    description: 'Join the community',
  },
]

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Redirect to documentation page with search query
      window.location.href = `/documentation?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Error Message */}
          <motion.div {...fadeInUp} className="space-y-6 text-center lg:text-left">
            {/* 404 Number with Shield Icon */}
            <motion.div
              {...scaleIn}
              className="flex items-center justify-center lg:justify-start gap-4"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                <Shield className="w-24 h-24 text-primary relative z-10" strokeWidth={1.5} />
              </div>
              <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-br from-primary to-purple-500 bg-clip-text text-transparent">
                404
              </h1>
            </motion.div>

            {/* Error Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-3"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Page Not Found</h2>
              <p className="text-lg text-default-600 max-w-md mx-auto lg:mx-0">
                Looks like this VPN tunnel leads to nowhere. The page you&apos;re looking for
                doesn&apos;t exist or has been moved to a more secure location.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <form onSubmit={handleSearch} className="max-w-md mx-auto lg:mx-0">
                <Input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  startContent={<Search className="w-4 h-4 text-default-400" />}
                  endContent={
                    <Button
                      type="submit"
                      size="sm"
                      color="primary"
                      variant="flat"
                      isIconOnly
                      className="h-7 w-7 min-w-7"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  }
                  classNames={{
                    input: 'text-sm',
                    inputWrapper: 'h-12',
                  }}
                />
              </form>
            </motion.div>

            {/* Primary Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              <Button
                as={Link}
                href="/"
                color="primary"
                size="lg"
                startContent={<Home className="w-5 h-5" />}
                className="font-semibold"
              >
                Go Home
              </Button>
              <Button
                as={Link}
                href="/documentation"
                variant="bordered"
                size="lg"
                startContent={<BookOpen className="w-5 h-5" />}
                className="font-semibold"
              >
                View Docs
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Quick Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card className="bg-background/60 backdrop-blur-sm border border-border">
              <CardBody className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Quick Navigation
                </h3>
                <p className="text-sm text-default-600">
                  Here are some helpful links to get you back on track:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {quickLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.05, duration: 0.4 }}
                    >
                      <Link href={link.href}>
                        <Card
                          isPressable
                          isHoverable
                          className="bg-default-50 hover:bg-default-100 border border-transparent hover:border-primary/30 transition-all duration-200"
                        >
                          <CardBody className="p-4 space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                <link.icon className="w-4 h-4 text-primary" />
                              </div>
                              <span className="font-semibold text-foreground">{link.name}</span>
                            </div>
                            <p className="text-xs text-default-600">{link.description}</p>
                          </CardBody>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-default-500">
            Still can&apos;t find what you&apos;re looking for?{' '}
            <Link href="/contribute" className="text-primary hover:underline font-medium">
              Contact the community
            </Link>{' '}
            or{' '}
            <a
              href="https://github.com/dantte-lp/wolfguard/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              report an issue
            </a>
            .
          </p>
        </motion.div>
      </div>
    </div>
  )
}
