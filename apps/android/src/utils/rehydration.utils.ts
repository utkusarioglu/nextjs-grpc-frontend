// @ts-expect-error: Lacking type definition by wallet-connect
import type { UniversalProvider, Web3Modal } from "@web3modal/react-native";
import type { Store } from "../store";
import { updateDriver } from "store";
import {
  web3Service,
  WalletConnectDriver,
  WALLET_CONNECT_NAMESPACES,
} from "web3";

export function afterRehydrationFactory(
  provider: UniversalProvider,
  web3Modal: Web3Modal,
) {
  return function afterRehydration(store: Store) {
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
}
