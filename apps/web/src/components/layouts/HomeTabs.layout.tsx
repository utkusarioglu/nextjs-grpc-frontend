import {
  type ReactElement,
  type FC,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Tabs, YStack, styled, Stack, AnimatePresence, Icons } from "ui";
import { TabBarWeb } from "../views/tab-bar/TabBar.web";
import { ANIMATED_Y_STACK_VARIANTS } from "../views/tab-bar/constants";
import type {
  HandleOnPress,
  Indicators,
  TabDefinition,
} from "../views/tab-bar/types";
import { useRouter as useNextRouter } from "next/router";
import { useTranslation } from "i18n";

interface HomeTabsLayoutProps {
  children: ReactElement;
}

const AnimatedYStack = styled(YStack, {
  variants: ANIMATED_Y_STACK_VARIANTS,
});

/**
 * @dev
 * #2 TODO overflowX had to be given here to prevent scrollbars from showing
 * while enter and exit animations were taking place. There is probably a
 * better solution to this.
 */
const HomeTabsLayout: FC<HomeTabsLayoutProps> = ({ children }) => {
  const { asPath, events } = useNextRouter();
  const { t } = useTranslation();
  const tabItems = getTabItems(t);

  const [indicators, setIndicators] = useState<Indicators>({
    previous: -1,
    active: -1,
    enterVariant: "none",
    exitVariant: "none",
  });

  const onRouteChange = useCallback((url) => {
    const activeIndex = getTabItemIndex(tabItems, url);
    if (activeIndex > -1) {
      setIndicators((state) => {
        if (state.active === activeIndex) {
          return state;
        }

        const newIndices: Pick<Indicators, "previous" | "active"> = {
          previous: state.active,
          active: activeIndex !== -1 ? activeIndex : state.active,
        };

        const enterVariant =
          newIndices.previous === -1 ||
          newIndices.active === newIndices.previous
            ? "none"
            : newIndices.active > newIndices.previous
            ? "rightFade"
            : "leftFade";

        const exitVariant =
          newIndices.previous === -1 ||
          newIndices.active === newIndices.previous
            ? "none"
            : newIndices.active > newIndices.previous
            ? "leftFade"
            : "rightFade";

        const animationVariants: Pick<
          Indicators,
          "enterVariant" | "exitVariant"
        > = {
          enterVariant, // #3
          exitVariant, // #3
        };

        return {
          ...newIndices,
          ...animationVariants,
        };
      });
    } else {
      setIndicators((state) => ({
        ...state,
        enterVariant: "none",
        exitVariant: "none",
      }));
    }
  }, []);

  useEffect(() => {
    onRouteChange(asPath);
  }, []);

  useEffect(() => {
    events.on("routeChangeStart", onRouteChange);
    return () => events.off("routeChangeStart", onRouteChange);
  }, []);

  return (
    <Tabs
      fullscreen
      flexDirection="column"
      // @ts-expect-error: #2
      overflowX="hidden"
      id="tab-mount"
    >
      <AnimatePresence
        initial={false}
        enterVariant={indicators.enterVariant}
        exitVariant={indicators.exitVariant}
      >
        {indicators.active > -1 ? (
          <AnimatedYStack
            className={asPath}
            key={asPath}
            animation="slow"
            x={0}
            opacity={1}
            fullscreen
          >
            <Tabs.Content value={asPath} forceMount fullscreen>
              {children}
            </Tabs.Content>
          </AnimatedYStack>
        ) : null}
      </AnimatePresence>

      <Stack
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        overflow="hidden"
        height={100}
      >
        <Stack
          position="absolute"
          bottom="$2"
          left="$4"
          right="$4"
          enterStyle={{ y: 100 }}
          y={0}
          animation="slow"
        >
          <TabBarWeb items={tabItems} indicators={indicators} />
        </Stack>
      </Stack>
    </Tabs>
  );
};

const getTabItemIndex = (tabItems, pathname: string) => {
  const indexList = tabItems
    .map(({ path }, index) => {
      return {
        path,
        index,
      };
    })
    .filter(({ path }) => path === pathname);

  if (indexList.length !== 1) {
    return -1;
  }
  return indexList[0].index;
};

// TODO: Any needs to be the t function type TFunction from i18n
type GetTabItems = (t: any) => TabDefinition[];

const getTabItems: GetTabItems = (t) => [
  {
    path: "/",
    label: t`rest:TabBar.Feed`,
    Icon: Icons.Home,
  },
  {
    path: "/decade-stats",
    label: t`rest:TabBar.DecadeStats`,
    Icon: Icons.AlertOctagon,
  },
  {
    path: "/user/1",
    label: t`rest:TabBar.User`,
    Icon: Icons.User,
  },
];

export default HomeTabsLayout;
