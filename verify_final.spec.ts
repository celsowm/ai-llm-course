import { test, expect } from '@playwright/test';

test('verify lesson 1 changes', async ({ page }) => {
  await page.goto('http://localhost:3000/ai-llm-course/lesson-1');

  // Wait for the slide deck to load
  await page.waitForSelector('text=Agenda');

  // Go to the last slide (Grand Finale)
  // We can just go to the end
  let hasNext = true;
  while (hasNext) {
    const nextButton = page.locator('button[aria-label="Next slide"], button:has(svg[data-testid="ChevronRightIcon"])').last();
    if (await nextButton.isVisible() && !(await nextButton.isDisabled())) {
      await nextButton.click();
      await page.waitForTimeout(200);
    } else {
      hasNext = false;
    }
  }

  // Check the grand finale code
  const code = await page.locator('pre').last().textContent();
  expect(code).toContain('A capital da França é');

  // Go back to check an image slide (e.g. LLM slide)
  // Slide 11 is what is an LLM
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(200);
  }

  // Verify image is on the left
  // We look for a Stack with direction row and its first child being an image
  const image = page.locator('img[alt="What is an LLM?"]');
  await expect(image).toBeVisible();

  // Get the bounding box of the image and its parent/sibling
  const imageBox = await image.boundingBox();
  const text = page.locator('text=Large Language Models are Transformers');
  const textBox = await text.boundingBox();

  if (imageBox && textBox) {
    expect(imageBox.x).toBeLessThan(textBox.x);
  }

  await page.screenshot({ path: 'verification_final.png', fullPage: true });
});
