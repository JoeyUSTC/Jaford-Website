import {test, expect} from '@playwright/test';
import {hardCarbonOptions} from '../src/hard-carbon-options.js';

test('hard-carbon route profiles support hover, keyboard, touch and route changes', async ({page}, info) => {
  await page.goto('/products/hard-carbon/');
  const routes = page.locator('.material-route');
  await expect(page.locator('h1')).toHaveText('Hard Carbon');
  await expect(routes.locator('summary > span:first-child')).toHaveText(hardCarbonOptions.map(item=>item.name));
  await expect(page.locator('.model-options,[data-spec-id],main a[href$=".pdf"]')).toHaveCount(0);
  await expect(page.locator('.material-options-intro')).toContainText('supplier grades and batch specifications');
  const first = routes.first(), summary = first.locator('summary');
  if (info.project.name === 'desktop') {
    await summary.hover();
    await expect(first).toHaveAttribute('open', '');
    await first.locator('.material-profile').hover();
    await expect(first.locator('table')).toBeVisible();
    await page.locator('h1').hover();
    await expect(first).not.toHaveAttribute('open');
    await summary.focus();
    await page.keyboard.press('Enter');
  } else await summary.click();
  await expect(first.locator('table')).toBeVisible();
  await expect(first.locator('td')).toHaveText(['Resin-derived','Phenolic resin',hardCarbonOptions[0].focus,hardCarbonOptions[0].selection]);
  await page.keyboard.press('Escape');
  await expect(first).not.toHaveAttribute('open');
  for (let i = 0; i < hardCarbonOptions.length; i++) {
    const route = routes.nth(i);
    await route.locator('summary').click();
    await expect(route.locator('table')).toBeVisible();
    await expect(route.locator('td').nth(1)).toHaveText(hardCarbonOptions[i].precursor);
    await expect(page.locator('.material-route[open]')).toHaveCount(1);
    const panel = await route.locator('.material-profile').boundingBox();
    expect(panel.x).toBeGreaterThanOrEqual(0);
    expect(panel.x + panel.width).toBeLessThanOrEqual(page.viewportSize().width);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize().width);
  }
  await page.locator('h1').click();
  await expect(page.locator('.material-route[open]')).toHaveCount(0);
  await page.goto('/products/electrolyte/');
  await expect(page.locator('.hard-carbon-options,.material-route,.model-options,[data-spec-id]')).toHaveCount(0);
  await page.goBack();
  await expect(routes).toHaveCount(6);
  await expect(page.locator('.material-route[open]')).toHaveCount(0);
  await routes.last().locator('summary').click();
  await expect(routes.last().locator('table')).toBeVisible();
});

test('hard-carbon profiles remain readable without JavaScript', async ({browser}, info) => {
  const context = await browser.newContext({javaScriptEnabled:false,viewport:info.project.use.viewport,isMobile:info.project.use.isMobile,hasTouch:info.project.use.hasTouch});
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/products/hard-carbon/');
  const routes = page.locator('.material-route');
  await expect(routes).toHaveCount(6);
  await routes.first().locator('summary').click();
  await expect(routes.first().locator('table')).toBeVisible();
  await expect(routes.first().locator('td').nth(1)).toHaveText('Phenolic resin');
  await routes.first().locator('summary').click();
  await expect(routes.first().locator('table')).not.toBeVisible();
  await context.close();
});
