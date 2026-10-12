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

test('social identities have no fake links and the shared contact form is unchanged',async({page})=>{
 await page.goto('/#/contact');
 const social=page.locator('.social-presence');
 await expect(social.locator('.social-channel')).toHaveText(['WeChat Official Account','X (Twitter)','Taobao']);
 await expect(social.locator('svg')).toHaveCount(3);
 await expect(social.locator('a,button')).toHaveCount(0);
 await expect(social).toContainText('Account links coming soon.');
 await expect(page.locator('#home-contact-form input')).toHaveCount(2);
 await expect(page.locator('#home-contact-form textarea')).toHaveCount(1);
 await expect(page.getByRole('button',{name:'Prepare email',exact:true})).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize().width);
 await page.goto('/');await expect(page.locator('.social-presence')).toHaveCount(0);
});
