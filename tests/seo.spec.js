import {test, expect} from '@playwright/test';
import {createServer} from 'node:http';
import {readFileSync, existsSync, statSync} from 'node:fs';
import {resolve, extname} from 'node:path';
import {technologies} from '../src/technologies.js';

test('public pages have complete content and navigation without JavaScript', async({browser},testInfo)=>{
  const context=await browser.newContext({javaScriptEnabled:false,viewport:testInfo.project.use.viewport,isMobile:testInfo.project.use.isMobile,hasTouch:testInfo.project.use.hasTouch});
  const page=await context.newPage();
  for(const [path,title] of [['/','We Scale Innovation'],['/battery-technology/','Battery Technology'],['/services/custom-3d-printing/','Custom 3D Printing for R&D'],['/products/hard-carbon/','Hard Carbon'],['/cases/resin-route-process-scale-up/','Taking a proposed resin route into kilogram-scale synthesis'],['/contact/','Contact Us']]){
    const response=await page.goto(`http://127.0.0.1:4173${path}`);
    expect(response.status()).toBe(200);
    await expect(page.locator('h1')).toHaveText(title);
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href',`https://jaford.com${path}`);
    await expect(page.locator('meta[name=robots]')).toHaveAttribute('content',/^index,/);
    await expect(page.locator('#navigation a')).toHaveCount(7);
    await expect(page.locator('main a[href^="#/"]')).toHaveCount(0);
    expect(await page.locator('main').innerText()).not.toBe('');
  }
  await page.goto('http://127.0.0.1:4173/');
  await page.locator('#custom-rd .sector-card a').first().click();
  await expect(page.locator('h1')).toHaveText('Custom 3D Printing for R&D');
  await expect(page.locator('.service-story')).toContainText('PLA, PETG');
  expect(await page.locator('main img').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
  await page.goto('http://127.0.0.1:4173/owner-insights/');
  await expect(page.locator('meta[name=robots]')).toHaveAttribute('content',/^noindex,/);
  await page.goto('http://127.0.0.1:4173/technologies/battery-technology/');
  await expect(page).toHaveURL('http://127.0.0.1:4173/battery-technology/');
  await expect(page.locator('h1')).toHaveText('Battery Technology');
  await context.close();
});

test('all categories use flat URLs and old paths, fragments and queries migrate safely',async({page})=>{
  for(const area of technologies){
    const response=await page.goto(`/${area.id}/`);
    expect(response.status()).toBe(200);
    await expect(page.locator('h1')).toHaveText(area.name);
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href',`https://jaford.com/${area.id}/`);
    const link=page.locator('#navigation').getByRole('link',{name:area.nav,exact:true,includeHidden:true});
    await expect(link).toHaveAttribute('href',`/${area.id}/`);
    await expect(link).toHaveAttribute('aria-current','page');
  }
  await page.goto('/technologies/battery-materials/?utm_source=old#project-cases');
  await expect(page).toHaveURL(/\/battery-technology\/\?utm_source=old#project-cases$/);
  await expect(page.locator('h1')).toHaveText('Battery Technology');
  await page.goto('/products/glass-fiber-1823-047/?utm_source=old');
  await expect(page).toHaveURL(/\/products\/glass-fiber-filter\/\?utm_source=old$/);
  await expect(page.locator('h1')).toHaveText('Glass Fiber Filter');
  await page.reload();
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href','https://jaford.com/products/glass-fiber-filter/');
  await page.goto('/services/polymer-resin-synthesis/');
  await expect(page).toHaveURL(/\/services\/molecule-polymer-synthesis\/$/);
  await expect(page.locator('h1')).toHaveText('Molecule and Polymer Synthesis');
  await page.locator('.breadcrumbs').getByRole('link',{name:'Custom R&D',exact:true}).click();
  await expect(page).toHaveURL(/\/custom-rd\/$/);
  await page.goBack();
  await expect(page.locator('h1')).toHaveText('Molecule and Polymer Synthesis');
});

test('clean URLs, legacy links, history and metadata stay in sync',async({page})=>{
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/?utm_source=compat#/products/qms029d?area=battery-materials');
  await expect(page).toHaveURL(/\/products\/electrolyte\/\?utm_source=compat$/);
  await expect(page.locator('h1')).toHaveText('Electrolyte');
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href','https://jaford.com/products/electrolyte/');
  await page.reload();
  await expect(page.locator('.breadcrumbs')).toContainText('Battery Technology');
  await page.locator('.wordmark').click();
  await expect(page.locator('meta[name=robots]')).toHaveAttribute('content',/^index,/);
  await page.goBack();
  await expect(page.locator('h1')).toHaveText('Electrolyte');
  await page.goForward();
  await expect(page.locator('h1')).toHaveText('We Scale Innovation');
  await page.goto('/#/services/small-molecule-synthesis');
  await expect(page).toHaveURL(/\/services\/molecule-polymer-synthesis\/$/);
  await expect(page.locator('meta[name=description]')).toHaveAttribute('content',/Custom organic and polymer synthesis/);
  const graph=JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
  expect(graph['@graph'].find(node=>node['@type']==='Service').name).toBe('Molecule and Polymer Synthesis');
  await page.goto('/owner-insights/');
  await expect(page.locator('meta[name=robots]')).toHaveAttribute('content',/^noindex,/);
  await page.locator('footer').getByRole('link',{name:'Contact Us',exact:true}).click();
  await expect(page.locator('meta[name=robots]')).toHaveAttribute('content',/^index,/);
  await expect(page.locator('meta[name=description]')).toHaveCount(1);
  await expect(page.locator('link[rel=canonical]')).toHaveCount(1);
  await page.goto('/products/?q=carbon');
  await expect(page.locator('meta[name=robots]')).toHaveAttribute('content',/^noindex,/);
  await page.getByRole('link',{name:'Reset filters'}).click();
  await expect(page.locator('meta[name=robots]')).toHaveAttribute('content',/^index,/);
  const response=await page.goto('/missing/deep/page/');
  expect(response.status()).toBe(404);
  await expect(page.locator('h1')).toHaveText('Page not found');
  await expect(page.locator('meta[name=robots]')).toHaveAttribute('content',/^noindex,/);
  await expect(page.locator('link[rel=canonical]')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('static documents also work beneath the original GitHub Pages mount',async({page})=>{
  const output=resolve('dist');
  const server=createServer((request,response)=>{
    const pathname=new URL(request.url,'http://localhost').pathname;
    const relative=pathname.replace(/^\/Jaford-Website\//,'');
    let file=resolve(output,relative);
    if(file!==output&&!file.startsWith(output+'/')){response.writeHead(404).end();return;}
    if(existsSync(file)&&statSync(file).isDirectory())file=resolve(file,'index.html');
    if(!existsSync(file)){response.writeHead(404).end();return;}
    response.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.json':'application/json'})[extname(file)]||'application/octet-stream');
    response.end(readFileSync(file));
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base=`http://127.0.0.1:${server.address().port}/Jaford-Website`;
  try{
    await page.goto(`${base}/services/custom-3d-printing/`);
    await expect(page.locator('h1')).toHaveText('Custom 3D Printing for R&D');
    await expect(page.locator('.wordmark')).toHaveAttribute('href','/Jaford-Website/');
    expect(await page.locator('main img').evaluate(async img=>{await img.decode();return img.naturalWidth;})).toBeGreaterThan(0);
    await page.locator('.wordmark').click();
    await expect(page).toHaveURL(`${base}/`);
    await expect(page.locator('h1')).toHaveText('We Scale Innovation');
    await page.locator('#custom-rd .sector-card a').first().click();
    await page.reload();
    await expect(page.locator('.service-story')).toContainText('PLA, PETG');
    await page.goto(`${base}/#/technologies/advanced-materials`);
    await expect(page).toHaveURL(`${base}/functional-materials/`);
    await expect(page.locator('h1')).toHaveText('Functional Materials');
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href','https://jaford.com/functional-materials/');
  }finally{await new Promise(resolve=>server.close(resolve));}
});
