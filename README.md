# JAFORD website

Optional private homepage analytics is prepared under `analytics/`, with an unlisted `#/owner-insights` entry. Collection is **off** until a Cloudflare Worker/D1 backend, exact-owner email Access policy and visitor disclosure are configured and verified. GitHub Pages never stores or serves visit/IP data. See [analytics/README.md](analytics/README.md) for activation, limitations and retention. No analytics account is connected yet.

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

The build uses relative asset paths (`./`) and outputs to ignored `.preview-dist/`. The same artifact works at the custom-domain root and the original `/Jaford-Website/` path; hash-based subpages keep the document path stable. The publish script pushes only those static assets to `gh-pages` without force-pushing, switching branches, or changing the working index. It uses existing Git authentication. No credentials or source files are included in the deployed build.

The owner is binding `jaford.com` through GitHub Pages Settings and Aliyun DNS. Once DNS and the HTTPS certificate are ready, verify `https://jaford.com/`, representative hash routes and `https://jaford.com/version.json`. The root DNS uses GitHub Pages' four documented A addresses; `www` is a CNAME to `joeyustc.github.io`. Preserve all mail records and the old hosting project for rollback. Do not claim the domain is live from a settings screenshot or a successful deployment alone. The preview build currently retains its existing `noindex, nofollow` policy.

For this manual fallback only, GitHub Pages would use **Deploy from a branch → gh-pages → / (root)**. The automatic workflow above uses **GitHub Actions** instead; do not switch the Pages source during routine iterations. Pushing the branch alone does not confirm the site is enabled or ready.

## Content and inquiries

The homepage and navigation follow six technology areas: Custom R&D, Battery Technology, Fuel Cells & Electrolyzers, Functional Materials, Testing & Characterization, and Equipment & Supplies. `src/technologies.js` defines each complete directory and its homepage selections. `src/catalog.js` contains 27 listed product families and 27 service views (13 broad services plus 14 focused functional-material/testing views). `src/pages.js` renders these shared records into the homepage, directories and detail pages.

Routes use hashes (`#/technologies/{id}`, `#/products`, `#/products/{id}`, `#/services`, `#/services/{id}`), so direct links and refreshes work on GitHub Pages without server rewrites. Product filters and search are encoded in the route, preserving them when returning from a detail page. Unknown routes show a recovery page.

All items require quotation; the catalog does not promise stock. Public model/type lists and Spec actions are temporarily paused. Their underlying data and table renderer are preserved for restoration when detailed data is available. Tables use confirmed catalog facts, exactly identified manufacturer models and standard material identities; unmatched analog formulations and performance values are excluded. Existing PDF URLs are retained with the same factual tables; there are no PDF controls in the dialog. Missing approved supplier specifications remain tracked internally. Detail images remain representative illustrations. See `docs/catalog-readiness.md` for the complete specification, image and confirmation checklist, and `docs/content-sources.md` for provenance. No raw private order data is stored in this public repository.

The shared Contact Us form prepares a text brief locally and opens a `mailto:` draft to `kiki.li@jaford.com`. The user reviews and sends it in their own email application. Copy and download remain available. It does not automatically submit inquiries, send email or claim delivery. No personal data is persisted by the site.

## Cloud tasks

Use the existing `/workspace/Jaford-Website` checkout; cloud tasks are already isolated, so do not create another worktree unless explicitly requested. Dependencies and `dist/` may persist in an environment snapshot; running processes do not. Start the dev server with `npm run dev -- --port 5173 --strictPort` and check that an HTTP request returns the JAFORD page. Use the browser tests above to verify interaction behavior.

## Product modules

Products appear as individual clickable modules in the full catalog and technology-area pages. Each module shows a labeled representative product illustration, product name, short description and model options, and opens the existing specification/inquiry detail page. Product modules retain search/technology context; related services remain listed within their technology area. The requested reference electrohy.com was blocked by the environment network proxy during this iteration, so this layout implements the owner's module-to-spec interaction brief without claiming to reproduce the inaccessible reference.

The homepage prioritizes PC browsing, with six image-led entries per sector from 1280px and fewer columns on smaller viewports. It opens with the owner-approved slogan and owner-requested statistics, followed by the scrollable Innovation in practice stories and six technology sectors. Contact appears at the bottom and uses the local email-draft workflow.

Product artwork uses checked-in WebP derivatives at the original dimensions and atlas coordinates, with lazy loading in directories and asynchronous decoding. Source PNGs and their public URLs remain intact. Regenerate derivatives with `bash scripts/optimize-images.sh` (maintenance tool: ImageMagick with WebP support; not needed by CI). The initial optimization reduced the homepage's full image set from 24,690,956 to 1,717,543 bytes (93% less). The homepage browser check enforces a 2 MiB total unique-image budget as illustrations change. These are asset sizes, not the first-screen payload or a measured live load time.

Each sector's Browse all opens its internal directory: Custom R&D 13, Battery Technology 9, Fuel Cells & Electrolyzers 8, Functional Materials 6, Testing & Characterization 10, Equipment & Supplies 10. Featured items are selected from those same records using `featuredItemsForArea`; links, images and descriptions stay consistent. Functional-material families and testing methods have focused service pages, while earlier broad-service URLs remain valid. These focused views describe project-assessed partner capabilities and do not introduce new stock models, facilities or measured results.

The standalone technology overview is removed. Old `#/technologies` links redirect to home; category and detail routes remain available directly.

Case studies are at `#/cases` with individual `#/cases/{id}` routes. The homepage opens with all published project stories in a horizontal, manually scrollable collection, before Custom R&D. Project references preserve internal business numbers with PBT/PFM prefixes and no hyphen; unmapped cases remain accessible through existing detail URLs but stay out of public listings until numbered.

Fuel Cells & Electrolyzers now uses eight family-level entries from `src/fuel-cell-products.js`, shared by the homepage, category directory and product detail pages. The total directory has 34 entries (26 original products plus eight families). Family-level entries do not imply model-specific specifications; missing specs and options stay hidden. Homepage links and the category Browse all remain inside this site.

Battery Technology and Functional Materials begin with a horizontally browsable Innovation in practice collection, filtered to PBT and PFM respectively. These use the same published case records as the homepage, before the full product/capability directory. Testing and equipment pages start directly with their offerings; redundant introductory copy and the testing development heading are omitted.

Contact Us in the header and footer opens `#/contact`, which reuses the unchanged homepage form and local email-draft workflow. The footer retains only copyright/location, Contact Us and Back to Top. Homepage figures (9 countries/regions, 20 research teams, 88 delivered projects) count up in one second, with final values shown immediately for reduced motion.

## Specification maintenance

`src/spec-data.js` records researched options, source URLs and reference facts. `src/specifications.js` derives the complete model/type registry, and `src/spec-fields.js` selects the verified public table fields. Regenerate checked-in `public/specs/*.pdf` using `python scripts/generate-specs.py` with Python ReportLab installed. Normal CI builds serve these files without Python. Source URLs and matching limits are documented in `docs/spec-audit.md` and `docs/spec-sources.md`; dialogs contain no external links or long reference descriptions. Old model detail URLs resolve to their family pages. See `docs/spec-sources.md`.

## Contact presence

`src/contact-presence.js` maintains alphabetized contact/enquiry regions and social channel identities. The homepage countries/regions statistic opens a small pointer/keyboard/touch panel; extra enquiry destinations do not imply historical project coverage. Both the independent Contact Us page and the homepage show the same compact row of five logos after their contact forms: Twitter, LinkedIn, Taobao, WeChat Official Account and Douyin. No visible channel labels, heading or placeholder copy; accessible names and native hover titles identify each logo. No account links or QR code have been supplied, so these identities remain non-interactive pending real destinations. SVG paths are bundled locally with no external requests; see `docs/social-icons.md` for provenance. The shared form and minimal footer are unchanged. Do not add Xiaohongshu or Amazon.

Custom 3D Printing for R&D is first in Custom R&D on the homepage and full directory, with a New service label and small static flame, a shared lithium-ion research-cell illustration and existing `#/services/custom-3d-printing` route. The image shows printed research-cell casings, a separate conventional electrode/separator stack, an assembled test cell and casing printing in the background. Its announcement, Custom Parts for Your Next Experiment, introduces project-assessed cell housings, sealing features and test interfaces for lithium-ion battery experiments. It illustrates a design direction, not a validated electrochemical device or qualified electrolyte-compatible material; printing active electrodes or a complete battery is not claimed as an established service. See `docs/3d-printing-research.md` for primary research and the selected concept. Material, dimensions, operating conditions and feasibility are assessed per part; no fixed tolerance or lead time is promised. The homepage has six cards per sector except Equipment & Supplies, which has five after removing reducing fittings (35 cards total). The supplier guide is private reference material stored outside this repository, never a website download or public source document.

Molecule and Polymer Synthesis combines the former polymer/resin and small-molecule/ligand entries in the second Custom R&D card and full service index. The description covers organic synthesis, ligands, intermediates, monomers, resins and functional polymers, with route development, polymerization, purification and characterization assessed per project. The existing `polymer-resin-synthesis` route is the shared destination; `small-molecule-synthesis` remains a working alias. `legacyServices` retains both original records and the specification registry retains all existing PDF identities. Public model/Spec presentation remains paused.

All routes now use the same `.container` width as the homepage: up to 1440px with 48px side margins on desktop, 28px on tablet and 20px on phones. The former case-carousel-dependent width switch and case-page container cap are removed. Root scrollbar space is reserved so moving between short and long pages does not shift the layout. Text line-length limits remain inside the common page container.

The current specification audit covers all 95 options. QMS029D and XYSS-DGHYKJ118 were searched by full code, variants and supplier clues, but no reliable exact-model formulation/performance sheet was found. Their tables retain only confirmed model/application; no generic LiPF6/NaPF6 recipe or impurity limit is substituted. NFM-compatible is an application option, not a universal formulation.

Model/type and Spec presentation is currently paused at the owner's request pending detailed data. `showModelSpecifications` in `src/pages.js` controls the detail sections and catalog model previews; data, audits, existing PDFs and legacy routes remain intact for later restoration. The homepage region list has nine entries after adding Taiwan and United Arab Emirates, retaining alphabetical order and the statistic of nine.

Functional Materials now lists only MOFs, COFs, Functional polymers, Ligands, Advanced materials and Advanced membranes, in that order on the homepage and category page. Advanced materials reuses the established functional-material development service. Resins and Functional intermediates are no longer separate listings; their old service URLs resolve to Functional polymers and Molecule and Polymer Synthesis respectively. Reducing fittings is removed from homepage and product listings; its old detail URL and PDF remain available for compatibility. Glass Fiber Filter uses a generic public title without the model code. Underlying model/specification data remains paused and retained.
