/** Pure helpers for the Insights section (no astro:content import, so unit tests can load them). */
import { intlLocale, type Locale } from '../i18n/utils';
import { parseISODate } from './dates';

export function formatInsightDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(intlLocale[locale], { dateStyle: 'long' }).format(
    parseISODate(iso),
  );
}

interface Tagged {
  data: { slug: string; tags: readonly string[]; date: string };
}

/** Other articles ranked by shared tags, then newest first. Articles with no shared tag come last. */
export function relatedInsights<T extends Tagged>(
  current: Tagged,
  all: readonly T[],
  limit = 3,
): T[] {
  const shared = (o: Tagged) => o.data.tags.filter((tag) => current.data.tags.includes(tag)).length;
  return all
    .filter((o) => o.data.slug !== current.data.slug)
    .map((o) => ({ o, score: shared(o) }))
    .sort((a, b) => b.score - a.score || b.o.data.date.localeCompare(a.o.data.date))
    .slice(0, limit)
    .map(({ o }) => o);
}

/** Table of contents: second-level headings only; an article needs at least three to show one. */
export function tocEntries(headings: readonly { depth: number; slug: string; text: string }[]) {
  const h2 = headings.filter((h) => h.depth === 2).map(({ slug, text }) => ({ slug, text }));
  return h2.length >= 3 ? h2 : [];
}
