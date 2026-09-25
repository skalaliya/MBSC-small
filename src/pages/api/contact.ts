import type { APIRoute } from 'astro';
import { getSecret } from 'astro:env/server';
import { handleContact, sameOrigin, type ContactEnv } from '../../lib/contact';
import { sendViaSmtp } from '../../lib/mailer';

export const prerender = false;

const MAX_BYTES = 16 * 1024;
const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

function readEnv(): ContactEnv {
  const port = Number(getSecret('ZOHO_SMTP_PORT'));
  return {
    smtpHost: getSecret('ZOHO_SMTP_HOST') || 'smtppro.zoho.com',
    smtpPort: Number.isFinite(port) && port > 0 ? port : 465,
    smtpUser: getSecret('ZOHO_SMTP_USER') || undefined,
    smtpPass: getSecret('ZOHO_SMTP_PASS') || undefined,
    to: getSecret('CONTACT_TO_EMAIL') || undefined,
    dryRun: String(getSecret('CONTACT_DRY_RUN')) === 'true',
  };
}

export const POST: APIRoute = async ({ request }) => {
  const isForm = (request.headers.get('content-type') ?? '').includes(
    'application/x-www-form-urlencoded',
  );
  if (!sameOrigin(request.headers.get('origin'), request.url))
    return json(403, { ok: false, error: 'origin' });

  const length = Number(request.headers.get('content-length') ?? 0);
  if (length > MAX_BYTES) return json(413, { ok: false, error: 'invalid' });
  const raw = await request.text();
  if (raw.length > MAX_BYTES) return json(413, { ok: false, error: 'invalid' });

  let body: Record<string, unknown>;
  try {
    body = isForm
      ? Object.fromEntries(new URLSearchParams(raw))
      : (JSON.parse(raw) as Record<string, unknown>);
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('not an object');
  } catch {
    return json(400, { ok: false, error: 'invalid' });
  }

  const result = await handleContact(body, {
    now: Date.now(),
    env: readEnv(),
    send: sendViaSmtp,
    log: (msg, extra) => console.log(JSON.stringify({ msg, ...extra })),
  });

  // No-JS fallback: redirect to a confirmation page, or back to the form with an error code.
  if (isForm) {
    const base = result.input?.locale === 'fr' ? '/fr/contact' : '/contact';
    const location =
      result.status === 200
        ? `${base}/sent`
        : `${base}?error=${'error' in result.body ? result.body.error : 'invalid'}#enquiry`;
    return new Response(null, { status: 303, headers: { location, 'cache-control': 'no-store' } });
  }
  return json(result.status, result.body);
};

export const ALL: APIRoute = async () =>
  new Response(null, { status: 405, headers: { allow: 'POST' } });
