// Temporary business pause: retain records, artwork, PDFs and direct routes.
// Clear these sets (and restore the two enquiry options) to relist this scope.
const pausedAreas = new Set(["fuel-cells-electrolyzers"]);
const pausedServices = new Set([
  "stack-testing", "short-stack-testing", "full-stack-testing", "renewable-coupled-testing",
]);
export const isAreaListed = area => !pausedAreas.has(area.id);
export const isProductListed = product => !pausedAreas.has(product.category);
export const isServiceListed = service => !pausedServices.has(service.id);
