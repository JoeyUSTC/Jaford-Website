import {accessConfigured, ownerAuthorized} from './auth.js';
import {dashboardHTML, dashboardScript} from './dashboard.js';

const allowedOrigins = new Set(['https://jaford.com', 'https://www.jaford.com', 'https://joeyustc.github.io']);
const windowSeconds = 30 * 86400;
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const text = value => typeof value === 'string' ? value.trim().slice(0, 240) : '';

export function possibleInstitution(network) {
  const name = text(network);
  // Research/education backbone operators are not individual institutions.
  if (/\b(cernet|janet|aarnet|internet2|nren|geant)\b|education.*network|research.*network|academic.*network/i.test(name)) return null;
  return /\b(university|universit[a-zà-ž]*|college|polytechnic|research institute|institute of (technology|science)|national laborator(?:y|ies))\b|大学|大學|研究院|研究所/iu.test(name) ? name : null;
}

function coordinate(value, limit) {
  if (value === undefined || value === null || value === '') return null;
  const number = Number(value);
  return Number.isFinite(number) && Math.abs(number) <= limit ? Math.round(number * 10) / 10 : null;
}

function reply(body, status = 200, type = 'application/json', extra = {}) {
  return new Response(body, {status, headers:{
    'Content-Type':type, 'Cache-Control':'no-store, max-age=0', 'Pragma':'no-cache',
    'X-Robots-Tag':'noindex, nofollow, noarchive', 'X-Content-Type-Options':'nosniff',
    'Referrer-Policy':'no-referrer', ...extra,
  }});
}

async function smallJSON(request) {
  if (!request.body || Number(request.headers.get('Content-Length')) > 1024) return null;
  const reader = request.body.getReader();
  let size = 0;
  const chunks = [];
  try {
    while (true) {
      const {done, value} = await reader.read();
      if (done) break;
      size += value.length;
      if (size > 1024) { await reader.cancel(); return null; }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch { return null; }
}

export async function collect(request, env) {
  const origin = request.headers.get('Origin');
  if (!allowedOrigins.has(origin)) return reply(null, 403);
  const cors = {'Access-Control-Allow-Origin':origin, 'Vary':'Origin'};
  if (request.method === 'OPTIONS') return reply(null, 204, 'text/plain', {...cors,
    'Access-Control-Allow-Methods':'POST', 'Access-Control-Allow-Headers':'Content-Type'});
  if (request.method !== 'POST') return reply(null, 405, 'text/plain', cors);
  if (env.COLLECTION_ENABLED !== 'true' || !env.DB || !accessConfigured(env)) return reply(null, 503, 'text/plain', cors);
  const agent = request.headers.get('User-Agent') || '';
  if (request.headers.get('DNT') === '1' || request.headers.get('Sec-GPC') === '1' ||
      request.cf?.botManagement?.verifiedBot || !agent || /bot|crawler|spider|headless|preview|lighthouse|monitor|curl|wget/i.test(agent)) return reply(null, 204, 'text/plain', cors);
  const ip = request.headers.get('CF-Connecting-IP') || '';
  if (!ip || ip.length > 45 || !/^[0-9a-f:.]+$/i.test(ip)) return reply(null, 400, 'text/plain', cors);
  if (env.RATE_LIMITER && !(await env.RATE_LIMITER.limit({key:ip})).success) return reply(null, 429, 'text/plain', cors);
  const event = await smallJSON(request);
  if (!event || event.page !== 'home' || !uuid.test(event.id)) return reply(null, 400, 'text/plain', cors);
  const cf = request.cf || {};
  const network = text(cf.asOrganization);
  await env.DB.prepare(`INSERT OR IGNORE INTO visits
    (event_id,occurred_at,ip,country,city,latitude,longitude,asn,network,institution)
    VALUES (?,?,?,?,?,?,?,?,?,?)`).bind(event.id, Math.floor(Date.now()/1000), ip,
    text(cf.country), text(cf.city), coordinate(cf.latitude,90), coordinate(cf.longitude,180),
    Number.isInteger(cf.asn) ? cf.asn : null, network, possibleInstitution(network)).run();
  return reply(null, 204, 'text/plain', cors);
}

async function statistics(env) {
  const since = Math.floor(Date.now()/1000) - windowSeconds;
  const results = await env.DB.batch([
    env.DB.prepare('SELECT views FROM totals WHERE id=1'),
    env.DB.prepare('SELECT COUNT(*) AS views, COUNT(DISTINCT ip) AS ips FROM visits WHERE occurred_at>=?').bind(since),
    env.DB.prepare(`SELECT country,city,latitude,longitude,COUNT(*) AS views FROM visits
      WHERE occurred_at>=? AND latitude IS NOT NULL AND longitude IS NOT NULL
      GROUP BY country,city,latitude,longitude ORDER BY views DESC LIMIT 1000`).bind(since),
    env.DB.prepare(`SELECT institution,COUNT(*) AS views,MAX(occurred_at) AS last_seen FROM visits
      WHERE occurred_at>=? AND institution IS NOT NULL GROUP BY institution ORDER BY last_seen DESC LIMIT 100`).bind(since),
    env.DB.prepare(`SELECT occurred_at,ip,country,city,asn,network,institution FROM visits
      WHERE occurred_at>=? ORDER BY occurred_at DESC LIMIT 100`).bind(since),
  ]);
  return JSON.stringify({updatedAt:new Date().toISOString(),collectionEnabled:env.COLLECTION_ENABLED==='true',windowDays:30,totalViews:results[0].results[0]?.views || 0,
    windowViews:results[1].results[0].views,uniqueIPs:results[1].results[0].ips,
    locations:results[2].results,institutions:results[3].results,visits:results[4].results});
}

export default {
  async fetch(request, env) {
    try {
      const path = new URL(request.url).pathname;
      if (path === '/collect') return await collect(request, env);
      if (!path.startsWith('/admin')) return reply('Not found', 404, 'text/plain');
      if (!accessConfigured(env) || !env.DB) return reply('Private analytics is not configured.', 503, 'text/plain');
      if (!(await ownerAuthorized(request, env))) return reply('Owner sign-in required.', 403, 'text/plain');
      if (request.method !== 'GET') return reply(null, 405);
      if (path === '/admin' || path === '/admin/') return reply(dashboardHTML, 200, 'text/html;charset=UTF-8', {
        'Content-Security-Policy':"default-src 'none'; script-src 'self'; style-src 'unsafe-inline'; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'",
        'Permissions-Policy':'geolocation=(), camera=(), microphone=()',
      });
      if (path === '/admin/app.js') return reply(dashboardScript, 200, 'text/javascript;charset=UTF-8');
      if (path === '/admin/data') return reply(await statistics(env));
      return reply('Not found', 404, 'text/plain');
    } catch { return reply('Statistics service unavailable.', 503, 'text/plain'); }
  },
  async scheduled(_event, env, ctx) {
    ctx.waitUntil(env.DB.prepare('DELETE FROM visits WHERE occurred_at < ?')
      .bind(Math.floor(Date.now()/1000) - windowSeconds).run());
  },
};
