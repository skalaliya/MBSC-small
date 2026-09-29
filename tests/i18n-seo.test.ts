import { describe, expect, it } from 'vitest';
import {
  alternatePath,
  localizePath,
  normalizePath,
  pathLocale,
  resolveLocales,
  stripLocale,
  fmt,
} from '../src/i18n/utils';
import { buildSeo, absolute } from '../src/lib/seo';
import { en } from '../src/i18n/en';
import { fr } from '../src/i18n/fr';
import { ar } from '../src/i18n/ar';
import { isPlural } from '../src/i18n/plural';
import { fmtCount } from '../src/i18n/utils';

const site = 'https://www.mbscaustralia.com.au';

describe('paths', () => {
  it('normalises and strips locale prefixes', () => {
    expect(normalizePath('/services/')).toBe('/services');
    expect(normalizePath('')).toBe('/');
    expect(stripLocale('/fr')).toBe('/');
    expect(stripLocale('/fr/services/x')).toBe('/services/x');
    expect(stripLocale('/france')).toBe('/france'); // not a locale prefix
  });
  it('localises in both directions', () => {
    expect(localizePath('/', 'fr')).toBe('/fr');
    expect(localizePath('/about', 'fr')).toBe('/fr/about');
    expect(localizePath('/fr/about', 'en')).toBe('/about');
    expect(alternatePath('/fr/projects/x', 'en')).toBe('/projects/x');
    expect(alternatePath('/projects/x', 'fr')).toBe('/fr/projects/x');
  });
  it('fills placeholders and leaves unknown ones', () => {
    expect(fmt('Hi {name} {x}', { name: 'Sam' })).toBe('Hi Sam {x}');
  });
});

describe('buildSeo', () => {
  it('emits self-referential canonical and a full hreflang set', () => {
    const s = buildSeo({
      site,
      pathname: '/fr/services/',
      locale: 'fr',
      title: 't',
      description: 'd',
      published: ['en', 'fr', 'ar'],
    });
    expect(s.canonical).toBe(`${site}/fr/services`);
    expect(s.alternates).toEqual([
      { hreflang: 'en-AU', href: `${site}/services` },
      { hreflang: 'fr', href: `${site}/fr/services` },
      { hreflang: 'ar', href: `${site}/ar/services` },
      { hreflang: 'x-default', href: `${site}/services` },
    ]);
    expect(s.ogLocale).toBe('fr_FR');
  });
  it('keeps a single trailing slash on the site root only', () => {
    expect(absolute(site, '/')).toBe(`${site}/`);
    expect(absolute(site, '/about/')).toBe(`${site}/about`);
  });
});

describe('dictionaries', () => {
  // Plural forms ({ one, two, few, many, other }) vary by language, so they count as one leaf.
  const keys = (o: unknown, p = ''): string[] =>
    o && typeof o === 'object' && !Array.isArray(o) && !isPlural(o)
      ? Object.entries(o as Record<string, unknown>).flatMap(([k, v]) => keys(v, `${p}${k}.`))
      : [p.slice(0, -1)];
  it.each([
    ['French', fr],
    ['Arabic', ar],
  ])('%s has exactly the English keys with the same array lengths', (_, dict) => {
    expect(keys(dict).sort()).toEqual(keys(en).sort());
    const arrays = (o: unknown, p = ''): [string, number][] =>
      Array.isArray(o)
        ? [[p, o.length]]
        : o && typeof o === 'object'
          ? Object.entries(o as Record<string, unknown>).flatMap(([k, v]) => arrays(v, `${p}${k}.`))
          : [];
    expect(arrays(dict)).toEqual(arrays(en));
  });
  it.each([
    ['French', fr],
    ['Arabic', ar],
  ])('%s placeholders match English', (_, dict) => {
    const ph = (s: string) => (s.match(/\{\w+\}/g) ?? []).sort().join(',');
    const flat = (o: unknown): string[] =>
      typeof o === 'string'
        ? [o]
        : isPlural(o)
          ? [o.other]
          : Array.isArray(o)
            ? o.flatMap(flat)
            : o && typeof o === 'object'
              ? Object.values(o).flatMap(flat)
              : [];
    const e = flat(en),
      f = flat(dict);
    expect(f.length).toBe(e.length);
    e.forEach((s, i) => expect(ph(f[i]!)).toBe(ph(s)));
  });
});

describe('Arabic', () => {
  it('uses the dual and plural forms Arabic grammar needs', () => {
    const days = ar.training.calendar.days;
    expect(fmtCount(days, 1, 'ar')).toBe('يوم واحد');
    expect(fmtCount(days, 2, 'ar')).toBe('يومان');
    expect(fmtCount(days, 5, 'ar')).toBe('5 أيام');
    expect(fmtCount(days, 12, 'ar')).toBe('12 يومًا');
    expect(fmtCount(en.training.calendar.days, 1, 'en')).toBe('1 day');
    expect(fmtCount(fr.training.catalogue.sessions, 2, 'fr', { year: 2027 })).toBe(
      '2 sessions programmées en 2027',
    );
  });

  it('stays dark until published, but previews can build it', () => {
    expect(resolveLocales(false, false)).toEqual({ published: ['en', 'fr'], built: ['en', 'fr'] });
    expect(resolveLocales(false, true)).toEqual({
      published: ['en', 'fr'],
      built: ['en', 'fr', 'ar'],
    });
    expect(resolveLocales(true, false).published).toEqual(['en', 'fr', 'ar']);
  });
  it('localises /ar paths', () => {
    expect(localizePath('/', 'ar')).toBe('/ar');
    expect(localizePath('/fr/about', 'ar')).toBe('/ar/about');
    expect(stripLocale('/ar/services/x')).toBe('/services/x');
    expect(stripLocale('/arabic')).toBe('/arabic');
    expect(pathLocale('/ar/training')).toBe('ar');
    expect(alternatePath('/ar/projects/x', 'fr')).toBe('/fr/projects/x');
  });
  it('an unpublished Arabic page is noindex with no hreflang, and English does not point to it', () => {
    const arPage = buildSeo({
      site,
      pathname: '/ar/about',
      locale: 'ar',
      title: 't',
      description: 'd',
      published: ['en', 'fr'],
    });
    expect(arPage.noindex).toBe(true);
    expect(arPage.alternates).toEqual([]);
    const enPage = buildSeo({
      site,
      pathname: '/about',
      locale: 'en',
      title: 't',
      description: 'd',
      published: ['en', 'fr'],
    });
    expect(enPage.alternates.map((a) => a.hreflang)).toEqual(['en-AU', 'fr', 'x-default']);
    expect(enPage.ogLocaleAlternate).toEqual(['fr_FR']);
  });
  it('a published Arabic page joins the hreflang set', () => {
    const published = ['en', 'fr', 'ar'] as const;
    const s = buildSeo({
      site,
      pathname: '/ar/about',
      locale: 'ar',
      title: 't',
      description: 'd',
      published,
    });
    expect(s.noindex).toBe(false);
    expect(s.alternates).toContainEqual({ hreflang: 'ar', href: `${site}/ar/about` });
    expect(s.alternates).toHaveLength(4);
    expect(s.ogLocale).toBe('ar_AR');
  });
  it('uses Latin digits in Arabic dates', () => {
    const d = new Intl.DateTimeFormat('ar-u-nu-latn', { dateStyle: 'long' }).format(
      new Date(2026, 0, 13),
    );
    expect(d).toMatch(/13/);
    expect(d).not.toMatch(/[\u0660-\u0669]/);
  });
  it('has no Arabic-Indic digits in the dictionary', () => {
    expect(JSON.stringify(ar)).not.toMatch(/[\u0660-\u0669]/);
  });
});

describe('social images', async () => {
  const { ogName } = await import('../src/lib/og');
  const { pageOgImage } = await import('../src/lib/seo');
  it('names cards from the path', () => {
    expect(ogName('/')).toBe('home');
    expect(ogName('/fr')).toBe('fr');
    expect(ogName('/services/ai-mining/')).toBe('services-ai-mining');
    expect(ogName('/fr/projects/moomba-cementing-qa')).toBe('fr-projects-moomba-cementing-qa');
  });
  it('falls back to the default card when a page has none', () => {
    expect(pageOgImage('/no-such-page')).toBe('/og/og-default.png');
    expect(pageOgImage('/services/ai-mining')).toBe('/og/services-ai-mining.png');
  });
});
