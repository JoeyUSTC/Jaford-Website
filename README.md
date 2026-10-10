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

The homepage and navigation follow six technology areas: Custom R&D, Battery Technology, Fuel Cells & Electrolyzers, Functional Materials, Testing & Characterization, and Equipment & Supplies. `src/technologies.js` defines each complete directory and its six homepage selections. `src/catalog.js` contains 34 product entries and 29 service views (13 broad services plus 16 focused functional-material/testing views). `src/pages.js` renders these shared records into the homepage, directories and detail pages.

Routes use hashes (`#/technologies/{id}`, `#/products`, `#/products/{id}`, `#/services`, `#/services/{id}`), so direct links and refreshes work on GitHub Pages without server rewrites. Product filters and search are encoded in the route, preserving them when returning from a detail page. Unknown routes show a recovery page.

All items require quotation; the catalog does not promise stock. Missing model specifications are omitted from public pages and tracked internally. No formal specification files or authorized product photos were supplied, so there are no datasheet download links and every detail image is labeled as a neutral illustration. See `docs/catalog-readiness.md` for the complete specification, image and confirmation checklist, and `docs/content-sources.md` for provenance. No raw private order data is stored in this public repository.

The inquiry dialog includes the selected product/service and model, prepares a text brief locally and opens a `mailto:` draft to `kiki.li@jaford.com`. The user reviews and sends it in their own email application. Copy and download remain available. It does not automatically submit inquiries, send email or claim delivery. No personal data is persisted by the site.

## Cloud tasks

Use the existing `/workspace/Jaford-Website` checkout; cloud tasks are already isolated, so do not create another worktree unless explicitly requested. Dependencies and `dist/` may persist in an environment snapshot; running processes do not. Start the dev server with `npm run dev -- --port 5173 --strictPort` and check that an HTTP request returns the JAFORD page. Use the browser tests above to verify interaction behavior.

## Product modules

Products appear as individual clickable modules in the full catalog and technology-area pages. Each module shows a labeled representative product illustration, product name, short description and model options, and opens the existing specification/inquiry detail page. Product modules retain search/technology context; related services remain listed within their technology area. The requested reference electrohy.com was blocked by the environment network proxy during this iteration, so this layout implements the owner's module-to-spec interaction brief without claiming to reproduce the inaccessible reference.

The homepage prioritizes PC browsing, with six image-led entries per sector from 1280px and fewer columns on smaller viewports. It opens with the owner-approved slogan and explicitly illustrative statistics, followed by the scrollable Innovation in practice stories and six technology sectors. Contact appears at the bottom and uses the local email-draft workflow.

Every sector's Browse all opens a larger internal directory: Custom R&D 13, Battery Technology 14, Fuel Cells & Electrolyzers 8, Functional Materials 7, Testing & Characterization 10, Equipment & Supplies 12. Featured items are selected from those same records using `featuredItemsForArea`; links, images and descriptions stay consistent. Functional-material families and testing methods have focused service pages, while earlier broad-service URLs remain valid. These focused views describe project-assessed partner capabilities and do not introduce new stock models, facilities or measured results.

The standalone technology overview is removed. Old `#/technologies` links redirect to home; category and detail routes remain available directly.

Case studies are at `#/cases` with individual `#/cases/{id}` routes. The homepage opens with all published project stories in a horizontal, manually scrollable collection, before Custom R&D. Project references preserve internal business numbers with PBT/PFM prefixes and no hyphen; unmapped cases remain accessible through existing detail URLs but stay out of public listings until numbered.

Fuel Cells & Electrolyzers now uses eight family-level entries from `src/fuel-cell-products.js`, shared by the homepage, category directory and product detail pages. The total directory has 34 entries (26 original products plus eight families). Family-level entries do not imply model-specific specifications; missing specs and options stay hidden. Homepage links and the category Browse all remain inside this site.

Battery Technology and Functional Materials begin with a horizontally browsable Innovation in practice collection, filtered to PBT and PFM respectively. These use the same published case records as the homepage, before the full product/capability directory. Testing and equipment pages start directly with their offerings; redundant introductory copy and the testing development heading are omitted.
