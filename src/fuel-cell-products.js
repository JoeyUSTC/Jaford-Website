// Established product families from the owner's scope, not model-specific SKUs.
const family = (id, name, description, image, missingSpecs) => ({
  id, name, description, image, category: "fuel-cells-electrolyzers",
  models: [], specs: {}, missingSpecs, note: "",
});
export const fuelCellProducts = [
  family("fuel-membranes", "Membranes", "Ion-exchange membranes for fuel-cell and water-electrolysis research. Material selection depends on the electrochemical system and intended operating conditions.", "fuel-membranes", ["Membrane chemistry", "Thickness", "Dimensions", "Operating conditions"]),
  family("fuel-gas-diffusion-layers", "Gas diffusion layers", "Porous gas diffusion materials for reactant transport and electrical contact in electrochemical cells. Substrate and surface treatment are selected for the intended electrode and cell design.", "gas-diffusion-layers", ["Substrate", "Thickness", "Porosity", "Surface treatment", "Dimensions"]),
  family("fuel-mea", "Membrane electrode assemblies (MEA)", "Membrane electrode assemblies bring the membrane and electrode layers together for fuel-cell or water-electrolysis development. The assembly configuration is matched to the selected chemistry and cell design.", "fuel-mea", ["Cell chemistry", "Layer configuration", "Catalyst composition", "Catalyst loading", "Active area"]),
  family("fuel-ccm", "Catalyst-coated membranes (CCM)", "Catalyst-coated membranes combine a membrane with catalyst layers applied directly to its surfaces. They support electrode and cell development where membrane selection and catalyst-layer design need to be considered together.", "fuel-ccm", ["Membrane", "Catalyst composition", "Catalyst loading", "Coated area", "Dimensions"]),
  family("fuel-electrocatalysts", "Electrocatalysts", "Electrocatalysis materials for hydrogen evolution, oxygen evolution and carbon-dioxide reduction research. Composition and form are selected around the reaction and experimental setup.", "cvd-silicon-carbon", ["Composition", "Support", "Particle size", "Surface area", "Test conditions"]),
  family("fuel-flow-field-plates", "Flow-field plates", "Flow-field plates for reactant distribution and cell assembly in fuel-cell and electrolyzer development. Plate material, channel pattern and dimensions are matched to the cell configuration.", "flow-field-plates", ["Material", "Channel geometry", "Dimensions", "Surface finish"]),
  family("fuel-gaskets-seals", "Gaskets & seals", "Gaskets and seals for fuel-cell and electrolyzer assemblies. Geometry, thickness and material compatibility are considered together with the cell’s compression and sealing requirements.", "gaskets-seals", ["Material", "Thickness", "Geometry", "Chemical compatibility"]),
  family("fuel-ccs", "Catalyst-coated substrates (CCS)", "Catalyst-coated substrates place the catalyst layer on a selected support for electrode development. Support selection and coating design are matched to the reaction and cell architecture.", "fuel-ccs", ["Substrate", "Catalyst composition", "Catalyst loading", "Coated area", "Dimensions"]),
];
export const featuredFuelCellProducts = fuelCellProducts.slice(0, 6);
