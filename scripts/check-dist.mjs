// Post-build checks on the generated site. Fails (exit 1) on anything that would break in production:
// - an executable inline <script> whose hash is not in that page's CSP header (it would be blocked)
// - inline style="" attributes (blocked by the CSP)
// - references to hosts we removed (placeholders, hotlinked textures, Tailwind CDN, Google Fonts)
// - pages without exactly one <h1>, a <title>, a canonical link or an html lang
import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

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

const problems = [];
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
  if (!/<html lang="(en-AU|fr)"/.test(html)) add('missing html lang');
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

if (problems.length) {
  console.error(
    `check-dist: ${problems.length} problem(s) in ${pages} pages\n` +
      problems.map((p) => `  - ${p}`).join('\n'),
  );
  process.exit(1);
}
console.log(`check-dist: ${pages} pages OK`);
