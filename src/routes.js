import { products, retiredProducts, services, productAliases, serviceAliases } from "./catalog.js";
import { cases, unnumberedCases, caseAliases } from "./cases.js";
import { technologies, areaAliases, areasForProduct, areasForService, itemsForArea } from "./technologies.js";
import { publicPath, internalPath, movedPaths } from "./url-paths.js";

export const homeDescription = "JAFORD provides materials, consumables and equipment for research teams, and coordinates custom synthesis, processing and development through partner factories and laboratories.";
const shortDescription = value => {
  const text = value.replace(/\s+/g, " ").trim();
  if (text.length <= 180) return text;
  const end = text.lastIndexOf(" ", 177);
  return text.slice(0, end > 100 ? end : 177).replace(/[,;:]$/, "") + "…";
};
export function resolveRoute(raw = "/") {
  const [input, query = ""] = raw.replace(/^#/, "").split("?");
  let path = internalPath("/" + input.replace(/\/index\.html$/, "").replace(/^\/+|\/+$/g, ""));
  const params = new URLSearchParams(query);
  if (areaAliases[params.get("area")]) params.set("area", areaAliases[params.get("area")]);
  if (path === "/technologies") path = "/";
  const aliasGroups = [["technologies", areaAliases], ["products", productAliases], ["services", serviceAliases], ["cases", caseAliases]];
  for (const [prefix, aliases] of aliasGroups) {
    const id = path.startsWith(`/${prefix}/`) ? path.slice(prefix.length + 2) : "";
    if (aliases[id]) path = `/${prefix}/${aliases[id]}`;
  }
  let type = "not-found", item, area, title = "Page not found — JAFORD", description = "This product or service link is not in the current catalog.";
  let indexable = true;
  if (path === "/") {
    type = "home"; title = "JAFORD"; description = homeDescription;
  } else if (path === "/contact") {
    type = "contact"; title = "Contact Us — JAFORD"; description = "Contact JAFORD at kiki.li@jaford.com. Prepare an email enquiry with your name, email address and requirements.";
  } else if (path === "/owner-insights") {
    type = "owner"; title = "Website insights — JAFORD"; description = "Private website insights."; indexable = false;
  } else if (path === "/products") {
    type = "products"; title = "Products — JAFORD";
    description = "Browse materials, consumables and equipment by category or model. Specifications, quantity, lead time and availability are confirmed by quotation; this catalog is not a stock list.";
    indexable = !params.get("q") && !params.get("category");
  } else if (path === "/services") {
    type = "services"; title = "Custom R&D & Services — JAFORD";
    description = "Specialist resources and process expertise to scale and validate your lab innovations.";
  } else if (path === "/cases") {
    type = "cases"; title = "Case studies — JAFORD";
    description = "Custom development cases. How research teams work with JAFORD to move ideas into larger-scale trials and validation.";
  } else if ((area = technologies.find(t => path === `/technologies/${t.id}`))) {
    type = "technology"; title = `${area.name} — JAFORD`;
    const items = itemsForArea(area);
    description = area.hideDescription ? `${area.name}: ${[...items.products, ...items.services].map(item => item.name).join(", ")}.` : area.description;
  } else if ((item = [...products, ...retiredProducts].find(p => path === `/products/${p.id}`))) {
    type = "product"; title = `${item.name} — JAFORD`; description = item.description;
    area = areasForProduct(item.id).find(t => t.id === params.get("area")) || areasForProduct(item.id)[0] || technologies.find(t => t.id === "equipment-supplies");
    if (area.id === areasForProduct(item.id)[0]?.id) params.delete("area");
    indexable = !retiredProducts.includes(item);
  } else if ((item = services.find(s => path === `/services/${s.id}`))) {
    type = "service"; title = `${item.name} — JAFORD`; description = item.description;
    area = areasForService(item.id).find(t => t.id === params.get("area")) || areasForService(item.id)[0];
    if (area.id === areasForService(item.id)[0]?.id) params.delete("area");
  } else if ((item = [...cases, ...unnumberedCases].find(c => path === `/cases/${c.id}`))) {
    type = "case"; title = `${item.title} — JAFORD`; description = item.summary;
    indexable = cases.includes(item);
  } else indexable = false;
  return {path:publicPath(path), params, type, item, area, title, description: shortDescription(description), indexable};
}

export const publicRoutes = ["/", "/contact", "/products", "/services", "/cases",
  ...technologies.map(t => `/technologies/${t.id}`),
  ...products.map(p => `/products/${p.id}`), ...services.map(s => `/services/${s.id}`),
  ...cases.map(c => `/cases/${c.id}`)].map(publicPath);
export const compatibilityRoutes = ["/technologies", ...Object.keys(movedPaths),
  ...Object.keys(areaAliases).map(id => `/technologies/${id}`),
  ...Object.keys(productAliases).map(id => `/products/${id}`),
  ...Object.keys(serviceAliases).map(id => `/services/${id}`),
  ...Object.keys(caseAliases).map(id => `/cases/${id}`),
  ...retiredProducts.map(p => `/products/${p.id}`), ...unnumberedCases.map(c => `/cases/${c.id}`)];
