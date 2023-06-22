import { type NextPage } from "next";
import { AppProps } from "next/app";
import { WebThemeProvider } from "../components/providers/WebTheme.provider";
import { type ReactElement, type ReactNode } from "react";
import { StoreProvider } from "store";
import { wrapper } from "src/store";
import ClientSideRouteGuardProvider from "../components/providers/ClientSideRouteGuard.provider";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App(appProps: AppPropsWithLayout) {
  const { store, props } = wrapper.useWrappedStore(appProps);

  return (
    <StoreProvider store={store} loadingViewComponent={null}>
      <ClientSideRouteGuardProvider>
        <WebThemeProvider {...props} />
      </ClientSideRouteGuardProvider>
    </StoreProvider>
  );
}
