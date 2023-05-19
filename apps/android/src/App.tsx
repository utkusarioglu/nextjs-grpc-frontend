import UiProvider from "ui/src/Provider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import tamaguiConfig from "../tamagui.config";
import { useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  DarkTheme as ReactNavigationDarkTheme,
  DefaultTheme as ReactNavigationDefaultTheme,
} from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootNavigation } from "./RootNavigation";

const linking = {
  prefixes: [
    "http://localhost:3000",
    //   // ...add your URLs here
    //   Linking.createURL('/'),
  ],
  config: {
    initialRouteName: "home" as "home",
    screens: {
      home: "",
      user: "user/:userId",
    },
  },
};

const App = () => {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <UiProvider
          config={tamaguiConfig}
          // @ts-ignore
          disableInjectCSS
          defaultTheme={colorScheme}
          disableRootThemeClass>
          <NavigationContainer
            linking={linking}
            theme={
              colorScheme === "dark"
                ? ReactNavigationDarkTheme
                : ReactNavigationDefaultTheme
            }>
            <RootNavigation />
          </NavigationContainer>
        </UiProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
