import { AppProps } from "next/app";
import { WebThemeProvider } from "../components/providers/WebTheme.provider";
import { StoreProvider } from "store";
import { wrapper } from "src/store";
import ClientSideRouteGuardProvider from "src/components/providers/ClientSideRouteGuard.provider";

export default function App(appProps: AppProps) {
  const { store, props } = wrapper.useWrappedStore(appProps);

  return (
    // @ts-expect-error
    <StoreProvider store={store} loadingViewComponent={null}>
      <ClientSideRouteGuardProvider>
        <WebThemeProvider {...props} />
      </ClientSideRouteGuardProvider>
    </StoreProvider>
  );
}
