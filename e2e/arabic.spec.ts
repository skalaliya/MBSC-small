import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { site } from '../src/data/site';

const published = site.locales.ar.published;

// Arabic ships dark. These tests run against a build made with PREVIEW_AR=true (the CI
// "arabic" job); against a normal build they check that no Arabic page leaks out.
const ROUTES = [
  '/ar',
  '/ar/services',
  '/ar/services/ai-mining',
  '/ar/services/oil-gas-engineering',
  '/ar/projects',
  '/ar/projects/moomba-cementing-qa',
  '/ar/insights',
  '/ar/insights/ml-grade-control',
  '/ar/insights/mbsc-algorythmos-partnership',
  '/ar/training',
  '/ar/training/2027',
  '/ar/rental',
  '/ar/about',
  '/ar/contact',
  '/ar/privacy',
  '/ar/terms',
  '/ar/credits',
];

test.describe('Arabic', () => {
  let built = false;
  test.beforeAll(async ({ request }) => {
    built = (await request.get('/ar')).status() === 200;
  });

  test('English pages point to Arabic only once it is published', async ({ page }) => {
    await page.goto('/');
    if (published) {
      expect(built, 'published Arabic must be built').toBe(true);
      await expect(page.locator('link[hreflang="ar"]')).toHaveAttribute(
        'href',
        'https://www.mbscaustralia.com.au/ar',
      );
      await expect(page.locator('[data-lang-switch="ar"]').first()).toHaveAttribute('href', '/ar');
      const xml = await (await page.request.get('/sitemap-0.xml')).text();
      expect(xml).toContain('https://www.mbscaustralia.com.au/ar/services/ai-mining');
    } else {
      await expect(page.locator('link[hreflang="ar"]')).toHaveCount(0);
      if (!built) {
        await expect(page.locator('[data-lang-switch="ar"]')).toHaveCount(0);
        expect((await page.request.get('/ar/about')).status()).toBe(404);
      }
    }
  });

  for (const route of ROUTES) {
    test(`${route} renders right-to-left with the right search signals`, async ({ page }) => {
      test.skip(!built, 'Arabic not built (set PREVIEW_AR=true)');
      const errors: string[] = [];
      page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
      page.on('pageerror', (e) => errors.push(e.message));
      const res = await page.goto(route);
      expect(res?.status()).toBe(200);
      expect(res?.headers()['content-security-policy']).toContain("default-src 'self'");
      await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
      await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
      await expect(page.locator('h1')).toHaveCount(1);
      if (published) {
        // Public: indexable (except future-year calendars), with the full hreflang set.
        const futureYear = /\/training\/\d{4}$/.test(route);
        if (futureYear)
          await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
        else await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
        await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(4);
      } else {
        await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
        await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0);
      }
      // Latin digits only, as agreed for Gulf business usage.
      expect(await page.locator('main').innerText()).not.toMatch(/[٠-٩]/);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow, 'horizontal overflow').toBeLessThanOrEqual(0);
      expect(errors).toEqual([]);
    });
  }

  for (const route of [
    '/ar',
    '/ar/services/ai-mining',
    '/ar/contact',
    '/ar/insights/ml-grade-control',
  ]) {
    test(`accessibility: ${route} has no serious or critical axe violations`, async ({ page }) => {
      test.skip(!built, 'Arabic not built');
      await page.goto(route);
      await page.evaluate(() => {
        document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
          el.style.transition = 'none';
          el.removeAttribute('data-reveal-pending');
        });
      });
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      const serious = results.violations.filter(
        (v) => v.impact === 'serious' || v.impact === 'critical',
      );
      expect(
        serious.map(
          (v) =>
            `${v.id}: ${v.nodes
              .map((n) => n.target.join(' '))
              .slice(0, 3)
              .join(', ')}`,
        ),
      ).toEqual([]);
    });
  }

  test('the logo band stays in view while it scrolls right-to-left', async ({ page, isMobile }) => {
    test.skip(!built || isMobile, 'marquee runs on wide screens only');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/ar');
    const viewport = page.locator('section.trust .trust-viewport');
    const box = (await viewport.boundingBox())!;
    for (const wait of [0, 1500]) {
      await page.waitForTimeout(wait);
      const visible = await page.locator('section.trust .trust-list img').evaluateAll(
        (imgs, b) =>
          imgs.filter((i) => {
            const r = i.getBoundingClientRect();
            return r.right > b.x && r.left < b.x + b.width;
          }).length,
        box,
      );
      expect(visible, 'logos visible in the band').toBeGreaterThan(3);
    }
  });

  test('navigation, switcher and figures read correctly in Arabic', async ({ page, isMobile }) => {
    test.skip(!built || isMobile, 'desktop nav');
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/ar/about');
    await expect(page.locator('header nav a[aria-current="page"]')).toHaveCount(1);
    await expect(page.locator('[data-lang-switch="en"]').first()).toHaveAttribute('href', '/about');
    await expect(page.locator('[data-lang-switch="ar"]').first()).toHaveAttribute(
      'aria-current',
      'true',
    );
    await page.goto('/ar');
    // Figures are written the Arabic way ("أكثر من 1,200"), never with a stray leading "+".
    const figure = page.locator('dd[data-count]').first();
    await expect(figure).toContainText('أكثر من');
  });

  for (const width of [1024, 1280, 1440]) {
    test(`navbar fits on one row at ${width}px in Arabic`, async ({ page, isMobile }) => {
      test.skip(!built || isMobile, 'desktop widths only');
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/ar');
      const tops = await page
        .locator('header [data-main-nav] > ul > li')
        .evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().top)));
      expect(new Set(tops).size, `nav items wrapped: ${tops.join(',')}`).toBe(1);
      const h = await page
        .locator('header')
        .first()
        .evaluate((e) => e.getBoundingClientRect().height);
      expect(h).toBeLessThanOrEqual(81);
    });
  }
  test('the partner mention reads correctly in Arabic', async ({ page }) => {
    test.skip(!built, 'Arabic not built');
    await page.goto('/ar/about');
    await expect(page.locator('main span[dir="ltr"]', { hasText: 'Algoryth' })).toHaveCount(1);
    await expect(page.locator('main a[href^="https://algorythmos.com/au-en/about"]')).toContainText(
      'بالإنجليزية',
    );
  });
});
