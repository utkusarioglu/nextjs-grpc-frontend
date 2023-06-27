import type { Store } from "src/store";
import {
  setWebClientDefaults,
  updateDriver,
} from "store";
import {
  web3Service,
  WALLET_CONNECT_PROJECT_ID,
  WALLET_CONNECT_WEB_METADATA,
  MetamaskDriver,
  WalletConnectDriver,
  WALLET_CONNECT_NAMESPACES,
} from "web3";
import UniversalProvider from "@walletconnect/universal-provider";
import { Web3Modal } from "@web3modal/standalone";

export async function afterRehydration(store: Store) {
  if (!!global.window) {
    store.dispatch(setWebClientDefaults());
  }
  web3Rehydration(store);
}

const web3Rehydration = async (store: Store) => {
  if (!global.window) {
    return;
  }
  const web3Modal = new Web3Modal({
    projectId: WALLET_CONNECT_PROJECT_ID,
    walletConnectVersion: 2,
  });

  const universalProvider = await UniversalProvider.init({
    // logger: "debug",
    projectId: WALLET_CONNECT_PROJECT_ID,
    metadata: WALLET_CONNECT_WEB_METADATA,
  });

  web3Service
    .setDispatcher((c) => store.dispatch(updateDriver(c)))
    .setDrivers([
      new MetamaskDriver(),
      new WalletConnectDriver({
        web3Modal,
        universalProvider,
        namespaces: WALLET_CONNECT_NAMESPACES,
      }),
    ])
    .initializeAll();
};
