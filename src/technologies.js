import { functionalCapabilities, testingCapabilities } from "./specialist-capabilities.js";
import { fuelCellProducts } from "./fuel-cell-products.js";
import { products, services } from "./catalog.js";

export const areaAliases = {
  "battery-materials": "battery-technology",
  "battery-cells": "battery-technology",
  electrocatalysis: "fuel-cells-electrolyzers",
  "advanced-materials": "functional-materials",
  "lab-equipment": "equipment-supplies",
};
export const technologies = [
  {
    id: "custom-rd", nav: "Custom R&D", name: "Custom R&D",
    featuredIds: ["polymer-resin-synthesis", "small-molecule-synthesis", "synthesis-scale-up", "carbonization-activation", "electrode-processing", "pouch-cell-customization"],
    homeDescription: "Scale your materials and processes with partner facilities and expertise—from lab samples to larger batches, electrodes and cell prototypes.",
    description: "Connect your lab innovation with specialist synthesis, processing and validation resources—from small samples to larger batches and working prototypes.",
    productIds: [], serviceIds: [
      "polymer-resin-synthesis", "small-molecule-synthesis", "synthesis-scale-up",
      "functional-materials-development", "carbonization-activation", "sintering-heat-treatment",
      "electrode-processing", "pouch-cell-customization", "research-procurement",
      "battery-testing", "stack-testing", "renewable-coupled-testing", "material-characterization",
    ], links: [],
  },
  {
    casePrefix: "PBT", hideDescription: true,
    id: "battery-technology", nav: "Battery Technology", name: "Battery Technology",
    featuredIds: ["resin-derived-hard-carbon", "biomass-derived-hard-carbon", "spherical-porous-carbon", "cvd-silicon-carbon", "nfpp-powder", "al-3001a"],
    description: "Materials, binders, electrolytes, electrodes and cells for lithium-ion and sodium-ion battery research.",
    productIds: products.filter(p => ["battery-materials", "binders-electrolytes", "electrodes-cells"].includes(p.category)).map(p => p.id),
    serviceIds: [], links: [],
  },
  {
    id: "fuel-cells-electrolyzers", nav: "Fuel Cells & Electrolyzers", name: "Fuel Cells & Electrolyzers",
    featuredIds: fuelCellProducts.slice(0, 6).map(p => p.id),
    description: "Fuel-cell and electrolyzer materials, components, catalysts and electrochemical hardware.",
    productIds: fuelCellProducts.map(p => p.id),
    serviceIds: [], links: [],
  },
  {
    casePrefix: "PFM", hideDescription: true,
    id: "functional-materials", nav: "Functional Materials", name: "Functional Materials",
    description: "MOFs, COFs, functional polymers and related materials. Custom development is assessed against the target structure, application and agreed characterization requirements.",
    featuredIds: functionalCapabilities.slice(0, 6).map(s => s.id),
    productIds: [], serviceIds: functionalCapabilities.map(s => s.id), links: [],
  },
  {
    hideDescription: true,
    id: "testing-characterization", nav: "Testing & Characterization", name: "Testing & Characterization",
    description: "Battery testing, comparative validation and project-specific material characterization coordinated through partner laboratories.",
    featuredIds: [...testingCapabilities.slice(0, 5).map(s => s.id), "renewable-coupled-testing"],
    homeDescription: "Testing coordinated with partner facilities; sample requirements, methods and operating conditions are agreed per project.",
    productIds: [], serviceIds: [...testingCapabilities.slice(0, 5).map(s => s.id), "renewable-coupled-testing", ...testingCapabilities.slice(5).map(s => s.id)], links: [],
  },
  {
    hideDescription: true,
    id: "equipment-supplies", nav: "Equipment & Supplies", name: "Equipment & Supplies",
    featuredIds: ["chi760f", "vacuum-sealer", "glass-reactor-2000ml", "glass-fiber-1823-047", "nickel-boat", "imperial-reducer"],
    homeLabels: {"chi760f": "Electrochemical workstation", "vacuum-sealer": "Vacuum sealer", "glass-reactor-2000ml": "Glass reaction assembly", "glass-fiber-1823-047": "Glass-fiber filters", "nickel-boat": "Nickel sample boats", "imperial-reducer": "Reducing fittings"},
    description: "Laboratory equipment, reaction assemblies, filtration media, consumables and accessories.",
    productIds: ["chi760f", "vacuum-sealer", "glass-reactor-2000ml", ...products.filter(p => p.category === "lab-supplies" && !["chi760f", "vacuum-sealer", "glass-reactor-2000ml"].includes(p.id)).map(p => p.id)], serviceIds: [], links: [],
  },
];
export const areasForProduct = id => technologies.filter(t => t.productIds.includes(id));
export const areasForService = id => technologies.filter(t => t.serviceIds.includes(id));
export const itemsForArea = area => ({
  products: area.productIds.map(id => products.find(p => p.id === id)),
  services: area.serviceIds.map(id => services.find(s => s.id === id)),
});

// Homepage selections are always drawn from the category's full directory.
export const featuredItemsForArea = area => area.featuredIds.map(id => {
  const kind = area.productIds.includes(id) ? "product" : "service";
  const allowed = kind === "product" ? area.productIds : area.serviceIds;
  const item = (kind === "product" ? products : services).find(item => item.id === id);
  if (!allowed.includes(id) || !item) throw new Error(`Invalid featured item ${id} in ${area.id}`);
  return {kind, item};
});
