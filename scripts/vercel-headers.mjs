// Adds site-wide security headers and legacy redirects to the Vercel Build Output config.
// The Astro adapter only emits CSP per page, and vercel.json headers are not merged into
// .vercel/output/config.json, so this runs after `astro build` (see package.json "build").
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const path = new URL('../.vercel/output/config.json', import.meta.url);
if (!existsSync(path)) {
  console.error(
    '[vercel-headers] .vercel/output/config.json not found. Did astro build run with the Vercel adapter?',
  );
  process.exit(1);
}

const securityHeaders = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy':
    'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'X-Frame-Options': 'DENY',
};

const added = [
  { src: '/(.*)', headers: securityHeaders, continue: true },
  // Links from the old site used ?lang=fr / ?lang=en on the home page.
  {
    src: '^/$',
    has: [{ type: 'query', key: 'lang', value: 'fr' }],
    headers: { Location: '/fr' },
    status: 308,
  },
  {
    src: '^/$',
    has: [{ type: 'query', key: 'lang', value: 'en' }],
    headers: { Location: '/' },
    status: 308,
  },
];

const config = JSON.parse(await readFile(path, 'utf8'));

// Unknown URLs are served by the catch-all 404 route at the end of the table, which carries no
// headers. Give it the CSP Astro generated for the /404 page so error pages are protected too.
const csp404 = config.routes.find((r) => r.src === '/404' && r.headers?.['content-security-policy'])
  ?.headers['content-security-policy'];
const catchAll = config.routes.find((r) => r.dest === '/404.html' && r.status === 404);
if (csp404 && catchAll)
  catchAll.headers = { ...(catchAll.headers ?? {}), 'content-security-policy': csp404 };
else console.warn('[vercel-headers] could not attach CSP to the 404 route');
const isOurs = (r) => added.some((a) => JSON.stringify(a) === JSON.stringify(r));
config.routes = [...added, ...(config.routes ?? []).filter((r) => !isOurs(r))];
await writeFile(path, JSON.stringify(config, null, 2));
console.log(`[vercel-headers] prepended ${added.length} routes (${config.routes.length} total)`);
