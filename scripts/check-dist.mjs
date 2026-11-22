// Post-build checks on the generated site. Fails (exit 1) on anything that would break in production:
// - an executable inline <script> whose hash is not in that page's CSP header (it would be blocked)
// - inline style="" attributes (blocked by the CSP)
// - references to hosts we removed (placeholders, hotlinked textures, Tailwind CDN, Google Fonts)
// - pages without exactly one <h1>, a <title>, a canonical link or an html lang/dir
// - physical left/right utilities, which do not mirror for right-to-left languages
// - an Arabic build missing a page that exists in English
import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { calendarRedirects, calendarState } from './calendar-state.mjs';
import { PDF_LOCALES, calendarPdfFile, currentPdf } from '../src/lib/calendar-pdf.ts';

const root = fileURLToPath(new URL('../.vercel/output/', import.meta.url));
const staticDir = join(root, 'static');
const config = JSON.parse(await readFile(join(root, 'config.json'), 'utf8'));
const cspFor = (path) => {
  const r = config.routes.find(
    (x) => x.headers?.['content-security-policy'] && new RegExp(`^${x.src}$`).test(path),
  );
  return r?.headers['content-security-policy'] ?? null;
};
const BANNED = [
  /picsum\.photos/,
  /transparenttextures\.com/,
  /cdn\.tailwindcss\.com/,
  /fonts\.googleapis\.com/,
  /fonts\.gstatic\.com/,
];

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (e.name.endsWith('.html')) yield p;
  }
}

// Physical (left/right) utilities break right-to-left layouts; use start/end (ms-, ps-, start-,
// text-start, border-s, rounded-s…) instead. rtl:/ltr: variants are deliberate and allowed.
const PHYSICAL =
  /^-?(m[lr]|p[lr]|left|right|border-[lr]|rounded-[lr]|rounded-(tl|tr|bl|br)|scroll-[mp][lr]|text-left|text-right|float-left|float-right|clear-left|clear-right)(-|$)/;
function physicalClasses(html) {
  const found = new Set();
  for (const m of html.matchAll(/\sclass="([^"]*)"/g))
    for (const token of m[1].split(/\s+/)) {
      const parts = token.split(':');
      if (parts.slice(0, -1).some((v) => v === 'rtl' || v === 'ltr')) continue;
      if (PHYSICAL.test(parts.at(-1))) found.add(token);
    }
  return [...found];
}

const problems = [];
const routes = new Set();
let pages = 0;
for await (const file of walk(staticDir)) {
  pages++;
  const html = await readFile(file, 'utf8');
  const rel =
    '/' +
    relative(staticDir, file)
      .replace(/(^|\/)index\.html$/, '')
      .replace(/\.html$/, '');
  const route = rel === '/' ? '/' : rel.replace(/\/$/, '');
  const add = (msg) => problems.push(`${route}: ${msg}`);
  routes.add(route);

  const csp = cspFor(route);
  const isNotFound = route === '/404';
  if (!csp && !isNotFound) add('no Content-Security-Policy header route');
  for (const m of html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g)) {
    const type = /type="([^"]+)"/.exec(m[1])?.[1] ?? 'text/javascript';
    if (type === 'application/ld+json') continue;
    const hash = createHash('sha256').update(m[2]).digest('base64');
    if (csp && !csp.includes(`'sha256-${hash}'`))
      add(`inline script not allowed by CSP (sha256-${hash.slice(0, 12)}…)`);
  }
  if (/\sstyle="/.test(html)) add('inline style attribute (blocked by CSP)');
  for (const re of BANNED) if (re.test(html)) add(`references banned host ${re}`);
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) add(`${h1} <h1> elements`);
  if (!/<title>[^<]+<\/title>/.test(html)) add('missing <title>');
  if (!isNotFound && !/<link rel="canonical" href="https:\/\/[^"]+"/.test(html))
    add('missing canonical');
  const lang = /<html lang="(en-AU|fr|ar)" dir="(ltr|rtl)"/.exec(html);
  if (!lang) add('missing html lang or dir');
  else if ((lang[1] === 'ar') !== (lang[2] === 'rtl')) add(`lang ${lang[1]} with dir ${lang[2]}`);
  const physical = physicalClasses(html);
  if (physical.length) add(`physical left/right classes (use start/end): ${physical.join(' ')}`);
  // A preloaded image must be one the page actually uses, or it is downloaded twice.
  for (const m of html.matchAll(/<link rel="preload" as="image"[^>]*imagesrcset="([^"]+)"/g)) {
    const used = [...html.matchAll(/srcset="([^"]+)"/g)].map((x) => x[1]).join(' ');
    for (const url of m[1].split(', ').map((u) => u.split(' ')[0]))
      if (!used.includes(url)) add(`preloaded image not used by the page: ${url}`);
  }
  const og = /<meta property="og:image" content="https?:\/\/[^/]+(\/[^"]+)"/.exec(html)?.[1];
  if (!og) add('missing og:image');
  else {
    try {
      await readFile(join(staticDir, og));
    } catch {
      add(`og:image ${og} not found in the build`);
    }
  }
}

// When Arabic is built (published or preview), every English page must exist in Arabic too.
if ([...routes].some((r) => r === '/ar' || r.startsWith('/ar/')))
  for (const r of routes) {
    if (r === '/404' || r === '/fr' || r.startsWith('/fr/') || r === '/ar' || r.startsWith('/ar/'))
      continue;
    const ar = r === '/' ? '/ar' : `/ar${r}`;
    if (!routes.has(ar)) problems.push(`${r}: no Arabic page at ${ar}`);
  }

// A sitemap URL must be indexable: listing a noindex page sends Google mixed signals.
const sitemap = await readFile(join(staticDir, 'sitemap-0.xml'), 'utf8').catch(() => '');
for (const [, loc] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const path = new URL(loc).pathname.replace(/\/$/, '');
  const html = await readFile(join(staticDir, path, 'index.html'), 'utf8').catch(() => null);
  if (html === null) problems.push(`sitemap lists ${path || '/'} but the build has no such page`);
  else if (/<meta name="robots" content="[^"]*noindex/.test(html))
    problems.push(`sitemap lists ${path || '/'}, which is noindex`);
}

// Training calendars: every year x built locale is either a page or a redirect to /training, and
// the primary year's PDFs exist and were generated from the current calendar data.
{
  const cal = calendarState();
  const prefixes = ['', '/fr', '/ar'].filter((p) => p === '' || routes.has(`${p}/training`));
  const redirectSrcs = new Set(config.routes.filter((r) => r.status === 307).map((r) => r.src));
  for (const prefix of prefixes) {
    if (!routes.has(`${prefix}/training`)) problems.push(`${prefix}/training: page missing`);
    for (const { year } of cal.calendars) {
      const route = `${prefix}/training/${year}`;
      const isPage = routes.has(route);
      const isRedirect = calendarRedirects([year], [prefix]).every((r) => redirectSrcs.has(r.src));
      if (cal.pages.includes(year) && !isPage) problems.push(`${route}: expected a page`);
      if (!cal.pages.includes(year) && !isRedirect)
        problems.push(`${route}: no page and no redirect to ${prefix}/training`);
      if (isPage && isRedirect) problems.push(`${route}: both a page and a redirect`);
    }
  }
  // A PDF that exists must match the current calendar data (else: npm run calendar:pdf). A missing
  // one only warns: the site hides the download button, so a cutover never breaks the build.
  for (const locale of PDF_LOCALES) {
    if (!prefixes.includes(locale === 'en' ? '' : `/${locale}`)) continue;
    const file = calendarPdfFile(cal.primary, locale);
    const exists = await readFile(join(staticDir, 'downloads', file)).then(
      (b) => b.subarray(0, 5).toString() === '%PDF-',
      () => false,
    );
    const current = await currentPdf(cal.primary, locale);
    if (!exists)
      console.warn(`check-dist: downloads/${file} not generated yet (npm run calendar:pdf)`);
    else if (!current)
      problems.push(
        `downloads/${file} is out of date with ${cal.primary}.json: run npm run calendar:pdf`,
      );
  }
}

// Every link to a file in /downloads must exist in the build.
for await (const file of walk(staticDir)) {
  const html = await readFile(file, 'utf8');
  for (const [, href] of html.matchAll(/href="(\/downloads\/[^"#?]+)"/g)) {
    const ok = await readFile(join(staticDir, href)).then(
      () => true,
      () => false,
    );
    if (!ok) problems.push(`${relative(staticDir, file)} links to missing ${href}`);
  }
}

if (problems.length) {
  console.error(
    `check-dist: ${problems.length} problem(s) in ${pages} pages\n` +
      problems.map((p) => `  - ${p}`).join('\n'),
  );
  process.exit(1);
}
console.log(`check-dist: ${pages} pages OK`);
