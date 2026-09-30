import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = join(root, ".preview-dist");
if (!existsSync(join(output, "index.html"))) throw new Error("Run npm run build:preview first.");
const git = (args, env = process.env) => execFileSync("git", args, { cwd: root, env, encoding: "utf8" }).trim();
const remote = git(["remote", "get-url", "origin"]);
if (remote !== "https://github.com/JoeyUSTC/Jaford-Website.git") throw new Error("Unexpected origin. Review the destination before publishing.");
const previous = git(["ls-remote", "--heads", "origin", "gh-pages"]).split(/\s/)[0];
if (previous) git(["fetch", "origin", "refs/heads/gh-pages"]);
const temporary = mkdtempSync(join(tmpdir(), "jaford-pages-"));
try {
  const env = { ...process.env, GIT_INDEX_FILE: join(temporary, "index") };
  git(["read-tree", "--empty"], env);
  git(["--work-tree", output, "-C", output, "add", "--all", "--", "."], env);
  const tree = git(["write-tree"], env);
  const files = git(["ls-tree", "-r", "--name-only", tree]).split("\n");
  if (!files.includes("index.html") || files.some((file) => !/^(index\.html|favicon\.svg|\.nojekyll|assets\/[^/]+|images\/[^/]+)$/.test(file))) {
    throw new Error("Unexpected files in the preview artifact; publication stopped.");
  }
  const commit = git(["commit-tree", tree, ...(previous ? ["-p", previous] : []), "-m", "Publish JAFORD homepage preview"]);
  // No force push: a concurrent publisher must be reviewed before retrying.
  execFileSync("git", ["push", "origin", `${commit}:refs/heads/gh-pages`], { cwd: root, stdio: "inherit" });
  console.log("Preview files published to gh-pages. GitHub Pages must use this branch at / (root).");
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
