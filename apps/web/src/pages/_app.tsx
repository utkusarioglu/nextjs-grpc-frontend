import { NextThemeProvider, useRootTheme } from "@tamagui/next-theme";
import { AppProps } from "next/app";
import React, { useMemo } from "react";
import UiProvider from "ui/src/Provider";
import { StoreProvider } from "store/src/index";
import tamaguiConfig from "../tamagui.config";
import ClientSideRouteGuardProvider from "../components/providers/ClientSideRouteGuard.provider";
import localStorage from "redux-persist/lib/storage";
import { cookieStorage } from "src/utils/cookie.utils";

/**
 * @dev
 * #1 memo to avoid re-render on dark/light change
 * #2 because we do our custom getCSS() above, we disableInjectCSS here
 * #3 The component has some typing issues
 * #4 The component has some typing issues
 */
export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useRootTheme();
  const contents = useMemo(() => {
    // #1
    return <Component {...pageProps} />;
  }, [pageProps, Component]);

  return (
    <StoreProvider
      storageAssignments={{
        authSlice: cookieStorage,
        decadeStatsSlice: localStorage,
      }}
      loadingViewComponent={null}
    >
      {/* @ts-ignore #3 */}
      <NextThemeProvider onChangeTheme={setTheme}>
        <UiProvider
          config={tamaguiConfig}
          // @ts-ignore #4
          disableInjectCSS // #2
          disableRootThemeClass
          defaultTheme={theme}
        >
          <ClientSideRouteGuardProvider>
            {contents}
          </ClientSideRouteGuardProvider>
        </UiProvider>
      </NextThemeProvider>
    </StoreProvider>
  );
}
