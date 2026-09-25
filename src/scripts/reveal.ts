/**
 * Scroll reveal and number count-up. Content is fully visible without JS; the
 * `js-motion` class (set in <head> only when motion is allowed) opts in to the
 * hidden initial state, and this script reveals sections as they enter view.
 */
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;

function reveal(el: HTMLElement) {
  el.setAttribute('data-revealed', '');
}

function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count);
  const decimals = Number(el.dataset.decimals ?? 0);
  const prefix = el.dataset.prefix ?? '';
  const suffix = el.dataset.suffix ?? '';
  const nf = new Intl.NumberFormat(el.dataset.locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  if (!Number.isFinite(target)) return;
  const final = `${prefix}${nf.format(target)}${suffix}`;
  const duration = 1400;
  const start = performance.now();
  const step = (now: number) => {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 4);
    el.textContent = `${prefix}${nf.format(target * eased)}${suffix}`;
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = final;
  };
  requestAnimationFrame(step);
}

if (reduce || !('IntersectionObserver' in window)) {
  root.classList.remove('js-motion');
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        io.unobserve(el);
        if (el.hasAttribute('data-count')) countUp(el);
        else reveal(el);
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
  );
  document.querySelectorAll<HTMLElement>('[data-reveal], [data-count]').forEach((el) => io.observe(el));
  // Safety net: never leave on-screen content hidden if the observer misses it.
  window.setTimeout(() => {
    document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-revealed])').forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) reveal(el);
    });
  }, 1500);
}
