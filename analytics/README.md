# Private homepage analytics

Status: code prepared and tested locally; **no Cloudflare account/backend is connected, and collection is disabled**. The GitHub Pages route `#/owner-insights` is an unlisted, noindex entry page, not an authentication mechanism. It contains no visitor records. Never put visit data, tokens or credentials in this public repository or a Vite build.

## Owner setup

1. Create a Cloudflare account at <https://dash.cloudflare.com/sign-up> and verify its email. The website stays on GitHub Pages and domain DNS stays in Aliyun. This backend uses its own `workers.dev` hostname; no domain transfer, nameserver change, email-DNS edit or hosting migration is required.
2. Enable Workers and a Zero Trust organization. Start with available free plans; do not enable paid plans or billing changes automatically. Select one owner email for One-time PIN login. No reusable dashboard password is implemented.
3. Deploy the Worker and bind a D1 database using the maintainer steps below. Initially keep collection disabled. In Zero Trust, create a **hostname/path-based self-hosted Access application** covering `YOUR-WORKER.YOUR-SUBDOMAIN.workers.dev/admin` and its subpaths. Add an Allow policy for the **exact owner email**, with One-time PIN as a login method. Do not allow all email addresses or an entire public email domain. Do not protect the whole Worker: `/collect` must accept visitor beacons without login. Do not add a bypass policy for `/admin`.
4. Set `ACCESS_TEAM_DOMAIN` (the team's `NAME.cloudflareaccess.com`, no scheme/path), `ACCESS_AUD` (the application's Audience tag) and `OWNER_EMAIL` in the private Wrangler configuration. Redeploy. The Worker verifies the signature, issuer, audience, expiry and owner email itself, in addition to Access. Misconfigured/missing identity settings deny dashboard access and disable collection.
5. Verify owner PIN login and anonymous denial on **all** `/admin`, `/admin/`, `/admin/app.js`, `/admin/data` paths, and check there are no unprotected preview/alternate routes. Check logout/session expiry too. Sign in to the empty dashboard and verify no records exist. Verify map rendering and CSP in the actual Worker runtime before activation; current tests use Node and mocked browser requests, not a deployed Cloudflare account.
6. Before enabling visitor collection, finalize the site's visitor-facing analytics/privacy disclosure for IP collection, processor, purpose and retention. Set `COLLECTION_ENABLED` to `true` only after that and the access checks. Confirm plan quotas and configure/retain the 60 requests/minute/IP rate-limit binding; do not assume the free tier covers unlimited traffic.
7. Configure these **public URL variables** in GitHub repository Settings → Secrets and variables → Actions → Variables (not secrets):
   - `VITE_ANALYTICS_COLLECT_URL=https://YOUR-WORKER.YOUR-SUBDOMAIN.workers.dev/collect`
   - `VITE_ANALYTICS_ADMIN_URL=https://YOUR-WORKER.YOUR-SUBDOMAIN.workers.dev/admin`
   Re-run Publish website preview (or push a normal website change), wait for actual Pages deployment and verify the resulting artifact. No passwords, API tokens, owner JWTs or raw visit records belong in `VITE_` variables. The existing workflow reads these two variables; both are empty by default.
8. Manually open `https://jaford.com/#/owner-insights`, then Open private dashboard. Access sends a code to the allowed email. Test one homepage entry, its IP/location record and the total; navigate away and back to verify another entry. Opening the owner route, another category or a background-prefetched page must not create a homepage visit. Verify real geography/ASN availability, duplicate retries, blocked requests and retention. Only after these live checks describe analytics as active.

The owner currently has no Cloudflare account. Account creation and owner-email choice are the next prerequisites. Do not ask the owner to post a password or API token in chat. Use a connected account or secure environment/GitHub secret configuration if delegated deployment is requested.

## Maintainer deployment commands

Wrangler is an optional maintenance tool, not a website/CI dependency. Authenticate with the owner's account through the normal secure flow. Keep `analytics/wrangler.jsonc`, `.dev.vars` and `.wrangler` state out of Git. Pin the actual Wrangler version used when activating the backend.

```sh
cp analytics/wrangler.example.jsonc analytics/wrangler.jsonc
npx wrangler@4.151.2 d1 create jaford-private-analytics
# Put the returned database_id in analytics/wrangler.jsonc.
npx wrangler@4.151.2 d1 execute jaford-private-analytics --remote --config analytics/wrangler.jsonc --file analytics/schema.sql
npx wrangler@4.151.2 deploy --config analytics/wrangler.jsonc
```

Complete the Access settings above, edit the ignored configuration, and redeploy with collection still disabled for the login checks. Do not change `main`, Pages or DNS to deploy the Worker. `npx wrangler@4.151.2 deploy --dry-run --config analytics/wrangler.example.jsonc` can check bundling without creating infrastructure; it cannot prove account permissions, D1 binding, Access enforcement or live IP metadata.

## What is measured

- **Views**: accepted visible homepage entries from the JavaScript beacon, including refresh and returning from another category. Re-rendering the same homepage/anchor does not add another view. An event UUID deduplicates retries. This is a recorded-request count, not a verified number of people or a historical reconstruction.
- **Different IPs**: distinct server-observed connections over the last 30 days, not unique visitors. Shared campus networks, NAT, dynamic IPs and VPNs prevent person-level counts.
- **IP/location/network**: `CF-Connecting-IP` and Cloudflare's edge metadata, never client-submitted IP or location. Coordinates are rounded to one decimal degree and labeled approximate. Missing city/coordinates stay missing; no browser GPS request or invented map location. The collector does not call an external IP-enrichment provider.
- **Possible institutions**: a conservative name match on the edge-provided ASN/network owner, not confirmed employment, enrollment, a named visitor or customer. Broad research/education network operators are excluded. Universities using commercial ISPs/VPNs may not match. No institution email alert or outreach is sent; the private dashboard updates the list automatically on refresh.
- **Coverage**: Do Not Track / Global Privacy Control are respected. Known bots/previews and rate-limited requests are filtered. Ad blockers, network restrictions, scripts disabled, metadata gaps and spoofed requests affect coverage. CORS and UUID validation do not establish that every request is a genuine human; do not market this as bot-proof analytics. Mainland reachability of a separate `workers.dev` endpoint is not guaranteed.
- **Retention**: database queries show a rolling 30-day window. The 03:00 UTC daily cron deletes older raw IP-level records (up to one extra day before cleanup). The aggregate all-time count remains. IP-level export, console logging, public cache and local-browser persistence are not implemented. Operational Cloudflare logs are disabled in the example. Cloudflare account administrators still have access to their own database.
- **UI**: up to 1,000 location groups, 100 recent visits and 100 possible institution groups, labeled as limits. Auto-refresh is once per minute while visible. An expired/unavailable session clears displayed data rather than retaining stale results or replacing them with fake zeros. Map assets and scripts are served from the protected backend, with no external map tiles/scripts.

## Verification and sources

Wrangler 4.151.2 dry-run bundling passed locally, without authentication or infrastructure creation. This verifies the Worker bundle and configuration shape, not a live deployment. Run `npm run test:analytics` with Node.js 24, then lint/build and relevant Playwright checks. The Node tests use a real in-memory SQLite database and genuine RSA signatures to exercise authorization, deduplication, retention, filtering, counts and tracker lifecycle. Browser fixtures use documentation-only IPs and synthetic names, never real visitor data. Live Access/PIN, D1, edge IP fields, Worker quotas, cron execution and beacon delivery require a connected account and remain unverified until activation.

- [Workers with Cloudflare Access](https://developers.cloudflare.com/workers/configuration/cloudflare-access/) — hostname/path protection without moving the existing site.
- [One-time PIN](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/) — approve the exact owner email, not any email.
- [JWT validation](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/) — key endpoint and claim/signature checks.
- [Worker request metadata](https://developers.cloudflare.com/workers/runtime-apis/request/) and [visitor IP headers](https://developers.cloudflare.com/fundamentals/reference/http-headers/).
- [Rate-limit binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/).
- World land outlines: [Natural Earth 1:110m land](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson), [public-domain terms](https://www.naturalearthdata.com/about/terms-of-use/). Coordinates converted to a bundled equirectangular SVG path in `world-land.js`; no external runtime map requests.
