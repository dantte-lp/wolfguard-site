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
 * The component uses the monochrome SVG logo with currentColor, allowing CSS
 * to control the color based on the current theme without needing multiple images.
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
          src="/logo-mono.svg"
          alt="WolfGuard Logo"
          width={width}
          height={height}
          priority={priority}
          className={`h-full w-auto ${
            // Default to dark theme color during SSR
            'text-gray-900 dark:text-white'
          }`}
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
        src="/logo-mono.svg"
        alt="WolfGuard Logo"
        width={width}
        height={height}
        priority={priority}
        className={`h-full w-auto transition-colors duration-200 ${
          resolvedTheme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}
      />
    </div>
  )
}
