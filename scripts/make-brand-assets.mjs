// Renders raster brand assets from the vector master (src/assets/logo/mbsc-roundel.svg):
// transparent 512px PNG for the site, favicons, and the default 1200x630 social card.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { mkdir, readFile } from 'node:fs/promises';

const p = (rel) => fileURLToPath(new URL(rel, import.meta.url));
const svg = await readFile(p('../src/assets/logo/mbsc-roundel.svg'));
// The traced artwork sits inside a 1000x1000 canvas with ~10% transparent margin; trim it.
const master = await sharp(svg, { density: 144 }).resize(1024, 1024).png().toBuffer();
const trimmed = await sharp(master).trim({ threshold: 1 }).png().toBuffer();
const square = (size) =>
  sharp(trimmed).resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } });

await square(512)
  .png({ palette: true, quality: 90, compressionLevel: 9 })
  .toFile(p('../src/assets/logo/mbsc-roundel.png'));
await square(32).png().toFile(p('../public/favicon-32x32.png'));
await square(16).png().toFile(p('../public/favicon-16x16.png'));
await square(192)
  .png({ palette: true, quality: 90 })
  .toFile(p('../public/android-chrome-192x192.png'));
await square(512)
  .png({ palette: true, quality: 90, compressionLevel: 9 })
  .toFile(p('../public/android-chrome-512x512.png'));
const touch = await square(152).png().toBuffer();
await sharp({ create: { width: 180, height: 180, channels: 4, background: '#ffffff' } })
  .composite([{ input: touch, left: 14, top: 14 }])
  .png()
  .toFile(p('../public/apple-touch-icon.png'));
// favicon.ico: a 32px PNG-encoded ICO is supported by all current browsers.
const ico32 = await square(32).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6);
header.writeUInt8(32, 7);
header.writeUInt8(0, 8);
header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(ico32.length, 14);
header.writeUInt32LE(22, 18);
const { writeFile } = await import('node:fs/promises');
await writeFile(p('../public/favicon.ico'), Buffer.concat([header, ico32]));

// Default social card.
await mkdir(p('../public/og'), { recursive: true });
const W = 1200,
  H = 630;
const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#F5565A"/><stop offset=".5" stop-color="#C751AF"/><stop offset="1" stop-color="#914FF7"/></linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#ffffff" stroke-opacity=".05"/></pattern>
    <radialGradient id="glow" cx=".85" cy=".1" r=".7"><stop offset="0" stop-color="#914FF7" stop-opacity=".35"/><stop offset="1" stop-color="#0A1533" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#0A1533"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect x="96" y="${H - 96}" width="120" height="6" rx="3" fill="url(#g)"/>
  <text x="440" y="250" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="30" font-weight="600" fill="#C3CDEA" letter-spacing="3">MBSC AUSTRALIA</text>
  <text x="440" y="318" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="54" font-weight="700" fill="#FFFFFF">Engineering integrity</text>
  <text x="440" y="382" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="54" font-weight="700" fill="#FFFFFF">for energy, mining</text>
  <text x="440" y="446" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="54" font-weight="700" fill="#FFFFFF">and infrastructure.</text>
</svg>`);
const badge = await square(280).png().toBuffer();
await sharp(bg)
  .composite([{ input: badge, left: 96, top: 150 }])
  .png({ compressionLevel: 9 })
  .toFile(p('../public/og/og-default.png'));
console.log('brand assets written');
