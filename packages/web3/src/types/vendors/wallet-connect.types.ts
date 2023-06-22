export type { SessionTypes, PairingTypes } from "@walletconnect/types";

/**
 * This interface is designed to _resemble_ properties of of the web3modals
 * in different environments to the point that is only relevant to the
 * driver. This is because there are implementation differences between
 * web and react-native modal interfaces that are irrelevant for the
 * driver but does cause type errors in typescript.
 */
export interface Web3ModalIsh {
  openModal: (...args: any[]) => Promise<void>;
  closeModal: () => Promise<void> | void;
}
