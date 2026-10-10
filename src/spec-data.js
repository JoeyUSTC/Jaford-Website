// Reference facts are kept separate from the owner's confirmed catalog data.
const source = (title, url) => ({ title, url, reviewed: "2026-10-10" });
export const sources = {
  chi600: source("CH Instruments — 600F series specifications and model comparison", "https://www.chinstruments.com/chi600.shtml"),
  chi700: source("CH Instruments — 700F series specifications and model comparison", "https://www.chinstruments.com/chi700.shtml"),
  mof: source("Sigma-Aldrich — Metal Organic Frameworks", "https://www.sigmaaldrich.com/MV/en/technical-documents/technical-article/materials-science-and-engineering/photovoltaics-and-solar-cells/metal-organic-frameworks"),
  uio: source("Cavka et al. — zirconium-based UiO framework, JACS (2008)", "https://doi.org/10.1021/ja8057953"),
  zif67: source("Sigma-Aldrich — ZIF-67(Co) material identity", "https://www.sigmaaldrich.com/US/en/product/chemscenellcpreferredpartner/ciah98abf45a"),
  cof5: source("Cote et al. — Porous, Crystalline, Covalent Organic Frameworks (2005)", "https://doi.org/10.1126/science.1120411"),
  cof300: source("Uribe-Romo et al. — imine-linked COF-300 (2009)", "https://doi.org/10.1021/ja8096256"),
  tppa: source("Kandambeth et al. — keto-enamine COFs (2012)", "https://pubmed.ncbi.nlm.nih.gov/23153356/"),
  paa: source("Sigma-Aldrich — poly(acrylic acid)", "https://www.sigmaaldrich.com/US/en/product/aldrich/323667"),
  peg: source("Sigma-Aldrich — polyethylene glycol technical information", "https://www.sigmaaldrich.com/deepweb/assets/sigmaaldrich/product/documents/725/234/81253dat.pdf"),
  pvdf: source("Sigma-Aldrich — PVDF membrane material", "https://www.sigmaaldrich.com/US/en/product/mm/svlp04700"),
  pani: source("Sigma-Aldrich — polyaniline emeraldine base", "https://www.sigmaaldrich.com/US/en/product/aldrich/576379"),
  resin: source("Sigma-Aldrich — specialty polymers and epoxy prepolymers", "https://www.sigmaaldrich.com/MD/en/products/materials-science/electronic-materials/specialty-and-smart-polymers"),
  exchange: source("Sigma-Aldrich — strongly basic anion-exchange resin", "https://www.sigmaaldrich.com/RE/en/product/sial/44340"),
  ligand: source("Sigma-Aldrich — 2,2'-bipyridine ligand", "https://www.sigmaaldrich.com/US/en/product/sial/d216305"),
  imidazole: source("Sigma-Aldrich — 2-methylimidazole", "https://www.sigmaaldrich.com/BE/en/product/aldrich/m50850"),
  electrolyte: source("MTI — SBE-EDE111 sodium-ion electrolyte reference", "https://mtixtl.com/products/1-0m-napf6-in-ec-dmc-emc-1-1-1-as-electrolyte-for-sodium-ion-battery-100g-bottle-sbe-ede111"),
  carbon: source("MTI — SIB-BHC300 hard carbon reference", "https://mtixtl.com/en-euea/products/hard-carbon-powder-for-sodium-ion-battery-anode-200g-bottle-sib-bhc300"),
  wood: source("Nature Communications — wood-derived hard carbon (2023)", "https://doi.org/10.1038/s41467-023-39637-5"),
  sodium: source("MTI — sodium-ion research materials and electrodes", "https://mtixtl.com/collections/na-ion-and-li-s-supplies"),
  membrane: source("Chemours — Nafion sulfonic membranes", "https://www.nafion.com/en/products/sulfonic-membranes"),
  gdl: source("Fuel Cell Store — Sigracet 28 BC reference", "https://www.fuelcellstore.com/fuel-cell-components/fuel-cell-components/gas-diffusion-layers/sigracet-28-bc"),
  filter: source("Cytiva — Whatman glass-fibre filtration catalog", "https://cdn.cytivalifesciences.com/api/public/content/digi-26135-pdf"),
};
const option = (name, use, fields, reference) => ({ name, use, fields, source: reference });
export const materialOptions = {
  "mof-development": [
    option("ZIF-8", "Porous-material and catalyst-precursor research", { "Metal node": "Zinc", Linker: "2-Methylimidazolate", "Framework family": "Zeolitic imidazolate framework" }, sources.mof),
    option("ZIF-67", "Cobalt-based porous materials and catalyst precursors", { "Metal node": "Cobalt", Linker: "2-Methylimidazolate", "Framework family": "Zeolitic imidazolate framework" }, sources.zif67),
    option("UiO-66", "Adsorption, separation and supported-catalyst research", { "Metal node": "Zirconium", Linker: "Terephthalate", "Framework family": "UiO" }, sources.uio),
    option("HKUST-1 (Cu-BTC)", "Gas adsorption and coordination-framework research", { "Metal node": "Copper", Linker: "Benzene-1,3,5-tricarboxylate", Alias: "MOF-199 / Cu-BTC" }, sources.mof),
  ],
  "cof-development": [
    option("COF-5", "Ordered porous organic framework research", { Linkage: "Boronate ester", "Building blocks": "1,4-Benzenediboronic acid and hexahydroxytriphenylene", Dimensionality: "2D" }, sources.cof5),
    option("COF-300", "Three-dimensional porous organic network research", { Linkage: "Imine", "Building blocks": "Tetra-(4-anilyl)methane and terephthaldehyde", Dimensionality: "3D" }, sources.cof300),
    option("TpPa-1", "Porous frameworks for separation and functionalization research", { Linkage: "Beta-ketoenamine", "Building blocks": "Triformylphloroglucinol and p-phenylenediamine", Dimensionality: "2D" }, sources.tppa),
  ],
  "functional-polymer-development": [
    option("Polyethylene glycol (PEG)", "Hydrophilic modifiers, functional derivatives and polymer blends", { "Polymer class": "Polyether", "CAS identity": "25322-68-3" }, sources.peg),
    option("Poly(acrylic acid) (PAA)", "Carboxyl-functional binders, hydrogels and surface modification", { "Functional group": "Carboxylic acid", "CAS identity": "9003-01-4" }, sources.paa),
    option("Poly(vinylidene fluoride) (PVDF)", "Membrane, coating and electrode-binder development", { "Polymer class": "Fluoropolymer", "Material form": "Polymer / membrane precursor" }, sources.pvdf),
    option("Polyaniline (PANI)", "Conducting coatings and electrode-material research", { "Polymer class": "Conjugated polymer", "Reference form": "Emeraldine base; conductivity depends on doping" }, sources.pani),
  ],
  "resin-development": [
    option("Epoxy resins", "Coatings, adhesives and composite matrices", { "Reactive chemistry": "Epoxide-functional precursors", "Processing basis": "Formulation and curing system" }, sources.resin),
    option("Ion-exchange resins", "Ion separation, purification and functional membrane-composite research", { "Reference type": "Cross-linked polymer with ion-exchange groups", "Reference functionality": "Strong-base anion exchange" }, sources.exchange),
  ],
  "ligand-development": [
    option("2-Methylimidazole — ligands for ZIFs", "Linker for ZIF-8 and ZIF-67 development", { "Donor group": "Imidazole nitrogen", "CAS identity": "693-98-1" }, sources.imidazole),
    option("Terephthalic acid — ligands for UiO frameworks", "Carboxylate linker for UiO-66 development", { "Donor group": "Carboxylate", "Linker type": "Dicarboxylic acid" }, sources.uio),
    option("Trimesic acid — ligands for Cu-BTC frameworks", "Carboxylate linker for HKUST-1 development", { "Donor group": "Carboxylate", "Linker type": "Tricarboxylic acid" }, sources.mof),
    option("2,2'-Bipyridine — ligands for coordination catalysts", "Chelating ligand for metal complexes and catalysis research", { "Donor group": "Two pyridyl nitrogen atoms", "CAS identity": "366-18-7" }, sources.ligand),
  ],
};
export const workstationOptions = [600, 602, 604, 610, 620, 630, 650, 660, 700, 710, 720, 730, 750, 760].map(number => {
  const dual = number >= 700;
  const eis = [604, 650, 660, 750, 760].includes(number);
  const galvanostat = [660, 760].includes(number);
  return option(`CHI${number}F`, dual ? "Bipotentiostat / electrochemical analysis" : "Potentiostat / electrochemical analysis", {
    "Series": dual ? "700F" : "600F",
    "Potential control": dual ? "+/-10 V for both channels" : "+/-10 V",
    "Continuous current": dual ? "+/-250 mA (sum of the two channels)" : "+/-250 mA",
    "AC impedance": eis ? "Included; 0.00001 Hz to 3 MHz" : "Not included in the model comparison",
    "Galvanostat": galvanostat ? "Included" : "Not included in the model comparison",
  }, dual ? sources.chi700 : sources.chi600);
});
// Analog information is never copied into an unidentified JAFORD model's fields.
export const analogs = {
  "resin-derived-hard-carbon": { source: sources.carbon, fields: { "Reference material": "SIB-BHC300 hard-carbon anode powder", "Reference application": "Sodium-ion anode research" } },
  "biomass-derived-hard-carbon": { source: sources.wood, fields: { "Reference feedstock": "Waste wood", "Reference application": "Sodium-ion hard-carbon anodes" } },
  "electrolyte": { source: sources.electrolyte, fields: { "Reference product": "MTI SBE-EDE111", "Reference composition": "1.0 M NaPF6 in EC:DMC:EMC = 1:1:1", "Applicability": "Analog only; not the formulation of QMS029D, XYSS-DGHYKJ118 or the NFM-compatible option" } },
  "fuel-membranes": { source: sources.membrane, fields: { "Reference type": "Nafion NR212 solution-cast PFSA membrane", "Reference thickness": "50 micrometres" } },
  "fuel-gas-diffusion-layers": { source: sources.gdl, fields: { "Reference grade": "Sigracet 28 BC", "Reference substrate": "Carbon paper with microporous layer", "Reference thickness": "235 micrometres", "Reference PTFE treatment": "5 wt%" } },
  "glass-fiber-1823-047": { source: sources.filter, fields: { "Catalog reference": "Whatman GF/D 1823-047", "Reference diameter": "47 mm", "Reference pack": "100 filters" } },
  "nfpp-powder": { source: sources.sodium, fields: { "Reference chemistry": "Na4Fe3(PO4)2P2O7 (NFPP)", "Reference application": "Sodium-ion cathode research" } },
};

// Comparable public profiles for ranges lacking owner-approved datasheets.
Object.assign(sources, {
  reactor: source('IKA — EasySyn laboratory synthesis reactors', 'https://www.ika.com/en/Products-LabEq/Synthesis-Reactors-pg234/'),
  fittings: source('Swagelok — fractional reducing unions', 'https://cad.swagelok.com/category/straight-connects-tubing-to-tubing'),
  check: source('Swagelok — C/CP/CH poppet check valves', 'https://products.swagelok.com/en/all-products/valves/check-valves/poppet-check-valves-c-cp-ch-series/c/213?clp=true&viewType=list'),
  assemblies: source('Fuel Cells Etc — component and assembly development', 'https://fuelcellsetc.com/research-and-development/'),
  hardware: source('Fuel Cells Etc — components and manufacturing', 'https://fuelcellsetc.com/'),
  uf: source('Millipore — Amicon Ultra 50 kDa reference', 'https://b2b.sigmaaldrich.com/GB/en/product/mm/ufc5050'),
  cartridge: source('Millipore — Polygard CC filter reference', 'https://www.sigmaaldrich.com/deepweb/assets/sigmaaldrich/product/documents/392/067/ds3462en00-mk.pdf'),
  copper: source('MTI — battery tabs, foils and current collectors', 'https://mtixtl.com/collections/tabs-foils-current-collector'),
  sic: source('MTI — LIB-SC450B silicon-carbon powder reference', 'https://mtixtl.com/products/lib-sc450b'),
  porous: source('Shengquan — porous carbon for silicon-carbon anodes', 'https://www.sqchemicals.com/Porous_Carbon_Product_for_Silicon_Carbon.html'),
  sealer: source('MTI — MSK-115A-L vacuum sealer reference', 'https://mtixtl.com/products/max-340x340x12-mm-vacuum-sealer-with-auto-piercing-function-for-pouch-cell-msk-115a-l'),
  binder: source('ACS — aqueous SBR binder research', 'https://doi.org/10.1021/acsapm.5c04351'),
  eve: source('EVE Energy North America — prismatic LFP reference table', 'https://www.evebatteryusa.com/copy-of-18650-and-21700-specifications?comp-l06x3udo_page=2'),
});
const reference = (source, fields) => ({source, fields});
Object.assign(analogs, {
  'glass-reactor-2000ml': reference(sources.reactor, {'Reference construction': 'Borosilicate glass 3.3', 'Reference applications': 'Synthesis, polymerization and crystallization'}),
  'imperial-reducer': reference(sources.fittings, {'Reference fitting class': 'Fractional reducing union', 'Reference purpose': 'Connect tubing with differing diameters'}),
  'check-valve': reference(sources.check, {'Reference valve class': 'Poppet check valve', 'Reference function': 'Limit reverse flow'}),
  'un050': reference(sources.uf, {'Reference product': 'Amicon Ultra-0.5', 'Reference membrane': 'Regenerated cellulose', 'Reference molecular-weight cutoff': '50 kDa', 'Applicability': 'Comparable filtration example; the name UN050 does not establish its membrane chemistry or cutoff'}),
  'emf10': reference(sources.cartridge, {'Reference product': 'Polygard CC', 'Reference media': 'Graded-density polypropylene', 'Applicability': 'Cartridge example only; not an identification of EMF10'}),
  'copper-sheet': reference(sources.copper, {'Reference use': 'Battery current collectors', 'Reference product formats': 'Copper foil and coated copper foil', 'Applicability': 'Foil examples do not establish the thickness or grade of laboratory copper sheets'}),
  'cvd-silicon-carbon': reference(sources.sic, {'Reference product': 'LIB-SC450B', 'Reference material': 'Silicon-carbon anode composite powder', 'Applicability': 'Comparable composite; not confirmation of the JAFORD CVD route or coating'}),
  'spherical-porous-carbon': reference(sources.porous, {'Reference application': 'Porous carbon host for silicon-carbon anodes'}),
  'vacuum-sealer': reference(sources.sealer, {'Reference product': 'MSK-115A-L', 'Reference process': 'Vacuum sealing of pouch-cell packaging'}),
  'al-3001a': reference(sources.binder, {'Reference material class': 'Aqueous styrene-butadiene rubber binder', 'Reference application': 'Lithium-ion negative electrodes', 'Applicability': 'Research example; not an AL-3001A formulation or performance specification'}),
  'jone-174': reference(sources.pvdf, {'Reference binder class': 'PVDF polymer', 'Applicability': 'Alternative binder chemistry example only; JONE-174 chemistry is not inferred'}),
  'eve-lf100la': reference(sources.eve, {'Published model': 'LF100LA', 'Reference chemistry': 'Prismatic lithium iron phosphate', 'Reference nominal voltage': '3.2 V', 'Applicability': 'Follow the approved datasheet for the supplied cell revision; no cycle-life or capacity guarantee is inferred'}),
  'fuel-mea': reference(sources.assemblies, {'Published assembly examples': '5-layer and 7-layer membrane electrode assemblies'}),
  'fuel-ccm': reference(sources.assemblies, {'Published coating examples': 'Single-sided and 3-layer catalyst-coated membranes'}),
  'fuel-ccs': reference(sources.assemblies, {'Published substrate example': 'Catalyst-coated gas diffusion electrode'}),
  'fuel-electrocatalysts': reference(sources.hardware, {'Reference range': 'Catalysts for fuel-cell and electrolyzer components'}),
  'fuel-flow-field-plates': reference(sources.hardware, {'Reference component': 'Graphite flow-field plates', 'Reference role': 'Reactant distribution in cell hardware'}),
  'fuel-gaskets-seals': reference(sources.assemblies, {'Reference component': 'Gasket-framed 7-layer MEA', 'Reference role': 'Cell framing and sealing'}),
  'nfpp-electrode': reference(sources.sodium, {'Reference material class': 'Sodium-ion cathode electrodes'}),
  'p2-electrode': reference(sources.sodium, {'Reference material class': 'Sodium-ion research electrodes', 'Applicability': 'General reference only; existing P2 dimensions remain catalog facts'}),
  'research-pouch-cells': reference(sources.sodium, {'Reference use': 'Sodium-ion cell research', 'Applicability': 'General research-material reference; no capacity or cell construction is inferred'}),
});
