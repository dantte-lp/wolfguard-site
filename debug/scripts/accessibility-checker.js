/**
 * WolfGuard Accessibility Checker
 * Automated accessibility testing using axe-core
 */

const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

const TARGET_URL = process.env.TARGET_URL || 'https://wolfguard.io';
const REPORTS_DIR = '/workspace/reports';

async function runAccessibilityTest() {
  console.log(`Running accessibility tests for ${TARGET_URL}`);

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  try {
    await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 30000 });

    // Inject axe-core
    await page.addScriptTag({
      url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.8.3/axe.min.js'
    });

    // Run axe
    const results = await page.evaluate(async () => {
      return await axe.run();
    });

    // Organize results
    const report = {
      timestamp: new Date().toISOString(),
      target: TARGET_URL,
      summary: {
        violations: results.violations.length,
        passes: results.passes.length,
        incomplete: results.incomplete.length,
        inapplicable: results.inapplicable.length,
      },
      violations: results.violations.map(v => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        help: v.help,
        helpUrl: v.helpUrl,
        nodes: v.nodes.length,
        examples: v.nodes.slice(0, 3).map(n => ({
          html: n.html,
          target: n.target,
          failureSummary: n.failureSummary,
        })),
      })),
      wcagLevel: {
        'A': results.violations.filter(v => v.tags.includes('wcag2a')).length,
        'AA': results.violations.filter(v => v.tags.includes('wcag2aa')).length,
        'AAA': results.violations.filter(v => v.tags.includes('wcag2aaa')).length,
      },
    };

    // Save report
    await fs.writeFile(
      path.join(REPORTS_DIR, `accessibility-${Date.now()}.json`),
      JSON.stringify(report, null, 2)
    );

    console.log('\n=== ACCESSIBILITY TEST COMPLETE ===');
    console.log(`Total Violations: ${report.summary.violations}`);
    console.log(`WCAG A: ${report.wcagLevel.A}`);
    console.log(`WCAG AA: ${report.wcagLevel.AA}`);
    console.log(`WCAG AAA: ${report.wcagLevel.AAA}`);

    // Print critical violations
    if (report.violations.length > 0) {
      console.log('\nTop Violations:');
      report.violations.slice(0, 5).forEach((v, idx) => {
        console.log(`${idx + 1}. [${v.impact}] ${v.description}`);
        console.log(`   Help: ${v.helpUrl}`);
      });
    }

  } catch (error) {
    console.error(`Error running accessibility test: ${error.message}`);
  }

  await browser.close();
}

runAccessibilityTest().catch(console.error);
