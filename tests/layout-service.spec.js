import { test, expect } from "@playwright/test";
import { technologies } from "../src/technologies.js";
import { cases } from "../src/cases.js";

test("every route keeps the homepage content, header and footer width", async ({ page }) => {
  await page.goto("/");
  const home = await page.locator(".scale-intro").boundingBox();
  const routes = [
    ...technologies.map(area => `/technologies/${area.id}`),
    "/contact", "/products", "/services", "/cases",
    `/cases/${cases[0].id}`, "/products/hard-carbon",
    "/services/custom-3d-printing", "/missing-page", "/",
  ];
  for (const route of routes) {
    await page.goto(`/#${route}`);
    await expect(page.locator("h1")).toBeVisible();
    for (const container of await page.locator(".header-inner, main > .container, .site-footer").all()) {
      const box = await container.boundingBox();
      expect(Math.abs(box.x - home.x), `${route}: left edge`).toBeLessThan(1);
      expect(Math.abs(box.width - home.width), `${route}: width`).toBeLessThan(1);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth), route).toBeLessThanOrEqual(page.viewportSize().width);
  }
});

test("new 3D printing service shares its announcement and image across pages", async ({ page }) => {
  await page.goto("/");
  const card = page.locator("#custom-rd .sector-card").first();
  await expect(card.locator("h3")).toHaveText("Custom 3D Printing for R&D");
  await expect(card.locator(".service-badge")).toHaveText("New service");
  await expect(card).toContainText("Custom flow paths and research-cell components for electrochemical R&D.");
  const src = await card.locator("img").getAttribute("src");
  await card.locator("a").click();
  await expect(page.locator("h1")).toHaveText("Custom 3D Printing for R&D");
  await expect(page.locator(".service-introduction")).toHaveText("Custom Parts for Your Next Experiment");
  await expect(page.locator(".detail-description").first()).toContainText("materials research and equipment development");
  await expect(page.locator(".service-story")).toContainText("chemical compatibility, sealing, operating conditions and manufacturing feasibility");
  await expect(page.locator("main img")).toHaveAttribute("src", src);
  expect(await page.locator("main img").evaluate(async img => { await img.decode(); return img.naturalWidth; })).toBeGreaterThan(0);
  await expect(page.locator("main a[href$='.pdf'], main iframe, main embed, main object, main [data-inquiry], main [data-spec-id]")).toHaveCount(0);
  await page.getByRole("navigation", { name: "Breadcrumb" }).getByRole("link", { name: "Custom R&D", exact: true }).click();
  const directoryCard = page.locator(".capability-card").first();
  await expect(directoryCard.locator("h2")).toHaveText("Custom 3D Printing for R&D");
  await expect(directoryCard.locator(".service-badge")).toHaveText("New service");
  await expect(directoryCard.locator("img")).toHaveAttribute("src", src);
});

test("molecule and polymer synthesis has one listing and preserves the former molecule link", async ({ page }) => {
  const name = "Molecule and Polymer Synthesis";
  await page.goto("/");
  const cards = page.locator("#custom-rd .sector-card");
  await expect(cards).toHaveCount(6);
  await expect(cards.nth(1).locator("h3")).toHaveText(name);
  await cards.nth(1).locator("a").click();
  await expect(page.locator("h1")).toHaveText(name);
  await expect(page.locator(".detail-description")).toContainText("small molecules and ligands");
  await expect(page.locator(".detail-description")).toContainText("resins and functional polymers");
  await expect(page.locator(".detail-description")).toContainText("polymerization, purification and characterization");
  await page.goto("/#/services");
  await expect(page.getByRole("link", { name, exact: true })).toHaveCount(1);
  await expect(page.getByRole("link", { name: "Polymer & resin synthesis", exact: true })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Small-molecule & ligand synthesis", exact: true })).toHaveCount(0);
  await page.goto("/#/services/small-molecule-synthesis?area=custom-rd");
  await page.reload();
  await expect(page.locator("h1")).toHaveText(name);
  await page.getByRole("navigation", { name: "Breadcrumb" }).getByRole("link", { name: "Custom R&D", exact: true }).click();
  await expect(page.locator(".capability-card")).toHaveCount(13);
  await expect(page.getByRole("link", { name, exact: true })).toHaveCount(1);
});
