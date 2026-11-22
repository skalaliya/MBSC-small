/** Calendar helpers with no Astro dependencies, so they can be unit-tested directly. */
import { parseISODate, toISODate } from './dates';
import type { Session } from './calendar-model';

export {
  buildToday,
  calendarPlan,
  defaultYear,
  remaining,
  type CalendarPlan,
  type Cutover,
} from './calendar-lifecycle';

export interface Calendar {
  year: number;
  sessions: Session[];
}

export interface DatedSession extends Session {
  year: number;
  start: string;
  end: string;
}

/** Dated sessions ending on or after `from`, soonest first. */
export function upcoming(
  calendars: Calendar[],
  from: Date | string,
  limit: number,
): DatedSession[] {
  const today = typeof from === 'string' ? from : toISODate(from);
  return calendars
    .flatMap((c) => c.sessions.map((s) => ({ ...s, year: c.year })))
    .filter((s): s is DatedSession => s.start !== null && s.end !== null && s.end >= today)
    .sort((a, b) => a.start.localeCompare(b.start))
    .slice(0, limit);
}

export function sessionDates(s: { start: string | null; end: string | null }) {
  if (!s.start || !s.end) return null;
  return { start: parseISODate(s.start), end: parseISODate(s.end) };
}
