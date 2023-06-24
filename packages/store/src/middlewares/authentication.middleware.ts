import type { Middleware } from "@reduxjs/toolkit";
import { setComputedValues, initialState } from "../slices/auth.slice";
import type { Web3DriverUpdateBase } from "web3";

/**
 * Logs all actions and states after they are dispatched.
 */
export const authentication: Middleware = (store) => (next) => (action) => {
  const { type, key } = action;
  let result = next(action);
  const authSliceHydration =
    type === "persist/REHYDRATE" && key === "authSlice";
  const setAuth = type === "auth/setAuth";
  const updatedWeb3Driver = type === "web3/updateDriver";
  if ([authSliceHydration, setAuth, updatedWeb3Driver].some((i) => i)) {
    const state = store.getState();
    const {
      authId,
      username,
      _persist: { rehydrated: authRehydrated },
    } = state.auth;
    const {
      drivers,
      _persist: { rehydrated: web3Rehydrated },
    } = state.web3;
    if (!authRehydrated || !web3Rehydrated) {
      return result;
    }

    const computedValues = { ...initialState["_computed"] };
    // const web3Initialized = Object.values(drivers).every(
    //   // TODO cast the relevant type from web3 package here
    //   ({ initialization }: any) => initialization === "initialized"
    // );

    // const web3InitializedDrivers = Object.entries<Web3DriverUpdateBase>(drivers).reduce(
    //   (acc, [key, curr]) => {
    //     if (curr.available && curr.initialization === "initialized") {
    //       acc[key] = curr;
    //     }
    //     return acc;
    //   },
    //   {} as Partial<typeof drivers>
    // );

    const web3InitializedDriverSet = Object.entries<Web3DriverUpdateBase>(
      drivers
    ).reduce((acc, [key, curr]) => {
      if (curr.available && curr.initialization === "initialized") {
        acc.add(key);
      }
      return acc;
    }, new Set());

    const isWeb3Authorized = Object.entries<Web3DriverUpdateBase>(
      drivers
    ).reduce((acc, [key, curr]) => {
      if (
        curr.connection === "connected" &&
        web3InitializedDriverSet.has(key)
      ) {
        acc = true;
      }
      return acc;
    }, false);

    // if (!web3Initialized) {
    //   return result;
    // }

    // const web3Connected = Object.values(drivers).some(
    //   // TODO cast the relevant type from web3 package here
    //   ({ connection, initialization }: any) =>
    //     connection === "connected" && initialization === "initialized"
    // );

    if (!!authId && !!username) {
      computedValues.isUserPassAuthorized = true;
    }

    computedValues.isWeb3Authorized = isWeb3Authorized;

    computedValues.isLoggedIn =
      computedValues.isUserPassAuthorized && computedValues.isWeb3Authorized;

    computedValues.checksComplete = true;

    if (
      JSON.stringify(computedValues) !==
      JSON.stringify(initialState["_computed"])
    ) {
      store.dispatch(setComputedValues(computedValues));
    }
  }
  return result;
};

// /**
//  * Sends crash reports as state is updated and listeners are notified.
//  */
// const crashReporter = (store) => (next) => (action) => {
//   try {
//     return next(action);
//   } catch (err) {
//     console.error("Caught an exception!", err);
//     Raven.captureException(err, {
//       extra: {
//         action,
//         state: store.getState(),
//       },
//     });
//     throw err;
//   }
// };
