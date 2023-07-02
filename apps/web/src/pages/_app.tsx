import { Suspense } from "react";
import dynamic from "next/dynamic";
import { AppPropsWithLayout } from "../types/next-js.types";
import { AppSkeleton } from "src/components/skeletons/App.skeleton";

const LazyNextProvider = dynamic(
  () => import("../components/providers/NextProvider")
);

/**
 * @dev
 * #1 Type inconsistency between `store` package and web. This needs further
 * work to resolve.
 */
function App(appProps: AppPropsWithLayout) {
  return (
    <Suspense
      fallback={
        <AppSkeleton>
          <div style={{ color: "#F00" }}>Next Provider</div>
        </AppSkeleton>
      }
    >
      <LazyNextProvider {...appProps} />
    </Suspense>
  );
}

export default App;
