import { mkdirSync, cpSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { execSync } from "node:child_process";

const root = resolve(import.meta.dir);
const dist = resolve(root, "dist", "stilla.nvim");

// Clean and create dist structure
execSync(`rm -rf ${resolve(root, "dist")}`);
mkdirSync(resolve(dist, "lua", "stilla"), { recursive: true });
mkdirSync(resolve(dist, "lua", "lualine", "themes"), { recursive: true });
mkdirSync(resolve(dist, "colors"), { recursive: true });

// Copy plugin files
cpSync(resolve(root, "lua", "stilla"), resolve(dist, "lua", "stilla"), { recursive: true });
cpSync(resolve(root, "lua", "lualine"), resolve(dist, "lua", "lualine"), { recursive: true });
cpSync(resolve(root, "colors", "stilla.vim"), resolve(dist, "colors", "stilla.vim"));
cpSync(resolve(root, "LICENSE"), resolve(dist, "LICENSE"));
cpSync(resolve(root, "README.md"), resolve(dist, "README.md"));

// Create tarball
execSync("tar -czf stilla-nvim-0.0.1.tar.gz -C dist stilla.nvim", { cwd: root });
console.log("Packaged: stilla-nvim-0.0.1.tar.gz");
