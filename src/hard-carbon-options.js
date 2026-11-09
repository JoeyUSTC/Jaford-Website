// Precursor-route guides, not supplier SKUs or batch specifications.
// Public research provenance is recorded in docs/hard-carbon-options.md.
export const hardCarbonOptions = [
  {
    id: "phenolic-resin", name: "Phenolic-resin-derived hard carbon",
    family: "Resin-derived", precursor: "Phenolic resin",
    focus: "Resin-based routes for sodium-ion anode research.",
    selection: "Particle size, ash content and carbonization history.",
  },
  {
    id: "furan-resin", name: "Furan-resin-derived hard carbon",
    family: "Resin-derived", precursor: "Furan resin / polyfurfuryl alcohol",
    focus: "Cross-linked polymer routes for hard-carbon anode research.",
    selection: "Precursor chemistry, thermal processing and particle morphology.",
  },
  {
    id: "coconut-shell", name: "Coconut-shell-derived hard carbon",
    family: "Biomass-derived", precursor: "Coconut shells",
    focus: "Shell-based routes for sodium-ion anode research.",
    selection: "Precursor cleaning, mineral residues and particle size.",
  },
  {
    id: "nutshell", name: "Nutshell-derived hard carbon",
    family: "Biomass-derived", precursor: "Walnut shells",
    focus: "Nut-shell precursor routes for hard-carbon anode research.",
    selection: "Feedstock consistency, ash content and milling history.",
  },
  {
    id: "lignin", name: "Lignin-derived hard carbon",
    family: "Biomass-derived biopolymer", precursor: "Lignin",
    focus: "Lignin-based routes for sodium-ion anode materials.",
    selection: "Lignin source, purification and thermal processing.",
  },
  {
    id: "cellulose", name: "Cellulose-derived hard carbon",
    family: "Biomass-derived biopolymer", precursor: "Cellulose",
    focus: "Cellulose-based routes for hard-carbon anode research.",
    selection: "Precursor form, carbonization history and particle morphology.",
  },
];

// Native details preserve click/keyboard access even without JavaScript.
export function initializeMaterialProfiles(root) {
  const routes = [...root.querySelectorAll(".material-route")];
  if (!routes.length) return () => {};
  const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
  const position = route => {
    const panel = route.querySelector(".material-profile");
    panel.style.removeProperty("top");
    if (!route.open || !window.matchMedia("(min-width: 641px)").matches) return;
    const list = route.closest(".material-option-list").getBoundingClientRect();
    const minimum = Math.max(0, 16 - list.top);
    const maximum = Math.max(minimum, window.innerHeight - 16 - list.top - panel.offsetHeight);
    const desired = Math.max(minimum, route.getBoundingClientRect().top - list.top);
    panel.style.top = `${Math.min(desired, maximum)}px`;
  };
  const show = route => {
    for (const other of routes) if (other !== route) other.open = false;
    route.open = true;
    position(route);
  };
  const close = () => routes.forEach(route => { route.open = false; });
  for (const route of routes) {
    route.addEventListener("mouseenter", () => { if (hover.matches) show(route); });
    route.addEventListener("mouseleave", () => {
      if (hover.matches && !route.contains(document.activeElement)) route.open = false;
    });
    route.querySelector("summary").addEventListener("click", event => {
      if (hover.matches && event.detail > 0) { event.preventDefault(); show(route); }
    });
    route.addEventListener("toggle", () => {
      if (route.open) {
        for (const other of routes) if (other !== route) other.open = false;
        position(route);
      }
    });
    route.addEventListener("focusout", event => {
      if (hover.matches && !route.contains(event.relatedTarget)) route.open = false;
    });
  }
  const dismiss = event => {
    if (event.type === "keydown" && event.key === "Escape") close();
    if (event.type === "click" && !routes.some(route => route.contains(event.target))) close();
  };
  const resize = () => routes.filter(route => route.open).forEach(position);
  document.addEventListener("click", dismiss);
  document.addEventListener("keydown", dismiss);
  window.addEventListener("resize", resize);
  return () => {
    document.removeEventListener("click", dismiss);
    document.removeEventListener("keydown", dismiss);
    window.removeEventListener("resize", resize);
  };
}
