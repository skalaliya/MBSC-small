import { defineConfig, devices } from '@playwright/test';

// Runs against the production build served the way Vercel serves it (headers, redirects, 404).
// Build first: npm run build.
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL: 'http://localhost:4410', trace: 'retain-on-failure' },
  webServer: {
    // Own port, never reused: a long-running preview server would serve stale CSP hashes.
    command: 'node scripts/serve-output.mjs',
    env: { PORT: '4410' },
    url: 'http://localhost:4410/',
    reuseExistingServer: false,
    timeout: 30_000,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
});
