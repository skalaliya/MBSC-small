import type { UI } from '../i18n/en';

export type NavKey = 'services' | 'ai' | 'projects' | 'training' | 'about' | 'contact';
export const NAV: { key: NavKey; path: string }[] = [
  { key: 'services', path: '/services' },
  { key: 'ai', path: '/services/ai-mining' },
  { key: 'projects', path: '/projects' },
  { key: 'training', path: '/training' },
  { key: 'about', path: '/about' },
  { key: 'contact', path: '/contact' },
];

const matches = (current: string, path: string) =>
  current === path || current.startsWith(`${path}/`);

/**
 * The nav item for the current (locale-stripped) path. When paths nest, as with
 * /services and /services/ai-mining, the longest match wins so only one item is active.
 */
export function activeKey(current: string): NavKey | null {
  const hits = NAV.filter((n) => matches(current, n.path)).sort(
    (a, b) => b.path.length - a.path.length,
  );
  return hits[0]?.key ?? null;
}

export const navLabel = (t: UI, key: NavKey) => t.nav[key];
