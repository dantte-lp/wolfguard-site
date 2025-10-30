import playwright from 'playwright';
import fs from 'fs';

(async () => {
  console.log('Starting layout diagnosis for wolfguard.io...\n');

  const browser = await playwright.chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });

  try {
    console.log('1. Loading https://wolfguard.io/...');
    await page.goto('https://wolfguard.io/', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Take full page screenshot
    console.log('2. Taking full page screenshot...');
    await page.screenshot({
      path: '/opt/projects/repositories/wolfguard-site/debug/full-page-before.png',
      fullPage: true
    });

    // Get computed styles for critical elements
    console.log('3. Analyzing computed styles...\n');

    const elementsToCheck = [
      { selector: 'body', name: 'Body' },
      { selector: '#hero', name: 'Hero Section' },
      { selector: '#features', name: 'Features Section' },
      { selector: '#quickstart', name: 'QuickStart Section' },
      { selector: '#links', name: 'Links Section' },
      { selector: 'footer', name: 'Footer' }
    ];

    const styles = {};

    for (const element of elementsToCheck) {
      const exists = await page.$(element.selector);
      if (!exists) {
        console.log(`⚠️  ${element.name} not found with selector: ${element.selector}`);
        continue;
      }

      const computedStyles = await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (!el) return null;

        const computed = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();

        return {
          // Position and dimensions
          position: computed.position,
          display: computed.display,
          width: computed.width,
          height: computed.height,

          // Margins
          marginLeft: computed.marginLeft,
          marginRight: computed.marginRight,
          marginTop: computed.marginTop,
          marginBottom: computed.marginBottom,

          // Padding
          paddingLeft: computed.paddingLeft,
          paddingRight: computed.paddingRight,
          paddingTop: computed.paddingTop,
          paddingBottom: computed.paddingBottom,

          // Layout
          maxWidth: computed.maxWidth,
          overflow: computed.overflow,
          overflowX: computed.overflowX,
          overflowY: computed.overflowY,

          // Flexbox/Grid
          flexDirection: computed.flexDirection,
          justifyContent: computed.justifyContent,
          alignItems: computed.alignItems,

          // Bounding rect
          boundingRect: {
            left: rect.left,
            right: rect.right,
            top: rect.top,
            width: rect.width,
            x: rect.x
          },

          // Classes
          className: el.className,

          // Parent container check
          parentWidth: el.parentElement ? window.getComputedStyle(el.parentElement).width : 'none'
        };
      }, element.selector);

      styles[element.name] = computedStyles;

      console.log(`=== ${element.name} ===`);
      if (computedStyles) {
        console.log(`Position: ${computedStyles.position}`);
        console.log(`Display: ${computedStyles.display}`);
        console.log(`Width: ${computedStyles.width}`);
        console.log(`Max-Width: ${computedStyles.maxWidth}`);
        console.log(`Margin L/R: ${computedStyles.marginLeft} / ${computedStyles.marginRight}`);
        console.log(`Padding L/R: ${computedStyles.paddingLeft} / ${computedStyles.paddingRight}`);
        console.log(`Overflow: ${computedStyles.overflow} (X: ${computedStyles.overflowX}, Y: ${computedStyles.overflowY})`);
        console.log(`Bounding Rect - Left: ${computedStyles.boundingRect.left}px, Width: ${computedStyles.boundingRect.width}px`);
        console.log(`Classes: ${computedStyles.className}`);
      }
      console.log('');
    }

    // Check for container structure differences
    console.log('4. Checking container structures...\n');

    const containerAnalysis = await page.evaluate(() => {
      const hero = document.querySelector('#hero');
      const features = document.querySelector('#features');

      const getContainerHierarchy = (el) => {
        if (!el) return null;

        const containers = [];
        let current = el.firstElementChild;

        while (current) {
          const computed = window.getComputedStyle(current);
          containers.push({
            tagName: current.tagName,
            className: current.className,
            maxWidth: computed.maxWidth,
            marginLeft: computed.marginLeft,
            marginRight: computed.marginRight,
            marginAuto: computed.marginLeft === 'auto' && computed.marginRight === 'auto'
          });

          // Go one level deeper if it's a container div
          if (current.className.includes('container') || current.className.includes('mx-auto')) {
            current = current.firstElementChild;
          } else {
            break;
          }
        }

        return containers;
      };

      return {
        hero: getContainerHierarchy(hero),
        features: getContainerHierarchy(features)
      };
    });

    console.log('Hero container structure:');
    console.log(JSON.stringify(containerAnalysis.hero, null, 2));
    console.log('\nFeatures container structure:');
    console.log(JSON.stringify(containerAnalysis.features, null, 2));

    // Visual highlight of problem areas
    console.log('\n5. Creating visual debug overlay...');

    await page.evaluate(() => {
      // Highlight sections with colored borders
      const sections = [
        { selector: '#hero', color: 'green', label: 'Hero (OK)' },
        { selector: '#features', color: 'red', label: 'Features (SHIFTED)' },
        { selector: '#quickstart', color: 'orange', label: 'QuickStart' },
        { selector: '#links', color: 'purple', label: 'Links' },
        { selector: 'footer', color: 'blue', label: 'Footer' }
      ];

      sections.forEach(({ selector, color, label }) => {
        const el = document.querySelector(selector);
        if (el) {
          el.style.border = `3px solid ${color}`;
          el.style.position = 'relative';

          // Add label
          const labelEl = document.createElement('div');
          labelEl.textContent = label;
          labelEl.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            background: ${color};
            color: white;
            padding: 5px 10px;
            font-size: 14px;
            font-weight: bold;
            z-index: 9999;
          `;
          el.appendChild(labelEl);
        }
      });

      // Draw center line
      const centerLine = document.createElement('div');
      centerLine.style.cssText = `
        position: fixed;
        left: 50%;
        top: 0;
        bottom: 0;
        width: 2px;
        background: rgba(255, 0, 0, 0.5);
        z-index: 9998;
        pointer-events: none;
      `;
      document.body.appendChild(centerLine);
    });

    await page.screenshot({
      path: '/opt/projects/repositories/wolfguard-site/debug/layout-debug-overlay.png',
      fullPage: true
    });

    // Save detailed report
    console.log('\n6. Saving detailed report...');
    const report = {
      timestamp: new Date().toISOString(),
      url: 'https://wolfguard.io/',
      styles,
      containerAnalysis,
      viewport: { width: 1920, height: 1080 }
    };

    fs.writeFileSync(
      '/opt/projects/repositories/wolfguard-site/debug/layout-analysis.json',
      JSON.stringify(report, null, 2)
    );

    console.log('\n✅ Diagnosis complete!');
    console.log('Screenshots saved:');
    console.log('  - full-page-before.png');
    console.log('  - layout-debug-overlay.png');
    console.log('Report saved: layout-analysis.json');

  } catch (error) {
    console.error('Error during diagnosis:', error);
  } finally {
    await browser.close();
  }
})();