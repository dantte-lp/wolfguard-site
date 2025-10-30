# WolfGuard Site Debugging Tools

This directory contains diagnostic tools for analyzing the WolfGuard landing page for layout issues, accessibility problems, and performance bottlenecks.

## Contents

```
debug/
├── docker/
│   └── Containerfile.debug       # Diagnostic container with Playwright, Lighthouse, etc.
├── scripts/
│   ├── layout-analyzer.js        # Automated layout analysis
│   ├── accessibility-checker.js  # WCAG compliance testing
│   ├── performance-test.js       # Lighthouse performance audit
│   └── run-all-tests.sh         # Run all tests
├── compose.debug.yaml            # Compose configuration
├── reports/                      # Generated test reports (created on first run)
├── screenshots/                  # Page screenshots (created on first run)
└── README.md                     # This file
```

## Quick Start

### 1. Build the Debug Container

```bash
cd /opt/projects/repositories/wolfguard-site/debug
podman-compose -f compose.debug.yaml build
```

Or using podman directly:

```bash
cd /opt/projects/repositories/wolfguard-site/debug
podman build -t localhost/wolfguard-debugger:latest -f docker/Containerfile.debug .
```

### 2. Run the Diagnostic Container

```bash
podman-compose -f compose.debug.yaml up -d
```

### 3. Run All Tests

```bash
podman exec -it wolfguard-debugger bash /workspace/scripts/run-all-tests.sh
```

Or run individual tests:

```bash
# Layout analysis
podman exec -it wolfguard-debugger node /workspace/scripts/layout-analyzer.js

# Accessibility testing
podman exec -it wolfguard-debugger node /workspace/scripts/accessibility-checker.js

# Performance testing
podman exec -it wolfguard-debugger node /workspace/scripts/performance-test.js
```

### 4. Access Reports

Reports and screenshots are saved to mounted volumes:

```bash
# View reports
ls -lh /opt/projects/repositories/wolfguard-site/debug/reports/

# View screenshots
ls -lh /opt/projects/repositories/wolfguard-site/debug/screenshots/
```

## Available Tools

### Layout Analyzer (`layout-analyzer.js`)

Automated browser-based layout analysis that checks for:

- **Horizontal overflow** - Elements extending beyond viewport
- **Overlapping elements** - Components rendering on top of each other
- **Spacing issues** - Insufficient padding/margins
- **Alignment problems** - Misaligned grids and cards
- **Typography issues** - Font sizes, line heights
- **Responsive behavior** - Testing across multiple viewports (mobile, tablet, desktop, ultrawide)

**Output:**
- JSON report with detailed issues
- Full-page screenshots for each viewport
- Component-level screenshots (header, hero, features, etc.)

### Accessibility Checker (`accessibility-checker.js`)

WCAG 2.1 compliance testing using axe-core:

- **WCAG Level A/AA/AAA** violations
- **Color contrast** issues
- **ARIA attributes** validation
- **Semantic HTML** verification
- **Keyboard navigation** problems
- **Screen reader** compatibility

**Output:**
- JSON report with violation details
- Severity levels (critical, serious, moderate, minor)
- Code examples and fix suggestions
- WCAG reference links

### Performance Tester (`performance-test.js`)

Lighthouse-based performance audit:

- **Core Web Vitals** (LCP, FID, CLS)
- **Performance score** (0-100)
- **Bundle size analysis**
- **Image optimization** recommendations
- **Render-blocking resources**
- **Best practices** validation

**Output:**
- JSON performance metrics
- Full Lighthouse report
- Optimization opportunities

## Interactive Shell

Access the container for manual testing:

```bash
podman exec -it wolfguard-debugger /bin/bash
```

Inside the container, you have access to:

```bash
# Playwright CLI
npx playwright --help

# Lighthouse CLI
lighthouse https://wolfguard.io --view

# Puppeteer
node -e "const puppeteer = require('puppeteer'); ..."

# axe-core CLI
axe https://wolfguard.io

# HTTP server (for local testing)
http-server /workspace/site-src
```

## Custom Tests

Create custom test scripts in `scripts/`:

```javascript
// custom-test.js
const { chromium } = require('playwright');

async function customTest() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://wolfguard.io');

  // Your custom test logic here

  await browser.close();
}

customTest();
```

Run it:

```bash
podman exec -it wolfguard-debugger node /workspace/scripts/custom-test.js
```

## Environment Variables

Configure the tests using environment variables:

```bash
# Target URL (default: https://wolfguard.io)
export TARGET_URL=https://wolfguard.io

# Internal URL (for testing local container)
export INTERNAL_URL=http://wolfguard-site:8080
```

Edit `compose.debug.yaml` to persist changes.

## Troubleshooting

### Container won't start

```bash
# Check logs
podman logs wolfguard-debugger

# Rebuild container
podman-compose -f compose.debug.yaml build --no-cache
```

### Browser crashes

Increase memory limits in `compose.debug.yaml`:

```yaml
deploy:
  resources:
    limits:
      memory: 4G  # Increase from 2G
```

### Permission errors

Ensure directories are writable:

```bash
chmod -R 777 /opt/projects/repositories/wolfguard-site/debug/reports
chmod -R 777 /opt/projects/repositories/wolfguard-site/debug/screenshots
```

## Integration with CI/CD

Add to your CI pipeline:

```yaml
# Example GitHub Actions
- name: Run Layout Tests
  run: |
    cd debug
    podman-compose up -d
    podman exec wolfguard-debugger bash /workspace/scripts/run-all-tests.sh
    podman-compose down

- name: Upload Reports
  uses: actions/upload-artifact@v3
  with:
    name: diagnostic-reports
    path: debug/reports/
```

## Maintenance

### Update Dependencies

```bash
podman exec -it wolfguard-debugger npm update -g
npx playwright install chromium
```

### Clean Up

```bash
# Remove old reports
rm -rf /opt/projects/repositories/wolfguard-site/debug/reports/*
rm -rf /opt/projects/repositories/wolfguard-site/debug/screenshots/*

# Stop and remove container
podman-compose -f compose.debug.yaml down

# Remove image
podman rmi localhost/wolfguard-debugger:latest
```

## Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Lighthouse Documentation](https://developer.chrome.com/docs/lighthouse/)
- [axe-core Documentation](https://github.com/dequelabs/axe-core)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web Vitals](https://web.dev/vitals/)

## Support

For issues or questions about the diagnostic tools, refer to the main project documentation at `/opt/projects/repositories/wolfguard-site/README.md`.
