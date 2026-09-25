/**
 * Company facts. This is the one file to edit when details change.
 * Anything set to null is hidden on the site until it is filled in.
 */
export const site = {
  name: 'MBSC Australia',
  legalName: 'MBSC Australia Pty Ltd',
  abn: null as string | null,
  url: 'https://www.mbscaustralia.com.au',
  email: 'admin@mbscaustralia.com.au',
  phone: '+61 414 955 631',
  phoneHref: 'tel:+61414955631',
  address: {
    street: null as string | null,
    locality: 'Melbourne',
    region: 'VIC',
    postcode: null as string | null,
    country: 'AU',
  },
  geo: { lat: -37.8136, lng: 144.9631 },
  hours: { opens: '07:00', closes: '17:00', days: ['Mo', 'Tu', 'We', 'Th', 'Fr'] },
  linkedin: null as string | null,
  /**
   * Google Search Console "HTML tag" verification token (the content="..." value only).
   * Not a secret. Leave null if you verify with a DNS TXT record in Cloudflare instead.
   */
  googleSiteVerification: null as string | null,
  /**
   * Arabic ships dark: the /ar pages are not built, linked, listed in the sitemap or given
   * hreflang until a native speaker has reviewed them and this is set to true.
   * Previews can still build them with PREVIEW_AR=true (never indexed).
   */
  locales: { ar: { published: false as boolean } },
  /** Only shown once a certificate number is supplied. */
  iso9001: null as null | { number: string; body: string; expires: string },
  regions: ['au', 'me', 'eu'] as const,
  stats: {
    basisDate: '2026-09-01',
    items: [
      { key: 'projects', value: 1200, suffix: '+', prefix: '', decimals: 0 },
      { key: 'trainingHours', value: 50, suffix: 'k+', prefix: '', decimals: 0 },
      { key: 'metresDrilled', value: 5000, suffix: ' m', prefix: '', decimals: 0 },
      { key: 'assets', value: 4.5, suffix: 'B', prefix: '$', decimals: 1 },
    ],
  },
} as const;

export type StatKey = (typeof site.stats.items)[number]['key'];
