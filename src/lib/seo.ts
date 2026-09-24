import { alternatePath, htmlLang, normalizePath, type Locale } from '../i18n/utils';

export interface SeoInput {
  site: URL | string;
  pathname: string;
  locale: Locale;
  title: string;
  description: string;
  ogImage?: string;
  noindex?: boolean;
  /** Set false for pages that exist in one language only. */
  hasAlternate?: boolean;
}

export interface SeoOutput {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  ogLocale: string;
  ogLocaleAlternate: string;
  alternates: { hreflang: string; href: string }[];
  noindex: boolean;
}

const OG_LOCALE: Record<Locale, string> = { en: 'en_AU', fr: 'fr_FR' };

export function buildSeo(input: SeoInput): SeoOutput {
  const site = typeof input.site === 'string' ? new URL(input.site) : input.site;
  const path = normalizePath(input.pathname);
  const enPath = alternatePath(path, 'en');
  const frPath = alternatePath(path, 'fr');
  const alternates =
    input.hasAlternate === false
      ? []
      : [
          { hreflang: htmlLang.en, href: absolute(site, enPath) },
          { hreflang: htmlLang.fr, href: absolute(site, frPath) },
          { hreflang: 'x-default', href: absolute(site, enPath) },
        ];
  const other: Locale = input.locale === 'en' ? 'fr' : 'en';
  return {
    title: input.title,
    description: input.description,
    canonical: absolute(site, path),
    ogImage: new URL(input.ogImage ?? '/og/og-default.png', site).href,
    ogLocale: OG_LOCALE[input.locale],
    ogLocaleAlternate: OG_LOCALE[other],
    alternates,
    noindex: input.noindex ?? false,
  };
}

/** Absolute URL with no trailing slash, except the site root which keeps "/". */
export function absolute(site: URL | string, path: string): string {
  const base = typeof site === 'string' ? new URL(site) : site;
  return new URL(normalizePath(path), base.origin).href;
}
