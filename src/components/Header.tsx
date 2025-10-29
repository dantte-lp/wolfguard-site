import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Link,
} from '@heroui/react';
import { ThemeSwitch } from './ThemeSwitch';

export const Header: React.FC = () => {
  return (
    <Navbar
      isBordered
      maxWidth="xl"
      className="bg-background/70 backdrop-blur-md"
    >
      <NavbarBrand>
        <div className="flex items-center gap-2">
          <img
            src="/logo-small.png"
            alt="WolfGuard Logo"
            className="w-8 h-8 object-contain"
          />
          <p className="font-bold text-xl text-foreground">WolfGuard</p>
        </div>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#features" className="hover:text-primary transition-colors">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#quickstart" className="hover:text-primary transition-colors">
            Quick Start
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#links" className="hover:text-primary transition-colors">
            Links
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href="https://github.com/dantte-lp/wolfguard"
            variant="flat"
            isExternal
            className="font-semibold"
          >
            GitHub
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
