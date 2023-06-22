import { ethers } from "ethers";
import type { Web3Driver } from "../../types/web3-driver.types";
import type UniversalProvider from "@walletconnect/universal-provider";
import type {
  SessionTypes,
  Web3ModalIsh,
} from "../../types/vendors/wallet-connect.types";
import type { UpdateWeb3Provider } from "../../types/web3-channel.service.types";
import { evmService } from "../../services/evm/evm.service";
import { Dispatcher } from "../../types/vendors/store.types";

type UpdateWeb3ProviderWalletConnect = UpdateWeb3Provider<"walletConnect">;

type WalletConnectDispatch = (
  updates: Parameters<UpdateWeb3ProviderWalletConnect>[0]["updates"]
) => void;

export class WalletConnectDriver implements Web3Driver {
  public readonly key = "walletConnect";
  private dispatch!: WalletConnectDispatch;

  private universalProvider!: UniversalProvider;
  private web3Modal!: Web3ModalIsh;
  private namespaces: any; // TODO

  constructor({
    web3Modal,
    universalProvider,
    namespaces,
  }: {
    web3Modal: Web3ModalIsh;
    universalProvider: UniversalProvider;
    namespaces: any;
  }) {
    this.web3Modal = web3Modal;
    this.universalProvider = universalProvider;
    this.namespaces = namespaces;
  }

  public setDispatcher(dispatcher: Dispatcher): this {
    this.dispatch = (updates) => dispatcher({ driver: this.key, updates });
    return this;
  }

  public getProvider(): ethers.providers.Web3Provider {
    return evmService.getProvider(this.key);
  }

  public async initialize(): Promise<void> {
    try {
      if (!global.window) {
        console.log("wallet_connect_server_side");
        return;
      }
      this.dispatch({ initialization: "initializing", available: true });
      const pairings = this.universalProvider.client.pairing.getAll({
        active: true,
      });
      const session = this.universalProvider.session;
      const web3Provider = new ethers.providers.Web3Provider(
        this.universalProvider
      );
      evmService.setProvider(this.key, web3Provider);
      this.subscribe();
      this.dispatch({
        initialization: "initialized",
        pairings,
        session,
        connection: !!pairings.length ? "connected" : "disconnected",
      });
    } catch (err) {
      console.log("WalletConnect.init", { err });

      this.dispatch({
        initialization: "failed",
        connection: "disconnected",
        accounts: [],
        session: null,
        pairings: [],
      });
    }
  }

  public async connect(): Promise<void> {
    if (!this.universalProvider) {
      throw new Error("PROVIDER_UNINITIALIZED");
    }
    if (!this.web3Modal) {
      throw new Error("WEB3_MODAL_UNINITIALIZED");
    }
    try {
      // const pairingTopic = oldPairings && oldPairings[0]?.topic;
      // const pairingTopic = oldPairings && oldPairings[0]?.topic;
      const newSession = await this.universalProvider.connect({
        namespaces: this.namespaces,
        // pairingTopic:
        //   "2838366b98c67805c22d888f2736704f629e5909b106bb561c2e1241e3b8bf2e",
        // ...(pairingTopic && { pairingTopic }),
      });
      if (!newSession) {
        throw new Error("NO_WALLET_CONNECT_SESSION");
      }
      const newAccounts = await this.universalProvider.enable();
      const pairings = this.universalProvider.client.pairing.getAll({
        active: true,
      });
      const web3Provider = new ethers.providers.Web3Provider(
        this.universalProvider
      );
      evmService.setProvider(this.key, web3Provider);
      this.dispatch({
        connection: !!newSession ? "connected" : "disconnected",
        session: newSession,
        accounts: newAccounts,
        pairings,
      });
    } catch (err) {
      console.log("connect fail", err);
      this.dispatch({
        connection: "disconnected",
      });
    } finally {
      this.web3Modal.closeModal();
    }
  }

  public async destroy(): Promise<void> {}

  private subscribe() {
    if (!this.universalProvider) {
      throw new Error("UNIVERSAL_PROVIDER_NOT_DEFINED");
    }
    if (!this.web3Modal) {
      throw new Error("WEB3_MODAL_NOT_DEFINED");
    }
    const provider = this.universalProvider;

    provider.on("display_uri", async (uri: string) => {
      this.web3Modal.openModal({ uri });
    });

    // Subscribe to session ping
    provider.on(
      "session_ping",
      ({ id, topic }: { id: number; topic: string }) => {
        console.log("EVENT", "session_ping");
        console.log(id, topic);
      }
    );

    // Subscribe to session event
    provider.on(
      "session_event",
      ({ event, chainId }: { event: any; chainId: string }) => {
        console.log("EVENT", "session_event");
        console.log(event, chainId);
      }
    );

    // Subscribe to session update
    provider.on(
      "session_update",
      ({
        topic,
        session,
        ...rest
      }: {
        topic: string;
        session: SessionTypes.Struct;
      }) => {
        console.log("EVENT", "session_updated");
        console.log({ session, topic, ...rest });
        this.dispatch({
          session,
          topic,
        });
      }
    );

    // Subscribe to session delete
    provider.on(
      "session_delete",
      ({ id, topic }: { id: number; topic: string }) => {
        console.log("EVENT", "session_deleted");
        console.log(id, topic);

        this.dispatch({
          initialization: "initialized",
          connection: "disconnected",
          accounts: [],
          session: null,
          pairings: [],
        });
      }
    );

    // provider.on("session_proposal", (...a: any[]) =>
    //   console.log("session_proposal", a)
    // );
    // provider.on("history_updated", (...a: any[]) =>
    //   console.log("history_updated", a)
    // );
    // provider.on("history_created", (...a: any[]) =>
    //   console.log("history_created", a)
    // );
    // provider.on("expirer_created", (...a: any[]) =>
    //   console.log("expirer_created", a)
    // );
    // provider.on("expirer_expired", (...a: any[]) =>
    //   console.log("expirer_expired", a)
    // );
    // provider.on("history_updated", (...a: any[]) =>
    //   console.log("history_updated", a)
    // );

    // provider.on("connect", (...a: any[]) => console.log("connect", a));
    // provider.on("connected", (...a: any[]) => console.log("connected", a));
    // provider.on("disconnect", (...a: any[]) => console.log("disconnect", a));
    // provider.on("disconnected", (...a: any[]) => console.log("disconnect", a));
    provider.on("subscription_deleted", (...a: any[]) =>
      console.log("subscription_deleted", a)
    );
  }
}
