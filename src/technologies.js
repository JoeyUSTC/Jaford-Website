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
    description: "Custom synthesis, material development, process replication, electrode and cell development, coordinated through partner laboratories and factories.",
    productIds: [], serviceIds: services.map(s => s.id), links: [],
  },
  {
    id: "battery-technology", nav: "Battery Technology", name: "Battery Technology",
    description: "Materials, binders, electrolytes, electrodes and cells for lithium-ion and sodium-ion battery research.",
    productIds: products.filter(p => p.category !== "lab-supplies").map(p => p.id),
    serviceIds: [], links: [],
  },
  {
    id: "fuel-cells-electrolyzers", nav: "Fuel Cells & Electrolyzers", name: "Fuel Cells & Electrolyzers",
    description: "Fuel-cell and electrolyzer materials, components, catalysts and electrochemical hardware.",
    productIds: [], serviceIds: [], links: [
      { name: "Fuel-cell & electrolyzer materials and components", url: "https://www.jaford.com/products/fuel-cell-and-electrolyzer#electrolyzer-solutions" },
      { name: "Electrocatalysts, CCS/CCM and electrolysis hardware", url: "https://www.jaford.com/products/fuel-cell-and-electrolyzer#electrocatalysis-solutions" },
    ],
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
    productIds: [], serviceIds: ["battery-testing", "material-characterization"], links: [],
  },
  {
    id: "equipment-supplies", nav: "Equipment & Supplies", name: "Equipment & Supplies",
    description: "Laboratory equipment, reaction assemblies, filtration media, consumables and accessories.",
    productIds: products.filter(p => p.category === "lab-supplies").map(p => p.id), serviceIds: [], links: [],
  },
];
export const areasForProduct = id => technologies.filter(t => t.productIds.includes(id));
export const areasForService = id => technologies.filter(t => t.serviceIds.includes(id));
export const itemsForArea = area => ({
  products: area.productIds.map(id => products.find(p => p.id === id)),
  services: area.serviceIds.map(id => services.find(s => s.id === id)),
});
