import { products, services } from "./catalog.js";

// Technology areas are the primary navigation; product/service types are secondary.
export const technologies = [
  {
    id: "battery-materials",
    nav: "Battery materials",
    name: "Battery materials & electrodes",
    description:
      "Li / Na battery powders, binders, electrolytes and electrodes, with material processing and testing support.",
    productIds: products
      .filter(
        (p) =>
          ["battery-materials", "binders-electrolytes"].includes(p.category) ||
          ["nfpp-electrode", "p2-electrode"].includes(p.id),
      )
      .map((p) => p.id),
    serviceIds: [
      "carbonization-activation",
      "sintering-heat-treatment",
      "electrode-processing",
      "battery-testing",
      "research-procurement",
    ],
    links: [],
  },
  {
    id: "battery-cells",
    nav: "Battery cells",
    name: "Battery cells",
    description:
      "Research pouch cells and prismatic cells, with electrode matching, cell customization and validation support.",
    productIds: ["research-pouch-cells", "eve-lf100la"],
    serviceIds: [
      "pouch-cell-customization",
      "battery-testing",
      "research-procurement",
    ],
    links: [],
  },
  {
    id: "fuel-cells-electrolyzers",
    nav: "Fuel cells & electrolyzers",
    name: "Fuel cells & electrolyzers",
    description:
      "Membranes, gas diffusion layers, flow-field plates, gaskets and stack hardware for electrochemical systems.",
    productIds: [],
    serviceIds: ["research-procurement"],
    links: [
      {
        name: "Fuel-cell & electrolyzer materials and components",
        url: "https://www.jaford.com/products/fuel-cell-and-electrolyzer#electrolyzer-solutions",
      },
      {
        name: "Fuel-cell & electrolyzer development",
        url: "https://www.jaford.com/products/custom-r-and-d-services#device-rd",
      },
    ],
  },
  {
    id: "electrocatalysis",
    nav: "Electrocatalysis",
    name: "Electrocatalysis",
    description:
      "Catalysts, electrode substrates and electrochemical equipment for CO₂RR, HER and OER research.",
    productIds: ["chi760f"],
    serviceIds: ["research-procurement"],
    links: [
      {
        name: "Electrocatalysts, CCS/CCM and electrolysis hardware",
        url: "https://www.jaford.com/products/fuel-cell-and-electrolyzer#electrocatalysis-solutions",
      },
    ],
  },
  {
    id: "advanced-materials",
    nav: "Advanced materials",
    name: "Advanced materials & synthesis",
    description:
      "MOF / COF development, functional materials, polymer and resin synthesis, ligands and process scale-up.",
    productIds: ["spherical-porous-carbon"],
    serviceIds: [
      "functional-materials-development",
      "polymer-resin-synthesis",
      "small-molecule-synthesis",
      "synthesis-scale-up",
      "carbonization-activation",
      "sintering-heat-treatment",
      "research-procurement",
    ],
    links: [
      {
        name: "Functional materials, membranes and synthesis",
        url: "https://www.jaford.com/products/membranes-polymers",
      },
    ],
  },
  {
    id: "lab-equipment",
    nav: "Lab equipment",
    name: "Lab supplies & equipment",
    description:
      "Filtration media, glass reaction assemblies, laboratory accessories and equipment sourcing.",
    productIds: products
      .filter((p) => p.category === "lab-supplies")
      .map((p) => p.id),
    serviceIds: ["research-procurement"],
    links: [],
  },
];
export const areasForProduct = (id) =>
  technologies.filter((t) => t.productIds.includes(id));
export const areasForService = (id) =>
  technologies.filter((t) => t.serviceIds.includes(id));
export const itemsForArea = (area) => ({
  products: area.productIds.map((id) => products.find((p) => p.id === id)),
  services: area.serviceIds.map((id) => services.find((s) => s.id === id)),
});
