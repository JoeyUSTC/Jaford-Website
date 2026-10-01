import { cases } from "./cases.js";
import { technologies, areaAliases } from "./technologies.js";
import { products, services } from "./catalog.js";
import {
  home,
  caseCatalog,
  caseDetail,
  technologyDirectory,
  technologyDetail,
  productCatalog,
  productDetail,
  serviceCatalog,
  serviceDetail,
  notFound,
} from "./pages.js";

document.querySelector("#navigation").innerHTML = technologies
  .map((t) => `<a href="#/technologies/${t.id}">${t.nav}</a>`)
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
window.matchMedia("(min-width: 1101px)").addEventListener("change", closeMenu);

const dialog = document.querySelector("#inquiry-dialog");
const form = document.querySelector("#inquiry-form");
const result = document.querySelector("#inquiry-result");
const status = document.querySelector("#copy-status");
let inquiryText = "";
let homeContactSource = null;

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

document.addEventListener("click", (event) => {
  if (event.target.closest('a[href="#main"]')) {
    event.preventDefault();
    document.querySelector("#main").focus({ preventScroll: true });
    window.scrollTo(0, 0);
    return;
  }
  if (event.target.closest("[data-show-spec]")) {
    const spec = document.querySelector("#spec-title");
    spec.setAttribute("tabindex", "-1");
    spec.focus({ preventScroll: true });
    spec.scrollIntoView({ block: "start" });
    return;
  }
  const button = event.target.closest("[data-inquiry]");
  if (!button) return;
  homeContactSource = null;
  form.elements.topic.value =
    button.dataset.topic || "Other technical requirement";
  const model = document.querySelector("#product-model");
  form.elements.namedItem("item").value = button.dataset.item
    ? button.dataset.item + (model ? " — " + model.value : "")
    : "";
  document.querySelector("#inquiry-item-label").hidden =
    !form.elements.namedItem("item").value;
  form.hidden = false;
  result.hidden = true;
  status.textContent = "";
  dialog.showModal();
  document.body.classList.add("dialog-open");
});

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
  inquiryText = `JAFORD — Product / R&D inquiry\n\nName: ${fields.name.trim()}\nEmail: ${fields.email.trim()}\nOrganization: ${fields.organization.trim() || "Not specified"}\nArea of interest: ${fields.topic}\n${fields.item ? `Product / service: ${fields.item}\n` : ""}\nQuantity: ${fields.quantity.trim() || "To discuss"}\nRequired timeline: ${fields.timeline.trim() || "To discuss"}\n\nRequirements:\n${fields.requirements.trim()}`;
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
  if (homeContactSource?.isConnected) {
    dialog.close();
    homeContactSource.elements.enquiry.focus();
    return;
  }
  result.hidden = true;
  form.hidden = false;
  status.textContent = "";
  form.elements.requirements.focus();
});

// The inline homepage form prepares a reviewable email; it never claims delivery.
document.addEventListener("input", (event) => {
  if (event.target.closest("#home-contact-form")) event.target.setCustomValidity("");
});
document.addEventListener("submit", (event) => {
  if (event.target.id !== "home-contact-form") return;
  event.preventDefault();
  const source = event.target;
  for (const [field, minimum, message] of [
    ["name", 1, "Please enter your name."],
    ["enquiry", 10, "Please describe your enquiry in at least 10 characters."],
  ]) {
    source.elements[field].setCustomValidity(source.elements[field].value.trim().length >= minimum ? "" : message);
  }
  if (!source.reportValidity()) return;
  const fields = Object.fromEntries(new FormData(source));
  homeContactSource = source;
  inquiryText = `JAFORD enquiry\n\nName: ${fields.name.trim()}\nEmail: ${fields.email.trim()}\n\nEnquiry:\n${fields.enquiry.trim()}`;
  document.querySelector("#inquiry-preview").textContent = inquiryText;
  const email = document.querySelector("#email-inquiry");
  email.href = `mailto:kiki.li@jaford.com?subject=${encodeURIComponent("JAFORD enquiry")}&body=${encodeURIComponent(inquiryText)}`;
  form.hidden = true;
  result.hidden = false;
  status.textContent = "";
  dialog.showModal();
  document.body.classList.add("dialog-open");
  email.focus();
});

function renderRoute(focus = false) {
  const raw = location.hash.slice(1) || "/";
  const [path, query = ""] = raw.split("?");
  if (path === "/products/sodium-hard-carbon") {
    location.replace("#/products?category=battery-materials&q=hard+carbon");
    return;
  }
  const oldArea = path.startsWith("/technologies/") ? path.slice("/technologies/".length) : null;
  if (areaAliases[oldArea]) {
    location.replace(`#/technologies/${areaAliases[oldArea]}${query ? `?${query}` : ""}`);
    return;
  }
  const params = new URLSearchParams(query);
  if (areaAliases[params.get("area")]) params.set("area", areaAliases[params.get("area")]);
  const area = technologies.find((t) => path === `/technologies/${t.id}`);
  const product = products.find((p) => path === `/products/${p.id}`);
  const service = services.find((s) => path === `/services/${s.id}`);
  const caseItem = cases.find((item) => path === `/cases/${item.id}`);
  let html;
  let title = "JAFORD — From Innovation to Industrial Impact";
  if (path === "/technologies") {
    html = technologyDirectory();
    title = "Technology areas — JAFORD";
  } else if (area) {
    html = technologyDetail(area);
    title = `${area.name} — JAFORD`;
  } else if (path === "/products") {
    html = productCatalog(params);
    title = "Products — JAFORD";
  } else if (path === "/cases") {
    html = caseCatalog();
    title = "Case studies — JAFORD";
  } else if (caseItem) {
    html = caseDetail(caseItem);
    title = `${caseItem.title} — JAFORD`;
  } else if (path === "/services") {
    html = serviceCatalog();
    title = "Custom R&D & Services — JAFORD";
  } else if (product) {
    html = productDetail(product, params.get("area"), params);
    title = `${product.name} — JAFORD`;
  } else if (service) {
    html = serviceDetail(service, params.get("area"));
    title = `${service.name} — JAFORD`;
  } else if (
    [
      "/",
      "/contact",
      "main",
      "products",
      "custom-rd",
      "synthesis",
      "contact",
    ].includes(path)
  )
    html = home();
  else {
    html = notFound();
    title = "Page not found — JAFORD";
  }
  document.querySelector("#main").innerHTML = html;
  document.title = title;
  closeMenu();
  if (dialog.open) dialog.close();
  for (const a of nav.querySelectorAll("a")) {
    if (location.hash.startsWith(a.hash))
      a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  }
  const anchor =
    path === "/contact" ? "contact" : !path.startsWith("/") ? path : null;
  const target = anchor
    ? document.getElementById(anchor)
    : document.querySelector("h1");
  if (focus && target) {
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  }
  if (anchor && target) target.scrollIntoView();
  else window.scrollTo(0, 0);
  const filters = document.querySelector("#catalog-filters");
  if (filters) {
    const apply = () => {
      const next = new URLSearchParams();
      if (filters.elements.category.value)
        next.set("category", filters.elements.category.value);
      if (filters.elements.q.value.trim())
        next.set("q", filters.elements.q.value.trim());
      location.hash = "/products" + (next.size ? "?" + next.toString() : "");
    };
    filters.addEventListener("submit", (event) => {
      event.preventDefault();
      apply();
    });
    filters.elements.category.addEventListener("change", apply);
  }
}
window.addEventListener("hashchange", () => renderRoute(true));
renderRoute();
