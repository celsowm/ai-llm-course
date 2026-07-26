import { expect, test } from '@playwright/test';

test.describe('Prompt Playground UX Smoke Tests', () => {
  test('verify keyboard shortcuts, helper text, and simulated loading state in en locale', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('ai-llm-course.locale', 'en');
    });

    await page.goto('/ai-llm-course/#/playground');
    await page.waitForURL(/#\/playground/);

    // Verify helper text and initial input state
    const input = page.locator('textarea[placeholder="Ask something about transformers, Python or CUDA."]');
    await expect(input).toBeVisible();

    const helperText = page.locator('text=Press Ctrl+Enter (or ⌘+Enter) to submit');
    await expect(helperText).toBeVisible();

    // Verify submit button is visible with default state
    const submitBtn = page.getByRole('button', { name: 'Test prompt' });
    await expect(submitBtn).toBeVisible();

    // Submit via button click and check simulated async loading state
    await submitBtn.click();

    // Check loading indicator text and disabled states
    const submittingBtn = page.getByRole('button', { name: 'Sending...' });
    await expect(submittingBtn).toBeVisible();
    await expect(submittingBtn).toBeDisabled();
    await expect(input).toBeDisabled();

    // Wait for the simulated async action to resolve (600ms + margin)
    await page.waitForTimeout(800);

    // Button should be restored to interactive state
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toBeEnabled();
    await expect(input).toBeEnabled();

    // Focus input and test ArrowLeft/ArrowRight slide hijacking prevention
    await input.focus();
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(200);

    // URL should still be /playground, slide did not change
    await expect(page).toHaveURL(/#\/playground/);

    // Now blur the input and press ArrowLeft to ensure slide navigation still works for non-input elements
    await input.blur();
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(300);

    // Slides should change and URL should update to /real-backprop or similar
    await expect(page).not.toHaveURL(/#\/playground/);
  });

  test('verify keyboard shortcuts and simulated loading state in pt-BR locale', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('ai-llm-course.locale', 'pt-BR');
    });

    await page.goto('/ai-llm-course/#/playground');
    await page.waitForURL(/#\/playground/);

    // Verify helper text
    const helperText = page.locator('text=Pressione Ctrl+Enter (ou ⌘+Enter) para enviar');
    await expect(helperText).toBeVisible();

    const input = page.locator('textarea[placeholder="Pergunte algo sobre transformers, Python ou CUDA."]');
    await expect(input).toBeVisible();

    // Fill CUDA so transformer is not matched
    await input.fill('Explique CUDA');
    await input.focus();
    await page.keyboard.press('Control+Enter');

    // Button should change to loading state immediately
    const submittingBtn = page.getByRole('button', { name: 'Enviando...' });
    await expect(submittingBtn).toBeVisible();
    await expect(submittingBtn).toBeDisabled();

    // Wait for resolution
    await page.waitForTimeout(800);

    // Verify CUDA response is generated
    await expect(page.locator('text=CUDA é o backend principal para GPUs NVIDIA')).toBeVisible();
  });
});
