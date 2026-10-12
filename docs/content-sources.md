# Homepage business content

Reviewed on 2026-09-30 from JAFORD's existing public website. The previous V1 used the owner's written business brief; this iteration also uses the site's actual product and service descriptions.

| Source                                                     | Information used on the new homepage                                                                                                                                       |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| https://www.jaford.com/                                    | Material-to-validation offering; material supply, custom battery cells, electrochemistry and synthesis                                                                     |
| https://www.jaford.com/products/battery-and-materials      | LFP/NMC/NFPP cathodes; graphite, silicon-carbon and hard-carbon anodes; separators, electrolytes, binders and conductive additives; pouch, cylindrical and prismatic cells |
| https://www.jaford.com/products/fuel-cell-and-electrolyzer | Fuel-cell and electrolyzer components, stacks and fixtures; CO₂RR/HER/OER catalysts; CCS/CCM electrodes, Ni/Ti felt and custom high-pressure electrolysis hardware         |
| https://www.jaford.com/products/custom-r-and-d-services    | Material matching, slurry design, coating, calendaring, electrode preparation, custom cells, stack parts, prototype builds and validation planning                         |
| https://www.jaford.com/products/membranes-polymers         | Resin/polymer and membrane synthesis; MOF/COF and functional intermediates; route feasibility, preparation, purification and basic characterization                        |
| https://www.jaford.com/contact                             | Singapore location and public business contact kiki.li@jaford.com                                                                                                          |

## Owner-supplied catalog brief

The current catalog is curated from the owner's explicit product/service list supplied in this conversation on 2026-09-30. The brief is the source of model codes, the 2,000 mL reactor volume and the P2 7.5 × 5.4 cm double-sided electrode option. Raw order files and formal model specification sheets were not supplied or independently reviewed. Do not infer other specifications from model names or from earlier marketing text.

The homepage now follows technology areas, combining relevant products and services within each field. The original five technical areas remain, with lab supplies and equipment as an additional home for the new general-purpose items. `src/technologies.js` maps the existing 25 products and nine services; their factual content and individual detail routes are preserved. Full product/service indexes remain available as secondary tools. The existing public ranges above remain available via links, but are not converted into unsupported SKU entries. Historical procurement, delivery and project discussions are not stock evidence or generalized performance guarantees. Services are explicitly coordinated through partner factories and laboratories.

No product photographs or authorized supplier images were supplied. The owner requested suitable illustrations where photographs are unavailable. All 25 current products now use representative AI-generated drawings on modules and detail pages, explicitly labeled AI-generated illustration. These are generic product types, not exact model photographs, measured morphology, certified packaging or included-component promises. No client process drawings, chat screenshots or unsupported document downloads are used. See `product-images.md` for asset provenance and mapping. See `catalog-readiness.md` for pending source material and technical confirmations.

The existing site's promotional statements about personnel, clients and achievements are not repeated. No clients, certifications, production volumes, facility ownership or quantitative performance claims have been added.

The inquiry interface opens a user-reviewed `mailto:` draft to the verified business address. Opening a draft does not send an inquiry. Copy and download remain available when no mail application is configured; there is no backend submission or delivery confirmation.

## Owner-supplied brand and project framework (2026-09-30)

The owner supplied a material synthesis requirement workbook and authorized use of its logo and slogans. `public/brand/jaford-brand.png` is the unmodified embedded image extracted from that workbook. The header displays its logo region; the two exact English brand lines are rendered as accessible, responsive text in the homepage hero. The former decorative favicon was removed; the favicon now references the supplied artwork.

The homepage summarizes only the generic engagement framework: client-specified-route custom synthesis and specification-based contract R&D, with agreed deliverables, testing, acceptance, iteration limits and confidentiality. No client names, target material responses, private project details or original workbook are published. These are ways of scoping work, not completed case studies or unconditional performance guarantees.

## Homepage imagery, functional materials and completed projects

The owner requested homepage category images and a MOF/COF development section. Existing labeled product-type drawings are reused for five areas; a new generic fuel-cell component drawing represents that category. These remain illustrations, not product photographs. MOF/COF service scope is supported by the earlier company-site review and the owner's explicit request, with the supplied synthesis requirement form informing inputs and acceptance terms. It is not a completed MOF/COF case claim.

On 2026-09-30 the owner explicitly confirmed that both repeat polymer synthesis and the 11 kg resin project were delivered and may be shown anonymously, answering “both” when asked about these two projects. The homepage states only these confirmed outcomes. No purity, yield, test performance, customer, formulation or novel process claims are added. Only one workbook is available in the current attachments; a second workbook was mentioned but not received or reviewed.

## Product directory and case-study presentation (2026-10-01)

The owner requested Fuel Cell Store as a product presentation reference and Wegreen/WeGreened as a case-study reference. Attempts to read fuelcellstore.com and wegreened.com were denied at the cloud proxy (CONNECT 403); neither website was reviewed or copied. The implementation follows the requested directory and case-study formats using JAFORD content: category navigation, model-led quote-only product modules, and case summaries leading to requirement / scope / delivery pages. `src/cases.js` contains only the two previously owner-confirmed completed projects. No dates, client profiles, test results, challenges overcome or success metrics were inferred.

## Uploaded reference HTML reviewed (2026-10-01)

The owner supplied saved HTML for Fuel Cell Store, ElectroHy and WeGreened. These files were parsed locally as reference data, without executing their scripts. Fuel Cell Store presents Top Products / Latest Products using image, linked title and short description modules. ElectroHy uses a square-image product grid with linked product names and variants. WeGreened presents Success Stories with outcome-led headlines, excerpts, selected case facts and Read more links. The supplied files are homepage HTML, not full product specification or case-article pages.

The JAFORD homepage now features six actual catalog products with technology navigation above the grid; detail pages show only known specifications and options. Empty tables, missing-spec messages and unknown-model choices are omitted. Missing specification fields remain available internally as `missingSpecs` and in catalog-readiness.md. Case previews emphasize the confirmed outcome and link to narrative case pages. Reference-company products, prices, branding, client quotes and success metrics were not copied into JAFORD's catalog or case claims. Uploaded HTML is not published in the repository.

## Product focus and hard-carbon forms (2026-10-01)

The owner requested a technical rather than purchasing emphasis on material pages. Product detail pages retain the material introduction, image, known specifications and one quiet inquiry action; related-area and generic contact sections are removed. Resin-derived and biomass-derived hard carbon are separate entries with the previously confirmed feedstock information. Both use the same generic carbon illustration, not distinct grade photographs. The old sodium-hard-carbon route opens the filtered list containing both entries, preserving existing bookmarks without choosing a material on the visitor's behalf. No new performance claims are added.

## Navigation and testing category (2026-10-01)

The owner approved Custom R&D as the first category and then requested Testing & Characterization. The six-category navigation follows the approved order, combining lithium/sodium battery materials and cells in Battery Technology. Custom R&D groups services and completed project cases; fuel-cell and electrolyzer categories retain existing material-range links. Testing & Characterization groups battery testing with a general material-characterization coordination service already within the stated scope. No instrument inventory, accredited methods or new measured outcomes are claimed. Legacy category routes redirect to the corresponding current category.

## Concise sector homepage (2026-10-01)

The owner requested a smaller introductory brand line and larger partner statement, a concise lab-to-industry positioning paragraph, and four six-image rows. Battery entries link to existing model pages. Fuel-cell entries describe existing material families and link to the established company range; they do not introduce SKU specifications or stock promises. Functional-material entries link to the relevant coordinated synthesis/development service. Generic bottles and powders represent material families, not actual MOF/COF compositions or measured morphology. Homepage engagement-model explanations and completed-case previews are removed; existing service and case routes remain available. Only the bottom contact section opens the homepage inquiry form.

## Testing scope and contact refinement (2026-10-01)

The owner requested SEM/TEM, lithium-ion/solid-state/pouch testing, short/full stack testing and wind/solar direct-coupled testing. Homepage cards summarize these as six groups. Existing characterization and battery services are expanded; two new service pages describe stack testing and renewable-coupled testing. Every scope is coordinated through partners and assessed for sample, method, interface and safety compatibility. No equipment ownership, test capacity, accreditation or performance outcome is claimed.

The latest owner wording replaces the homepage brand statement with “From Innovation to Industry Impact: Long-term Partner in Technology Translation”. Its blue #3b6ea5 is sampled from the supplied logo. Equipment is ordered before consumables, and the homepage workstation label omits the model while preserving the confirmed model on its detail page.

Fuel Cell Store and ElectroHy contact URLs returned proxy CONNECT 403. Their previously uploaded HTML was reviewed instead: Fuel Cell Store groups contact details and customer-service links; ElectroHy exposes email and contact information in its footer. The new contact section uses a concise partnership invitation, visible verified email and existing inquiry-draft action. No phone, street address or response-time promise was invented.

## Caption and contact simplification

At the owner’s request, visible AI-generation captions are removed from homepage and catalog thumbnails. Detail pages keep a neutral representative-illustration note, and asset provenance remains documented internally. The homepage Contact Us block now contains only its heading, verified email and the existing inquiry action.

## Inline contact and scale-up imagery

The owner supplied a contact-form screenshot as a visual reference. The homepage now shows three required fields (name, email, enquiry), an email preparation action and the verified direct email below an “or” alternative. Submission produces a local reviewable email draft with copy/download fallbacks, never a server-delivery claim. Existing product inquiry flows remain independent; homepage enquiries do not inherit product details.

Custom R&D images now represent polymer and target-molecule reactors, synthesis scale-up equipment, a rotary furnace, electrode coating and pouch-cell stacking machinery. They communicate partner-coordinated process development, not finished products or ownership of the depicted equipment. No process capacities or facility availability are inferred from illustrations.

## Scale-up-first R&D presentation

The owner requested short capability descriptions instead of public delivery, input and acceptance checklists. Service details now show one paragraph and a representative image, plus one quiet contact action. Detailed source scope remains in the catalog data for reference, without rendering those lists on detail pages. Descriptions emphasize connecting partner expertise and facilities to scale-up and validation, with larger scales expressed as development directions, not demonstrated results or unconditional capacity. Pack-level development is a subsequent direction rather than a promised pack-delivery service. The old homepage “From Innovation…” lead is removed; “We scale your innovation.” is a proposed headline pending discussion, not yet published. Existing product specs and case detail routes remain intact.

## Research-development cases supplied by the owner

The owner described four completed projects and requested anonymous cases highlighting collaboration and development scale. New stories cover a delivered 50-cell dry pouch batch, a jointly revised electrolyte-validation procurement package, a resin-to-hard-carbon processing project using kilogram-scale feedstock, and ampere-hour sodium-ion pouch validation that exposed design and execution-assumption gaps. The second case does not present the initially requested quantity or energy-density target as achieved. The carbon story does not equate input resin mass with hard-carbon output. The sodium-ion story explicitly distinguishes observed results from initial expectations.

No customer identity, supplier identity, price, budget amount, formulation, heating schedule, gas-flow condition, unpublished technical parameter or unsupported performance outcome is published. Existing case routes are retained. The four new cases appear after Custom R&D in a manually scrollable homepage collection with previous/next controls, touch/keyboard scrolling and reduced-motion support, linking to the six-case directory and individual stories.

## Owner-supplied WeGreened screenshots

The owner supplied mobile screenshots of the firm's homepage and case-story listing. The listing informs the new editorial presentation: prominent linked titles, subject/scale metadata, narrative excerpts, Read more links and restrained separators. JAFORD's existing facts, warm background and brand blue are retained. No reference-company claims, dates, authors, testimonials, approval metrics or branding are copied. The case directory is a vertical list; homepage cases retain horizontal browsing without card boxes.

The owner requested first-position homepage project stories and battery project references. PBT-001–PBT-004 follow the four supplied project briefs; these identifiers are not cumulative project totals. Aggregate metrics remain an unpublished proposal pending reconciled records and owner agreement.

Case narratives were reframed at the owner’s request around customer research value: custom pouch-cell platforms, a practical carbon-processing study, and evidence for sodium-ion iteration. Procurement constraints were de-emphasized. Platform/material delivery remains distinct from subsequent performance validation; no additional testing, industrialization or commercial outcomes were inferred. All case fact sidebars, service cross-links and project-specific inquiry actions were removed.

The owner requested compact title/reference/excerpt case previews and a single flowing story on detail pages, with no chapter labels or bottom return link. Custom R&D now pairs existing representative process, framework and instrument artwork with concise descriptions. Added characterization methods (TEM, SEM, XPS, XRD, FTIR, Raman, NMR, BET and thermal analysis) and functional-material families are project-assessed partner scopes, not claims of instrument ownership or completed outcomes. No new product specifications or microscopy results were created.

At the owner’s request, the homepage hero slogan and adjacent introduction were removed. Innovation in practice now begins the page directly below navigation. The browser title no longer repeats the old slogan.


## Additional owner-supplied project accounts

Seven English anonymous stories were adapted from the owner's project-experience document. Public references preserve its business numbers: 5 → PBT005 (battery application confirmed by the owner), 12 → PBT012, 14 → PFM014, 16 → PFM016, 40 → PBT040, 44 → PFM044, 54 → PBT054. The private source document is not included in the repository. Customer location, recipes, operating parameters and private commercial details are omitted.

Business 12 describes an achieved experimental objective after formation-process revision. Business 14 describes staged synthesis and a validated SOP. Business 16 provides samples and IR/NMR records. Business 40 describes performance-oriented preparation work, not a measured rate outcome or confirmed final delivery quantity. Business 44 records a reviewed initial synthesis followed by a larger batch and NMR records. Business 54 records project-specific cycling success; no numeric cycling/rate guarantee or general performance specification is published.

The older battery accounts use PBTXX until internal-number mapping is confirmed. The older synthesis accounts retain their URLs and use PFMXX; the owner confirmed these are separate projects from businesses 14 and 16, so they remain independently displayed. Homepage display order alternates research areas where practical; codes never follow display order.

The owner approved the new slogan “We scale up innovation” and requested sample statistics for layout exploration: 15 countries/regions, 32 research teams, 109 projects delivered. All three figures are illustrative, not verified operating data, and are visibly identified as such. No savings metric is displayed.


## Reconciled earlier project references

The owner identified the two earlier dry-pouch/electrolyte orders as one internal project 17.1. They are now one story under PBT017; the old electrolyte URL redirects to the retained pouch-cell story. PBT018 is the resin-to-hard-carbon account; PBT042 is the NFM sodium-ion validation account, distinct from NFPP project PBT012. Only identity, grouping and the plain-language narrative were updated. Confidential process conditions, formulations, requested energy-density targets and unverified quantities remain off the website.

The older repeat-polymer and 11 kg resin cases have no provided internal numbers. Their stories remain available at existing URLs, without a code, while homepage and index listings exclude them pending mapping. This supersedes prior XX placeholder instructions. No internal identifier is invented to fill the gap.


## Fuel-cell and electrolysis navigation parity

The owner identified a mismatch between illustrated homepage offerings and an empty category destination, explicitly naming MEA and CCM. Eight family-level entries now represent the established scope: membranes, gas diffusion layers, MEA, CCM, CCS, electrocatalysts, flow-field plates and gaskets/seals. Names, descriptions, images and internal routes are shared between homepage, category and detail renderers. These are product families, not newly verified stock models; no numeric performance, loading, dimensions, inventory or ownership claims were introduced. Existing CCS/CCM and electrocatalysis scope is supported by the earlier owner brief and recorded source summary. No new live-site retrieval was needed for these changes.


## Homepage and full-directory consistency across all six areas

The owner requested that every homepage sector be a selection from a larger corresponding directory. Homepage selections now come from the same records as category and detail pages. Functional Materials has seven focused development views (the six existing homepage families plus previously described advanced membranes). Testing & Characterization has ten focused views, including the existing six homepage scopes and previously described spectroscopy, XRD, surface-area/porosity and thermal analysis. These use existing representative artwork and approved capability scope; they do not establish instrument ownership, standard-product models, availability or verified performance. Older broad-service URLs remain available. No specifications, cases or numeric capacity claims were added.


## Slogan correction

The owner confirmed the exact slogan is “We scale innovation”. This supersedes the earlier “We scale up innovation” wording.


## Category-specific project collections

The owner requested project-first browsing within Battery Technology and Functional Materials. Existing published stories are filtered by their confirmed PBT/PFM prefixes, preserving homepage wording, order and detail routes. No new cases, project identifiers or outcome claims were added. Product and service directories remain complete below the relevant project collection.

## 2026-10-10 family catalog iteration

The owner requested boxed directory cards throughout, grouped material/model families, removal of product quotation actions, and View Spec dialogs with PDF support. Hard Carbon combines resin-derived and biomass-derived options; Electrolyte preserves all three existing model options. Related binders, cathode electrodes and nickel boat/lid offerings also share family pages with legacy URL aliases. CHI 600F/700F model names and feature differences come from official comparison tables. Common MOF/COF, polymer, resin and ligand types were added under the owner's stated supply/development scope, with public references documented separately. Reference profiles are not claims of JAFORD batch measurements. The headline is now capitalized “We Scale Innovation”. All published case collections sort descending by the original numeric internal identifier; no project was renumbered.

## 2026-10-12 contact regions and social identities

The owner confirmed contact locations in Saudi Arabia, Malaysia, Singapore, the United States and Hong Kong, and suggested Australia and Canada as additional destinations. The homepage popup alphabetizes these seven names, labeling Australia and Canada as enquiry destinations rather than existing customers/project locations. It is not a breakdown of the unchanged aggregate figure of nine countries/regions. No additional historical coverage is invented. The separate Contact Us page displays WeChat Official Account, X (Twitter) and Taobao identities with simple local SVG symbols; account URLs and the WeChat QR code have not been supplied. These are non-interactive previews with a links-coming-soon label, not fabricated destinations. The homepage contact form and footer remain unchanged.
