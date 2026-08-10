import { expect, test } from '@playwright/test';

test('prompt playground smoke test', async ({ page }) => {
  // Force Portuguese locale for deterministic labels
  await page.addInitScript(() => {
    window.localStorage.setItem('ai-llm-course.locale', 'pt-BR');
  });

  await page.goto('/ai-llm-course/#/playground');

  // Wait for the playground element to render
  const inputLocator = page.locator('textarea[label="Seu prompt"], textarea').first();
  await expect(inputLocator).toBeVisible();

  // Verify helper text is displayed
  await expect(page.getByText('Pressione Ctrl+Enter (ou ⌘+Enter) para enviar')).toBeVisible();

  // Type a test prompt
  await inputLocator.fill('Qual o ecossistema de Python?');

  // Trigger submission using Ctrl+Enter keyboard shortcut
  await inputLocator.focus();
  await page.keyboard.press('Control+Enter');

  // Instantly verify loading/disabled states
  const submitButton = page.locator('button', { hasText: 'Enviando...' });
  await expect(submitButton).toBeDisabled();
  await expect(inputLocator).toBeDisabled();

  // Wait for submission to complete (loading delay is 600ms, Playwright timeout is 5000ms by default)
  const finalButton = page.locator('button', { hasText: 'Testar prompt' });
  await expect(finalButton).toBeEnabled({ timeout: 5000 });
  await expect(inputLocator).toBeEnabled();

  // Verify the updated response is present and matches python response
  const responseBox = page.locator('text=Python é popular em IA generativa');
  await expect(responseBox).toBeVisible();
});
