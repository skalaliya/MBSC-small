// Checks every partner link target: HTTP 200 and a self-referencing canonical (so our UTM tags
// never create duplicate URLs on the partner's site). Network-dependent: run before merging and
// after deploying, not inside the build.
import { readFile } from 'node:fs/promises';

const partners = JSON.parse(
  await readFile(new URL('../src/content/partners.json', import.meta.url), 'utf8'),
);
const failures = [];
let checked = 0;
for (const p of partners.filter((x) => x.confirmed)) {
  const roots = [...new Set(Object.values(p.site))];
  for (const root of roots)
    for (const path of Object.values(p.paths)) {
      const url = root.replace(/\/+$/, '') + path;
      checked++;
      try {
        const res = await fetch(`${url}?utm_source=check`, { redirect: 'follow' });
        const html = await res.text();
        const canonical = /<link rel="canonical" href="([^"]+)"/.exec(html)?.[1];
        if (res.status !== 200) failures.push(`${url}: HTTP ${res.status}`);
        else if (canonical !== url) failures.push(`${url}: canonical is ${canonical ?? 'missing'}`);
      } catch (e) {
        failures.push(`${url}: ${e.message}`);
      }
    }
}
if (failures.length) {
  console.error(
    `check-partner-links: ${failures.length} problem(s)\n  - ${failures.join('\n  - ')}`,
  );
  process.exit(1);
}
console.log(`check-partner-links: ${checked} links OK`);
