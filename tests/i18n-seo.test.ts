import { describe, expect, it } from 'vitest';
import { alternatePath, localizePath, normalizePath, stripLocale, fmt } from '../src/i18n/utils';
import { buildSeo, absolute } from '../src/lib/seo';
import { en } from '../src/i18n/en';
import { fr } from '../src/i18n/fr';

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
    });
    expect(s.canonical).toBe(`${site}/fr/services`);
    expect(s.alternates).toEqual([
      { hreflang: 'en-AU', href: `${site}/services` },
      { hreflang: 'fr', href: `${site}/fr/services` },
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
  const keys = (o: unknown, p = ''): string[] =>
    o && typeof o === 'object' && !Array.isArray(o)
      ? Object.entries(o as Record<string, unknown>).flatMap(([k, v]) => keys(v, `${p}${k}.`))
      : [p.slice(0, -1)];
  it('French has exactly the English keys with the same array lengths', () => {
    expect(keys(fr).sort()).toEqual(keys(en).sort());
    const arrays = (o: unknown, p = ''): [string, number][] =>
      Array.isArray(o)
        ? [[p, o.length]]
        : o && typeof o === 'object'
          ? Object.entries(o as Record<string, unknown>).flatMap(([k, v]) => arrays(v, `${p}${k}.`))
          : [];
    expect(arrays(fr)).toEqual(arrays(en));
  });
  it('placeholders match between languages', () => {
    const ph = (s: string) => (s.match(/\{\w+\}/g) ?? []).sort().join(',');
    const flat = (o: unknown): string[] =>
      typeof o === 'string'
        ? [o]
        : Array.isArray(o)
          ? o.flatMap(flat)
          : o && typeof o === 'object'
            ? Object.values(o).flatMap(flat)
            : [];
    const e = flat(en),
      f = flat(fr);
    expect(f.length).toBe(e.length);
    e.forEach((s, i) => expect(ph(f[i]!)).toBe(ph(s)));
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
