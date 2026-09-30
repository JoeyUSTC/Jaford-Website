import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
execFileSync(process.execPath, ["node_modules/vite/bin/vite.js", "build", "--base", "/Jaford-Website/", "--outDir", ".preview-dist"], { cwd: root, stdio: "inherit" });
const output = new URL("../.preview-dist/", import.meta.url);
const index = new URL("index.html", output);
writeFileSync(index, readFileSync(index, "utf8").replace("</head>", '<meta name="robots" content="noindex, nofollow" />\n</head>'));
writeFileSync(new URL(".nojekyll", output), "");
console.log("Built the independent GitHub Pages preview. Search indexing is discouraged; this is not access control.");
