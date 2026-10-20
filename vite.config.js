import { defineConfig } from "vite";
import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve, sep } from "node:path";

export default defineConfig({
  plugins: [{
    name: "static-pages-preview",
    configurePreviewServer(server) {
      const output = resolve(server.config.root, server.config.build.outDir);
      server.middlewares.use((request, response, next) => {
        if (!["GET", "HEAD"].includes(request.method)) return next();
        let pathname;
        try { pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname); }
        catch { return next(); }
        const file = resolve(output, "." + pathname);
        const inside = file === output || file.startsWith(output + sep);
        if (inside && existsSync(file) && (statSync(file).isFile() || existsSync(resolve(file,"index.html")))) return next();
        if (pathname.startsWith("/@") || pathname.startsWith("/__")) return next();
        response.statusCode = 404;
        response.setHeader("Content-Type", "text/html; charset=utf-8");
        response.setHeader("X-Robots-Tag", "noindex");
        response.end(request.method === "HEAD" ? undefined : readFileSync(resolve(output,"404.html")));
      });
    },
  }],
});
