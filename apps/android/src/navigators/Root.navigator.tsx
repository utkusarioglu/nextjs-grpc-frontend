import HomeNavigator from "./Home.navigator";
import LogoutScreen from "app/src/screens/Logout.screen";
import SettingsScreen from "app/src/screens/Settings.screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  selectIsAppInitialized,
  selectIsAuthChecksComplete,
  selectIsLoggedIn,
  useSelector,
} from "store";
import { useColorScheme } from "react-native";
import {
  DarkTheme as ReactNavigationDarkTheme,
  DefaultTheme as ReactNavigationDefaultTheme,
} from "@react-navigation/native";
import { GuestNavigator } from "./Guest.navigator";

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
      loading: "loading",
      guest: "guest",
    },
  },
};

type RootNavigatorProps = {
  home: undefined;
  loading: undefined;
  login: undefined;
  logout: undefined;
  welcome: undefined;
  evm: undefined;
  settings: undefined;
  guest: undefined;
};

const Stack = createNativeStackNavigator<RootNavigatorProps>();

export function RootNavigator() {
  const colorScheme = useColorScheme();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isAuthChecksComplete = useSelector(selectIsAuthChecksComplete);
  const isAppInitialized = useSelector(selectIsAppInitialized);

  const isAuthorized = isLoggedIn && isAuthChecksComplete;

  return (
    <NavigationContainer
      linking={linking}
      theme={
        colorScheme === "dark"
          ? {
              dark: true,
              colors: {
                primary: "rgb(10, 132, 255)",
                background: "rgb(20, 20, 20)",
                card: "rgb(18, 18, 18)",
                text: "rgb(229, 229, 231)",
                border: "rgb(39, 39, 41)",
                notification: "rgb(255, 69, 58)",
              },
            }
          : ReactNavigationDefaultTheme
      }>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}>
        {isAuthorized && isAppInitialized ? (
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
            <Stack.Screen
              name="logout"
              component={LogoutScreen}
              options={{
                title: "Logout",
              }}
            />
          </>
        ) : (
          <Stack.Screen
            name="guest"
            component={GuestNavigator}
            options={
              {
                // title: "Guest",
                // animation: "fade",
              }
            }
          />
          // <GuestNavigator />
          // <>
          //   {!isAllReady ? (
          //     <Stack.Screen
          //       name="loading"
          //       component={LoadingScreen}
          //       options={{
          //         title: "Loading",
          //         animation: "fade",
          //       }}
          //     />
          //   ) : null}
          //   <Stack.Screen
          //     name="welcome"
          //     component={WelcomeScreen}
          //     options={{
          //       title: "Welcome",
          //       animation: "fade",
          //     }}
          //   />
          //   <Stack.Screen
          //     name="login"
          //     component={LoginScreen}
          //     options={{
          //       title: "Login",
          //     }}
          //   />
          //   <Stack.Screen
          //     name="evm"
          //     component={EvmScreen}
          //     options={{
          //       title: "Login with EVM identity",
          //     }}
          //   />
          // </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
