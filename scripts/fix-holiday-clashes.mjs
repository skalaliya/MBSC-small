// Usage: node scripts/fix-holiday-clashes.mjs <year> [--write]
// Moves sessions that touch a public holiday where they run (src/lib/holidays.ts) to the nearest
// free slot (fewest days away) in the SAME month: same length, weekdays only, no holiday, no overlap with another
// session at the same location or another run of the same course. Without --write it only reports.
// If a session has no free slot in its month it stops: that needs a person to decide.
import { readFile, writeFile } from 'node:fs/promises';
import { validateCalendar } from '../src/lib/calendar-model.ts';
import { addDays, daysInclusive, isWeekend, parseISODate, toISODate } from '../src/lib/dates.ts';
import { HOLIDAY_YEARS, holidayClashes } from '../src/lib/holidays.ts';
import { buildToday } from '../src/lib/calendar-lifecycle.ts';

const year = Number(process.argv[2]);
const write = process.argv.includes('--write');
if (!year) {
  console.error('Usage: node scripts/fix-holiday-clashes.mjs <year> [--write]');
  process.exit(1);
}
if (!HOLIDAY_YEARS.includes(year)) {
  console.error(`No public holidays listed for ${year} in src/lib/holidays.ts. Add them first.`);
  process.exit(1);
}
const file = new URL(`../src/content/calendars/${year}.json`, import.meta.url);
const cal = JSON.parse(await readFile(file, 'utf8'));

const overlaps = (a, b) => a.start <= b.end && b.start <= a.end;
const today = buildToday();
// Finished sessions are history: never rewrite them. Longest first, as they are hardest to place.
const length = (s) => daysInclusive(parseISODate(s.start), parseISODate(s.end));
const clashing = cal.sessions
  .filter((s) => s.end && s.end >= today && holidayClashes(s).length > 0)
  .sort((a, b) => length(b) - length(a));
const moves = [];
for (const s of clashing) {
  const start = parseISODate(s.start);
  const days = length(s);
  // Nearest start first; on a tie, later before earlier (a day's delay beats starting early).
  const offsets = [];
  for (let d = 1; d <= 31; d++) offsets.push(d, -d);
  let found = null;
  for (const off of offsets) {
    const a = addDays(start, off);
    const b = addDays(a, days - 1);
    if (a.getMonth() !== start.getMonth() || b.getMonth() !== start.getMonth()) continue;
    if (a.getFullYear() !== year) continue;
    let weekend = false;
    for (let d = a; d <= b; d = addDays(d, 1)) if (isWeekend(d)) weekend = true;
    if (weekend) continue;
    const cand = { ...s, start: toISODate(a), end: toISODate(b) };
    if (holidayClashes(cand).length) continue;
    const busy = cal.sessions.some(
      (o) =>
        o !== s &&
        o.start &&
        (o.location === s.location || o.course === s.course) &&
        overlaps(cand, o),
    );
    if (busy) continue;
    found = cand;
    break;
  }
  if (!found) {
    console.error(
      `${s.id} (${s.start}–${s.end}, ${s.location}): no free slot in the same month. Decide manually.`,
    );
    process.exit(1);
  }
  const why = holidayClashes(s)
    .map((h) => h.name)
    .join(', ');
  moves.push(`${s.id}: ${s.start}–${s.end} → ${found.start}–${found.end} (${why})`);
  s.start = found.start;
  s.end = found.end;
}

const errors = validateCalendar(cal);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(moves.length ? moves.join('\n') : `No holiday clashes in ${year}.`);
if (write && moves.length) {
  await writeFile(file, JSON.stringify(cal, null, 2) + '\n');
  console.log(`Wrote ${year}.json (${moves.length} moved).`);
}
