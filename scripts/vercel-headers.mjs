// Adds site-wide security headers and legacy redirects to the Vercel Build Output config.
// The Astro adapter only emits CSP per page, and vercel.json headers are not merged into
// .vercel/output/config.json, so this runs after `astro build` (see package.json "build").
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { calendarRedirects, calendarState } from './calendar-state.mjs';

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

// /training/<year> for years without their own page goes to /training: the primary year after
// the cutover (its old URL was shared while it was a future year) and retired past years.
const staticDir = new URL('../.vercel/output/static/', import.meta.url);
const prefixes = ['', '/fr', '/ar'].filter(
  (p) => p === '' || existsSync(new URL(`.${p}/training/index.html`, staticDir)),
);
const { redirected, primary, today } = calendarState();
const yearRedirects = calendarRedirects(redirected, prefixes);
console.log(
  `[vercel-headers] calendar ${today}: primary ${primary}, redirecting ${redirected.join(', ') || 'no years'} in ${prefixes.map((p) => p || '/').join(' ')}`,
);

const added = [
  { src: '/(.*)', headers: securityHeaders, continue: true },
  // Crawlers often guess /sitemap.xml; ours is the Astro sitemap index.
  { src: '^/sitemap\\.xml$', headers: { Location: '/sitemap-index.xml' }, status: 308 },
  // /index.html and /about/index.html are duplicates of the clean URLs.
  { src: '^/index\\.html$', headers: { Location: '/' }, status: 308 },
  { src: '^/(.+)/index\\.html$', headers: { Location: '/$1' }, status: 308 },
  // Links from the old site used ?lang=fr / ?lang=en on the home page. Only French needs a
  // redirect: Vercel carries the query string over to the Location, so redirecting ?lang=en to /
  // would loop forever. /?lang=en simply serves the English home page, whose canonical is /.
  {
    src: '^/$',
    has: [{ type: 'query', key: 'lang', value: 'fr' }],
    headers: { Location: '/fr' },
    status: 308,
  },
  ...yearRedirects,
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
