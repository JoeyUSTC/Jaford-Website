import { test, expect } from "@playwright/test";
import { cases, unnumberedCases } from "../src/cases.js";

test("case stories retain their URLs and show the narrative without promotional panels", async ({ page }) => {
  await page.goto("/#/cases");
  await page.locator('.completed-project-list a').first().click();
  for (const item of cases) {
    await page.goto(`/#/cases/${item.id}`);
    await page.reload();
    await expect(page.locator("h1")).toHaveText(item.title);
    await expect(page.locator(".case-narrative")).toHaveText(item.story);
    if (item.projectCode) await expect(page.locator(".case-study .project-code")).toContainText(item.projectCode);
    await expect(page.locator(".case-study aside, .case-study button, .case-study a[href^=\"#/services/\"]")).toHaveCount(0);
    await expect(page.getByText("Project at a glance", {exact: true})).toHaveCount(0);
    await expect(page.locator(".case-study h2, .case-study .detail-description")).toHaveCount(0);
    await expect(page.locator(".case-narrative > p")).toHaveCount(1);
    await expect(page.getByRole("link", {name: "All case studies", exact:true})).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize().width);
  }
  await page.getByRole("navigation", {name: "Breadcrumb"}).getByRole("link", {name: "Case studies", exact:true}).click();
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
  await expect(track.locator("article")).toHaveCount(cases.length);
  await expect(track.getByRole("link", {name: "Read more", exact:true})).toHaveCount(0);
  await expect(track.locator(".case-meta")).toHaveCount(0);
  await expect(page.locator("main > section").nth(1)).toHaveAttribute("id", "project-cases");
  await expect(track.locator(".project-code")).toHaveText(cases.map(item => item.projectCode));
  const confirmedCodes = cases.map(item => item.projectCode);
  expect(confirmedCodes.sort()).toEqual(["PBT005", "PBT012", "PBT017", "PBT018", "PBT040", "PBT042", "PBT054", "PFM014", "PFM016", "PFM044"]);
  expect(new Set(confirmedCodes).size).toBe(confirmedCodes.length);
  for (const item of cases) expect(item.projectCode).toMatch(/^(PBT|PFM)\d{3}$/);
  await expect(page.getByRole("button",{name:"Previous cases",exact:true})).toBeDisabled();
  await page.getByRole("button",{name:"Next cases",exact:true}).click();
  await expect.poll(()=>track.evaluate(el=>el.scrollLeft)).toBeGreaterThan(50);
  await page.getByRole("button",{name:"Previous cases",exact:true}).click();
  await expect.poll(()=>track.evaluate(el=>el.scrollLeft)).toBeLessThan(3);
  await track.evaluate(el => el.scrollTo({left: el.scrollWidth, behavior: "instant"}));
  await expect(page.getByRole("button", {name:"Next cases", exact:true})).toBeDisabled();
  await track.getByRole("link", {name:cases.at(-1).title, exact:true}).click();
  await expect(page.locator("h1")).toHaveText(cases.at(-1).title);
  await page.goto("/");
  await track.getByRole("link",{name:cases[0].title,exact:true}).click();
  await expect(page.locator("h1")).toHaveText(cases[0].title);
  await page.goto("/#/cases/sodium-ion-pouch-validation");
  await expect(page.locator(".case-narrative")).toContainText("differed from the customer’s initial expectations");
  await page.goto("/#/cases");
  await expect(page.locator(".case-summary")).toHaveCount(cases.length);
  await expect(page.locator("main")).not.toContainText("400 Wh/kg");
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize().width);
});


test("merged orders use one case and unnumbered legacy URLs remain available", async ({page}) => {
  await page.goto("/#/cases/electrolyte-validation-platform");
  await expect(page).toHaveURL(/#\/cases\/small-batch-dry-pouch-cells$/);
  await expect(page.locator(".project-code")).toHaveText("PBT017");
  await expect(page.locator(".case-narrative")).toContainText("two related orders");
  await expect(page.locator(".case-narrative")).toContainText("electrolyte");
  for (const item of unnumberedCases) {
    await page.goto(`/#/cases/${item.id}`);
    await expect(page.locator("h1")).toHaveText(item.title);
    await expect(page.locator(".project-code")).toHaveCount(0);
  }
  for (const route of ["/", "/#/cases"]) {
    await page.goto(route);
    await expect(page.locator(".case-summary")).toHaveCount(10);
    for (const item of unnumberedCases) await expect(page.locator(`.case-summary a[href="#/cases/${item.id}"]`)).toHaveCount(0);
    await expect(page.locator('.case-summary a[href="#/cases/electrolyte-validation-platform"]')).toHaveCount(0);
    await expect(page.locator("main")).not.toContainText("XX");
  }
});
