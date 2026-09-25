/**
 * Date helpers. Calendar dates are plain YYYY-MM-DD strings with no time zone.
 * Always parse them as local calendar dates: `new Date('2026-01-13')` is UTC midnight,
 * which shows as 12 January in the Americas and breaks weekday checks.
 */
const ISO = /^(\d{4})-(\d{2})-(\d{2})$/;

export function isISODate(value: string): boolean {
  const m = ISO.exec(value);
  if (!m) return false;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const date = new Date(y, mo - 1, d);
  return date.getFullYear() === y && date.getMonth() === mo - 1 && date.getDate() === d;
}

export function parseISODate(value: string): Date {
  const m = ISO.exec(value);
  if (!m || !isISODate(value)) throw new Error(`Invalid ISO date "${value}"`);
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() + days);
  return d;
}

/** Inclusive day count between two local dates. */
export function daysInclusive(start: Date, end: Date): number {
  const a = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const b = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
  return Math.round((b - a) / 86_400_000) + 1;
}

/** ISO-8601 week number and year (weeks start Monday; week 1 contains 4 January). */
export function isoWeek(date: Date): { year: number; week: number; weekday: number } {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const weekday = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - weekday);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
  return { year: d.getUTCFullYear(), week, weekday };
}

/** Local date for an ISO week-year, week and weekday (1 = Monday … 7 = Sunday). */
export function fromIsoWeek(year: number, week: number, weekday: number): Date {
  const jan4 = new Date(year, 0, 4);
  const jan4Weekday = jan4.getDay() || 7;
  const mondayWeek1 = addDays(jan4, 1 - jan4Weekday);
  return addDays(mondayWeek1, (week - 1) * 7 + (weekday - 1));
}

export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

/**
 * "13–17 January 2026", "30 March – 3 April 2026", "31 August 2026".
 * Uses Intl so French renders "13–17 janvier 2026".
 */
export function formatRange(start: Date, end: Date, locale: string, withYear = false): string {
  const opts: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    ...(withYear ? { year: 'numeric' } : {}),
  };
  const fmt = new Intl.DateTimeFormat(locale, opts);
  if (start.getTime() === end.getTime()) return fmt.format(start);
  return fmt.formatRange(start, end);
}
