import { site } from '../data/site';
import { absolute } from './seo';
import { htmlLang, type Locale } from '../i18n/utils';
import type { DatedSession } from './queries';

type Json = Record<string, unknown>;
const ORG_ID = `${site.url}/#organization`;

export function organization(): Json {
  const address: Json = {
    '@type': 'PostalAddress',
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  };
  if (site.address.street) address.streetAddress = site.address.street;
  if (site.address.postcode) address.postalCode = site.address.postcode;
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': ORG_ID,
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    logo: `${site.url}/android-chrome-512x512.png`,
    image: `${site.url}/og/og-default.png`,
    email: site.email,
    telephone: site.phone.replace(/\s/g, ''),
    address,
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: [
      { '@type': 'Country', name: 'Australia' },
      { '@type': 'Place', name: 'Middle East' },
      { '@type': 'Place', name: 'Europe' },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: site.hours.opens,
      closes: site.hours.closes,
    },
    ...(site.linkedin ? { sameAs: [site.linkedin] } : {}),
  };
}

export function website(locale: Locale): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: [htmlLang.en, htmlLang.fr],
    publisher: { '@id': ORG_ID },
    ...(locale === 'fr' ? { alternateName: 'MBSC Australia (français)' } : {}),
  };
}

export function breadcrumbs(items: { label: string; href: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: absolute(site.url, c.href) })),
  };
}

export function faqPage(items: readonly { q: string; a: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
  };
}

export function service(opts: { name: string; description: string; url: string }): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: absolute(site.url, opts.url),
    provider: { '@id': ORG_ID },
    areaServed: ['Australia', 'Middle East', 'Europe'],
  };
}

const MODE: Record<string, string> = { onsite: 'Onsite', virtual: 'Online', hybrid: 'Blended' };

/** One Course per programme, with each scheduled session as a CourseInstance. No invented prices. */
export function courses(
  sessions: DatedSession[],
  locale: Locale,
  pageUrl: string,
  locationName: (key: DatedSession['location']) => string,
): Json[] {
  const byCourse = new Map<string, DatedSession[]>();
  for (const s of sessions) byCourse.set(s.course, [...(byCourse.get(s.course) ?? []), s]);
  return [...byCourse.values()].map((list) => {
    const first = list[0]!;
    return {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: first.title[locale],
      description: first.title[locale],
      url: absolute(site.url, pageUrl),
      inLanguage: htmlLang[locale],
      provider: { '@id': ORG_ID },
      hasCourseInstance: list.map((s) => ({
        '@type': 'CourseInstance',
        courseMode: MODE[s.delivery],
        startDate: s.start,
        endDate: s.end,
        ...(s.delivery !== 'virtual' ? { location: { '@type': 'Place', name: locationName(s.location) } } : {}),
      })),
    };
  });
}
