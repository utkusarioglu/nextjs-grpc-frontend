import { Stack, Spacer } from "ui";
import { lazy, Suspense } from "react";
import { DecadeStatsCardListLayoutSkeleton } from "../layouts/DecadeStatsCardList.layout";
import { ScreenHeaderLayout } from "../layouts/ScreenHeader.layout";
import { DecadeStatsScreenControlsSkeleton } from "../skeletons/DecadeStatsScreenControls.skeleton";

const LazyDecadeStatsCardListLayout = lazy(
  () => import("../layouts/DecadeStatsCardList.layout")
);

const LazyDecadeStatsScreenControlsLayout = lazy(
  () => import("../layouts/DecadeStatsScreenControls.layout")
);

const DecadeStatsScreenLayout = () => {
  return (
    <>
      <ScreenHeaderLayout title="Decade Stats" />
      <Spacer />

      <Suspense fallback={<DecadeStatsScreenControlsSkeleton />}>
        <LazyDecadeStatsScreenControlsLayout />
      </Suspense>
      <Spacer />
      <Suspense fallback={<DecadeStatsCardListLayoutSkeleton />}>
        <LazyDecadeStatsCardListLayout />
      </Suspense>
      <Spacer size="$12" />
    </>
  );
};

export default DecadeStatsScreenLayout;
