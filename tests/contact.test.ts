import { describe, expect, it, vi } from 'vitest';
import { buildMessage, handleContact, sameOrigin, type ContactDeps } from '../src/lib/contact';
import { normalize, validate, LIMITS } from '../src/lib/contact-rules';

const valid = {
  firstName: 'Sam',
  lastName: 'Kalaliya',
  email: 'Sam@Example.com',
  message: 'We need a cover meter on site for two weeks in October.',
  consent: true,
  topic: 'rental',
  locale: 'fr',
  startedAt: 1_000,
};
const env = {
  smtpHost: 'smtp.example',
  smtpPort: 465,
  smtpUser: 'web@mbsc.test',
  smtpPass: 'x',
  to: 'admin@mbsc.test',
};
const sendMock = () => vi.fn<ContactDeps['send']>(async () => {});
const deps = (over: Partial<ContactDeps> = {}): ContactDeps => ({
  now: 60_000,
  env,
  send: sendMock(),
  ...over,
});

describe('normalize', () => {
  it('trims, lowercases email, coerces consent and drops unknown topics', () => {
    const n = normalize({
      ...valid,
      firstName: '  Sam  ',
      consent: 'on',
      topic: 'hack',
      startedAt: 'nope',
    });
    expect(n.firstName).toBe('Sam');
    expect(n.email).toBe('sam@example.com');
    expect(n.consent).toBe(true);
    expect(n.topic).toBe('general');
    expect(n.startedAt).toBeNull();
  });
  it('never throws on garbage input', () => {
    expect(() => normalize({ firstName: { a: 1 }, message: 42, consent: [] })).not.toThrow();
  });
  it('keeps line breaks in the message but strips control characters', () => {
    expect(normalize({ message: 'a\r\nb\u0007c' }).message).toBe('a\nbc');
  });
});

describe('validate', () => {
  it('accepts a valid enquiry', () => expect(validate(normalize(valid))).toEqual({}));
  it('reports every problem at once', () => {
    expect(validate(normalize({ email: 'bad', message: 'short', phone: 'abc' }))).toEqual({
      firstName: 'required',
      lastName: 'required',
      email: 'email',
      phone: 'phone',
      message: 'tooShort',
      consent: 'consent',
    });
  });
  it('enforces length limits', () => {
    expect(
      validate(normalize({ ...valid, firstName: 'x'.repeat(LIMITS.name + 1) })).firstName,
    ).toBe('tooLong');
    expect(
      validate(normalize({ ...valid, message: 'x'.repeat(LIMITS.messageMax + 1) })).message,
    ).toBe('tooLong');
  });
  it('accepts international phone formats', () => {
    for (const p of ['+61 414 955 631', '(03) 9000 0000', '+33 6 12 34 56 78'])
      expect(validate(normalize({ ...valid, phone: p })).phone).toBeUndefined();
  });
});

describe('handleContact', () => {
  it('sends a well-formed email on the happy path', async () => {
    const send = sendMock();
    const r = await handleContact(valid, deps({ send }));
    expect(r.status).toBe(200);
    expect(send).toHaveBeenCalledOnce();
    const msg = send.mock.calls[0]![0]!;
    expect(msg.from).toContain(env.smtpUser); // Zoho requires the authenticated mailbox as From
    expect(msg.to).toBe(env.to);
    expect(msg.replyTo).toContain('sam@example.com');
    expect(msg.subject).toContain('rental');
    expect(msg.text).toContain('Language: FR');
  });
  it('swallows honeypot submissions with a fake success', async () => {
    const send = sendMock();
    const r = await handleContact({ ...valid, website: 'http://spam' }, deps({ send }));
    expect(r.status).toBe(200);
    expect(send).not.toHaveBeenCalled();
  });
  it('rejects submissions faster than the minimum fill time', async () => {
    const r = await handleContact({ ...valid, startedAt: 59_000 }, deps());
    expect(r).toMatchObject({ status: 400, body: { error: 'tooFast' } });
  });
  it('accepts no-JS submissions without a timestamp', async () => {
    const r = await handleContact({ ...valid, startedAt: undefined }, deps());
    expect(r.status).toBe(200);
  });
  it('returns field errors', async () => {
    const r = await handleContact({ ...valid, email: 'nope' }, deps());
    expect(r).toMatchObject({
      status: 400,
      body: { error: 'validation', fields: { email: 'email' } },
    });
  });
  it('returns 503 when SMTP is not configured and 502 when sending fails', async () => {
    expect((await handleContact(valid, deps({ env: {} }))).status).toBe(503);
    const failing = deps({
      send: vi.fn(async () => {
        throw new Error('ECONNREFUSED');
      }),
    });
    expect((await handleContact(valid, failing)).status).toBe(502);
  });
  it('uses CONTACT_FROM_EMAIL when the SMTP username is not an address (ZeptoMail)', async () => {
    const send = sendMock();
    const zepto = { ...env, smtpUser: 'emailapikey', from: 'noreply@mbscaustralia.com.au' };
    expect((await handleContact(valid, deps({ env: zepto, send }))).status).toBe(200);
    expect(send.mock.calls[0]![0]!.from).toContain('noreply@mbscaustralia.com.au');
    expect(
      (await handleContact(valid, deps({ env: { ...env, smtpUser: 'emailapikey' } }))).status,
    ).toBe(503);
  });
  it('dry run succeeds without sending', async () => {
    const send = sendMock();
    expect((await handleContact(valid, deps({ env: { dryRun: true }, send }))).status).toBe(200);
    expect(send).not.toHaveBeenCalled();
  });
});

describe('buildMessage', () => {
  it('escapes HTML in the visitor’s text', () => {
    const msg = buildMessage(
      normalize({ ...valid, message: '<script>alert(1)</script> and more text here' }),
      { from: 'web@mbsc.test', to: 't' },
    );
    expect(msg.html).not.toContain('<script>');
    expect(msg.html).toContain('&lt;script&gt;');
  });
  it('keeps header fields on one line', () => {
    const msg = buildMessage(normalize({ ...valid, firstName: 'Sam\nBcc: x@y' }), {
      from: 'web@mbsc.test',
      to: 't',
    });
    expect(msg.subject).not.toMatch(/[\r\n]/);
    expect(msg.replyTo).not.toMatch(/[\r\n]/);
  });
});

describe('sameOrigin', () => {
  it('requires Origin (or Referer) from this host and rejects everything else', () => {
    const api = 'https://www.mbscaustralia.com.au/api/contact';
    expect(sameOrigin(null, api)).toBe(false);
    expect(sameOrigin(null, api, 'https://www.mbscaustralia.com.au/fr/contact')).toBe(true);
    expect(sameOrigin(null, api, 'https://evil.example/contact')).toBe(false);
    expect(
      sameOrigin(
        'https://www.mbscaustralia.com.au',
        'https://www.mbscaustralia.com.au/api/contact',
      ),
    ).toBe(true);
    expect(sameOrigin('https://evil.example', 'https://www.mbscaustralia.com.au/api/contact')).toBe(
      false,
    );
    expect(sameOrigin('not a url', 'https://www.mbscaustralia.com.au/api/contact')).toBe(false);
  });
});
