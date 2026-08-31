const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const cases = [
    { name: 'mobile', width: 390, height: 844 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1440, height: 900 },
  ];

  for (const c of cases) {
    await page.setViewportSize({ width: c.width, height: c.height });
    await page.goto('https://tradegoldandsilver.online/', { waitUntil: 'networkidle', timeout: 45000 });
    await page.screenshot({ path: `/work/qa/${c.name}.png`, fullPage: true });
  }

  await browser.close();
})();
