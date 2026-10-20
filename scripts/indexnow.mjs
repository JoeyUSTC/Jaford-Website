import { readFileSync, writeFileSync, existsSync, appendFileSync } from "node:fs";
import { origin } from "../src/seo.js";
import { categorySlugs } from "../src/url-paths.js";

const mode = process.argv[2];
const baseline = ".seo-indexnow-previous.json";
const request = (url, options = {}) => fetch(url, {signal:AbortSignal.timeout(20000),...options});
function pagesFrom(manifest) {
  if (manifest?.schemaVersion !== 1 || !manifest.pages || Array.isArray(manifest.pages) || Object.keys(manifest.pages).length > 10000) throw new Error("Invalid SEO manifest.");
  for (const [url,digest] of Object.entries(manifest.pages)) {
    const flatCategory = categorySlugs.some(slug => url === `${origin}/${slug}/`);
    if ((!flatCategory && !/^https:\/\/jaford\.com\/(?:|(?:contact|products|services|cases)\/|(?:technologies|products|services|cases)\/[a-z0-9-]+\/)$/.test(url)) || !/^[a-f0-9]{64}$/.test(digest)) throw new Error("Unexpected manifest URL/digest.");
  }
  return manifest.pages;
}
async function prepare() {
  let pages = {};
  try {
    const response = await request(`${origin}/seo-manifest.json`);
    if (response.ok) pages = pagesFrom(await response.json());
    else console.log(`Previous SEO manifest unavailable (HTTP ${response.status}); next submission will include current public URLs.`);
  } catch {
    console.log("Previous SEO manifest could not be read; next submission will include current public URLs.");
  }
  writeFileSync(baseline, JSON.stringify({schemaVersion:1,pages}));
  console.log(`Prepared comparison with ${Object.keys(pages).length} previously published URLs.`);
}
async function submit() {
  const output = process.env.SEO_BUILD_DIR || ".preview-dist";
  if (!["dist", ".preview-dist"].includes(output)) throw new Error("Unexpected build directory.");
  const manifest = JSON.parse(readFileSync(`${output}/seo-manifest.json`,"utf8"));
  const current = pagesFrom(manifest);
  const previous = existsSync(baseline) ? pagesFrom(JSON.parse(readFileSync(baseline,"utf8"))) : {};
  const changed = Object.keys(current).filter(url=>current[url] !== previous[url]);
  const removed = Object.keys(previous).filter(url=>!Object.hasOwn(current,url));
  const urlList = [...changed, ...removed];
  if (mode === "dry-run") {
    console.log(`IndexNow dry run: ${changed.length} new/changed, ${removed.length} removed public URLs. No notification sent.`);
    return;
  }
  if (!urlList.length) { console.log("No public content changes; no IndexNow notification needed."); return; }
  // Do not notify an engine about code that has not reached the public host.
  const deployed = await request(`${origin}/version.json?v=${manifest.revision}`);
  if (!deployed.ok || (await deployed.json()).revision !== manifest.revision) throw new Error("Cannot confirm this revision on the public domain; IndexNow notification not sent.");
  const key = readFileSync(`${output}/indexnow-key.txt`,"utf8").trim();
  if (!/^[a-f0-9]{32}$/.test(key)) throw new Error("Invalid public IndexNow ownership key.");
  const keyLocation = `${origin}/indexnow-key.txt`;
  const keyResponse = await request(keyLocation);
  if (!keyResponse.ok || (await keyResponse.text()).trim() !== key) throw new Error("Public IndexNow ownership file is not ready; notification not sent.");
  const response = await request("https://api.indexnow.org/indexnow", {
    method:"POST",headers:{"Content-Type":"application/json; charset=utf-8"},
    body:JSON.stringify({host:"jaford.com",key,keyLocation,urlList}),
  });
  if (![200,202].includes(response.status)) throw new Error(`IndexNow HTTP ${response.status}; notification not confirmed.`);
  const message = `IndexNow received ${urlList.length} URLs (HTTP ${response.status}${response.status===202 ? "; ownership validation pending" : ""}). Receipt does not establish indexing or ranking, and is not a Google Search Console submission.`;
  console.log(message);
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `\n${message}\n`);
}
try {
  if (mode === "prepare") await prepare();
  else if (["submit", "dry-run"].includes(mode)) await submit();
  else throw new Error("Use prepare, submit or dry-run.");
} catch (error) {
  console.error(`::warning::${error.message}`);
  process.exitCode = 1;
}
