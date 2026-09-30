# JAFORD website

A responsive English homepage for JAFORD's advanced materials and R&D offering. Built with Vite, vanilla JavaScript and CSS. Artwork is local SVG; no third-party fonts or image services are needed.

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

The preview uses the existing repository's GitHub Pages site, independently of the company's domain. It is publicly accessible when enabled, with a `noindex, nofollow` meta tag to discourage search indexing; this is not authentication.

```sh
npm run build:preview
npm run deploy:preview
```

The build uses `/Jaford-Website/` as its base path and outputs to ignored `.preview-dist/`. The publish script pushes only those static assets to `gh-pages` without force-pushing, switching branches, or changing the working index. It uses existing Git authentication. No credentials or source files are included in the deployed build.

In GitHub repository **Settings → Pages**, select **Deploy from a branch**, then **gh-pages** and **/ (root)**. This setting can also be applied with the GitHub Pages API when API access and repository permissions are available. Pushing the branch alone does not confirm the site is enabled or ready; check the Pages build and the resulting URL.

## Content and inquiries

The five product categories in `src/main.js` come from the supplied business brief. The homepage does not claim specific SKUs, certifications, clients or product specifications. Product rows expand and offer a category-specific inquiry.

The inquiry dialog prepares a text brief locally. Users can copy or download it. It **does not submit inquiries or send email**, and says so before and after preparation. Connect an approved receiving address or backend before using it as a live lead collection channel. No personal data is persisted by this page.

There were no existing product pages, application routes or catalog in this repository. Navigation currently targets homepage sections. Future catalog and inquiry integrations can replace these targets without changing the visual system.

## Cloud tasks

Use the existing `/workspace/Jaford-Website` checkout; cloud tasks are already isolated, so do not create another worktree unless explicitly requested. Dependencies and `dist/` may persist in an environment snapshot; running processes do not. Start the dev server with `npm run dev -- --port 5173 --strictPort` and check that an HTTP request returns the JAFORD page. Use the browser tests above to verify interaction behavior.
