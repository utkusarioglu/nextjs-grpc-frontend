import { type FC } from "react";
import { Tabs, Nav } from "tamagui";
import { TabButton } from "./TabButton";
import { RAW_STYLES, TAB_ITEMS } from "./constants";
import type { OnInteraction, Indicators } from "./types";

interface TabBarWebProps {
  pathname: string;
  onInteraction: OnInteraction;
  indicators: Indicators;
  t: (tKey: string) => string;
}

/**
 * @dev
 * #1 Most parameters used in RN and web components for the tab bar are
 * the same. Params noted with #1 differ in two implementations
 * #2 This is achieved with `BlurView` component in RN
 */
export const TabBarWeb: FC<TabBarWebProps> = ({
  pathname,
  onInteraction,
  indicators,
  t,
}) => {
  return (
    <Nav
      borderRadius="$radius.12" // #1
      overflow="hidden"
      backgroundColor={RAW_STYLES.overlayColor}
      paddingRight="$4"
      paddingLeft="$4"
      style={{ backdropFilter: "blur(10px)" }} // #2
    >
      <Tabs.List justifyContent="space-evenly" unstyled>
        {TAB_ITEMS.map(({ path, tKey, Icon }, index) => {
          const label = t(tKey);
          return (
            <TabButton
              key={path}
              pathname={pathname}
              path={path}
              index={index}
              indicators={indicators}
              onInteraction={onInteraction}
              Icon={Icon}
              label={label}
            />
          );
        })}
      </Tabs.List>
    </Nav>
  );
};
