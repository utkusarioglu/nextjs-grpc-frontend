import { ScrollView } from "ui";
import { ErrorBoundary } from "react-error-boundary";
import { ScreenFallback } from "../fallbacks/Screen.fallback";
import { lazy, Suspense } from "react";

const LazyDecadeStatsScreenLayout = lazy(
  () => import("../layouts/DecadeStatsScreen.layout")
);

const DecadeStatsScreen = () => {
  return (
    <ErrorBoundary FallbackComponent={ScreenFallback}>
      <ScrollView>
        <Suspense>
          <LazyDecadeStatsScreenLayout />
        </Suspense>
      </ScrollView>
    </ErrorBoundary>
  );
};

export default DecadeStatsScreen;
