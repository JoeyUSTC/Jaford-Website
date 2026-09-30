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
const relatedAreas = (areas) =>
  `<aside class="related-areas"><h2>Related technology areas</h2>${areas.map((t) => link(areaURL(t.id), t.name)).join("")}</aside>`;
export function home() {
  return `${header("For startups and research teams", "Advanced materials<br>& R&D support.", "Materials, consumables and equipment for research institutions and R&D teams. JAFORD also coordinates custom synthesis, processing and development through partner factories and laboratories.")}
  <div class="container home-entry"><a class="button button-dark" href="#/technologies">Explore technology areas</a><button class="button button-outline" data-inquiry data-topic="Custom R&D project">Discuss a Project</button></div>
  <section class="section container" id="products"><div class="section-heading"><h2>Technology areas</h2><p>Find materials, equipment and development support for your field.</p></div><div class="product-list">${areaRows()}</div></section>
  <section class="section container service-section" id="custom-rd"><div class="section-heading"><h2>A defined scope,<br>before work begins</h2></div><div class="service-content"><p>We confirm the model or technical scope, required documentation, acceptance criteria and delivery plan with you. Product specifications and project targets are reviewed separately from measured results.</p><p>Products are supplied by quotation. Custom work is coordinated through partner factories and laboratories.</p>${link("#/contact", "Discuss your requirements")}</div></section>${contact()}`;
}
export function technologyDirectory() {
  return `${header("JAFORD", "Technology areas", "Explore the materials, equipment and related development support for your research area.")}<section class="container catalog-section" aria-label="Technology directory"><div class="product-list">${areaRows()}</div></section>${contact()}`;
}
export function technologyDetail(area) {
  const items = itemsForArea(area);
  const entries = [
    ...items.products.map((p) => ({
      name: p.name,
      description: p.description,
      url: productURL(p.id, area.id),
      label: "Product specifications & inquiry",
    })),
    ...items.services.map((s) => ({
      name: s.name,
      description: s.description,
      url: serviceURL(s.id, area.id),
      label: "Scope, inputs & deliverables",
    })),
  ];
  return `<div class="container area-breadcrumb">${link("#/technologies", "All technology areas")}</div>${header("Technology area", area.name, area.description)}<section class="container catalog-section" aria-label="Materials, equipment and development support">${area.links.length ? `<div class="area-range"><h2>Materials & capabilities</h2>${area.links.map((item) => `<a class="text-link" href="${item.url}">${item.name}</a>`).join("")}</div>` : ""}${entries.map((item) => `<article class="catalog-row"><h2><a href="${item.url}">${e(item.name)}</a></h2><div><p>${e(item.description)}</p>${link(item.url, item.label)}</div></article>`).join("")}</section>${contact()}`;
}
export function productCatalog(params) {
  const selected = categories.some((c) => c.id === params.get("category"))
    ? params.get("category")
    : "";
  const query = (params.get("q") || "").trim();
  const matches = products.filter(
    (p) =>
      (!selected || p.category === selected) &&
      `${p.name} ${p.description} ${p.models.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return `${header("Product index", "All products", "Browse materials, consumables and equipment by category or model. Specifications, quantity, lead time and availability are confirmed by quotation; this catalog is not a stock list.")}<section class="container catalog-section" aria-label="Product catalog"><form id="catalog-filters" class="catalog-filters"><label>Category<select name="category" id="category-filter" aria-label="Category"><option value="">All categories</option>${categories.map((c) => `<option value="${c.id}" ${c.id === selected ? "selected" : ""}>${c.name}</option>`).join("")}</select></label><label>Search products<input type="search" name="q" value="${e(query)}" placeholder="Product name or model"></label><button class="button button-dark" type="submit">Search</button>${link("#/products", "Reset filters")}</form><p class="catalog-count" role="status">${matches.length} ${matches.length === 1 ? "product" : "products"}</p><div class="catalog-list">${matches.map((p) => `<article class="catalog-row"><div><p class="eyebrow">${category(p.category).name}</p><h2><a href="${productURL(p.id)}">${e(p.name)}</a></h2></div><div><p>${e(p.description)}</p>${link(productURL(p.id), "View specifications & inquire")}</div></article>`).join("") || '<div class="empty-state"><h2>No products match these filters</h2><p>Try a model code, another category or reset the filters.</p></div>'}</div>${legacy()}</section>${contact()}`;
}
export function productDetail(p, areaId) {
  const c = category(p.category);
  const area =
    areasForProduct(p.id).find((t) => t.id === areaId) ||
    areasForProduct(p.id)[0];
  return `<section class="container detail-page"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="#/technologies">Technology areas</a><span>/</span><a href="${areaURL(area.id)}">${area.name}</a></nav><div class="detail-intro"><div><p class="eyebrow">${c.name} · Quotation on request</p><h1 tabindex="-1">${e(p.name)}</h1><p class="detail-description">${e(p.description)}</p><label class="model-label" for="product-model">Model / option<select id="product-model">${p.models.map((m) => `<option>${e(m)}</option>`).join("")}</select></label><p class="spec-note">Options identify a requirement, not current stock. Exact grade, specifications and lead time are confirmed in your quotation.</p>${inquiry("Request a quotation", c.name, p.name)}</div><figure class="product-figure"><img src="${import.meta.env.BASE_URL}product-placeholder.svg" width="640" height="440" alt="Neutral placeholder illustration; no product photograph available"><figcaption>Illustration / 示意图 — product photograph pending. Not a technical drawing.</figcaption></figure></div><section class="spec-section" aria-labelledby="spec-title"><h2 id="spec-title">Specifications</h2><p>Confirmed information is listed below. Contact us for the specification of your selected model.</p><table class="spec-table"><caption>${e(p.name)} — model-specific specifications</caption><tbody>${Object.entries(
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
