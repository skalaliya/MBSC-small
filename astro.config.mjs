// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const SITE = process.env.SITE_URL ?? 'https://www.mbscaustralia.com.au';

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
    csp: {
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
  markdown: { syntaxHighlight: false },
  image: { layout: 'constrained' },
  build: { inlineStylesheets: 'never' },
  vite: { plugins: [tailwindcss()] },
});
