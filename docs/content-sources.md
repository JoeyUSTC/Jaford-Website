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
