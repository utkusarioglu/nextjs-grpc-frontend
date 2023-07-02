import { type FC, useMemo, Suspense } from "react";
import { createWebConfig } from "i18n";
import { appWithI18Next } from "ni18n";
import LanguageDetector from "i18next-browser-languagedetector";
import ClientSideRouteGuardProvider from "../providers/ClientSideRouteGuard.provider";
import { AppPropsWithLayout } from "../../types/next-js.types";
import { WebThemeProvider } from "../providers/WebTheme.provider";
import { StoreProvider } from "store";
import { wrapper } from "src/store";
import { AnimatePresence, styled, YStack } from "ui";
import { AppSkeleton } from "../skeletons/App.skeleton";

type NextProviderProps = AppPropsWithLayout;

export const ANIMATED_PAGE_VARIANTS = {
  downFade: {
    true: {
      y: 50,
      opacity: 0,
    },
  },
} as const;

export const AnimatedPage = styled(YStack, {
  variants: ANIMATED_PAGE_VARIANTS,
});

function NextProvider(statelessAppProps: NextProviderProps) {
  const { store, props } = wrapper.useWrappedStore(statelessAppProps);
  const { Component } = statelessAppProps;

  const contents = useMemo(() => {
    const Page = () => (
      <Suspense
        fallback={
          <AppSkeleton>
            <div style={{ color: "#FF0" }}>Screen</div>
          </AppSkeleton>
        }
      >
        <Component {...props.pageProps} />
      </Suspense>
    );

    if (!Component.getLayout) {
      return <Page />;
    }

    const Layout = Component.getLayout;

    return (
      <Layout>
        <Page />
      </Layout>
    );
  }, [props.pageProps, Component]);

  const animationKey = Component.getLayout
    ? Component.getLayout.name
    : props.router.pathname;

  return (
    <StoreProvider
      // @ts-expect-error #1
      store={store}
      loadingViewComponent={
        <AppSkeleton>
          <div style={{ color: "#0F0" }}>Store</div>
        </AppSkeleton>
      }
    >
      <ClientSideRouteGuardProvider>
        <WebThemeProvider>
          <YStack overflow="hidden" fullscreen>
            <AnimatePresence
              initial={false}
              exitBeforeEnter
              enterVariant="downFade"
              exitVariant="downFade"
            >
              <AnimatedPage
                animation="fast"
                opacity={1}
                y={0}
                fullscreen
                key={animationKey}
              >
                {contents}
              </AnimatedPage>
            </AnimatePresence>
          </YStack>
        </WebThemeProvider>
      </ClientSideRouteGuardProvider>
    </StoreProvider>
  );
}

export default appWithI18Next(
  NextProvider,
  createWebConfig({
    use: [LanguageDetector],
  })
) as FC<AppPropsWithLayout>;
