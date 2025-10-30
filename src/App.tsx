import React from 'react'
import { motion } from 'framer-motion'

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cyber-dark text-wolfguard-light">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center min-h-screen px-4"
      >
        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-wolfguard-primary to-cyber-neon-green">
          WolfGuard
        </h1>
        <p className="text-xl md:text-2xl text-center text-gray-300 mb-8">
          Open-Source VPN Server with TLS 1.3 and Cisco Secure Client Support
        </p>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-wolfguard-primary text-white rounded-lg font-semibold hover:bg-opacity-80 transition-all"
          >
            Get Started
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border-2 border-wolfguard-primary text-wolfguard-primary rounded-lg font-semibold hover:bg-wolfguard-primary hover:text-white transition-all"
          >
            View on GitHub
          </motion.button>
        </div>
        <div className="mt-12 text-center">
          <p className="text-cyber-neon-green animate-pulse">
            Development Environment Ready
          </p>
          <p className="text-sm text-gray-500 mt-2">
            React 19.2.0 • Vite 7.1.12 • TypeScript 5.7.3 • Tailwind CSS 4.1.16 • HeroUI 2.8.5
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default App
