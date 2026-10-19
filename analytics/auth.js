// Validate Cloudflare Access JWTs even if the edge policy is misconfigured.
const keyCache = new Map();
const decode = value => Uint8Array.from(atob(value.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0));
const object = value => JSON.parse(new TextDecoder().decode(decode(value)));

export function accessConfigured(env) {
  return /^[a-z0-9-]+\.cloudflareaccess\.com$/.test(env.ACCESS_TEAM_DOMAIN || '') &&
    Boolean(env.ACCESS_AUD?.trim()) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(env.OWNER_EMAIL || '');
}

export async function ownerAuthorized(request, env, fetchKeys = fetch) {
  if (!accessConfigured(env)) return false;
  try {
    const token = request.headers.get('Cf-Access-Jwt-Assertion') || '';
    if (token.length > 12000) return false;
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    const header = object(parts[0]);
    const claims = object(parts[1]);
    const issuer = `https://${env.ACCESS_TEAM_DOMAIN}`;
    const now = Math.floor(Date.now() / 1000);
    if (header.alg !== 'RS256' || typeof header.kid !== 'string' ||
        claims.iss !== issuer || !Array.isArray(claims.aud) || !claims.aud.includes(env.ACCESS_AUD) ||
        typeof claims.exp !== 'number' || claims.exp <= now ||
        (claims.nbf !== undefined && (typeof claims.nbf !== 'number' || claims.nbf > now)) ||
        typeof claims.email !== 'string' || claims.email.toLowerCase() !== env.OWNER_EMAIL.toLowerCase()) return false;
    let cached = keyCache.get(issuer);
    if (!cached || cached.expires < Date.now()) {
      const response = await fetchKeys(`${issuer}/cdn-cgi/access/certs`, {signal:AbortSignal.timeout(5000)});
      if (!response.ok) return false;
      const {keys} = await response.json();
      if (!Array.isArray(keys)) return false;
      cached = {keys, expires:Date.now() + 300000};
      keyCache.set(issuer, cached);
    }
    const jwk = cached.keys.find(key => key.kid === header.kid && key.kty === 'RSA');
    if (!jwk) return false;
    const algorithm = {name:'RSASSA-PKCS1-v1_5', hash:'SHA-256'};
    const key = await crypto.subtle.importKey('jwk', jwk, algorithm, false, ['verify']);
    return await crypto.subtle.verify(algorithm, key, decode(parts[2]), new TextEncoder().encode(parts.slice(0, 2).join('.')));
  } catch { return false; }
}
