import { test, expect } from '@playwright/test';

test('verify blog detail page', async ({ page }) => {
  await page.goto('http://localhost:3000/blog/6982e73e5a6a020309db8f09');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: '/home/jules/verification/blog_detail_verification.png', fullPage: true });

  const title = page.locator('h1');
  await expect(title).toBeVisible();
  console.log('Blog title found:', await title.innerText());
});
