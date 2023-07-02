import type { FC } from "react";
import type { ANIMATED_Y_STACK_VARIANTS } from "./constants";
import { GestureResponderEvent } from "react-native/types";

export interface Indicators {
  previous: null | number;
  active: number;
  enterVariant: keyof typeof ANIMATED_Y_STACK_VARIANTS;
  exitVariant: keyof typeof ANIMATED_Y_STACK_VARIANTS;
}

// export type HandleOnPress = (
//   path: string
// ) => (e: GestureResponderEvent) => void;

export type HandleOnPress = (path: string) => () => void;
export interface TabDefinition {
  path: string;
  label: string;
  Icon: FC;
}
