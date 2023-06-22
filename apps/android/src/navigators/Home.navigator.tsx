import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "app/src/screens/Home.screen";
import UserScreen from "app/src/screens/User.screen";
import DecadeStatsScreen from "app/src/screens/DecadeStats.screen";
import { Paragraph, Icons, H3 } from "ui";

type HomeNavigatorProps = {
  feed: undefined;
  user: {
    userId: string;
  };
  decadeStats: undefined;
};

const Tab = createBottomTabNavigator<HomeNavigatorProps>();

const HomeNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="feed"
        component={HomeScreen}
        options={{
          tabBarLabel: "Feed",
          // tabBarIcon: () => <Icons.Activity size="$4" />,
          tabBarIcon: () => <H3>F</H3>,
        }}
      />
      <Tab.Screen
        name="user"
        component={UserScreen}
        options={{
          tabBarLabel: "User",
          tabBarIcon: () => <H3>U</H3>,
        }}
      />
      <Tab.Screen
        name="decadeStats"
        component={DecadeStatsScreen}
        options={{
          tabBarLabel: "Decade Stats",
          tabBarIcon: () => <H3>D</H3>,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigator;
