// Anonymous project accounts based on owner-confirmed records.
// Codes preserve internal business numbers; publication requires a confirmed mapping.
const publishedCases = [
  {
    "id": "small-batch-dry-pouch-cells",
    "projectCode": "PBT017",
    "title": "Building a pouch-cell platform for battery and electrolyte research",
    "category": "Pouch cell development",
    "summary": "A research team gained custom dry pouch cells and supporting electrolyte, bringing related development requests into one platform for further cell and electrolyte evaluation.",
    "requirement": "The team wanted to take a proposed electrode combination into a pouch-cell format. The next step required physical cells built around that system, giving the researchers a platform for further experimental work.",
    "scope": "Working with the team and a specialist manufacturing partner, JAFORD translated the research requirements into a custom cell build. The collaboration brought the proposed materials and cell configuration together in a research batch.",
    "outcome": "The delivery of 50 custom dry pouch cells gave the team a platform on which to pursue its next stage of validation. The value was the transition from a cell specification to physical research cells; subsequent testing would establish how the proposed system performed.",
    "deliverable": "50 custom dry pouch cells",
    "scale": "50-cell research batch",
    "result": "A custom pouch-cell platform for further validation",
    "engagement": "Custom cell sourcing & development coordination",
    "serviceId": "pouch-cell-customization",
    "serviceName": "Pouch-cell customization",
    "story": "A research team wanted to take its proposed electrode systems into dry pouch cells, including a platform for evaluating an electrolyte. What began as two related orders became one coordinated development project. Working with JAFORD, the team translated its research requirements into practical cell specifications and batch sizes, bringing together the chosen electrode materials, cell builds and supporting electrolyte. The work included delivery of a 50-cell dry pouch batch and the cells and electrolyte arranged for the related study. Together, these gave the researchers a physical platform on which to investigate their battery materials and electrolyte in pouch-cell formats, moving from proposed specifications toward further experimental validation."
  },
  {
    "id": "resin-route-process-scale-up",
    "projectCode": "PFM014",
    "category": "Resin synthesis and scale-up",
    "serviceId": "synthesis-scale-up",
    "serviceName": "Synthesis scale-up",
    "title": "Taking a proposed resin route into kilogram-scale synthesis",
    "summary": "A materials team moved from a theoretical synthesis route to a verified procedure and larger resin batches, gaining a basis for reproducible scale-up.",
    "story": "A research team had a proposed route for a custom resin and wanted to take the material into kilogram-scale preparation. The starting point was a theoretical synthesis method rather than a complete, demonstrated procedure. JAFORD brought the team together with synthesis specialists to develop and verify a practical SOP, then progress through a 1 kg trial before moving to a 10 kg batch. Alongside the resin, the customer received the validated synthesis procedure. The collaboration turned a route on paper into material at a larger working scale and a documented process that the team could use for reproduction and further scale-up."
  },
  {
    "id": "nfpp-pouch-formation-validation",
    "projectCode": "PBT012",
    "category": "Sodium-ion cell development",
    "serviceId": "pouch-cell-customization",
    "serviceName": "Pouch-cell customization",
    "title": "Turning sodium-ion pouch-cell results into a better validation process",
    "summary": "A team took its hard-carbon material into NFPP pouch cells and, through a review of cell formation, reached the experimental objective after an initially disappointing result.",
    "story": "A research team wanted to evaluate its hard-carbon material in an NFPP sodium-ion pouch-cell system. JAFORD worked with the team and development partners to bring the cathode and anode coating into a stacked pouch-cell build. When the customer’s initial tests fell short of expectations, the collaboration continued with a review of the experimental and testing process, particularly cell formation. Together, we clarified and improved the formation procedure, after which the customer repeated the tests and reached the intended experimental objective. The project gave the team both a pouch-cell platform for its material and a more reliable process for evaluating the proposed system."
  },
  {
    "id": "peg-polymer-synthesis-characterization",
    "projectCode": "PFM016",
    "category": "Custom polymer development",
    "serviceId": "polymer-resin-synthesis",
    "serviceName": "Polymer & resin synthesis",
    "title": "Turning a PEG polymer route into characterized research samples",
    "summary": "A team gained custom PEG-related polymer samples, a more complete synthesis procedure and analytical data to support further material development.",
    "story": "A research team needed a custom PEG-related polymer prepared from specified starting materials and a proposed synthesis route. JAFORD worked with the team and synthesis partners to carry that route into sample preparation, filling in the practical details that became clear during the work. Those refinements were brought together in a more complete, reproducible SOP, and the finished samples were sent for independent infrared and NMR characterization. The customer received the polymer samples, the refined procedure and the analytical reports. This gave the team a documented material platform and evidence with which to assess the synthesis and plan its next experiments."
  },
  {
    "id": "carbon-activation-research",
    "projectCode": "PBT005",
    "category": "Battery carbon materials development",
    "serviceId": "carbonization-activation",
    "serviceName": "Carbonization & activation",
    "title": "Building an experimental platform for carbon activation",
    "summary": "A materials team gained a practical setting for repeated carbon-activation trials, turning a proposed laboratory experiment into a programme of rapid material validation.",
    "story": "A research team wanted to explore carbon activation through small-scale experiments, but its available laboratory facilities could not support the proposed work. JAFORD worked with the team to establish suitable experimental conditions and turn the initial plan into practical steps, bringing together the equipment, facilities and processing experience needed for the study. The collaboration supported dozens of carbon-activation experiments. This gave the researchers a working platform for repeated trials, allowing them to investigate their material ideas and refine the process through experimental evidence."
  },
  {
    "id": "rate-focused-nfpp-cell-development",
    "projectCode": "PBT040",
    "category": "Sodium-ion cell development",
    "serviceId": "pouch-cell-customization",
    "serviceName": "Pouch-cell customization",
    "title": "Designing a sodium-ion pouch-cell study around rate performance",
    "summary": "A team’s rate-performance research objective shaped NFPP material selection, electrode processing and a custom pouch-cell development plan.",
    "story": "A research team wanted to investigate rate performance using its own hard-carbon anode material in an NFPP sodium-ion system. The cell platform needed to reflect that objective from the outset, including the choice of cathode powder and the specified separator. JAFORD worked through material selection and the electrode-processing and assembly requirements with development partners, translating the team’s research priorities into a tailored pouch-cell preparation plan. The work brought material properties and cell design into the same development discussion, establishing a practical route toward evaluating the proposed system in a pouch-cell format."
  },
  {
    "id": "literature-molecule-synthesis-scale-up",
    "projectCode": "PFM044",
    "category": "Target molecule synthesis",
    "serviceId": "small-molecule-synthesis",
    "serviceName": "Target molecule synthesis",
    "title": "Taking a published synthesis from a small trial to a research batch",
    "summary": "A team reproduced a literature route, reviewed an initial sample and progressed to a larger target-molecule batch with NMR data for product assessment.",
    "story": "A research team wanted to reproduce a compound from a published synthesis route and obtain enough material for further investigation. JAFORD worked with the team to make product characterization part of the project from the start. An initial synthesis produced about 1.9 g of sample; after the customer reviewed and accepted that stage, the preparation was expanded to approximately 10 g. The target material was delivered with proton and carbon NMR data. The collaboration carried the idea from a literature method through a reviewed small trial to a larger research batch, giving the team both material and analytical evidence for its next stage of work."
  },
  {
    "id": "resin-to-hard-carbon",
    "projectCode": "PBT018",
    "title": "Taking a hard-carbon process beyond small laboratory trials",
    "category": "Carbonization & activation",
    "summary": "A sodium-ion materials team turned a proposed resin-to-carbon route into a practical processing study, with experimental data to inform further material development.",
    "requirement": "The team wanted to explore a hard-carbon route beyond very small trials, working with kilogram-scale resin feedstock. The challenge was to turn the proposed thermal and activation sequence into a process that could be carried out and evaluated.",
    "scope": "JAFORD worked with the researchers, processing specialists and a laboratory to refine the route against actual equipment and batch conditions. This brought the material concept into an executable carbonization and activation study.",
    "outcome": "The team gained a workable processing route and supporting experimental data for further material evaluation. That provided a basis for examining the proposed process at a larger working scale and deciding what to refine next.",
    "deliverable": "Research-scale carbon processing and experimental data",
    "scale": "Kilogram-scale resin feedstock",
    "result": "An executable processing study and data for further development",
    "engagement": "Process development & laboratory coordination",
    "serviceId": "carbonization-activation",
    "serviceName": "Carbonization & activation",
    "story": "A sodium-ion materials team wanted to take a proposed resin-to-hard-carbon route beyond very small laboratory trials. The project involved kilogram-scale resin feedstock, so the process needed to be adapted to practical equipment and batch conditions. JAFORD worked with the researchers, processing specialists and a laboratory to turn the proposed carbonization and activation sequence into an executable study. The team gained a workable processing route and supporting experimental data, creating a basis for evaluating the material at a larger working scale and deciding how to refine the process next."
  },
  {
    "id": "anode-processing-cycling-development",
    "projectCode": "PBT054",
    "category": "Electrode and cell development",
    "serviceId": "electrode-processing",
    "serviceName": "Electrode processing",
    "title": "Using electrode-processing feedback to advance a battery material",
    "summary": "A team brought its anode material into cell development, addressed processing difficulties and reached its project-specific cycling requirements.",
    "story": "A research team wanted to evaluate its own anode material in a cell system designed around rate and cycling objectives. During electrode preparation, the material’s large and uneven particles emerged as a concern for coating and subsequent cell behavior. JAFORD brought those observations back to the customer and worked with processing partners to adjust the anode preparation. The resulting cells met the customer’s cycling requirements in the project’s testing. By carrying practical processing feedback back into the research discussion, the collaboration enabled the team to evaluate its material in cells and understand which material characteristics mattered as development moved beyond the initial laboratory work."
  },
  {
    "id": "sodium-ion-pouch-validation",
    "projectCode": "PBT042",
    "title": "Using ampere-hour pouch cells to guide sodium-ion development",
    "category": "Sodium-ion battery development",
    "summary": "A research team tested its sodium-ion concept in ampere-hour pouch cells and used the gap between expected and observed results to identify what needed to change.",
    "requirement": "The team wanted to find out how its proposed sodium-ion system would behave in ampere-hour pouch cells. That required the materials, electrode preparation, electrolyte and assembly to work together as a complete cell system.",
    "scope": "JAFORD worked with the team and development partners to translate the proposed system into coated electrodes and assembled pouch cells. Throughout the project, we made the research and manufacturing assumptions explicit so the resulting cells could be assessed against the intended design.",
    "outcome": "The cell results differed from the customer’s initial expectations. Together, we examined the gaps in the approach and the assumptions behind them. The larger-cell study gave the team evidence to guide its next iteration, rather than carrying the same assumptions forward untested.",
    "deliverable": "Ampere-hour pouch-cell validation and development findings",
    "scale": "Ampere-hour pouch-cell prototypes",
    "result": "Larger-cell evidence to guide the next design iteration",
    "engagement": "Joint cell development & validation",
    "serviceId": "pouch-cell-customization",
    "serviceName": "Pouch-cell customization",
    "story": "A research team wanted to find out how its proposed sodium-ion system would behave in ampere-hour pouch cells. Working together, we brought the materials, electrolyte, electrode coating and cell assembly into one development project, making the research and manufacturing assumptions explicit along the way. The cell results differed from the customer’s initial expectations. Rather than treating that gap as the end of the project, we examined the design and assumptions with the team to identify what needed to change. The collaboration took the concept into a larger-cell validation platform and produced evidence to guide the next iteration."
  }
];

// Preserve previously shared URLs while awaiting the internal business numbers.
// Higher internal business numbers represent more recent projects.
export const cases = publishedCases.toSorted((a, b) => Number(b.projectCode.slice(3)) - Number(a.projectCode.slice(3)));

export const unnumberedCases = [
  {
    "id": "repeat-polymer-synthesis",
    "title": "Repeat polymer synthesis for continued material development",
    "category": "Polymer synthesis",
    "summary": "A custom polymer project provided repeated material batches, giving the research team material for its ongoing development work.",
    "requirement": "The project called for repeated preparation of a custom polymer. The material itself was needed for the team’s continuing research, rather than a standard product selected from a catalogue.",
    "scope": "JAFORD organized repeat synthesis with specialist partners and delivered the polymer batches. The work focused on carrying the custom material requirement through to physical material availability.",
    "outcome": "The team received repeated batches of the custom polymer, providing material for continued investigation. This made custom synthesis a practical part of the team’s ongoing material-development work.",
    "deliverable": "Polymer material batches",
    "serviceId": "polymer-resin-synthesis",
    "serviceName": "Polymer & resin synthesis",
    "story": "A research team needed repeated batches of a custom polymer for its continuing material-development work. JAFORD organized the synthesis with specialist partners and carried the material requirement through to batch delivery. The team received the polymer material needed for further investigation, making repeated custom synthesis a practical part of its ongoing research."
  },
  {
    "id": "resin-batch-11kg",
    "title": "Bringing custom resin development to an 11 kg material batch",
    "category": "Resin synthesis",
    "summary": "A custom synthesis project delivered 11 kg of resin, providing material for development work beyond small-sample preparation.",
    "requirement": "The project required a custom resin in a kilogram-scale quantity. Moving to that quantity meant carrying the material requirement through a larger synthesis batch and into delivery.",
    "scope": "JAFORD worked with synthesis partners to organize the resin preparation and deliver the batch, making the requested material available at the scale needed for the next stage of work.",
    "outcome": "The team received 11 kg of custom resin. This made a larger quantity of the custom material available for the next stage of development, extending the work beyond small-sample preparation.",
    "deliverable": "11 kg of resin",
    "serviceId": "polymer-resin-synthesis",
    "serviceName": "Polymer & resin synthesis",
    "story": "A custom resin project required material at a scale beyond small-sample preparation. JAFORD worked with synthesis partners to organize a larger batch and carry the material requirement through to delivery. The team received 11 kg of custom resin, making a kilogram-scale quantity available for its next stage of development and further work with the material."
  }
];

export const caseAliases = {
  "electrolyte-validation-platform": "small-batch-dry-pouch-cells",
};
