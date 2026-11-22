# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke/home.spec.ts >> @smoke the site responds and renders its title
- Location: tests/smoke/home.spec.ts:5:1

# Error details

```
Error: expect(page).toHaveTitle(expected) failed

Expected pattern: /automation/i
Received string:  "One moment, please..."
Timeout: 10000ms

Call log:
  - Expect "toHaveTitle" with timeout 10000ms
    24 × locator resolved to <html lang="en">…</html>
       - unexpected value "One moment, please..."

```

```yaml
- text: Please wait while your request is being verified...
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | // The scaffold's proof of life. PW-05 replaces this with a real page object and
  4  | // meaningful assertions about the home page.
  5  | test('@smoke the site responds and renders its title', async ({ page }) => {
  6  |   const response = await page.goto('/');
  7  |   expect(response?.status(), 'target site should answer with a success status').toBeLessThan(400);
> 8  |   await expect(page).toHaveTitle(/automation/i);
     |                      ^ Error: expect(page).toHaveTitle(expected) failed
  9  | });
  10 | 
```