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
import { useState } from 'react'
import { ThemeSwitch } from './ThemeSwitch'

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
          <Link href="/" className="font-bold text-xl text-foreground">
            <span className="text-primary">Wolf</span>
            <span className="text-foreground">Guard</span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop menu */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.name}>
            <Link
              color="foreground"
              href={item.href}
              className="hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Right side buttons */}
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            href="https://github.com/dantte-lp/wolfguard"
            target="_blank"
            rel="noopener noreferrer"
            variant="bordered"
            className="border-primary text-primary hover:bg-primary/10"
          >
            GitHub
          </Button>
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
          >
            GitHub
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}
