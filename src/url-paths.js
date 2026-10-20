// Public address policy is separate from stable catalog IDs/PDF identities.
export const categorySlugs = [
  "custom-rd", "battery-technology", "fuel-cells-electrolyzers",
  "functional-materials", "testing-characterization", "equipment-supplies",
];
export const movedPaths = Object.fromEntries([
  ...categorySlugs.map(slug => [`/technologies/${slug}`, `/${slug}`]),
  ["/products/glass-fiber-1823-047", "/products/glass-fiber-filter"],
  ["/services/polymer-resin-synthesis", "/services/molecule-polymer-synthesis"],
]);
const internalPaths = Object.fromEntries(Object.entries(movedPaths).map(([oldPath,newPath])=>[newPath,oldPath]));
export const publicPath = path => movedPaths[path] || path;
export const internalPath = path => internalPaths[path] || path;
