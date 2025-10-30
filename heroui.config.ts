import { heroui } from '@heroui/react'

export default heroui({
  themes: {
    dark: {
      colors: {
        background: '#0a1628', // Deep dark background
        foreground: '#f5f5f5', // Almost white text
        primary: {
          DEFAULT: '#10b981', // Neon green
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#3b82f6', // Neon blue
          foreground: '#ffffff',
        },
        success: {
          DEFAULT: '#10b981',
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
