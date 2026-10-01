import { test, expect } from "@playwright/test";
import { cases } from "../src/cases.js";

test("case summaries open independently addressable cases and retain inquiry context", async ({ page }) => {
  await page.goto("/#/cases");
  await page.locator('.completed-project-list a[href="#/cases/resin-batch-11kg"]').first().click();
  for (const item of cases) {
    await page.goto(`/#/cases/${item.id}`);
    await page.reload();
    await expect(page.locator("h1")).toHaveText(item.title);
    await expect(page.locator(".case-facts")).toContainText(item.deliverable);
    await expect(page.getByRole("heading", {name: "Delivery & outcome", exact: true})).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize().width);
    await page.getByRole("button", { name: "Discuss a similar project" }).click();
    await expect(page.getByLabel("Product / service and selected option")).toHaveValue(item.title);
    await page.getByRole("button", { name: "Close inquiry", exact: true }).click();
  }
  await page.getByRole("link", {name: "All case studies", exact:true}).click();
  await expect(page.locator(".case-summary")).toHaveCount(2);
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
