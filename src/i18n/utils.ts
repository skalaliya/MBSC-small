import { en, type UI } from './en';
import { fr } from './fr';
import { ar } from './ar';
import { site } from '../data/site';
import type { Plural } from './plural';
import { frenchTypography, mapStrings } from './typography';

export const locales = ['en', 'fr', 'ar'] as const;
export type Locale = (typeof locales)[number];

/**
 * Which locales are public (switcher, sitemap, hreflang) and which are built at all.
 * Arabic is built only once published, or on previews with PREVIEW_AR=true.
 */
export function resolveLocales(arPublished: boolean, arPreview: boolean) {
  const published: Locale[] = arPublished ? ['en', 'fr', 'ar'] : ['en', 'fr'];
  const built: Locale[] = arPublished || arPreview ? ['en', 'fr', 'ar'] : ['en', 'fr'];
  return { published, built };
}
const resolved = resolveLocales(site.locales.ar.published, process.env.PREVIEW_AR === 'true');
/** Locales visible to the public and to search engines. */
export const publishedLocales: readonly Locale[] = resolved.published;
/** Locales with pages in this build (published ones plus any preview-only ones). */
export const builtLocales: readonly Locale[] = resolved.built;

const dictionaries: Record<Locale, UI> = { en, fr: mapStrings(fr, frenchTypography), ar };

export function toLocale(value: string | undefined | null): Locale {
  return value === 'fr' || value === 'ar' ? value : 'en';
}

export function useT(locale: Locale): UI {
  return dictionaries[locale];
}

/** Replace {name} placeholders. Unknown placeholders are left untouched. */
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}

/** Count-dependent text: picks the plural form for this language, then fills {count} and vars. */
export function fmtCount(
  forms: Plural,
  count: number,
  locale: Locale,
  vars: Record<string, string | number> = {},
): string {
  const category = new Intl.PluralRules(intlLocale[locale]).select(count) as keyof Plural;
  return fmt(forms[category] ?? forms.other, { count, ...vars });
}

/** Normalise a pathname: leading slash, no trailing slash (except root). */
export function normalizePath(pathname: string): string {
  let p = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (p.length > 1) p = p.replace(/\/+$/, '');
  return p === '' ? '/' : p;
}

/** Remove a leading /fr or /ar segment. Always returns a normalised path. */
export function stripLocale(pathname: string): string {
  const stripped = normalizePath(pathname).replace(/^\/(fr|ar)(?=\/|$)/, '');
  return stripped === '' ? '/' : stripped;
}

/** The locale a path belongs to, from its prefix. */
export function pathLocale(pathname: string): Locale {
  return toLocale(/^\/(fr|ar)(?=\/|$)/.exec(normalizePath(pathname))?.[1]);
}

/** Prefix a site-relative path for the given locale. Leaves hash/query intact. */
export function localizePath(path: string, locale: Locale): string {
  if (!path.startsWith('/'))
    throw new Error(`localizePath expects an absolute path, got "${path}"`);
  const base = stripLocale(path);
  if (locale === 'en') return base;
  return base === '/' ? `/${locale}` : `/${locale}${base}`;
}

export function alternatePath(pathname: string, target: Locale): string {
  return localizePath(stripLocale(pathname), target);
}

export const htmlLang: Record<Locale, string> = { en: 'en-AU', fr: 'fr', ar: 'ar' };
export const htmlDir: Record<Locale, 'ltr' | 'rtl'> = { en: 'ltr', fr: 'ltr', ar: 'rtl' };
// Arabic uses Latin digits (nu-latn), matching Gulf business usage and our phone numbers and stats.
export const intlLocale: Record<Locale, string> = {
  en: 'en-AU',
  fr: 'fr-FR',
  ar: 'ar-u-nu-latn',
};
