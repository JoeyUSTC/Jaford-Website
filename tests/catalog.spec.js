import { test, expect } from '@playwright/test';
import { products, services, productAliases } from '../src/catalog.js';
import { optionsFor, specifications } from '../src/specifications.js';
import { cases } from '../src/cases.js';

test('family search keeps model keywords and return filters', async ({page}) => {
  await page.goto('/#/products?category=binders-electrolytes&q=electrolyte%20qms029d');
  await expect(page.locator('.product-module')).toHaveCount(1);
  await page.getByRole('link',{name:'Electrolyte',exact:true}).click();
  await expect(page.locator('h1')).toHaveText('Electrolyte');
  await expect(page.locator('.model-option')).toHaveCount(3);
  await page.reload();
  await page.getByRole('link',{name:'Back to search results'}).click();
  await expect(page.getByLabel('Search products')).toHaveValue('electrolyte qms029d');
  await expect(page.getByLabel('Category',{exact:true})).toHaveValue('binders-electrolytes');
  await page.getByLabel('Search products').fill('no-matching-product');
  await page.getByRole('button',{name:'Search',exact:true}).click();
  await expect(page.getByRole('heading',{name:'No products match these filters'})).toBeVisible();
});

test('hard carbon modal stays in page, supports PDF, Escape and focus return', async ({page,request}) => {
  await page.goto('/#/products/hard-carbon');
  await expect(page.locator('.model-option')).toHaveCount(2);
  const button = page.getByRole('button',{name:'View Spec: Resin-Derived Hard Carbon',exact:true});
  await button.click();
  const modal=page.locator('#spec-dialog');
  await expect(modal).toBeVisible();
  await expect(modal).toContainText('Resin-derived');
  await expect(modal).toContainText('not a JAFORD measurement');
  await expect(page).toHaveURL(/#\/products\/hard-carbon$/);
  const response=await request.get(await modal.getByRole('link',{name:'Download PDF'}).getAttribute('href'));
  expect(response.ok()).toBe(true);
  expect((await response.body()).subarray(0,5).toString()).toBe('%PDF-');
  await modal.getByRole('button',{name:'Preview PDF',exact:true}).click();
  await expect(modal.locator('object')).toBeVisible();
  expect(await modal.evaluate(el=>el.scrollWidth<=el.clientWidth)).toBe(true);
  await page.keyboard.press('Escape');
  await expect(modal).not.toBeVisible();
  await expect(button).toBeFocused();
  await page.getByRole('button',{name:'View Spec: Biomass-Derived Hard Carbon',exact:true}).click();
  await expect(modal).toContainText('wood-derived');
  await modal.getByRole('button',{name:'Close specification'}).click();
  await expect(modal).not.toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize().width);
});

test('known electrode dimensions remain separate from unconfirmed performance',async({page})=>{
  await page.goto('/#/products/p2-electrode');
  await expect(page.locator('h1')).toHaveText('Cathode Electrodes');
  await page.locator('.model-option').filter({hasText:'P2'}).getByRole('button').click();
  await expect(page.locator('#spec-dialog')).toContainText('7.5 × 5.4 cm');
  await expect(page.locator('#spec-dialog')).not.toContainText('Areal capacity (mAh/cm²)');
  await expect(page.locator('#spec-dialog')).not.toContainText('Mass loading (mg/cm²)');
});

test('all offerings, legacy links and PDFs remain available',async({page,request},info)=>{
  test.skip(info.project.name!=='desktop','Exhaustive coverage once; modal responsiveness in every viewport.');
  test.setTimeout(90_000);
  for (const [kind,items] of [['product',products],['service',services]]) for(const item of items){
    await page.goto(`/#/${kind}s/${item.id}`);
    await expect(page.locator('h1')).toHaveText(item.name);
    await expect(page.locator('[data-spec-id]')).toHaveCount(optionsFor(item,kind).length);
    await expect(page.getByRole('button',{name:/Request.*quotation/i})).toHaveCount(0);
    for(const image of await page.locator('main img').all()) expect(await image.evaluate(async el=>{await el.decode();return el.naturalWidth>0;})).toBe(true);
  }
  for(const [old,family] of Object.entries(productAliases)){
    await page.goto('/#/products/'+old);
    await expect(page.locator('h1')).toHaveText(products.find(p=>p.id===family).name);
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

test('material types show uses and sourced spec dialogs',async({page})=>{
  for(const [id,names] of [
    ['mof-development',['ZIF-8','ZIF-67','UiO-66','HKUST-1 (Cu-BTC)']],
    ['cof-development',['COF-5','COF-300','TpPa-1']],
    ['functional-polymer-development',['Polyethylene glycol (PEG)','Poly(acrylic acid) (PAA)','Poly(vinylidene fluoride) (PVDF)','Polyaniline (PANI)']],
    ['resin-development',['Epoxy resins','Ion-exchange resins']],
    ['ligand-development',["2-Methylimidazole — ligands for ZIFs","Terephthalic acid — ligands for UiO frameworks","Trimesic acid — ligands for Cu-BTC frameworks","2,2'-Bipyridine — ligands for coordination catalysts"]],
  ]){
    await page.goto('/#/services/'+id);
    await expect(page.locator('.model-option h3')).toHaveText(names);
    await expect(page.locator('.model-option p')).toHaveCount(names.length);
    for(const row of await page.locator('.model-option').all()){
      await row.getByRole('button').click();
      await expect(page.locator('#spec-dialog .spec-source')).toContainText('Source:');
      await expect(page.locator('#spec-dialog')).toContainText('not a JAFORD measurement');
      await page.getByRole('button',{name:'Close specification'}).click();
    }
  }
});

test('workstation model table preserves official feature differences',async({page},info)=>{
  await page.goto('/#/products/electrochemical-workstation');
  await expect(page.locator('.model-option')).toHaveCount(14);
  for(const [model,eis,galvano] of [['CHI600F',false,false],['CHI604F',true,false],['CHI660F',true,true],['CHI700F',false,false],['CHI760F',true,true]]){
    await page.getByRole('button',{name:'View Spec: '+model,exact:true}).click();
    const dialog=page.locator('#spec-dialog');
    await expect(dialog.locator('tr').filter({hasText:'AC impedance'}).locator('td')).toHaveText(eis?'Included; 0.00001 Hz to 3 MHz':'Not included in the model comparison');
    await expect(dialog.locator('tr').filter({hasText:'Galvanostat'}).locator('td')).toHaveText(galvano?'Included':'Not included in the model comparison');
    await page.keyboard.press('Escape');
  }
  if(['desktop','mobile'].includes(info.project.name)){
    await page.getByRole('button',{name:'View Spec: CHI760F',exact:true}).click();
    await page.screenshot({path:`/tmp/jaford-spec-${info.project.name}.png`});
  }
});
