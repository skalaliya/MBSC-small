// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const SITE = process.env.SITE_URL ?? 'https://www.mbscaustralia.com.au';
// The dev server injects CSS through inline <style> tags for hot reload, which a strict CSP
// blocks. CSP is therefore applied to builds only; `npm run build` + preview tests it locally.
const isDev = process.argv.includes('dev');

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'never',
  adapter: vercel({ staticHeaders: true, imageService: false, maxDuration: 15 }),
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en-AU', fr: 'fr' } },
      filter: (page) => !page.includes('/api/') && !/\/404\/?$/.test(page),
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: { prefixDefaultLocale: false },
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Manrope',
      cssVariable: '--font-manrope',
      weights: [500, 600, 700, 800],
      subsets: ['latin'],
      styles: ['normal'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: [400, 500, 600],
      subsets: ['latin'],
      styles: ['normal'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
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
  build: { inlineStylesheets: 'never' },
  vite: { plugins: [tailwindcss()] },
});
