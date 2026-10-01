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
