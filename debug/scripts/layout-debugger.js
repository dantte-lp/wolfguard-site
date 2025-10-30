#!/usr/bin/env node

/**
 * WolfGuard Layout Debugger
 * Extracts outerHTML and analyzes layout properties from live site
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://wolfguard.io/';
const REPORTS_DIR = path.join(__dirname, '..', 'reports');

// Ensure reports directory exists
if (!fs.existsSync(REPORTS_DIR)) {
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
}

/**
 * Extract complete outerHTML from the page
 */
async function extractOuterHTML(page) {
  console.log('📄 Extracting complete outerHTML...');

  const outerHTML = await page.evaluate(() => {
    return document.documentElement.outerHTML;
  });

  const outputPath = path.join(REPORTS_DIR, 'page-outerhtml.html');
  fs.writeFileSync(outputPath, outerHTML, 'utf8');
  console.log(`✅ Saved outerHTML to: ${outputPath}`);

  return outerHTML;
}

/**
 * Extract computed styles for key elements
 */
async function extractComputedStyles(page) {
  console.log('🎨 Extracting computed styles for key elements...');

  const stylesData = await page.evaluate(() => {
    const getComputedStyle = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;

      const computed = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();

      return {
        selector,
        tagName: element.tagName,
        className: element.className,
        id: element.id,
        dimensions: {
          width: rect.width,
          height: rect.height,
          top: rect.top,
          left: rect.left,
          right: rect.right,
          bottom: rect.bottom,
        },
        layout: {
          display: computed.display,
          position: computed.position,
          flexDirection: computed.flexDirection,
          flexWrap: computed.flexWrap,
          flexGrow: computed.flexGrow,
          flexShrink: computed.flexShrink,
          flexBasis: computed.flexBasis,
          justifyContent: computed.justifyContent,
          alignItems: computed.alignItems,
          alignContent: computed.alignContent,
          gridTemplateColumns: computed.gridTemplateColumns,
          gridTemplateRows: computed.gridTemplateRows,
          gridGap: computed.gridGap,
          gap: computed.gap,
        },
        spacing: {
          margin: computed.margin,
          marginTop: computed.marginTop,
          marginRight: computed.marginRight,
          marginBottom: computed.marginBottom,
          marginLeft: computed.marginLeft,
          padding: computed.padding,
          paddingTop: computed.paddingTop,
          paddingRight: computed.paddingRight,
          paddingBottom: computed.paddingBottom,
          paddingLeft: computed.paddingLeft,
        },
        positioning: {
          top: computed.top,
          right: computed.right,
          bottom: computed.bottom,
          left: computed.left,
          zIndex: computed.zIndex,
          transform: computed.transform,
        },
        overflow: {
          overflow: computed.overflow,
          overflowX: computed.overflowX,
          overflowY: computed.overflowY,
        },
        sizing: {
          width: computed.width,
          height: computed.height,
          minWidth: computed.minWidth,
          minHeight: computed.minHeight,
          maxWidth: computed.maxWidth,
          maxHeight: computed.maxHeight,
          boxSizing: computed.boxSizing,
        }
      };
    };

    // Key selectors to analyze
    const selectors = [
      'body',
      '#root',
      '#root > div',
      'header',
      'nav',
      'main',
      '#hero',
      '#features',
      '#quickstart',
      'footer',
      '.container',
      '.hero-container',
      '.feature-card',
    ];

    const results = {};
    selectors.forEach(selector => {
      const data = getComputedStyle(selector);
      if (data) {
        results[selector] = data;
      }
    });

    return results;
  });

  const outputPath = path.join(REPORTS_DIR, 'computed-styles.json');
  fs.writeFileSync(outputPath, JSON.stringify(stylesData, null, 2), 'utf8');
  console.log(`✅ Saved computed styles to: ${outputPath}`);

  return stylesData;
}

/**
 * Analyze layout hierarchy
 */
async function analyzeLayoutHierarchy(page) {
  console.log('🌲 Analyzing layout hierarchy...');

  const hierarchy = await page.evaluate(() => {
    const buildTree = (element, depth = 0) => {
      if (depth > 10) return null; // Prevent infinite recursion

      const computed = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();

      const info = {
        tag: element.tagName.toLowerCase(),
        id: element.id || null,
        classes: element.className ? element.className.split(' ').filter(c => c) : [],
        display: computed.display,
        position: computed.position,
        zIndex: computed.zIndex,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        top: `${rect.top}px`,
        left: `${rect.left}px`,
        flexDirection: computed.flexDirection,
        gridTemplateColumns: computed.gridTemplateColumns,
        children: []
      };

      // Only include direct children, skip text nodes and comments
      Array.from(element.children).forEach(child => {
        const childInfo = buildTree(child, depth + 1);
        if (childInfo) {
          info.children.push(childInfo);
        }
      });

      return info;
    };

    return buildTree(document.body);
  });

  const outputPath = path.join(REPORTS_DIR, 'layout-hierarchy.json');
  fs.writeFileSync(outputPath, JSON.stringify(hierarchy, null, 2), 'utf8');
  console.log(`✅ Saved layout hierarchy to: ${outputPath}`);

  return hierarchy;
}

/**
 * Detect layout anti-patterns and issues
 */
async function detectLayoutIssues(page) {
  console.log('🔍 Detecting layout issues...');

  const issues = await page.evaluate(() => {
    const problems = [];

    // Check for horizontal overflow
    if (document.documentElement.scrollWidth > window.innerWidth) {
      problems.push({
        type: 'HORIZONTAL_OVERFLOW',
        severity: 'HIGH',
        message: `Page has horizontal scroll: scrollWidth=${document.documentElement.scrollWidth}, innerWidth=${window.innerWidth}`,
        diff: document.documentElement.scrollWidth - window.innerWidth,
      });
    }

    // Check all elements for common issues
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
      const computed = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();

      // Elements wider than viewport
      if (rect.width > window.innerWidth) {
        problems.push({
          type: 'ELEMENT_TOO_WIDE',
          severity: 'HIGH',
          element: element.tagName + (element.id ? `#${element.id}` : '') + (element.className ? `.${element.className.split(' ')[0]}` : ''),
          message: `Element width (${rect.width}px) exceeds viewport (${window.innerWidth}px)`,
          width: rect.width,
          viewportWidth: window.innerWidth,
        });
      }

      // Negative margins
      const marginLeft = parseFloat(computed.marginLeft);
      const marginRight = parseFloat(computed.marginRight);
      if (marginLeft < -50 || marginRight < -50) {
        problems.push({
          type: 'NEGATIVE_MARGIN',
          severity: 'MEDIUM',
          element: element.tagName + (element.id ? `#${element.id}` : '') + (element.className ? `.${element.className.split(' ')[0]}` : ''),
          message: `Large negative margin: left=${marginLeft}px, right=${marginRight}px`,
        });
      }

      // Position fixed without proper z-index
      if (computed.position === 'fixed' && computed.zIndex === 'auto') {
        problems.push({
          type: 'FIXED_NO_ZINDEX',
          severity: 'MEDIUM',
          element: element.tagName + (element.id ? `#${element.id}` : '') + (element.className ? `.${element.className.split(' ')[0]}` : ''),
          message: 'Fixed position element without explicit z-index',
        });
      }

      // Overlapping elements (check if element overlaps with siblings)
      const siblings = Array.from(element.parentElement?.children || []).filter(s => s !== element);
      siblings.forEach(sibling => {
        const siblingRect = sibling.getBoundingClientRect();
        const overlap = !(rect.right < siblingRect.left ||
                         rect.left > siblingRect.right ||
                         rect.bottom < siblingRect.top ||
                         rect.top > siblingRect.bottom);

        if (overlap && computed.position !== 'absolute' && computed.position !== 'fixed') {
          const siblingComputed = window.getComputedStyle(sibling);
          if (siblingComputed.position !== 'absolute' && siblingComputed.position !== 'fixed') {
            problems.push({
              type: 'ELEMENT_OVERLAP',
              severity: 'MEDIUM',
              element: element.tagName + (element.id ? `#${element.id}` : ''),
              sibling: sibling.tagName + (sibling.id ? `#${sibling.id}` : ''),
              message: 'Elements overlapping without absolute/fixed positioning',
            });
          }
        }
      });
    });

    // Check for flex containers without proper sizing
    const flexContainers = document.querySelectorAll('*');
    flexContainers.forEach(element => {
      const computed = window.getComputedStyle(element);
      if (computed.display === 'flex' || computed.display === 'inline-flex') {
        const children = Array.from(element.children);
        const hasFlexGrow = children.some(child => {
          const childComputed = window.getComputedStyle(child);
          return parseFloat(childComputed.flexGrow) > 0;
        });

        if (children.length > 0 && !hasFlexGrow && computed.justifyContent === 'normal') {
          problems.push({
            type: 'FLEX_NO_GROW',
            severity: 'LOW',
            element: element.tagName + (element.id ? `#${element.id}` : '') + (element.className ? `.${element.className.split(' ')[0]}` : ''),
            message: 'Flex container without flex-grow on children or justify-content',
          });
        }
      }
    });

    return problems;
  });

  const outputPath = path.join(REPORTS_DIR, 'layout-issues.json');
  fs.writeFileSync(outputPath, JSON.stringify(issues, null, 2), 'utf8');
  console.log(`✅ Saved layout issues to: ${outputPath}`);

  return issues;
}

/**
 * Create visual layout map as text
 */
function createLayoutMap(hierarchy, depth = 0) {
  const indent = '  '.repeat(depth);
  const prefix = depth > 0 ? (depth === 1 ? '└─ ' : '├─ ') : '';

  let map = '';

  const idStr = hierarchy.id ? `#${hierarchy.id}` : '';
  const classStr = hierarchy.classes.length > 0 ? `.${hierarchy.classes.slice(0, 2).join('.')}` : '';
  const displayInfo = hierarchy.display !== 'block' ? ` [${hierarchy.display}]` : '';
  const positionInfo = hierarchy.position !== 'static' ? ` (${hierarchy.position})` : '';
  const zIndexInfo = hierarchy.zIndex !== 'auto' ? ` z:${hierarchy.zIndex}` : '';

  map += `${indent}${prefix}<${hierarchy.tag}${idStr}${classStr}>${displayInfo}${positionInfo}${zIndexInfo}\n`;

  if (hierarchy.display === 'flex') {
    map += `${indent}  📦 Flex: direction=${hierarchy.flexDirection}\n`;
  } else if (hierarchy.display === 'grid') {
    map += `${indent}  📦 Grid: columns=${hierarchy.gridTemplateColumns}\n`;
  }

  map += `${indent}  📏 Size: ${hierarchy.width} x ${hierarchy.height}\n`;

  hierarchy.children.forEach((child, index) => {
    map += createLayoutMap(child, depth + 1);
  });

  return map;
}

/**
 * Generate comprehensive analysis report
 */
function generateAnalysisReport(outerHTML, styles, hierarchy, issues) {
  console.log('📊 Generating analysis report...');

  const report = `# WolfGuard Landing Page - Layout Analysis Report
Generated: ${new Date().toISOString()}

## Executive Summary

This report provides a comprehensive analysis of the WolfGuard landing page layout,
including extracted HTML, computed styles, layout hierarchy, and identified issues.

---

## 1. Layout Hierarchy

\`\`\`
${createLayoutMap(hierarchy)}
\`\`\`

---

## 2. Key Element Computed Styles

${Object.entries(styles).map(([selector, data]) => {
  if (!data) return '';
  return `### ${selector}

**Element:** \`${data.tagName}\` ${data.id ? `#${data.id}` : ''} ${data.className ? `.${data.className.split(' ')[0]}` : ''}

**Layout Properties:**
- Display: \`${data.layout.display}\`
- Position: \`${data.positioning.position}\`
- Z-Index: \`${data.positioning.zIndex}\`

**Flex/Grid:**
- Flex Direction: \`${data.layout.flexDirection}\`
- Flex Grow: \`${data.layout.flexGrow}\`
- Flex Shrink: \`${data.layout.flexShrink}\`
- Justify Content: \`${data.layout.justifyContent}\`
- Align Items: \`${data.layout.alignItems}\`
- Grid Template Columns: \`${data.layout.gridTemplateColumns}\`
- Gap: \`${data.layout.gap}\`

**Dimensions:**
- Width: \`${data.dimensions.width}px\` (computed: \`${data.sizing.width}\`)
- Height: \`${data.dimensions.height}px\` (computed: \`${data.sizing.height}\`)
- Box Sizing: \`${data.sizing.boxSizing}\`

**Spacing:**
- Margin: \`${data.spacing.margin}\`
- Padding: \`${data.spacing.padding}\`

**Position:**
- Top: \`${data.positioning.top}\`
- Left: \`${data.positioning.left}\`
- Transform: \`${data.positioning.transform}\`

**Overflow:**
- Overflow: \`${data.overflow.overflow}\`
- Overflow-X: \`${data.overflow.overflowX}\`
- Overflow-Y: \`${data.overflow.overflowY}\`

---
`;
}).join('\n')}

---

## 3. Detected Layout Issues

${issues.length === 0 ? '✅ No layout issues detected.' : ''}

${issues.map((issue, index) => `### Issue #${index + 1}: ${issue.type}

**Severity:** ${issue.severity}
**Element:** ${issue.element || 'N/A'}
**Message:** ${issue.message}

${Object.entries(issue).filter(([key]) => !['type', 'severity', 'element', 'message'].includes(key)).map(([key, value]) => {
  return `- ${key}: ${value}`;
}).join('\n')}

---
`).join('\n')}

## 4. Recommendations

Based on the analysis above, review the following:

1. **Horizontal Overflow:** Check if any elements exceed viewport width
2. **Flex Containers:** Ensure proper flex-grow/shrink values on children
3. **Grid Layouts:** Verify grid-template-columns are responsive
4. **Fixed/Absolute Positioning:** Check z-index stacking context
5. **Negative Margins:** Review if causing layout shifts
6. **Overlapping Elements:** Verify intentional vs. accidental overlaps

---

## 5. Files Generated

- \`page-outerhtml.html\` - Complete rendered HTML
- \`computed-styles.json\` - Computed styles for key elements
- \`layout-hierarchy.json\` - DOM hierarchy with layout properties
- \`layout-issues.json\` - Detected layout issues
- \`layout-analysis.md\` - This report

---

## Next Steps

1. Review identified issues in order of severity (HIGH → MEDIUM → LOW)
2. Compare source code (React components) with rendered HTML
3. Use browser DevTools to inspect problematic elements
4. Apply fixes and re-run this diagnostic

`;

  const outputPath = path.join(REPORTS_DIR, 'layout-analysis.md');
  fs.writeFileSync(outputPath, report, 'utf8');
  console.log(`✅ Saved analysis report to: ${outputPath}`);
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting WolfGuard Layout Debugger...\n');

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    console.log(`📍 Navigating to: ${SITE_URL}`);
    await page.goto(SITE_URL, { waitUntil: 'networkidle2', timeout: 30000 });

    // Wait for React to hydrate
    console.log('⏳ Waiting for React hydration...');
    await page.waitForTimeout(2000);

    // Extract data
    const outerHTML = await extractOuterHTML(page);
    const styles = await extractComputedStyles(page);
    const hierarchy = await analyzeLayoutHierarchy(page);
    const issues = await detectLayoutIssues(page);

    // Generate report
    generateAnalysisReport(outerHTML, styles, hierarchy, issues);

    console.log('\n✅ Analysis complete! Check the debug/reports/ directory.');

    // Print summary
    console.log('\n📊 Summary:');
    console.log(`   - Extracted HTML: ${outerHTML.length.toLocaleString()} characters`);
    console.log(`   - Analyzed styles: ${Object.keys(styles).length} elements`);
    console.log(`   - Layout issues found: ${issues.length}`);
    if (issues.length > 0) {
      console.log(`   - HIGH severity: ${issues.filter(i => i.severity === 'HIGH').length}`);
      console.log(`   - MEDIUM severity: ${issues.filter(i => i.severity === 'MEDIUM').length}`);
      console.log(`   - LOW severity: ${issues.filter(i => i.severity === 'LOW').length}`);
    }

  } catch (error) {
    console.error('❌ Error during analysis:', error);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run the debugger
main();
