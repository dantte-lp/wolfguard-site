#!/bin/bash
# Run all diagnostic tests

set -e

echo "================================"
echo "WolfGuard Site Diagnostic Suite"
echo "================================"
echo ""

# Create output directories
mkdir -p /workspace/reports
mkdir -p /workspace/screenshots

# Set target URL
export TARGET_URL="${TARGET_URL:-https://wolfguard.io}"

echo "Target URL: $TARGET_URL"
echo ""

# Run layout analysis
echo "1/3 Running Layout Analysis..."
node /workspace/scripts/layout-analyzer.js
echo ""

# Run accessibility test
echo "2/3 Running Accessibility Tests..."
node /workspace/scripts/accessibility-checker.js
echo ""

# Run performance test
echo "3/3 Running Performance Tests..."
node /workspace/scripts/performance-test.js
echo ""

echo "================================"
echo "All tests complete!"
echo "================================"
echo ""
echo "Reports: /workspace/reports"
echo "Screenshots: /workspace/screenshots"
echo ""

# List generated files
echo "Generated files:"
ls -lh /workspace/reports/
ls -lh /workspace/screenshots/ 2>/dev/null || echo "No screenshots generated"
