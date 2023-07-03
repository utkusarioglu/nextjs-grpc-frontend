import { useState, type FC } from "react";
import { Tabs, Paragraph, YStack, Spacer } from "ui";
import type { HandleOnPress } from "./types";
import { RAW_STYLES } from "ui/src/components/tab-bar/constants";
import { TabCircle } from "ui/src/components/tab-bar/TabCircle.view";

interface TabButtonProps {
  label: string;
  path: string;
  index: number;
  activeIndex: number;
  Icon: FC;
  handleOnPress: HandleOnPress;
}

/**
 * @dev
 * #1 Most parameters used in RN and web components for the tab bar are
 * the same. Params noted with #1 differ in two implementations
 */
export const TabButton: FC<TabButtonProps> = ({
  path,
  index,
  activeIndex,
  handleOnPress,
  Icon,
  label,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = index === activeIndex;

  const onInteraction = (type, layout) => {
    switch (type) {
      case "select":
        handleOnPress(path)();
        break;
      case "hover":
        setIsHovered(!!layout);
        break;
      default:
      // console.log(type + " uncaught", layout);
    }
  };

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
        value={index.toString()}
        onInteraction={onInteraction}
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
