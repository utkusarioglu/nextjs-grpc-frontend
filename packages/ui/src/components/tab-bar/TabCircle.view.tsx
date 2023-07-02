import { type FC } from "react";
import { Circle, isTouchable } from "tamagui";
import { RAW_STYLES } from "ui/src/components/tab-bar/constants";

interface TabCircleProps {
  isActive: boolean;
  isHovered: boolean;
}

export const TabCircle: FC<TabCircleProps> = ({ isActive, isHovered }) => (
  <Circle
    position="absolute"
    zIndex={-1}
    animation="fast"
    backgroundColor="$color1"
    size="$6"
    {...(isActive
      ? isHovered && !isTouchable
        ? RAW_STYLES.isActiveAndHovered
        : RAW_STYLES.isActive
      : isHovered && !isTouchable
      ? RAW_STYLES.idleAndHovered
      : RAW_STYLES.idle)}
  />
);
