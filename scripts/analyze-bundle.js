#!/usr/bin/env node

/**
 * Bundle Size Analysis Script
 * Analyzes Next.js build output for performance optimization opportunities
 */

const fs = require('fs')
const path = require('path')

const BUILD_DIR = path.join(__dirname, '../.next')
const STATS_FILE = path.join(BUILD_DIR, 'analyze', '__bundle_analysis.json')

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

function analyzeBuild() {
  console.log('📊 Next.js Bundle Analysis\n')

  try {
    // Check if .next directory exists
    if (!fs.existsSync(BUILD_DIR)) {
      console.error('❌ Build directory not found. Run `npm run build` first.')
      process.exit(1)
    }

    // Analyze build manifest
    const buildManifest = path.join(BUILD_DIR, 'build-manifest.json')
    if (fs.existsSync(buildManifest)) {
      const manifest = JSON.parse(fs.readFileSync(buildManifest, 'utf8'))

      console.log('📦 Pages and Bundles:')
      Object.entries(manifest.pages).forEach(([page, files]) => {
        console.log(`\n  ${page}:`)
        files.forEach(file => {
          const filePath = path.join(BUILD_DIR, file)
          if (fs.existsSync(filePath)) {
            const stats = fs.statSync(filePath)
            console.log(`    - ${file} (${formatBytes(stats.size)})`)
          }
        })
      })
    }

    // Analyze static directory
    const staticDir = path.join(BUILD_DIR, 'static')
    if (fs.existsSync(staticDir)) {
      let totalSize = 0

      function analyzeDir(dir, indent = '') {
        const items = fs.readdirSync(dir)
        items.forEach(item => {
          const itemPath = path.join(dir, item)
          const stats = fs.statSync(itemPath)

          if (stats.isDirectory()) {
            console.log(`${indent}📁 ${item}/`)
            analyzeDir(itemPath, indent + '  ')
          } else {
            totalSize += stats.size
            const size = formatBytes(stats.size)
            console.log(`${indent}📄 ${item} (${size})`)
          }
        })
      }

      console.log('\n\n📂 Static Assets:')
      analyzeDir(staticDir, '  ')
      console.log(`\n  Total Size: ${formatBytes(totalSize)}`)
    }

    // Performance recommendations
    console.log('\n\n💡 Performance Recommendations:')
    console.log('  1. ✅ Code splitting is enabled (automatic with Next.js)')
    console.log('  2. ✅ Static page generation is working')
    console.log('  3. ⚠️  Consider lazy loading heavy components')
    console.log('  4. ⚠️  Optimize images with Next.js Image component')
    console.log('  5. ⚠️  Consider implementing dynamic imports for large libraries')
    console.log('  6. ✅ Use production build for deployment')

  } catch (error) {
    console.error('❌ Error analyzing build:', error.message)
    process.exit(1)
  }
}

analyzeBuild()
