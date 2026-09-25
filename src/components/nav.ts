import type { UI } from '../i18n/en';

export type NavKey = 'services' | 'projects' | 'training' | 'rental' | 'about' | 'contact';
export const NAV: { key: NavKey; path: string }[] = [
  { key: 'services', path: '/services' },
  { key: 'projects', path: '/projects' },
  { key: 'training', path: '/training' },
  { key: 'rental', path: '/rental' },
  { key: 'about', path: '/about' },
  { key: 'contact', path: '/contact' },
];

/** True when `current` (locale-stripped) is the section root or inside it. */
export function isActive(current: string, path: string): boolean {
  return current === path || current.startsWith(`${path}/`);
}

export const navLabel = (t: UI, key: NavKey) => t.nav[key];
