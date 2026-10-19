// Public endpoint URLs only. Credentials and visit records never belong here.
const config = import.meta.env || {};
export function analyticsURL(value, path) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password && url.pathname === path && !url.search && !url.hash ? url.href : '';
  } catch { return ''; }
}

export function createHomepageTracker({ endpoint, browser = window, client = navigator, send = fetch } = {}) {
  const target = analyticsURL(endpoint, '/collect');
  let onHome = false;
  let pending = false;
  const flush = () => {
    if (!pending || !onHome || browser.document.visibilityState !== 'visible') return;
    pending = false;
    if (!target || client.doNotTrack === '1' || browser.doNotTrack === '1' || client.globalPrivacyControl) return;
    // No cookie, device ID, fingerprint, form content, referrer or query string.
    try {
      Promise.resolve(send(target, {
        method: 'POST', credentials: 'omit', keepalive: true,
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body: JSON.stringify({ id: browser.crypto.randomUUID(), page: 'home' }),
      })).catch(() => {});
    } catch { /* Analytics must never interrupt browsing. */ }
  };
  browser.document.addEventListener('visibilitychange', flush);
  return isHome => {
    if (isHome && !onHome) pending = true;
    if (!isHome) pending = false;
    onHome = isHome;
    flush();
  };
}

export const recordHomepageView = typeof window === 'undefined' ? () => {} : createHomepageTracker({ endpoint: config.VITE_ANALYTICS_COLLECT_URL });

export function ownerInsightsPage() {
  const url = analyticsURL(config.VITE_ANALYTICS_ADMIN_URL, '/admin');
  return `<section class="container hero"><h1 tabindex="-1">Website insights</h1>${url
    ? `<p>Visit records are available in the protected dashboard.</p><a class="button button-outline" href="${url}">Open private dashboard</a>`
    : '<p>Analytics is not connected. No visitor records are being collected.</p><p>The private dashboard requires a configured statistics service and owner access.</p>'}</section>`;
}
