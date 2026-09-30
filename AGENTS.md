# JAFORD website iteration

The owner works from mobile Codex Cloud sessions and wants to describe website changes, then open the same working preview URL to review them. Keep this workflow simple. Use the existing GitHub repository and GitHub Pages; do not introduce another hosting service, account, or paid dependency without a concrete need.

## Start a task

- Use the existing checkout. Cloud tasks are isolated; do not create a Git worktree unless explicitly requested.
- Inspect the working tree and fetch `origin/main` before editing. New sessions or saved cloud snapshots may be behind the repository. Bring a clean, behind checkout up to date using a fast-forward; preserve uncommitted changes and local commits. Never force-push or discard work to synchronize.
- Read `README.md`. Use Node.js 24 and `npm ci` if dependencies are absent.

## Make and deliver changes

- Preserve the scientific, minimal visual direction and the provided business scope. Do not invent products, certifications, clients, facilities, or performance claims.
- The inquiry form currently prepares a local brief. Do not claim that it sends inquiries until a real receiving channel is implemented and verified.
- For website changes, run `npm run lint`, `npm run build`, and the relevant browser checks. The complete suite is `npm test`; in the prepared cloud environment use `CHROMIUM_PATH=/usr/bin/chromium npm test`.
- The owner's normal iteration workflow includes publishing requested website changes to the preview. Unless the user asks for a draft, local-only work, or a read-only review, commit the completed changes and push to `main` with a normal, non-force push. Preserve concurrent changes. Do not push to an unrelated repository or change visibility, domain, account, or billing settings as part of routine iteration.
- `.github/workflows/preview.yml` runs the checks and deploys changes on `main` to GitHub Pages after initial Pages activation. The repository's Pages source must be **GitHub Actions** for this workflow.
- The intended stable address is `https://joeyustc.github.io/Jaford-Website/`. Verify it responds with the actual homepage, that assets and representative interactions work, and that `version.json` reports the intended source revision. Do not call deployment successful merely because a push or build succeeded. Report access or deployment blockers precisely.
- Give the user the verified clickable website URL. Screenshots are supplemental; they do not satisfy the preview requirement. Do not present localhost or workspace paths as a user-accessible website.

## Initial activation status

At the time these instructions were written, the repository remained private and Pages was not enabled. Its current plan requires a public repository for Pages. The owner has authorized using a public repository for this preview. The current Codex GitHub integration returned HTTP 403 for both visibility changes and Pages configuration, so the repository owner must apply these initial settings in GitHub. Check actual state when resuming; do not treat this note or a configured URL as evidence that the site is live.
