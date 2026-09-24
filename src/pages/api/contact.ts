import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async () =>
  new Response(JSON.stringify({ ok: false, error: 'unavailable' }), {
    status: 503,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

export const ALL: APIRoute = async () =>
  new Response(null, { status: 405, headers: { allow: 'POST' } });
