process.env.TAMAGUI_TARGET = "native";

module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    // "@babel/plugin-proposal-class-properties",
    // "@babel/plugin-proposal-private-methods",
    [
      "@tamagui/babel-plugin",
      {
        components: ["tamagui"],
        config: "./tamagui.config.ts",
        importsWhitelist: ["constants.js", "colors.js"],
        logTimings: true,
        disableExtraction: process.env.NODE_ENV === "development",
      },
    ],
    [
      "module:react-native-dotenv",
      {
        envName: "APP_ENV",
        moduleName: "@env",
        path: ".env.local",
      },
    ],
    [
      "transform-inline-environment-variables",
      {
        include: "TAMAGUI_TARGET",
      },
    ],
  ],
};
