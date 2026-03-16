import { mkdirSync, cpSync } from "node:fs";
import { resolve } from "node:path";
import { execSync } from "node:child_process";

const root = resolve(import.meta.dir);
const dist = resolve(root, "dist", "doom-stilla-theme");

// Clean and create dist structure
execSync(`rm -rf ${resolve(root, "dist")}`);
mkdirSync(dist, { recursive: true });

// Copy theme file and readme
cpSync(resolve(root, "doom-stilla-theme.el"), resolve(dist, "doom-stilla-theme.el"));
cpSync(resolve(root, "README.md"), resolve(dist, "README.md"));

// Create tarball
execSync("tar -czf stilla-emacs-0.0.1.tar.gz -C dist doom-stilla-theme", { cwd: root });
console.log("Packaged: stilla-emacs-0.0.1.tar.gz");
