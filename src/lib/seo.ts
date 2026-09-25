import { existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import {
  alternatePath,
  htmlLang,
  normalizePath,
  publishedLocales,
  type Locale,
} from '../i18n/utils';
import { ogName } from './og';

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
  /** Public locales; defaults to this build's. Unpublished locales get no hreflang and noindex. */
  published?: readonly Locale[];
}

export interface SeoOutput {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  ogLocale: string;
  ogLocaleAlternate: string[];
  alternates: { hreflang: string; href: string }[];
  noindex: boolean;
}

const OG_LOCALE: Record<Locale, string> = { en: 'en_AU', fr: 'fr_FR', ar: 'ar_AR' };

export function buildSeo(input: SeoInput): SeoOutput {
  const site = typeof input.site === 'string' ? new URL(input.site) : input.site;
  const path = normalizePath(input.pathname);
  const published = input.published ?? publishedLocales;
  const isPublic = published.includes(input.locale);
  const alternates =
    input.hasAlternate === false || !isPublic
      ? []
      : [
          ...published.map((l) => ({
            hreflang: htmlLang[l],
            href: absolute(site, alternatePath(path, l)),
          })),
          { hreflang: 'x-default', href: absolute(site, alternatePath(path, 'en')) },
        ];
  return {
    title: input.title,
    description: input.description,
    canonical: absolute(site, path),
    ogImage: new URL(input.ogImage ?? pageOgImage(path), site).href,
    ogLocale: OG_LOCALE[input.locale],
    ogLocaleAlternate: published.filter((l) => l !== input.locale).map((l) => OG_LOCALE[l]),
    alternates,
    // A language that is not yet public (Arabic on previews) must never be indexed.
    noindex: (input.noindex ?? false) || !isPublic,
  };
}

/** Absolute URL with no trailing slash, except the site root which keeps "/". */
export function absolute(site: URL | string, path: string): string {
  const base = typeof site === 'string' ? new URL(site) : site;
  return new URL(normalizePath(path), base.origin).href;
}

/** The page's own social card if one has been generated (npm run og), else the default card. */
// Resolve from the project root: after bundling, import.meta.url no longer points at src/lib.
const PUBLIC_DIR = pathToFileURL(`${process.cwd()}/public/`);

export function pageOgImage(pathname: string, publicDir: URL = PUBLIC_DIR): string {
  const file = `/og/${ogName(normalizePath(pathname))}.png`;
  try {
    return existsSync(new URL(`.${file}`, publicDir)) ? file : '/og/og-default.png';
  } catch {
    return '/og/og-default.png';
  }
}
