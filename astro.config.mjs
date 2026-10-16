// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync, readdirSync } from 'node:fs';
import { site as company } from './src/data/site.ts';

const SITE = process.env.SITE_URL ?? 'https://www.mbscaustralia.com.au';
// The dev server injects CSS through inline <style> tags for hot reload, which a strict CSP
// blocks. CSP is therefore applied to builds only; `npm run build` + preview tests it locally.
const isDev = process.argv.includes('dev');
// Arabic is listed in the sitemap only once published (see site.locales.ar in src/data/site.ts).
const arPublished = company.locales.ar.published;

// lastmod for insight articles, from their front matter (updated, else date). Other pages carry
// no lastmod: a build-time date on every URL would tell Google nothing and teach it to ignore it.
const insightLastmod = new Map();
for (const locale of readdirSync('src/content/insights')) {
  for (const file of readdirSync(`src/content/insights/${locale}`)) {
    if (!file.endsWith('.md')) continue;
    const fm = readFileSync(`src/content/insights/${locale}/${file}`, 'utf8').split('---')[1] ?? '';
    const pick = (k) => fm.match(new RegExp(`^${k}:\\s*['"]?(\\d{4}-\\d{2}-\\d{2})`, 'm'))?.[1];
    const slug = fm.match(/^slug:\s*['"]?([a-z0-9-]+)/m)?.[1] ?? file.replace(/\.md$/, '');
    const prefix = locale === 'en' ? '' : `/${locale}`;
    const when = pick('updated') ?? pick('date');
    if (when) insightLastmod.set(`${prefix}/insights/${slug}`, when);
  }
}

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'never',
  adapter: vercel({ staticHeaders: true, imageService: false, maxDuration: 15 }),
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-AU', fr: 'fr', ...(arPublished ? { ar: 'ar' } : {}) },
      },
      filter: (page) =>
        !page.includes('/api/') &&
        !/\/404\/?$/.test(page) &&
        !/\/contact\/sent\/?$/.test(page) &&
        // Future-year calendars repeat the current catalogue with new dates; they are noindex.
        !/\/training\/\d{4}\/?$/.test(page) &&
        (arPublished || !/^https?:\/\/[^/]+\/ar(\/|$)/.test(page)),
      serialize(item) {
        const when = insightLastmod.get(new URL(item.url).pathname.replace(/\/$/, ''));
        return when ? { ...item, lastmod: new Date(when).toISOString() } : item;
      },
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'ar'],
    routing: { prefixDefaultLocale: false },
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Manrope',
      cssVariable: '--font-manrope',
      // Headings only use bold and extra-bold; fewer files means a faster first paint.
      weights: [700, 800],
      subsets: ['latin'],
      styles: ['normal'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--font-inter',
      // Body text: regular and semibold. font-medium (500) resolves to 400 by CSS matching rules.
      weights: [400, 600],
      subsets: ['latin'],
      styles: ['normal'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'IBM Plex Sans Arabic',
      cssVariable: '--font-arabic',
      // Only rendered on Arabic pages (Base.astro), so English and French pages never load it.
      // Two weights keep the first paint light (semibold text resolves to 700).
      weights: [400, 700],
      subsets: ['arabic', 'latin'],
      styles: ['normal'],
      fallbacks: ['Tahoma', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      // No swap: the Arabic hero heading is a line taller in Tahoma, so a late swap moved
      // the page by ~0.1 CLS. With both weights preloaded the font is ready on first paint;
      // on a connection too slow for that, the page keeps Tahoma instead of jumping.
      display: 'optional',
    },
  ],
  security: {
    csp: isDev
      ? false
      : {
          algorithm: 'SHA-256',
          scriptDirective: { resources: ["'self'", 'https://va.vercel-scripts.com'] },
          styleDirective: { resources: ["'self'"] },
          directives: [
            "default-src 'self'",
            "img-src 'self' data:",
            "font-src 'self'",
            "connect-src 'self' https://va.vercel-scripts.com",
            'frame-src https://www.google.com',
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            "frame-ancestors 'none'",
            'upgrade-insecure-requests',
          ],
        },
  },
  env: {
    schema: {
      // Read at runtime on Vercel (never inlined into the build). Set these in Vercel project settings.
      ZOHO_SMTP_HOST: envField.string({ context: 'server', access: 'secret', optional: true }),
      ZOHO_SMTP_PORT: envField.number({ context: 'server', access: 'secret', optional: true }),
      ZOHO_SMTP_USER: envField.string({ context: 'server', access: 'secret', optional: true }),
      ZOHO_SMTP_PASS: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_FROM_EMAIL: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_TO_EMAIL: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_DRY_RUN: envField.boolean({ context: 'server', access: 'secret', optional: true }),
      PUBLIC_SHOW_SAMPLE_TESTIMONIALS: envField.boolean({
        context: 'client',
        access: 'public',
        optional: true,
      }),
    },
  },
  markdown: { syntaxHighlight: false },
  image: { layout: 'constrained' },
  build: { inlineStylesheets: 'auto' },
  vite: { plugins: [tailwindcss()] },
});
