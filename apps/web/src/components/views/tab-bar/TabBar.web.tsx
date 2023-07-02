import { type FC } from "react";
import { Tabs, Nav } from "ui";
import { TabButton } from "./TabButton";
import { RAW_STYLES } from "ui/src/components/tab-bar/constants";
import type { Indicators, HandleOnPress, TabDefinition } from "./types";
import { useRouter } from "solito/router";

interface TabBarWebProps {
  items: TabDefinition[];
  indicators: Indicators;
}

/**
 * @dev
 * #1 Most parameters used in RN and web components for the tab bar are
 * the same. Params noted with #1 differ in two implementations
 * #2 This is achieved with `BlurView` component in RN
 */
export const TabBarWeb: FC<TabBarWebProps> = ({ items, indicators }) => {
  const { push } = useRouter();
  const handleOnPress: HandleOnPress = (pathname) => () => {
    push({ pathname });
  };

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
        {items.map(({ path, label, Icon }, index) => {
          return (
            <TabButton
              key={path}
              path={path}
              index={index}
              activeIndex={indicators.active}
              handleOnPress={handleOnPress}
              Icon={Icon}
              label={label}
            />
          );
        })}
      </Tabs.List>
    </Nav>
  );
};
