export interface ColorPalette {
  color0: string;
  color1: string;
  color2: string;
  color3: string;
  color3_bright: string;
  color4: string;
  color5: string;
  color6: string;
  color7: string;
  color8: string;
  color9: string;
  color10: string;
  color11: string;
  color12: string;
  color13: string;
  color14: string;
  color15: string;
  color0_alt1: string;
  color1_alt1: string;
  color1_alt2: string;
  color1_alt3: string;
  color1_alt4: string;
  color2_alt1: string;
  color2_alt2: string;
  color2_alt3: string;
  color2_alt4: string;
  color2_alt5: string;
  color3_alt1: string;
  color4_alt1: string;
  color4_alt2: string;
  color4_alt3: string;
  color4_alt4: string;
  color4_alt5: string;
  color7_alt1: string;
  color7_alt2: string;
  color8_alt1: string;
  color8_alt2: string;
  color8_alt3: string;
  color8_alt4: string;
  color8_alt5: string;
  color8_alt6: string;
  color9_alt1: string;
  color9_alt2: string;
  color9_alt3: string;
  color10_alt1: string;
  color11_alt1: string;
  color11_alt2: string;
  color11_alt3: string;
  color13_alt1: string;
  color13_alt2: string;
  shadow: string;
}

export interface LightOverrides {
  color9_alt1: string;
  color13_alt1: string;
}

export const dark: ColorPalette = {
  color0: "#0D0D0D", // background
  color1: "#121414", // normal black
  color2: "#1A1C1C", // nord2 in palette
  color3: "#4C566A",
  color3_bright: "#8C8C8C", // out of palette
  color4: "#F2F2F2", // foreground
  color5: "#FAFAFA", // normal white
  color6: "#FAF5EF", // alt white
  color7: "#8FBCBB", // alt cyan
  color8: "#88B6D0", // cyan
  color9: "#ADB2BA", // function signatures
  color10: "#5E81AC", // nord10 in palette
  color11: "#BA8082", // red
  color12: "#d99962", // yellow
  color13: "#E9B872", // yellow2
  color14: "#A19C9A", // strings
  color15: "#CD96B3", // magenta

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
};

export const light: LightOverrides = {
  color9_alt1: "#81a1c133",
  color13_alt1: "#ebcb8bc0",
};
