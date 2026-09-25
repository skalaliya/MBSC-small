import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const ROUTES = [
  '/',
  '/services',
  '/services/oil-gas-engineering',
  '/services/ai-mining',
  '/projects',
  '/projects/moomba-cementing-qa',
  '/training',
  '/training/2027',
  '/rental',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/credits',
];
const LOCALISED = ROUTES.flatMap((r) => [r, r === '/' ? '/fr' : `/fr${r}`]);

async function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(e.message));
  return errors;
}

for (const route of LOCALISED) {
  test(`${route} renders with metadata and no console errors`, async ({ page }) => {
    const errors = await collectErrors(page);
    const res = await page.goto(route);
    expect(res?.status()).toBe(200);
    expect(res?.headers()['content-security-policy']).toContain("default-src 'self'");
    expect(res?.headers()['strict-transport-security']).toBeTruthy();
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page).toHaveTitle(/MBSC Australia/);
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBe(route.startsWith('/fr') ? 'fr' : 'en-AU');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      /^https:\/\/www\.mbscaustralia\.com\.au/,
    );
    expect(await page.locator('link[rel="alternate"][hreflang]').count()).toBe(3);
    // Give deferred scripts a moment to run so their errors are caught.
    await page.waitForTimeout(300);
    expect(errors).toEqual([]);
  });
}

test('unknown paths return the 404 page with status 404', async ({ page }) => {
  const res = await page.goto('/no-such-page');
  expect(res?.status()).toBe(404);
  await expect(page.locator('h1')).toContainText(/could not find/i);
});

test('legacy ?lang=fr links redirect to /fr', async ({ request }) => {
  const res = await request.get('/?lang=fr', { maxRedirects: 0 });
  expect(res.status()).toBe(308);
  expect(res.headers()['location']).toBe('/fr');
});

test('language switcher links to the same page in the other language', async ({ page }) => {
  await page.goto('/projects/moomba-cementing-qa');
  await expect(page.locator('[data-lang-switch="fr"]').first()).toHaveAttribute(
    'href',
    '/fr/projects/moomba-cementing-qa',
  );
  await page.goto('/fr/services');
  await expect(page.locator('[data-lang-switch="en"]').first()).toHaveAttribute(
    'href',
    '/services',
  );
});

test('project sector filter works without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/projects');
  await page.locator('#f-mining').check({ force: true });
  const visible = page.locator('li[data-sector]:visible');
  await expect(visible).toHaveCount(2);
  await expect(visible.first()).toHaveAttribute('data-sector', 'mining');
  await context.close();
});

test('training calendar filters and past-month toggle', async ({ page }) => {
  await page.goto('/training');
  const form = page.locator('[data-calendar-filters]');
  await expect(form).toBeVisible();
  await form.locator('select[name="category"]').selectOption('mining');
  await expect(page.locator('[data-calendar-count]')).toHaveText(/^14 /);
  await form.locator('button[type="reset"]').click();
  await expect(page.locator('[data-calendar-count]')).toHaveText(/^65 /);
  const toggle = page.locator('[data-past-toggle]');
  if (await toggle.isVisible()) {
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  }
});

test('contact form validates inline and prefills from links', async ({ page }) => {
  await page.goto('/contact?topic=training&ref=Reservoir%20Engineering');
  await expect(page.locator('select[name="topic"]')).toHaveValue('training');
  await expect(page.locator('[data-ref-text]')).toHaveText('Reservoir Engineering');
  await page.locator('[data-submit]').click();
  await expect(page.locator('[data-form-alert]')).toBeVisible();
  await expect(page.locator('[aria-invalid="true"]')).toHaveCount(5);
  await expect(page.locator('#firstName')).toBeFocused();
  await page.fill('#firstName', 'Sam');
  await page.fill('#lastName', 'Test');
  await page.fill('#email', 'sam@example.com');
  await page.fill('#message', 'Interested in the reservoir engineering course for three people.');
  await page.check('#consent');
  await page.locator('[data-submit]').click();
  // The local server has no SMTP, so the API answers 503 and the form must explain that.
  await expect(page.locator('[data-form-alert]')).toContainText(/temporarily unavailable/);
});

test('mobile menu opens as a dialog, traps focus and closes with Escape', async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, 'mobile only');
  await page.goto('/');
  const open = page.locator('[data-menu-open]');
  await open.click();
  const dialog = page.locator('#mobile-menu');
  await expect(dialog).toBeVisible();
  await expect(open).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(open).toHaveAttribute('aria-expanded', 'false');
  await expect(open).toBeFocused();
});

test('no horizontal overflow on narrow screens', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile only');
  for (const route of ['/', '/training', '/projects/moomba-cementing-qa', '/contact']) {
    await page.goto(route);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, route).toBeLessThanOrEqual(0);
  }
});

for (const route of [
  '/',
  '/services',
  '/training',
  '/contact',
  '/fr',
  '/fr/projects/moomba-cementing-qa',
  '/services/ai-mining',
  '/fr/services/ai-mining',
]) {
  test(`accessibility: ${route} has no serious or critical axe violations`, async ({ page }) => {
    await page.goto(route);
    // Sections below the fold start transparent until scrolled into view. Reveal them with
    // transitions off (via the CSSOM, which the CSP allows) so axe measures final colours.
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

test('trust band: duplicate logos are hidden from assistive tech and the marquee respects reduced motion', async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, 'marquee only runs on wide screens');
  await page.goto('/');
  const band = page.locator('section.trust');
  await expect(band.getByRole('heading', { name: 'Trusted by industry leaders' })).toBeVisible();
  const lists = band.locator('.trust-list');
  await expect(lists).toHaveCount(2);
  await expect(lists.nth(1)).toHaveAttribute('aria-hidden', 'true');
  expect(await band.getByRole('img').count()).toBe(11); // only the first copy is exposed
  expect(
    await band.locator('.trust-track').evaluate((el) => getComputedStyle(el).animationName),
  ).toBe('trust-scroll');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(
    await band.locator('.trust-track').evaluate((el) => getComputedStyle(el).animationName),
  ).toBe('none');
  await expect(lists.nth(1)).toBeHidden();
});

test('only one nav item is active on the AI page', async ({ page, isMobile }) => {
  test.skip(isMobile, 'desktop nav');
  await page.goto('/services/ai-mining');
  const current = page.locator('header nav a[aria-current="page"]');
  await expect(current).toHaveCount(1);
  await expect(current).toHaveText(/AI & Digital/);
});

for (const width of [1024, 1280, 1440]) {
  for (const route of ['/', '/fr']) {
    test(`navbar fits on one row at ${width}px on ${route}`, async ({ page, isMobile }) => {
      test.skip(isMobile, 'desktop widths only');
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      const links = page.locator('header [data-main-nav] > ul > li');
      const tops = await links.evaluateAll((els) =>
        els.map((e) => Math.round(e.getBoundingClientRect().top)),
      );
      expect(new Set(tops).size, `nav items wrapped: ${tops.join(',')}`).toBe(1);
      const headerHeight = await page
        .locator('header')
        .first()
        .evaluate((e) => e.getBoundingClientRect().height);
      expect(headerHeight).toBeLessThanOrEqual(81);
      const labelLines = await links.evaluateAll((els) =>
        els.map((e) => Math.round(e.getBoundingClientRect().height)),
      );
      expect(Math.max(...labelLines), 'a nav label wrapped onto two lines').toBeLessThan(48);
    });
  }
}
