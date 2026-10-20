# Technical SEO delivery and owner setup

The owner authorized technical search optimization on 2026-10-20 while retaining all existing visible English content, artwork, CSS, card order, layout and functionality. No new application pages, marketing copy, specifications, supplier identity, customer claims or social profiles are published in this iteration.

## Implementation

- Generate complete HTML using the existing templates for 75 listed public routes, with crawlable navigation and substantive main content before JavaScript runs. Static directory URLs work with GitHub Pages without rewrites. Browser History API navigation retains dialogs, filters, counters, menu behavior and back/forward support. Relative static links/assets and module-derived mount roots also support the earlier repository mount.
- Preserve earlier hash links, category/product/service/case aliases and unlisted legacy details. Canonical URLs consistently use the HTTPS apex domain and trailing slash, omitting query/context parameters. There is no server-side redirect configuration change; GitHub Pages handles directory redirects and custom-domain behavior, while hash migration runs client-side.
- Remove the old blanket noindex injection from the public publishing build. Keep the owner shell, retired product, unnumbered legacy cases, filtered product search and error pages noindex. Robots exclusions and obscure URLs are not authentication; real analytics data remains on the separate protected backend, with collection still disabled pending account setup.
- Build a canonical-only XML sitemap and declare it in robots.txt. Public crawling is allowed by the wildcard policy, including Googlebot, Bingbot and OAI-SearchBot. No new bot-specific training policy is imposed. No private/legacy-only URLs, query variants, invented modification dates, priorities or change frequencies enter the sitemap.
- Generate per-page titles/descriptions, canonical links, social-preview metadata and JSON-LD. Organization/WebSite identify only the real brand, public email/domain and supplied logo; service and breadcrumb data come from actual page records. No fabricated prices, ratings, reviews, qualifications, client names, material performance, account links or availability.
- Emit a real static `404.html` with noindex and preview it with 404 status. Search filters use noindex with a clean catalog canonical; contextual/attribution variants of public detail pages canonicalize to their single public document.
- Preserve local WebP illustrations, existing lazy/eager image loading and the homepage image budget. Pre-rendering removes the requirement to execute JavaScript just to read public content. Hosting/network latency and ranking remain separate from this improvement.
- Maintain a digest manifest of public page content. CI reads the prior public manifest, deploys normally, verifies the published revision and public IndexNow key file, and notifies participating engines only about changed/new/deleted public URLs. Errors are reported independently of Pages deployment; receipt is not indexing, ranking, or submission to Google. No paid service, account, DNS, domain or repository-visibility change.

## Verification

`npm run test:seo` checks every canonical route against static main content, sitemap membership, unique metadata, local assets/links, JSON-LD and privacy exclusions. The same check runs against the publishing artifact. Browser checks exercise JavaScript-disabled browsing, clean URLs, old hash/alias URLs, direct loads, refresh, filters, metadata transitions, noindex cleanup, true missing-page responses and the original repository mount. Existing tests cover navigation, contact validation/email drafts, Back to Top, counters, case ordering, card/image parity and desktop/mobile geometry. The private analytics checks remain enabled in CI.

Local delivery checks: lint and both builds passed; eight SEO/notification checks passed against both outputs; nine analytics checks passed; the complete browser suite passed 146 checks with six intentionally inapplicable viewport checks skipped. All 75 public page templates match the prior main markup after normalizing link/asset URLs. Sixteen desktop/mobile before-and-after comparisons have identical visible text and container geometry; homepage and 3D-detail screenshots at 1440px and 390px have zero changed pixels. CSS and business data/artwork files are unchanged. An initial browser attempt reused an obsolete preview process; it was stopped, fresh-server testing was enforced, and the complete current-build suite was then run successfully.

`public/indexnow-key.txt` is intentionally hosted for the IndexNow ownership protocol; it grants no login or access to site data. Never use it as an analytics credential or account password. The ignored local previous-manifest file contains only public URL digests.

## Owner-dependent steps still required

These need access to the owner's Google/Bing accounts; creating files or publishing this build does not complete them.

1. Open [Google Search Console](https://search.google.com/search-console/), add a **Domain property** for `jaford.com`, and obtain its exact DNS TXT verification value. Add only that supplied TXT value in Aliyun DNS. Preserve all existing A/CNAME/MX/TXT mail and hosting records. A URL-prefix property with an actual HTML verification file is another option if the owner prefers it; no fabricated token is added.
2. After ownership verification, submit `https://jaford.com/sitemap.xml` in **Sitemaps**. Use **URL Inspection → Test live URL** for the homepage, one product, one service and one case. Check that crawled/rendered content is present, indexing is allowed and the declared/selected canonical is appropriate; request indexing of representative priority pages within Google's limits. There is no supported anonymous sitemap ping or general-purpose Google Indexing API shortcut for these product/service pages.
3. Open [Bing Webmaster Tools](https://www.bing.com/webmasters/), verify the same domain (or import a verified Search Console property), submit the sitemap and review indexing/crawl status. The AI Performance report covers supported Microsoft/partner experiences, not every AI answer.
4. Track organic impressions/clicks and indexed canonical pages over time. Record AI citations separately from referral visits; the optional private IP dashboard does not measure all citations and currently collects neither attribution queries nor referrers. No new visitor tracking was enabled by this SEO change.

## Layout/content observations for later owner review

- The first-screen slogan is broad; new visitors must look farther down to identify the exact R&D services. A concise descriptive line could improve orientation, but the current hero remains unchanged.
- Six small cards per row and long technical names can be harder to scan at intermediate desktop widths. Current card counts and geometry remain unchanged and continue to be tested.
- The manual case carousel puts some projects beyond the initial view. All project text is now present in static HTML, improving crawl access; optional visual cues are a future UX decision.
- Concise service descriptions and paused model/specification lists limit how precisely a prospective customer can assess fit. Detailed confirmed application data and genuine evidence would support more specific searches. No new claims or specification values are added here.
- Social marks remain placeholders until the owner supplies authentic URLs. External corroboration and account verification require real profiles/evidence; cosmetic logo placement alone does not provide it.

## Official references

- [Google: JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google: build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google: Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [OpenAI: crawler controls](https://developers.openai.com/api/docs/bots)
- [IndexNow protocol](https://www.indexnow.org/documentation)

Technical eligibility, crawl permission, sitemap publication and update-notification receipt do not guarantee indexing, ranking or inclusion in AI answers. Account verification and live search-engine inspection must be reported separately from code/build/deployment completion.
