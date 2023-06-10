import { config } from "@tamagui/config";
export { createTamagui } from "tamagui"; // or '@tamagui/core'

// if using only @tamagui/core with `react-native` components
// if using `tamagui` this isn't necessary
// setupReactNative(ReactNative);
export const baseConfig = config;
