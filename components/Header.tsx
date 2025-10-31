'use client'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from '@heroui/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Github } from 'lucide-react'
import { ThemeSwitch } from './ThemeSwitch'
import { ThemeAwareLogo } from './ThemeAwareLogo'

const MotionLink = motion.create(Link)
const MotionButton = motion.create(Button)

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Installation', href: '/installation' },
    { name: 'Documentation', href: '/documentation' },
    { name: 'Compatibility', href: '/compatibility' },
    { name: 'Contribute', href: '/contribute' },
  ]

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      className="bg-background/80 backdrop-blur-md border-b border-border"
    >
      {/* Mobile menu toggle */}
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="flex items-center gap-2">
            <ThemeAwareLogo width={150} height={36} priority className="h-9" />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop menu */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.name}>
            <MotionLink
              color="foreground"
              href={item.href}
              className="hover:text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.name}
            </MotionLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Right side buttons */}
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem>
          <MotionButton
            as={Link}
            href="https://github.com/dantte-lp/wolfguard"
            target="_blank"
            rel="noopener noreferrer"
            variant="bordered"
            className="border-primary text-primary hover:bg-primary/10"
            startContent={<Github className="w-4 h-4" />}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="hidden sm:inline">GitHub</span>
          </MotionButton>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile menu */}
      <NavbarMenu className="bg-background/95 backdrop-blur-md">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              color="foreground"
              className="w-full hover:text-primary transition-colors text-lg"
              href={item.href}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <Button
            as={Link}
            href="https://github.com/dantte-lp/wolfguard"
            target="_blank"
            rel="noopener noreferrer"
            variant="flat"
            color="primary"
            className="w-full mt-4"
            startContent={<Github className="w-4 h-4" />}
          >
            GitHub
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}
