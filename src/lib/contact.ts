import {
  LIMITS,
  normalize,
  validate,
  type ContactInput,
  type ErrorCode,
  type Field,
} from './contact-rules';

export interface ContactEnv {
  smtpHost?: string;
  smtpPort?: number;
  smtpUser?: string;
  smtpPass?: string;
  /** From address. Defaults to smtpUser (Zoho Mail). Required for ZeptoMail, whose username is "emailapikey". */
  from?: string;
  to?: string;
  dryRun?: boolean;
}

export interface MailMessage {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
}

export interface ContactDeps {
  now: number;
  env: ContactEnv;
  send: (msg: MailMessage, env: ContactEnv) => Promise<void>;
  log?: (msg: string, extra?: Record<string, unknown>) => void;
}

export type ContactResult =
  | { status: 200; body: { ok: true } }
  | {
      status: 400;
      body: { ok: false; error: 'validation'; fields: Partial<Record<Field, ErrorCode>> };
    }
  | { status: 400; body: { ok: false; error: 'tooFast' | 'invalid' } }
  | { status: 403; body: { ok: false; error: 'origin' } }
  | { status: 502; body: { ok: false; error: 'send' } }
  | { status: 503; body: { ok: false; error: 'unavailable' } };

/** True when the Origin header (if any) matches the host the request was sent to. */
/**
 * Browsers send Origin on every POST (forms included); Referer is a fallback for the rare
 * privacy tool that strips Origin. A request with neither comes from a script, not our form.
 */
export function sameOrigin(
  origin: string | null,
  requestUrl: string,
  referer: string | null = null,
): boolean {
  const source = origin ?? referer;
  if (!source) return false;
  try {
    return new URL(source).host === new URL(requestUrl).host;
  } catch {
    return false;
  }
}

const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  );
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ').trim();

export function buildMessage(input: ContactInput, env: { from: string; to: string }): MailMessage {
  const name = oneLine(`${input.firstName} ${input.lastName}`);
  const rows: [string, string][] = [
    ['Name', name],
    ['Email', input.email],
    ['Phone', input.phone || '—'],
    ['Company', input.company || '—'],
    ['Topic', input.topic],
    ['Regarding', input.ref || '—'],
    ['Language', input.locale.toUpperCase()],
    ['Page', input.page || '—'],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${input.message}\n`;
  const html = `<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows
    .map(
      ([k, v]) => `<tr><td style="color:#5b6472">${k}</td><td><strong>${esc(v)}</strong></td></tr>`,
    )
    .join(
      '',
    )}</table><p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${esc(input.message)}</p>`;
  return {
    from: `MBSC website <${env.from}>`,
    to: env.to,
    replyTo: `${oneLine(name).replace(/[<>"]/g, '')} <${input.email}>`,
    subject: oneLine(
      `Website enquiry (${input.topic}): ${name}${input.company ? `, ${input.company}` : ''}`,
    ).slice(0, 180),
    text,
    html,
  };
}

export async function handleContact(
  raw: Record<string, unknown>,
  deps: ContactDeps,
): Promise<ContactResult & { input?: ContactInput }> {
  const input = normalize(raw);

  // Honeypot filled: pretend success so bots learn nothing, but send nothing.
  if (input.website) {
    deps.log?.('contact: honeypot triggered');
    return { status: 200, body: { ok: true }, input };
  }
  if (input.startedAt !== null && deps.now - input.startedAt < LIMITS.minFillMs) {
    return { status: 400, body: { ok: false, error: 'tooFast' }, input };
  }
  const fields = validate(input);
  if (Object.keys(fields).length)
    return { status: 400, body: { ok: false, error: 'validation', fields }, input };

  const { env } = deps;
  if (!env.dryRun && (!env.smtpUser || !env.smtpPass || !env.to || !env.smtpHost)) {
    deps.log?.('contact: SMTP environment variables missing');
    return { status: 503, body: { ok: false, error: 'unavailable' }, input };
  }
  const from = env.from || env.smtpUser;
  if (!env.dryRun && !from?.includes('@')) {
    deps.log?.('contact: no valid From address (set CONTACT_FROM_EMAIL)');
    return { status: 503, body: { ok: false, error: 'unavailable' }, input };
  }
  const message = buildMessage(input, {
    from: from ?? 'dry-run@localhost',
    to: env.to ?? 'dry-run@localhost',
  });
  if (env.dryRun) {
    deps.log?.('contact: dry run, email not sent', { subject: message.subject });
    return { status: 200, body: { ok: true }, input };
  }
  try {
    await deps.send(message, env);
    return { status: 200, body: { ok: true }, input };
  } catch (err) {
    deps.log?.('contact: send failed', { error: err instanceof Error ? err.message : String(err) });
    return { status: 502, body: { ok: false, error: 'send' }, input };
  }
}
