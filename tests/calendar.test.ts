import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { validateCalendar, type CalendarFile } from '../src/lib/calendar-model';
import { shiftCalendar } from '../scripts/calendar-shift';
import { daysInclusive, isWeekend, parseISODate } from '../src/lib/dates';
import { defaultYear, upcoming } from '../src/lib/queries.pure';
import { buildToday, calendarPlan, isoDateIn, remaining } from '../src/lib/calendar-lifecycle';
import { HOLIDAY_YEARS, holidayClashes } from '../src/lib/holidays';
import { calendarRedirects } from '../scripts/calendar-state.mjs';

const dir = new URL('../src/content/calendars/', import.meta.url);
const load = (y: number) =>
  JSON.parse(readFileSync(new URL(`${y}.json`, dir), 'utf8')) as CalendarFile;
const years = readdirSync(dir)
  .filter((f) => f.endsWith('.json'))
  .map((f) => Number(f.slice(0, 4)));

describe('calendar files', () => {
  it.each(years)('%i is valid', (y) => {
    expect(validateCalendar(load(y))).toEqual([]);
  });
  it('has no future sessions on weekends', () => {
    const today = '2026-09-25';
    for (const y of years) {
      const bad = load(y).sessions.filter(
        (s) =>
          s.start &&
          s.end &&
          s.end >= today &&
          (isWeekend(parseISODate(s.start)) || isWeekend(parseISODate(s.end))),
      );
      expect(bad.map((s) => `${y}/${s.id}`)).toEqual([]);
    }
  });
});

describe('public holidays', () => {
  it('covers every calendar year', () => {
    expect(years.filter((y) => !HOLIDAY_YEARS.includes(y))).toEqual([]);
  });
  it('has no future session on a public holiday where it runs', () => {
    const today = '2026-11-23';
    const bad = years.flatMap((y) =>
      load(y)
        .sessions.filter((s) => s.end && s.end >= today && holidayClashes(s).length > 0)
        .map((s) => `${y}/${s.id} ${s.start}: ${holidayClashes(s).map((h) => h.name)}`),
    );
    expect(bad).toEqual([]);
  });
  it('applies state holidays by location', () => {
    const base = { start: '2027-06-07', end: '2027-06-09' }; // WA Day
    expect(holidayClashes({ ...base, location: 'perth' })).toHaveLength(1);
    expect(holidayClashes({ ...base, location: 'melbourne' })).toHaveLength(0);
    expect(holidayClashes({ ...base, location: 'global' })).toHaveLength(0);
    expect(
      holidayClashes({ start: '2027-03-26', end: '2027-03-26', location: 'global' }),
    ).toHaveLength(1);
  });
});

describe('shiftCalendar', () => {
  const source = load(2027);
  const shifted = shiftCalendar(source, 2029);
  it('produces a valid calendar with the same sessions', () => {
    expect(validateCalendar(shifted)).toEqual([]);
    expect(shifted.sessions).toHaveLength(source.sessions.length);
  });
  it('keeps weekdays and durations', () => {
    const byCourse = new Map(source.sessions.map((s) => [`${s.course}:${s.month}:${s.start}`, s]));
    for (const s of shifted.sessions) {
      if (!s.start || !s.end) continue;
      expect(isWeekend(parseISODate(s.start))).toBe(false);
      expect(isWeekend(parseISODate(s.end))).toBe(false);
    }
    const a = source.sessions.find((s) => s.start)!;
    const b = shifted.sessions.find((s) => s.course === a.course && s.start)!;
    expect(parseISODate(b.start!).getDay()).toBe(parseISODate(a.start!).getDay());
    expect(daysInclusive(parseISODate(b.start!), parseISODate(b.end!))).toBe(
      daysInclusive(parseISODate(a.start!), parseISODate(a.end!)),
    );
    expect(byCourse.size).toBeGreaterThan(0);
  });
  it('maps week 53 into a 52-week year without leaving the year', () => {
    const cal: CalendarFile = {
      year: 2026,
      sessions: [
        {
          id: 'x-dec',
          course: 'x',
          title: { en: 'X', fr: 'X', ar: 'X' },
          start: '2026-12-28',
          end: '2026-12-30',
          month: 12,
          category: 'oilGas',
          delivery: 'onsite',
          location: 'melbourne',
          certificate: 'technicalCertification',
        },
      ],
    };
    const out = shiftCalendar(cal, 2027);
    expect(out.sessions[0]!.start!.startsWith('2027-12')).toBe(true);
    expect(validateCalendar(out)).toEqual([]);
  });
});

describe('year selection and upcoming sessions', () => {
  it('picks next year from the 1 October cutover, else current, nearest future, latest', () => {
    const all = [2026, 2027, 2028];
    expect(defaultYear(all, new Date(2026, 8, 25))).toBe(2026);
    expect(defaultYear(all, '2026-09-30')).toBe(2026);
    expect(defaultYear(all, '2026-10-01')).toBe(2027);
    expect(defaultYear(all, '2026-11-23')).toBe(2027);
    expect(defaultYear(all, '2026-12-31')).toBe(2027);
    expect(defaultYear(all, '2027-01-04')).toBe(2027);
    expect(defaultYear(all, '2027-10-01')).toBe(2028);
    // No next-year file yet: stay on the current year.
    expect(defaultYear([2026], '2026-11-23')).toBe(2026);
    expect(defaultYear([2027, 2028], new Date(2026, 8, 25))).toBe(2027);
    expect(defaultYear([2024, 2025], new Date(2026, 8, 25))).toBe(2025);
    // The cutover is configurable: 31 December restores the New Year switch.
    expect(defaultYear(all, '2026-11-23', { month: 12, day: 31 })).toBe(2026);
  });
  it('returns sessions that have not finished, soonest first', () => {
    const cals = years.map((y) => ({ year: y, sessions: load(y).sessions }));
    const list = upcoming(cals, new Date(2026, 8, 25), 5);
    expect(list).toHaveLength(5);
    expect(list.every((s) => s.end >= '2026-09-25')).toBe(true);
    expect([...list].sort((a, b) => a.start.localeCompare(b.start))).toEqual(list);
    expect(upcoming(cals, '2026-09-25', 5)).toEqual(list);
  });
});

describe('calendar lifecycle', () => {
  const cals = years.map((y) => ({ year: y, sessions: load(y).sessions }));
  const last2026 = load(2026)
    .sessions.map((s) => s.end ?? '')
    .sort()
    .at(-1)!;

  it('before the cutover, the current year leads and nothing redirects', () => {
    const p = calendarPlan(cals, '2026-09-25');
    expect(p.primary).toBe(2026);
    expect(p.active).toEqual([2026, 2027, 2028]);
    expect(p.redirected).toEqual([2026]);
  });
  it('after the cutover, next year leads and the outgoing year goes last', () => {
    const p = calendarPlan(cals, '2026-11-23');
    expect(p.primary).toBe(2027);
    expect(p.outgoing).toBe(2026);
    expect(p.active).toEqual([2027, 2028, 2026]);
    expect(p.pages).toEqual([2028, 2026]);
    expect(p.redirected).toEqual([2027]);
  });
  it('retires the outgoing year the day after its last session', () => {
    expect(calendarPlan(cals, last2026).outgoing).toBe(2026);
    const next = new Date(
      Number(last2026.slice(0, 4)),
      Number(last2026.slice(5, 7)) - 1,
      Number(last2026.slice(8)) + 1,
    );
    const p = calendarPlan(cals, next);
    expect(p.outgoing).toBeNull();
    expect(p.active).toEqual([2027, 2028]);
    expect(p.redirected).toEqual([2026, 2027]);
    expect(calendarPlan(cals, '2027-01-05').redirected).toEqual([2026, 2027]);
  });
  it('remaining() keeps only dated sessions that have not ended', () => {
    const left = remaining(load(2026).sessions, '2026-11-23');
    expect(left.length).toBeGreaterThan(0);
    expect(left.every((s) => s.end !== null && s.end >= '2026-11-23')).toBe(true);
  });
  it('redirects each retired or primary year in every built locale', () => {
    expect(calendarRedirects([2027], ['', '/fr'])).toEqual([
      { src: '^/training/2027/?$', headers: { Location: '/training' }, status: 307 },
      { src: '^/fr/training/2027/?$', headers: { Location: '/fr/training' }, status: 307 },
    ]);
  });
});

describe('build date', () => {
  it('uses Melbourne time, not the server time zone', () => {
    // 14:00 UTC on 31 Dec is already 1 January in Melbourne (UTC+11).
    const now = new Date(Date.UTC(2026, 11, 31, 14, 0));
    expect(isoDateIn('Australia/Melbourne', now)).toBe('2027-01-01');
    expect(buildToday({}, now)).toBe('2027-01-01');
  });
  it('honours CALENDAR_TODAY and rejects bad values', () => {
    expect(buildToday({ CALENDAR_TODAY: '2027-01-05' })).toBe('2027-01-05');
    expect(() => buildToday({ CALENDAR_TODAY: '2027-02-30' })).toThrow();
  });
});
