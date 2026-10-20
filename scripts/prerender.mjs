import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { publicRoutes, compatibilityRoutes, resolveRoute } from "../src/routes.js";
import { renderPage } from "../src/render-page.js";
import { seoTags, canonicalURL, origin } from "../src/seo.js";
import { technologies } from "../src/technologies.js";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = resolve(root, process.argv[2] || "dist");
if (![join(root, "dist"), join(root, ".preview-dist")].includes(output)) throw new Error("Unexpected output directory.");
const shell = readFileSync(join(output, "index.html"), "utf8");
const navigation = technologies.map(t => `<a href="/technologies/${t.id}/">${t.nav.replace(/&/g,"&amp;")}</a>`).join("") + '<a href="/contact/">Contact Us</a>';
const revision = execFileSync("git", ["rev-parse", "HEAD"], {cwd:root,encoding:"utf8"}).trim();

function documentFor(route, notFound = false) {
  const page = resolveRoute(route);
  const depth = route.split("/").filter(Boolean).length;
  const prefix = notFound ? "/" : depth ? "../".repeat(depth) : "./";
  let html = shell
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/\s*<meta\s+name="description"[\s\S]*?>/, "")
    .replace("</head>", () => seoTags(page) + "\n</head>")
    .replace('<main id="main" tabindex="-1"></main>', () => `<main id="main" tabindex="-1">${renderPage(page)}</main>`)
    .replace('<nav id="navigation" aria-label="Main navigation"></nav>', () => `<nav id="navigation" aria-label="Main navigation">${navigation}</nav>`)
    .replace('href="#/"', 'href="/"').replace('href="#/contact"','href="/contact/"')
    .replace('<span id="year"></span>', `<span id="year">${new Date().getFullYear()}</span>`);
  // The existing noscript notice explains email contact. Keep JS-only forms
  // inert until the client replaces this markup; no GET submission of enquiry data.
  html = html.replace(/<form id="(home-contact-form|catalog-filters)"/g, '<form inert id="$1"');
  // Real relative URLs keep both deep documents and the original Pages mount
  // working without an HTML base element (which would break in-page anchors).
  html = html.replace(/\b(href|src)="(?:\.\/|\/)(?!\/)([^"\s]*)"/g, (_match,attribute,path) => `${attribute}="${prefix}${path}"`);
  return html;
}

for (const route of new Set([...publicRoutes, ...compatibilityRoutes, "/owner-insights"])) {
  const destination = join(output, route.slice(1), "index.html");
  mkdirSync(dirname(destination), {recursive:true});
  writeFileSync(destination, documentFor(route));
}
writeFileSync(join(output,"404.html"), documentFor("/not-found",true));
writeFileSync(join(output,"sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${publicRoutes.map(route=>`  <url><loc>${canonicalURL(resolveRoute(route))}</loc></url>`).join("\n")}\n</urlset>\n`);
// The wildcard policy includes Googlebot, Bingbot and OAI-SearchBot. Private
// visit records live on a separate authenticated backend, never in this output.
writeFileSync(join(output,"robots.txt"), `User-agent: *\nAllow: /\nDisallow: /owner-insights/\n\nSitemap: ${origin}/sitemap.xml\n`);
const pages = Object.fromEntries(publicRoutes.map(route => {
  const page = resolveRoute(route);
  const digest = createHash("sha256").update(renderPage(page) + seoTags(page) + navigation).digest("hex");
  return [canonicalURL(page), digest];
}));
writeFileSync(join(output,"seo-manifest.json"), JSON.stringify({schemaVersion:1,revision,pages})+"\n");
writeFileSync(join(output,".nojekyll"), "");
writeFileSync(join(output,"version.json"), JSON.stringify({revision,builtAt:new Date().toISOString()})+"\n");
console.log(`Generated ${publicRoutes.length} indexable pages, compatibility pages, sitemap, robots.txt and a noindex 404/private shell.`);
