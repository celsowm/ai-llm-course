import { expect, test } from '@playwright/test';

test('regression vs sigmoid slide smoke', async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem('ai-llm-course.locale', 'pt-BR');
  });

  await page.goto('/ai-llm-course/linear-vs-sigmoid');

  await expect(page).toHaveURL(/linear-vs-sigmoid/);
  await expect(page.getByTestId('linear-canvas')).toBeVisible();
  await expect(page.getByTestId('sigmoid-canvas')).toBeVisible();

  await page.getByTestId('start-training').evaluate((el) => (el as HTMLElement).click());
  await expect.poll(async () => {
    const epochText = await page.getByTestId('linear-epoch-value').textContent();
    return Number(epochText ?? '0');
  }).toBeGreaterThan(0);

  await page.getByTestId('pause-training').evaluate((el) => (el as HTMLElement).click());

  await page.getByTestId('generate-data').evaluate((el) => (el as HTMLElement).click());

  await page.getByTestId('linear-tab-code').evaluate((el) => (el as HTMLElement).click());
  await expect(page.getByText('linear_regression_model.py')).toBeVisible();

  await page.getByTestId('sigmoid-tab-code').evaluate((el) => (el as HTMLElement).click());
  await expect(page.getByText('logistic_circle_classifier.py')).toBeVisible();
});
