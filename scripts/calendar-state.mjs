// The calendar plan for Node scripts, decided exactly as the Astro build decides it
// (src/lib/calendar-lifecycle.ts, cutover from src/data/site.ts, Melbourne date or CALENDAR_TODAY).
import { readFileSync, readdirSync } from 'node:fs';
import { buildToday, calendarPlan } from '../src/lib/calendar-lifecycle.ts';
import { site } from '../src/data/site.ts';

export const calendarDir = new URL('../src/content/calendars/', import.meta.url);

export function loadCalendars() {
  return readdirSync(calendarDir)
    .filter((f) => /^\d{4}\.json$/.test(f))
    .map((f) => JSON.parse(readFileSync(new URL(f, calendarDir), 'utf8')))
    .sort((a, b) => a.year - b.year);
}

export function calendarState() {
  const calendars = loadCalendars();
  const today = buildToday();
  return { calendars, today, ...calendarPlan(calendars, today, site.calendar.cutover) };
}

/**
 * Vercel routes (307, temporary) sending /training/<year> for years without a page (the primary year, which lives
 * at /training, and retired years) to that locale's /training. `prefixes` are the locale path
 * prefixes actually built, e.g. ['', '/fr', '/ar'].
 */
export function calendarRedirects(redirected, prefixes) {
  return prefixes.flatMap((prefix) =>
    redirected.map((year) => ({
      src: `^${prefix}/training/${year}/?$`,
      headers: { Location: `${prefix}/training` },
      // Temporary: the primary year's URL becomes a page again once it is the outgoing year.
      status: 307,
    })),
  );
}
