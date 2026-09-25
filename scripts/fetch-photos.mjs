// Downloads the chosen Unsplash photos (Unsplash License: free commercial use, attribution
// appreciated) into src/assets/images and writes src/data/credits.json.
// Re-run safe: skips files that already exist.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
import { writeFile, mkdir } from 'node:fs/promises';

const PHOTOS = [
  { file: 'hero-offshore-platform', id: '58uZ3FW7FB4', by: 'Nathan Forbes', w: 2400 },
  { file: 'header-offshore-night', id: 'VXwAU5gszKM', by: 'Gabriel Xavier', w: 2400 },
  { file: 'header-mine-aerial', id: 'EN1tF2EG-50', by: 'Shane McLendon', w: 2400 },
  { file: 'header-training-classroom', id: '3kc_75Rdgyk', by: 'Herlambang Tinasih Gusti', w: 2400 },
  { file: 'header-rebar-deck', id: 'jYNvXKTUYvs', by: 'Ricardo Gomez Angel', w: 2400 },
  { file: 'header-melbourne-skyline', id: 'dW8dOC8r7O4', by: 'Urlaubstracker', w: 2400 },
  { file: 'service-oil-gas', id: 'wFJCdcjXrxU', by: 'Yuan Chen', w: 1800 },
  { file: 'service-training', id: 'omrpeqLz6Po', by: 'ThisisEngineering', w: 1800 },
  { file: 'service-digital', id: 'C3DfIgig1j8', by: 'Frantisek Duris', w: 1800 },
  { file: 'service-mining', id: 'Evss0Whf5OI', by: 'omid roshan', w: 1800 },
  { file: 'service-safety', id: '7TR0TGS7zqg', by: 'Mufid Majnun', w: 1800 },
  { file: 'about-engineers', id: 'lPUalY6OKDU', by: 'Fiqih Alfarish', w: 1800 },
  { file: 'project-highway-bridge', id: 'bRY594ahbAs', by: 'Markus Spiske', w: 1800 },
  { file: 'project-underground-mine', id: 'PDhSqtLG4cw', by: 'Alpha Perspective', w: 1800 },
  { file: 'project-west-gate-bridge', id: '_5iCs24huUM', by: 'Enguerrand Photography', w: 1800 },
  { file: 'project-port-wharf', id: 'ASPYCE5hrbs', by: 'Ries Bosch', w: 1800 },
  { file: 'project-perth-cbd', id: 'ymgOYi8mroc', by: 'Nathan Hurst', w: 1800 },
  { file: 'project-pilbara-rail', id: 'QYcg2R8cHa0', by: 'Trevar Skillicorn-Chilver', w: 1800 },
  { file: 'ai-hero-neural', id: 'nGoCBxiaRO0', by: 'Growtika', w: 2400 },
  { file: 'ai-vr-training', id: 'hIz2lvAo6Po', by: 'XR Expo', w: 1800 },
  { file: 'ai-geology-pit', id: 'oF7hh97lVqA', by: 'Dion Beetson', w: 1800 },
  { file: 'ai-drone', id: 'JjtB1atPZ5k', by: 'Sébastien Bourguet', w: 1800 },
  { file: 'ai-fleet', id: 'jbJp18srifE', by: 'Lachlan', w: 1800 },
];

const dir = fileURLToPath(new URL('../src/assets/images/', import.meta.url));
await mkdir(dir, { recursive: true });
for (const p of PHOTOS) {
  const out = `${dir}${p.file}.jpg`;
  if (existsSync(out)) continue;
  const res = await fetch(`https://unsplash.com/photos/${p.id}/download?force=true&w=${p.w}`, {
    headers: { 'user-agent': 'Mozilla/5.0 (MBSC site build)' },
  });
  if (!res.ok) throw new Error(`Download failed for ${p.id}: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await sharp(buf)
    .rotate()
    .resize({ width: p.w, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out);
  console.log('saved', p.file);
}
const credits = PHOTOS.map((p) => ({
  file: `${p.file}.jpg`,
  photographer: p.by,
  url: `https://unsplash.com/photos/${p.id}`,
  source: 'Unsplash',
}));
await writeFile(
  fileURLToPath(new URL('../src/data/credits.json', import.meta.url)),
  JSON.stringify(credits, null, 2) + '\n',
);
console.log(`credits: ${credits.length}`);
