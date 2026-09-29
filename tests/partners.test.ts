import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  PARTNER_GRADIENTS,
  assertSafeSvg,
  partnerHref,
  svgWithGradient,
} from '../src/lib/partners';
import { en } from '../src/i18n/en';
import { fr } from '../src/i18n/fr';
import { ar } from '../src/i18n/ar';

const logo = readFileSync(
  new URL('../src/assets/logos/partners/algorythmos.svg', import.meta.url),
  'utf8',
);
const partners = JSON.parse(
  readFileSync(new URL('../src/content/partners.json', import.meta.url), 'utf8'),
) as {
  id: string;
  site: Record<'en' | 'fr' | 'ar', string>;
  paths: Record<string, string>;
  copy: Record<string, unknown>;
  confirmed: boolean;
  evidence?: string;
}[];

describe('partnerHref', () => {
  it('adds UTM tags for the placement to a site root or page', () => {
    expect(partnerHref('https://algorythmos.com/au-en', '', 'home')).toBe(
      'https://algorythmos.com/au-en?utm_source=mbscaustralia.com.au&utm_medium=referral&utm_campaign=partner&utm_content=home',
    );
    const ai = new URL(partnerHref('https://algorythmos.com/fr-fr/', '/services/mlops-cicd', 'ai'));
    expect(ai.pathname).toBe('/fr-fr/services/mlops-cicd');
    expect(ai.searchParams.get('utm_content')).toBe('ai');
  });
  it('keeps an existing query and never duplicates UTM keys', () => {
    const url = new URL(partnerHref('https://example.com/x?y=1&utm_source=old', '', 'about'));
    expect(url.searchParams.get('y')).toBe('1');
    expect(url.searchParams.getAll('utm_source')).toEqual(['mbscaustralia.com.au']);
  });
});

describe('partner logos', () => {
  it('accepts the real logo and rejects anything that could run or load', () => {
    expect(assertSafeSvg(logo)).toBe(logo);
    for (const bad of [
      '<svg viewBox="0 0 1 1"><script>alert(1)</script></svg>',
      '<svg viewBox="0 0 1 1" onload="x()"></svg>',
      '<svg viewBox="0 0 1 1"><a href="https://x.test"/></svg>',
      '<svg viewBox="0 0 1 1" style="fill:red"></svg>',
      '<svg viewBox="0 0 1 1"><foreignObject/></svg>',
    ])
      expect(() => assertSafeSvg(bad)).toThrow();
  });
  it('paints one continuous gradient through a mask, with ids unique per instance', () => {
    const a = svgWithGradient(logo, 'p-home', PARTNER_GRADIENTS.dark);
    const b = svgWithGradient(logo, 'p-about', PARTNER_GRADIENTS.light);
    expect(a).toContain('id="p-home-grad"');
    expect(a).toContain('mask="url(#p-home-mask)"');
    expect(b).toContain('id="p-about-mask"');
    expect(a).not.toContain('p-about');
    expect(a).not.toContain('currentColor');
    expect(a.match(/<path/g)).toHaveLength(2); // the mark only, no traced tagline
    expect(a).not.toMatch(/\sstyle=/);
  });
});

describe('partners data', () => {
  const copyLeaves = (o: unknown): unknown[] =>
    Array.isArray(o)
      ? o.flatMap(copyLeaves)
      : o && typeof o === 'object' && 'en' in o
        ? [o]
        : o && typeof o === 'object'
          ? Object.values(o).flatMap(copyLeaves)
          : [];
  it('is confirmed with evidence, has a logo, and every text exists in all three languages', () => {
    for (const p of partners) {
      if (p.confirmed) expect(p.evidence).toBeTruthy();
      expect(
        readFileSync(new URL(`../src/assets/logos/partners/${p.id}.svg`, import.meta.url), 'utf8'),
      ).toContain('viewBox');
      for (const l of ['en', 'fr', 'ar'] as const) expect(p.site[l]).toMatch(/^https:\/\//);
      for (const leaf of copyLeaves(p.copy) as Record<string, string>[])
        for (const l of ['en', 'fr', 'ar']) expect(leaf[l]?.trim()).toBeTruthy();
      // Arabic readers are sent to an English site, so every Arabic link text says so.
      for (const a of Object.values(p.copy.anchor as Record<string, Record<string, string>>))
        expect(a.ar).toContain('بالإنجليزية');
    }
  });
  it('formats the partnership date with Latin digits in every language', () => {
    for (const [loc, dict] of [
      ['en-AU', en],
      ['fr-FR', fr],
      ['ar-u-nu-latn', ar],
    ] as const) {
      const date = new Intl.DateTimeFormat(loc, { month: 'long', year: 'numeric' }).format(
        new Date(2026, 8, 1),
      );
      const text = dict.partners.since.replace('{date}', date);
      expect(text).toMatch(/2026/);
      expect(text).not.toMatch(/[٠-٩]/);
    }
  });
});
