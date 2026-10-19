import {worldLand} from './world-land.js';

export const dashboardHTML = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow,noarchive">
<title>Private website insights — JAFORD</title><style>
*{box-sizing:border-box}body{margin:0;background:#f5f1e9;color:#242824;font:15px/1.6 system-ui,sans-serif}
main{max-width:1440px;margin:auto;padding:40px 48px}header{display:flex;justify-content:space-between;gap:20px;align-items:center}
h1{font-size:30px;margin:0}h2{font-size:20px;margin:0 0 16px}p{color:#66685f;margin:8px 0 20px}
button{padding:9px 16px;background:transparent;border:1px solid #7c9084;font:inherit;color:#32614e;cursor:pointer}button:disabled{opacity:.5}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin:28px 0}.stats div,section{border:1px solid #dcd5c9;background:#faf8f2;padding:24px}
dt{font-size:14px;color:#66685f}dd{font-size:36px;color:#3b6ea5;margin:6px 0 0}section{margin:22px 0}.scroll{overflow:auto}
table{width:100%;border-collapse:collapse;min-width:720px;text-align:left}th,td{padding:12px;border-bottom:1px solid #e5ded2;vertical-align:top}
th{font-size:12px;color:#66685f;font-weight:500}td{font-size:13px;overflow-wrap:anywhere}.ip{white-space:nowrap;font-variant-numeric:tabular-nums}
svg{width:100%;height:auto;display:block;background:#eef1ec;border:1px solid #e0e4dc}.land{fill:#d4d8ce;stroke:#faf8f2;stroke-width:.5}
.point{fill:#3b6ea5;fill-opacity:.7;stroke:#faf8f2;stroke-width:1.5}.point:focus{outline:none;stroke:#173f6b;stroke-width:3}
.locations{display:flex;flex-wrap:wrap;gap:8px 22px;padding-left:20px;color:#66685f;font-size:13px}.note{font-size:13px}
#status{min-height:24px}#institutions table{min-width:440px}a{color:#32614e}.empty{padding:18px 0;color:#66685f}
@media(max-width:650px){main{padding:24px 20px}.stats{grid-template-columns:1fr;gap:10px}.stats div{padding:15px 20px}dd{font-size:30px}section{padding:18px}h1{font-size:24px}header{align-items:flex-start}}
</style><script src="/admin/app.js" defer></script></head><body><main>
<header><div><h1>Website insights</h1><p>Owner dashboard · Homepage only</p></div><button id="refresh" type="button">Refresh</button></header>
<p id="status" role="status">Loading private records…</p>
<dl class="stats"><div><dt>Recorded views · All time</dt><dd id="total">—</dd></div><div><dt>Views · Last 30 days</dt><dd id="views">—</dd></div><div><dt>Different IPs · Last 30 days</dt><dd id="ips">—</dd></div></dl>
<p class="note">IP addresses are network connections, not people. Shared networks, VPNs, bots and blocked requests affect coverage. History starts when collection is enabled.</p>
<section><h2>Approximate visit locations</h2><svg id="map" viewBox="0 0 900 450" role="img" aria-label="Approximate homepage visit locations"><title>Approximate visit locations</title><g id="land"></g><g id="points"></g></svg><p class="note">Last 30 days · Approximate IP geolocation, not a visitor's precise location. Up to 1,000 mapped locations.</p><ul id="locations" class="locations"></ul></section>
<section id="institutions"><h2>Possible universities & research institutions</h2><p class="note">Matched from the network owner's name. A match does not confirm who visited, their affiliation, or that the institution is a customer. Shared academic networks are not attributed to individual institutions.</p><div class="scroll"><table><thead><tr><th>Possible institution / network owner</th><th>Recorded views</th><th>Last seen · UTC</th></tr></thead><tbody id="institution-rows"></tbody></table></div><p id="institution-empty" class="empty" hidden>No matching institutional networks recorded in the last 30 days.</p><p class="note">Up to 100 network matches, most recently seen first. New matches appear automatically after a refresh.</p></section>
<section><h2>Recent homepage visits</h2><div class="scroll"><table><thead><tr><th>Time · UTC</th><th>IP address</th><th>Approximate location</th><th>Network owner / ASN</th><th>Institution signal</th></tr></thead><tbody id="visit-rows"></tbody></table></div><p id="visits-empty" class="empty" hidden>No homepage visits recorded in the last 30 days.</p><p class="note">Latest 100 records · IP-level records are removed by daily cleanup after the 30-day reporting window. The aggregate all-time view count is retained. No form contents, cookies or device fingerprints are collected.</p></section>
</main></body></html>`;

export const dashboardScript = String.raw`
const svgNS = 'http://www.w3.org/2000/svg';
const land = document.createElementNS(svgNS, 'path');
land.setAttribute('d', ${JSON.stringify(worldLand)});
land.setAttribute('class', 'land');
document.querySelector('#land').append(land);
const get = id => document.getElementById(id);
const date = seconds => new Date(seconds * 1000).toISOString().replace('T', ' ').slice(0,19);
const count = value => Number(value).toLocaleString('en-US');
function row(target, values) {
 const tr=document.createElement('tr');
 values.forEach(value=>{const td=document.createElement('td');td.textContent=String(value ?? '');tr.append(td);});
 target.append(tr);
}
function clear() {
 ['total','views','ips'].forEach(id=>get(id).textContent='—');
 ['points','locations','visit-rows','institution-rows'].forEach(id=>get(id).replaceChildren());
 get('visits-empty').hidden=true;get('institution-empty').hidden=true;
}
function render(data) {
 clear();get('total').textContent=count(data.totalViews);get('views').textContent=count(data.windowViews);get('ips').textContent=count(data.uniqueIPs);
 for(const location of data.locations) {
  if(!Number.isFinite(location.longitude)||!Number.isFinite(location.latitude))continue;
  const label=[location.city,location.country].filter(Boolean).join(', ')||'Unknown location';
  const title=label+': '+count(location.views)+' recorded views';
  const dot=document.createElementNS(svgNS,'circle');
  dot.setAttribute('cx',String((location.longitude+180)*2.5));dot.setAttribute('cy',String((90-location.latitude)*2.5));
  dot.setAttribute('r',String(Math.min(13,3+Math.sqrt(location.views))));dot.setAttribute('class','point');
  dot.setAttribute('tabindex','0');dot.setAttribute('role','img');dot.setAttribute('aria-label',title);
  const tip=document.createElementNS(svgNS,'title');tip.textContent=title;dot.append(tip);get('points').append(dot);
  const li=document.createElement('li');li.textContent=title;get('locations').append(li);
 }
 if(!data.locations.length){const li=document.createElement('li');li.textContent='No mapped locations recorded.';get('locations').append(li);}
 data.institutions.forEach(item=>row(get('institution-rows'),[item.institution,count(item.views),date(item.last_seen)]));
 data.visits.forEach(item=>row(get('visit-rows'),[date(item.occurred_at),item.ip,[item.city,item.country].filter(Boolean).join(', ')||'Unknown',item.network+(item.asn?' / AS'+item.asn:''),item.institution?'Possible match':'No match']));
 get('visits-empty').hidden=data.visits.length>0;get('institution-empty').hidden=data.institutions.length>0;
 get('status').textContent=(data.collectionEnabled?'Collection enabled · ':'Collection paused · ')+'Updated '+data.updatedAt.replace('T',' ').slice(0,19)+' UTC · Refreshes every minute while this page is visible.';
}
let busy=false;
async function refresh() {
 if(busy||document.visibilityState!=='visible')return;
 busy=true;get('refresh').disabled=true;
 try {
  const response=await fetch('/admin/data',{cache:'no-store',credentials:'same-origin',redirect:'error',signal:AbortSignal.timeout(15000)});
  if(!response.ok)throw new Error('unavailable');
  render(await response.json());
 } catch {
  clear();get('status').textContent='Private records could not be loaded. Reload this page to sign in again, or try Refresh.';
 } finally {busy=false;get('refresh').disabled=false;}
}
get('refresh').addEventListener('click',refresh);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')refresh();});
setInterval(refresh,60000);refresh();
`;
