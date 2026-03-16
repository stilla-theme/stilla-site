/** Stilla color palette — the single source of truth for all editor themes. */
export const palette = {
  bg: "#0D0D0D",
  bgAlt: "#121414",
  surface: "#1A1C1C",
  muted: "#4C566A",
  comment: "#8C8C8C",
  fg: "#F2F2F2",
  white: "#FAFAFA",
  warmWhite: "#FAF5EF",
  teal: "#8FBCBB",
  cyan: "#88B6D0",
  steel: "#ADB2BA",
  navy: "#5E81AC",
  red: "#BA8082",
  orange: "#D99962",
  yellow: "#E9B872",
  sage: "#A19C9A",
  magenta: "#CD96B3",
  fgAlt: "#BFC7D5",
  deepTeal: "#6D96A5",
  darkBlue: "#68809A",
  khaki: "#B29E75",
} as const;

export type Palette = typeof palette;
export type PaletteKey = keyof Palette;

/** Numbered color mapping (VS Code theme + Neovim use this indexing) */
export const numbered = {
  color0: palette.bg,
  color1: palette.bgAlt,
  color2: palette.surface,
  color3: palette.muted,
  color3_bright: palette.comment,
  color4: palette.fg,
  color5: palette.white,
  color6: palette.warmWhite,
  color7: palette.teal,
  color8: palette.cyan,
  color9: palette.steel,
  color10: palette.navy,
  color11: palette.red,
  color12: palette.orange,
  color13: palette.yellow,
  color14: palette.sage,
  color15: palette.magenta,
} as const;

/** VS Code variant colors — opacity variations for UI chrome (mostly Nord-heritage base colors) */
export const variants = {
  color0_alt1: "#2e3440ff",
  color1_alt1: "#3b425201",
  color1_alt2: "#3b425299",
  color1_alt3: "#3b4252cc",
  color1_alt4: "#3b4252b3",
  color2_alt1: "#434c5ecc",
  color2_alt2: "#434c5eb3",
  color2_alt3: "#434c5e52",
  color2_alt4: "#434c5eaa",
  color2_alt5: "#434c5e99",
  color3_alt1: "#4c566ab3",
  color4_alt1: "#d8dee9e6",
  color4_alt2: "#d8dee9cc",
  color4_alt3: "#d8dee966",
  color4_alt4: "#d8dee9ff",
  color4_alt5: "#d8dee999",
  color7_alt1: "#8fbcbb66",
  color7_alt2: "#8fbcbb4d",
  color8_alt1: "#88c0d0ee",
  color8_alt2: "#88c0d066",
  color8_alt3: "#88c0d099",
  color8_alt4: "#88c0d0cc",
  color8_alt5: "#88c0d033",
  color8_alt6: "#88c0d04d",
  color9_alt1: "#81a1c166",
  color9_alt2: "#81a1c14d",
  color9_alt3: "#81a1c199",
  color10_alt1: "#5e81acc0",
  color11_alt1: "#bf616ac0",
  color11_alt2: "#bf616acc",
  color11_alt3: "#bf616a00",
  color13_alt1: "#ebcb8bcc",
  color13_alt2: "#ebcb8b00",
  shadow: "#00000066",
} as const;

/** Light mode overrides for VS Code */
export const lightOverrides = {
  color9_alt1: "#81a1c133",
  color13_alt1: "#ebcb8bc0",
} as const;
