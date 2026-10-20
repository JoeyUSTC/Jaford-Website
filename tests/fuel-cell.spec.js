import {test, expect} from '@playwright/test';
import {fuelCellProducts, featuredFuelCellProducts} from '../src/fuel-cell-products.js';

test('homepage, category and detail pages share fuel-cell products and imagery', async ({page}) => {
  await page.goto('/');
  const home = page.locator('#fuel-cells-electrolyzers');
  await expect(home.locator('.sector-card')).toHaveCount(6);
  for (const product of featuredFuelCellProducts) {
    const card = home.locator('.sector-card').filter({has:page.getByRole('heading',{name:product.name,exact:true})});
    await expect(card.locator('a')).toHaveAttribute('href', `/products/${product.id}/?area=fuel-cells-electrolyzers`);
    const src = await card.locator('img').getAttribute('src');
    await card.locator('a').click();
    await expect(page.locator('h1')).toHaveText(product.name);
    await expect(page.locator('.product-figure img')).toHaveAttribute('src',src);
    await expect(page.locator('.breadcrumbs')).toContainText('Fuel Cells & Electrolyzers');
    await page.goto('/');
  }
  await home.getByRole('link',{name:'Browse all',exact:true}).click();
  await expect(page.locator('.product-module')).toHaveCount(fuelCellProducts.length);
  await expect(page.locator('main a[href^="https://www.jaford.com/"]')).toHaveCount(0);
  for (const product of fuelCellProducts) {
    await page.getByRole('link',{name:product.name,exact:true}).click();
    await page.reload();
    await expect(page.locator('h1')).toHaveText(product.name);
    await expect(page.locator('.detail-description')).toHaveText(product.description);
    const img = page.locator('.product-figure img');
    await expect.poll(()=>img.evaluate(el=>el.complete && el.naturalWidth>0)).toBe(true);
    await expect(page.locator('.model-options,[data-spec-id]')).toHaveCount(0);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize().width);
    await page.getByRole('navigation',{name:'Breadcrumb'}).getByRole('link',{name:'Fuel Cells & Electrolyzers',exact:true}).click();
  }
  await page.goto('/#/products?category=fuel-cells-electrolyzers');
  await expect(page.locator('.product-module')).toHaveCount(8);
  await page.goto('/#/technologies/battery-technology');
  for(const product of fuelCellProducts) await expect(page.locator(`a[href*="/products/${product.id}"]`)).toHaveCount(0);
});
