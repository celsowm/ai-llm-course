import { expect, test } from '@playwright/test';

test('code block copy button copies snippet to clipboard', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);

  await page.addInitScript(() => {
    window.localStorage.setItem('ai-llm-course.locale', 'pt-BR');
  });

  await page.goto('/ai-llm-course/#/linear-vs-sigmoid');

  await page.getByTestId('linear-tab-code').evaluate((el) => (el as HTMLElement).click());
  await expect(page.getByText('linear_regression_model.py')).toBeVisible();

  const copyButton = page.getByRole('button', { name: 'Copiar código' });
  await expect(copyButton).toBeVisible();

  await copyButton.click();

  await expect(page.getByRole('button', { name: 'Copiado!' })).toBeVisible();

  const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
  expect(clipboardText).toContain('class LinearRegressionModel');
});
