import { createAnimations } from "@tamagui/animations-react-native";
import { createTamagui, baseConfig } from "ui/src/tamagui.config";

const appConfig = createTamagui({
  ...baseConfig,
  // @ts-ignore
  animations: createAnimations({
    fast: {
      type: "spring",
      // damping: 1000,
      // mass: 1.2,
      // stiffness: 1000,
    },
    medium: {
      type: "spring",
      damping: 10,
      mass: 0.9,
      stiffness: 100,
    },
    slow: {
      type: "spring",
      damping: 20,
      stiffness: 60,
    },
  }),
});

// @ts-ignore
export type AppConfig = typeof appConfig;

declare module "@tamagui/core" {
  // overrides TamaguiCustomConfig so your custom types
  // work everywhere you import `tamagui`
  // @ts-ignore
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;
