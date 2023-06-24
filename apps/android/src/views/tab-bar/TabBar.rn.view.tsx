import { StyleSheet } from "react-native";
import { Nav, Stack, RAW_STYLES } from "ui";
import { BlurView } from "@react-native-community/blur";
import {
  BottomTabNavigationOptions,
  type BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import { TabButtonRnView } from "./TabButton.rn.view";
import { ICONS } from "./constants";

function computeLabel(
  options: BottomTabNavigationOptions,
  route: { name: string },
): string {
  return options.title !== undefined ? options.title : route.name;
}

/**
 * @dev
 * #1 Most parameters used in RN and web components for the tab bar are
 * the same. Params noted with #1 differ in two implementations
 * #2 This is achieved with style = `backdropFilter` in web.
 */
function TabBarRn({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <Stack position="absolute" bottom="$2" left="$4" right="$4">
      <Nav
        borderRadius={200} // #1
        style={{ flexDirection: "row" }}
        space="$2"
        justifyContent="space-evenly"
        overflow="hidden">
        <BlurView // #2
          style={styles.blur}
          blurType="dark"
          blurAmount={5}
          overlayColor={RAW_STYLES.overlayColor}
        />

        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = computeLabel(options, route);
          const isActive = state.index === index;
          const Icon = ICONS[route.name as keyof typeof ICONS];

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isActive && !event.defaultPrevented) {
              navigation.navigate({
                name: route.name,
                merge: true,
                params: [],
              });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TabButtonRnView
              key={label}
              label={label}
              isActive={isActive}
              options={options}
              onPress={onPress}
              onLongPress={onLongPress}
              Icon={Icon}
            />
          );
        })}
      </Nav>
    </Stack>
  );
}

const styles = StyleSheet.create({
  blur: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default TabBarRn;
