import { normalize, validate, type Field } from '../lib/contact-rules';
import { TOPICS } from '../lib/content';

type Messages = Record<string, string>;

/**
 * Progressive enhancement for the contact form: inline validation, JSON submit with
 * clear success/error states, and prefill from ?topic= and ?ref= links elsewhere on the site.
 * Without JavaScript the form posts normally and the server redirects.
 */
export function initContactForm(): void {
  const root = document.querySelector<HTMLElement>('[data-contact]');
  const form = root?.querySelector<HTMLFormElement>('[data-contact-form]');
  if (!root || !form) return;
  const messages: Messages = JSON.parse(form.dataset.messages ?? '{}');
  const alertBox = form.querySelector<HTMLElement>('[data-form-alert]')!;
  const success = root.querySelector<HTMLElement>('[data-contact-success]')!;
  const submit = form.querySelector<HTMLButtonElement>('[data-submit]')!;
  const submitLabel = submit.innerHTML;
  const field = (name: string) =>
    form.elements.namedItem(name) as
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;

  const setHidden = (name: string, value: string) => {
    const el = field(name);
    if (el) el.value = value;
  };
  const markStart = () => setHidden('startedAt', String(Date.now()));
  markStart();
  setHidden('page', location.pathname);

  // Prefill from query string. Values are untrusted: only set as text / known option values.
  const params = new URLSearchParams(location.search);
  const topic = params.get('topic');
  if (topic && (TOPICS as readonly string[]).includes(topic)) setHidden('topic', topic);
  const ref = (params.get('ref') ?? '').replace(/\s+/g, ' ').trim().slice(0, 300);
  if (ref) {
    setHidden('ref', ref);
    const box = form.querySelector<HTMLElement>('[data-ref-box]');
    const text = form.querySelector<HTMLElement>('[data-ref-text]');
    if (box && text) {
      text.textContent = ref;
      box.classList.remove('hidden');
    }
  }
  const serverError = params.get('error');
  if (serverError) showAlert(messages[serverError] ?? messages.send ?? '');

  function showAlert(message: string) {
    alertBox.textContent = message;
    alertBox.classList.toggle('hidden', !message);
    if (message) alertBox.focus();
  }

  function showFieldError(name: Field, code?: string) {
    const el = field(name);
    const hint = form!.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
    if (!el) return;
    if (code) {
      el.setAttribute('aria-invalid', 'true');
      if (hint) {
        hint.textContent = messages[code] ?? '';
        hint.hidden = false;
      }
    } else {
      el.removeAttribute('aria-invalid');
      if (hint) hint.hidden = true;
    }
  }

  const read = () =>
    normalize(Object.fromEntries([...new FormData(form)].map(([k, v]) => [k, String(v)])));

  // Validate a field when the user leaves it, and clear its error as they fix it.
  const touched = new Set<string>();
  form.addEventListener('focusout', (e) => {
    const target = e.target as HTMLInputElement;
    if (!target.name) return;
    // Skip when focus moves to the submit button (or nowhere, as Safari does on button clicks):
    // showing or hiding a hint here would reflow the form under the pointer and lose the click.
    const next = (e as FocusEvent).relatedTarget;
    if (next === null || next === submit) return;
    touched.add(target.name);
    const errors = validate(read());
    showFieldError(target.name as Field, errors[target.name as Field]);
  });
  form.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
    if (!touched.has(target.name)) return;
    const errors = validate(read());
    showFieldError(target.name as Field, errors[target.name as Field]);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = read();
    const errors = validate(data);
    const fields: Field[] = ['firstName', 'lastName', 'email', 'phone', 'message', 'consent'];
    fields.forEach((f) => showFieldError(f, errors[f]));
    const first = fields.find((f) => errors[f]);
    if (first) {
      showAlert(messages.summary ?? '');
      field(first)?.focus();
      return;
    }
    showAlert('');
    submit.disabled = true;
    submit.textContent = messages.sending ?? '…';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        fields?: Record<string, string>;
      };
      if (res.ok && body.ok) {
        form.hidden = true;
        success.classList.remove('hidden');
        success.focus();
        window.va?.('event', { name: 'contact_submitted', data: { topic: data.topic } });
        return;
      }
      if (body.fields)
        Object.entries(body.fields).forEach(([k, v]) => showFieldError(k as Field, v));
      showAlert(messages[body.error ?? 'send'] ?? messages.send ?? '');
    } catch {
      showAlert(messages.send ?? '');
    } finally {
      submit.disabled = false;
      submit.innerHTML = submitLabel;
    }
  });

  root.querySelector('[data-contact-again]')?.addEventListener('click', () => {
    form.reset();
    markStart();
    setHidden('page', location.pathname);
    success.classList.add('hidden');
    form.hidden = false;
    field('firstName')?.focus();
  });
}

declare global {
  interface Window {
    va?: (
      event: 'event',
      payload: { name: string; data?: Record<string, string | number> },
    ) => void;
  }
}
