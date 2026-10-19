# Product illustration provenance

Created 2026-09-30 with the image generation tool at the owner’s request. No supplier photos or logos are reproduced. Official image sourcing was blocked by the environment proxy; no manufacturer image rights are claimed.

Five original 2×2 PNG atlases are in `public/images/products/`; `src/product-images.js` maps all 25 products to their representative quadrant. CSS clips each quadrant without altering the source artwork. Shared generic depictions do not imply identical formulations or products.

- materials: carbon sample, binder bottle, electrolyte bottle, electrode sheets.
- cells-membranes: pouch cell, prismatic cell, filter discs, generic membrane sheets.
- lab-materials: sample boat and lid, reaction assembly, filter cartridge, copper sheets.
- accessories: check valve, reducer, electrical adapters, vacuum sealer.
- powders-instrument: generic electrochemical instrument, conceptual porous carbon spheres, silicon-carbon powder, cathode powder.

All images are labeled AI-generated illustrations. Model geometry, terminals, interfaces, packing, color, scale and included accessories are unconfirmed. Porous spheres are not microscopy. Boat and lid are separate quoted items. Real approved model photos and datasheets remain outstanding for all products; use the existing catalog-readiness list. Replace the image mapping with approved model photos when supplied, and update captions/provenance then.

The homepage reuses these drawings for category thumbnails. `fuel-cell-components.png` is an additional AI-generated generic drawing of a flow-field plate, membrane and gas-diffusion sheet, created on 2026-09-30. It represents the category only, not a tested configuration or an exact product photograph.

## Fuel-cell family illustrations (2026-10-01)

`fuel-materials.png` is a new AI-generated 2×2 atlas: gas diffusion sheets, graphite flow-field plate, frame gaskets and membrane films. Each is a representative family illustration, not an exact model or supplier photograph. Homepage captions retain explicit AI illustration labels. Existing generic sample-container and coated-sheet drawings represent the remaining families; their appearance does not specify composition or performance.

## Visible materials and testing illustrations (2026-10-01)

Three new AI-generated atlases: `materials-visible.png` shows a binder dispersion, resin granules, polymer solids and a visible liquid sample; `testing-lab.png` shows representative SEM, TEM, cycling and pouch-cell testing equipment; `testing-energy.png` shows representative stack and renewable-coupling configurations. They are illustrative families, not exact model appearances, supplied packaging, self-owned equipment, facilities, or validated wiring diagrams. Liquid and solid sample depictions imply no formulation, purity or measured properties. All remain explicitly labeled AI-generated illustrations.

## R&D process illustrations

`rd-synthesis.png` and `rd-processing.png` are generated representative process-equipment atlases. Homepage Custom R&D cards use the first three quadrants of each: polymer reactor, target-molecule reactor, multi-vessel scale-up skid; rotary furnace, electrode coating line, pouch-cell stacking machine. They are conceptual equipment types and do not document an owned or specific partner facility. No finished-cell or finished-material images are used for these process cards.

## MOF and COF structure-plus-powder illustrations

At the owner's request, `frameworks-powders.png` pairs conceptual network schematics with representative powder samples. Top left: generic MOF coordination network; top right: generic layered COF covalent network. These do not specify a compound, crystal structure, measured morphology, composition or powder color. The two homepage cards retain their functional-material development link.

## Functional material structure-and-sample illustrations

The owner approved extending the MOF/COF visual format to the other four functional-material cards. `functional-structures.png` pairs a conceptual polymer chain, cross-linked resin network, ligand skeleton and small-molecule intermediate with representative granules or powder. These are family-level explanatory illustrations, not identified chemical structures, formulations, measured morphology or confirmed product colors. Homepage links and specifications are unchanged.


MEA, CCM and CCS now use original neutral SVG schematics (`fuel-mea.svg`, `fuel-ccm.svg`, `fuel-ccs.svg`). They are conceptual layer/coating diagrams, not microscopy, actual products or a specified layer count. Membranes/GDL/plates/seals reuse the existing fuel-materials atlas; electrocatalysts reuse the generic visible powder sample, without attributing silicon-carbon composition to it. Homepage, category and details select imagery from the same product-family data.

## 2026-10-12 custom 3D printing

`public/images/products/custom-3d-printing.png` is an original generated representative illustration of a generic open-frame printer, custom bracket, rectangular frame and furniture connector on the site's warm ivory background. It is not a supplied-part photograph, manufacturer model, owned equipment or facility claim. Shared by the homepage, Custom R&D directory and service detail through `src/product-images.js`.

## 2026-10-19 delivery optimization

Product PNGs now have WebP derivatives, encoded at quality 84 with ImageMagick (`bash scripts/optimize-images.sh`). The original 1254 × 1254 dimensions, artwork, atlas coordinates and provenance are retained; compression does not add or replace content. All source PNGs and original public URLs remain available. Visitors load the WebP variants through the shared image renderer; the owner's logo and neutral fuel-cell SVGs are unchanged. The 17 unique homepage image resources total 1,717,543 bytes instead of 24,690,956 bytes (93% reduction); lazy loading and shared-atlas browser caching remain in place. This measures asset bytes, not live load duration.

## 2026-10-19 R&D printing announcement

`custom-3d-rd-parts.png` is an original generated representative illustration of a sample holder, test fixture, adapter, bracket and prototype housing on the existing warm background. Its WebP derivative is shared by the existing 3D-printing service and homepage/category cards. It is a conceptual example, not a supplied-part photograph, measured geometry or a claim about a specific printable polymer. The private supplier guide and its artwork are not published or included in the repository; no supplier brand or certification is reproduced. The earlier printer/furniture-component illustration and URLs remain available for compatibility.

## 2026-10-19 battery-research application scene

At the owner's request, the 3D-printing service now uses `custom-3d-battery-research.png` and its compressed WebP derivative. This original generated illustration places a polymer fixture supporting a closed pouch research cell and generic electrochemical workstation in sharp foreground focus, with a simple FDM printing process in the softer background. Connector colors were refined for consistency. The scene explains how a printed mechanical support can assist battery experiments; it does not claim a printed battery, supplied instrument, owned facility, material qualification or validated results. Homepage, directory and detail use the same shared image record. All earlier image URLs are retained. The New service badge has a small static vector flame; there is no animation or additional external asset request.

## 2026-10-19 compact carbonization furnace

`compact-carbonization-furnace.png` is an original generated illustration of a compact development-scale rotary tube furnace, with a small control cabinet, modest drive and sample tray. Its 57,944-byte WebP derivative is shared by Carbonization & activation on the homepage, directory and detail. The image conveys a step from laboratory research toward kilogram-scale trials; it does not specify capacity, temperature, manufacturer, model or an owned facility. The dedicated `rd-carbonization-furnace` mapping leaves the older processing atlas and its other service uses intact. Earlier image URLs remain available.

## 2026-10-19 functional electrochemical flow component

The owner rejected the holder-led 3D-printing scene. Its replacement, `custom-3d-electrochemical-flow.png`, is an original generated illustration informed by the application research in `docs/3d-printing-research.md`: a blue printed branching-channel/manifold prototype, a matching exploded research flow-cell assembly with separate conventional sheets/backing, and a resin-printing process in the background. The fluidic component is the focal point. It is a conceptual research illustration, not a validated device, working fuel cell, qualified printable material, exact process specification or delivered customer part. No supplier or publication image is copied. The 156,872-byte WebP is shared by all three service contexts. Earlier images and URLs are retained; the private supplier guide remains outside the repository and public artifacts.

## 2026-10-19 lithium-ion research-cell direction

`custom-3d-lithium-research-cell.png` is an original generated concept replacing the fuel-cell/electrolysis flow-component scene at the owner's request. The foreground pairs an exploded blue printed battery-cell casing and conventional electrode/separator/collector disks with an assembled research cell and electrical test connections. Casing printing appears in the background. The dark central analytical window, casing geometry and instrument are representative, not an exact DANOISE reproduction, validated device, material grade or owned facility. No publication artwork or private supplier material is copied. The 112,038-byte WebP is shared by homepage, directory and detail. No active electrode or complete battery is shown being printed. See `docs/3d-printing-research.md` for the primary reference. All older image URLs are retained.
