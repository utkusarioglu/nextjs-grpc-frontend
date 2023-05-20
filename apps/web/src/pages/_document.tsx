import "ui/src/css-reset";
import NextDocument, { Head, Html, Main, NextScript } from "next/document";
import { Children } from "react";
import { AppRegistry } from "react-native";

import tamaguiConfig from "../tamagui.config";

export default class Document extends NextDocument {
  static async getInitialProps({ renderPage }) {
    AppRegistry.registerComponent("Main", () => Main);
    const page = await renderPage();
    // @ts-ignore
    const { getStyleElement } = AppRegistry.getApplication("Main");
    const styles = [
      getStyleElement(),
      <style
        key="tamagui"
        dangerouslySetInnerHTML={{ __html: tamaguiConfig.getCSS() }}
      />,
    ];
    return { ...page, styles: Children.toArray(styles) };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
