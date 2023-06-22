import type {
  SessionTypes,
  PairingTypes,
} from "../types/vendors/wallet-connect.types";

export type Web3DriverStateUpdate = {
  metamask: {
    driver: "metamask";
    updates: Partial<Web3DriverMetamaskState>;
  };
  walletConnect: {
    driver: "walletConnect";
    updates: Partial<Web3DriverWalletConnectState>;
  };
};

export type Web3DriverMetamaskState = Web3DriverUpdateBase & {
  type: "metamask";
};

export type Web3DriverWalletConnectState = Web3DriverUpdateBase & {
  type: "walletConnect";
  session: SessionTypes.Struct | null;
  pairings: PairingTypes.Struct[];
  topic: string | null;
};

export type AvailableDrivers = keyof Web3DriverStateUpdate;

export type UpdateWeb3Provider<T extends keyof Web3DriverStateUpdate> = (
  m: Web3DriverStateUpdate[T]
) => void;

export interface Web3ConnectorHookReturn {
  connect: () => void | Promise<void>;
  initialize: () => void | Promise<void>;
  destroy: () => void | Promise<void>;
}

/**
 * This isn't directly used anywhere but has to be exported because of
 * how typescript works
 */
export interface Web3DriverUpdateBase {
  initialization: "uninitialized" | "initializing" | "initialized" | "failed";
  connection: "connected" | "disconnected";
  accounts: string[];
  locked: boolean;
  available: boolean;
}
