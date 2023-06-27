// @ts-expect-error: Lacking type definition by wallet-connect
import type { UniversalProvider, Web3Modal } from "@web3modal/react-native";
import type { Store } from "../store";
import { setIsI18nInitialized, updateDriver, setAndroidDefaults } from "store";
import {
  web3Service,
  WalletConnectDriver,
  WALLET_CONNECT_NAMESPACES,
} from "web3";
import { i18n } from "i18n";

export function afterRehydrationFactory(
  provider: UniversalProvider,
  web3Modal: Web3Modal,
) {
  return function afterRehydration(store: Store) {
    store.dispatch(setAndroidDefaults());

    web3Rehydration(store, provider, web3Modal);

    i18n.then(() => {
      console.log("i18n init dispatch");
      store.dispatch(setIsI18nInitialized(true));
    });
  };
}

const web3Rehydration = (
  store: Store,
  provider: UniversalProvider,
  web3Modal: Web3Modal,
) => {
  if (!provider) {
    console.log("afterRehydration: Provider not yet available, returning");
    return;
  }
  web3Service
    .setDispatcher(c => store.dispatch(updateDriver(c)))
    .setDrivers([
      new WalletConnectDriver({
        web3Modal,
        universalProvider: provider,
        namespaces: WALLET_CONNECT_NAMESPACES,
      }),
    ])
    .initializeAll();
};
