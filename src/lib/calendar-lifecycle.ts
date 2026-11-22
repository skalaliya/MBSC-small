/**
 * Which training calendar years the site shows, and in what order.
 *
 * Lifecycle of a calendar year:
 * 1. Future: listed after the primary year, at /training/<year> (noindex).
 * 2. Primary: shown at /training. From the cutover date (1 October by default) next year's
 *    calendar takes over, so people can plan ahead before New Year.
 * 3. Outgoing: the previous year stays at /training/<year>, last in the tabs, while it still
 *    has sessions to run. Only those remaining sessions are shown.
 * 4. Retired: once its last session has ended, the page is no longer built and the URL
 *    redirects to /training.
 *
 * Every date here is a YYYY-MM-DD string in Melbourne time (see buildToday), so the build
 * server's time zone (UTC on Vercel) never shifts the result. Imports use .ts extensions so
 * Node scripts (vercel-headers, check-dist) can load this file directly.
 */
import { isISODate } from './dates.ts';

export interface Cutover {
  /** 1–12 */
  month: number;
  day: number;
}

export interface LifecycleSession {
  start: string | null;
  end: string | null;
}

export interface LifecycleCalendar<S extends LifecycleSession = LifecycleSession> {
  year: number;
  sessions: S[];
}

export const DEFAULT_CUTOVER: Cutover = { month: 10, day: 1 };
export const CALENDAR_TIME_ZONE = 'Australia/Melbourne';

/** Today's date (YYYY-MM-DD) in a time zone. */
export function isoDateIn(timeZone: string, now = new Date()): string {
  // en-CA formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

/**
 * The date the build treats as "today": Melbourne time, or CALENDAR_TODAY=YYYY-MM-DD when set
 * (used to test how the site will look on another day).
 */
export function buildToday(
  env: Record<string, string | undefined> = typeof process === 'undefined' ? {} : process.env,
  now = new Date(),
): string {
  const override = env.CALENDAR_TODAY?.trim();
  if (override) {
    if (!isISODate(override))
      throw new Error(`CALENDAR_TODAY must be a valid YYYY-MM-DD date, got "${override}"`);
    return override;
  }
  return isoDateIn(CALENDAR_TIME_ZONE, now);
}

/** Accepts YYYY-MM-DD or a Date (read as a local calendar date). */
export function toISO(today: string | Date): string {
  if (typeof today === 'string') {
    if (!isISODate(today)) throw new Error(`Invalid date "${today}"`);
    return today;
  }
  const m = String(today.getMonth() + 1).padStart(2, '0');
  const d = String(today.getDate()).padStart(2, '0');
  return `${today.getFullYear()}-${m}-${d}`;
}

function cutoverISO(year: number, cutover: Cutover): string {
  return `${year}-${String(cutover.month).padStart(2, '0')}-${String(cutover.day).padStart(2, '0')}`;
}

/**
 * The year shown at /training. From the cutover date, next year's calendar if it exists;
 * otherwise the current year, else the nearest future year, else the latest.
 */
export function defaultYear(
  years: number[],
  today: string | Date = new Date(),
  cutover: Cutover = DEFAULT_CUTOVER,
): number {
  if (years.length === 0) throw new Error('No training calendars found');
  const iso = toISO(today);
  const y = Number(iso.slice(0, 4));
  if (iso >= cutoverISO(y, cutover) && years.includes(y + 1)) return y + 1;
  if (years.includes(y)) return y;
  const future = years.filter((v) => v > y).sort((a, b) => a - b);
  return future[0] ?? Math.max(...years);
}

/** Sessions with dates that have not finished yet (undated "on request" sessions are dropped). */
export function remaining<S extends LifecycleSession>(sessions: S[], today: string | Date): S[] {
  const iso = toISO(today);
  return sessions.filter((s) => s.end !== null && s.end >= iso);
}

export interface CalendarPlan {
  primary: number;
  /** The previous year while it still has sessions to run, else null. */
  outgoing: number | null;
  /** Tab order: primary, later years ascending, then the outgoing year. */
  active: number[];
  /** Years with their own /training/<year> page (active minus primary). */
  pages: number[];
  /** Years with a calendar file but no page: they redirect to /training. */
  redirected: number[];
}

export function calendarPlan(
  calendars: LifecycleCalendar[],
  today: string | Date,
  cutover: Cutover = DEFAULT_CUTOVER,
): CalendarPlan {
  const iso = toISO(today);
  const years = calendars.map((c) => c.year).sort((a, b) => a - b);
  const primary = defaultYear(years, iso, cutover);
  const later = years.filter((y) => y > primary);
  const prev = calendars.find((c) => c.year === primary - 1);
  const outgoing = prev && remaining(prev.sessions, iso).length > 0 ? prev.year : null;
  const active = [primary, ...later, ...(outgoing === null ? [] : [outgoing])];
  const pages = active.filter((y) => y !== primary);
  const redirected = years.filter((y) => !pages.includes(y));
  return { primary, outgoing, active, pages, redirected };
}
