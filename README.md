# JAFORD website

A responsive English homepage for JAFORD's advanced materials and R&D offering, aimed at startups and research teams. Built with Vite, vanilla JavaScript and CSS. The layout uses plain typography and directly visible product information, without decorative imagery or external fonts.

## Develop

Requires Node.js 20.19+ or 22.12+ (verified with Node.js 24).

```sh
npm ci
npm run dev
```

## Validate

```sh
npm run lint
npm run build
npx playwright install chromium
npm test
```

In the Codex cloud environment, Chromium is already available. Use `CHROMIUM_PATH=/usr/bin/chromium npm test` instead of downloading a browser. Tests run against the production build on port 4173 and exercise desktop, tablet and mobile layouts, category inquiries, form validation, downloads and navigation.

## Production

`npm run build` creates the deployable static site in `dist/`. `npm run preview` serves that build for local verification.

## Independent website preview

The owner reviews website iterations from mobile Codex sessions using one stable website address. The preview uses the existing repository's GitHub Pages site, independently of the company's domain. It is publicly accessible when enabled, with a `noindex, nofollow` meta tag to discourage search indexing; this is not authentication.

The normal workflow is: implement the requested change, validate it, and push to `main`. `.github/workflows/preview.yml` then runs lint, build and browser tests and publishes the site. No extra hosting account or manual upload is needed for each iteration. `AGENTS.md` records this workflow for future Codex tasks.

Initial setup is complete: the owner has made the repository public and selected **Settings → Pages → Source → GitHub Actions**. Future iterations use this configuration automatically.

After publication, check `https://joeyustc.github.io/Jaford-Website/` and its `version.json`; the revision must match the intended source commit. A successful Git push alone does not establish a working preview.

### Manual fallback

```sh
npm run build:preview
npm run deploy:preview
```

The build uses `/Jaford-Website/` as its base path and outputs to ignored `.preview-dist/`. The publish script pushes only those static assets to `gh-pages` without force-pushing, switching branches, or changing the working index. It uses existing Git authentication. No credentials or source files are included in the deployed build.

For this manual fallback only, GitHub Pages would use **Deploy from a branch → gh-pages → / (root)**. The automatic workflow above uses **GitHub Actions** instead; do not switch the Pages source during routine iterations. Pushing the branch alone does not confirm the site is enabled or ready.

## Content and inquiries

The English homepage and main navigation follow technology areas: battery materials and electrodes, battery cells, fuel cells and electrolyzers, electrocatalysis, advanced materials and synthesis, and lab supplies and equipment. Each area brings together relevant products and services; standard/custom is not the primary hierarchy. `src/technologies.js` maps all products and services into these areas. `src/catalog.js` contains 25 quote-only products and nine services from the owner's supplied catalog brief. `src/pages.js` renders the homepage, searchable/filterable product directory, individual product pages, service directory and service detail pages. Existing fuel-cell, electrolyzer, electrocatalysis and advanced-material information remains linked from the homepage and product directory.

Routes use hashes (`#/technologies`, `#/technologies/{id}`, `#/products`, `#/products/{id}`, `#/services`, `#/services/{id}`), so direct links and refreshes work on GitHub Pages without server rewrites. Product filters and search are encoded in the route, preserving them when returning from a detail page. Unknown routes show a recovery page.

All items require quotation; the catalog does not promise stock. Missing model specifications explicitly invite contact. No formal specification files or authorized product photos were supplied, so there are no datasheet download links and every detail image is labeled as a neutral illustration. See `docs/catalog-readiness.md` for the complete specification, image and confirmation checklist, and `docs/content-sources.md` for provenance. No raw private order data is stored in this public repository.

The inquiry dialog includes the selected product/service and model, prepares a text brief locally and opens a `mailto:` draft to `kiki.li@jaford.com`. The user reviews and sends it in their own email application. Copy and download remain available. It does not automatically submit inquiries, send email or claim delivery. No personal data is persisted by the site.

## Cloud tasks

Use the existing `/workspace/Jaford-Website` checkout; cloud tasks are already isolated, so do not create another worktree unless explicitly requested. Dependencies and `dist/` may persist in an environment snapshot; running processes do not. Start the dev server with `npm run dev -- --port 5173 --strictPort` and check that an HTTP request returns the JAFORD page. Use the browser tests above to verify interaction behavior.

## Product modules

Products appear as individual clickable modules in the full catalog and technology-area pages. Each module shows a labeled representative product illustration, product name, short description and model options, and opens the existing specification/inquiry detail page. Product modules retain search/technology context; related services remain listed within their technology area. The requested reference electrohy.com was blocked by the environment network proxy during this iteration, so this layout implements the owner's module-to-spec interaction brief without claiming to reproduce the inaccessible reference.
