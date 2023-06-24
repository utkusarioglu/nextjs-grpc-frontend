import { createAnimations } from "@tamagui/animations-react-native";
import { createTamagui, baseConfig } from "ui/src/tamagui.config";

/**
 * @dev
 * #1 string - string literal inconsistency
 */
const appConfig = createTamagui({
  ...baseConfig,
  // fonts: Object.entries(baseConfig.fonts).reduce((acc, [key, value]) => {
  //   // @ts-ignore: #1
  //   acc[key] = createFont(value);
  //   return acc;
  // }, {} as Record<keyof typeof baseConfig.fonts, ReturnType<typeof createFont>>),
  // @ts-ignore
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

// @ts-ignore
export type AppConfig = typeof appConfig;

declare module "@tamagui/core" {
  // overrides TamaguiCustomConfig so your custom types
  // work everywhere you import `tamagui`
  // @ts-ignore
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;
