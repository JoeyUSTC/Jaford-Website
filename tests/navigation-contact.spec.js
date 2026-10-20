import { test, expect } from "@playwright/test";

test("header and footer open the shared independent contact page", async ({ page }) => {
  await page.goto("/");
  const nav = page.locator("#navigation");
  const footer = page.locator("footer");
  await expect(footer.locator("a")).toHaveText(["Contact Us", "Back to Top"]);
  await expect(footer).toContainText("JAFORD · Singapore");
  if (page.viewportSize().width <= 1100) await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(nav.getByRole("link", { name: "Contact Us", exact: true })).toHaveAttribute("href", "/contact/");
  await nav.getByRole("link", { name: "Contact Us", exact: true }).click();
  await expect(page).toHaveTitle("Contact Us — JAFORD");
  await expect(page.locator("h1")).toHaveText("Contact Us");
  await expect(page.locator(".scale-intro, .home-sector")).toHaveCount(0);
  await expect(nav.getByRole("link", { name: "Contact Us", exact: true, includeHidden: true })).toHaveAttribute("aria-current", "page");
  if (page.viewportSize().width <= 1100) await expect(page.getByRole("button", { name: "Open navigation" })).toHaveAttribute("aria-expanded", "false");
  await page.reload();
  const form = page.locator("#home-contact-form");
  await expect(form.locator("input, textarea")).toHaveCount(3);
  await form.getByRole("button", { name: "Prepare email" }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await form.getByLabel("Your Name").fill("Researcher");
  await form.getByLabel("E-Mail Address").fill("invalid");
  await form.getByRole("textbox", { name: "Enquiry", exact: true }).fill("Please help validate our samples.");
  await form.getByRole("button", { name: "Prepare email" }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await form.getByLabel("E-Mail Address").fill("researcher@example.com");
  await form.getByRole("textbox", { name: "Enquiry", exact: true }).fill("             ");
  await form.getByRole("button", { name: "Prepare email" }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  const enquiry = "Please help validate our samples.";
  await form.getByRole("textbox", { name: "Enquiry", exact: true }).fill(enquiry);
  await form.getByRole("button", { name: "Prepare email" }).click();
  await expect(page.locator("#inquiry-result")).toContainText("Nothing has been sent.");
  const mail = new URL(await page.locator("#email-inquiry").getAttribute("href"));
  expect(mail.pathname).toBe("kiki.li@jaford.com");
  expect(mail.searchParams.get("body")).toContain(enquiry);
  await page.getByRole("button", { name: "Edit your inquiry" }).click();
  await expect(form.getByRole("textbox", { name: "Enquiry", exact: true })).toHaveValue(enquiry);
  await expect(page.locator(".contact-direct a")).toHaveAttribute("href", "mailto:kiki.li@jaford.com");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await footer.getByRole("link", { name: "Back to Top", exact: true }).click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await expect(page).toHaveURL(/\/contact\/$/);
  await expect(page.locator("#main")).toBeFocused();
  await page.locator(".wordmark").click();
  await expect(page.locator(".impact-stats dd")).toHaveText(["9", "20", "88"]);
  await footer.getByRole("link", { name: "Contact Us", exact: true }).click();
  await expect(page.locator("h1")).toHaveText("Contact Us");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize().width);
});

test("homepage counters finish in one second and restart cleanly after navigation", async ({ page }) => {
  await page.clock.install();
  await page.clock.pauseAt(new Date());
  await page.goto("/");
  const numbers = page.locator(".impact-stats dd");
  await expect(numbers).toHaveText(["0", "0", "0"]);
  await page.clock.runFor(500);
  const midway = await numbers.allTextContents();
  expect(Number(midway[2])).toBeGreaterThan(0);
  expect(Number(midway[2])).toBeLessThan(88);
  await page.clock.runFor(600);
  await expect(numbers).toHaveText(["9", "20", "88"]);
  await page.clock.runFor(2000);
  await expect(numbers).toHaveText(["9", "20", "88"]);
  await page.evaluate(() => { location.hash = "/contact"; });
  await expect(page.locator("h1")).toHaveText("Contact Us");
  await page.locator(".wordmark").click();
  await expect(numbers).toHaveText(["0", "0", "0"]);
  await page.clock.runFor(200);
  await page.evaluate(() => { location.hash = "/contact"; });
  await expect(page.locator("h1")).toHaveText("Contact Us");
  await page.clock.runFor(2000);
  await page.locator(".wordmark").click();
  await expect(page.locator("h1")).toHaveText("We Scale Innovation");
  await expect(numbers).toHaveText(["0", "0", "0"]);
  await page.clock.runFor(1100);
  await expect(numbers).toHaveText(["9", "20", "88"]);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await expect(numbers).toHaveText(["9", "20", "88"]);
});

test("category and case headings are concise and visitor links stay internal", async ({ page }) => {
  for (const route of ["/", "/contact", "/technologies/fuel-cells-electrolyzers", "/technologies/battery-technology", "/technologies/functional-materials", "/technologies/custom-rd", "/technologies/testing-characterization", "/technologies/equipment-supplies", "/products", "/services", "/cases"]) {
    await page.goto(`/#${route}`);
    const external = await page.locator("a[href]").evaluateAll(links => links.filter(a => !["mailto:"].some(scheme => a.href.startsWith(scheme)) && new URL(a.href).origin !== location.origin).map(a => a.getAttribute("href")));
    expect(external).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize().width);
    if (route === "/technologies/fuel-cells-electrolyzers") {
      await expect(page.locator(".hero")).toHaveText("Fuel Cells & Electrolyzers");
      await expect(page.locator(".product-module")).toHaveCount(8);
    }
    if (route === "/cases") {
      await expect(page.locator(".hero")).toHaveText("Custom development cases");
      await expect(page.getByText("Project experience", { exact: true })).toHaveCount(0);
      await expect(page.locator(".completed-project-list .case-summary")).toHaveCount(10);
    }
  }
});


test("desktop navigation fits intermediate widths", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop widths only");
  for (const width of [1101, 1280, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    const logo = await page.locator(".wordmark").boundingBox();
    const nav = await page.locator("#navigation").boundingBox();
    expect(nav.x).toBeGreaterThanOrEqual(logo.x + logo.width);
    expect(nav.x + nav.width).toBeLessThanOrEqual(width);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  }
});
