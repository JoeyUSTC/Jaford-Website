import {test, expect} from '@playwright/test';
import {dashboardHTML, dashboardScript} from '../analytics/dashboard.js';
import {analyticsURL} from '../src/analytics.js';

test('owner insights is unlisted and never embeds private records in GitHub Pages',async({page})=>{
  const external=[];
  const collector=analyticsURL(process.env.VITE_ANALYTICS_COLLECT_URL,'/collect');
  const admin=analyticsURL(process.env.VITE_ANALYTICS_ADMIN_URL,'/admin');
  if(collector)await page.route(collector,route=>route.fulfill({status:204}));
  page.on('request',request=>{if(new URL(request.url()).origin!=='http://127.0.0.1:4173'&&request.url()!==collector)external.push(request.url());});
  await page.goto('/');
  await expect(page.locator('a[href*="owner-insights"]')).toHaveCount(0);
  await page.goto('/#/owner-insights');
  await expect(page.locator('h1')).toHaveText('Website insights');
  if(admin)await expect(page.getByRole('link',{name:'Open private dashboard'})).toHaveAttribute('href',admin);
  else await expect(page.locator('main')).toContainText('No visitor records are being collected.');
  await expect(page.locator('meta[data-private-insights]')).toHaveAttribute('content','noindex, nofollow, noarchive');
  await expect(page.locator('main table, main svg, main input')).toHaveCount(0);
  await page.goto('/#/contact');
  await expect(page.locator('meta[data-private-insights]')).toHaveCount(0);
  await expect(page.locator('#home-contact-form')).toBeVisible();
  expect(external).toEqual([]);
});

test('protected dashboard renders records safely, maps locations and clears data after session failure',async({page})=>{
  // Reserved documentation IPs and synthetic names, never public visitor data.
  const name='<img src=x onerror="window.injected=true"> Example University';
  const fixture={updatedAt:'2026-10-19T12:00:00Z',collectionEnabled:true,windowDays:30,totalViews:8,windowViews:4,uniqueIPs:2,
    locations:[{city:'Singapore',country:'SG',latitude:1.3,longitude:103.8,views:4}],
    institutions:[{institution:name,views:4,last_seen:1792411200}],
    visits:[{occurred_at:1792411200,ip:'198.51.100.8',city:'Singapore',country:'SG',network:name,asn:64500,institution:name}]};
  await page.route('**/admin',route=>route.fulfill({contentType:'text/html',body:dashboardHTML}));
  await page.route('**/admin/app.js',route=>route.fulfill({contentType:'text/javascript',body:dashboardScript}));
  let deny=false;
  await page.route('**/admin/data',route=>route.fulfill({status:deny?403:200,contentType:'application/json',body:JSON.stringify(fixture)}));
  await page.goto('/admin');
  await expect(page.locator('#total')).toHaveText('8');
  await expect(page.locator('#views')).toHaveText('4');
  await expect(page.locator('#ips')).toHaveText('2');
  await expect(page.locator('#visit-rows')).toContainText('198.51.100.8');
  await expect(page.locator('#institution-rows td').first()).toHaveText(name);
  await expect(page.locator('#points circle')).toHaveCount(1);
  await expect(page.locator('#points circle')).toHaveAttribute('aria-label','Singapore, SG: 4 recorded views');
  await expect(page.locator('main img')).toHaveCount(0);
  expect(await page.evaluate(()=>window.injected)).toBeUndefined();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize().width);
  deny=true;
  await page.getByRole('button',{name:'Refresh',exact:true}).click();
  await expect(page.locator('#status')).toContainText('could not be loaded');
  await expect(page.locator('#total')).toHaveText('—');
  await expect(page.locator('#visit-rows tr, #institution-rows tr, #points circle')).toHaveCount(0);
});
