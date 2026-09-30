# JAFORD website iteration

The owner works from mobile Codex Cloud sessions and wants to describe website changes, then open the same working preview URL to review them. Keep this workflow simple. Use the existing GitHub repository and GitHub Pages; do not introduce another hosting service, account, or paid dependency without a concrete need.

## Start a task

- Use the existing checkout. Cloud tasks are isolated; do not create a Git worktree unless explicitly requested.
- Inspect the working tree and fetch `origin/main` before editing. New sessions or saved cloud snapshots may be behind the repository. Bring a clean, behind checkout up to date using a fast-forward; preserve uncommitted changes and local commits. Never force-push or discard work to synchronize.
- Read `README.md`. Use Node.js 24 and `npm ci` if dependencies are absent.

## Make and deliver changes

- The primary audience is early-stage startups and research teams. Keep the site practical and technical: plain sans-serif typography, visible product information, restrained color, simple navigation and concise capability descriptions. The owner explicitly rejected decorative material/molecular illustrations, orbit graphics, oversized italic headings, numbered displays, large dark sections and marketing slogans. Do not reintroduce these in routine iterations. Preserve the provided business scope; do not invent products, certifications, clients, facilities, or performance claims.
- The inquiry form prepares a local brief and opens a user-reviewed email draft to the verified public contact kiki.li@jaford.com. It does not send messages automatically or confirm delivery. Keep the copy/download fallback. Content provenance is in docs/content-sources.md.
- For website changes, run `npm run lint`, `npm run build`, and the relevant browser checks. The complete suite is `npm test`; in the prepared cloud environment use `CHROMIUM_PATH=/usr/bin/chromium npm test`.
- The owner's normal iteration workflow includes publishing requested website changes to the preview. Unless the user asks for a draft, local-only work, or a read-only review, commit the completed changes and push to `main` with a normal, non-force push. Preserve concurrent changes. Do not push to an unrelated repository or change visibility, domain, account, or billing settings as part of routine iteration.
- `.github/workflows/preview.yml` runs the checks and deploys changes on `main` to GitHub Pages after initial Pages activation. The repository's Pages source must be **GitHub Actions** for this workflow.
- The intended stable address is `https://joeyustc.github.io/Jaford-Website/`. Verify it responds with the actual homepage, that assets and representative interactions work, and that `version.json` reports the intended source revision. Do not call deployment successful merely because a push or build succeeded. Report access or deployment blockers precisely.
- Give the user the verified clickable website URL. Screenshots are supplemental; they do not satisfy the preview requirement. Do not present localhost or workspace paths as a user-accessible website.

## Preview hosting

The owner has made this repository public and enabled GitHub Pages with GitHub Actions as the source. Initial account setup is complete; do not ask the owner to repeat it or create another hosting account. New pushes to main trigger the existing workflow. Check workflow completion and the live site's version.json on each delivery; repository settings alone do not establish that the current revision is live.
