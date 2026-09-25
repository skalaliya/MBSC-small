// Vectorises public/logo.jpg into src/assets/logo/mbsc-roundel.svg.
// The gradient ring is flattened to a marker colour before tracing, then replaced
// with a native SVG linearGradient so the ring stays smooth at any size.
import sharp from 'sharp';
import ImageTracer from 'imagetracerjs';
import { writeFile, mkdir } from 'node:fs/promises';

const SCALE = Number(process.env.LOGO_SCALE ?? 2);
import { fileURLToPath } from 'node:url';
const SRC = fileURLToPath(new URL('../src/assets/logo/logo-source.jpg', import.meta.url));
const OUT = new URL('../src/assets/logo/mbsc-roundel.svg', import.meta.url);
const MARKER = [0, 255, 0];

const size = 500 * SCALE;
const { data } = await sharp(SRC)
  .resize(size, size, { kernel: 'lanczos3' })
  .median(3)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const cx = size / 2,
  cy = size / 2;
const outerR = 199 * SCALE,
  innerR = 127 * SCALE;
for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    const i = (y * size + x) * 4;
    const r = Math.hypot(x - cx, y - cy);
    const [R, G, B] = [data[i], data[i + 1], data[i + 2]];
    const lum = 0.299 * R + 0.587 * G + 0.114 * B;
    const sat = Math.max(R, G, B) - Math.min(R, G, B);
    if (r > outerR + 3 * SCALE) {
      data[i + 3] = 0; // outside the roundel: transparent
    } else if (r > innerR && r <= outerR + 3 * SCALE) {
      // ring: white-ish text/lines stay white, everything else becomes the marker
      if (lum > 205 && sat < 60) {
        data[i] = data[i + 1] = data[i + 2] = 255;
      } else {
        data[i] = MARKER[0];
        data[i + 1] = MARKER[1];
        data[i + 2] = MARKER[2];
      }
      data[i + 3] = 255;
    }
  }
}

// Fixed palette measured from the original (k-means on the centre disc) so the
// flag red, navy and white never get merged by automatic quantisation.
const hex = (h) => ({
  r: parseInt(h.slice(1, 3), 16),
  g: parseInt(h.slice(3, 5), 16),
  b: parseInt(h.slice(5, 7), 16),
  a: 255,
});
const pal = [
  '#FFFFFF',
  '#263C6D',
  '#114482',
  '#B43245',
  '#CA5A99',
  '#9B6EB2',
  '#EBD8DF',
  '#604F83',
  '#00FF00',
]
  .map(hex)
  .concat([{ r: 0, g: 0, b: 0, a: 0 }]);

const svg = ImageTracer.imagedataToSVG(
  { width: size, height: size, data },
  {
    pal,
    colorquantcycles: 1,
    ltres: 1,
    qtres: 1,
    pathomit: Number(process.env.LOGO_OMIT ?? 24),
    blurradius: 0,
    roundcoords: 1,
    strokewidth: 0,
    linefilter: true,
    viewbox: true,
    desc: false,
  },
);

// Replace marker-coloured fills with the gradient, drop fully transparent layers.
let out = svg
  .replace(/<path[^>]*opacity="0"[^>]*\/>/g, '')
  .replace(/fill="rgb\((\d+),(\d+),(\d+)\)"/g, (m, r, g, b) =>
    +g > 200 && +r < 80 && +b < 80 ? 'fill="url(#mbsc-ring)"' : m,
  );
const clipR = outerR + 1 * SCALE;
const defs = `<defs><clipPath id="mbsc-clip"><circle cx="${cx}" cy="${cy}" r="${clipR}"/></clipPath><linearGradient id="mbsc-ring" x1="${cx - outerR}" y1="0" x2="${cx + outerR}" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#F5565A"/><stop offset=".5" stop-color="#C751AF"/><stop offset="1" stop-color="#914FF7"/></linearGradient></defs>`;
out = out.replace(
  /<svg([^>]*)>/,
  (_m, attrs) =>
    `<svg${attrs.replace(/width="\d+" height="\d+"/, '')} role="img" aria-label="MBSC Australia Pty Ltd — Energy &amp; Mining">${defs}`,
);
// Draw gradient-ring paths first so white text/lines sit on top.
const paths = out.match(/<path[^>]*\/>/g) ?? [];
const ring = paths.filter((p) => p.includes('url(#mbsc-ring)'));
const rest = paths.filter((p) => !p.includes('url(#mbsc-ring)'));
out = out
  .replace(/<path[^>]*\/>/g, '')
  .replace('</svg>', `<g clip-path="url(#mbsc-clip)">${ring.join('')}${rest.join('')}</g></svg>`);

await mkdir(new URL('.', OUT), { recursive: true });
await writeFile(OUT, out);
console.log(`paths: ${paths.length} (ring ${ring.length}), bytes: ${out.length}`);
