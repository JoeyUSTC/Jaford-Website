import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
// Keep the existing deployment target; publish crawlable static documents.
execFileSync(process.execPath, ["node_modules/vite/bin/vite.js", "build", "--base", "./", "--outDir", ".preview-dist"], { cwd: root, stdio: "inherit" });
execFileSync(process.execPath, ["scripts/prerender.mjs", ".preview-dist"], { cwd: root, stdio: "inherit" });
