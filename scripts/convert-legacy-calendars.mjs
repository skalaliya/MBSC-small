// One-off migration: public/calendars/{year}.json (free-text dates) → src/content/calendars/{year}.json.
import { readFile, writeFile } from 'node:fs/promises';
import { validateCalendar } from '../src/lib/calendar-model.ts';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const DELIVERY = { 'ON-SITE': 'onsite', VIRTUAL: 'virtual', HYBRID: 'hybrid' };
const LOCATION = {
  Melbourne: 'melbourne',
  Perth: 'perth',
  Global: 'global',
  'Client Site': 'clientSite',
};
const pad = (n) => String(n).padStart(2, '0');

for (const year of process.argv.slice(2).map(Number)) {
  const src = JSON.parse(
    await readFile(new URL(`../public/calendars/${year}.json`, import.meta.url), 'utf8'),
  );
  const sessions = [];
  src.months.forEach((m, mi) => {
    for (const e of m.events) {
      let start = null,
        end = null;
      const r = /^(\d{1,2})(?:–(\d{1,2}))? (\w+)$/.exec(e.dates);
      if (r) {
        const mo = MONTHS.indexOf(r[3]);
        if (mo !== mi) throw new Error(`${year} ${e.id}: month text ${r[3]} is not ${MONTHS[mi]}`);
        start = `${year}-${pad(mo + 1)}-${pad(r[1])}`;
        end = `${year}-${pad(mo + 1)}-${pad(r[2] ?? r[1])}`;
      } else if (e.dates !== 'Custom Dates') {
        throw new Error(`${year} ${e.id}: unrecognised date "${e.dates}"`);
      }
      const delivery = DELIVERY[e.delivery],
        location = LOCATION[e.location.en];
      if (!delivery || !location) throw new Error(`${year} ${e.id}: unmapped delivery/location`);
      sessions.push({
        id: e.id,
        course: e.id.replace(/-(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)(-\d+)?$/, ''),
        title: e.title,
        start,
        end,
        month: mi + 1,
        category: e.category,
        delivery,
        location,
        certificate: e.certificateType,
      });
    }
  });
  const cal = { year, sessions };
  const errors = validateCalendar(cal);
  if (errors.length) throw new Error(errors.join('\n'));
  await writeFile(
    new URL(`../src/content/calendars/${year}.json`, import.meta.url),
    JSON.stringify(cal, null, 2) + '\n',
  );
  console.log(`${year}: ${sessions.length} sessions`);
}
