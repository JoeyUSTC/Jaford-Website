import { siteBase, siteURL } from "./urls.js";
import { enquiryRegions, socialChannels } from "./contact-presence.js";
import { socialIconPaths } from "./social-icons.js";
import { optionsFor } from "./specifications.js";
import { cases } from "./cases.js";
import { productImages } from "./product-images.js";
import { categories, products, services } from "./catalog.js";
import {
  areasForProduct,
  areasForService,
  itemsForArea,
  featuredItemsForArea,
  technologies,
} from "./technologies.js";
export const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const e = escapeHtml;
// Temporarily pause model/spec UI until detailed supplier data is available.
const showModelSpecifications = false;
const productURL = (id, area) =>
  siteURL(`/products/${id}${area ? `?area=${area}` : ""}`);
const serviceURL = (id, area) =>
  siteURL(`/services/${id}${area ? `?area=${area}` : ""}`);
const link = (href, label) =>
  `<a class="text-link" href="${href}">${label}</a>`;
const inquiry = (label, topic, item = "") =>
  `<button class="button button-dark" data-inquiry data-topic="${e(topic)}" data-item="${e(item)}">${label}</button>`;
const category = (id) => categories.find((c) => c.id === id);
const productArtwork = (p, detail = false) => {
  const art = productImages[p.image || p.id];
  if (!art) return `<img src="${siteBase}product-placeholder.svg" alt="Product illustration pending" width="640" height="440">`;
  if (art.src) return `<div class="product-artwork artwork-single"><img src="${siteBase}${art.src}" alt="${e(art.alt)} — illustration" loading="${detail ? "eager" : "lazy"}" decoding="async"></div>`;
  return `<div class="product-artwork" style="--art-column:${art.column};--art-row:${art.row}"><img src="${siteBase}images/products/${art.sheet}.webp" alt="${e(art.alt)} — illustration" loading="${detail ? "eager" : "lazy"}" decoding="async"></div>`;
};
const productModule = (p, href) =>
  `<article class="catalog-row product-module"><a class="product-module-link" href="${e(href)}" aria-label="${e(p.name)}"><figure class="module-figure">${productArtwork(p)}</figure><div class="module-content"><p class="eyebrow">${category(p.category).name}</p><h2>${e(p.name)}</h2><p class="module-description">${e(p.description)}</p>${showModelSpecifications && p.models.length ? `<p class="catalog-models module-models"><span>Models / options</span>${e(p.models.join(" · "))}</p>` : ""}<div class="module-purchase"><span class="module-cta">View product</span></div></div></a></article>`;
const contact = () =>
  `<section class="section container service-section contact-section" id="contact"><div class="section-heading"><h2>Discuss your requirements</h2></div><div class="service-content"><p>Share your application, model or material, required quantity and timeline. We will review specifications, availability and scope before quoting.</p><div class="contact-actions">${inquiry("Send an Inquiry", "Other technical requirement")}<a class="contact-email" href="mailto:kiki.li@jaford.com">kiki.li@jaford.com</a></div></div></section>`;
const header = (eyebrow, title, text) =>
  `<section class="hero container">${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ""}<h1 tabindex="-1">${title}</h1>${text ? `<p class="hero-description">${text}</p>` : ""}</section>`;
const legacy = () =>
  `<aside class="legacy-ranges"><h3>Other JAFORD ranges</h3><p>Existing information on fuel cells, electrolyzers, electrocatalysis and advanced materials remains available.</p>${link(siteURL("/technologies/fuel-cells-electrolyzers"), "Fuel cells, electrolyzers & electrocatalysis")}${link(siteURL("/technologies/functional-materials"), "Advanced materials & synthesis")}</aside>`;
const areaURL = (id) => siteURL(`/technologies/${id}`);
// Family entries describe established ranges, not newly invented model specifications.
const serviceBadge = badge => badge ? `<span class="service-badge"><svg class="service-flame" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M13.5 2c.8 3.7-.7 5.4-2.4 7.1-.8-1-1.2-2-1.2-3.2C6.3 9.2 4 12.4 4 15.7 4 20.3 7.6 23 12 23s8-2.8 8-7.3C20 10.4 16.7 6.2 13.5 2Z"/><path class="flame-core" d="M12.4 11.4c.4 2.5-2.9 4.2-2.9 6.4a2.6 2.6 0 0 0 5.2 0c0-2.3-1.3-4.3-2.3-6.4Z"/></svg>${e(badge)}</span>` : "";
const homeCard = (name, href, imageId, description = "", badge = "") => `<article class="sector-card"><a href="${e(href)}"><figure>${productArtwork({ id: imageId })}${serviceBadge(badge)}</figure><h3>${e(name)}</h3>${description ? `<p class="sector-card-description">${e(description)}</p>` : ""}</a></article>`;
const homeSector = (id, title, cards, description = "") => `<section class="section container home-sector" id="${id}"><div class="sector-heading"><h2>${title}</h2>${link(areaURL(id), "Browse all")}</div>${description ? `<p class="sector-description">${description}</p>` : ""}<div class="sector-grid">${cards.map(card => homeCard(...card)).join("")}</div></section>`;
const caseSummary = (item) => `<article class="case-summary"><h3><a href="${siteURL(`/cases/${item.id}`)}">${e(item.title)}</a></h3>${item.projectCode ? `<p class="project-code">${e(item.projectCode)}</p>` : ""}<p class="case-excerpt">${e(item.summary)}</p></article>`;
const caseSummaries = () => cases.map(caseSummary).join("");
const homeCases = (items = cases, area = null) => `<section class="section container home-cases${area ? " area-cases" : ""}" id="project-cases" aria-labelledby="project-cases-title"><div class="sector-heading"><h2 id="project-cases-title">Innovation in Practice</h2>${area ? "" : link(siteURL("/cases"), "View all cases")}</div>${area ? "" : `<p class="sector-description">How research teams work with JAFORD to move ideas into larger-scale trials and validation.</p>`}<div id="case-track" class="home-case-track" tabindex="0" role="region" aria-label="${area ? e(area.name) : "Custom development"} case studies">${items.map(caseSummary).join("")}</div><div class="case-scroll-controls"><button type="button" class="case-scroll" data-case-scroll="-1" aria-controls="case-track" aria-label="Previous cases">Previous</button><button type="button" class="case-scroll" data-case-scroll="1" aria-controls="case-track" aria-label="Next cases">Next</button></div></section>`;
export function caseCatalog() {
  return `${header("", "Custom development cases", "")}<section class="container catalog-section case-index"><div class="completed-project-list">${caseSummaries()}</div></section>`;
}
export function caseDetail(item) {
  return `<article class="container detail-page case-study"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="${siteURL()}">Home</a><span>/</span><a href="${siteURL("/cases")}">Case studies</a></nav><h1 tabindex="-1">${e(item.title)}</h1>${item.projectCode ? `<p class="project-code">${e(item.projectCode)}</p>` : ""}<div class="case-narrative"><p>${e(item.story)}</p></div></article>`;
}
const contactForm = (standalone = false) =>
  `<section class="section container home-contact" id="contact">${standalone ? '<h1 tabindex="-1">Contact Us</h1>' : "<h2>Contact Us</h2>"}<form id="home-contact-form" class="simple-contact-form"><div class="contact-field"><label for="contact-name"><span aria-hidden="true">*</span> Your Name</label><input id="contact-name" name="name" autocomplete="name" required maxlength="120"></div><div class="contact-field"><label for="contact-email"><span aria-hidden="true">*</span> E-Mail Address</label><input id="contact-email" name="email" type="email" autocomplete="email" required maxlength="200"></div><div class="contact-field"><label for="contact-enquiry"><span aria-hidden="true">*</span> Enquiry</label><textarea id="contact-enquiry" name="enquiry" required minlength="10" maxlength="5000" rows="6"></textarea></div><div class="contact-form-actions"><button class="button button-outline" type="submit">Prepare email</button></div></form><p class="contact-direct">or email <a href="mailto:kiki.li@jaford.com">kiki.li@jaford.com</a></p></section>`;
export function contactPage() {
  return contactForm(true) + socialPresence();
}
export function home() {
  return `<section class="container scale-intro" aria-labelledby="scale-title"><h1 id="scale-title" tabindex="-1">We Scale Innovation</h1><div class="impact-preview"><dl class="impact-stats"><div class="region-stat"><dt><button type="button" id="regions-trigger" class="region-trigger" aria-expanded="false" aria-controls="regions-popup"><span>Countries & regions</span><svg class="region-chevron" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="m2 4 4 4 4-4"/></svg></button><div id="regions-popup" class="regions-popup" role="region" aria-labelledby="regions-trigger" hidden><ul>${enquiryRegions.map(region => `<li><span>${e(region.name)}</span></li>`).join("")}</ul></div></dt><dd data-count-target="9">9</dd></div><div><dt>Research teams</dt><dd data-count-target="20">20</dd></div><div><dt>Projects delivered</dt><dd data-count-target="88">88</dd></div></dl></div></section>
  ${homeCases()}
  ${technologies.map(area => homeSector(area.id, area.name, featuredItemsForArea(area).map(({kind, item}) => [area.homeLabels?.[item.id] || item.name, kind === "product" ? productURL(item.id, area.id) : serviceURL(item.id, area.id), kind === "product" ? item.image || item.id : item.image || serviceArtwork[item.id], item.preview || "", item.badge || ""]), area.homeDescription || "")).join("")}
  ${contactForm()}${socialPresence()}`;
}
export function technologyDetail(area) {
  const items = itemsForArea(area);
  const areaCases = area.casePrefix ? cases.filter(item => item.projectCode?.startsWith(area.casePrefix)) : [];
  return `${header("", area.name, area.hideDescription ? "" : area.description)}${areaCases.length ? homeCases(areaCases, area) : ""}<section class="container catalog-section" aria-label="Materials, equipment and development support">${area.links.length ? `<div class="area-range"><h2>Materials & capabilities</h2>${area.links.map((item) => `<a class="text-link" href="${item.url}">${item.name}</a>`).join("")}</div>` : ""}${items.products.length ? `<div class="product-grid" aria-label="Products">${items.products.map((p) => productModule(p, productURL(p.id, area.id))).join("")}</div>` : ""}${items.services.length ? `<div class="area-services">${area.id === "testing-characterization" ? "" : `<h2 class="area-services-heading">Development capabilities</h2>`}<div class="product-grid">${items.services.map((s) => servicePreview(s, area.id)).join("")}</div></div>` : ""}</section>`;
}
export function productCatalog(params) {
  const selected = categories.some((c) => c.id === params.get("category"))
    ? params.get("category")
    : "";
  const query = (params.get("q") || "").trim();
  const normalize = (value) =>
    value
      .normalize("NFKC")
      .toLowerCase()
      .replace(/[‐‑–—-]/g, " ");
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  const detailURL = (id) =>
    `${productURL(id)}?${new URLSearchParams({ from: "catalog", category: selected, q: query })}`;
  const matches = products.filter(
    (p) =>
      (!selected || p.category === selected) &&
      terms.every((term) =>
        normalize(
          `${p.name} ${p.description} ${category(p.category).name} ${p.models.join(" ")}`,
        ).includes(term),
      ),
  );
  const categoryNav = `<aside class="catalog-sidebar"><h2>Product categories</h2><nav aria-label="Product categories"><a href="${siteURL(`/products${query ? `?q=${encodeURIComponent(query)}` : ""}`)}" ${!selected ? 'aria-current="page"' : ""}>All products <span>${products.length}</span></a>${categories.map(c=>`<a href="${e(siteURL(`/products?${new URLSearchParams({category:c.id,...(query?{q:query}:{})})}`))}" ${selected===c.id?'aria-current="page"':""}>${e(c.name)} <span>${products.filter(p=>p.category===c.id).length}</span></a>`).join("")}</nav><p>Model specifications and availability are confirmed with your quotation.</p></aside>`;
  return `${header("Product index", "All products", "Browse materials, consumables and equipment by category or model. Specifications, quantity, lead time and availability are confirmed by quotation; this catalog is not a stock list.")}<section class="container catalog-section" aria-label="Product catalog"><div class="catalog-layout">${categoryNav}<div class="catalog-results"><form id="catalog-filters" class="catalog-filters"><label>Category<select name="category" id="category-filter" aria-label="Category"><option value="">All categories</option>${categories.map((c) => `<option value="${c.id}" ${c.id === selected ? "selected" : ""}>${c.name}</option>`).join("")}</select></label><label>Search products<input type="search" name="q" value="${e(query)}" placeholder="Name, model or keywords"></label><button class="button button-dark" type="submit">Search</button>${link(siteURL("/products"), "Reset filters")}</form><p class="catalog-count" role="status">${matches.length} ${matches.length === 1 ? "product" : "products"}${query ? ` matching “${e(query)}”` : ""}${selected ? ` in ${e(category(selected).name)}` : ""}</p><div class="catalog-list product-grid">${matches.map((p) => productModule(p, detailURL(p.id))).join("") || '<div class="empty-state"><h2>No products match these filters</h2><p>Try a model code, another category or reset the filters.</p></div>'}</div></div></div>${legacy()}</section>${contact()}`;
}
export function productDetail(p, areaId, params = new URLSearchParams()) {
  const backParams = new URLSearchParams();
  for (const key of ["category", "q"]) {
    if (params.get(key)) backParams.set(key, params.get(key));
  }
  const backLink =
    params.get("from") === "catalog"
      ? link(
          e(siteURL(`/products${backParams.size ? `?${backParams}` : ""}`)),
          "← Back to search results",
        )
      : "";
  const c = category(p.category);
  const area =
    areasForProduct(p.id).find((t) => t.id === areaId) ||
    areasForProduct(p.id)[0] || technologies.find(t => t.id === "equipment-supplies");
  return `<section class="container detail-page product-detail-page">${backLink}<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="${siteURL()}">Home</a><span>/</span><a href="${areaURL(area.id)}">${area.name}</a></nav><div class="detail-intro"><div><p class="eyebrow">${c.name}</p><h1 tabindex="-1">${e(p.name)}</h1><p class="detail-description">${e(p.description)}</p></div><figure class="product-figure">${productArtwork(p, true)}<figcaption>Representative illustration. Actual appearance and packaging depend on the confirmed model.</figcaption></figure></div>${modelList(p)}${p.note ? `<p class="technical-note">${e(p.note)}</p>` : ""}</section>`;
}
export function serviceCatalog() {
  return `${header("Service index", "All services", "Specialist resources and process expertise to scale and validate your lab innovations.")}<section class="container catalog-section product-grid" aria-label="Service directory">${services.map(s => servicePreview(s)).join("")}</section>${contact()}`;
}
const serviceArtwork = {
  "polymer-resin-synthesis": "rd-polymer-reactor",
  "small-molecule-synthesis": "rd-molecule-reactor",
  "synthesis-scale-up": "rd-scale-up",
  "carbonization-activation": "rd-carbonization-furnace",
  "sintering-heat-treatment": "rd-rotary-furnace",
  "electrode-processing": "rd-coating",
  "pouch-cell-customization": "rd-stacking",
  "functional-materials-development": "mof-framework",
  "material-characterization": "tem-testing",
  "battery-testing": "battery-cycling",
  "stack-testing": "full-stack",
  "renewable-coupled-testing": "renewable-testing",
  "research-procurement": "glass-reactor-2000ml",
};
const servicePreview = (s, areaId) => `<article class="catalog-row product-module capability-card"><a class="product-module-link" href="${serviceURL(s.id, areaId)}" aria-label="${e(s.name)}"><figure class="module-figure">${productArtwork({id: s.image || serviceArtwork[s.id]})}${serviceBadge(s.badge)}</figure><div class="module-content"><h2>${e(s.name)}</h2><p class="module-description">${e(s.preview || s.description)}</p><span class="module-cta">View details</span></div></a></article>`;
const modelList = (item, kind = "product") => !showModelSpecifications ? "" : `<section class="model-options" aria-label="Models and specifications"><h2>${kind === "service" ? "Types / options" : "Models / options"}</h2><ul class="model-list">${optionsFor(item, kind).map(spec => `<li class="model-option"><span class="model-name">${e(spec.name)}</span><button type="button" class="spec-link" data-spec-id="${e(spec.id)}" aria-label="Spec: ${e(spec.name)}">Spec</button></li>`).join("")}</ul></section>`;
export function serviceDetail(s, areaId) {
  const area = areasForService(s.id).find(t => t.id === areaId) || areasForService(s.id)[0];
  return `<section class="container detail-page service-detail concise-service"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="${siteURL()}">Home</a><span>/</span><a href="${areaURL(area.id)}">${area.name}</a></nav><div class="service-overview"><div><h1 tabindex="-1">${e(s.name)}</h1>${s.introduction ? `<p class="service-introduction">${e(s.introduction)}</p>` : ""}<p class="detail-description">${e(s.description)}</p>${s.story ? `<p class="detail-description service-story">${e(s.story)}</p>` : ""}</div><figure>${productArtwork({id:s.image || serviceArtwork[s.id]},true)}</figure></div>${modelList(s, "service")}</section>`;
}

export function specContent(spec) {
  return `<table class="spec-table"><caption id="spec-title" class="visually-hidden">${e(spec.family)} — ${e(spec.name)} specifications</caption><tbody>${Object.entries(spec.tableFields).map(([key,value]) => `<tr><th scope="row">${e(key)}</th><td>${e(value)}</td></tr>`).join("")}</tbody></table>`;
}
export function notFound() {
  return `${header("JAFORD", "Page not found", "This product or service link is not in the current catalog.")}<div class="container detail-next">${link(siteURL("/products"), "Browse products")}${link(siteURL("/services"), "Browse services")}</div>`;
}

const socialIcon = icon => {
  return `<svg class="social-icon social-${icon}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${socialIconPaths[icon]}"></path></svg>`;
};
const socialPresence = () => `<section class="container social-presence" aria-label="Social channels"><div class="social-channels">${socialChannels.map(channel => channel.url
  ? `<a class="social-channel" href="${e(channel.url)}" target="_blank" rel="noopener noreferrer" aria-label="${e(channel.name)}" title="${e(channel.name)} — opens in a new tab">${socialIcon(channel.icon)}</a>`
  : `<span class="social-channel" role="img" aria-label="${e(channel.name)}" title="${e(channel.name)}">${socialIcon(channel.icon)}</span>`).join("")}</div></section>`;
