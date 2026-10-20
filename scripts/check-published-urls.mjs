import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { movedPaths } from "../src/url-paths.js";
import { resolveRoute } from "../src/routes.js";
import { canonicalURL, origin } from "../src/seo.js";

// Run after Pages deployment, from a runner that can reach the public domain.
const manifest = JSON.parse(readFileSync(".preview-dist/seo-manifest.json", "utf8"));
const request = url => fetch(url, {signal:AbortSignal.timeout(20000)});
const version = await request(`${origin}/version.json?v=${manifest.revision}`);
assert.equal(version.status, 200, "Published version status");
assert.equal((await version.json()).revision, manifest.revision, "Published source revision");
const paths = [...new Set(["/", "/contact", ...Object.keys(movedPaths), ...Object.values(movedPaths)])];
// Keep concurrency bounded and collect every failure before reporting.
const failures = [];
for (let index = 0; index < paths.length; index += 4) {
  const batch = paths.slice(index, index + 4);
  const results = await Promise.allSettled(batch.map(async path => {
    const url = `${origin}${path === "/" ? "/" : path + "/"}`;
    const response = await request(`${url}?v=${manifest.revision}`);
    assert.equal(response.status, 200, `${url} status`);
    const html = await response.text();
    assert.ok(html.includes(`rel="canonical" href="${canonicalURL(resolveRoute(path))}"`), `${url} canonical`);
    assert.match(html, /<main\b[^>]*>[\s\S]*?<h1\b/, `${url} static content`);
    if (Object.hasOwn(movedPaths, path)) assert.ok(html.includes("location.replace("), `${url} compatibility redirect`);
    console.log(`Verified published URL: ${url}`);
  }));
  results.forEach((result, offset) => {
    if (result.status === "rejected") failures.push(`${batch[offset]}: ${result.reason.message}`);
  });
}
assert.equal(failures.length, 0, failures.join("\n"));
console.log(`Verified deployed revision ${manifest.revision} and ${paths.length} public new/legacy URLs.`);
