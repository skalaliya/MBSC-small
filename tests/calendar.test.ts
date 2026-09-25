import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { validateCalendar, type CalendarFile } from '../src/lib/calendar-model';
import { shiftCalendar } from '../scripts/calendar-shift';
import { daysInclusive, isWeekend, parseISODate } from '../src/lib/dates';
import { defaultYear, upcoming } from '../src/lib/queries.pure';

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
  it('picks current year, then nearest future, then latest', () => {
    expect(defaultYear([2026, 2027, 2028], new Date(2026, 8, 25))).toBe(2026);
    expect(defaultYear([2027, 2028], new Date(2026, 8, 25))).toBe(2027);
    expect(defaultYear([2024, 2025], new Date(2026, 8, 25))).toBe(2025);
  });
  it('returns sessions that have not finished, soonest first', () => {
    const cals = years.map((y) => ({ year: y, sessions: load(y).sessions }));
    const list = upcoming(cals, new Date(2026, 8, 25), 5);
    expect(list).toHaveLength(5);
    expect(list.every((s) => s.end >= '2026-09-25')).toBe(true);
    expect([...list].sort((a, b) => a.start.localeCompare(b.start))).toEqual(list);
  });
});
