import "react-native-get-random-values";
import "@ethersproject/shims";
import UiProvider from "ui/src/Provider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import tamaguiConfig from "../tamagui.config";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootNavigator } from "./navigators/Root.navigator";
import { StoreProvider } from "store";
import { useColorScheme, Text } from "react-native";
import { useMemo } from "react";
import { makeStore } from "./store";
// @ts-expect-error: Lacking type definition by wallet-connect
import { Web3Modal, useWeb3Modal } from "@web3modal/react-native";
import {
  WALLET_CONNECT_PROJECT_ID,
  WALLET_CONNECT_ANDROID_METADATA,
} from "web3";
import { SolitoImageProvider } from "solito/image";

/**
 * @dev
 * #1 Tamagui type definition error
 */
const App = () => {
  const colorScheme = useColorScheme();
  const { isOpen, open, close, provider, isConnected, address } =
    useWeb3Modal();

  const store = useMemo(
    () =>
      makeStore({
        universalProvider: provider,
        web3Modal: { openModal: open, closeModal: close },
      })({}),
    [provider],
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StoreProvider store={store} loadingViewComponent={null}>
          <UiProvider
            config={tamaguiConfig}
            // @ts-ignore: #1
            disableInjectCSS
            defaultTheme={colorScheme}
            disableRootThemeClass>
            <SolitoImageProvider
              // @ts-ignore
              nextJsURL={process.env.NEXT_PUBLIC_WEB_APP_URL!}
              // loader={({ quality, width, src }) => {
              //   return `https://cloudinary.com/${src}?w=${width}&q=${quality}`;
              //             }}
            >
              <RootNavigator />
            </SolitoImageProvider>
          </UiProvider>
        </StoreProvider>
        <Web3Modal
          projectId={WALLET_CONNECT_PROJECT_ID}
          providerMetadata={WALLET_CONNECT_ANDROID_METADATA}
        />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
