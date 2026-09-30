const products = [
  {
    name: "Li / Na battery materials & components",
    description:
      "LFP, NMC and NFPP cathodes; graphite, silicon-carbon and hard-carbon anodes. We also supply separators, electrolytes, binders and conductive additives for Li-ion and Na-ion research.",
    url: "https://www.jaford.com/products/battery-and-materials#battery-materials",
    topic: "Li / Na battery materials & components",
  },
  {
    name: "Pouch, cylindrical & prismatic cells",
    description:
      "Custom cells matched to your chemistry, capacity, packaging and performance targets. Discuss dry-cell builds, finished pouch cells, and development for energy density, cycle life or safety validation.",
    url: "https://www.jaford.com/products/battery-and-materials#battery-cells",
    topic: "Battery cells",
  },
  {
    name: "Fuel cells & electrolyzers",
    description:
      "Membranes, gas diffusion layers, flow-field plates, gaskets and stack hardware. From matched component kits to custom fuel-cell fixtures, electrolyzer stacks and device-level solutions.",
    url: "https://www.jaford.com/products/fuel-cell-and-electrolyzer#electrolyzer-solutions",
    topic: "Fuel cells & electrolyzers",
  },
  {
    name: "Electrocatalysis",
    description:
      "Catalysts for CO₂ reduction, hydrogen evolution and oxygen evolution. Catalyst-coated substrates and membranes (CCS/CCM), nickel or titanium felt, custom high-pressure electrolysis equipment and precision fixtures.",
    url: "https://www.jaford.com/products/fuel-cell-and-electrolyzer#electrocatalysis-solutions",
    topic: "Electrocatalysis",
  },
  {
    name: "Advanced materials",
    description:
      "Functional polymers, membrane materials, MOF/COF frameworks and advanced intermediates. Share the structure, target properties or application you need, and discuss a custom preparation route.",
    url: "https://www.jaford.com/products/membranes-polymers",
    topic: "Advanced materials",
  },
];

document.querySelector("#product-list").innerHTML = products
  .map(
    (product) => `
    <article class="product-item">
      <h3>${product.name}</h3>
      <div class="product-detail">
        <p>${product.description}</p>
        <div class="product-detail-actions">
          <a class="text-link catalogue-link" href="${product.url}" target="_blank" rel="noopener noreferrer" aria-label="View ${product.name} on jaford.com (opens in a new tab)">View product range</a>
          <button class="text-link" data-inquiry data-topic="${product.topic}">Ask about this category</button>
        </div>
      </div>
    </article>
  `,
  )
  .join("");

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
