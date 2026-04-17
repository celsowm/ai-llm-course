import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  testMatch: ['**/*.smoke.spec.ts'],
  use: {
    baseURL: 'http://127.0.0.1:4173/ai-llm-course',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 4173',
    url: 'http://127.0.0.1:4173/ai-llm-course/',
    reuseExistingServer: true,
  },
});
