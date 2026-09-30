const products = [
  {
    name: "Li / Na battery materials & components",
    label: "CATHODES · ANODES · ELECTROLYTES",
    description:
      "LFP, NMC and NFPP cathodes; graphite, silicon-carbon and hard-carbon anodes. We also supply separators, electrolytes, binders and conductive additives for Li-ion and Na-ion research.",
    url: "https://www.jaford.com/products/battery-and-materials#battery-materials",
    topic: "Li / Na battery materials & components",
    symbol: "layers",
  },
  {
    name: "Pouch, cylindrical & prismatic cells",
    label: "CUSTOM BATTERY CELLS",
    description:
      "Custom cells matched to your chemistry, capacity, packaging and performance targets. Discuss dry-cell builds, finished pouch cells, and development for energy density, cycle life or safety validation.",
    url: "https://www.jaford.com/products/battery-and-materials#battery-cells",
    topic: "Battery cells",
    symbol: "cell",
  },
  {
    name: "Fuel cells & electrolyzers",
    label: "COMPONENTS · STACKS · FIXTURES",
    description:
      "Membranes, gas diffusion layers, flow-field plates, gaskets and stack hardware. From matched component kits to custom fuel-cell fixtures, electrolyzer stacks and device-level solutions.",
    url: "https://www.jaford.com/products/fuel-cell-and-electrolyzer#electrolyzer-solutions",
    topic: "Fuel cells & electrolyzers",
    symbol: "stack",
  },
  {
    name: "Electrocatalysis",
    label: "CO₂RR · HER · OER",
    description:
      "Catalysts for CO₂ reduction, hydrogen evolution and oxygen evolution. Catalyst-coated substrates and membranes (CCS/CCM), nickel or titanium felt, custom high-pressure electrolysis equipment and precision fixtures.",
    url: "https://www.jaford.com/products/fuel-cell-and-electrolyzer#electrocatalysis-solutions",
    topic: "Electrocatalysis",
    symbol: "nodes",
  },
  {
    name: "Advanced materials",
    label: "POLYMERS · FRAMEWORKS · INTERMEDIATES",
    description:
      "Functional polymers, membrane materials, MOF/COF frameworks and advanced intermediates. Share the structure, target properties or application you need, and discuss a custom preparation route.",
    url: "https://www.jaford.com/products/membranes-polymers",
    topic: "Advanced materials",
    symbol: "lattice",
  },
];

const icons = {
  layers:
    '<path d="m5 15 19-10 19 10-19 10Z M5 23l19 10 19-10 M5 31l19 10 19-10"/>',
  cell: '<rect x="12" y="9" width="24" height="33" rx="3"/><path d="M19 9V5h10v4 M19 25h10 M24 20v10"/>',
  stack:
    '<path d="m6 13 29-5 7 6-29 5Z M6 21l7 6 29-5 M6 29l7 6 29-5 M6 37l7 6 29-5 M13 19v24"/>',
  nodes:
    '<path d="m13 13 22 5-9 21-13-26 M13 13l-6 20 19 6"/><circle cx="13" cy="13" r="4"/><circle cx="35" cy="18" r="4"/><circle cx="26" cy="39" r="4"/><circle cx="7" cy="33" r="3"/>',
  lattice:
    '<path d="m24 4 18 10v20L24 44 6 34V14Z M6 14l18 10 18-10 M24 24v20 M24 4v20 M6 34l18-10 18 10"/>',
};

document.querySelector("#product-list").innerHTML = products
  .map(
    (product, index) => `
  <details class="product-item">
    <summary><span class="product-index">0${index + 1}</span><span class="product-icon" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round">${icons[product.symbol]}</svg></span><span class="product-name"><span class="product-label">${product.label}</span><h3>${product.name}</h3></span><span class="product-arrow" aria-hidden="true">↗</span></summary>
    <div class="product-detail"><p>${product.description}</p><div class="product-detail-actions"><a class="text-link catalogue-link" href="${product.url}" target="_blank" rel="noopener noreferrer" aria-label="View ${product.name} on jaford.com (opens in a new tab)">View product range <span aria-hidden="true">↗</span></a><button class="text-link" data-inquiry data-topic="${product.topic}">Ask about this category <span aria-hidden="true">↗</span></button></div></div>
  </details>
`,
  )
  .join("");

// Use vector arrows so technical symbols stay consistent across system fonts.
const arrowPaths = {
  "↗": "M5 19 19 5M5 5h14v14",
  "↘": "M5 5 19 19M5 19h14V5",
  "↑": "M12 21V3M5 10l7-7 7 7",
  "↓": "M12 3v18M5 14l7 7 7-7",
  "↔": "M3 12h18M8 7l-5 5 5 5m8-10 5 5-5 5",
};
document.querySelectorAll('span[aria-hidden="true"]').forEach((element) => {
  const path = arrowPaths[element.textContent.trim()];
  if (path)
    element.innerHTML = `<svg class="inline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="${path}"/></svg>`;
});

document.querySelector("#year").textContent = new Date().getFullYear();
const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector("#navigation");
function closeMenu() {
  menu.setAttribute("aria-expanded", "false");
  menu.setAttribute("aria-label", "Open navigation");
  nav.classList.remove("is-open");
}
menu.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
  nav.classList.toggle("is-open", open);
});
nav.addEventListener("click", (event) => {
  if (event.target.closest("a, button")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menu.focus();
  }
});
window.matchMedia("(min-width: 901px)").addEventListener("change", closeMenu);

const dialog = document.querySelector("#inquiry-dialog");
const form = document.querySelector("#inquiry-form");
const result = document.querySelector("#inquiry-result");
const status = document.querySelector("#copy-status");
let inquiryText = "";

for (const [name, minLength, message] of [
  ["name", 1, "Please enter your name."],
  [
    "requirements",
    10,
    "Please describe your requirements in at least 10 characters.",
  ],
]) {
  form.elements[name].addEventListener("input", (event) => {
    event.target.setCustomValidity(
      event.target.value.trim().length >= minLength ? "" : message,
    );
  });
}

document.querySelectorAll("[data-inquiry]").forEach((button) =>
  button.addEventListener("click", () => {
    if (button.dataset.topic) form.elements.topic.value = button.dataset.topic;
    form.hidden = false;
    result.hidden = true;
    status.textContent = "";
    dialog.showModal();
    document.body.classList.add("dialog-open");
  }),
);
document
  .querySelector(".dialog-close")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("close", () =>
  document.body.classList.remove("dialog-open"),
);
dialog.addEventListener("click", (event) => {
  const rect = dialog.getBoundingClientRect();
  if (
    event.target === dialog &&
    (event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom)
  )
    dialog.close();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const fields = Object.fromEntries(new FormData(form));
  inquiryText = `JAFORD — Product / R&D inquiry\n\nName: ${fields.name.trim()}\nEmail: ${fields.email.trim()}\nOrganization: ${fields.organization.trim() || "Not specified"}\nArea of interest: ${fields.topic}\n\nRequirements:\n${fields.requirements.trim()}`;
  document.querySelector("#inquiry-preview").textContent = inquiryText;
  const email = document.querySelector("#email-inquiry");
  email.href = `mailto:kiki.li@jaford.com?subject=${encodeURIComponent(`JAFORD inquiry — ${fields.topic}`)}&body=${encodeURIComponent(inquiryText)}`;
  form.hidden = true;
  result.hidden = false;
  email.focus();
});
document.querySelector("#copy-inquiry").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(inquiryText);
    status.textContent = "Copied. Your inquiry is ready to share.";
  } catch {
    status.textContent =
      "Clipboard access is unavailable. Download the brief or select and copy the text above.";
  }
});
document.querySelector("#download-inquiry").addEventListener("click", () => {
  const url = URL.createObjectURL(
    new Blob([inquiryText], { type: "text/plain;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "jaford-inquiry.txt";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
document.querySelector("#edit-inquiry").addEventListener("click", () => {
  result.hidden = true;
  form.hidden = false;
  status.textContent = "";
  form.elements.requirements.focus();
});
