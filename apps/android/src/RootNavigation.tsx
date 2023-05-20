import HomeScreen from "app/src/screens/Home.screen";
import UserScreen from "app/src/screens/User.screen";
import DecadeStatsScreen from "app/src/screens/DecadeStats.screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator<{
  home: undefined;
  user: {
    userId: string;
  };
  decadeStats: undefined;
}>();

export function RootNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: "Home",
        }}
      />
      <Stack.Screen
        name="user"
        component={UserScreen}
        options={{
          title: "User",
        }}
      />
      <Stack.Screen
        name="decadeStats"
        component={DecadeStatsScreen}
        options={{
          title: "Decade Stats",
        }}
      />
    </Stack.Navigator>
  );
}
