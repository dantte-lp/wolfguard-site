/**
 * Skip Links Component for Keyboard Navigation
 * WCAG 2.1 AA: Bypass Blocks (2.4.1)
 */

'use client'

import { Link } from '@heroui/react'
import { SKIP_LINKS } from '@/lib/accessibility'

export function SkipLinks() {
  return (
    <div className="sr-only focus-within:not-sr-only">
      <Link
        href={SKIP_LINKS.mainContent.href}
        className="fixed top-0 left-0 z-[9999] bg-primary text-primary-foreground px-4 py-2 m-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2"
      >
        {SKIP_LINKS.mainContent.label}
      </Link>
      <Link
        href={SKIP_LINKS.navigation.href}
        className="fixed top-0 left-0 z-[9999] bg-primary text-primary-foreground px-4 py-2 m-2 ml-[12rem] rounded-md focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2"
      >
        {SKIP_LINKS.navigation.label}
      </Link>
    </div>
  )
}
