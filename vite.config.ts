import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable Fast Refresh
      fastRefresh: true,
    }),
  ],

  // Path resolution
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },

  // Development server configuration
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: false,
      interval: 100,
    },
    hmr: {
      overlay: true,
    },
  },

  // Preview server configuration
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: true,
  },

  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'esbuild',
    target: 'esnext',
    // Code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'heroui': ['@heroui/react'],
          'framer-motion': ['framer-motion'],
        },
      },
    },
    // Performance settings
    chunkSizeWarningLimit: 1000,
  },

  // Optimization
  optimizeDeps: {
    include: ['react', 'react-dom', '@heroui/react', 'framer-motion'],
    esbuildOptions: {
      target: 'esnext',
    },
  },

  // Environment variables prefix
  envPrefix: 'VITE_',
})
