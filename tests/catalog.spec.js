import { test, expect } from "@playwright/test";
import { products, services } from "../src/catalog.js";
import { technologies } from "../src/technologies.js";

test("catalog filtering, search, empty state and browser history", async ({
  page,
}) => {
  await page.goto("/#/products");
  await expect(page.locator(".catalog-row")).toHaveCount(25);
  await page
    .getByLabel("Category", { exact: true })
    .selectOption("binders-electrolytes");
  await expect(page.locator(".catalog-row")).toHaveCount(5);
  await page.getByLabel("Search products").fill("QMS029D");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  await expect(page.locator(".catalog-row")).toHaveCount(1);
  await page
    .getByRole("link", { name: "QMS029D electrolyte", exact: true })
    .click();
  await expect(page.locator("h1")).toHaveText("QMS029D electrolyte");
  await page.reload();
  await expect(page.locator("h1")).toHaveText("QMS029D electrolyte");
  await page.goBack();
  await expect(page.getByLabel("Search products")).toHaveValue("QMS029D");
  await expect(page.getByLabel("Category", { exact: true })).toHaveValue(
    "binders-electrolytes",
  );
  await page.getByLabel("Search products").fill("no-matching-product");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "No products match these filters" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Reset filters" }).click();
  await expect(page.locator(".catalog-row")).toHaveCount(25);
});

test("selected product model is carried into the email draft without sending", async ({
  page,
}) => {
  await page.goto("/#/products/sodium-hard-carbon");
  await page
    .getByLabel("Model / option")
    .selectOption("Resin-derived — grade to confirm");
  await page.getByRole("button", { name: "Request a quotation" }).click();
  await expect(page.getByLabel("Area of interest")).toHaveValue(
    "Battery materials",
  );
  await expect(
    page.getByLabel("Product / service and selected option"),
  ).toHaveValue(
    "Hard carbon for sodium-ion batteries — Resin-derived — grade to confirm",
  );
  await page.getByLabel("Your name").fill("Test Researcher");
  await page.getByLabel("Work email").fill("research@example.com");
  await page
    .getByLabel("Your requirements")
    .fill("Please provide the specification for this selected grade.");
  await page.getByLabel("Required quantity").fill("20 samples");
  await page.getByLabel("Required timeline").fill("Within 6 weeks");
  await page.getByRole("button", { name: "Prepare my inquiry" }).click();
  const mail = new URL(
    await page
      .getByRole("link", { name: "Open email draft" })
      .getAttribute("href"),
  );
  expect(mail.pathname).toBe("kiki.li@jaford.com");
  expect(mail.searchParams.get("body")).toContain("Quantity: 20 samples");
  expect(mail.searchParams.get("body")).toContain(
    "Required timeline: Within 6 weeks",
  );
  expect(mail.searchParams.get("body")).toContain(
    "Resin-derived — grade to confirm",
  );
  await expect(page.locator("#inquiry-result")).toContainText(
    "Nothing has been sent.",
  );
  await page
    .getByRole("button", { name: "Close inquiry", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Send an Inquiry", exact: true })
    .click();
  await expect(
    page.getByLabel("Product / service and selected option"),
  ).toBeHidden();
  await expect(page.getByLabel("Area of interest")).toHaveValue(
    "Other technical requirement",
  );
});

test("representative detail pages preserve technical boundaries and fit the viewport", async ({
  page,
}, testInfo) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of [
    "products",
    "products/p2-electrode",
    "products/glass-reactor-2000ml",
    "services",
    "services/sintering-heat-treatment",
  ]) {
    await page.goto("/#/" + route);
    await expect(page.locator("h1")).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(page.viewportSize().width);
    for (const img of await page.locator("main img").all()) {
      await img.scrollIntoViewIfNeeded();
      expect(
        await img.evaluate(async (el) => {
          await el.decode();
          return el.naturalWidth > 0;
        }),
      ).toBe(true);
    }
    if (route === "products/p2-electrode") {
      await expect(page.locator("table")).toContainText("7.5 × 5.4 cm");
      await expect(page.locator("table")).toContainText(
        "Areal capacity (mAh/cm²)",
      );
      await expect(page.locator("table")).toContainText(
        "Mass loading (mg/cm²)",
      );
      await expect(page.locator("figcaption")).toContainText("示意图");
    }
    if (route === "products/glass-reactor-2000ml")
      await expect(page.locator("main")).toContainText(
        "No pressure rating is claimed",
      );
    if (route === "services/sintering-heat-treatment")
      await expect(page.locator("main")).toContainText(
        "Subject to project assessment",
      );
    if (["desktop", "mobile"].includes(testInfo.project.name)) {
      await page.screenshot({
        path: `/tmp/jaford-${route.replaceAll("/", "-")}-${testInfo.project.name}.png`,
        fullPage: true,
      });
    }
  }
  expect(errors).toEqual([]);
});

test("every product and service has a working detail route and an inquiry", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "Full route coverage once; responsive checks run on every viewport.",
  );
  expect(new Set(technologies.flatMap((t) => t.productIds))).toEqual(
    new Set(products.map((p) => p.id)),
  );
  expect(new Set(technologies.flatMap((t) => t.serviceIds))).toEqual(
    new Set(services.map((s) => s.id)),
  );
  for (const product of products) {
    await page.goto("/#/products/" + product.id);
    await expect(page.locator("h1")).toHaveText(product.name);
    await expect(page.locator("table")).toBeVisible();
    await expect(page.getByLabel("Model / option")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Request a quotation" }),
    ).toBeVisible();
    await expect(page.locator("main a[download]")).toHaveCount(0);
  }
  for (const service of services) {
    await page.goto("/#/services/" + service.id);
    await expect(page.locator("h1")).toHaveText(service.name);
    for (const title of [
      "What we can organize",
      "What you provide",
      "Agreed deliverables",
      "Project assessment",
    ])
      await expect(
        page.getByRole("heading", { name: title, exact: true }),
      ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Discuss this service" }),
    ).toBeVisible();
  }
  await page.goto("/#/products/does-not-exist");
  await expect(page.locator("h1")).toHaveText("Page not found");
  await page.getByRole("link", { name: "Browse products" }).click();
  await expect(page.locator(".catalog-row")).toHaveCount(25);
});

test("multi-keyword search preserves filters through the detail return link", async ({
  page,
}) => {
  await page.goto(
    "/#/products?category=binders-electrolytes&q=electrolyte%20qms029d",
  );
  await expect(page.locator(".catalog-row")).toHaveCount(1);
  await expect(page.locator(".catalog-models")).toContainText("QMS029D");
  await page
    .getByRole("link", { name: "QMS029D electrolyte", exact: true })
    .click();
  await page.reload();
  await page.getByRole("link", { name: "Back to search results" }).click();
  await expect(page.getByLabel("Search products")).toHaveValue(
    "electrolyte qms029d",
  );
  await expect(page.getByLabel("Category", { exact: true })).toHaveValue(
    "binders-electrolytes",
  );
  await expect(page.locator(".catalog-row")).toHaveCount(1);
});

test("product modules open specs from the image or keyboard and retain inquiry context", async ({
  page,
}) => {
  await page.goto("/#/technologies/battery-materials");
  await expect(page.locator(".product-module")).toHaveCount(11);
  const module = page
    .locator(".product-module")
    .filter({
      has: page.getByRole("heading", {
        name: "NFPP cathode powder",
        exact: true,
      }),
    });
  await expect(module).toContainText("View specs");
  await expect(module.locator("figcaption")).toContainText("示意图");
  await module.locator("img").click();
  await expect(page.locator("h1")).toHaveText("NFPP cathode powder");
  await page
    .getByRole("button", { name: "View specifications", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Specifications", exact: true }),
  ).toBeFocused();
  await expect(page.locator("table")).toBeVisible();
  await page
    .getByRole("button", { name: "Request a quotation", exact: true })
    .click();
  await expect(
    page.getByLabel("Product / service and selected option"),
  ).toHaveValue(/NFPP cathode powder/);
  await page
    .getByRole("button", { name: "Close inquiry", exact: true })
    .click();
  await page
    .getByRole("link", { name: "Back to technology area", exact: true })
    .click();
  const productLink = page
    .locator(".product-module")
    .getByRole("link", { name: "NFPP cathode powder", exact: true });
  await productLink.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("h1")).toHaveText("NFPP cathode powder");
});
