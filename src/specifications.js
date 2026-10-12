import { specFields } from "./spec-fields.js";
import { products, services } from "./catalog.js";
import { materialOptions, analogs } from "./spec-data.js";

export const specifications = new Map();
export function optionsFor(item, kind = "product") {
  const options = materialOptions[item.id] || item.variants || (item.models?.length ? item.models : [item.name]).map(name => ({ name, specs: item.specs || {} }));
  return options.map((option, index) => {
    const id = `${kind}-${item.id}-${index}`;
    const reference = option.reference || (option.source ? { source: option.source, fields: option.fields } : analogs[option.originalId] || analogs[item.id]);
    const fields = option.specs || (option.source ? { "Material / type": option.name, Application: option.use } : {});
    const rows = Object.keys(fields).length ? fields : { "Type": option.name, "Application / scope": item.description };
    const spec = {
      id, family: item.name, name: option.name, use: option.use || item.description,
      fields: rows, reference,
      tableFields: specFields(item, option, kind),
      scope: kind === "service" && !option.source ? item.scope || [] : [],
      note: option.note || item.note || "",
      pdf: `specs/${id}.pdf`,
    };
    specifications.set(id, spec);
    return spec;
  });
}
// The PDF build and browser use the same complete registry.
for (const item of products) optionsFor(item);
for (const item of services) optionsFor(item, "service");
