import { type FC } from "react";
import { Tabs, Paragraph, YStack, Spacer } from "tamagui";
import { TabCircle } from "./TabCircle";
import type { Indicators, OnInteraction } from "./types";
import { RAW_STYLES } from "./constants";

interface TabButtonProps {
  label: string;
  pathname: string;
  path: string;
  index: number;
  Icon: FC;
  indicators: Indicators;
  onInteraction: OnInteraction;
}

/**
 * @dev
 * #1 Most parameters used in RN and web components for the tab bar are
 * the same. Params noted with #1 differ in two implementations
 */
export const TabButton: FC<TabButtonProps> = ({
  pathname,
  path,
  index,
  indicators,
  onInteraction,
  Icon,
  label,
}) => {
  const isActive = pathname === path;
  const isHovered = indicators.hovered?.index === index;

  return (
    <YStack
      scale={
        isActive
          ? RAW_STYLES.tabButton.active.scale
          : RAW_STYLES.tabButton.idle.scale
      }
      animation="fast"
      justifyContent="center"
      alignItems="center"
    >
      <TabCircle isActive={isActive} isHovered={isHovered} />
      <Tabs.Tab
        value={path}
        onInteraction={onInteraction(path, index)}
        paddingBottom="$7" // #1
        paddingTop="$7" // #1
        unstyled
      >
        <YStack
          alignItems="center"
          opacity={
            isActive
              ? RAW_STYLES.iconAndLabel.active.opacity
              : RAW_STYLES.iconAndLabel.idle.opacity
          }
        >
          <Icon />
          <Spacer size="$1" />
          <Paragraph>{label}</Paragraph>
        </YStack>
      </Tabs.Tab>
    </YStack>
  );
};
