/**
 * WolfGuard Performance Tester
 * Lighthouse performance audit
 */

const { chromium } = require('playwright');
const lighthouse = require('lighthouse');
const fs = require('fs').promises;
const path = require('path');

const TARGET_URL = process.env.TARGET_URL || 'https://wolfguard.io';
const REPORTS_DIR = '/workspace/reports';

async function runPerformanceTest() {
  console.log(`Running performance tests for ${TARGET_URL}`);

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--remote-debugging-port=9222'],
  });

  try {
    // Run Lighthouse
    const runnerResult = await lighthouse(TARGET_URL, {
      port: 9222,
      output: 'json',
      logLevel: 'info',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    });

    const report = {
      timestamp: new Date().toISOString(),
      target: TARGET_URL,
      scores: {
        performance: runnerResult.lhr.categories.performance.score * 100,
        accessibility: runnerResult.lhr.categories.accessibility.score * 100,
        bestPractices: runnerResult.lhr.categories['best-practices'].score * 100,
        seo: runnerResult.lhr.categories.seo.score * 100,
      },
      metrics: {
        firstContentfulPaint: runnerResult.lhr.audits['first-contentful-paint'].numericValue,
        largestContentfulPaint: runnerResult.lhr.audits['largest-contentful-paint'].numericValue,
        totalBlockingTime: runnerResult.lhr.audits['total-blocking-time'].numericValue,
        cumulativeLayoutShift: runnerResult.lhr.audits['cumulative-layout-shift'].numericValue,
        speedIndex: runnerResult.lhr.audits['speed-index'].numericValue,
      },
      opportunities: runnerResult.lhr.audits,
    };

    // Save reports
    await fs.writeFile(
      path.join(REPORTS_DIR, `performance-${Date.now()}.json`),
      JSON.stringify(report, null, 2)
    );

    await fs.writeFile(
      path.join(REPORTS_DIR, `lighthouse-full-${Date.now()}.json`),
      JSON.stringify(runnerResult.lhr, null, 2)
    );

    console.log('\n=== PERFORMANCE TEST COMPLETE ===');
    console.log(`Performance Score: ${report.scores.performance.toFixed(1)}`);
    console.log(`Accessibility Score: ${report.scores.accessibility.toFixed(1)}`);
    console.log(`Best Practices Score: ${report.scores.bestPractices.toFixed(1)}`);
    console.log(`SEO Score: ${report.scores.seo.toFixed(1)}`);
    console.log('\nCore Web Vitals:');
    console.log(`FCP: ${(report.metrics.firstContentfulPaint / 1000).toFixed(2)}s`);
    console.log(`LCP: ${(report.metrics.largestContentfulPaint / 1000).toFixed(2)}s`);
    console.log(`TBT: ${report.metrics.totalBlockingTime.toFixed(0)}ms`);
    console.log(`CLS: ${report.metrics.cumulativeLayoutShift.toFixed(3)}`);

  } catch (error) {
    console.error(`Error running performance test: ${error.message}`);
  }

  await browser.close();
}

runPerformanceTest().catch(console.error);
