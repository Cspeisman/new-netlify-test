import { test, expect } from '@playwright/test';

test('menu page shows menu items', async ({ page }) => {
  await page.goto('/menu');

  await expect(page.getByText("Hot Spinach and Cheese Dip")).toBeVisible();
})
