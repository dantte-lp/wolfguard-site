/**
 * WolfGuard Layout Analyzer
 * Automated layout analysis using Playwright
 */

const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

const TARGET_URL = process.env.TARGET_URL || 'https://wolfguard.io';
const REPORTS_DIR = '/workspace/reports';
const SCREENSHOTS_DIR = '/workspace/screenshots';

// Viewport configurations for responsive testing
const VIEWPORTS = {
  mobile: { width: 375, height: 667, name: 'iPhone SE' },
  tablet: { width: 768, height: 1024, name: 'iPad' },
  desktop: { width: 1920, height: 1080, name: 'Desktop Full HD' },
  ultrawide: { width: 2560, height: 1440, name: 'Ultrawide' },
};

/**
 * Analyze layout issues on the page
 */
async function analyzePage(page, viewport) {
  const issues = [];

  // Check for horizontal scrollbar (overflow issues)
  const hasHorizontalScroll = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });

  if (hasHorizontalScroll) {
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    issues.push({
      severity: 'High',
      type: 'Overflow',
      description: `Horizontal scrollbar detected (${scrollWidth}px content in ${clientWidth}px viewport)`,
      viewport: viewport.name,
    });
  }

  // Check for overlapping elements
  const overlaps = await page.evaluate(() => {
    const elements = document.querySelectorAll('*');
    const overlapping = [];

    for (let i = 0; i < elements.length; i++) {
      const rect1 = elements[i].getBoundingClientRect();
      if (rect1.width === 0 || rect1.height === 0) continue;

      for (let j = i + 1; j < elements.length; j++) {
        const rect2 = elements[j].getBoundingClientRect();
        if (rect2.width === 0 || rect2.height === 0) continue;

        // Check if rects overlap
        const overlap = !(
          rect1.right < rect2.left ||
          rect1.left > rect2.right ||
          rect1.bottom < rect2.top ||
          rect1.top > rect2.bottom
        );

        if (overlap) {
          const elem1 = elements[i];
          const elem2 = elements[j];

          // Only report if not parent-child relationship
          if (!elem1.contains(elem2) && !elem2.contains(elem1)) {
            overlapping.push({
              elem1: `${elem1.tagName}${elem1.className ? '.' + elem1.className.split(' ')[0] : ''}`,
              elem2: `${elem2.tagName}${elem2.className ? '.' + elem2.className.split(' ')[0] : ''}`,
              rect1: { top: rect1.top, left: rect1.left, width: rect1.width, height: rect1.height },
              rect2: { top: rect2.top, left: rect2.left, width: rect2.width, height: rect2.height },
            });
          }
        }
      }
    }

    return overlapping.slice(0, 10); // Limit to first 10 to avoid noise
  });

  if (overlaps.length > 0) {
    overlaps.forEach((overlap) => {
      issues.push({
        severity: 'Medium',
        type: 'Overlap',
        description: `Elements overlapping: ${overlap.elem1} and ${overlap.elem2}`,
        viewport: viewport.name,
        details: overlap,
      });
    });
  }

  // Check for elements outside viewport
  const outsideViewport = await page.evaluate(() => {
    const elements = document.querySelectorAll('*');
    const outside = [];
    const viewportWidth = window.innerWidth;

    elements.forEach((elem) => {
      const rect = elem.getBoundingClientRect();
      if (rect.right > viewportWidth + 50) { // 50px tolerance
        outside.push({
          tag: elem.tagName,
          class: elem.className,
          right: rect.right,
          viewportWidth,
        });
      }
    });

    return outside.slice(0, 5); // Top 5 offenders
  });

  if (outsideViewport.length > 0) {
    outsideViewport.forEach((elem) => {
      issues.push({
        severity: 'High',
        type: 'Overflow',
        description: `Element extends beyond viewport: ${elem.tag}.${elem.class}`,
        viewport: viewport.name,
        details: elem,
      });
    });
  }

  // Check component spacing/alignment
  const spacingIssues = await page.evaluate(() => {
    const issues = [];

    // Check header alignment
    const header = document.querySelector('header, nav');
    if (header) {
      const headerRect = header.getBoundingClientRect();
      if (headerRect.left < 0 || headerRect.right > window.innerWidth) {
        issues.push({
          component: 'Header',
          issue: 'Not aligned with viewport',
          left: headerRect.left,
          right: headerRect.right,
        });
      }
    }

    // Check section spacing
    const sections = document.querySelectorAll('section');
    sections.forEach((section, idx) => {
      const rect = section.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(section);
      const paddingTop = parseInt(computedStyle.paddingTop);
      const paddingBottom = parseInt(computedStyle.paddingBottom);

      // Check if section has minimal spacing
      if (paddingTop < 20 && paddingBottom < 20) {
        issues.push({
          component: `Section ${idx + 1} (${section.id || section.className})`,
          issue: 'Insufficient padding',
          paddingTop,
          paddingBottom,
        });
      }
    });

    // Check card alignment in grids
    const grids = document.querySelectorAll('[class*="grid"]');
    grids.forEach((grid) => {
      const cards = grid.querySelectorAll('[class*="card"], article, .card, .feature');
      if (cards.length > 1) {
        const tops = Array.from(cards).map(c => c.getBoundingClientRect().top);
        const uniqueTops = [...new Set(tops)];

        // If cards are in same row (same top), check if they're aligned
        if (uniqueTops.length < cards.length) {
          const heights = Array.from(cards).map(c => c.getBoundingClientRect().height);
          const maxHeight = Math.max(...heights);
          const minHeight = Math.min(...heights);

          if (maxHeight - minHeight > 50) {
            issues.push({
              component: `Grid (${grid.className})`,
              issue: 'Card height mismatch in row',
              maxHeight,
              minHeight,
              difference: maxHeight - minHeight,
            });
          }
        }
      }
    });

    return issues;
  });

  if (spacingIssues.length > 0) {
    spacingIssues.forEach((issue) => {
      issues.push({
        severity: 'Medium',
        type: 'Spacing/Alignment',
        description: `${issue.component}: ${issue.issue}`,
        viewport: viewport.name,
        details: issue,
      });
    });
  }

  // Check text readability
  const readabilityIssues = await page.evaluate(() => {
    const issues = [];
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, button, li');

    textElements.forEach((elem) => {
      const style = window.getComputedStyle(elem);
      const fontSize = parseInt(style.fontSize);
      const lineHeight = parseInt(style.lineHeight);
      const color = style.color;
      const bgColor = style.backgroundColor;

      // Check font size
      if (fontSize < 12) {
        issues.push({
          element: `${elem.tagName}.${elem.className}`,
          issue: 'Font too small',
          fontSize,
        });
      }

      // Check line height
      if (lineHeight < fontSize * 1.2) {
        issues.push({
          element: `${elem.tagName}.${elem.className}`,
          issue: 'Line height too tight',
          fontSize,
          lineHeight,
        });
      }
    });

    return issues.slice(0, 10);
  });

  if (readabilityIssues.length > 0) {
    readabilityIssues.forEach((issue) => {
      issues.push({
        severity: 'Low',
        type: 'Typography',
        description: `${issue.element}: ${issue.issue}`,
        viewport: viewport.name,
        details: issue,
      });
    });
  }

  return issues;
}

/**
 * Capture component screenshots
 */
async function captureComponentScreenshots(page, viewport) {
  const components = [
    { selector: 'header, nav', name: 'header' },
    { selector: 'section:nth-of-type(1)', name: 'hero' },
    { selector: '#features, section:has(h2:contains("Features"))', name: 'features' },
    { selector: '#quickstart', name: 'quickstart' },
    { selector: 'footer', name: 'footer' },
  ];

  for (const component of components) {
    try {
      const element = await page.$(component.selector);
      if (element) {
        await element.screenshot({
          path: path.join(SCREENSHOTS_DIR, `${component.name}-${viewport.name.toLowerCase().replace(/\s/g, '-')}.png`),
        });
      }
    } catch (error) {
      console.log(`Failed to capture ${component.name}: ${error.message}`);
    }
  }
}

/**
 * Main analysis function
 */
async function main() {
  console.log(`Starting layout analysis for ${TARGET_URL}`);

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const allIssues = {};

  for (const [key, viewport] of Object.entries(VIEWPORTS)) {
    console.log(`\nAnalyzing ${viewport.name} (${viewport.width}x${viewport.height})`);

    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      userAgent: 'Mozilla/5.0 (compatible; WolfGuard-Analyzer/1.0)',
    });

    const page = await context.newPage();

    try {
      await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 30000 });

      // Take full page screenshot
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, `full-page-${viewport.name.toLowerCase().replace(/\s/g, '-')}.png`),
        fullPage: true,
      });

      // Capture component screenshots
      await captureComponentScreenshots(page, viewport);

      // Analyze layout
      const issues = await analyzePage(page, viewport);
      allIssues[viewport.name] = issues;

      console.log(`Found ${issues.length} issues on ${viewport.name}`);

    } catch (error) {
      console.error(`Error analyzing ${viewport.name}: ${error.message}`);
      allIssues[viewport.name] = [
        {
          severity: 'Critical',
          type: 'Error',
          description: `Failed to load page: ${error.message}`,
          viewport: viewport.name,
        }
      ];
    }

    await context.close();
  }

  await browser.close();

  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    target: TARGET_URL,
    viewports: VIEWPORTS,
    issues: allIssues,
    summary: {
      totalIssues: Object.values(allIssues).flat().length,
      critical: Object.values(allIssues).flat().filter(i => i.severity === 'Critical').length,
      high: Object.values(allIssues).flat().filter(i => i.severity === 'High').length,
      medium: Object.values(allIssues).flat().filter(i => i.severity === 'Medium').length,
      low: Object.values(allIssues).flat().filter(i => i.severity === 'Low').length,
    },
  };

  // Save report
  await fs.writeFile(
    path.join(REPORTS_DIR, `layout-analysis-${Date.now()}.json`),
    JSON.stringify(report, null, 2)
  );

  console.log('\n=== ANALYSIS COMPLETE ===');
  console.log(`Total Issues: ${report.summary.totalIssues}`);
  console.log(`Critical: ${report.summary.critical}`);
  console.log(`High: ${report.summary.high}`);
  console.log(`Medium: ${report.summary.medium}`);
  console.log(`Low: ${report.summary.low}`);
  console.log(`\nReports saved to: ${REPORTS_DIR}`);
  console.log(`Screenshots saved to: ${SCREENSHOTS_DIR}`);

  return report;
}

// Run analysis
main().catch(console.error);
