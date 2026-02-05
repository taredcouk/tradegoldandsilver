import { test, expect } from '@playwright/test';

test('verify homepage with latest blogs', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Wait for the blog section to be visible
  const blogSection = page.locator('text=Popular Trading Articles');
  await expect(blogSection).toBeVisible();

  // Take a screenshot
  await page.screenshot({ path: 'homepage-with-blogs.png', fullPage: true });
});
