/**
 * Contact form rules shared by the browser script and the server endpoint.
 * No dependencies, so it is cheap to ship to the client.
 */
import { TOPICS, type Topic } from './content';

export const LIMITS = {
  name: 80,
  company: 120,
  email: 200,
  ref: 300,
  page: 300,
  messageMin: 20,
  messageMax: 2000,
  /** Submissions faster than this after the form loaded are treated as automated. */
  minFillMs: 3000,
} as const;

export type Field = 'firstName' | 'lastName' | 'company' | 'email' | 'phone' | 'topic' | 'message' | 'consent';
export type ErrorCode = 'required' | 'email' | 'phone' | 'tooShort' | 'tooLong' | 'consent';

export interface ContactInput {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  topic: Topic;
  ref: string;
  message: string;
  consent: boolean;
  locale: 'en' | 'fr';
  page: string;
  /** Honeypot: must be empty. */
  website: string;
  /** Epoch ms when the form was rendered in the browser; absent for no-JS submissions. */
  startedAt: number | null;
}

const EMAIL = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[A-Za-z]{2,}$/;
const PHONE = /^[+()\d\s.-]{6,25}$/;
const str = (v: unknown, max: number) => (typeof v === 'string' ? v.replace(/\s+/g, ' ').trim().slice(0, max) : '');
// Messages keep their line breaks but lose other control characters.
const text = (v: unknown, max: number) =>
  typeof v === 'string' ? v.replace(/\r\n?/g, '\n').replace(/[^\S\n]+/g, ' ').replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, '').trim().slice(0, max + 1) : '';

/** Coerce untrusted input (JSON or form fields) into a typed object. Never throws. */
export function normalize(raw: Record<string, unknown>): ContactInput {
  const topic = TOPICS.includes(raw.topic as Topic) ? (raw.topic as Topic) : 'general';
  const started = Number(raw.startedAt);
  return {
    firstName: str(raw.firstName, LIMITS.name + 1),
    lastName: str(raw.lastName, LIMITS.name + 1),
    company: str(raw.company, LIMITS.company + 1),
    email: str(raw.email, LIMITS.email + 1).toLowerCase(),
    phone: str(raw.phone, 40),
    topic,
    ref: str(raw.ref, LIMITS.ref),
    message: text(raw.message, LIMITS.messageMax),
    consent: raw.consent === true || raw.consent === 'on' || raw.consent === 'true',
    locale: raw.locale === 'fr' ? 'fr' : 'en',
    page: str(raw.page, LIMITS.page),
    website: str(raw.website, 200),
    startedAt: Number.isFinite(started) && started > 0 ? started : null,
  };
}

export function validate(input: ContactInput): Partial<Record<Field, ErrorCode>> {
  const e: Partial<Record<Field, ErrorCode>> = {};
  if (!input.firstName) e.firstName = 'required';
  else if (input.firstName.length > LIMITS.name) e.firstName = 'tooLong';
  if (!input.lastName) e.lastName = 'required';
  else if (input.lastName.length > LIMITS.name) e.lastName = 'tooLong';
  if (input.company.length > LIMITS.company) e.company = 'tooLong';
  if (!input.email) e.email = 'required';
  else if (input.email.length > LIMITS.email || !EMAIL.test(input.email)) e.email = 'email';
  if (input.phone && !PHONE.test(input.phone)) e.phone = 'phone';
  if (!input.message) e.message = 'required';
  else if (input.message.length < LIMITS.messageMin) e.message = 'tooShort';
  else if (input.message.length > LIMITS.messageMax) e.message = 'tooLong';
  if (!input.consent) e.consent = 'consent';
  return e;
}
