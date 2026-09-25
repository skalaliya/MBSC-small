// Renders a 1200x630 social card per built page into public/og/<name>.png.
// Reads titles from the production build, so run after `npm run build`, then rebuild so pages
// reference the new images:   npm run og
// Fonts are bundled from @fontsource (WOFF), so output never depends on system fonts.
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import { ogName } from '../src/lib/og.ts';
import { readFile, readdir, mkdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const staticDir = join(root, '.vercel/output/static');
const outDir = join(root, 'public/og');
const font = (p) => readFile(join(root, 'node_modules/@fontsource', p));
const fonts = [
  {
    name: 'Manrope',
    data: await font('manrope/files/manrope-latin-800-normal.woff'),
    weight: 800,
    style: 'normal',
  },
  {
    name: 'Manrope',
    data: await font('manrope/files/manrope-latin-700-normal.woff'),
    weight: 700,
    style: 'normal',
  },
  {
    name: 'Inter',
    data: await font('inter/files/inter-latin-500-normal.woff'),
    weight: 500,
    style: 'normal',
  },
];
const logo = `data:image/png;base64,${(await readFile(join(root, 'src/assets/logo/mbsc-roundel.png'))).toString('base64')}`;

// Pages that should keep the default card (not meant for sharing).
const SKIP = new Set(['/404', '/contact/sent', '/fr/contact/sent', '/credits', '/fr/credits']);

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x27;/g, "'");
const text = (html) =>
  decode(
    html
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  );

async function* pages(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory() && !['_astro', 'og', '_vercel'].includes(e.name)) yield* pages(p);
    else if (e.name === 'index.html' || e.name === '404.html') yield p;
  }
}

const el = (type, style, children) => ({ type, props: { style, children } });

function card({ title, eyebrow }) {
  const size = title.length > 60 ? 54 : title.length > 36 ? 62 : 72;
  return el(
    'div',
    {
      width: 1200,
      height: 630,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '72px 80px',
      background: '#0a1533',
      backgroundImage:
        'radial-gradient(circle at 88% 8%, rgba(145,79,247,0.45), rgba(10,21,51,0) 45%)',
      fontFamily: 'Inter',
      color: '#fff',
    },
    [
      el('div', { display: 'flex', alignItems: 'center', gap: 24 }, [
        { type: 'img', props: { src: logo, width: 96, height: 96 } },
        el('div', { display: 'flex', flexDirection: 'column' }, [
          el(
            'div',
            { fontFamily: 'Manrope', fontWeight: 800, fontSize: 30, letterSpacing: 2 },
            'MBSC AUSTRALIA',
          ),
          el(
            'div',
            { fontSize: 20, color: '#c3cdea', letterSpacing: 3, marginTop: 6 },
            'ENERGY · MINING · INFRASTRUCTURE',
          ),
        ]),
      ]),
      el('div', { display: 'flex', flexDirection: 'column' }, [
        el(
          'div',
          {
            fontSize: 24,
            color: '#c9b3f5',
            letterSpacing: 4,
            textTransform: 'uppercase',
            marginBottom: 18,
          },
          eyebrow,
        ),
        el(
          'div',
          {
            fontFamily: 'Manrope',
            fontWeight: 700,
            fontSize: size,
            lineHeight: 1.08,
            maxWidth: 1000,
          },
          title,
        ),
      ]),
      el('div', { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }, [
        el(
          'div',
          {
            width: 160,
            height: 8,
            borderRadius: 4,
            backgroundImage: 'linear-gradient(90deg, #f5565a, #c751af, #914ff7)',
          },
          '',
        ),
        el('div', { fontSize: 24, color: '#c3cdea' }, 'mbscaustralia.com.au'),
      ]),
    ],
  );
}

await mkdir(outDir, { recursive: true });
let count = 0;
for await (const file of pages(staticDir)) {
  const rel =
    '/' +
    relative(staticDir, file)
      .replace(/(^|\/)index\.html$/, '')
      .replace(/\.html$/, '');
  const route = rel === '/' ? '/' : rel.replace(/\/$/, '');
  if (SKIP.has(route)) continue;
  const html = await readFile(file, 'utf8');
  const lang = /<html lang="([^"]+)"/.exec(html)?.[1] ?? 'en-AU';
  if (!/^(en|fr)/.test(lang)) continue; // other scripts (e.g. Arabic) use the default card
  // Only look inside <main> so the navbar's tagline is never mistaken for the page eyebrow.
  const main = html.slice(Math.max(0, html.indexOf('<main')));
  const h1 = /<h1[^>]*>([\s\S]*?)<\/h1>/.exec(main)?.[1];
  const title = h1 ? text(h1) : text(/<title>([^<]*)/.exec(html)?.[1] ?? 'MBSC Australia');
  const eyebrowMatch = /<span class="[^"]*uppercase[^"]*">([^<]{2,60})<\/span>/.exec(main);
  const eyebrow = eyebrowMatch
    ? text(eyebrowMatch[1])
    : lang.startsWith('fr')
      ? 'Conseil en ingénierie'
      : 'Engineering consultancy';
  const svg = await satori(card({ title, eyebrow }), { width: 1200, height: 630, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  // Palette PNG keeps text crisp at a fraction of the size.
  await sharp(png)
    .png({ palette: true, quality: 90, compressionLevel: 9 })
    .toFile(join(outDir, `${ogName(route)}.png`));
  count++;
}
console.log(`og: ${count} images written to public/og`);
