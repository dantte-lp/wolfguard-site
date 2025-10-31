'use client'

import { HeroUIProvider } from '@heroui/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useRouter } from 'next/navigation'

/**
 * Global providers wrapper for the application.
 *
 * Theme Configuration:
 * - attribute="class": Uses class-based theme switching (dark/light classes on html element)
 * - defaultTheme="dark": Default theme when no preference is stored
 * - enableSystem={true}: Respects user's system theme preference
 * - storageKey="wolfguard-theme": Custom storage key for theme persistence in localStorage
 *
 * This ensures theme preferences are properly saved and restored across page refreshes.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={true}
      storageKey="wolfguard-theme"
    >
      <HeroUIProvider navigate={router.push}>{children}</HeroUIProvider>
    </NextThemesProvider>
  )
}
