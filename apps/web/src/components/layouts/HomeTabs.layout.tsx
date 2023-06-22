import { type ReactElement, type FC } from "react";
import {
  XStack,
  Button,
  Tabs,
  Paragraph,
  YStack,
  Icons,
  styled,
  AnimatePresence,
} from "ui";
import { useRouter } from "solito/router";
import { useRouter as useNextRouter } from "next/router";

interface HomeTabsLayoutProps {
  page: ReactElement;
}

const TAB_ITEMS = [
  { path: "/", title: "Feed", Icon: Icons.Home },
  {
    path: "/decade-stats",
    title: "Decade Stats",
    Icon: Icons.AlertOctagon,
  },
  { path: "/user/1", title: "User 1", Icon: Icons.User },
];

const AnimatedYStack = styled(YStack, {
  variants: {
    isLeft: { true: { x: -25, opacity: 0 } },
    isRight: { true: { x: 25, opacity: 0 } },
    defaultFade: { true: { opacity: 0 } },
  } as const,
});

/**
 * @dev
 * #1 TODO `position: fixed` won't work on native. It's only used here to
 * speed up the development process and should be replaced with a universal
 * solution asap.
 */
const HomeTabsLayout: FC<HomeTabsLayoutProps> = ({ page }) => {
  const { push } = useRouter();
  const { pathname } = useNextRouter();

  const enterVariant = "isLeft";
  const exitVariant = "isRight";
  return (
    <Tabs
      defaultValue={pathname}
      fullscreen
      flexDirection="column"
      overflow="hidden"
    >
      <AnimatePresence
        exitBeforeEnter
        enterVariant={enterVariant}
        exitVariant={exitVariant}
      >
        <AnimatedYStack
          key={pathname}
          animation="fast"
          x={0}
          opacity={1}
          flex={1}
        >
          <Tabs.Content value={pathname} forceMount>
            {page}
          </Tabs.Content>
        </AnimatedYStack>
      </AnimatePresence>
      <Tabs.List
        // @ts-expect-error
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        space="$2"
        justifyContent="space-evenly"
      >
        {TAB_ITEMS.map(({ path, title, Icon }) => (
          <Tabs.Tab
            key={path}
            value={path}
            onInteraction={() => push({ pathname: path })}
          >
            <YStack padding="$2" alignItems="center">
              <Icon />
              <Paragraph>{title}</Paragraph>
            </YStack>
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
};

export default HomeTabsLayout;
