import {test, expect} from '@playwright/test';
import {technologies, itemsForArea} from '../src/technologies.js';
import {resolveRoute} from '../src/routes.js';

for (const area of technologies) {
  test(`${area.name}: every homepage selection belongs to its illustrated directory`, async ({page}) => {
    await page.goto('/');
    const section = page.locator(`#${area.id}`);
    const featured = await section.locator('.sector-card a').evaluateAll(links => links.map(a => ({
      href:a.getAttribute('href'), src:a.querySelector('img').getAttribute('src'),
      artwork:a.querySelector('.product-artwork').getAttribute('style'),
    })));
    expect(featured).toHaveLength(area.featuredIds.length);
    expect(new Set(featured.map(item=>item.href)).size).toBe(area.featuredIds.length);
    await section.getByRole('link', {name:'Browse all',exact:true}).click();
    await expect(page.locator('h1')).toHaveText(area.name);
    const directory = page.locator('.product-module');
    const items = itemsForArea(area);
    const total = items.products.length + items.services.length;
    expect(total).toBeGreaterThanOrEqual(featured.length);
    await expect(directory).toHaveCount(total);
    if (area.id === 'functional-materials') {
      await expect(directory.locator('h2')).toHaveText(['MOFs', 'COFs', 'Functional polymers', 'Ligands', 'Advanced materials', 'Advanced membranes']);
    }
    await expect(page.locator('main a[href*="/imperial-reducer"], main a[href*="/resin-development"], main a[href*="/functional-intermediate-development"]')).toHaveCount(0);
    await expect(page.locator('main a[href^="https://www.jaford.com"]')).toHaveCount(0);
    for (const selected of featured) {
      const row = directory.filter({has:page.locator(`a[href="${selected.href}"]`)});
      await expect(row).toHaveCount(1);
      await expect(row.locator('img')).toHaveAttribute('src', selected.src);
      expect(await row.locator('.product-artwork').getAttribute('style')).toBe(selected.artwork);
    }
    for (const selected of featured) {
      await page.goto('/');
      await page.locator(`#${area.id} .sector-card a[href="${selected.href}"]`).click();
      const item = resolveRoute(new URL(selected.href, 'https://jaford.com').pathname).item;
      await expect(page.locator('h1')).toHaveText(item.name);
      const img = page.locator('.detail-page figure img');
      await expect(img).toHaveAttribute('src', selected.src);
      await expect.poll(()=>img.evaluate(el=>el.complete && el.naturalWidth>0)).toBe(true);
      await expect(page.locator('.breadcrumbs')).toContainText(area.name);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize().width);
      await page.getByRole('navigation',{name:'Breadcrumb'}).getByRole('link',{name:area.name,exact:true}).click();
      await expect(directory).toHaveCount(total);
    }
    const additional = [...items.products, ...items.services].find(item=>!area.featuredIds.includes(item.id));
    if (additional) {
      await directory.getByRole('link',{name:additional.name,exact:true}).click();
      await page.reload();
      await expect(page.locator('h1')).toHaveText(additional.name);
    }
  });
}
