// Usage: npm run calendar:year -- <sourceYear> <targetYear> [--force]
// Creates src/content/calendars/<targetYear>.json from an existing year.
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { shiftCalendar } from './calendar-shift.ts';
import { validateCalendar } from '../src/lib/calendar-model.ts';
import { isWeekend, parseISODate } from '../src/lib/dates.ts';

const [from, to] = process.argv.slice(2).filter((a) => !a.startsWith('--')).map(Number);
const force = process.argv.includes('--force');
if (!from || !to) {
  console.error('Usage: npm run calendar:year -- <sourceYear> <targetYear> [--force]');
  process.exit(1);
}
const dir = new URL('../src/content/calendars/', import.meta.url);
const out = new URL(`${to}.json`, dir);
if (existsSync(out) && !force) {
  console.error(`${to}.json already exists. Re-run with --force to overwrite it.`);
  process.exit(1);
}
const source = JSON.parse(await readFile(new URL(`${from}.json`, dir), 'utf8'));
const cal = shiftCalendar(source, to);
const errors = validateCalendar(cal);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
const weekend = cal.sessions.filter((s) => s.start && (isWeekend(parseISODate(s.start)) || isWeekend(parseISODate(s.end))));
await writeFile(out, JSON.stringify(cal, null, 2) + '\n');
console.log(`Wrote ${to}.json: ${cal.sessions.length} sessions, ${weekend.length} starting or ending on a weekend.`);
