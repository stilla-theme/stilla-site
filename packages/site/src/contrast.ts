/**
 * Color contrast analysis utilities.
 *
 * Implements two academic standards:
 *   1. WCAG 2.1 relative luminance & contrast ratio (W3C Recommendation)
 *      https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 *   2. APCA (Accessible Perceptual Contrast Algorithm) from WCAG 3.0 draft
 *      https://github.com/Myndex/SAPC-APCA
 */

// ---------------------------------------------------------------------------
// Hex parsing
// ---------------------------------------------------------------------------

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}

// ---------------------------------------------------------------------------
// WCAG 2.1 — Relative luminance & contrast ratio
// ---------------------------------------------------------------------------

/** sRGB channel → linear (IEC 61966-2-1) */
function srgbToLinear(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

/** Relative luminance per WCAG 2.1 §1.4.3 */
export function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}

/** WCAG 2.1 contrast ratio (1:1 – 21:1) */
export function wcagContrast(fg: string, bg: string): number {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export type WcagLevel = "AAA" | "AA" | "AA-large" | "Fail";

/** Evaluate WCAG 2.1 conformance level for a contrast ratio. */
export function wcagLevel(ratio: number): WcagLevel {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3) return "AA-large";
  return "Fail";
}

// ---------------------------------------------------------------------------
// APCA (WCAG 3.0 draft) — Lc value
// ---------------------------------------------------------------------------

/**
 * Attempt a simplified APCA calculation (SAPC-APCA 0.1.9 reference).
 * Returns lightness-contrast value Lc (roughly -108 to +106).
 * Positive = light text on dark, negative = dark text on light.
 *
 * Thresholds (absolute |Lc|):
 *   ≥ 90  body text (fluent reading)
 *   ≥ 75  content text
 *   ≥ 60  large/bold text
 *   ≥ 45  non-text, large UI elements
 *   ≥ 30  minimum for any purpose
 *   < 30  invisible / not usable
 */
export function apcaLc(textHex: string, bgHex: string): number {
  const [tr, tg, tb] = hexToRgb(textHex);
  const [br, bg_, bb] = hexToRgb(bgHex);

  // Linearize with sRGB companding coefficients per APCA spec
  const mainTRC = 2.4;
  const lin = (v: number) => (v / 255) ** mainTRC;

  const txtY = 0.2126729 * lin(tr) + 0.7151522 * lin(tg) + 0.0721750 * lin(tb);
  const bgY = 0.2126729 * lin(br) + 0.7151522 * lin(bg_) + 0.0721750 * lin(bb);

  // Soft clamp
  const txtYc = txtY > 0.022 ? txtY : txtY + (0.022 - txtY) ** 1.414;
  const bgYc = bgY > 0.022 ? bgY : bgY + (0.022 - bgY) ** 1.414;

  // SAPC — polarity-aware exponent
  const normBG = 0.56;
  const normTXT = 0.57;
  const revBG = 0.65;
  const revTXT = 0.62;
  const scaleBoW = 1.14;
  const scaleWoB = 1.14;
  const loBoWoffset = 0.027;
  const loWoBoffset = 0.027;
  const loClip = 0.1;

  let SAPC: number;
  if (bgYc > txtYc) {
    // Dark text on light background
    SAPC = (bgYc ** normBG - txtYc ** normTXT) * scaleBoW;
    const lc = Math.abs(SAPC) < loClip ? 0 : SAPC > 0 ? SAPC - loBoWoffset : 0;
    return lc * 100;
  }
  // Light text on dark background
  SAPC = (bgYc ** revBG - txtYc ** revTXT) * scaleWoB;
  const lc = Math.abs(SAPC) < loClip ? 0 : SAPC < 0 ? SAPC + loWoBoffset : 0;
  return lc * 100;
}

export type ApcaRating = "Best" | "Good" | "OK" | "Min" | "Fail";

export function apcaRating(lc: number): ApcaRating {
  const abs = Math.abs(lc);
  if (abs >= 90) return "Best";
  if (abs >= 75) return "Good";
  if (abs >= 60) return "OK";
  if (abs >= 30) return "Min";
  return "Fail";
}

// ---------------------------------------------------------------------------
// Theme-specific pairing analysis
// ---------------------------------------------------------------------------

export interface ContrastPairing {
  name: string;
  fgKey: string;
  bgKey: string;
  fg: string;
  bg: string;
  wcagRatio: number;
  wcagGrade: WcagLevel;
  apca: number;
  apcaGrade: ApcaRating;
}

export interface PaletteStats {
  pairings: ContrastPairing[];
  wcagAAA: number;
  wcagAA: number;
  wcagAALarge: number;
  wcagFail: number;
  avgWcag: number;
  avgApca: number;
  minWcag: ContrastPairing;
  maxWcag: ContrastPairing;
}

type Palette = Record<string, string>;

/** Pairs that actually appear in the Stilla theme (syntax + UI). */
const THEME_PAIRINGS: Array<{ name: string; fgKey: string; bgKey: string }> = [
  // Syntax tokens against editor background
  { name: "Foreground / bg", fgKey: "fg", bgKey: "bg" },
  { name: "Comment / bg", fgKey: "comment", bgKey: "bg" },
  { name: "Keyword (steel) / bg", fgKey: "steel", bgKey: "bg" },
  { name: "String (sage) / bg", fgKey: "sage", bgKey: "bg" },
  { name: "Type (teal) / bg", fgKey: "teal", bgKey: "bg" },
  { name: "Number (magenta) / bg", fgKey: "magenta", bgKey: "bg" },
  { name: "Escape (yellow) / bg", fgKey: "yellow", bgKey: "bg" },
  { name: "Metatag (navy) / bg", fgKey: "navy", bgKey: "bg" },
  { name: "Delimiter (warmWhite) / bg", fgKey: "warmWhite", bgKey: "bg" },
  { name: "Orange / bg", fgKey: "orange", bgKey: "bg" },
  { name: "Red / bg", fgKey: "red", bgKey: "bg" },
  { name: "Cyan / bg", fgKey: "cyan", bgKey: "bg" },

  // UI chrome
  { name: "Line number (muted) / bg", fgKey: "muted", bgKey: "bg" },
  { name: "Foreground / bgAlt", fgKey: "fg", bgKey: "bgAlt" },
  { name: "Comment / bgAlt", fgKey: "comment", bgKey: "bgAlt" },
  { name: "Muted / surface", fgKey: "muted", bgKey: "surface" },
  { name: "Steel / bgAlt", fgKey: "steel", bgKey: "bgAlt" },
  { name: "Foreground / surface", fgKey: "fg", bgKey: "surface" },

  // Site-level
  { name: "fgAlt / bgAlt", fgKey: "fgAlt", bgKey: "bgAlt" },
  { name: "Deep teal / bg", fgKey: "deepTeal", bgKey: "bg" },
  { name: "Dark blue / bg", fgKey: "darkBlue", bgKey: "bg" },
  { name: "Khaki / bg", fgKey: "khaki", bgKey: "bg" },
];

export function analyzePalette(p: Palette): PaletteStats {
  const pairings: ContrastPairing[] = [];

  for (const { name, fgKey, bgKey } of THEME_PAIRINGS) {
    const fg = p[fgKey];
    const bg = p[bgKey];
    if (!fg || !bg) continue;

    const ratio = wcagContrast(fg, bg);
    const lc = apcaLc(fg, bg);

    pairings.push({
      name,
      fgKey,
      bgKey,
      fg,
      bg,
      wcagRatio: ratio,
      wcagGrade: wcagLevel(ratio),
      apca: lc,
      apcaGrade: apcaRating(lc),
    });
  }

  const sorted = [...pairings].sort((a, b) => a.wcagRatio - b.wcagRatio);
  const counts = { AAA: 0, AA: 0, "AA-large": 0, Fail: 0 };
  let totalWcag = 0;
  let totalApca = 0;
  for (const p of pairings) {
    counts[p.wcagGrade]++;
    totalWcag += p.wcagRatio;
    totalApca += Math.abs(p.apca);
  }

  return {
    pairings,
    wcagAAA: counts.AAA,
    wcagAA: counts.AA,
    wcagAALarge: counts["AA-large"],
    wcagFail: counts.Fail,
    avgWcag: totalWcag / pairings.length,
    avgApca: totalApca / pairings.length,
    minWcag: sorted[0],
    maxWcag: sorted[sorted.length - 1],
  };
}
