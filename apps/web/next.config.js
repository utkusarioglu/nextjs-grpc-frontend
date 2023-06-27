const { withTamagui } = require("@tamagui/next-plugin");
const yaml = require("js-yaml");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = function (_name, { defaultConfig }) {
  const nextConfig = {
    ...defaultConfig,
    distDir: "dist",
    reactStrictMode: true,
    transpilePackages: ["ui", "store", "app", "i18n"],
    swcMinify: true,
    images: {},
    experimental: {
      instrumentationHook: true,
    },
    webpack: (config, options) => {
      const PUBLIC_PATH = `${process.env.PROJECT_ROOT_ABSPATH}/frontend/apps/web/public/locales`;
      const TRANSLATIONS_PATH = `${process.env.PROJECT_ROOT_ABSPATH}/frontend/packages/i18n/locales`;
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: `${TRANSLATIONS_PATH}/**/*.yml`,
              to({ context, absoluteFilename }) {
                const lang = absoluteFilename
                  .split("/")
                  .slice(-2, -1)
                  .join("/");
                return `${PUBLIC_PATH}/${lang}/[name].json`;
              },
              transform(content) {
                const json = JSON.stringify(
                  yaml.load(content.toString("utf8"))
                );
                return Buffer.from(json, "utf8");
              },
            },
          ],
        })
      );

      return config;
    },
  };

  const tamaguiPlugin = withTamagui({
    config: "./src/tamagui.config.ts",
    components: ["tamagui", "ui"],
    // Experimentally opt into react-native-web-lite which drops support for all react-native
    // built-in List components and removes many deprecated APIs for code-reduction, slimming
    // bundle sizes down nearly 30-50Kb.
    useReactNativeWebLite: true,

    // disable static extraction, faster to iterate in dev mode (default false)
    disableExtraction: process.env.NODE_ENV === "development",
  });

  return {
    ...nextConfig,
    ...tamaguiPlugin(nextConfig),
  };
};
