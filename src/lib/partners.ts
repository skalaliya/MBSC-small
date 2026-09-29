/**
 * Partner helpers. Pure (no astro:content), so they are unit-tested directly.
 */
export type Placement = 'home' | 'ai' | 'about' | 'article';

/** Link to a partner page with UTM tags; keeps any query the URL already has. */
export function partnerHref(site: string, path: string, placement: Placement): string {
  const url = new URL(site.replace(/\/+$/, '') + path);
  const utm: Record<string, string> = {
    utm_source: 'mbscaustralia.com.au',
    utm_medium: 'referral',
    utm_campaign: 'partner',
    utm_content: placement,
  };
  for (const [k, v] of Object.entries(utm)) url.searchParams.set(k, v);
  return url.href;
}

/** Third-party SVG is inlined into our pages, so refuse anything that could run or load. */
export function assertSafeSvg(raw: string, name = 'logo'): string {
  const banned = [
    /<script/i,
    /\son\w+\s*=/i,
    /href\s*=/i,
    /<image/i,
    /<foreignObject/i,
    /<style/i,
    /\sstyle\s*=/i,
  ];
  for (const re of banned)
    if (re.test(raw)) throw new Error(`Partner ${name}: unsafe SVG content (${re.source})`);
  if (!/viewBox="0 0 \d+ \d+"/.test(raw)) throw new Error(`Partner ${name}: SVG needs a viewBox`);
  return raw;
}

export interface GradientStop {
  offset: string;
  color: string;
}

/**
 * Paint a single-colour mark with one continuous gradient: the mark becomes a mask over a
 * gradient-filled rectangle (a per-path gradient would restart on each of the mark's paths).
 * `prefix` keeps ids unique when several logos share a page.
 */
export function svgWithGradient(raw: string, prefix: string, stops: GradientStop[]): string {
  const viewBox = /viewBox="0 0 (\d+) (\d+)"/.exec(raw);
  const inner = /<svg[^>]*>([\s\S]*)<\/svg>/.exec(raw)?.[1];
  if (!viewBox || !inner) throw new Error('Partner logo: cannot read SVG');
  const [w, h] = [viewBox[1], viewBox[2]];
  const grad = `${prefix}-grad`;
  const mask = `${prefix}-mask`;
  const shape = inner.replace(/fill="currentColor"/g, 'fill="#fff"');
  const stopTags = stops
    .map((s) => '<stop offset="' + s.offset + '" stop-color="' + s.color + '"/>')
    .join('');
  // Built by concatenation: the Astro compiler misreads SVG tags inside nested templates.
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' +
    w +
    ' ' +
    h +
    '"' +
    ' aria-hidden="true" focusable="false"><defs>' +
    '<linearGradient id="' +
    grad +
    '" x1="0" y1="0" x2="1" y2="1">' +
    stopTags +
    '</linearGradient>' +
    '<mask id="' +
    mask +
    '" maskUnits="userSpaceOnUse" x="0" y="0" width="' +
    w +
    '" height="' +
    h +
    '">' +
    shape +
    '</mask></defs>' +
    '<rect width="' +
    w +
    '" height="' +
    h +
    '" fill="url(#' +
    grad +
    ')" mask="url(#' +
    mask +
    ')"/>' +
    '</svg>'
  );
}

/** Algorythmos brand gradients: lighter on dark backgrounds, deeper on light ones. */
export const PARTNER_GRADIENTS: Record<'dark' | 'light', GradientStop[]> = {
  dark: [
    { offset: '0', color: '#A78BFA' },
    { offset: '0.45', color: '#63B3ED' },
    { offset: '1', color: '#22D3EE' },
  ],
  light: [
    { offset: '0', color: '#7C3AED' },
    { offset: '0.45', color: '#2563EB' },
    { offset: '1', color: '#0E7490' },
  ],
};
