// Bundled modules live in assets/; source modules live in src/. Both are one
// level below the mount root. This also supports the original Pages subpath.
export const siteBase = typeof window === "undefined" ? "/" : new URL(/* @vite-ignore */ "../", import.meta.url).pathname;
export const siteURL = (route = "/") => {
  const [path, query = ""] = route.replace(/^#/, "").split("?");
  const clean = path.replace(/^\/+|\/+$/g, "");
  return siteBase + (clean ? `${clean}/` : "") + (query ? `?${query}` : "");
};

export function pathFromURL(url) {
  if (url.hash.startsWith("#/")) return url.hash.slice(1);
  const path = url.pathname.startsWith(siteBase) ? url.pathname.slice(siteBase.length) : url.pathname.slice(1);
  return `/${path}${url.search}`;
}
