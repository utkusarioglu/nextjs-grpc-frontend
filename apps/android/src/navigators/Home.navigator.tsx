import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "app/src/screens/Home.screen";
import UserScreen from "app/src/screens/User.screen";
import DecadeStatsScreen from "app/src/screens/DecadeStats.screen";
import { Icons } from "ui";
import TabBarRn from "../views/tab-bar/TabBar.rn.view";
import { useTranslation } from "i18n";

type HomeNavigatorProps = {
  feed: undefined;
  user: {
    userId: string;
  };
  decadeStats: undefined;
};

const Tab = createBottomTabNavigator<HomeNavigatorProps>();

const HomeNavigator = () => {
  const { t } = useTranslation(["rest"]);

  return (
    <Tab.Navigator tabBar={props => <TabBarRn {...props} />}>
      <Tab.Screen
        name="feed"
        component={HomeScreen}
        options={{
          title: t`rest:TabBar.Feed`,
          headerShown: false,
          tabBarLabel: t`rest:TabBar.Feed`,
          tabBarIcon: () => <Icons.Home />,
        }}
      />
      <Tab.Screen
        name="decadeStats"
        component={DecadeStatsScreen}
        options={{
          title: t`rest:TabBar.DecadeStats`,
          tabBarLabel: t`rest:TabBar.DecadeStats`,
          tabBarIcon: () => <Icons.AlertOctagon />,
        }}
      />
      <Tab.Screen
        name="user"
        component={UserScreen}
        options={{
          title: t`rest:TabBar.User`,
          tabBarLabel: t`rest:TabBar.User`,
          tabBarIcon: () => <Icons.User />,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigator;
