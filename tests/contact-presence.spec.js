import {test,expect} from '@playwright/test';

test('region popup supports hover, keyboard and touch without claiming new project locations',async({page},info)=>{
 await page.goto('/');
 const trigger=page.getByRole('button',{name:'Countries & regions'});
 const popup=page.locator('#regions-popup');
 await expect(popup).not.toBeVisible();
 if(info.project.name==='desktop'){
  await trigger.hover();await expect(popup).toBeVisible();
  await popup.hover();await expect(popup).toBeVisible();
  await page.locator('h1').hover();await expect(popup).not.toBeVisible();
  await trigger.focus();await page.keyboard.press('Enter');
 }else{await trigger.click();}
 await expect(popup).toBeVisible();
 await expect(popup.locator('li > span')).toHaveText(['Australia','Canada','Hong Kong','Malaysia','Saudi Arabia','Singapore','Taiwan','United Arab Emirates','United States']);
 await expect(popup.locator('h2,p,small')).toHaveCount(0);
 await expect(trigger.locator('svg')).toBeVisible();
 expect(await popup.evaluate(el=>el.getBoundingClientRect().right)).toBeLessThanOrEqual(page.viewportSize().width);
 await page.keyboard.press('Escape');await expect(popup).not.toBeVisible();
 await trigger.focus();await page.keyboard.press('Enter');await expect(popup).toBeVisible();
 await page.locator('h1').click();await expect(popup).not.toBeVisible();
 await expect(page.locator('[data-count-target="9"]')).toHaveText('9');
 await page.goto('/#/contact');await page.goto('/#/');
 await trigger.focus();await page.keyboard.press('Enter');await expect(popup).toBeVisible();
});

test('five compact social logos follow both contact forms without fake links',async({page})=>{
 const names=['Twitter','LinkedIn','Taobao','WeChat Official Account','Douyin'];
 for(const route of ['/#/contact','/']){
  await page.goto(route);
  const social=page.getByRole('region',{name:'Social channels'});
  await expect(social.locator('svg')).toHaveCount(5);
  await expect(social.locator('a,button,[tabindex],h2,p')).toHaveCount(0);
  await expect(social).toHaveText('');
  for(const name of names) await expect(social.getByRole('img',{name,exact:true})).toBeVisible();
  const boxes=await social.locator('.social-channel').evaluateAll(items=>items.map(el=>{
   const box=el.getBoundingClientRect();return {top:box.top,right:box.right,width:box.width};
  }));
  expect(new Set(boxes.map(box=>box.top)).size).toBe(1);
  expect(Math.max(...boxes.map(box=>box.right))).toBeLessThanOrEqual(page.viewportSize().width);
  expect(Math.max(...boxes.map(box=>box.width))).toBeLessThanOrEqual(36);
  const contactBox=await page.locator('.home-contact').boundingBox();
  const socialBox=await social.boundingBox();
  expect(socialBox.y).toBeGreaterThanOrEqual(contactBox.y+contactBox.height);
  await expect(page.locator('#home-contact-form input')).toHaveCount(2);
  await expect(page.locator('#home-contact-form textarea')).toHaveCount(1);
  await expect(page.getByRole('button',{name:'Prepare email',exact:true})).toBeVisible();
  await expect(page.locator('footer a')).toHaveText(['Contact Us','Back to Top']);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize().width);
 }
});
