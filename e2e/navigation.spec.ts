import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Rakibul Hasan Shuvo/);
});

test('navigation to projects works', async ({ page }) => {
  await page.goto('/');
  // Click the projects link in the navigation
  await page.click('nav a[href="/projects"]');
  await expect(page).toHaveURL(/.*\/projects/);
  await expect(page.locator('h1').first()).toContainText('Projects');
});
