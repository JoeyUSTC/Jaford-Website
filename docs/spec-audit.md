# Specification audit — 2026-10-12

## Public presentation

All model/type lists use native bullets with an inline Spec action. The floating dialog contains one two-column table and an accessible close control. It excludes descriptive sections, supplier comparison examples, disclaimers, external links and PDF controls. The existing PDF URLs remain available and contain the same factual table as the browser. Directory cards, route aliases and product/service records are preserved.

`src/spec-fields.js` is the public field selection. Existing owner-confirmed catalog values, explicitly identified model specifications and standard material identities may be shown. Unknown composition and performance fields are omitted, not replaced by another supplier's numbers. Published-grade values are qualified in their field labels where manufacturer/grade matching is incomplete; no acceptance or batch-measurement claim is added. Standard identities and exact manufacturer-model specifications are recorded without commentary rows.

## Electrolyte search and missing data

Searches included QMS029D, QMS-029D, QMS029, QMS + 029D, XYSS-DGHYKJ118, DGHYKJ118, XYSS + DGHYKJ, Chinese 电解液/规格/厂家/淘宝 and English electrolyte/battery/specification/supplier variants. No reliable primary-source specification was found for the two exact models. This is a search result, not proof that no private datasheet exists.

A secondary trade listing associated other XYSS models with Sunyes Shanshan. This is an unconfirmed supplier clue, not an identification of XYSS-DGHYKJ118. The producer's public R&D page describes formulation development and additive families but does not identify this exact code or disclose its formula: https://www.ssxcl.com.cn/products/show/id/5.shtml . No manufacturer attribution or formula is inferred from the prefix.

NFM-compatible describes the intended sodium-ion electrode system; NFM is not one universal electrolyte recipe. Published papers use different formulations. Do not equate a research paper's formulation with this catalog option.

Typical electrolyte datasheets may state salt identity/concentration, solvent mixture/ratio and mass-or-volume basis, additive content, water/HF/metal contamination limits, ionic conductivity (with temperature/method), density, viscosity, appearance and storage. Voltage-window and cycling claims require specified electrodes and test conditions. Sources examined for field selection, **not for assigning values to the catalog models**:

- Sigma-Aldrich 934828: https://www.sigmaaldrich.com/US/en/product/aldrich/934828
- MTI SBE-EDE111FEC: https://mtixtl.com/en-euea/products/sbe-ede111fec

The MTI page mixes a NaPF6 formulation with Li-ion/Li+ labels and a LiPF6 transport description. Its conductivity number was not transferred to any sodium electrolyte model. Sigma's product-specific water limits differ from older general catalog examples; no generic impurity limit was adopted.

Still missing for QMS029D and XYSS-DGHYKJ118: verified supplier/model mapping, salt, concentration, solvents/ratio, additives, water/HF limits, conductivity, density/viscosity and test conditions. Current public tables contain only confirmed model and application. No fabricated values or empty placeholder rows are published.

## Other identified sources

- CHI 600F / 700F: https://www.chinstruments.com/chi600.shtml and https://www.chinstruments.com/chi700.shtml . Exact model differences in EIS and galvanostat availability are preserved; current limits for 700F refer to the sum of both channels.
- Whatman GF/D 1823-047: https://www.sigmaaldrich.com/US/en/product/aldrich/wha1823047 . Published grade diameter 47 mm, thickness 0.67 mm, pore rating 2.7 µm. Qualified as published-grade facts; the supplied manufacturer remains unconfirmed.
- EVE LF100LA: https://www.evebatteryusa.com/copy-of-18650-and-21700-specifications?comp-l06x3udo_page=2 . LFP identity and published nominal voltage 3.2 V. Other versions/listings show differing capacity specifications, so no capacity/cycle-life/dimensional guarantee is added without the supplied revision.
- NFPP identity: https://mtixtl.com/products/sib-nfpp and https://doi.org/10.1039/d4ta03554b . The formula Na4Fe3(PO4)2P2O7 identifies the material, not the supplied powder purity, carbon coating, particle size or measured capacity.
- AL-3001A: existing owner brief identifies A&L SBR negative-electrode binder; the use is also described in https://patents.google.com/patent/CN115926040A/en . No solids content or viscosity value inferred from other SBR grades.
- EMF10 candidate: https://us.my.edwardsvacuum.com/en_US/USD/Catalog/Spares/Filters/Other-Filters/Oil-Mist-Element-EMF10/p/A22304198 . The primary manufacturer has an EMF10 oil-mist element, but the catalog does not establish that this is the supplied brand/element/assembly. No flow, connection or element-medium facts transferred.
- UN050, JONE-174 and generic laboratory accessories: no reliably matched primary specification found. Amicon 50 kDa, PVDF, IKA borosilicate and other previous analogs are excluded from their model tables.
- MOF/COF, polymer, resin and ligand type identity sources remain listed in docs/spec-sources.md. Identities and applications can be shown; purity, BET, thermal performance, molecular weight and batch tolerances remain absent. COF-300 building-block naming is normalized to tetrakis(4-aminophenyl)methane; broad resin/PANI types do not imply one ion-exchange form or doping state.

## Coverage

The audit snapshot in `docs/spec-audit.json` records all 95 displayed options across 28 product families and 30 service views. It lists the public field keys and the excluded analog source for traceability. Supplier data remains required for model-specific acceptance limits. All prior models/types and route aliases are retained.
