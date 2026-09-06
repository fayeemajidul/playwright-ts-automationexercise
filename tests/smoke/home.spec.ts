import { test, expect } from '@playwright/test';

// The scaffold's proof of life. PW-05 replaces this with a real page object and
// meaningful assertions about the home page.
test('@smoke the site responds and renders its title', async ({ page }) => {
  const response = await page.goto('/');
  expect(response?.status(), 'target site should answer with a success status').toBeLessThan(400);
  await expect(page).toHaveTitle(/automation/i);
});
