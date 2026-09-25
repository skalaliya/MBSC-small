import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/utils';
import { SECTOR_ORDER } from './content';
import { parseISODate, toISODate } from './dates';
import type { Session } from './calendar-model';

export type Service = CollectionEntry<'services'>;
export type Project = CollectionEntry<'projects'>;

export async function getServices(locale: Locale): Promise<Service[]> {
  const all = await getCollection('services', (e) => e.data.locale === locale);
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getProjects(locale: Locale): Promise<Project[]> {
  const all = await getCollection('projects', (e) => e.data.locale === locale);
  return all.sort((a, b) => SECTOR_ORDER[a.data.sector] - SECTOR_ORDER[b.data.sector] || a.data.order - b.data.order);
}

export interface Calendar {
  year: number;
  sessions: Session[];
}

export async function getCalendars(): Promise<Calendar[]> {
  const all = await getCollection('calendars');
  return all.map((c) => ({ year: c.data.year, sessions: c.data.sessions as Session[] })).sort((a, b) => a.year - b.year);
}

/** Current year if a calendar exists for it, else the nearest future year, else the latest. */
export function defaultYear(years: number[], today = new Date()): number {
  if (years.length === 0) throw new Error('No training calendars found');
  const y = today.getFullYear();
  if (years.includes(y)) return y;
  const future = years.filter((v) => v > y).sort((a, b) => a - b);
  return future[0] ?? Math.max(...years);
}

export interface DatedSession extends Session {
  year: number;
  start: string;
  end: string;
}

/** Dated sessions ending on or after `from`, soonest first. */
export function upcoming(calendars: Calendar[], from: Date, limit: number): DatedSession[] {
  const today = toISODate(from);
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
