import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/utils';
import { SECTOR_ORDER } from './content';
import type { Session } from './calendar-model';
import type { Calendar } from './queries.pure';

export * from './queries.pure';

export type Service = CollectionEntry<'services'>;
export type Project = CollectionEntry<'projects'>;

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
