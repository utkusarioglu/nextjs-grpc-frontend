process.env.TAMAGUI_TARGET = "native";

module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    "@babel/plugin-proposal-export-namespace-from",
    [
      "module-resolver",
      {
        root: ["."],
        alias: {
          "solito/image": "solito/image/react-native-fast-image",
        },
      },
    ],
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
        include: [
          "TAMAGUI_TARGET",
          "NEXT_PUBLIC_WEB_APP_URL",
          "NEXT_PUBLIC_API_V1_URL",
          "I18N_DEBUG_ENABLED",
        ],
      },
    ],
  ],
};
