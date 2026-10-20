// Public, unauthenticated GET checks only. HTTP reachability is not proof that
// a logged-out visitor can see a profile through a platform's access controls.
import {socialChannels} from "../src/contact-presence.js";
import {appendFileSync} from "node:fs";

const accounts=socialChannels.filter(channel=>channel.url);
const results=await Promise.all(accounts.map(async channel=>{
  try {
    const response=await fetch(channel.url,{
      signal:AbortSignal.timeout(20000),redirect:"follow",
      headers:{"User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36","Accept":"text/html,application/xhtml+xml"},
    });
    const reader=response.body?.getReader();
    const chunks=[];let size=0;
    if(reader)try{
      while(size<512*1024){const {value,done}=await reader.read();if(done)break;chunks.push(value);size+=value.length;}
    }finally{await reader.cancel().catch(()=>{});}
    const body=Buffer.concat(chunks).toString("utf8");
    const title=(body.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]||"").replace(/\s+/g," ").trim().slice(0,160);
    const restriction=/环境异常|访问过于频繁|安全验证|验证码|captcha|access denied|unusual traffic|verify.{0,30}(?:human|identity)|security verification/i.test(body);
    const missing=[404,410].includes(response.status);
    const status=missing?"not found":restriction?"platform verification required":response.ok?"HTTP reachable; profile visibility requires browser/app confirmation":"platform access not confirmed";
    return {channel:channel.name,status,http:response.status,finalURL:response.url,title};
  }catch(error){return {channel:channel.name,status:"network access not confirmed",error:error.cause?.code||error.name};}
}));
for(const result of results)console.log(JSON.stringify(result));
console.log("A successful HTTP response may still show login, app-only content or anti-bot verification. Do not interpret this audit as a universal access guarantee.");
if(process.env.GITHUB_STEP_SUMMARY)appendFileSync(process.env.GITHUB_STEP_SUMMARY,"\nSocial link access audit (unauthenticated):\n\n"+results.map(result=>`- ${result.channel}: ${result.status}${result.http?` (HTTP ${result.http})`:""}`).join("\n")+"\n");
if(results.some(result=>result.status==="not found"))process.exitCode=1;
