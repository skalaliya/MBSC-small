import { addDays, daysInclusive, fromIsoWeek, isoWeek, parseISODate, toISODate } from '../src/lib/dates.ts';
import type { CalendarFile, Session } from '../src/lib/calendar-model.ts';

const ABBR = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

/**
 * Builds a calendar for `targetYear` from `source` by keeping each session on the same ISO week
 * and weekday, so a Monday–Friday course stays Monday–Friday. Duration is preserved.
 * Week 53 (only some years have it) maps to week 52.
 */
export function shiftCalendar(source: CalendarFile, targetYear: number): CalendarFile {
  const weeksInTarget = isoWeek(new Date(targetYear, 11, 28)).week;
  const used = new Set<string>();
  const sessions: Session[] = source.sessions.map((s) => {
    let start: string | null = null;
    let end: string | null = null;
    let month = s.month;
    if (s.start && s.end) {
      const a = parseISODate(s.start);
      const length = daysInclusive(a, parseISODate(s.end));
      const { week, weekday } = isoWeek(a);
      let target = fromIsoWeek(targetYear, Math.min(week, weeksInTarget), weekday);
      // Keep the session inside the target calendar year.
      while (target.getFullYear() < targetYear) target = addDays(target, 7);
      while (target.getFullYear() > targetYear) target = addDays(target, -7);
      start = toISODate(target);
      end = toISODate(addDays(target, length - 1));
      month = target.getMonth() + 1;
    }
    let id = `${s.course}-${ABBR[month - 1]}`;
    for (let n = 2; used.has(id); n++) id = `${s.course}-${ABBR[month - 1]}-${n}`;
    used.add(id);
    return { ...s, id, start, end, month };
  });
  sessions.sort((x, y) => x.month - y.month || (x.start ?? '9').localeCompare(y.start ?? '9'));
  return { year: targetYear, sessions };
}
