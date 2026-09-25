import { defineConfig } from 'vitest/config';

// Unit tests cover pure modules only (dates, calendar, contact rules, i18n, SEO),
// so no Astro integration is needed here.
export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'node',
    // Calendar maths must not depend on the machine's zone; CI also runs the suite in UTC.
    env: { TZ: process.env.TZ ?? 'Australia/Melbourne' },
  },
});
