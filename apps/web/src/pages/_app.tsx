import { NextThemeProvider, useRootTheme } from "@tamagui/next-theme";
import { AppProps } from "next/app";
// import Head from "next/head";
import React, { useMemo } from "react";
import UiProvider from "ui/src/Provider";

import tamaguiConfig from "../tamagui.config";

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useRootTheme();

  // memo to avoid re-render on dark/light change
  const contents = useMemo(() => {
    return <Component {...pageProps} />;
  }, [pageProps, Component]);

  // because we do our custom getCSS() above, we disableInjectCSS here
  return (
    <>
      {/* @ts-ignore */}
      <NextThemeProvider onChangeTheme={setTheme}>
        <UiProvider
          config={tamaguiConfig}
          // @ts-ignore
          disableInjectCSS
          disableRootThemeClass
          defaultTheme={theme}
        >
          {contents}
        </UiProvider>
      </NextThemeProvider>
    </>
  );
}
