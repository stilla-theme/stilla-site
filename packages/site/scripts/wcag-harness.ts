import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { palette as sourcePalette, type PaletteKey } from "stilla-colors";
import { analyzePalette, apcaLc, relativeLuminance, wcagContrast } from "../src/contrast";

type ThemePalette = Record<PaletteKey, string>;

type Rgb = {
  r: number;
  g: number;
  b: number;
};

type Hsl = {
  h: number;
  s: number;
  l: number;
};

type HarnessOptions = {
  minRatio: number;
  minApca: number;
  outFile: string;
};

const PALETTE_KEYS: PaletteKey[] = [
  "bg",
  "bgAlt",
  "surface",
  "muted",
  "comment",
  "fg",
  "white",
  "warmWhite",
  "teal",
  "cyan",
  "steel",
  "navy",
  "red",
  "orange",
  "yellow",
  "sage",
  "magenta",
  "fgAlt",
  "deepTeal",
  "darkBlue",
  "khaki",
];
const PALETTE_KEY_SET = new Set<string>(PALETTE_KEYS);

const DEFAULT_OPTIONS: HarnessOptions = {
  minRatio: 7,
  minApca: 90,
  outFile: "./.generated/wcag-adjusted-palette.json",
};

function readColorsTxt(): Record<string, string> {
  const colorsTxtPath = resolve(import.meta.dir, "../../colors/colors.txt");
  const raw = readFileSync(colorsTxtPath, "utf8");
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"))
    .map((line) => line.split(/\s+/))
    .reduce<Record<string, string>>((acc, parts) => {
      if (parts.length < 2) {
        return acc;
      }

      const key = parts[0];
      const value = parts[1];
      acc[key] = `#${value.toUpperCase()}`;
      return acc;
    }, {});
}

function parseArgs(argv: string[]): HarnessOptions {
  const next = { ...DEFAULT_OPTIONS };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "--min-ratio") {
      const raw = argv[i + 1];
      if (!raw) {
        throw new Error("--min-ratio requires a numeric value");
      }
      const value = Number(raw);
      if (!Number.isFinite(value) || value <= 1 || value > 21) {
        throw new Error("--min-ratio must be between 1 and 21");
      }
      next.minRatio = value;
      i += 1;
      continue;
    }

    if (arg === "--out") {
      const raw = argv[i + 1];
      if (!raw) {
        throw new Error("--out requires a file path");
      }
      next.outFile = raw;
      i += 1;
      continue;
    }

    if (arg === "--min-apca") {
      const raw = argv[i + 1];
      if (!raw) {
        throw new Error("--min-apca requires a numeric value");
      }
      const value = Number(raw);
      if (!Number.isFinite(value) || value < 0 || value > 110) {
        throw new Error("--min-apca must be between 0 and 110");
      }
      next.minApca = value;
      i += 1;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return next;
}

function isPaletteKey(value: string): value is PaletteKey {
  return PALETTE_KEY_SET.has(value);
}

function hexToRgb(hex: string): Rgb {
  const cleaned = hex.replace("#", "");
  return {
    r: Number.parseInt(cleaned.slice(0, 2), 16),
    g: Number.parseInt(cleaned.slice(2, 4), 16),
    b: Number.parseInt(cleaned.slice(4, 6), 16),
  };
}

function rgbToHex(rgb: Rgb): string {
  return `#${[rgb.r, rgb.g, rgb.b]
    .map((channel) => Math.max(0, Math.min(255, Math.round(channel))).toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase()}`;
}

function rgbToHsl(rgb: Rgb): Hsl {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));

    switch (max) {
      case r:
        h = 60 * (((g - b) / delta) % 6);
        break;
      case g:
        h = 60 * ((b - r) / delta + 2);
        break;
      default:
        h = 60 * ((r - g) / delta + 4);
        break;
    }

    if (h < 0) {
      h += 360;
    }
  }

  return { h, s, l };
}

function hslToRgb(hsl: Hsl): Rgb {
  const c = (1 - Math.abs(2 * hsl.l - 1)) * hsl.s;
  const x = c * (1 - Math.abs(((hsl.h / 60) % 2) - 1));
  const m = hsl.l - c / 2;

  let rPrime = 0;
  let gPrime = 0;
  let bPrime = 0;

  if (hsl.h >= 0 && hsl.h < 60) {
    rPrime = c;
    gPrime = x;
  } else if (hsl.h < 120) {
    rPrime = x;
    gPrime = c;
  } else if (hsl.h < 180) {
    gPrime = c;
    bPrime = x;
  } else if (hsl.h < 240) {
    gPrime = x;
    bPrime = c;
  } else if (hsl.h < 300) {
    rPrime = x;
    bPrime = c;
  } else {
    rPrime = c;
    bPrime = x;
  }

  return {
    r: (rPrime + m) * 255,
    g: (gPrime + m) * 255,
    b: (bPrime + m) * 255,
  };
}

function luminanceDirection(fg: string, bgs: string[]): "lighter" | "darker" {
  const fgLum = relativeLuminance(fg);
  let darkBgCount = 0;

  for (const bg of bgs) {
    if (relativeLuminance(bg) < fgLum) {
      darkBgCount += 1;
    }
  }

  return darkBgCount >= Math.ceil(bgs.length / 2) ? "lighter" : "darker";
}

function satisfiesAll(candidate: string, backgrounds: string[], minRatio: number): boolean {
  for (const bg of backgrounds) {
    if (wcagContrast(candidate, bg) < minRatio) {
      return false;
    }
  }
  return true;
}

function satisfiesAllApca(candidate: string, backgrounds: string[], minApca: number): boolean {
  for (const bg of backgrounds) {
    if (Math.abs(apcaLc(candidate, bg)) < minApca) {
      return false;
    }
  }
  return true;
}

function searchLightness(
  hsl: Hsl,
  backgrounds: string[],
  minRatio: number,
  minApca: number,
  direction: "lighter" | "darker",
): string | null {
  let lo = direction === "lighter" ? hsl.l : 0;
  let hi = direction === "lighter" ? 1 : hsl.l;
  let best: string | null = null;

  for (let i = 0; i < 30; i += 1) {
    const mid = (lo + hi) / 2;
    const candidateHex = rgbToHex(hslToRgb({ ...hsl, l: mid }));

    if (satisfiesAll(candidateHex, backgrounds, minRatio) && satisfiesAllApca(candidateHex, backgrounds, minApca)) {
      best = candidateHex;
      if (direction === "lighter") {
        hi = mid;
      } else {
        lo = mid;
      }
    } else if (direction === "lighter") {
      lo = mid;
    } else {
      hi = mid;
    }
  }

  return best;
}

function adjustForegroundForBackgrounds(hex: string, backgrounds: string[], minRatio: number, minApca: number): string {
  if (satisfiesAll(hex, backgrounds, minRatio) && satisfiesAllApca(hex, backgrounds, minApca)) {
    return hex;
  }

  const hsl = rgbToHsl(hexToRgb(hex));
  const preferred = luminanceDirection(hex, backgrounds);
  const fallback = preferred === "lighter" ? "darker" : "lighter";

  const firstTry = searchLightness(hsl, backgrounds, minRatio, minApca, preferred);
  if (firstTry) {
    return firstTry;
  }

  const secondTry = searchLightness(hsl, backgrounds, minRatio, minApca, fallback);
  if (secondTry) {
    return secondTry;
  }

  return hex;
}

function optimizePalette(input: ThemePalette, minRatio: number, minApca: number): ThemePalette {
  const output: ThemePalette = { ...input };

  for (let pass = 0; pass < 8; pass += 1) {
    const stats = analyzePalette(output);
    const failing = stats.pairings.filter(
      (pairing) => pairing.wcagRatio < minRatio || Math.abs(pairing.apca) < minApca,
    );

    if (failing.length === 0) {
      return output;
    }

    const backgroundsByForeground = new Map<PaletteKey, Set<string>>();
    for (const pairing of failing) {
      if (!isPaletteKey(pairing.fgKey)) {
        continue;
      }
      const fgKey = pairing.fgKey;
      const existing = backgroundsByForeground.get(fgKey) ?? new Set<string>();
      existing.add(pairing.bg);
      backgroundsByForeground.set(fgKey, existing);
    }

    for (const [fgKey, backgroundsSet] of backgroundsByForeground.entries()) {
      const backgrounds = [...backgroundsSet];
      output[fgKey] = adjustForegroundForBackgrounds(output[fgKey], backgrounds, minRatio, minApca);
    }
  }

  return output;
}

function changedKeys(before: ThemePalette, after: ThemePalette): PaletteKey[] {
  return PALETTE_KEYS.filter((key) => before[key] !== after[key]);
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}

function runHarness(options: HarnessOptions) {
  const before: ThemePalette = { ...sourcePalette };
  const after = optimizePalette(before, options.minRatio, options.minApca);
  const colorsTxt = readColorsTxt();

  const beforeStats = analyzePalette(before);
  const afterStats = analyzePalette(after);
  const changed = changedKeys(before, after);

  const payload = {
    minRatio: options.minRatio,
    minApca: options.minApca,
    colorsTxt,
    summary: {
      before: {
        fail: beforeStats.wcagFail,
        aaLarge: beforeStats.wcagAALarge,
        aaOrBetter: beforeStats.wcagAAA + beforeStats.wcagAA,
        apcaFail: beforeStats.pairings.filter((pairing) => pairing.apcaGrade === "Fail").length,
        apcaMinOrBetter: beforeStats.pairings.filter((pairing) => Math.abs(pairing.apca) >= options.minApca).length,
      },
      after: {
        fail: afterStats.wcagFail,
        aaLarge: afterStats.wcagAALarge,
        aaOrBetter: afterStats.wcagAAA + afterStats.wcagAA,
        apcaFail: afterStats.pairings.filter((pairing) => pairing.apcaGrade === "Fail").length,
        apcaMinOrBetter: afterStats.pairings.filter((pairing) => Math.abs(pairing.apca) >= options.minApca).length,
      },
    },
    changed,
    palette: after,
    worstPairings: {
      before: {
        name: beforeStats.minWcag.name,
        ratio: round(beforeStats.minWcag.wcagRatio),
      },
      after: {
        name: afterStats.minWcag.name,
        ratio: round(afterStats.minWcag.wcagRatio),
      },
    },
    pairings: afterStats.pairings.map((pairing) => ({
      name: pairing.name,
      fgKey: pairing.fgKey,
      bgKey: pairing.bgKey,
      ratio: round(pairing.wcagRatio),
      level: pairing.wcagGrade,
      apca: round(pairing.apca),
      apcaLevel: pairing.apcaGrade,
    })),
  };

  const outputPath = resolve(options.outFile);
  mkdirSync(resolve(outputPath, ".."), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`);

  console.log(`Contrast harness complete (WCAG >= ${options.minRatio}:1, APCA |Lc| >= ${options.minApca})`);
  console.log(
    `Before: WCAG Fail ${beforeStats.wcagFail}, AA-large ${beforeStats.wcagAALarge}, APCA<${options.minApca} ${beforeStats.pairings.filter((pairing) => Math.abs(pairing.apca) < options.minApca).length}`,
  );
  console.log(
    `After:  WCAG Fail ${afterStats.wcagFail}, AA-large ${afterStats.wcagAALarge}, APCA<${options.minApca} ${afterStats.pairings.filter((pairing) => Math.abs(pairing.apca) < options.minApca).length}`,
  );

  if (changed.length === 0) {
    console.log("No palette adjustments were required.");
  } else {
    console.log("Adjusted keys:");
    for (const key of changed) {
      console.log(`  ${key}: ${before[key]} -> ${after[key]}`);
    }
  }

  console.log(`Wrote report: ${outputPath}`);
}

const options = parseArgs(process.argv.slice(2));
runHarness(options);
