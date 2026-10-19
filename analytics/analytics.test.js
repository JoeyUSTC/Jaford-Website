import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import worker, {possibleInstitution} from './worker.js';
import {ownerAuthorized} from './auth.js';
import {analyticsURL, createHomepageTracker} from '../src/analytics.js';

const pair = await crypto.subtle.generateKey({name:'RSASSA-PKCS1-v1_5',modulusLength:2048,publicExponent:new Uint8Array([1,0,1]),hash:'SHA-256'},true,['sign','verify']);
const jwk = {...await crypto.subtle.exportKey('jwk',pair.publicKey),kid:'test-key'};
const encode = value => Buffer.from(typeof value==='string'?value:JSON.stringify(value)).toString('base64url');
const settings = {ACCESS_TEAM_DOMAIN:'jaford-test.cloudflareaccess.com',ACCESS_AUD:'owner-app',OWNER_EMAIL:'owner@example.test',COLLECTION_ENABLED:'true'};
const now = () => Math.floor(Date.now()/1000);
async function token(overrides={}) {
  const input=encode({alg:'RS256',kid:jwk.kid})+'.'+encode({iss:'https://'+settings.ACCESS_TEAM_DOMAIN,aud:[settings.ACCESS_AUD],email:settings.OWNER_EMAIL,exp:now()+300,...overrides});
  return input+'.'+Buffer.from(await crypto.subtle.sign('RSASSA-PKCS1-v1_5',pair.privateKey,new TextEncoder().encode(input))).toString('base64url');
}
const keys = async () => Response.json({keys:[jwk]});
function database() {
  const sqlite=new DatabaseSync(':memory:');
  sqlite.exec(readFileSync(new URL('./schema.sql',import.meta.url),'utf8'));
  const DB={prepare(sql){
    let values=[];
    return {bind(...args){values=args;return this;},async run(){return sqlite.prepare(sql).run(...values);},async all(){return {results:sqlite.prepare(sql).all(...values)};}};
  },async batch(statements){return Promise.all(statements.map(statement=>statement.all()));}};
  return {sqlite,env:{...settings,DB}};
}
function visit(id=crypto.randomUUID(),extra={}) {
  const req=new Request('https://stats.example.test/collect',{method:'POST',headers:{Origin:'https://jaford.com','User-Agent':'Mozilla/5.0','CF-Connecting-IP':'198.51.100.8'},body:JSON.stringify({id,page:'home',...extra})});
  Object.defineProperty(req,'cf',{value:{country:'SG',city:'Singapore',latitude:'1.3',longitude:'103.8',asOrganization:'Example University',asn:64500}});
  return req;
}

test('Access checks real signatures, expiry, audience and the exact owner email',async()=>{
  const check=async jwt=>ownerAuthorized(new Request('https://stats.example.test/admin/data',{headers:{'Cf-Access-Jwt-Assertion':jwt}}),settings,keys);
  const valid=await token();
  assert.equal(await check(valid),true);
  assert.equal(await check(valid.slice(0,-8)+'AAAAAAAA'),false);
  for(const bad of [{email:'someone@example.test'},{aud:['other-app']},{exp:now()-1},{nbf:now()+100},{iss:'https://attacker.example.test'}])assert.equal(await check(await token(bad)),false);
  assert.equal(await ownerAuthorized(new Request('https://stats.example.test/admin'),settings,keys),false);
});

test('anonymous and unconfigured admin endpoints fail closed without reading records',async()=>{
  let reads=0;
  const env={...settings,DB:{prepare(){reads++;throw new Error('must not read');}}};
  for(const path of ['/admin','/admin/app.js','/admin/data']) {
    const result=await worker.fetch(new Request('https://stats.example.test'+path),env);
    assert.equal(result.status,403);assert.match(result.headers.get('Cache-Control'),/no-store/);
    assert.equal(result.headers.get('Access-Control-Allow-Origin'),null);
  }
  assert.equal(reads,0);
  assert.equal((await worker.fetch(new Request('https://stats.example.test/admin'),{DB:env.DB})).status,503);
});

test('collection deduplicates retries, trusts edge IP instead of body IP, and increments aggregate once',async()=>{
  const {sqlite,env}=database();
  try {
    const id=crypto.randomUUID();
    for(let n=0;n<2;n++)assert.equal((await worker.fetch(visit(id,{ip:'203.0.113.99'}),env)).status,204);
    assert.equal(sqlite.prepare('SELECT COUNT(*) AS n FROM visits').get().n,1);
    assert.equal(sqlite.prepare('SELECT ip FROM visits').get().ip,'198.51.100.8');
    assert.equal(sqlite.prepare('SELECT views FROM totals').get().views,1);
    assert.equal(sqlite.prepare('SELECT institution FROM visits').get().institution,'Example University');
  } finally {sqlite.close();}
});

test('collection rejects foreign origins, invalid/oversized events and non-home pages',async()=>{
  const {sqlite,env}=database();
  try {
    const foreign=visit();foreign.headers.set('Origin','https://other.example.test');
    assert.equal((await worker.fetch(foreign,env)).status,403);
    assert.equal((await worker.fetch(visit('not-a-uuid'),env)).status,400);
    assert.equal((await worker.fetch(visit(undefined,{page:'contact'}),env)).status,400);
    assert.equal((await worker.fetch(visit(undefined,{extra:'x'.repeat(2000)}),env)).status,400);
    assert.equal((await worker.fetch(visit(),{...env,COLLECTION_ENABLED:'false'})).status,503);
    assert.equal(sqlite.prepare('SELECT views FROM totals').get().views,0);
  } finally {sqlite.close();}
});

test('privacy preferences, known bots and rate limits do not become visits',async()=>{
  const {sqlite,env}=database();
  try {
    for(const [header,value] of [['DNT','1'],['Sec-GPC','1'],['User-Agent','Googlebot']]) {
      const request=visit();request.headers.set(header,value);
      assert.equal((await worker.fetch(request,env)).status,204);
    }
    assert.equal((await worker.fetch(visit(),{...env,RATE_LIMITER:{limit:async()=>({success:false})}})).status,429);
    assert.equal(sqlite.prepare('SELECT views FROM totals').get().views,0);
  } finally {sqlite.close();}
});

test('signed owner receives real aggregates; retention removes raw IP records but keeps total',async()=>{
  const {sqlite,env}=database();
  const previousFetch=globalThis.fetch;
  try {
    await worker.fetch(visit(),env);
    sqlite.prepare('INSERT INTO visits(event_id,occurred_at,ip) VALUES (?,?,?)').run(crypto.randomUUID(),now()-32*86400,'203.0.113.9');
    globalThis.fetch=keys;
    const response=await worker.fetch(new Request('https://stats.example.test/admin/data',{headers:{'Cf-Access-Jwt-Assertion':await token()}}),env);
    assert.equal(response.status,200);
    const data=await response.json();
    assert.equal(data.collectionEnabled,true);assert.equal(data.totalViews,2);assert.equal(data.windowViews,1);assert.equal(data.uniqueIPs,1);
    assert.equal(data.locations[0].latitude,1.3);assert.equal(data.institutions[0].institution,'Example University');
    assert.equal(data.visits.length,1);
    const pending=[];await worker.scheduled(null,env,{waitUntil:p=>pending.push(p)});await Promise.all(pending);
    assert.equal(sqlite.prepare('SELECT COUNT(*) AS n FROM visits').get().n,1);
    assert.equal(sqlite.prepare('SELECT views FROM totals').get().views,2);
  } finally {globalThis.fetch=previousFetch;sqlite.close();}
});

test('institution inference excludes broad networks and ordinary ISPs',()=>{
  assert.equal(possibleInstitution('National University of Singapore'),'National University of Singapore');
  assert.equal(possibleInstitution('Massachusetts Institute of Technology'),'Massachusetts Institute of Technology');
  for(const name of ['China Education and Research Network','AARNet','Google LLC','Amazon.com Inc.','Singapore Telecom',''])assert.equal(possibleInstitution(name),null);
});

function browserContext() {
  const document=new EventTarget();document.visibilityState='visible';
  return {document,crypto};
}
test('tracker records one visible entry, counts return visits and excludes hidden routes',()=>{
  const browser=browserContext();const sent=[];
  const tracker=createHomepageTracker({endpoint:'https://stats.example.test/collect',browser,client:{},send:(url,options)=>sent.push({url,options})});
  tracker(true);tracker(true);tracker(false);tracker(true);
  assert.equal(sent.length,2);
  assert.deepEqual(Object.keys(JSON.parse(sent[0].options.body)).sort(),['id','page']);
  assert.equal(sent[0].options.credentials,'omit');
  tracker(false);browser.document.visibilityState='hidden';tracker(true);assert.equal(sent.length,2);
  browser.document.visibilityState='visible';browser.document.dispatchEvent(new Event('visibilitychange'));assert.equal(sent.length,3);
  browser.document.dispatchEvent(new Event('visibilitychange'));assert.equal(sent.length,3);
});
test('tracker is inactive when unconfigured, opted out or blocked and never breaks browsing',()=>{
  let requests=0;
  for(const options of [{endpoint:''},{endpoint:'https://stats.example.test/collect',client:{doNotTrack:'1'}},{endpoint:'https://stats.example.test/collect',client:{globalPrivacyControl:true}}]) {
    const tracker=createHomepageTracker({browser:browserContext(),client:{},send:()=>requests++,...options});tracker(true);
  }
  assert.equal(requests,0);
  const tracker=createHomepageTracker({endpoint:'https://stats.example.test/collect',browser:browserContext(),client:{},send:()=>{throw new Error('blocked');}});
  assert.doesNotThrow(()=>tracker(true));
  assert.equal(analyticsURL('javascript:alert(1)','/admin'),'');
  assert.equal(analyticsURL('https://user:password@example.test/admin','/admin'),'');
});
