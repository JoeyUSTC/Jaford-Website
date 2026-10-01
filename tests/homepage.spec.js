import { test, expect } from "@playwright/test";

test("homepage presents readable product information without errors or overflow", async ({
  page,
}, testInfo) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle("JAFORD — From Innovation to Industrial Impact");
  await expect(page.locator("main > section")).toHaveCount(6);
  await expect(page.locator(".sector-card")).toHaveCount(24);
  await expect(page.locator("h1")).toHaveText("Your Long-term Partner in Technology Translation");
  await expect(page.locator(".brand-lead")).toHaveText("From Innovation to Industrial Impact");
  expect(await page.locator(".brand-logo img").evaluate(async (img) => { await img.decode(); return img.naturalWidth; })).toBeGreaterThan(0);
  await expect(page.locator("#custom-rd")).toContainText("partner factories and laboratories");
  await expect(page.locator("#functional-materials")).toContainText("MOFs");
  await expect(page.locator("#completed-projects")).toHaveCount(0);
  await expect(page.locator("main [data-inquiry]")).toHaveCount(1);
  await expect(page.locator(".home-hero a, .home-hero button")).toHaveCount(0);
  for (const sector of await page.locator(".home-sector").all()) {
    await expect(sector.locator(".sector-card")).toHaveCount(6);
    if (page.viewportSize().width >= 1280) {
      const tops = await sector.locator("figure").evaluateAll(items => items.map(item => item.getBoundingClientRect().top));
      expect(new Set(tops).size).toBe(1);
    }
  }
  for (const product of await page.locator(".sector-card").all()) {
    await product.locator("img").scrollIntoViewIfNeeded();
    expect(await product.locator("img").evaluate(async img => { await img.decode(); return img.naturalWidth; })).toBeGreaterThan(0);
    await expect(product.getByRole("heading", { level: 3 })).toBeVisible();
  }
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(page.viewportSize().width);
  const invalidLinks = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .filter(
          (link) =>
            link.hash &&
            !link.hash.startsWith("#/") &&
            !document.getElementById(link.hash.slice(1)),
        )
        .map((link) => link.hash),
    );
  expect(invalidLinks).toEqual([]);
  expect(errors).toEqual([]);
  if (["desktop", "mobile"].includes(testInfo.project.name)) {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({
      path: `/tmp/jaford-${testInfo.project.name}.png`,
      fullPage: true,
    });
  }
});

test("technology navigation groups products and related services", async ({
  page,
}) => {
  await page.goto("/");
  const links = await page
    .locator('[aria-label="Main navigation"] a')
    .evaluateAll((items) =>
      items.map((a) => ({ href: a.getAttribute("href"), name: a.textContent })),
    );
  expect(links.map(item => item.name)).toEqual([
    "Custom R&D", "Battery Technology", "Fuel Cells & Electrolyzers",
    "Functional Materials", "Testing & Characterization", "Equipment & Supplies",
  ]);
  await expect(page.locator("main > section").nth(1)).toHaveAttribute("id", "custom-rd");
  for (const item of links) {
    await page.goto("/" + item.href);
    await expect(page.locator("h1")).toHaveText(item.name);
    await expect(page.locator(".catalog-section")).toBeVisible();
  }
  await page.goto("/#/technologies/battery-materials");
  await expect(
    page.getByRole("link", {
      name: "Resin-Derived Hard Carbon",
      exact: true,
    }),
  ).toBeVisible();
  await page.goto("/#/technologies/custom-rd");
  await expect(
    page.getByRole("link", { name: "Electrode processing", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Electrode processing", exact: true })
    .click();
  await expect(page.locator("h1")).toHaveText("Electrode processing");
  await expect(
    page.getByRole("navigation", { name: "Breadcrumb" }),
  ).toContainText("Custom R&D");
  await page
    .locator(".related-areas")
    .getByRole("link", { name: "Custom R&D", exact: true })
    .click();
  await expect(page).toHaveURL(/#\/technologies\/custom-rd$/);
  await page.goto("/#/technologies/battery-cells");
  await page
    .getByRole("link", { name: "Spherical porous carbon", exact: true })
    .click();
  await page.reload();
  await expect(
    page.getByRole("navigation", { name: "Breadcrumb" }),
  ).toContainText("Battery Technology");
});

test("inquiry validates fields, creates a brief, supports editing and downloads it", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Send an Inquiry", exact: true })
    .click();
  await page.getByRole("button", { name: "Prepare my inquiry" }).click();
  await expect(page.locator("#inquiry-result")).not.toBeVisible();
  await page.getByLabel("Your name").fill("Research User");
  await page.getByLabel("Work email").fill("research@example.com");
  await page.getByLabel("Organization").fill("Example Research");
  await page.getByLabel("Area of interest").selectOption("Custom synthesis");
  await page
    .getByLabel("Your requirements")
    .fill("We are exploring a custom polymer for an electrolyte application.");
  await page.getByRole("button", { name: "Prepare my inquiry" }).click();
  await expect(page.locator("#inquiry-preview")).toContainText(
    "Custom synthesis",
  );
  await expect(page.locator("#inquiry-preview")).toContainText("Research User");
  await expect(page.locator("#inquiry-result")).toContainText(
    "Nothing has been sent.",
  );
  const emailDraft = new URL(
    await page
      .getByRole("link", { name: "Open email draft" })
      .getAttribute("href"),
  );
  expect(emailDraft.protocol).toBe("mailto:");
  expect(emailDraft.pathname).toBe("kiki.li@jaford.com");
  expect(emailDraft.searchParams.get("subject")).toBe(
    "JAFORD inquiry — Custom synthesis",
  );
  expect(emailDraft.searchParams.get("body")).toContain("custom polymer");
  expect(emailDraft.searchParams.get("body")).toContain("research@example.com");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download .txt" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("jaford-inquiry.txt");
  const stream = await download.createReadStream();
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  expect(Buffer.concat(chunks).toString()).toContain("custom polymer");
  await page.getByRole("button", { name: "Edit your inquiry" }).click();
  await expect(page.getByLabel("Your requirements")).toHaveValue(
    "We are exploring a custom polymer for an electrolyte application.",
  );
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page.locator("body")).not.toHaveClass("dialog-open");
  await expect(
    page.getByRole("button", { name: "Send an Inquiry", exact: true }),
  ).toBeFocused();
});

test("navigation reaches services and mobile menu closes", async ({ page }) => {
  await page.goto("/");
  const mobile = page.viewportSize().width <= 1100;
  if (mobile)
    await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Custom R&D", exact: true })
    .click();
  await expect(page).toHaveURL(/#\/technologies\/custom-rd$/);
  await expect(page.locator("h1")).toHaveText("Custom R&D");
  if (mobile) {
    await expect(
      page.getByRole("button", { name: "Open navigation" }),
    ).toHaveAttribute("aria-expanded", "false");
    await expect(
      page.getByRole("navigation", { name: "Main navigation" }),
    ).not.toBeVisible();
  }
  await page
    .getByRole("link", { name: "Polymer & resin synthesis", exact: true })
    .click();
  await page.getByRole("button", { name: "Discuss this service" }).click();
  await expect(
    page.getByLabel("Product / service and selected option"),
  ).toHaveValue("Polymer & resin synthesis");
});

test("prepared inquiry can be copied and whitespace-only requirements are rejected", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page
    .getByRole("button", { name: "Send an Inquiry", exact: true })
    .click();
  await page.getByLabel("Your name").fill("Research User");
  await page.getByLabel("Work email").fill("research@example.com");
  await page.getByLabel("Area of interest").selectOption("Advanced materials");
  await page.getByLabel("Your requirements").fill("                    ");
  await page.getByRole("button", { name: "Prepare my inquiry" }).click();
  await expect(page.locator("#inquiry-result")).not.toBeVisible();
  await page
    .getByLabel("Your requirements")
    .fill("I need a material suitable for electrochemical research.");
  await page.getByRole("button", { name: "Prepare my inquiry" }).click();
  await page.getByRole("button", { name: "Copy inquiry" }).click();
  await expect(page.getByRole("status")).toHaveText(
    "Copied. Your inquiry is ready to share.",
  );
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "electrochemical research",
  );
});
