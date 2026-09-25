import { readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { formatInsightDate, relatedInsights, tocEntries } from '../src/lib/insights';
import { activeKey, visibleNav } from '../src/components/nav';
import { INSIGHT_TAGS } from '../src/lib/content';
import { en } from '../src/i18n/en';
import { fr } from '../src/i18n/fr';

const entry = (slug: string, tags: string[], date: string) => ({ data: { slug, tags, date } });

describe('relatedInsights', () => {
  const current = entry('a', ['ai', 'geology'], '2026-09-01');
  const all = [
    current,
    entry('b', ['safety'], '2026-09-20'),
    entry('c', ['ai'], '2026-08-01'),
    entry('d', ['ai', 'geology'], '2026-07-01'),
    entry('e', ['ai'], '2026-09-10'),
  ];
  it('ranks by shared tags, then newest, and never returns the current article', () => {
    expect(relatedInsights(current, all).map((e) => e.data.slug)).toEqual(['d', 'e', 'c']);
  });
  it('falls back to unrelated articles when nothing shares a tag', () => {
    expect(
      relatedInsights(entry('z', ['vr'], '2026-01-01'), all, 2).map((e) => e.data.slug),
    ).toEqual(['b', 'e']);
  });
});

describe('tocEntries', () => {
  const h = (depth: number, text: string) => ({ depth, slug: text.toLowerCase(), text });
  it('needs at least three second-level headings', () => {
    expect(tocEntries([h(2, 'A'), h(3, 'Sub'), h(2, 'B')])).toEqual([]);
    expect(tocEntries([h(2, 'A'), h(3, 'Sub'), h(2, 'B'), h(2, 'C')]).map((e) => e.text)).toEqual([
      'A',
      'B',
      'C',
    ]);
  });
});

describe('formatInsightDate', () => {
  it('formats calendar dates without time-zone drift', () => {
    expect(formatInsightDate('2026-09-01', 'en')).toBe('1 September 2026');
    expect(formatInsightDate('2026-09-01', 'fr')).toBe('1 septembre 2026');
  });
});

describe('insights navigation', () => {
  it('hides the Insights link until an article is public', () => {
    expect(visibleNav(false).some((n) => n.key === 'insights')).toBe(false);
    expect(visibleNav(true).some((n) => n.key === 'insights')).toBe(true);
    expect(activeKey('/insights/some-article')).toBe('insights');
  });
});

describe('insights content', () => {
  const dir = (loc: string) =>
    readdirSync(new URL(`../src/content/insights/${loc}/`, import.meta.url)).filter((f) =>
      f.endsWith('.md'),
    );
  it('has every article in both languages', () => {
    expect(dir('fr').sort()).toEqual(dir('en').sort());
  });
  it('translates every tag and filters on every tag', () => {
    const view = readFileSync(new URL('../src/views/InsightsView.astro', import.meta.url), 'utf8');
    for (const tag of INSIGHT_TAGS) {
      expect(en.insights.tags[tag]).toBeTruthy();
      expect(fr.insights.tags[tag]).toBeTruthy();
      expect(view).toContain(`#t-${tag}:checked`);
      expect(view).toContain(`[data-tags~='${tag}']`);
    }
  });
});
