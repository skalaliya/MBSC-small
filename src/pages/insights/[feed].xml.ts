import rss from '@astrojs/rss';
import type { APIRoute, GetStaticPaths } from 'astro';
import { getInsights } from '../../lib/queries';
import { site } from '../../data/site';

// English feed of public articles. Like the listing, it is only built once an article is public.
export const getStaticPaths = (async () =>
  (await getInsights('en')).length > 0
    ? [{ params: { feed: 'rss' } }]
    : []) satisfies GetStaticPaths;

export const GET: APIRoute = async (context) => {
  const insights = await getInsights('en');
  return rss({
    title: 'MBSC Australia Insights',
    description:
      'Practical notes from MBSC engineers on AI, maintenance, geology and safety in mining and energy.',
    site: context.site ?? site.url,
    items: insights.map((i) => ({
      title: i.data.title,
      description: i.data.description,
      pubDate: new Date(`${i.data.date}T00:00:00+10:00`),
      link: `/insights/${i.data.slug}`,
      categories: [...i.data.tags],
    })),
    customData: '<language>en-au</language>',
    trailingSlash: false,
  });
};
