import {test} from "node:test";
import assert from "node:assert/strict";
import {mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync} from "node:fs";
import {tmpdir} from "node:os";
import {resolve, join} from "node:path";
import {spawnSync} from "node:child_process";

const script = resolve("scripts/indexnow.mjs");
const manifest = JSON.parse(readFileSync("dist/seo-manifest.json","utf8"));
const key = readFileSync("dist/indexnow-key.txt","utf8").trim();
function run({deployedRevision=manifest.revision,previous,expected=Object.keys(manifest.pages),denyNetwork=false}={}) {
  const directory=mkdtempSync(join(tmpdir(),"jaford-indexnow-test-"));
  try {
    mkdirSync(join(directory,"dist"));
    writeFileSync(join(directory,"dist/seo-manifest.json"),JSON.stringify(manifest));
    writeFileSync(join(directory,"dist/indexnow-key.txt"),key);
    if(previous)writeFileSync(join(directory,".seo-indexnow-previous.json"),JSON.stringify(previous));
    const mock=`import assert from 'node:assert/strict';
globalThis.fetch=async(url,options)=>{
  if(${JSON.stringify(denyNetwork)})throw new Error('No network expected');
  if(url.startsWith('https://jaford.com/version.json?'))return new Response(JSON.stringify({revision:${JSON.stringify(deployedRevision)}}));
  if(url==='https://jaford.com/indexnow-key.txt')return new Response(${JSON.stringify(key)});
  assert.equal(url,'https://api.indexnow.org/indexnow');
  assert.equal(options.method,'POST');
  const body=JSON.parse(options.body);
  assert.equal(body.host,'jaford.com');
  assert.equal(body.key,${JSON.stringify(key)});
  assert.deepEqual(body.urlList,${JSON.stringify(expected)});
  console.log('MOCK_POST_CALLED');
  return new Response('',{status:202});
};`;
    return spawnSync(process.execPath,["--import",`data:text/javascript,${encodeURIComponent(mock)}`,script,"submit"],{
      cwd:directory,encoding:"utf8",env:{...process.env,SEO_BUILD_DIR:"dist",GITHUB_STEP_SUMMARY:""},
    });
  } finally {rmSync(directory,{recursive:true,force:true});}
}
test("IndexNow only notifies public URLs after the exact deployed revision and key are verified",()=>{
  const result=run();
  assert.equal(result.status,0,result.stderr);
  assert.match(result.stdout,/MOCK_POST_CALLED/);
  assert.match(result.stdout,/HTTP 202; ownership validation pending/);
  assert.match(result.stdout,/not a Google Search Console submission/);
});
test("IndexNow refuses to announce an unverified deployment",()=>{
  const result=run({deployedRevision:"different-revision"});
  assert.equal(result.status,1);
  assert.match(result.stderr,/Cannot confirm this revision/);
  assert.ok(!result.stdout.includes("MOCK_POST_CALLED"));
});
test("unchanged content causes no notification or network request",()=>{
  const result=run({previous:manifest,denyNetwork:true});
  assert.equal(result.status,0,result.stderr);
  assert.match(result.stdout,/No public content changes/);
});
test("deleted public URLs are notified without resubmitting unchanged pages",()=>{
  const removed="https://jaford.com/services/discontinued-service/";
  const result=run({previous:{...manifest,pages:{...manifest.pages,[removed]:"a".repeat(64)}},expected:[removed]});
  assert.equal(result.status,0,result.stderr);
  assert.match(result.stdout,/received 1 URLs/);
});
test("private URLs in a previous manifest fail closed",()=>{
  const result=run({previous:{...manifest,pages:{"https://jaford.com/owner-insights/":"a".repeat(64)}}});
  assert.equal(result.status,1);
  assert.match(result.stderr,/Unexpected manifest URL/);
  assert.ok(!result.stdout.includes("MOCK_POST_CALLED"));
});
