import { cases } from "./cases.js";
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
  `<article class="catalog-row product-module"><a class="product-module-link" href="${e(href)}" aria-label="${e(p.name)}"><figure class="module-figure">${productArtwork(p)}</figure><div class="module-content"><p class="eyebrow">${category(p.category).name}</p><h2>${e(p.name)}</h2><p class="module-description">${e(p.description)}</p>${p.models.length ? `<p class="catalog-models module-models"><span>Models / options</span>${e(p.models.join(" · "))}</p>` : ""}<div class="module-purchase"><span class="module-cta">${Object.keys(p.specs).length ? "View specs" : "View product"}</span></div></div></a></article>`;
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
// Family entries describe established ranges, not newly invented model specifications.
const homeCard = (name, href, imageId, description = "") => `<article class="sector-card"><a href="${e(href)}"><figure>${productArtwork({ id: imageId })}</figure><h3>${e(name)}</h3>${description ? `<p class="sector-card-description">${e(description)}</p>` : ""}</a></article>`;
const homeSector = (id, title, cards, description = "") => `<section class="section container home-sector" id="${id}"><div class="sector-heading"><h2>${title}</h2>${link(areaURL(id), "Browse all")}</div>${description ? `<p class="sector-description">${description}</p>` : ""}<div class="sector-grid">${cards.map(card => homeCard(...card)).join("")}</div></section>`;
const relatedAreas = (areas) =>
  `<aside class="related-areas"><h2>Related technology areas</h2>${areas.map((t) => link(areaURL(t.id), t.name)).join("")}</aside>`;
const caseSummaries = () => cases.map((item) => `<article class="case-summary"><p class="eyebrow">Case study · ${e(item.category)}</p><h3><a href="#/cases/${item.id}">${e(item.title)}</a></h3><p>${e(item.summary)}</p><dl class="case-card-facts"><div><dt>Project</dt><dd>${e(item.category)}</dd></div><div><dt>Outcome</dt><dd>${e(item.deliverable)} delivered</dd></div></dl>${link(`#/cases/${item.id}`, "Read case study")}</article>`).join("");
export function caseCatalog() {
  return `${header("Project experience", "Completed custom projects", "Selected custom synthesis projects coordinated through our partner network. Client identities and proprietary formulations remain confidential.")}<section class="container catalog-section"><div class="completed-project-list">${caseSummaries()}</div></section>${contact()}`;
}
export function caseDetail(item) {
  return `<article class="container detail-page case-study"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="#/cases">Case studies</a><span>/</span><span>${e(item.category)}</span></nav><p class="eyebrow">${e(item.category)} · Completed</p><h1 tabindex="-1">${e(item.title)}</h1><p class="detail-description">${e(item.summary)}</p><div class="case-layout"><div>${[["The project",item.requirement],["How JAFORD supported the work",item.scope],["Delivery & outcome",item.outcome]].map(([heading,body])=>`<section class="case-chapter"><h2>${heading}</h2><p>${e(body)}</p></section>`).join("")}</div><aside class="case-facts"><h2>Project overview</h2><dl><dt>Field</dt><dd>${e(item.category)}</dd><dt>Engagement</dt><dd>Partner-coordinated custom synthesis</dd><dt>Status</dt><dd>Completed and delivered</dd><dt>Deliverable</dt><dd>${e(item.deliverable)}</dd></dl></aside></div><p class="technical-note">This anonymized summary describes the confirmed delivery. It does not disclose client specifications or formulations. Requirements and acceptance criteria for a new project are agreed separately.</p><div class="detail-next">${link(`#/services/${item.serviceId}`,item.serviceName)}${inquiry("Discuss a similar project","Custom R&D project",item.title)}</div>${link("#/cases","All case studies")}</article>`;
}
export function home() {
  const serviceCard = (name, id, image) => [name, serviceURL(id), image];
  const fuelURL = "https://www.jaford.com/products/fuel-cell-and-electrolyzer";
  return `<section class="hero container home-hero"><div class="brand-statement"><p class="brand-lead">From Innovation to Industry Impact:</p><h1 tabindex="-1">Long-term Partner in Technology Translation</h1></div><p class="hero-description">JAFORD partners with startups and research teams to bridge the gap between lab innovation and industrial application. Together, we combine technical knowledge with materials and facilities from established industrial supply chains to accelerate technology validation, process scale-up and the path to commercialization.</p></section>
  ${homeSector("custom-rd", "Custom R&D", [
    serviceCard("Polymer & resin synthesis", "polymer-resin-synthesis", "rd-polymer-reactor"),
    serviceCard("Target molecule synthesis", "small-molecule-synthesis", "rd-molecule-reactor"),
    serviceCard("Synthesis scale-up", "synthesis-scale-up", "rd-scale-up"),
    serviceCard("Carbonization & activation", "carbonization-activation", "rd-rotary-furnace"),
    serviceCard("Electrode processing", "electrode-processing", "rd-coating"),
    serviceCard("Pouch cell development", "pouch-cell-customization", "rd-stacking"),
  ], "From small lab batches to pilot-scale processes: synthesis, processing and cell development coordinated with partner factories and laboratories.")}
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
    serviceCard("Functional polymers", "polymer-resin-synthesis", "functional-polymer"),
    serviceCard("Resins", "polymer-resin-synthesis", "resin-granules"),
    serviceCard("Ligands", "small-molecule-synthesis", "solid-samples"),
    serviceCard("Functional intermediates", "functional-materials-development", "solid-samples"),
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
export function technologyDirectory() {
  return `${header("JAFORD", "Technology areas", "Explore the materials, equipment and related development support for your research area.")}<section class="container catalog-section" aria-label="Technology directory"><div class="product-list">${areaRows()}</div></section>${contact()}`;
}
export function technologyDetail(area) {
  const items = itemsForArea(area);
  return `<div class="container area-breadcrumb">${link("#/technologies", "All technology areas")}</div>${header("Technology area", area.name, area.description)}<section class="container catalog-section" aria-label="Materials, equipment and development support">${area.id === "custom-rd" ? `<div class="section-heading"><h2>Completed projects</h2></div><div class="completed-project-list">${caseSummaries()}</div><h2 class="area-services-heading">Capabilities</h2>` : ""}${area.links.length ? `<div class="area-range"><h2>Materials & capabilities</h2>${area.links.map((item) => `<a class="text-link" href="${item.url}">${item.name}</a>`).join("")}</div>` : ""}${items.products.length ? `<div class="product-grid" aria-label="Products">${items.products.map((p) => productModule(p, productURL(p.id, area.id))).join("")}</div>` : ""}${items.services.length ? `<div class="area-services"><h2 class="area-services-heading">Related development & services</h2>${items.services.map((s) => `<article class="catalog-row"><h3><a href="${serviceURL(s.id, area.id)}">${e(s.name)}</a></h3><div><p>${e(s.description)}</p>${link(serviceURL(s.id, area.id), "Scope, inputs & deliverables")}</div></article>`).join("")}</div>` : ""}</section>${contact()}`;
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
  return `<section class="container detail-page product-detail-page">${backLink}<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="#/technologies">Technology areas</a><span>/</span><a href="${areaURL(area.id)}">${area.name}</a></nav><div class="detail-intro"><div><p class="eyebrow">${c.name}</p><h1 tabindex="-1">${e(p.name)}</h1><p class="detail-description">${e(p.description)}</p>${p.models.length ? `<label class="model-label" for="product-model">Model / option<select id="product-model">${p.models.map((m) => `<option>${e(m)}</option>`).join("")}</select></label>` : ""}${Object.keys(p.specs).length ? `<button class="text-link spec-jump" data-show-spec>View specifications</button>` : ""}</div><figure class="product-figure">${productArtwork(p, true)}<figcaption>Representative illustration. Generic product type; actual appearance, packaging and included components depend on the confirmed model.${p.id === "spherical-porous-carbon" ? " Conceptual drawing, not microscopy or measured morphology." : ""}${p.id.startsWith("nickel-boat") ? " Boat and lid are quoted separately." : ""}</figcaption></figure></div>${Object.keys(p.specs).length ? `<section class="spec-section" aria-labelledby="spec-title"><h2 id="spec-title">Specifications</h2><table class="spec-table"><caption>${e(p.name)} — model-specific specifications</caption><tbody>${Object.entries(
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
