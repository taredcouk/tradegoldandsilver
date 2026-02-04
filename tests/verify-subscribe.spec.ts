import { test, expect } from '@playwright/test';

test('verify newsletter subscription form', async ({ page }) => {
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));

  // GO TO PORT 3000
  await page.goto('http://localhost:3000');

  // Wait for some time to allow rendering
  await page.waitForTimeout(2000);

  // Wait for the section to be in the DOM
  const subscribeSection = page.locator('section').filter({ hasText: 'Subscribe' });
  await expect(subscribeSection.first()).toBeVisible({ timeout: 10000 });

  // Scroll to it
  await subscribeSection.first().scrollIntoViewIfNeeded();

  const firstName = subscribeSection.locator('input[placeholder="First Name"]');
  const lastName = subscribeSection.locator('input[placeholder="Last Name"]');
  const email = subscribeSection.locator('input[placeholder="Email Address"]');
  const checkbox = subscribeSection.locator('input[type="checkbox"]');
  const submitBtn = subscribeSection.locator('button[type="submit"]');

  // Verify fields are visible
  await expect(firstName).toBeVisible();
  await expect(lastName).toBeVisible();
  await expect(email).toBeVisible();
  await expect(checkbox).toBeVisible();

  // Initially disabled
  await expect(submitBtn).toBeDisabled();

  // Fill data
  await firstName.fill('Test');
  await lastName.fill('User');
  await email.fill(`test-${Date.now()}@example.com`);

  // Check the checkbox
  await checkbox.click();

  // Button should now be enabled
  await expect(submitBtn).toBeEnabled();

  // Submit
  await submitBtn.click();

  // Wait for success message
  const successMsg = page.locator('text=Thank you for subscribing!');
  await expect(successMsg).toBeVisible({ timeout: 10000 });
});
