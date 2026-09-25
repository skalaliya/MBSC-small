// Shared calendar model used by the build (content.config.ts) and maintenance scripts.
import { CATEGORIES, CERTIFICATES, DELIVERY } from './content.ts';
import { isISODate, parseISODate } from './dates.ts';

export const LOCATIONS = ['melbourne', 'perth', 'global', 'clientSite'] as const;
export type LocationKey = (typeof LOCATIONS)[number];

export interface Session {
  id: string;
  course: string;
  title: { en: string; fr: string; ar: string };
  /** YYYY-MM-DD, or null for "dates on request" sessions. */
  start: string | null;
  end: string | null;
  /** 1–12. For dated sessions this must match the start month. */
  month: number;
  category: (typeof CATEGORIES)[number];
  delivery: (typeof DELIVERY)[number];
  location: LocationKey;
  certificate: (typeof CERTIFICATES)[number];
}

export interface CalendarFile {
  year: number;
  sessions: Session[];
}

/** Returns a list of human-readable problems; empty means valid. */
export function validateCalendar(cal: CalendarFile): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  for (const s of cal.sessions) {
    const where = `${cal.year}/${s.id}`;
    if (ids.has(s.id)) errors.push(`${where}: duplicate id`);
    ids.add(s.id);
    if (!(CATEGORIES as readonly string[]).includes(s.category))
      errors.push(`${where}: unknown category ${s.category}`);
    if (!(DELIVERY as readonly string[]).includes(s.delivery))
      errors.push(`${where}: unknown delivery ${s.delivery}`);
    if (!(LOCATIONS as readonly string[]).includes(s.location))
      errors.push(`${where}: unknown location ${s.location}`);
    if (!(CERTIFICATES as readonly string[]).includes(s.certificate))
      errors.push(`${where}: unknown certificate ${s.certificate}`);
    if (!s.title?.en || !s.title?.fr) errors.push(`${where}: missing title translation`);
    if (s.month < 1 || s.month > 12) errors.push(`${where}: month out of range`);
    if ((s.start === null) !== (s.end === null))
      errors.push(`${where}: start and end must both be set or both be null`);
    if (s.start && s.end) {
      if (!isISODate(s.start) || !isISODate(s.end)) {
        errors.push(`${where}: invalid ISO date`);
        continue;
      }
      const a = parseISODate(s.start),
        b = parseISODate(s.end);
      if (a > b) errors.push(`${where}: start after end`);
      if (a.getFullYear() !== cal.year) errors.push(`${where}: start is not in ${cal.year}`);
      if (a.getMonth() + 1 !== s.month)
        errors.push(`${where}: month ${s.month} does not match start ${s.start}`);
    }
  }
  return errors;
}
