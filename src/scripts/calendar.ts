import { todayISO } from './today';

/**
 * Progressive enhancement for the training calendar:
 * - marks sessions that have already finished (visitor's local date)
 * - reveals the filter form and filters rows by category, delivery and location
 * Without JavaScript the full calendar is still readable.
 */
export function initCalendar(): void {
  const root = document.querySelector<HTMLElement>('[data-calendar]');
  if (!root) return;
  const form = root.querySelector<HTMLFormElement>('[data-calendar-filters]');
  const count = root.querySelector<HTMLElement>('[data-calendar-count]');
  const empty = root.querySelector<HTMLElement>('[data-calendar-empty]');
  const rows = [...root.querySelectorAll<HTMLElement>('[data-session]')];
  const months = [...root.querySelectorAll<HTMLElement>('[data-month]')];

  const today = todayISO();
  for (const row of rows) {
    const end = row.dataset.end;
    if (end && end < today) row.setAttribute('data-past', '');
  }

  // Collapse months where every dated session has finished (current year only in practice).
  const pastMonths = months.filter((m) => {
    const dated = [...m.querySelectorAll<HTMLElement>('[data-session]')].filter(
      (r) => r.dataset.end,
    );
    return dated.length > 0 && dated.every((r) => r.hasAttribute('data-past'));
  });
  const toggle = root.querySelector<HTMLButtonElement>('[data-past-toggle]');
  let showPast = false;
  const syncPast = () => {
    pastMonths.forEach((m) => m.toggleAttribute('data-collapsed', !showPast));
    if (!toggle) return;
    const n = pastMonths.length;
    toggle.textContent = showPast
      ? (root.dataset.hidePast ?? '')
      : (n === 1 ? (root.dataset.showPastOne ?? '') : (root.dataset.showPast ?? '')).replace(
          '{count}',
          String(n),
        );
    toggle.setAttribute('aria-expanded', String(showPast));
  };
  if (pastMonths.length && toggle) {
    toggle.classList.remove('hidden');
    toggle.classList.add('inline-flex');
    toggle.addEventListener('click', () => {
      showPast = !showPast;
      syncPast();
    });
    syncPast();
  }

  if (!form) return;
  form.hidden = false;
  const template = root.dataset.results ?? '{count}';
  const templateOne = root.dataset.resultsOne ?? template;

  const apply = () => {
    const data = new FormData(form);
    const want = {
      category: String(data.get('category') ?? ''),
      delivery: String(data.get('delivery') ?? ''),
      location: String(data.get('location') ?? ''),
    };
    const filtering = Object.values(want).some(Boolean);
    let shown = 0;
    for (const row of rows) {
      const match =
        (!want.category || row.dataset.category === want.category) &&
        (!want.delivery || row.dataset.delivery === want.delivery) &&
        (!want.location || row.dataset.location === want.location);
      row.hidden = !match;
      if (match) shown++;
    }
    // When filtering, hide months with no matching sessions to keep the list short.
    for (const month of months) {
      const visible = month.querySelectorAll('[data-session]:not([hidden])').length;
      const hasRows = month.querySelector('[data-session]') !== null;
      month.hidden = filtering && hasRows ? visible === 0 : filtering && !hasRows;
    }
    if (count)
      count.textContent = (shown === 1 ? templateOne : template).replace('{count}', String(shown));
    if (empty) empty.classList.toggle('hidden', shown !== 0);
  };

  form.addEventListener('change', apply);
  form.addEventListener('reset', () => requestAnimationFrame(apply));
  form.addEventListener('submit', (e) => e.preventDefault());
  apply();
}
