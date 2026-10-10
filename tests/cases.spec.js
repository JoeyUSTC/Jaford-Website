import { test, expect } from "@playwright/test";
import { cases } from "../src/cases.js";

test("case stories retain their URLs and show the narrative without promotional panels", async ({ page }) => {
  await page.goto("/#/cases");
  await page.locator('.completed-project-list a[href="#/cases/resin-batch-11kg"]').first().click();
  for (const item of cases) {
    await page.goto(`/#/cases/${item.id}`);
    await page.reload();
    await expect(page.locator("h1")).toHaveText(item.title);
    await expect(page.locator(".case-narrative")).toContainText(item.outcome);
    if (item.projectCode) await expect(page.locator(".case-study .eyebrow")).toContainText(item.projectCode);
    await expect(page.locator(".case-study aside, .case-study button, .case-study a[href^=\"#/services/\"]")).toHaveCount(0);
    await expect(page.getByText("Project at a glance", {exact: true})).toHaveCount(0);
    await expect(page.getByRole("heading", {name: "What this enabled", exact: true})).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize().width);
  }
  await page.getByRole("link", {name: "All case studies", exact:true}).click();
  await expect(page.locator(".case-summary")).toHaveCount(cases.length);
  await page.goto("/#/cases/missing");
  await expect(page.locator("h1")).toHaveText("Page not found");
});

test("product category navigation filters the quote-only modules", async ({page}) => {
  await page.goto("/#/products");
  await page.getByRole("navigation", {name:"Product categories"}).getByRole("link", {name:/Binders & electrolytes/}).click();
  await expect(page.locator(".product-module")).toHaveCount(5);
  await expect(page.getByLabel("Category",{exact:true})).toHaveValue("binders-electrolytes");
  await expect(page.locator('.catalog-sidebar a[aria-current="page"]')).toContainText("Binders & electrolytes");
  await expect(page.locator(".quote-label")).toHaveCount(0);
});


test("homepage case collection scrolls and opens the new validation stories", async ({page}) => {
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto("/");
  const track=page.locator("#case-track");
  await expect(track.locator("article")).toHaveCount(4);
  await expect(page.locator("main > section").nth(1)).toHaveAttribute("id", "project-cases");
  await expect(track.locator(".project-code")).toHaveText(["PBT-001", "PBT-002", "PBT-003", "PBT-004"]);
  await expect(page.getByRole("button",{name:"Previous cases",exact:true})).toBeDisabled();
  await page.getByRole("button",{name:"Next cases",exact:true}).click();
  await expect.poll(()=>track.evaluate(el=>el.scrollLeft)).toBeGreaterThan(50);
  await page.getByRole("button",{name:"Previous cases",exact:true}).click();
  await expect.poll(()=>track.evaluate(el=>el.scrollLeft)).toBeLessThan(3);
  await track.getByRole("link",{name:cases[0].title,exact:true}).click();
  await expect(page.locator("h1")).toHaveText(cases[0].title);
  await page.goto("/#/cases/sodium-ion-pouch-validation");
  await expect(page.locator(".case-chapter").last()).toContainText("differed from the customer’s initial expectations");
  await page.goto("/#/cases");
  await expect(page.locator(".case-summary")).toHaveCount(6);
  await expect(page.locator("main")).not.toContainText("400 Wh/kg");
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize().width);
});
