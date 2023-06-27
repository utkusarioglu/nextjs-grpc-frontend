import type { Middleware } from "@reduxjs/toolkit";
import { updateComputedValues, initialState } from "../slices/app.slice";
import type { Web3DriverUpdateBase } from "web3";
import {
  HYDRATE,
  SLICES_WITH_COOKIE_REHYDRATION,
  SLICES_WITH_REDUX_PERSIST_REHYDRATION,
  SET_ANDROID_DEFAULTS,
  SET_WEB_CLIENT_DEFAULTS,
  SLICES_WITH_DEFAULT_SET_ACTIONS,
} from "../constants";

// TODO any
function checkRehydration(state: any): boolean {
  const isAllDefaultsSet = SLICES_WITH_DEFAULT_SET_ACTIONS.map(
    (slice) => state[slice]
  ).every(({ _defaultsSet }: any) => _defaultsSet);

  const isAllCookiesRehydrated = SLICES_WITH_COOKIE_REHYDRATION.map(
    (slice) => state[slice]
  )
    .map(({ _cookie }: any) => _cookie.rehydrated)
    .every((i) => i);
  const isAllPersistRehydrated = !global.window
    ? true
    : SLICES_WITH_REDUX_PERSIST_REHYDRATION.map((slice) => state[slice])
        .map(({ _persist }: any) => _persist.rehydrated)
        .every((i) => i);

  return isAllCookiesRehydrated && isAllPersistRehydrated && isAllDefaultsSet;
}

/**
 * Logs all actions and states after they are dispatched.
 * @dev
 * TODO this middleware should also check whether authApi has received a
 * response to its inquiry for the authId
 */
export const authenticationMiddleware: Middleware =
  (store) => (next) => (action) => {
    const { type, key } = action;
    let result = next(action);

    try {
      const appSlicePersistHydration =
        type === "persist/REHYDRATE" && key === "app";
      const cookieHydration = type === HYDRATE;
      const setAuth = type === "app/setAuth";
      const updatedWeb3Driver = type === "web3/updateDriver";
      const i18nInitialized = type === "app/setIsI18nInitialized";
      const androidDefaults = type === SET_ANDROID_DEFAULTS;
      const webDefaults = type === SET_WEB_CLIENT_DEFAULTS;

      if (
        [
          cookieHydration,
          appSlicePersistHydration,
          setAuth,
          updatedWeb3Driver,
          i18nInitialized,
          androidDefaults,
          webDefaults,
        ].some((i) => i)
      ) {
        const state = store.getState();
        const isFullyRehydrated = checkRehydration(state);

        if (!isFullyRehydrated) {
          return result;
        }

        const {
          auth: { authId, username },
          isI18nInitialized,
        } = state.app;
        const { drivers } = state.web3;

        const computedValues = { ...initialState["_computed"] };
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

        if (!!authId && !!username) {
          computedValues.isUserPassAuthorized = true;
        }

        computedValues.isWeb3Authorized = isWeb3Authorized;

        computedValues.isLoggedIn =
          computedValues.isUserPassAuthorized &&
          computedValues.isWeb3Authorized;

        computedValues.isAuthChecksComplete = true;
        web3InitializedDriverSet.forEach((val) => {
          if (val === false) {
            console.log({ val });
            computedValues.isAuthChecksComplete = false;
          }
        });

        computedValues.isAppInitialized =
          computedValues.isAuthChecksComplete && isI18nInitialized;

        if (
          JSON.stringify(computedValues) !==
          JSON.stringify(initialState["_computed"])
        ) {
          store.dispatch(updateComputedValues(computedValues));
        }
      }
    } catch (err) {
      console.log("auth middleware error", err);
    } finally {
      return result;
    }
  };
