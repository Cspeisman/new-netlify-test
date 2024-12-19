import { test, expect } from '@playwright/test';

test('menu page can mark items as eaten', async ({page}) => {
  await page.goto('/menu');

  let byText = page.getByLabel("Hot Spinach and Cheese Dip");
  await byText.click();
  await expect(byText).toBeChecked();

  await page.reload();
  await expect(page.getByLabel("Hot Spinach and Cheese Dip")).toBeChecked();
});

