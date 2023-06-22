export type { Web3ConnectionOptionsProps } from "./types/web3-connection-options.types";
export type {
  UpdateWeb3Provider,
  Web3DriverStateUpdate,
  Web3DriverMetamaskState,
  Web3DriverWalletConnectState,
  AvailableDrivers,
  Web3DriverUpdateBase,
} from "./types/web3-channel.service.types";

export { MetamaskDriver } from "./drivers/metamask/metamask.driver";
export { WalletConnectDriver } from "./drivers/wallet-connect/wallet-connect.driver";
export { web3Service } from "./services/web3/web3.service";
export {
  WALLET_CONNECT_PROJECT_ID,
  WALLET_CONNECT_ANDROID_METADATA,
  WALLET_CONNECT_NAMESPACES,
  WALLET_CONNECT_WEB_METADATA,
} from "./constants";

export { useWeb3Driver } from "./hooks/web3-driver.hooks";
