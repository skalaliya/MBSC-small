import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';

// Guards the Icon component's contract: every icon it references must exist, and inner shape
// attributes (like <rect width>) must survive. Uses the same transform as Icon.astro.
const src = readFileSync(new URL('../src/components/ui/Icon.astro', import.meta.url), 'utf8');
const names = [...src.matchAll(/lucide-static\/icons\/([a-z0-9-]+)\.svg/g)].map((m) => m[1]!);

function transform(raw: string) {
  const attrs = ' width="20" height="20" class="shrink-0" aria-hidden="true"';
  return raw.replace(/<!--[\s\S]*?-->/g, '').replace(/<svg\b[^>]*>/, (open) =>
    open
      .replace(/\s(width|height|class)="[^"]*"/g, '')
      .replace(/stroke-width="[^"]*"/, 'stroke-width="1.75"')
      .replace(/^<svg/, '<svg' + attrs),
  );
}

describe('Icon', () => {
  it('references only icons that exist in lucide-static', () => {
    const available = new Set(
      readdirSync(new URL('../node_modules/lucide-static/icons/', import.meta.url)).map((f) =>
        f.replace(/\.svg$/, ''),
      ),
    );
    expect(names.filter((n) => !available.has(n))).toEqual([]);
  });
  it('keeps width/height on inner shapes', () => {
    const raw = readFileSync(
      new URL('../node_modules/lucide-static/icons/server.svg', import.meta.url),
      'utf8',
    );
    const innerBefore = (raw.match(/<rect[^>]*width=/g) ?? []).length;
    const out = transform(raw);
    expect(innerBefore).toBeGreaterThan(0);
    expect((out.match(/<rect[^>]*width=/g) ?? []).length).toBe(innerBefore);
    expect(out.match(/<svg[^>]*>/)![0]).toContain('width="20"');
  });
});
