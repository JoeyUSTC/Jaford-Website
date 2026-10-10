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
    description: "Connect your lab innovation with specialist synthesis, processing and validation resources—from small samples to larger batches and working prototypes.",
    productIds: [], serviceIds: [
      "polymer-resin-synthesis", "small-molecule-synthesis", "synthesis-scale-up",
      "functional-materials-development", "carbonization-activation", "sintering-heat-treatment",
      "electrode-processing", "pouch-cell-customization", "research-procurement",
      "battery-testing", "stack-testing", "renewable-coupled-testing", "material-characterization",
    ], links: [],
  },
  {
    id: "battery-technology", nav: "Battery Technology", name: "Battery Technology",
    description: "Materials, binders, electrolytes, electrodes and cells for lithium-ion and sodium-ion battery research.",
    productIds: products.filter(p => ["battery-materials", "binders-electrolytes", "electrodes-cells"].includes(p.category)).map(p => p.id),
    serviceIds: [], links: [],
  },
  {
    id: "fuel-cells-electrolyzers", nav: "Fuel Cells & Electrolyzers", name: "Fuel Cells & Electrolyzers",
    description: "Fuel-cell and electrolyzer materials, components, catalysts and electrochemical hardware.",
    productIds: fuelCellProducts.map(p => p.id),
    serviceIds: [], links: [],
  },
  {
    id: "functional-materials", nav: "Functional Materials", name: "Functional Materials",
    description: "MOFs, COFs, functional polymers and related materials. Custom development is assessed against the target structure, application and agreed characterization requirements.",
    productIds: [], serviceIds: ["functional-materials-development"], links: [
      {name: "Explore functional materials and membranes", url: "https://www.jaford.com/products/membranes-polymers"},
      {name: "Custom R&D services", url: "#/technologies/custom-rd"},
    ],
  },
  {
    id: "testing-characterization", nav: "Testing & Characterization", name: "Testing & Characterization",
    description: "Battery testing, comparative validation and project-specific material characterization coordinated through partner laboratories.",
    productIds: [], serviceIds: ["material-characterization", "battery-testing", "stack-testing", "renewable-coupled-testing"], links: [],
  },
  {
    id: "equipment-supplies", nav: "Equipment & Supplies", name: "Equipment & Supplies",
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
