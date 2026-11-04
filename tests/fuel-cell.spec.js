import {test, expect} from '@playwright/test';
import {fuelCellProducts} from '../src/fuel-cell-products.js';
import {services} from '../src/catalog.js';

test('paused fuel-cell and electrolysis scope is unlisted but original pages remain intact', async ({page}) => {
  for (const route of ['/', '/custom-rd/', '/testing-characterization/', '/products/', '/services/']) {
    await page.goto(route);
    await expect(page.locator('#navigation a[href*="fuel-cells-electrolyzers"], #fuel-cells-electrolyzers, .legacy-ranges')).toHaveCount(0);
    await expect(page.locator('body')).not.toContainText(/Fuel cells|Fuel Cells|electrolyzer|Electrocatalysis|Short-stack testing|Full-stack testing|Wind & solar/i);
    await expect(page.locator('#inquiry-form option').filter({hasText:/Fuel cells|Electrocatalysis/i})).toHaveCount(0);
    for (const product of fuelCellProducts) await expect(page.locator(`a[href*="/products/${product.id}"]`)).toHaveCount(0);
  }
  await page.goto('/#/products?category=fuel-cells-electrolyzers');
  for (const product of fuelCellProducts) await expect(page.locator(`a[href*="/products/${product.id}"]`)).toHaveCount(0);
  await page.goto('/#/technologies/fuel-cells-electrolyzers');
  await expect(page.locator('h1')).toHaveText('Fuel Cells & Electrolyzers');
  await expect(page.locator('meta[name=robots]')).toHaveAttribute('content', /^noindex,/);
  await expect(page.locator('.product-module')).toHaveCount(fuelCellProducts.length);
  for (const product of fuelCellProducts) {
    const row = page.locator('.product-module').filter({has:page.getByRole('link',{name:product.name,exact:true})});
    const src = await row.locator('img').getAttribute('src');
    await row.getByRole('link',{name:product.name,exact:true}).click();
    await page.reload();
    await expect(page.locator('h1')).toHaveText(product.name);
    await expect(page.locator('.detail-description')).toHaveText(product.description);
    await expect(page.locator('meta[name=robots]')).toHaveAttribute('content', /^noindex,/);
    const img = page.locator('.product-figure img');
    await expect(img).toHaveAttribute('src', src);
    await expect.poll(()=>img.evaluate(el=>el.complete && el.naturalWidth>0)).toBe(true);
    await expect(page.locator('.model-options,[data-spec-id]')).toHaveCount(0);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize().width);
    await page.getByRole('navigation',{name:'Breadcrumb'}).getByRole('link',{name:'Fuel Cells & Electrolyzers',exact:true}).click();
  }
  for (const id of ['stack-testing','short-stack-testing','full-stack-testing','renewable-coupled-testing']) {
    await page.goto('/#/services/' + id);
    await expect(page.locator('h1')).toHaveText(services.find(item=>item.id===id).name);
    await expect(page.locator('meta[name=robots]')).toHaveAttribute('content', /^noindex,/);
  }
});
