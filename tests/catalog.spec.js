import { test, expect } from '@playwright/test';
import { products, services, productAliases, serviceAliases } from '../src/catalog.js';
import { specifications } from '../src/specifications.js';
import { cases } from '../src/cases.js';

test('family search keeps model keywords and return filters', async ({page}) => {
  await page.goto('/#/products?category=binders-electrolytes&q=electrolyte%20qms029d');
  await expect(page.locator('.product-module')).toHaveCount(1);
  await page.getByRole('link',{name:'Electrolyte',exact:true}).click();
  await expect(page.locator('h1')).toHaveText('Electrolyte');
  await expect(page.locator('.model-option')).toHaveCount(0);
  await page.reload();
  await page.getByRole('link',{name:'Back to search results'}).click();
  await expect(page.getByLabel('Search products')).toHaveValue('electrolyte qms029d');
  await expect(page.getByLabel('Category',{exact:true})).toHaveValue('binders-electrolytes');
  await page.getByLabel('Search products').fill('no-matching-product');
  await page.getByRole('button',{name:'Search',exact:true}).click();
  await expect(page.getByRole('heading',{name:'No products match these filters'})).toBeVisible();
});

test('all offerings, legacy links and PDFs remain available',async({page,request},info)=>{
  test.skip(info.project.name!=='desktop','Exhaustive coverage once; modal responsiveness in every viewport.');
  test.setTimeout(90_000);
  for (const [kind,items] of [['product',products],['service',services]]) for(const item of items){
    await page.goto(`/#/${kind}s/${item.id}`);
    await expect(page.locator('h1')).toHaveText(item.name);
    await expect(page.locator('.model-options, .model-list, [data-spec-id]')).toHaveCount(0);
    await expect(page.getByRole('button',{name:/Request.*quotation/i})).toHaveCount(0);
    for(const image of await page.locator('main img').all()) expect(await image.evaluate(async el=>{await el.decode();return el.naturalWidth>0;})).toBe(true);
  }
  for(const [old,family] of Object.entries(productAliases)){
    await page.goto('/#/products/'+old);
    await expect(page.locator('h1')).toHaveText(products.find(p=>p.id===family).name);
  }
  for(const [old,current] of Object.entries(serviceAliases)){
    await page.goto('/#/services/'+old+'?area=custom-rd');
    await expect(page.locator('h1')).toHaveText(services.find(s=>s.id===current).name);
    await page.reload();
    await expect(page.locator('.breadcrumbs')).toContainText('Custom R&D');
  }
  for(const spec of specifications.values()){
    const response=await request.get('/'+spec.pdf);
    expect(response.ok(),spec.id).toBe(true);
    expect((await response.body()).subarray(0,5).toString(),spec.id).toBe('%PDF-');
  }
});

test('newest project references lead every case collection',async({page})=>{
  const numbers=cases.map(c=>Number(c.projectCode.slice(3)));
  expect(numbers).toEqual([...numbers].sort((a,b)=>b-a));
  for(const [route,prefix] of [['',''],['technologies/battery-technology','PBT'],['technologies/functional-materials','PFM'],['cases','']]){
    await page.goto('/#/'+route);
    await expect(page.locator('.case-summary .project-code')).toHaveText(cases.filter(c=>c.projectCode.startsWith(prefix)).map(c=>c.projectCode));
  }
});

test('model and spec presentation is paused without breaking family pages',async({page})=>{
  await page.goto('/#/products');
  await expect(page.locator('.catalog-models')).toHaveCount(0);
  await expect(page.getByText('View specs',{exact:true})).toHaveCount(0);
  for(const route of ['products/electrolyte','products/hard-carbon','products/electrochemical-workstation','services/mof-development','services/custom-3d-printing']){
    await page.goto('/#/'+route);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.detail-description').first()).toBeVisible();
    await expect(page.locator('main img')).toBeVisible();
    await expect(page.locator('.model-options,[data-spec-id]')).toHaveCount(0);
    await expect(page.locator('#spec-dialog')).not.toBeVisible();
  }
});
