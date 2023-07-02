import { lazy, Suspense } from "react";
import { Spacer, YStack, ScrollView, Stack } from "ui";
import { ErrorBoundary } from "react-error-boundary";
import { ScreenFallback } from "../fallbacks/Screen.fallback";
import { ImageListSkeleton } from "../skeletons/PostListCard.skeleton";
import { FeedHeaderSkeleton } from "../skeletons/FeedHeader.skeleton";
import { ErrorThrowingSkeleton } from "../skeletons/ErrorThrowing.skeleton";
import { UserButtonsSkeleton } from "../skeletons/UserButtons.skeleton";
import { HorizontalCardsSkeleton } from "../skeletons/HorizontalCards.skeleton";

const LazyFeedHeaderLayout = lazy(() => import("../layouts/FeedHeader.layout"));
const LazyPostListLayout = lazy(() => import("../layouts/PostList.layout"));
const LazyHorizontalCardsLayout = lazy(
  () => import("../layouts/HorizontalCards.layout")
);
const LazyErrorThrowingLayout = lazy(
  () => import("../layouts/ErrorThrowing.layout")
);
const LazyUserButtonsLayout = lazy(
  () => import("../layouts/UserButtons.layout")
);

const AS_SKELETONS = false;

const perSectionPostCount = AS_SKELETONS ? 2 : 5;
const sectionCount = AS_SKELETONS ? 1 : 3;

const HomeScreen = () => {
  return (
    <ErrorBoundary FallbackComponent={ScreenFallback}>
      <ScrollView>
        <YStack>
          <Spacer />

          <Suspense fallback={<FeedHeaderSkeleton />}>
            <LazyFeedHeaderLayout />
          </Suspense>

          {Array(sectionCount)
            .fill(null)
            .map((_, i) => (
              <Stack key={i}>
                {AS_SKELETONS ? (
                  <HorizontalCardsSkeleton />
                ) : (
                  <Suspense fallback={<HorizontalCardsSkeleton />}>
                    <LazyHorizontalCardsLayout />
                  </Suspense>
                )}
                <Spacer size="$6" />

                {AS_SKELETONS ? (
                  <ImageListSkeleton />
                ) : (
                  <Suspense fallback={<ImageListSkeleton />}>
                    <LazyPostListLayout
                      index={{ start: i, end: i + perSectionPostCount }}
                    />
                  </Suspense>
                )}
                <Spacer />

                {AS_SKELETONS ? null : (
                  <>
                    <Suspense fallback={<UserButtonsSkeleton />}>
                      <LazyUserButtonsLayout />
                    </Suspense>
                    <Spacer />

                    <Suspense fallback={<ErrorThrowingSkeleton />}>
                      <LazyErrorThrowingLayout />
                    </Suspense>
                  </>
                )}

                <Spacer size="$6" />
              </Stack>
            ))}

          <Spacer size="$14" />
        </YStack>
      </ScrollView>
    </ErrorBoundary>
  );
};

export default HomeScreen;
