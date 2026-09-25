// Serves .vercel/output/static the way Vercel would for this site: applies header and redirect
// routes from .vercel/output/config.json (including per-page CSP), clean URLs and the 404 page.
// Used for local production previews and end-to-end tests. Not a general Vercel emulator.
import { createServer } from 'node:http';
import { gzipSync } from 'node:zlib';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../.vercel/output/', import.meta.url));
const staticDir = join(root, 'static');
// Re-read per request: the config changes on every build and this server often outlives one.
const loadConfig = async () => JSON.parse(await readFile(join(root, 'config.json'), 'utf8'));
const port = Number(process.env.PORT ?? 4400);
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
};

async function file(path) {
  const full = normalize(join(staticDir, path));
  if (!full.startsWith(staticDir)) return null;
  try {
    const s = await stat(full);
    return s.isFile() ? full : null;
  } catch {
    return null;
  }
}

function matches(route, url) {
  if (!route.src) return false;
  if (!new RegExp(route.src.startsWith('^') ? route.src : `^${route.src}$`).test(url.pathname))
    return false;
  for (const h of route.has ?? []) {
    if (h.type === 'query' && url.searchParams.get(h.key) !== h.value) return false;
  }
  return true;
}

createServer(async (req, res) => {
  const config = await loadConfig();
  const url = new URL(req.url ?? '/', `http://localhost:${port}`);
  const headers = {};
  for (const route of config.routes) {
    if (route.handle) break; // only the pre-filesystem phase matters for this site
    if (!matches(route, url)) continue;
    const m = url.pathname.match(
      new RegExp(route.src.startsWith('^') ? route.src : `^${route.src}$`),
    );
    for (const [k, v] of Object.entries(route.headers ?? {}))
      headers[k.toLowerCase()] = v.replace(/\$(\d)/g, (_, i) => m?.[Number(i)] ?? '');
    if (route.status && !route.continue) {
      res.writeHead(route.status, headers);
      return res.end();
    }
    if (!route.continue) break;
  }
  if (url.pathname.startsWith('/api/')) {
    res.writeHead(503, { 'content-type': 'application/json' });
    return res.end(JSON.stringify({ ok: false, error: 'unavailable' }));
  }
  const p = decodeURIComponent(url.pathname);
  const found = (await file(p)) ?? (await file(join(p, 'index.html'))) ?? (await file(`${p}.html`));
  const target = found ?? (await file('404.html'));
  // Page-level CSP routes are keyed on the clean path; apply them for the resolved page too.
  for (const route of config.routes) {
    if (route.handle) break;
    if (route.headers?.['content-security-policy'] && matches(route, url))
      headers['content-security-policy'] = route.headers['content-security-policy'];
  }
  if (!target) {
    res.writeHead(404, headers);
    return res.end('Not found');
  }
  headers['content-type'] = TYPES[extname(target)] ?? 'application/octet-stream';
  let body = await readFile(target);
  // Compress text like Vercel does, so local performance measurements are realistic.
  if (
    /text|javascript|json|xml|svg/.test(headers['content-type']) &&
    /gzip/.test(req.headers['accept-encoding'] ?? '')
  ) {
    body = gzipSync(body);
    headers['content-encoding'] = 'gzip';
    headers['vary'] = 'Accept-Encoding';
  }
  res.writeHead(found ? 200 : 404, headers);
  res.end(body);
}).listen(port, () => console.log(`Serving .vercel/output on http://localhost:${port}`));
