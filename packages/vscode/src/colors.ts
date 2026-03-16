import { numbered, variants, lightOverrides } from "stilla-colors";

export type ColorPalette = typeof numbered & typeof variants;
export type LightOverrides = typeof lightOverrides;

export const dark: ColorPalette = { ...numbered, ...variants };
export const light: LightOverrides = { ...lightOverrides };
