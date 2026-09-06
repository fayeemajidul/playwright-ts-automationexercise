import { defineConfig, devices } from '@playwright/test';

// Retries only in CI, and capped at one. A test that needs more than one retry
// is hiding a defect rather than surviving noise. See docs/FLAKE.md once PW-16
// lands.
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  // Spread rather than assign undefined: exactOptionalPropertyTypes forbids an
  // explicit undefined, and letting Playwright pick locally is the right default.
  ...(process.env.CI ? { workers: 4 } : {}),
  reporter: [['html', { open: 'never' }], ['list']],
  timeout: 30_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: process.env.SITE_URL ?? 'https://automationexercise.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'off', // never published; traces carry more and cost less
    actionTimeout: 15_000,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
