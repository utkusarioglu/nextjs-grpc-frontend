import { ethers } from "ethers";
import type { UpdateWeb3Provider } from "../../types/web3-channel.service.types";
import { evmService } from "../../services/evm/evm.service";
import type { Web3Driver } from "../../types/web3-driver.types";
import { Dispatcher } from "../../types/vendors/store.types";

type UpdateWeb3ProviderMetamask = UpdateWeb3Provider<"metamask">;

type WalletConnectDispatch = (
  updates: Parameters<UpdateWeb3ProviderMetamask>[0]["updates"]
) => void;

export class MetamaskDriver implements Web3Driver {
  public readonly key = "metamask";
  private dispatch!: WalletConnectDispatch;

  public setDispatcher(dispatcher: Dispatcher): this {
    this.dispatch = (updates) => dispatcher({ driver: this.key, updates });
    return this;
  }

  public initialize() {
    if (!global.window) {
      return;
    }
    const ethereum = global.window.ethereum;
    if (!ethereum) {
      return;
    }
    if (!this.dispatch) {
      throw new Error("DISPATCHER_NOT_SET");
    }
    this.dispatch({ available: true });

    const metamaskProvider = new ethers.providers.Web3Provider(ethereum);
    evmService.setProvider(this.key, metamaskProvider);

    console.log("will set event listeners", !!global.window);
    ethereum.on("accountsChanged", (accounts: string[]) => {
      console.log("Accounts changed!", { accounts });
      this.dispatch({
        initialization: "initialized",
        connection: !!accounts.length ? "connected" : "disconnected",
        accounts,
        locked: false,
      });
    });

    ethereum.on("chainChanged", (networkId: string) => {
      console.log("chainChanged", networkId);
    });
    const accounts = ethereum._state.accounts;
    const locked = !ethereum._state.isUnlocked;

    this.dispatch({
      initialization: "initialized",
      connection: !!accounts.length ? "connected" : "disconnected",
      accounts,
      locked,
    });
  }

  public async destroy() {
    window.ethereum.off("accountsChanged");
    console.log("unregistered metamask events");
  }

  public async connect() {
    try {
      const provider = evmService.getProvider("metamask");
      const accounts = await provider.send("eth_requestAccounts", []);
      this.dispatch({
        initialization: "initialized",
        connection: !!accounts.length ? "connected" : "disconnected",
        accounts,
        locked: false,
      });
    } catch (err) {
      console.log({ err });
      this.dispatch({
        initialization: "failed",
        connection: "disconnected",
        accounts: [],
        locked: false,
      });
    }
  }

  public getProvider() {
    return evmService.getProvider(this.key);
  }
}
