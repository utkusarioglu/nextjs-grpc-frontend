import { ethers } from "ethers";
import type {
  AvailableDrivers,
  // UpdateWeb3Provider,
  // Web3DriverStateUpdate,
} from "./web3-channel.service.types";
import type { Dispatcher } from "./vendors/store.types";

export interface Web3Driver {
  readonly key: AvailableDrivers;

  setDispatcher(dispatcher: Dispatcher): this;
  initialize(): void | Promise<void>;
  connect(): void | Promise<void>;
  destroy(): void | Promise<void>;
  getProvider(): ethers.providers.Web3Provider;
}

// type Web3DriverConstructor = new <DriverSpecificParams extends any[]>(
//   ...p: DriverSpecificParams
// ) => Web3Driver;

export type Web3DriversList = Web3Driver[];
export type Web3DriversMap = Map<string, Web3Driver>;
