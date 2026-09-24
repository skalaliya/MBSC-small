import { en, type UI } from './en';
import { fr } from './fr';

export const locales = ['en', 'fr'] as const;
export type Locale = (typeof locales)[number];

const dictionaries: Record<Locale, UI> = { en, fr };

export function toLocale(value: string | undefined | null): Locale {
  return value === 'fr' ? 'fr' : 'en';
}

export function useT(locale: Locale): UI {
  return dictionaries[locale];
}

/** Replace {name} placeholders. Unknown placeholders are left untouched. */
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}

/** Normalise a pathname: leading slash, no trailing slash (except root). */
export function normalizePath(pathname: string): string {
  let p = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (p.length > 1) p = p.replace(/\/+$/, '');
  return p === '' ? '/' : p;
}

/** Remove a leading /fr segment. Always returns a normalised path. */
export function stripLocale(pathname: string): string {
  const stripped = normalizePath(pathname).replace(/^\/fr(?=\/|$)/, '');
  return stripped === '' ? '/' : stripped;
}

/** Prefix a site-relative path for the given locale. Leaves hash/query intact. */
export function localizePath(path: string, locale: Locale): string {
  if (!path.startsWith('/')) throw new Error(`localizePath expects an absolute path, got "${path}"`);
  const base = stripLocale(path);
  if (locale === 'en') return base;
  return base === '/' ? '/fr' : `/fr${base}`;
}

export function alternatePath(pathname: string, target: Locale): string {
  return localizePath(stripLocale(pathname), target);
}

export const htmlLang: Record<Locale, string> = { en: 'en-AU', fr: 'fr' };
export const intlLocale: Record<Locale, string> = { en: 'en-AU', fr: 'fr-FR' };
