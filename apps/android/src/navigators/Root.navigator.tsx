import HomeNavigator from "./Home.navigator";
import LoginScreen from "app/src/screens/Login.screen";
import LogoutScreen from "app/src/screens/Logout.screen";
import WelcomeScreen from "app/src/screens/Welcome.screen";
import SettingsScreen from "app/src/screens/Settings.screen";
import EvmScreen from "app/src/screens/Evm.screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { selectLoggedIn, useSelector } from "store";
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
      welcome: "welcome",
      evm: "evm",
      settings: "settings",
    },
  },
};

type RootNavigatorProps = {
  home: undefined;
  login: undefined;
  logout: undefined;
  welcome: undefined;
  evm: undefined;
  settings: undefined;
};

const Stack = createNativeStackNavigator<RootNavigatorProps>();

export function RootNavigator() {
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
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}>
        {loggedIn ? (
          <>
            <Stack.Screen
              name="home"
              component={HomeNavigator}
              options={{
                title: "Home",
              }}
            />
            <Stack.Screen
              name="settings"
              component={SettingsScreen}
              options={{
                title: "Settings",
              }}
            />
            {/* <Stack.Screen
              name="decadeStats"
              component={DecadeStatsScreen}
              options={{
                title: "Decade Stats",
              }}
            /> */}
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
              name="welcome"
              component={WelcomeScreen}
              options={{
                title: "Welcome",
              }}
            />
            <Stack.Screen
              name="login"
              component={LoginScreen}
              options={{
                title: "Login",
              }}
            />
            <Stack.Screen
              name="evm"
              component={EvmScreen}
              options={{
                title: "Login with EVM identity",
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
