'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'

interface ThemeAwareLogoProps {
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

/**
 * Theme-aware logo component that prevents hydration mismatches.
 *
 * This component solves two critical issues:
 * 1. Hydration mismatch: By using a mounted state, we ensure the server and client
 *    render the same initial content, preventing React hydration errors.
 * 2. Theme persistence: Uses next-themes which properly handles localStorage and
 *    system preferences, ensuring the theme is preserved across page refreshes.
 *
 * The component uses colored SVG logos (logo-light.svg for light theme,
 * logo-dark.svg for dark theme) to display the proper branding with colors
 * while maintaining hydration-safe implementation.
 */
export function ThemeAwareLogo({
  width = 150,
  height = 36,
  className = '',
  priority = false,
}: ThemeAwareLogoProps) {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  // Only show theme-aware content after mounting on client
  useEffect(() => {
    setMounted(true)
  }, [])

  // During SSR and initial client render, show a neutral state
  // This prevents hydration mismatches
  if (!mounted) {
    return (
      <div
        className={className}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          display: 'inline-block',
        }}
      >
        <Image
          src="/logo-light.svg"
          alt="WolfGuard Logo"
          width={width}
          height={height}
          priority={priority}
          className="h-full w-auto"
        />
      </div>
    )
  }

  // After mounting, show the theme-aware version
  return (
    <div
      className={className}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        display: 'inline-block',
      }}
    >
      <Image
        src={resolvedTheme === 'dark' ? '/logo-dark.svg' : '/logo-light.svg'}
        alt="WolfGuard Logo"
        width={width}
        height={height}
        priority={priority}
        className="h-full w-auto transition-opacity duration-200"
      />
    </div>
  )
}
