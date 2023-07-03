import { Suspense } from "react";
import dynamic from "next/dynamic";
import { AppPropsWithLayout } from "../types/next-js.types";
import { AppSkeleton } from "src/components/skeletons/App.skeleton";
// import { produceSizes } from "src/utils/image.utils";

const LazyNextProvider = dynamic(
  () => import("../components/providers/NextProvider")
);

/**
 * @dev
 * #1 Type inconsistency between `store` package and web. This needs further
 * work to resolve.
 */
function App(appProps: AppPropsWithLayout) {
  // const img = require("_assets/mock/avatars/0.jpg");
  return (
    <>
      {/* <img
        src={img.src}
        srcSet={img.srcSet}
        sizes={produceSizes(img.images, 1920)}
      /> */}
      <Suspense
        fallback={
          <AppSkeleton>
            <div style={{ color: "#F00" }}>Next Provider</div>
          </AppSkeleton>
        }
      >
        <LazyNextProvider {...appProps} />
      </Suspense>
    </>
  );
}

export default App;
