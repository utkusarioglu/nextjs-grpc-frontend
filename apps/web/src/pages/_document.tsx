import "ui/src/css-reset";
import NextDocument, { Head, Html, Main, NextScript } from "next/document";
import { Children } from "react";
import { AppRegistry } from "react-native";

import tamaguiConfig from "../tamagui.config";

/**
 * @dev
 * #1 `AppRegistry` lacks types for `getApplication`.
 * #2 There are are better ways of integrating nextjs font system with
 * tamagui. Tamagui docs recently changed to explain these, check it out.
 */
export default class Document extends NextDocument {
  static async getInitialProps({ renderPage }) {
    AppRegistry.registerComponent("Main", () => Main);
    const page = await renderPage();
    // @ts-ignore #1
    const { getStyleElement } = AppRegistry.getApplication("Main");
    const styles = [
      getStyleElement(),
      <style
        key="tamagui"
        dangerouslySetInnerHTML={{ __html: tamaguiConfig.getCSS() }}
      />,
      <style
        key="web"
        dangerouslySetInnerHTML={{
          __html: `
            html, body, #__next { height: 100%; }
          `,
        }}
      />,
    ];
    return { ...page, styles: Children.toArray(styles) };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* TODO #2 */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
