/**
 * Home hero image settings, shared by the <Picture> in Hero.astro and the preload hint in
 * HomeView.astro. They must match exactly, or the browser downloads the hero twice.
 */
export const HERO_IMAGE = {
  widths: [640, 960, 1280, 1920],
  sizes: '100vw',
  // The image sits under an 85% navy gradient, so a lighter encode is visually identical.
  quality: 50,
  // <Picture> adds these by default (image.layout = constrained); the preload must match.
  fit: 'cover',
  position: 'center',
} as const;
