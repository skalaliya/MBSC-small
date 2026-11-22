// Renders the printable training calendar (/training/<year>/print, per locale) to A4 PDFs in
// public/downloads, plus a manifest with the sha256 of the calendar JSON they were made from.
// check-dist fails the build if a PDF is missing or older than its calendar data.
//
//   npm run calendar:pdf     (builds without the PDF check, renders, then runs the full build)
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { chromium } from '@playwright/test';
import { calendarState } from './calendar-state.mjs';
import { PDF_LOCALES, PDF_MANIFEST, calendarPdfFile } from '../src/lib/calendar-pdf.ts';

const port = 4417;
const outDir = new URL('../public/downloads/', import.meta.url);
const { primary } = calendarState();

const server = spawn(process.execPath, ['scripts/serve-output.mjs'], {
  env: { ...process.env, PORT: String(port) },
  stdio: 'ignore',
});
const base = `http://localhost:${port}`;
try {
  for (let i = 0; ; i++) {
    try {
      await fetch(base);
      break;
    } catch {
      if (i > 50) throw new Error('serve-output did not start');
      await new Promise((r) => setTimeout(r, 100));
    }
  }
  await mkdir(outDir, { recursive: true });
  const manifestPath = new URL(PDF_MANIFEST, outDir);
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8').catch(() => '{}'));
  const source = await readFile(
    new URL(`../src/content/calendars/${primary}.json`, import.meta.url),
  );
  const hash = createHash('sha256').update(source).digest('hex');

  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const locale of PDF_LOCALES) {
    const path = `${locale === 'en' ? '' : `/${locale}`}/training/${primary}/print`;
    const res = await page.goto(base + path, { waitUntil: 'networkidle' });
    if (!res?.ok()) throw new Error(`${path}: HTTP ${res?.status()}`);
    await page.evaluate(() => document.fonts.ready);
    const file = calendarPdfFile(primary, locale);
    await page.pdf({
      path: new URL(file, outDir).pathname,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
    });
    manifest[file] = hash;
    console.log(`[calendar-pdf] ${path} -> public/downloads/${file}`);
  }
  await browser.close();
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
} finally {
  server.kill();
}
