/**
 * Weekday public holidays that affect training sessions (weekend dates are left out: no session
 * runs on a weekend). `au` holidays apply in both Victoria and Western Australia.
 *
 * Sources (checked 23 Nov 2026):
 * - WA: https://www.wa.gov.au/service/employment/workplace-arrangements/public-holidays-western-australia
 *   (from 2028 WA moves Labour Day, King's Birthday and WA Day, and adds Show Day)
 * - VIC: https://business.vic.gov.au/business-information/public-holidays, cross-checked with
 *   date.nager.at. The Friday before the AFL Grand Final is tentative until the AFL sets the date.
 *
 * Add the next year here before generating its calendar (npm run calendar:year).
 */
import type { LocationKey } from './calendar-model.ts';

export type HolidayRegion = 'au' | 'vic' | 'wa';

export interface Holiday {
  date: string;
  name: string;
  region: HolidayRegion;
  tentative?: boolean;
}

export const HOLIDAYS: Holiday[] = [
  // 2026
  { date: '2026-01-01', name: "New Year's Day", region: 'au' },
  { date: '2026-01-26', name: 'Australia Day', region: 'au' },
  { date: '2026-03-02', name: 'Labour Day', region: 'wa' },
  { date: '2026-03-09', name: 'Labour Day', region: 'vic' },
  { date: '2026-04-03', name: 'Good Friday', region: 'au' },
  { date: '2026-04-06', name: 'Easter Monday', region: 'au' },
  { date: '2026-04-27', name: 'Anzac Day (observed)', region: 'wa' },
  { date: '2026-06-01', name: 'Western Australia Day', region: 'wa' },
  { date: '2026-06-08', name: "King's Birthday", region: 'vic' },
  { date: '2026-09-25', name: 'Friday before the AFL Grand Final', region: 'vic' },
  { date: '2026-09-28', name: "King's Birthday", region: 'wa' },
  { date: '2026-11-03', name: 'Melbourne Cup', region: 'vic' },
  { date: '2026-12-25', name: 'Christmas Day', region: 'au' },
  { date: '2026-12-28', name: 'Boxing Day (observed)', region: 'au' },
  // 2027
  { date: '2027-01-01', name: "New Year's Day", region: 'au' },
  { date: '2027-01-26', name: 'Australia Day', region: 'au' },
  { date: '2027-03-01', name: 'Labour Day', region: 'wa' },
  { date: '2027-03-08', name: 'Labour Day', region: 'vic' },
  { date: '2027-03-26', name: 'Good Friday', region: 'au' },
  { date: '2027-03-29', name: 'Easter Monday', region: 'au' },
  { date: '2027-04-26', name: 'Anzac Day (observed)', region: 'wa' },
  { date: '2027-06-07', name: 'Western Australia Day', region: 'wa' },
  { date: '2027-06-14', name: "King's Birthday", region: 'vic' },
  {
    date: '2027-09-24',
    name: 'Friday before the AFL Grand Final',
    region: 'vic',
    tentative: true,
  },
  { date: '2027-09-27', name: "King's Birthday", region: 'wa' },
  { date: '2027-11-02', name: 'Melbourne Cup', region: 'vic' },
  { date: '2027-12-27', name: 'Christmas Day (observed)', region: 'au' },
  { date: '2027-12-28', name: 'Boxing Day (observed)', region: 'au' },
  // 2028
  { date: '2028-01-03', name: "New Year's Day (observed)", region: 'au' },
  { date: '2028-01-26', name: 'Australia Day', region: 'au' },
  { date: '2028-03-13', name: 'Labour Day', region: 'au' },
  { date: '2028-04-14', name: 'Good Friday', region: 'au' },
  { date: '2028-04-17', name: 'Easter Monday', region: 'au' },
  { date: '2028-04-25', name: 'Anzac Day', region: 'au' },
  { date: '2028-06-12', name: "King's Birthday", region: 'au' },
  { date: '2028-09-25', name: 'Show Day', region: 'wa', tentative: true },
  {
    date: '2028-09-29',
    name: 'Friday before the AFL Grand Final',
    region: 'vic',
    tentative: true,
  },
  { date: '2028-11-07', name: 'Melbourne Cup', region: 'vic' },
  { date: '2028-11-13', name: 'Western Australia Day', region: 'wa' },
  { date: '2028-12-25', name: 'Christmas Day', region: 'au' },
  { date: '2028-12-26', name: 'Boxing Day', region: 'au' },
];

/** Which holidays stop a session: the state it runs in, or national ones for remote delivery. */
export function regionsFor(location: LocationKey): HolidayRegion[] {
  if (location === 'melbourne') return ['au', 'vic'];
  if (location === 'perth') return ['au', 'wa'];
  return ['au'];
}

/** Years covered by HOLIDAYS. A calendar year outside this list cannot be checked. */
export const HOLIDAY_YEARS = [...new Set(HOLIDAYS.map((h) => Number(h.date.slice(0, 4))))];

/** Holidays falling within start..end (inclusive) that apply at this location. */
export function holidayClashes(
  session: { start: string | null; end: string | null; location: LocationKey },
  holidays: Holiday[] = HOLIDAYS,
): Holiday[] {
  if (!session.start || !session.end) return [];
  const regions = regionsFor(session.location);
  return holidays.filter(
    (h) => regions.includes(h.region) && h.date >= session.start! && h.date <= session.end!,
  );
}
