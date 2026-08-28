export const COLOR_MODES = [
  { id: "prism", label: "棱鏡" },
  { id: "ember", label: "燼火" },
  { id: "tide", label: "潮汐" },
  { id: "noir", label: "墨白" },
  { id: "bloom", label: "花開" },
  { id: "forest", label: "林間" },
] as const;

export type ColorMode = (typeof COLOR_MODES)[number]["id"];

export type KaleidoSettings = {
  segments: number;
  colorMode: ColorMode;
  frozen: boolean;
};

export const MIN_SEGMENTS = 3;
export const MAX_SEGMENTS = 18;
export const DEFAULT_SEGMENTS = 8;
export const DEFAULT_COLOR_MODE: ColorMode = "prism";

export const STORAGE_KEY = "kaleido-v1";

export function isColorMode(value: unknown): value is ColorMode {
  return COLOR_MODES.some((mode) => mode.id === value);
}
