import { cases } from "./cases.js";
import { productImages } from "./product-images.js";
import { categories, products, services } from "./catalog.js";
import {
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
  `<article class="catalog-row product-module"><a class="product-module-link" href="${e(href)}" aria-label="${e(p.name)}"><figure class="module-figure">${productArtwork(p)}</figure><div class="module-content"><p class="eyebrow">${category(p.category).name}</p><h2>${e(p.name)}</h2><p class="module-description">${e(p.description)}</p>${p.models.length ? `<p class="catalog-models module-models"><span>Models / options</span>${e(p.models.join(" · "))}</p>` : ""}<div class="module-purchase"><span class="module-cta">${Object.keys(p.specs).length ? "View specs" : "View product"}</span></div></div></a></article>`;
const contact = () =>
  `<section class="section container service-section contact-section" id="contact"><div class="section-heading"><h2>Discuss your requirements</h2></div><div class="service-content"><p>Share your application, model or material, required quantity and timeline. We will review specifications, availability and scope before quoting.</p><div class="contact-actions">${inquiry("Send an Inquiry", "Other technical requirement")}<a class="contact-email" href="mailto:kiki.li@jaford.com">kiki.li@jaford.com</a></div></div></section>`;
const header = (eyebrow, title, text) =>
  `<section class="hero container">${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ""}<h1 tabindex="-1">${title}</h1><p class="hero-description">${text}</p></section>`;
const legacy = () =>
  `<aside class="legacy-ranges"><h3>Other JAFORD ranges</h3><p>Existing information on fuel cells, electrolyzers, electrocatalysis and advanced materials remains available.</p>${link("https://www.jaford.com/products/fuel-cell-and-electrolyzer", "Fuel cells, electrolyzers & electrocatalysis")}${link("https://www.jaford.com/products/membranes-polymers", "Advanced materials & synthesis")}</aside>`;
const areaURL = (id) => `#/technologies/${id}`;
// Family entries describe established ranges, not newly invented model specifications.
const homeCard = (name, href, imageId, description = "") => `<article class="sector-card"><a href="${e(href)}"><figure>${productArtwork({ id: imageId })}</figure><h3>${e(name)}</h3>${description ? `<p class="sector-card-description">${e(description)}</p>` : ""}</a></article>`;
const homeSector = (id, title, cards, description = "") => `<section class="section container home-sector" id="${id}"><div class="sector-heading"><h2>${title}</h2>${link(areaURL(id), "Browse all")}</div>${description ? `<p class="sector-description">${description}</p>` : ""}<div class="sector-grid">${cards.map(card => homeCard(...card)).join("")}</div></section>`;
const caseSummary = (item) => `<article class="case-summary"><h3><a href="#/cases/${item.id}">${e(item.title)}</a></h3>${item.projectCode ? `<p class="project-code">${e(item.projectCode)}</p>` : ""}<p class="case-excerpt">${e(item.summary)}</p></article>`;
const caseSummaries = () => cases.map(caseSummary).join("");
const homeCases = () => `<section class="section container home-cases" id="project-cases" aria-labelledby="project-cases-title"><div class="sector-heading"><h1 id="project-cases-title" tabindex="-1">Innovation in practice</h1>${link("#/cases", "View all cases")}</div><p class="sector-description">How research teams work with JAFORD to move ideas into larger-scale trials and validation.</p><div id="case-track" class="home-case-track" tabindex="0" role="region" aria-label="Custom development case studies">${cases.map(caseSummary).join("")}</div><div class="case-scroll-controls"><button type="button" class="case-scroll" data-case-scroll="-1" aria-controls="case-track" aria-label="Previous cases">Previous</button><button type="button" class="case-scroll" data-case-scroll="1" aria-controls="case-track" aria-label="Next cases">Next</button></div></section>`;
export function caseCatalog() {
  return `${header("Project experience", "Custom development cases", "From small-batch materials to larger-cell validation: selected projects developed with research teams and specialist partners.")}<section class="container catalog-section case-index"><div class="completed-project-list">${caseSummaries()}</div></section>`;
}
export function caseDetail(item) {
  return `<article class="container detail-page case-study"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="#/">Home</a><span>/</span><a href="#/cases">Case studies</a></nav><h1 tabindex="-1">${e(item.title)}</h1>${item.projectCode ? `<p class="project-code">${e(item.projectCode)}</p>` : ""}<div class="case-narrative"><p>${e(item.story)}</p></div></article>`;
}
export function home() {
  const serviceCard = (name, id, image) => [name, serviceURL(id), image];
  const fuelURL = "https://www.jaford.com/products/fuel-cell-and-electrolyzer";
  return `${homeCases()}
  ${homeSector("custom-rd", "Custom R&D", [
    serviceCard("Polymer & resin synthesis", "polymer-resin-synthesis", "rd-polymer-reactor"),
    serviceCard("Target molecule synthesis", "small-molecule-synthesis", "rd-molecule-reactor"),
    serviceCard("Synthesis scale-up", "synthesis-scale-up", "rd-scale-up"),
    serviceCard("Carbonization & activation", "carbonization-activation", "rd-rotary-furnace"),
    serviceCard("Electrode processing", "electrode-processing", "rd-coating"),
    serviceCard("Pouch cell development", "pouch-cell-customization", "rd-stacking"),
  ], "Scale your materials and processes with partner facilities and expertise—from lab samples to larger batches, electrodes and cell prototypes.")}
  ${homeSector("battery-technology", "Battery Technology", ["resin-derived-hard-carbon", "biomass-derived-hard-carbon", "spherical-porous-carbon", "cvd-silicon-carbon", "nfpp-powder", "al-3001a"].map(id => [products.find(p => p.id === id).name, productURL(id, "battery-technology"), id]))}
  ${homeSector("fuel-cells-electrolyzers", "Fuel Cells & Electrolyzers", [
    ["Membranes", fuelURL, "fuel-membranes"],
    ["Gas diffusion layers", fuelURL, "gas-diffusion-layers"],
    ["Flow-field plates", fuelURL, "flow-field-plates"],
    ["Gaskets & seals", fuelURL, "gaskets-seals"],
    ["Electrocatalysts", fuelURL + "#electrocatalysis-solutions", "cvd-silicon-carbon"],
    ["CCS / CCM electrodes", fuelURL, "nfpp-electrode"],
  ])}
  ${homeSector("functional-materials", "Functional Materials", [
    serviceCard("MOFs", "functional-materials-development", "mof-framework"),
    serviceCard("COFs", "functional-materials-development", "cof-framework"),
    serviceCard("Functional polymers", "polymer-resin-synthesis", "polymer-structure"),
    serviceCard("Resins", "polymer-resin-synthesis", "resin-structure"),
    serviceCard("Ligands", "small-molecule-synthesis", "ligand-structure"),
    serviceCard("Functional intermediates", "functional-materials-development", "intermediate-structure"),
  ])}
  ${homeSector("testing-characterization", "Testing & Characterization", [
    ["SEM & TEM", serviceURL("material-characterization"), "sem-testing", "Surface morphology and microstructure imaging."],
    ["Li-ion & solid-state batteries", serviceURL("battery-testing"), "battery-cycling", "Cycling, rate performance and protocol-based comparison."],
    ["Pouch cell testing", serviceURL("battery-testing"), "pouch-testing", "Cell-level capacity, cycling and validation."],
    ["Short-stack testing", serviceURL("stack-testing"), "short-stack", "Fuel-cell and electrolyzer stack performance evaluation."],
    ["Full-stack testing", serviceURL("stack-testing"), "full-stack", "Larger-stack operation and system-level validation."],
    ["Wind & solar direct coupling", serviceURL("renewable-coupled-testing"), "renewable-testing", "Electrolysis validation under variable renewable power."],
  ], "Testing coordinated with partner facilities; sample requirements, methods and operating conditions are agreed per project.")}
  ${homeSector("equipment-supplies", "Equipment & Supplies", [
    ["Electrochemical workstation", productURL("chi760f"), "chi760f"],
    ["Vacuum sealer", productURL("vacuum-sealer"), "vacuum-sealer"],
    ["Glass reaction assembly", productURL("glass-reactor-2000ml"), "glass-reactor-2000ml"],
    ["Filtration membranes", productURL("glass-fiber-1823-047"), "glass-fiber-1823-047"],
    ["Nickel sample boats", productURL("nickel-boat"), "nickel-boat"],
    ["Laboratory fittings", productURL("imperial-reducer"), "imperial-reducer"],
  ])}
  <section class="section container home-contact" id="contact"><h2>Contact Us</h2><form id="home-contact-form" class="simple-contact-form"><div class="contact-field"><label for="contact-name"><span aria-hidden="true">*</span> Your Name</label><input id="contact-name" name="name" autocomplete="name" required maxlength="120"></div><div class="contact-field"><label for="contact-email"><span aria-hidden="true">*</span> E-Mail Address</label><input id="contact-email" name="email" type="email" autocomplete="email" required maxlength="200"></div><div class="contact-field"><label for="contact-enquiry"><span aria-hidden="true">*</span> Enquiry</label><textarea id="contact-enquiry" name="enquiry" required minlength="10" maxlength="5000" rows="6"></textarea></div><div class="contact-form-actions"><button class="button button-outline" type="submit">Prepare email</button></div></form><p class="contact-direct">or email <a href="mailto:kiki.li@jaford.com">kiki.li@jaford.com</a></p></section>`;
}
export function technologyDetail(area) {
  const items = itemsForArea(area);
  return `${header("", area.name, area.description)}<section class="container catalog-section" aria-label="Materials, equipment and development support">${area.links.length ? `<div class="area-range"><h2>Materials & capabilities</h2>${area.links.map((item) => `<a class="text-link" href="${item.url}">${item.name}</a>`).join("")}</div>` : ""}${items.products.length ? `<div class="product-grid" aria-label="Products">${items.products.map((p) => productModule(p, productURL(p.id, area.id))).join("")}</div>` : ""}${items.services.length ? `<div class="area-services"><h2 class="area-services-heading">Development capabilities</h2>${items.services.map((s) => servicePreview(s, area.id)).join("")}</div>` : ""}</section>`;
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
  const categoryNav = `<aside class="catalog-sidebar"><h2>Product categories</h2><nav aria-label="Product categories"><a href="#/products${query ? `?q=${encodeURIComponent(query)}` : ""}" ${!selected ? 'aria-current="page"' : ""}>All products <span>${products.length}</span></a>${categories.map(c=>`<a href="#/products?${e(new URLSearchParams({category:c.id,...(query?{q:query}:{})}).toString())}" ${selected===c.id?'aria-current="page"':""}>${e(c.name)} <span>${products.filter(p=>p.category===c.id).length}</span></a>`).join("")}</nav><p>Model specifications and availability are confirmed with your quotation.</p></aside>`;
  return `${header("Product index", "All products", "Browse materials, consumables and equipment by category or model. Specifications, quantity, lead time and availability are confirmed by quotation; this catalog is not a stock list.")}<section class="container catalog-section" aria-label="Product catalog"><div class="catalog-layout">${categoryNav}<div class="catalog-results"><form id="catalog-filters" class="catalog-filters"><label>Category<select name="category" id="category-filter" aria-label="Category"><option value="">All categories</option>${categories.map((c) => `<option value="${c.id}" ${c.id === selected ? "selected" : ""}>${c.name}</option>`).join("")}</select></label><label>Search products<input type="search" name="q" value="${e(query)}" placeholder="Name, model or keywords"></label><button class="button button-dark" type="submit">Search</button>${link("#/products", "Reset filters")}</form><p class="catalog-count" role="status">${matches.length} ${matches.length === 1 ? "product" : "products"}${query ? ` matching “${e(query)}”` : ""}${selected ? ` in ${e(category(selected).name)}` : ""}</p><div class="catalog-list product-grid">${matches.map((p) => productModule(p, detailURL(p.id))).join("") || '<div class="empty-state"><h2>No products match these filters</h2><p>Try a model code, another category or reset the filters.</p></div>'}</div></div></div>${legacy()}</section>${contact()}`;
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
  return `<section class="container detail-page product-detail-page">${backLink}<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="#/">Home</a><span>/</span><a href="${areaURL(area.id)}">${area.name}</a></nav><div class="detail-intro"><div><p class="eyebrow">${c.name}</p><h1 tabindex="-1">${e(p.name)}</h1><p class="detail-description">${e(p.description)}</p>${p.models.length ? `<label class="model-label" for="product-model">Model / option<select id="product-model">${p.models.map((m) => `<option>${e(m)}</option>`).join("")}</select></label>` : ""}${Object.keys(p.specs).length ? `<button class="text-link spec-jump" data-show-spec>View specifications</button>` : ""}</div><figure class="product-figure">${productArtwork(p, true)}<figcaption>Representative illustration. Generic product type; actual appearance, packaging and included components depend on the confirmed model.${p.id === "spherical-porous-carbon" ? " Conceptual drawing, not microscopy or measured morphology." : ""}${p.id.startsWith("nickel-boat") ? " Boat and lid are quoted separately." : ""}</figcaption></figure></div>${Object.keys(p.specs).length ? `<section class="spec-section" aria-labelledby="spec-title"><h2 id="spec-title">Specifications</h2><table class="spec-table"><caption>${e(p.name)} — model-specific specifications</caption><tbody>${Object.entries(
    p.specs,
  )
    .map(
      ([key, value]) =>
        `<tr><th scope="row">${e(key)}</th><td>${e(value)}</td></tr>`,
    )
    .join(
      "",
    )}</tbody></table></section>` : ""}${p.note ? `<p class="technical-note">${e(p.note)}</p>` : ""}<div class="product-contact"><button class="text-link product-inquiry" data-inquiry data-topic="${e(c.name)}" data-item="${e(p.name)}">Request a quotation</button></div></section>`;
}
export function serviceCatalog() {
  return `${header("Service index", "All services", "Specialist resources and process expertise to scale and validate your lab innovations.")}<section class="container catalog-section" aria-label="Service directory">${services.map((s) => `<article class="catalog-row"><h2><a href="${serviceURL(s.id)}">${s.name}</a></h2><div><p>${s.description}</p>${link(serviceURL(s.id), "Explore this capability")}</div></article>`).join("")}</section>${contact()}`;
}
const serviceArtwork = {
  "polymer-resin-synthesis": "rd-polymer-reactor",
  "small-molecule-synthesis": "rd-molecule-reactor",
  "synthesis-scale-up": "rd-scale-up",
  "carbonization-activation": "rd-rotary-furnace",
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
const servicePreview = (s, areaId) => `<article class="capability-row"><a class="capability-visual" href="${serviceURL(s.id, areaId)}" aria-label="${e(s.name)}"><figure>${productArtwork({id: serviceArtwork[s.id]})}</figure><h3>${e(s.name)}</h3></a><p>${e(s.description)}</p></article>`;
export function serviceDetail(s, areaId) {
  const area = areasForService(s.id).find(t => t.id === areaId) || areasForService(s.id)[0];
  return `<section class="container detail-page service-detail concise-service"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="#/">Home</a><span>/</span><a href="${areaURL(area.id)}">${area.name}</a></nav><div class="service-overview"><div><h1 tabindex="-1">${e(s.name)}</h1><p class="detail-description">${e(s.description)}</p></div><figure>${productArtwork({id:serviceArtwork[s.id]},true)}</figure></div></section>`;
}
export function notFound() {
  return `${header("JAFORD", "Page not found", "This product or service link is not in the current catalog.")}<div class="container detail-next">${link("#/products", "Browse products")}${link("#/services", "Browse services")}</div>`;
}
