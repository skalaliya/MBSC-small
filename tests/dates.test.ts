import { describe, expect, it } from 'vitest';
import {
  addDays,
  daysInclusive,
  formatRange,
  fromIsoWeek,
  isISODate,
  isoWeek,
  isWeekend,
  parseISODate,
  toISODate,
} from '../src/lib/dates';

describe('parseISODate', () => {
  it('parses as a local calendar date (no UTC shift)', () => {
    const d = parseISODate('2026-01-13');
    expect([d.getFullYear(), d.getMonth(), d.getDate()]).toEqual([2026, 0, 13]);
    expect(toISODate(d)).toBe('2026-01-13');
  });
  it('rejects impossible dates', () => {
    expect(isISODate('2026-02-30')).toBe(false);
    expect(isISODate('2026-13-01')).toBe(false);
    expect(isISODate('26-01-01')).toBe(false);
    expect(() => parseISODate('2026-02-30')).toThrow();
  });
  it('accepts leap days only in leap years', () => {
    expect(isISODate('2028-02-29')).toBe(true);
    expect(isISODate('2027-02-29')).toBe(false);
  });
});

describe('day arithmetic', () => {
  it('counts inclusive days across a DST change', () => {
    // Melbourne DST starts 4 Oct 2026.
    expect(daysInclusive(parseISODate('2026-10-02'), parseISODate('2026-10-06'))).toBe(5);
    expect(toISODate(addDays(parseISODate('2026-10-03'), 1))).toBe('2026-10-04');
  });
  it('detects weekends', () => {
    expect(isWeekend(parseISODate('2026-01-17'))).toBe(true); // Saturday
    expect(isWeekend(parseISODate('2026-01-19'))).toBe(false); // Monday
  });
});

describe('ISO weeks', () => {
  it('round-trips week and weekday', () => {
    for (const iso of ['2027-01-11', '2027-12-31', '2026-12-31', '2028-01-03', '2027-01-01']) {
      const d = parseISODate(iso);
      const w = isoWeek(d);
      expect(toISODate(fromIsoWeek(w.year, w.week, w.weekday))).toBe(iso);
    }
  });
  it('knows 2026 has 53 weeks and 2027 has 52', () => {
    expect(isoWeek(new Date(2026, 11, 28)).week).toBe(53);
    expect(isoWeek(new Date(2027, 11, 28)).week).toBe(52);
  });
});

describe('formatRange', () => {
  it('formats same-month ranges in English and French', () => {
    const a = parseISODate('2026-01-13'),
      b = parseISODate('2026-01-17');
    expect(formatRange(a, b, 'en-AU')).toMatch(/13\s*[–-]\s*17 January/);
    expect(formatRange(a, b, 'fr-FR')).toMatch(/13\s*[–-]\s*17 janvier/);
  });
  it('formats a single day without a range', () => {
    const d = parseISODate('2026-08-31');
    expect(formatRange(d, d, 'en-AU')).toBe('31 August');
  });
  it('spans months', () => {
    expect(formatRange(parseISODate('2028-02-28'), parseISODate('2028-03-02'), 'en-AU')).toMatch(
      /February.*March/,
    );
  });
});
