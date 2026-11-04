// One-time visual review only; never part of the published site.
const sharp = require(process.env.RUNNER_TEMP + "/jaford-artwork/node_modules/sharp");
const {chromium} = require(process.cwd()+"/site/node_modules/@playwright/test");
const {spawn} = require("node:child_process");
const fs = require("node:fs");
(async()=>{
 const server=spawn(process.execPath,["node_modules/vite/bin/vite.js","preview","--host","127.0.0.1","--port","4173","--strictPort"],{cwd:process.cwd()+"/site",stdio:"inherit"});
 let browser;
 try {
  for(let i=0;i<60;i++){try{if((await fetch("http://127.0.0.1:4173/")).ok)break;}catch{}await new Promise(r=>setTimeout(r,250));}
  browser=await chromium.launch();
  fs.mkdirSync("review",{recursive:true});
  const reports=[];
  for(const [name,width,height] of [["desktop",1440,1000],["mobile",390,844]]){
   const page=await browser.newPage({viewport:{width,height},isMobile:name==="mobile",hasTouch:name==="mobile"});
   await page.goto("http://127.0.0.1:4173/");
   for(const img of await page.locator(".sector-card img").all()){await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode());}
   await page.evaluate(()=>window.scrollTo({top:0,behavior:"instant"}));
   const frames=await page.locator(".sector-card .product-artwork").evaluateAll(items=>items.map(el=>{const b=el.getBoundingClientRect();return{x:b.x,y:b.y,w:b.width,h:b.height};}));
   const png=await page.screenshot({fullPage:true});
   const preview=await sharp(png).webp({quality:88}).toBuffer();
   fs.writeFileSync("review/home-"+name+".webp",preview);
   const encoded=preview.toString("base64");
   for(let i=0;i<encoded.length;i+=4096)console.log("JAFORD_REVIEW_IMAGE_"+name+" "+encoded.slice(i,i+4096));
   const {data,info}=await sharp(png).removeAlpha().raw().toBuffer({resolveWithObject:true});
   const samples=frames.map(b=>[2,b.w-3].map(dx=>{const x=Math.round(b.x+dx),y=Math.round(b.y+2),i=(y*info.width+x)*3;return Array.from(data.subarray(i,i+3));}));
   const maxDifference=Math.max(...samples.flat().map(rgb=>Math.max(...rgb.map((n,i)=>Math.abs(n-[245,241,233][i])))));
   const report={name,width,cards:frames.length,maxBackgroundDifference:maxDifference,samples};
   reports.push(report);console.log(JSON.stringify(report));
   await page.close();
  }
  fs.writeFileSync("review/report.json",JSON.stringify(reports,null,2));
 }finally{if(browser)await browser.close();server.kill();}
})().catch(error=>{console.error(error);process.exitCode=1;});
