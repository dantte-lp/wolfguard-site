import type { Config } from 'tailwindcss'
import { heroui } from '@heroui/react'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/react/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Cybersecurity theme colors
        cyber: {
          dark: '#0a0e27',
          darker: '#050714',
          purple: '#6b21ff',
          blue: '#0ea5e9',
          cyan: '#06b6d4',
          green: '#10b981',
          neon: {
            green: '#39ff14',
            blue: '#00d9ff',
            purple: '#bf00ff',
            pink: '#ff006e',
          },
        },
        // WolfGuard brand colors
        wolfguard: {
          primary: '#6b21ff',
          secondary: '#0ea5e9',
          accent: '#39ff14',
          dark: '#0a0e27',
          light: '#f8fafc',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'neon-green': '0 0 10px #39ff14, 0 0 20px #39ff14, 0 0 30px #39ff14',
        'neon-blue': '0 0 10px #00d9ff, 0 0 20px #00d9ff, 0 0 30px #00d9ff',
        'neon-purple': '0 0 10px #bf00ff, 0 0 20px #bf00ff, 0 0 30px #bf00ff',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [
    heroui({
      themes: {
        dark: {
          colors: {
            background: '#0a0e27',
            foreground: '#f8fafc',
            primary: {
              DEFAULT: '#6b21ff',
              foreground: '#ffffff',
            },
            secondary: {
              DEFAULT: '#0ea5e9',
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
        light: {
          colors: {
            background: '#ffffff',
            foreground: '#0a0e27',
            primary: {
              DEFAULT: '#6b21ff',
              foreground: '#ffffff',
            },
            secondary: {
              DEFAULT: '#0ea5e9',
              foreground: '#ffffff',
            },
          },
        },
      },
    }),
  ],
}

export default config
