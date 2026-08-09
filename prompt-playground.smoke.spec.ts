import { test, expect } from '@playwright/test';

test('Prompt Playground UX & Keyboard interactions smoke test - pt-BR', async ({ page }) => {
  // Set locale to pt-BR
  await page.addInitScript(() => {
    window.localStorage.setItem('ai-llm-course.locale', 'pt-BR');
  });

  // Navigate to playground page
  await page.goto('/ai-llm-course/#/playground');

  // Verify elements are visible
  const title = page.getByRole('heading', { name: 'Playground de prompt' });
  await expect(title).toBeVisible();

  const input = page.getByLabel('Seu prompt');
  await expect(input).toBeVisible();

  const submitButton = page.getByRole('button', { name: 'Testar prompt' });
  await expect(submitButton).toBeVisible();

  // Test 1: Arrow keys should not navigate away when focus is inside the TextField
  await input.focus();
  await page.keyboard.press('ArrowLeft');
  // Check we are still on the playground page
  await expect(page).toHaveURL(/playground/);
  await expect(title).toBeVisible();

  // Test 2: Ctrl+Enter inside input should submit and trigger simulated loading
  await input.fill('transformer');

  // Press Ctrl+Enter
  await page.keyboard.press('Control+Enter');

  // Verify immediate loading state
  await expect(input).toBeDisabled();
  await expect(submitButton).toBeDisabled();

  // Verify helper text changed to loading message
  const helperText = page.locator('.MuiFormHelperText-root');
  await expect(helperText).toHaveText('Processando resposta simulada...');

  // Wait for loading to finish (should be around 600ms)
  await expect(input).toBeEnabled({ timeout: 2000 });
  await expect(submitButton).toBeEnabled();

  // Verify response matches expected simulated response for "transformer"
  const responseBox = page.locator('p:has-text("Transformer é uma arquitetura que usa atenção")');
  await expect(responseBox).toBeVisible();
});

test('Prompt Playground UX & Keyboard interactions smoke test - en', async ({ page }) => {
  // Set locale to en
  await page.addInitScript(() => {
    window.localStorage.setItem('ai-llm-course.locale', 'en');
  });

  // Navigate to playground page
  await page.goto('/ai-llm-course/#/playground');

  const titleEn = page.getByRole('heading', { name: 'Prompt playground' });
  await expect(titleEn).toBeVisible();

  const inputEn = page.getByLabel('Your prompt');
  await expect(inputEn).toBeVisible();

  const submitButtonEn = page.getByRole('button', { name: 'Test prompt' });
  await expect(submitButtonEn).toBeVisible();

  // Click submit and check loading state
  await inputEn.fill('cuda');
  await submitButtonEn.click();

  await expect(inputEn).toBeDisabled();
  await expect(submitButtonEn).toBeDisabled();
  const helperTextEn = page.locator('.MuiFormHelperText-root');
  await expect(helperTextEn).toHaveText('Processing simulated response...');

  // Wait for loading to finish
  await expect(inputEn).toBeEnabled({ timeout: 2000 });
  await expect(submitButtonEn).toBeEnabled();

  // Verify response matches expected simulated response for "cuda"
  const responseBoxEn = page.locator('p:has-text("CUDA is the main backend for NVIDIA GPUs")');
  await expect(responseBoxEn).toBeVisible();
});
