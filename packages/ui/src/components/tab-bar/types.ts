import type { Tabs } from "tamagui";
import type { ANIMATED_Y_STACK_VARIANTS } from "./constants";

interface TabButtonState {
  index: number;
}

export interface Indicators {
  previous: null | TabButtonState;
  active: null | TabButtonState;
  hovered: null | TabButtonState;
  enterVariant: keyof typeof ANIMATED_Y_STACK_VARIANTS;
  exitVariant: keyof typeof ANIMATED_Y_STACK_VARIANTS;
}

export type OnInteraction = (
  path: string,
  index: number
) => Parameters<typeof Tabs.Tab>[0]["onInteraction"];
