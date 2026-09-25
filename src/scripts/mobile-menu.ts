/** Mobile navigation using a native <dialog>: focus trap, Escape and inert background come for free. */
export function initMobileMenu(): void {
  const dialog = document.getElementById('mobile-menu');
  const openBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  if (!(dialog instanceof HTMLDialogElement) || !openBtn) return;

  const setExpanded = (v: boolean) => openBtn.setAttribute('aria-expanded', String(v));

  openBtn.addEventListener('click', () => {
    dialog.showModal();
    setExpanded(true);
  });
  dialog.querySelector('[data-menu-close]')?.addEventListener('click', () => dialog.close());
  // Clicking the backdrop (the dialog element itself, outside its content) closes it.
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    setExpanded(false);
    openBtn.focus();
  });
  // Close if the viewport grows past the mobile breakpoint while open.
  const mq = window.matchMedia('(min-width: 64rem)');
  mq.addEventListener('change', (e) => {
    if (e.matches && dialog.open) dialog.close();
  });
}
