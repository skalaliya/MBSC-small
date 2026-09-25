import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/utils';
import { SECTOR_ORDER } from './content';
import type { Session } from './calendar-model';
import type { Calendar } from './queries.pure';
import { isPublic } from './publish';

export * from './queries.pure';

export type Service = CollectionEntry<'services'>;
export type Project = CollectionEntry<'projects'>;
export type Insight = CollectionEntry<'insights'>;

export async function getServices(locale: Locale): Promise<Service[]> {
  const all = await getCollection('services', (e) => e.data.locale === locale);
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getProjects(locale: Locale): Promise<Project[]> {
  const all = await getCollection('projects', (e) => e.data.locale === locale);
  return all.sort(
    (a, b) =>
      SECTOR_ORDER[a.data.sector] - SECTOR_ORDER[b.data.sector] || a.data.order - b.data.order,
  );
}

export async function getCalendars(): Promise<Calendar[]> {
  const all = await getCollection('calendars');
  return all
    .map((c) => ({ year: c.data.year, sessions: c.data.sessions as Session[] }))
    .sort((a, b) => a.year - b.year);
}

/** Public insights for a locale (drafts only on previews), newest first. */
export async function getInsights(locale: Locale): Promise<Insight[]> {
  const all = await getCollection('insights', (e) => e.data.locale === locale && isPublic(e));
  return all.sort((a, b) => b.data.date.localeCompare(a.data.date));
}

/** Rough reading time from the Markdown body (220 words per minute, minimum 1). */
export function readingMinutes(body: string | undefined): number {
  const words = (body ?? '').replace(/[#>*_`\[\]()!-]/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
