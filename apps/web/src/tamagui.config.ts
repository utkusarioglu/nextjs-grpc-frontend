import { createAnimations } from "@tamagui/animations-css";
import { createTamagui, baseConfig } from "ui/src/tamagui.config";

const appConfig = createTamagui({
  ...baseConfig,
  animations: createAnimations({
    fast: "ease-in 150ms",
    medium: "ease-in 300ms",
    slow: "ease-in 450ms",
  }),
});

export type AppConfig = typeof appConfig;

declare module "@tamagui/core" {
  // overrides TamaguiCustomConfig so your custom types
  // work everywhere you import `tamagui`
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;
