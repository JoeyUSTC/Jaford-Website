import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { publicRoutes, compatibilityRoutes, resolveRoute } from "../src/routes.js";
import { renderPage } from "../src/render-page.js";
import { canonicalURL } from "../src/seo.js";
import { categorySlugs, movedPaths } from "../src/url-paths.js";

const output = resolve(process.env.SEO_BUILD_DIR || "dist");
const read = route => readFileSync(resolve(output, route.slice(1), "index.html"),"utf8");
test("every sitemap URL has static original content, one canonical and valid local assets/links", () => {
  const sitemap = readFileSync(resolve(output,"sitemap.xml"),"utf8");
  const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match=>match[1]);
  assert.deepEqual(locations, publicRoutes.map(route=>canonicalURL(resolveRoute(route))));
  assert.equal(new Set(locations).size, publicRoutes.length);
  assert.equal(new Set(publicRoutes).size, publicRoutes.length);
  for (const slug of categorySlugs) {
    assert.ok(locations.includes(`https://jaford.com/${slug}/`));
    assert.ok(!sitemap.includes(`/technologies/${slug}/`));
  }
  const manifest = JSON.parse(readFileSync(resolve(output,"seo-manifest.json"),"utf8"));
  assert.deepEqual(Object.keys(manifest.pages), locations);
  for (const digest of Object.values(manifest.pages)) assert.match(digest,/^[a-f0-9]{64}$/);
  assert.match(readFileSync(resolve(output,"indexnow-key.txt"),"utf8").trim(),/^[a-f0-9]{32}$/);
  for (const route of publicRoutes) {
    const page = resolveRoute(route), html = read(route);
    assert.equal((html.match(/rel="canonical"/g)||[]).length, 1, route);
    assert.ok(html.includes(`rel="canonical" href="${canonicalURL(page)}"`), route);
    assert.match(html, /name="robots" content="index, follow/);
    assert.equal((html.match(/<h1\b/g)||[]).length, 1, route);
    const content = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)[1];
    const text = value => value.replace(/<[^>]*>/g, "").replace(/\s+/g," ").trim();
    assert.equal(text(content), text(renderPage(page)), `Original visible content: ${route}`);
    assert.ok(!html.includes('href="#/'), `Crawlable links: ${route}`);
    const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    assert.ok(graph["@graph"].some(node=>node["@type"]==="WebSite"));
    assert.ok(!/aggregateRating|reviewCount|priceCurrency|sameAs/.test(JSON.stringify(graph)));
    assert.ok(!JSON.stringify(graph).includes('/technologies/'), `Canonical breadcrumbs: ${route}`);
    const current = new URL(route === "/" ? "/" : `${route}/`, "https://jaford.com");
    for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
      if (/^(?:#|mailto:|https?:)/.test(match[1])) continue;
      const target = new URL(match[1].replace(/&amp;/g,"&"), current);
      const local = resolve(output, "." + decodeURIComponent(target.pathname));
      assert.ok(existsSync(local) || existsSync(resolve(local,"index.html")), `${route}: ${match[1]}`);
      assert.ok(local === output || local.startsWith(output + "/"));
    }
  }
});
test("old aliases resolve to their canonical content without publishing retired/private URLs in the sitemap", () => {
  const sitemap = readFileSync(resolve(output,"sitemap.xml"),"utf8");
  for (const route of compatibilityRoutes) {
    const page = resolveRoute(route), html = read(route);
    assert.ok(html.includes(`href="${canonicalURL(page)}"`),route);
    if (route !== page.path || !page.indexable) assert.ok(!sitemap.includes(`https://jaford.com${route}/<`));
    if (!page.indexable) assert.match(html,/name="robots" content="noindex/);
  }
  const privatePage = read("/owner-insights");
  assert.match(privatePage,/data-private-insights content="noindex, nofollow, noarchive"/);
  assert.ok(!sitemap.includes("owner-insights"));
  for (const route of publicRoutes) assert.ok(!read(route).includes('href="/owner-insights'));
  assert.match(readFileSync(resolve(output,"404.html"),"utf8"),/name="robots" content="noindex/);
  const robots = readFileSync(resolve(output,"robots.txt"),"utf8");
  assert.match(robots,/User-agent: \*\nAllow: \/\nDisallow: \/owner-insights\//);
  assert.match(robots,/Sitemap: https:\/\/jaford.com\/sitemap.xml/);
  assert.ok(!/specs|owner-insights/.test(sitemap));
});
test("search variants are noindex; attribution/context variants share a clean canonical", () => {
  assert.equal(resolveRoute('/products/?q=carbon').indexable,false);
  assert.equal(resolveRoute('/products/?category=battery-materials').indexable,false);
  assert.equal(resolveRoute('/products/?utm_source=test').indexable,true);
  assert.equal(canonicalURL(resolveRoute('/products/qms029d?area=battery-technology&utm_source=test')), 'https://jaford.com/products/electrolyte/');
  assert.equal(resolveRoute('/contact/index.html').path,'/contact');
  assert.equal(resolveRoute('/index.html').path,'/');
  assert.equal(resolveRoute('/missing').indexable,false);
});
test("moved URLs retain identity, content, parameters and static redirects",()=>{
  for (const [oldPath,newPath] of Object.entries(movedPaths)) {
    const previous=resolveRoute(oldPath),current=resolveRoute(newPath);
    assert.equal(previous.path,newPath);
    assert.equal(previous.item?.id,current.item?.id);
    assert.equal(previous.area?.id,current.area?.id);
    assert.equal(renderPage(previous),renderPage(current));
    const html=read(oldPath);
    assert.match(html,/<script>location\.replace\(/);
    assert.match(html,/\+ location.search \+ location.hash/);
    assert.match(html,/<noscript><meta http-equiv="refresh" content="0;url=/);
  }
  const battery=resolveRoute('/products/qms029d?area=battery-materials');
  assert.equal(battery.params.has('area'),false);
  assert.equal(battery.area.id,'battery-technology');
  const secondary=resolveRoute('/services/functional-materials-development?area=functional-materials');
  assert.equal(secondary.area.id,'functional-materials');
  assert.equal(secondary.params.get('area'),'functional-materials');
});
