// Public tables contain catalog facts and identified model/type facts only.
// Comparable-product examples stay in the internal source ledger.
export function specFields(item, option, kind) {
  const originalId = option.originalId || item.id;
  const rows = { 'Model / type': option.name, ...(option.specs || item.specs || {}) };
  const shared = {
    'fuel-membranes': {Type: 'Ion-exchange membrane', Application: 'Fuel-cell and water-electrolysis research'},
    'fuel-gas-diffusion-layers': {Type: 'Gas diffusion layer', Function: 'Reactant transport and electrical contact'},
    'fuel-mea': {Type: 'Membrane electrode assembly', Structure: 'Integrated membrane and electrode layers'},
    'fuel-ccm': {Type: 'Catalyst-coated membrane', Coating: 'Catalyst layers applied directly to the membrane'},
    'fuel-ccs': {Type: 'Catalyst-coated substrate', Structure: 'Catalyst layer on a selected support'},
    'fuel-electrocatalysts': {Application: 'Hydrogen evolution, oxygen evolution and carbon-dioxide reduction research'},
    'fuel-flow-field-plates': {Function: 'Reactant distribution in fuel-cell and electrolyzer assemblies'},
    'fuel-gaskets-seals': {Function: 'Sealing fuel-cell and electrolyzer assemblies'},
    'spherical-porous-carbon': {'Activation type': option.name, Application: 'Carbon host for silicon deposition'},
    'cvd-silicon-carbon': {'Material system': 'Silicon-carbon composite', 'Morphology / coating': 'Spherical; secondary carbon coating', Application: 'Battery anode research'},
    'nfpp-powder': {'Material identity': 'NFPP', 'Chemical formula': 'Na4Fe3(PO4)2P2O7', Application: 'Sodium-ion cathode research'},
    'al-3001a': {'Polymer class': 'Styrene-butadiene rubber (SBR)', Application: 'Negative-electrode binder'},
    'jone-174': {Application: 'Battery electrode binder'},
    'qms029d': {Model: 'QMS029D', Application: 'Battery research electrolyte'},
    'xyss-dghykj118': {Model: 'XYSS-DGHYKJ118', Application: 'Battery research electrolyte'},
    'nfm-electrolyte': {Application: 'NFM sodium-ion systems'},
    'nfpp-electrode': {'Active material': 'NFPP', 'Coating sides': option.name.includes('Double-sided') ? 'Double-sided' : 'Single-sided'},
    'p2-electrode': {'Electrode type': 'P2 sodium-ion cathode', Dimensions: '7.5 × 5.4 cm', 'Coating sides': 'Double-sided'},
    'research-pouch-cells': {'Cell format': 'Pouch', 'Battery system': option.name.startsWith('Sodium') ? 'Sodium-ion' : 'Lithium-ion', 'Delivery state': option.name.includes('dry') ? 'Dry cell' : 'Electrolyte-filled and formed'},
    'eve-lf100la': {Chemistry: 'Lithium iron phosphate (LFP)', 'Nominal voltage (published model)': '3.2 V'},
    'glass-fiber-1823-047': {'Published grade reference': 'Whatman GF/D 1823-047', 'Diameter (published grade)': '47 mm', 'Thickness (published grade)': '0.67 mm', 'Pore rating (published grade)': '2.7 µm', 'Material (published grade)': 'Borosilicate glass microfiber'},
    'check-valve': {Function: 'Limit reverse flow in laboratory fluid systems'},
    'imperial-reducer': {Function: 'Connect differing tubing or connection sizes'},
    'adapter-plug': {Function: 'Adapt laboratory equipment connector formats'},
    'vacuum-sealer': {Process: 'Vacuum sealing for laboratory packaging'},
  };
  Object.assign(rows, shared[originalId] || {});
  if (item.id === 'electrochemical-workstation') {
    Object.assign(rows, option.reference.fields);
  } else if (option.source) {
    Object.assign(rows, option.fields, {Application: option.use});
    // Broad families must not imply a single commercial grade or ionic form.
    if (item.id === 'resin-development' && option.name === 'Ion-exchange resins') {
      delete rows['Reference functionality'];
      delete rows['Reference type'];
      rows.Function = 'Ion exchange using functionalized polymer resins';
    }
    if (option.name === 'Polyaniline (PANI)') {
      delete rows['Reference form'];
      rows['Electrical behavior'] = 'Depends on oxidation state and doping';
    }
  }
  if (kind === 'service' && !option.source) {
    rows['Capability / application'] = item.description;
  }
  // Do not repeat the same identifier under two keys.
  if (rows.Model === rows['Model / type']) delete rows['Model / type'];
  return rows;
}
