import { escapeHtml } from "./pages.js";

export const origin = "https://jaford.com";
export const canonicalURL = page => origin + (page.path === "/" ? "/" : `${page.path}/`);
const json = value => JSON.stringify(value).replace(/</g, "\\u003c");
export function structuredData(page) {
  if (!page.indexable) return null;
  const url = canonicalURL(page);
  const organization = {"@type":"Organization", "@id":`${origin}/#organization`, name:"JAFORD", url:`${origin}/`, email:"kiki.li@jaford.com", logo:{"@type":"ImageObject",url:`${origin}/brand/jaford-brand.png`}};
  const website = {"@type":"WebSite", "@id":`${origin}/#website`, url:`${origin}/`, name:"JAFORD", inLanguage:"en", publisher:{"@id":organization["@id"]}};
  const webpage = {"@type":page.type === "contact" ? "ContactPage" : ["products","services","cases","technology"].includes(page.type) ? "CollectionPage" : "WebPage", "@id":`${url}#webpage`, url, name:page.title, description:page.description, inLanguage:"en", isPartOf:{"@id":website["@id"]}};
  const graph = [organization, website, webpage];
  if (["product", "service", "case"].includes(page.type)) {
    const parent = page.type === "case" ? {name:"Case studies",path:"/cases/"} : {name:page.area.name,path:`/technologies/${page.area.id}/`};
    const crumbs = [{name:"Home",url:`${origin}/`},{name:parent.name,url:origin+parent.path},{name:page.item.name || page.item.title,url}];
    graph.push({"@type":"BreadcrumbList","@id":`${url}#breadcrumb`,itemListElement:crumbs.map((crumb,i)=>({"@type":"ListItem",position:i+1,name:crumb.name,item:crumb.url}))});
    webpage.breadcrumb = {"@id":`${url}#breadcrumb`};
  }
  // No prices, reviews, credentials, unavailable model data or supplier claims.
  if (page.type === "service") {
    graph.push({"@type":"Service","@id":`${url}#service`,url,name:page.item.name,description:page.item.description,provider:{"@id":organization["@id"]}});
    webpage.mainEntity = {"@id":`${url}#service`};
  }
  return {"@context":"https://schema.org","@graph":graph};
}

export function seoTags(page) {
  const e = escapeHtml, url = canonicalURL(page), graph = structuredData(page);
  return `<title>${e(page.title)}</title>
<meta name="description" content="${e(page.description)}">
<meta name="robots"${page.type === "owner" ? " data-private-insights" : ""} content="${page.indexable ? "index, follow, max-image-preview:large" : page.type === "owner" ? "noindex, nofollow, noarchive" : "noindex, follow"}">
${page.type === "not-found" || page.type === "owner" ? "" : `<link rel="canonical" href="${e(url)}">`}
<meta property="og:type" content="website">
<meta property="og:site_name" content="JAFORD">
<meta property="og:title" content="${e(page.title)}">
<meta property="og:description" content="${e(page.description)}">
<meta property="og:url" content="${e(url)}">
<meta property="og:image" content="${origin}/brand/jaford-brand.png">
<meta property="og:image:alt" content="JAFORD">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${e(page.title)}">
<meta name="twitter:description" content="${e(page.description)}">
<meta name="twitter:image" content="${origin}/brand/jaford-brand.png">
${graph ? `<script type="application/ld+json">${json(graph)}</script>` : ""}`;
}

export function applySEO(page) {
  document.head.querySelectorAll('title, meta[name="description"], meta[name="robots"], link[rel="canonical"], meta[property^="og:"], meta[name^="twitter:"], script[type="application/ld+json"]').forEach(node=>node.remove());
  document.head.insertAdjacentHTML("beforeend", seoTags(page));
}
