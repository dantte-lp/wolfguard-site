import { heroui } from '@heroui/react'

export default heroui({
  themes: {
    dark: {
      colors: {
        background: '#0a0e27', // Deep dark background - matches v3
        foreground: '#f8fafc', // Almost white text - matches v3
        primary: {
          DEFAULT: '#6b21ff', // WolfGuard purple - brand color
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#0ea5e9', // Cyan blue - matches v3
          foreground: '#ffffff',
        },
        success: {
          DEFAULT: '#10b981', // Green for success states
          foreground: '#ffffff',
        },
        warning: {
          DEFAULT: '#f59e0b',
          foreground: '#ffffff',
        },
        danger: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
      },
    },
    light: {
      colors: {
        background: '#ffffff', // White background for light mode
        foreground: '#0a0e27', // Dark text for light mode
        primary: {
          DEFAULT: '#6b21ff', // WolfGuard purple - consistent across themes
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#0ea5e9', // Cyan blue - consistent across themes
          foreground: '#ffffff',
        },
        success: {
          DEFAULT: '#10b981', // Green for success states
          foreground: '#ffffff',
        },
        warning: {
          DEFAULT: '#f59e0b',
          foreground: '#ffffff',
        },
        danger: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
      },
    },
  },
})
