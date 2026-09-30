import { productImages } from "./product-images.js";
import { categories, products, services } from "./catalog.js";
import {
  technologies,
  areasForProduct,
  areasForService,
  itemsForArea,
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
const productURL = (id, area) =>
  `#/products/${id}${area ? `?area=${area}` : ""}`;
const serviceURL = (id, area) =>
  `#/services/${id}${area ? `?area=${area}` : ""}`;
const link = (href, label) =>
  `<a class="text-link" href="${href}">${label}</a>`;
const inquiry = (label, topic, item = "") =>
  `<button class="button button-dark" data-inquiry data-topic="${e(topic)}" data-item="${e(item)}">${label}</button>`;
const category = (id) => categories.find((c) => c.id === id);
const productArtwork = (p, detail = false) => {
  const art = productImages[p.id];
  if (!art) return `<img src="${import.meta.env.BASE_URL}product-placeholder.svg" alt="Product illustration pending" width="640" height="440">`;
  return `<div class="product-artwork" style="--art-column:${art.column};--art-row:${art.row}"><img src="${import.meta.env.BASE_URL}images/products/${art.sheet}.png" alt="${e(art.alt)} — illustration" loading="${detail ? "eager" : "lazy"}"></div>`;
};
const productModule = (p, href) =>
  `<article class="catalog-row product-module"><a class="product-module-link" href="${e(href)}" aria-label="${e(p.name)}"><figure class="module-figure">${productArtwork(p)}<figcaption>AI-generated illustration</figcaption></figure><div class="module-content"><p class="eyebrow">${category(p.category).name}</p><h2>${e(p.name)}</h2><p class="module-description">${e(p.description)}</p><p class="catalog-models module-models"><span>Models / options</span>${e(p.models.join(" · "))}</p><span class="module-cta">View specs</span></div></a></article>`;
const contact = () =>
  `<section class="section container service-section contact-section" id="contact"><div class="section-heading"><h2>Discuss your requirements</h2></div><div class="service-content"><p>Share your application, model or material, required quantity and timeline. We will review specifications, availability and scope before quoting.</p><div class="contact-actions">${inquiry("Send an Inquiry", "Other technical requirement")}<a class="contact-email" href="mailto:kiki.li@jaford.com">kiki.li@jaford.com</a></div></div></section>`;
const header = (eyebrow, title, text) =>
  `<section class="hero container"><p class="eyebrow">${eyebrow}</p><h1 tabindex="-1">${title}</h1><p class="hero-description">${text}</p></section>`;
const legacy = () =>
  `<aside class="legacy-ranges"><h3>Other JAFORD ranges</h3><p>Existing information on fuel cells, electrolyzers, electrocatalysis and advanced materials remains available.</p>${link("https://www.jaford.com/products/fuel-cell-and-electrolyzer", "Fuel cells, electrolyzers & electrocatalysis")}${link("https://www.jaford.com/products/membranes-polymers", "Advanced materials & synthesis")}</aside>`;
const areaURL = (id) => `#/technologies/${id}`;
const areaRows = () =>
  technologies
    .map(
      (t) =>
        `<article class="product-item"><h3><a href="${areaURL(t.id)}">${t.name}</a></h3><div class="product-detail"><p>${t.description}</p>${link(areaURL(t.id), "Explore this area")}</div></article>`,
    )
    .join("");
const homeAreaImages = {
  "battery-materials": "sodium-hard-carbon",
  "battery-cells": "research-pouch-cells",
  "electrocatalysis": "chi760f",
  "advanced-materials": "al-3001a",
  "lab-equipment": "glass-reactor-2000ml",
};
const homeAreaRows = () => technologies.map((t) => {
  const id = homeAreaImages[t.id];
  const artwork = id ? productArtwork({ id }) : `<div class="product-artwork single-artwork"><img src="${import.meta.env.BASE_URL}images/products/fuel-cell-components.png" alt="Flow-field plate, membrane and gas diffusion sheet — generic illustration" loading="lazy"></div>`;
  return `<article class="product-item home-area"><a class="home-area-image" href="${areaURL(t.id)}" aria-label="Explore ${t.name}"><figure>${artwork}<figcaption>AI-generated illustration</figcaption></figure></a><h3><a href="${areaURL(t.id)}">${t.name}</a></h3><div class="product-detail"><p>${t.description}</p>${link(areaURL(t.id), "Explore this area")}</div></article>`;
}).join("");
const relatedAreas = (areas) =>
  `<aside class="related-areas"><h2>Related technology areas</h2>${areas.map((t) => link(areaURL(t.id), t.name)).join("")}</aside>`;
export function home() {
  return `<section class="hero container home-hero"><p class="eyebrow">Materials supply & collaborative R&D</p><h1 tabindex="-1">From Innovation to Industrial Impact</h1><p class="brand-slogan">Your Long-term Partner in Technology Translation</p><p class="hero-description">JAFORD supplies materials, consumables and equipment for startups and research teams. Through partner factories and laboratories, we coordinate custom synthesis, process development and testing—from your specified procedure or an agreed material requirement.</p><div class="hero-actions"><a class="button button-dark" href="#/technologies">Explore technology areas</a><button class="button button-outline" data-inquiry data-topic="Custom R&D project">Discuss a Project</button></div></section>
  <section class="section container" id="products"><div class="section-heading"><h2>Technology areas</h2><p>Products, processing and development support, organized by your research area.</p></div><div class="home-area-grid">${homeAreaRows()}</div></section>
  <section class="section container service-section" id="functional-materials"><div class="section-heading"><h2>Functional materials development</h2><p>MOFs, COFs, polymers & functional intermediates</p></div><div class="service-content"><p>Bring a target framework, functional requirement or literature route. We coordinate synthesis and development through partner laboratories, with feasibility and the acceptance basis agreed for each project.</p><dl class="project-brief"><div><dt>MOFs & COFs</dt><dd>Metal–organic frameworks and covalent organic frameworks: route review, synthesis coordination and agreed characterization.</dd></div><div><dt>Polymers & related materials</dt><dd>Custom polymers, resins, ligands and functional intermediates, with process reproduction or optimization where agreed.</dd></div><div><dt>A defined material deliverable</dt><dd>Specify structure or composition, quantity, material form, test methods and acceptance tolerances. Agreed work may deliver material batches with characterization results; scale-up is assessed separately.</dd></div></dl>${link("#/services/functional-materials-development", "Scope, inputs & deliverables")}</div></section>
  <section class="section container" id="custom-rd"><div class="section-heading"><h2>Custom synthesis & collaborative R&D</h2><p>Two ways to define a project, depending on whether you have an established procedure or a target specification.</p></div><div class="engagement-models"><article><h3>Custom synthesis</h3><p class="engagement-label">Client-specified route</p><p>Provide your approved synthesis procedure, references and any prior results. We coordinate material preparation and agreed characterization through suitable partners.</p><p>Delivery includes the material and agreed test results. Acceptance is based on procedure compliance, material specifications, or both. Route changes require your approval; optimization is included only when agreed.</p>${link("#/technologies/advanced-materials", "Explore synthesis services")}</article><article><h3>Contract R&D</h3><p class="engagement-label">Agreed target specifications</p><p>Provide the target material, required properties and intended application. We assess the project with partners and define a scope for process development or optimization.</p><p>Before starting, we agree quantity, test methods, acceptance tolerances, timeline, budget and iteration limits—including how unmet requirements will be handled. Targets are assessed, not presented as guaranteed results.</p>${inquiry("Discuss an R&D requirement", "Custom R&D project")}</article></div></section>
  <section class="section container" id="completed-projects"><div class="section-heading"><h2>Completed custom projects</h2><p>Selected partner-coordinated work, shared without client names or proprietary formulations.</p></div><div class="completed-project-list"><article><p class="eyebrow">Custom synthesis · Completed</p><h3>Repeat polymer synthesis</h3><p>Repeated polymer synthesis completed and delivered through our partner network.</p><dl><dt>Project type</dt><dd>Custom synthesis and repeat material preparation.</dd><dt>Delivered</dt><dd>Polymer material batches for the agreed project.</dd></dl>${link("#/services/polymer-resin-synthesis", "Polymer & resin synthesis")}</article><article><p class="eyebrow">Custom material preparation · Completed</p><h3>11 kg resin project</h3><p>A custom resin project completed with delivery of 11 kg of resin.</p><dl><dt>Project type</dt><dd>Partner-coordinated resin synthesis.</dd><dt>Delivered</dt><dd>11 kg of resin under the project-specific scope.</dd></dl>${link("#/services/synthesis-scale-up", "Synthesis & scale-up services")}</article></div></section>${contact()}`;
}
export function technologyDirectory() {
  return `${header("JAFORD", "Technology areas", "Explore the materials, equipment and related development support for your research area.")}<section class="container catalog-section" aria-label="Technology directory"><div class="product-list">${areaRows()}</div></section>${contact()}`;
}
export function technologyDetail(area) {
  const items = itemsForArea(area);
  return `<div class="container area-breadcrumb">${link("#/technologies", "All technology areas")}</div>${header("Technology area", area.name, area.description)}<section class="container catalog-section" aria-label="Materials, equipment and development support">${area.links.length ? `<div class="area-range"><h2>Materials & capabilities</h2>${area.links.map((item) => `<a class="text-link" href="${item.url}">${item.name}</a>`).join("")}</div>` : ""}${items.products.length ? `<div class="product-grid" aria-label="Products">${items.products.map((p) => productModule(p, productURL(p.id, area.id))).join("")}</div>` : ""}${items.services.length ? `<div class="area-services"><h2 class="area-services-heading">Related development & services</h2>${items.services.map((s) => `<article class="catalog-row"><h3><a href="${serviceURL(s.id, area.id)}">${e(s.name)}</a></h3><div><p>${e(s.description)}</p>${link(serviceURL(s.id, area.id), "Scope, inputs & deliverables")}</div></article>`).join("")}</div>` : ""}</section>${contact()}`;
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
  return `${header("Product index", "All products", "Browse materials, consumables and equipment by category or model. Specifications, quantity, lead time and availability are confirmed by quotation; this catalog is not a stock list.")}<section class="container catalog-section" aria-label="Product catalog"><form id="catalog-filters" class="catalog-filters"><label>Category<select name="category" id="category-filter" aria-label="Category"><option value="">All categories</option>${categories.map((c) => `<option value="${c.id}" ${c.id === selected ? "selected" : ""}>${c.name}</option>`).join("")}</select></label><label>Search products<input type="search" name="q" value="${e(query)}" placeholder="Name, model or keywords"></label><button class="button button-dark" type="submit">Search</button>${link("#/products", "Reset filters")}</form><p class="catalog-count" role="status">${matches.length} ${matches.length === 1 ? "product" : "products"}${query ? ` matching “${e(query)}”` : ""}${selected ? ` in ${e(category(selected).name)}` : ""}</p><div class="catalog-list product-grid">${matches.map((p) => productModule(p, detailURL(p.id))).join("") || '<div class="empty-state"><h2>No products match these filters</h2><p>Try a model code, another category or reset the filters.</p></div>'}</div>${legacy()}</section>${contact()}`;
}
export function productDetail(p, areaId, params = new URLSearchParams()) {
  const backParams = new URLSearchParams();
  for (const key of ["category", "q"]) {
    if (params.get(key)) backParams.set(key, params.get(key));
  }
  const backLink =
    params.get("from") === "catalog"
      ? link(
          e(`#/products${backParams.size ? `?${backParams}` : ""}`),
          "← Back to search results",
        )
      : "";
  const c = category(p.category);
  const area =
    areasForProduct(p.id).find((t) => t.id === areaId) ||
    areasForProduct(p.id)[0];
  return `<section class="container detail-page">${backLink}<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="#/technologies">Technology areas</a><span>/</span><a href="${areaURL(area.id)}">${area.name}</a></nav><div class="detail-intro"><div><p class="eyebrow">${c.name} · Quotation on request</p><h1 tabindex="-1">${e(p.name)}</h1><p class="detail-description">${e(p.description)}</p><label class="model-label" for="product-model">Model / option<select id="product-model">${p.models.map((m) => `<option>${e(m)}</option>`).join("")}</select></label><p class="spec-note">Options identify a requirement, not current stock. Exact grade, specifications and lead time are confirmed in your quotation.</p>${inquiry("Request a quotation", c.name, p.name)}<button class="text-link spec-jump" data-show-spec>View specifications</button></div><figure class="product-figure">${productArtwork(p, true)}<figcaption>AI-generated illustration. Generic product type; actual appearance, packaging and included components depend on the confirmed model.${p.id === "spherical-porous-carbon" ? " Conceptual drawing, not microscopy or measured morphology." : ""}${p.id.startsWith("nickel-boat") ? " Boat and lid are quoted separately." : ""}</figcaption></figure></div><section class="spec-section" aria-labelledby="spec-title"><h2 id="spec-title">Specifications</h2><p>Confirmed information is listed below. Contact us for the specification of your selected model.</p><table class="spec-table"><caption>${e(p.name)} — model-specific specifications</caption><tbody>${Object.entries(
    p.specs,
  )
    .map(
      ([key, value]) =>
        `<tr><th scope="row">${e(key)}</th><td>${e(value)}</td></tr>`,
    )
    .join(
      "",
    )}</tbody></table>${p.note ? `<p class="technical-note">${e(p.note)}</p>` : ""}${p.id === "research-pouch-cells" ? link("#/services/pouch-cell-customization", "Need a custom cell? Explore pouch-cell customization") : ""}</section><div class="detail-next">${link(areaURL(area.id), "Back to technology area")}${inquiry("Inquire about this product", c.name, p.name)}</div>${relatedAreas(areasForProduct(p.id))}</section>${contact()}`;
}
export function serviceCatalog() {
  return `${header("Service index", "All services", "JAFORD coordinates custom work through partner factories and laboratories. Each project starts with a feasibility review and an agreed scope, quality criteria and delivery plan.")}<section class="container catalog-section" aria-label="Service directory">${services.map((s) => `<article class="catalog-row"><h2><a href="${serviceURL(s.id)}">${s.name}</a></h2><div><p>${s.description}</p>${link(serviceURL(s.id), "Scope, inputs & deliverables")}</div></article>`).join("")}</section>${contact()}`;
}
export function serviceDetail(s, areaId) {
  const area =
    areasForService(s.id).find((t) => t.id === areaId) ||
    areasForService(s.id)[0];
  return `<section class="container detail-page service-detail"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="#/technologies">Technology areas</a><span>/</span><a href="${areaURL(area.id)}">${area.name}</a></nav><p class="eyebrow">Coordinated through partner factories and laboratories</p><h1 tabindex="-1">${s.name}</h1><p class="detail-description">${s.description}</p><div class="hero-actions">${inquiry("Discuss this service", "Custom R&D project", s.name)}</div>${[
    ["What we can organize", s.scope],
    ["What you provide", s.inputs],
    ["Agreed deliverables", s.deliverables],
  ]
    .map(
      ([title, items]) =>
        `<section class="service-scope"><h2>${title}</h2><ul>${items.map((item) => `<li>${e(item)}</li>`).join("")}</ul></section>`,
    )
    .join(
      "",
    )}<aside class="technical-note"><h2>Project assessment</h2><p>${s.boundary}</p><p>Scope, acceptance criteria, schedule and price are agreed before work begins.</p></aside>${relatedAreas(areasForService(s.id))}${link("#/services", "All services")}</section>${contact()}`;
}
export function notFound() {
  return `${header("JAFORD", "Page not found", "This product or service link is not in the current catalog.")}<div class="container detail-next">${link("#/products", "Browse products")}${link("#/services", "Browse services")}</div>`;
}
