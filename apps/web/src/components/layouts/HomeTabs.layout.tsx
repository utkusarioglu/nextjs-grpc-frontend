import { type ReactElement, type FC, useState } from "react";
import {
  Tabs,
  YStack,
  styled,
  Stack,
  AnimatePresence,
  ANIMATED_Y_STACK_VARIANTS,
  type Indicators,
  TabBarWeb,
  type OnInteraction,
} from "ui";
import { useRouter } from "solito/router";
import { useRouter as useNextRouter } from "next/router";
import { useTranslation } from "i18n";

interface HomeTabsLayoutProps {
  page: ReactElement;
}

const AnimatedYStack = styled(YStack, {
  variants: ANIMATED_Y_STACK_VARIANTS,
});

const INDICATORS_INITIAL: Indicators = {
  previous: {
    index: 0,
  },
  active: {
    index: 0,
  },
  hovered: null,
  enterVariant: "fade",
  exitVariant: "fade",
};

/**
 * @dev
 * #1 TODO `position: fixed` won't work on native. It's only used here to
 * speed up the development process and should be replaced with a universal
 * solution asap.
 * #2 TODO overflowX had to be given here to prevent scrollbars from showing
 * while enter and exit animations were taking place. There is probably a
 * better solution to this.
 * #3 TODO This logic falls apart during initial render. Because initial state
 * is empty. This logic needs to account for the first render properly
 */
const HomeTabsLayout: FC<HomeTabsLayoutProps> = ({ page }) => {
  const { push } = useRouter();
  const { pathname } = useNextRouter();
  const [indicators, setIndicators] = useState<Indicators>(INDICATORS_INITIAL);
  const { t } = useTranslation();

  const handleOnInteraction: OnInteraction =
    (path, index) => (type, layout) => {
      if (type === "select") {
        setIndicators((state) => ({
          ...state,
          previous: state.active,
          active: {
            index,
          },
          enterVariant: index > state.active.index ? "rightFade" : "leftFade", // #3
          exitVariant: index > state.active.index ? "leftFade" : "rightFade", // #3
        }));
        push({ pathname: path });
      } else {
        setIndicators((state) => ({
          ...state,
          hovered: !!layout
            ? {
                index,
              }
            : null,
        }));
      }
    };

  return (
    <Tabs
      defaultValue={pathname}
      fullscreen
      flexDirection="column"
      // @ts-expect-error: #2
      overflowX="hidden"
    >
      <AnimatePresence
        enterVariant={indicators.enterVariant}
        exitVariant={indicators.exitVariant}
      >
        <AnimatedYStack
          key={pathname}
          animation="slow"
          x={0}
          opacity={1}
          fullscreen
        >
          <Tabs.Content value={pathname} forceMount fullscreen>
            {page}
          </Tabs.Content>
        </AnimatedYStack>
      </AnimatePresence>

      <Stack position="absolute" bottom="$2" left="$4" right="$4">
        <TabBarWeb
          pathname={pathname}
          onInteraction={handleOnInteraction}
          indicators={indicators}
          t={t}
        />
      </Stack>
    </Tabs>
  );
};

export default HomeTabsLayout;
