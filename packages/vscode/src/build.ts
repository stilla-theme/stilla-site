import { writeFileSync } from "node:fs";
import { dark, light } from "./colors";
import { buildTheme } from "./theme";

const stilla = buildTheme("stilla", dark, light);

writeFileSync("./themes/stilla-color-theme.json", JSON.stringify(stilla, null, 2));

console.log("Built themes/stilla-color-theme.json");
