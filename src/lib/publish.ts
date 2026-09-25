/**
 * Drafts render on previews and local builds so they can be reviewed, but are never built on
 * production (Vercel sets VERCEL_ENV=production). No route, no sitemap entry, no RSS item.
 */
export const showDrafts = process.env.VERCEL_ENV !== 'production';

export const isPublic = (entry: { data: { draft: boolean } }) => showDrafts || !entry.data.draft;
