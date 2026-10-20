import { home, contactPage, productCatalog, serviceCatalog, caseCatalog, technologyDetail, productDetail, serviceDetail, caseDetail, notFound } from "./pages.js";
import { ownerInsightsPage } from "./analytics.js";

export function renderPage(page) {
  switch (page.type) {
    case "home": return home();
    case "contact": return contactPage();
    case "products": return productCatalog(page.params);
    case "services": return serviceCatalog();
    case "cases": return caseCatalog();
    case "technology": return technologyDetail(page.area);
    case "product": return productDetail(page.item, page.area.id, page.params);
    case "service": return serviceDetail(page.item, page.area.id);
    case "case": return caseDetail(page.item);
    case "owner": return ownerInsightsPage();
    default: return notFound();
  }
}
