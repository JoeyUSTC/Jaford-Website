# Social logo provenance and destinations

The owner supplied account destinations in a private DOCX on 2026-10-20 and requested clickable logos plus Xiaohongshu. The homepage and independent Contact Us page share six compact marks. Twitter/X, LinkedIn, WeChat Official Account, Douyin and Xiaohongshu use the exact supplied account URLs (adding HTTPS/www and a trailing slash to the LinkedIn company URL). All five links open in a new tab with noopener/noreferrer, accessible English platform names, hover titles and visible keyboard focus. Taobao remains a non-interactive mark: the document has no shop link, and exact/variant public searches for Jaford 研材工坊 and Taobao-restricted searches did not establish a matching shop URL; the shop-search page was inaccessible through the research tool. No generic platform or search URL is substituted. The DOCX and embedded QR images remain outside the repository/artifact.

`src/social-icons.js` bundles unmodified vector path data from [Simple Icons 11.15.0](https://github.com/simple-icons/simple-icons/tree/11.15.0), distributed under [CC0 1.0](https://github.com/simple-icons/simple-icons/blob/11.15.0/LICENSE.md). Brand marks remain subject to their respective trademark rights. The Douyin mark uses the shared musical-note silhouette from the TikTok icon; its accessible name and destination are Douyin, not a TikTok account.

Sources fetched from the pinned package:

- `https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/twitter.svg`
- `https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/linkedin.svg`
- `https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/taobao.svg`
- `https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/wechat.svg`
- `https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/tiktok.svg`
- `https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/xiaohongshu.svg`

These are build-time source references only. The visitor's browser makes no requests to a third-party icon service, social network or shop merely to render these marks. External destinations are requested only on activation.

## Access checks

The LinkedIn company page was readable through the research tool and identified Jaford Advisory Pte. Ltd. with the jaford.com website. The same tool could not read the supplied WeChat, Xiaohongshu or Douyin URL, and X returned HTTP 403. These are tool/platform access limits; no alternate account URL is guessed.

UI browser tests check both placements, all five exact targets (including WeChat query escaping), keyboard focus, 320px single-row layout, new-tab behavior and opener isolation. Offsite responses in those UI tests are mocked explicitly and are not evidence of real remote availability. The separate `scripts/check-social-links.mjs` makes public unauthenticated requests from the publishing runner, records final URLs/status/title and highlights verification or access failures. Its non-blocking post-deployment output in GitHub Actions distinguishes HTTP reachability from actual account visibility. Platform login, WeChat/app restrictions, geographic availability and anti-bot checks can still affect visitors.
