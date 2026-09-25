/**
 * Scroll reveal and number count-up.
 * Everything is visible by default. Only sections that start below the fold are marked
 * pending, then revealed as they scroll into view. Reduced-motion users get no animation.
 */
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count);
  if (!Number.isFinite(target)) return;
  const decimals = Number(el.dataset.decimals ?? 0);
  const prefix = el.dataset.prefix ?? '';
  const suffix = el.dataset.suffix ?? '';
  const nf = new Intl.NumberFormat(el.dataset.locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  const final = `${prefix}${nf.format(target)}${suffix}`;
  const start = performance.now();
  const duration = 1400;
  const step = (now: number) => {
    const p = Math.min(1, (now - start) / duration);
    el.textContent =
      p < 1 ? `${prefix}${nf.format(target * (1 - Math.pow(1 - p, 4)))}${suffix}` : final;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

if (!reduce && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        io.unobserve(el);
        if (el.hasAttribute('data-count')) countUp(el);
        else el.removeAttribute('data-reveal-pending');
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  );
  const fold = window.innerHeight;
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (el.getBoundingClientRect().top > fold) {
      el.setAttribute('data-reveal-pending', '');
      io.observe(el);
    }
  });
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => io.observe(el));
}
