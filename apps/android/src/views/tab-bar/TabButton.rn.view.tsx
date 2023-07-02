import { FC } from "react";
import { TouchableOpacity } from "react-native";
import { YStack, Spacer, Paragraph } from "ui";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { RAW_STYLES } from "ui/src/components/tab-bar/constants";
import { TabCircle } from "ui/src/components/tab-bar/TabCircle.view";

interface TabButtonRnViewProps {
  label: string;
  isActive: boolean;
  options: BottomTabNavigationOptions;
  onPress: () => void;
  onLongPress: () => void;
  Icon: FC;
}

/**
 * @dev
 * #1 Most parameters used in RN and web components for the tab bar are
 * the same. Params noted with #1 differ in two implementations
 */
export const TabButtonRnView: FC<TabButtonRnViewProps> = ({
  label,
  isActive,
  options,
  onPress,
  onLongPress,
  Icon,
}) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isActive ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={{ flex: 1 }}>
      <YStack
        scale={
          isActive
            ? RAW_STYLES.tabButton.active.scale
            : RAW_STYLES.tabButton.idle.scale
        }
        animation="fast"
        justifyContent="center"
        alignItems="center">
        <TabCircle isActive={isActive} isHovered={false} />
        <YStack
          paddingBottom="$3" // #1
          paddingTop="$3" // #1
          alignItems="center"
          opacity={
            isActive
              ? RAW_STYLES.iconAndLabel.active.opacity
              : RAW_STYLES.iconAndLabel.idle.opacity
          }>
          <Icon />
          <Spacer size="$1" />
          <Paragraph>{label}</Paragraph>
        </YStack>
      </YStack>
    </TouchableOpacity>
  );
};
