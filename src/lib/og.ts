/** File name (without extension) of a page's social card in public/og/. Shared by the site and scripts/make-og.mjs. */
export function ogName(pathname: string): string {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return path === '/' || path === '' ? 'home' : path.slice(1).replace(/\//g, '-');
}
