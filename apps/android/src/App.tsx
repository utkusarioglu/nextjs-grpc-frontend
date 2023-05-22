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
import { StoreProvider } from "store/src/index";

const linking = {
  prefixes: [
    "https://nextjs-grpc.utkusarioglu.com",
    //   // ...add your URLs here
    //   Linking.createURL('/'),
  ],
  config: {
    initialRouteName: "home" as "home",
    screens: {
      home: "",
      user: "user/:userId",
      decadeStats: "decade-stats",
    },
  },
};

const App = () => {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StoreProvider>
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
        </StoreProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
