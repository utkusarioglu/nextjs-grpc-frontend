import { createAnimations } from "@tamagui/animations-css";
import { createTamagui, baseConfig } from "ui/src/tamagui.config";

const appConfig = createTamagui({
  ...baseConfig,
  animations: createAnimations({
    fast: {
      type: "spring",
      damping: 20,
      mass: 1.2,
      stiffness: 250,
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

export type AppConfig = typeof appConfig;

declare module "@tamagui/core" {
  // overrides TamaguiCustomConfig so your custom types
  // work everywhere you import `tamagui`
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;
