import nodemailer from 'nodemailer';
import type { ContactEnv, MailMessage } from './contact';

/** Sends through Zoho Mail SMTP. The From address must be the authenticated mailbox (or a verified alias). */
export async function sendViaSmtp(msg: MailMessage, env: ContactEnv): Promise<void> {
  const port = env.smtpPort ?? 465;
  const transport = nodemailer.createTransport({
    host: env.smtpHost,
    port,
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user: env.smtpUser, pass: env.smtpPass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
  await transport.sendMail(msg);
}
