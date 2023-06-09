import UiProvider from "ui/src/Provider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import tamaguiConfig from "../tamagui.config";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootNavigation } from "./RootNavigation";
import { StoreProvider } from "store/src/index";
import { useColorScheme } from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";
import { cookieStorage } from "./utils/cookie-storage.util";

const App = () => {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StoreProvider
          storageAssignments={{
            authSlice: cookieStorage,
            decadeStatsSlice: EncryptedStorage,
          }}
          loadingViewComponent={null}>
          <UiProvider
            config={tamaguiConfig}
            // @ts-ignore
            disableInjectCSS
            defaultTheme={colorScheme}
            disableRootThemeClass>
            <RootNavigation />
          </UiProvider>
        </StoreProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
