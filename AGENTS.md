# JAFORD website iteration

The owner works from mobile Codex Cloud sessions and wants to describe website changes, then open the same working preview URL to review them. Keep this workflow simple. Use the existing GitHub repository and GitHub Pages; do not introduce another hosting service, account, or paid dependency without a concrete need.

## Start a task

- Use the existing checkout. Cloud tasks are isolated; do not create a Git worktree unless explicitly requested.
- Inspect the working tree and fetch `origin/main` before editing. New sessions or saved cloud snapshots may be behind the repository. Bring a clean, behind checkout up to date using a fast-forward; preserve uncommitted changes and local commits. Never force-push or discard work to synchronize.
- Read `README.md`. Use Node.js 24 and `npm ci` if dependencies are absent.

## Make and deliver changes

- Use only the owner-supplied logo in `public/brand/jaford-brand.png` with the current partner headline; the owner requested a new short scale-up headline for discussion. Do not invent alternative logos, favicons or slogans. Remove the old “From Innovation…” lead. The primary message is scaling and validating laboratory innovations. Keep engagement models and case summaries off the homepage; never publish client-specific workbook responses.
- All visitor-facing website content must be English only, including captions, specifications, navigation, accessibility labels and inquiry messages. Do not add bilingual Chinese labels.

- Prioritize desktop usability and visual layout when desktop/mobile design tradeoffs arise. Homepage products should read as a horizontal collection on wide PC screens, with responsive readable layouts on mobile; avoid making desktop inherit narrow mobile composition.
- The primary audience is early-stage startups and research teams. Keep the site practical and technical: plain sans-serif typography, visible product information, a warm ivory background (#f5f1e9) with coordinated warm surfaces instead of bright white, restrained color, simple navigation and concise capability descriptions. The owner explicitly rejected decorative material/molecular illustrations, orbit graphics, oversized italic headings, numbered displays, large dark sections and marketing slogans. Do not reintroduce these in routine iterations. Preserve the provided business scope; do not invent products, certifications, clients, facilities, or performance claims.
- Primary navigation order is Custom R&D, Battery Technology, Fuel Cells & Electrolyzers, Functional Materials, Testing & Characterization, Equipment & Supplies. Put Custom R&D first on the homepage; battery products combine Li/Na materials, electrodes and cells. Preserve legacy category links through aliases. Each area groups relevant products and development/processing services together; preserve all existing detail URLs. `src/technologies.js` defines this hierarchy. Full product/service indexes are secondary reference tools.
- Product detail pages focus on introduction, imagery and known specifications. No related-area section or generic contact section below products. Use a restrained text inquiry action. Resin-derived and biomass-derived hard carbon are separate products, not a dropdown choice.
- Product listings use individual clickable modules leading to specification/detail pages; keep technology navigation as the primary hierarchy.
- The current catalog is owner-curated: 26 quote-only products and thirteen partner-coordinated services in `src/catalog.js`. Read `docs/catalog-readiness.md` before expanding specs. Never infer stock, MOQ, measured performance, facility ownership or completed projects from historical procurement or development requests. Keep mAh/cm² and mg/cm² distinct. Show only confirmed product specifications and options. Omit missing fields and empty tables/selectors; never use contact-for-specification or to-be-confirmed placeholder text. Keep missing fields in the internal readiness list. Keep image provenance in internal documentation; homepage/catalog thumbnails have no visible illustration caption, and detail pages retain a representative-illustration note; add datasheet download links only for supplied, authorized files. Route pages use hashes for GitHub Pages compatibility.
- The inquiry form prepares a local brief and opens a user-reviewed email draft to the verified public contact kiki.li@jaford.com. It does not send messages automatically or confirm delivery. Keep the copy/download fallback. Content provenance is in docs/content-sources.md.
- For website changes, run `npm run lint`, `npm run build`, and the relevant browser checks. The complete suite is `npm test`; in the prepared cloud environment use `CHROMIUM_PATH=/usr/bin/chromium npm test`.
- The owner's normal iteration workflow includes publishing requested website changes to the preview. Unless the user asks for a draft, local-only work, or a read-only review, commit the completed changes and push to `main` with a normal, non-force push. Preserve concurrent changes. Do not push to an unrelated repository or change visibility, domain, account, or billing settings as part of routine iteration.
- `.github/workflows/preview.yml` runs the checks and deploys changes on `main` to GitHub Pages after initial Pages activation. The repository's Pages source must be **GitHub Actions** for this workflow.
- The intended stable address is `https://joeyustc.github.io/Jaford-Website/`. Verify it responds with the actual homepage, that assets and representative interactions work, and that `version.json` reports the intended source revision. Do not call deployment successful merely because a push or build succeeded. Report access or deployment blockers precisely.
- Give the user the verified clickable website URL. Screenshots are supplemental; they do not satisfy the preview requirement. Do not present localhost or workspace paths as a user-accessible website.

## Preview hosting

The owner has made this repository public and enabled GitHub Pages with GitHub Actions as the source. Initial account setup is complete; do not ask the owner to repeat it or create another hosting account. New pushes to main trigger the existing workflow. Check workflow completion and the live site's version.json on each delivery; repository settings alone do not establish that the current revision is live.

- Homepage: six six-image rows (Custom R&D, Battery Technology, Fuel Cells & Electrolyzers, Functional Materials, Testing & Characterization, Equipment & Supplies), each with Browse all. Keep copy short and contact actions only at the bottom. Buttons use restrained outlines, never black fills. Family illustrations do not create new catalog models or specifications.

- Homepage headline uses logo blue #3b6ea5 and restrained sizing. Illustrations must show visible materials, not opaque reagent bottles. Equipment appears before supplies, with generic homepage names and actual model data retained on detail pages. Testing is partner-coordinated and project-assessed, not a self-owned facility claim.

- Contact Us on the homepage uses an inline three-field form (name, email, enquiry), Prepare email action and an “or email” fallback; do not reintroduce promotional paragraphs, topic lists or “Work with JAFORD”. No visible “AI-generated illustration” text on pages.

- Custom R&D homepage images depict pilot-scale synthesis and processing equipment, not finished material or cell products. Use representative equipment imagery without claiming JAFORD ownership or universal process availability.

- R&D service detail pages show a title, one concise capability paragraph, representative image and quiet inquiry action. Do not display scope/input/deliverable/acceptance checklists, repeated contact sections or related-area blocks. Keep detailed reference data internally for later discussion.

- No technology-area overview page or “All technology areas” entry. Navigation goes directly to individual categories; old `#/technologies` links redirect to the homepage. Detail breadcrumbs use Home and their specific category.
