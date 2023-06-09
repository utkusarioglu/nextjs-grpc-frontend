import HomeScreen from "app/src/screens/Home.screen";
import UserScreen from "app/src/screens/User.screen";
import DecadeStatsScreen from "app/src/screens/DecadeStats.screen";
import LoginScreen from "app/src/screens/Login.screen";
import LogoutScreen from "app/src/screens/Logout.screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { selectLoggedIn, useSelector } from "store/src";
import { useColorScheme } from "react-native";
import {
  DarkTheme as ReactNavigationDarkTheme,
  DefaultTheme as ReactNavigationDefaultTheme,
} from "@react-navigation/native";

const linking = {
  prefixes: [process.env.NEXT_PUBLIC_WEB_APP_URL!],
  config: {
    screens: {
      home: "",
      user: "user/:userId",
      decadeStats: "decade-stats",
      login: "login",
      logout: "logout",
    },
  },
};

const Stack = createNativeStackNavigator<{
  home: undefined;
  user: {
    userId: string;
  };
  decadeStats: undefined;
  login: undefined;
  logout: undefined;
}>();

export function RootNavigation() {
  const colorScheme = useColorScheme();
  const loggedIn = useSelector(selectLoggedIn);

  return (
    <NavigationContainer
      linking={linking}
      theme={
        colorScheme === "dark"
          ? ReactNavigationDarkTheme
          : ReactNavigationDefaultTheme
      }>
      <Stack.Navigator>
        {loggedIn ? (
          <>
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
            <Stack.Screen
              name="logout"
              component={LogoutScreen}
              options={{
                title: "Logout",
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="login"
              component={LoginScreen}
              options={{
                title: "Login",
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
