import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

/** Entry ids are the file path without extension, e.g. "fr/mining-geology", so locales never collide. */
const pathId = ({ entry }: { entry: string }) => entry.replace(/\.md$/, '');
import {
  CATEGORIES,
  CERTIFICATES,
  DELIVERY,
  INSIGHT_TAGS,
  SECTORS,
  SERVICE_SLUGS,
  TOPICS,
} from './lib/content';
import { LOCATIONS, validateCalendar, type CalendarFile } from './lib/calendar-model';
import { isISODate } from './lib/dates';
import { frenchTypography, mapStrings } from './i18n/typography';

/** French typography for every text field of a French entry (images and ids are left alone). */
const KEEP = new Set(['slug', 'locale', 'image', 'cover', 'icon', 'date', 'updated']);
function frenchText<T extends { locale: string }>(data: T): T {
  if (data.locale !== 'fr') return data;
  return Object.fromEntries(
    Object.entries(data).map(([k, v]) => [k, KEEP.has(k) ? v : mapStrings(v, frenchTypography)]),
  ) as T;
}

const locale = z.enum(['en', 'fr', 'ar']);
const localized = z.object({
  en: z.string().min(1),
  fr: z.string().min(1).transform(frenchTypography),
  ar: z.string().min(1),
});
const iconName = z.string().min(1);

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services', generateId: pathId }),
  schema: ({ image }) =>
    z
      .object({
        slug: z.enum(SERVICE_SLUGS),
        locale,
        order: z.number().int(),
        title: z.string().min(1),
        short: z.string().min(1),
        icon: iconName,
        image: image(),
        imageAlt: z.string().min(1),
        capabilities: z.array(z.string().min(1)).min(3),
        process: z.array(z.object({ title: z.string(), body: z.string() })).length(3),
        deliverables: z.array(z.string().min(1)).min(2),
        categories: z.array(z.enum(CATEGORIES)).default([]),
        topic: z.enum(TOPICS),
      })
      .transform(frenchText),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects', generateId: pathId }),
  schema: ({ image }) =>
    z
      .object({
        slug: z.string().regex(/^[a-z0-9-]+$/),
        locale,
        order: z.number().int(),
        title: z.string().min(1),
        sector: z.enum(SECTORS),
        location: z.string().min(1),
        region: z.enum(['au', 'me', 'eu']).default('au'),
        year: z.string().optional(),
        client: z.string().optional(),
        services: z.array(z.enum(SERVICE_SLUGS)).default([]),
        summary: z.string().min(1),
        challenge: z.string().min(1),
        approach: z.array(z.string().min(1)).min(2),
        outcome: z.string().min(1),
        facts: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
        image: image(),
        imageAlt: z.string().min(1),
        featured: z.boolean().default(false),
      })
      .transform(frenchText),
});

const session = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  course: z.string().regex(/^[a-z0-9-]+$/),
  title: localized,
  start: z.string().nullable(),
  end: z.string().nullable(),
  month: z.number().int().min(1).max(12),
  category: z.enum(CATEGORIES),
  delivery: z.enum(DELIVERY),
  location: z.enum(LOCATIONS),
  certificate: z.enum(CERTIFICATES),
});

const calendars = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/calendars' }),
  schema: z
    .object({ year: z.number().int().min(2020).max(2100), sessions: z.array(session).min(1) })
    .superRefine((cal, ctx) => {
      for (const message of validateCalendar(cal as CalendarFile))
        ctx.addIssue({ code: 'custom', message });
    }),
});

const clients = defineCollection({
  loader: file('./src/content/clients.json'),
  schema: ({ image }) =>
    z
      .object({
        id: z.string(),
        name: z.string(),
        logo: image(),
        sector: z.enum(['mining', 'oilGas']),
        /** Display order, lowest first. */
        order: z.number().int(),
        /** Only confirmed clients are shown on the site. */
        confirmed: z.boolean(),
        /** Who confirmed MBSC may show this logo, and when. Required once confirmed. */
        evidence: z.string().optional(),
        /** Where the logo file came from, for future updates. */
        source: z.url(),
      })
      .refine((c) => !c.confirmed || !!c.evidence, {
        message: 'confirmed clients need an evidence note',
      }),
});

const testimonials = defineCollection({
  loader: file('./src/content/testimonials.json'),
  schema: z.object({
    id: z.string(),
    quote: localized,
    role: localized,
    organisation: localized,
    /** Approved quotes are always shown; samples only when PUBLIC_SHOW_SAMPLE_TESTIMONIALS=true. */
    approved: z.boolean(),
  }),
});

const team = defineCollection({
  loader: file('./src/content/team.json'),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      name: z.string(),
      role: localized,
      bio: localized.optional(),
      photo: image().optional(),
      linkedin: z.url().optional(),
      /** Placeholder entries are never rendered. */
      placeholder: z.boolean().default(false),
      order: z.number().int(),
    }),
});

const partners = defineCollection({
  loader: file('./src/content/partners.json'),
  schema: z
    .object({
      id: z.string().regex(/^[a-z0-9-]+$/),
      name: z.string().min(1),
      order: z.number().int(),
      /** Partnership start, YYYY-MM. */
      since: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/),
      /** Partner site root per MBSC language (Arabic readers go to the English site). */
      site: z.object({ en: z.url(), fr: z.url(), ar: z.url() }),
      /** Page on the partner site for each placement ('' = the site root). */
      paths: z.object({
        home: z.string().regex(/^(\/.*)?$/),
        ai: z.string().regex(/^(\/.*)?$/),
        about: z.string().regex(/^(\/.*)?$/),
        article: z.string().regex(/^(\/.*)?$/),
      }),
      copy: z.object({
        strip: localized,
        panelBody: localized,
        aboutBody: localized,
        capabilities: z.array(localized).length(5),
        anchor: z.object({ home: localized, ai: localized, about: localized }),
      }),
      /** Only confirmed partners are shown on the site. */
      confirmed: z.boolean(),
      /** Who confirmed the partnership may be shown, and when. Required once confirmed. */
      evidence: z.string().optional(),
    })
    .refine((p) => !p.confirmed || !!p.evidence, {
      message: 'confirmed partners need an evidence note',
    }),
});

const insights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/insights', generateId: pathId }),
  schema: ({ image }) =>
    z
      .object({
        slug: z.string().regex(/^[a-z0-9-]+$/),
        locale,
        title: z.string().min(1).max(110),
        description: z.string().min(50).max(200),
        date: z.string().refine(isISODate, 'date must be YYYY-MM-DD'),
        updated: z.string().refine(isISODate, 'updated must be YYYY-MM-DD').optional(),
        authorRole: z.string().min(1),
        tags: z.array(z.enum(INSIGHT_TAGS)).min(1),
        cover: image(),
        coverAlt: z.string().min(1),
        /** Drafts show on previews only. Set false once the article has been reviewed. */
        draft: z.boolean().default(true),
        /** A partner this article is about; adds a schema.org mention. */
        partner: reference('partners').optional(),
      })
      .transform(frenchText),
});

export const collections = {
  services,
  projects,
  calendars,
  clients,
  testimonials,
  team,
  insights,
  partners,
};
