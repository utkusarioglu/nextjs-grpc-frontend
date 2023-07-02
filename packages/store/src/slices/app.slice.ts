import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PrivateRootState } from "../types/store.types";
import {
  HYDRATE,
  SET_ANDROID_DEFAULTS,
  SET_WEB_CLIENT_DEFAULTS,
} from "../constants";

/**
 * @dev
 * #1 is set to true if the user has userpass authorization
 * #2 is set to true if the user is authorized through evm identity
 * #3 is set to true if all other authorization binaries are true
 * #4 starts with false and is set to true once the middleware does its checks
 * for the first time.
 * #5 is set to true when internationalization requirements are met.
 * #6 Set to true when everything is loaded and all checks are made and
 * there is nothing in the way of normal operations
 * #7 Set to true when the cookie persistence middleware has rehydrated the
 * content
 * #8 Set to true when at least one of th web3 drivers are in initialized
 * state
 */
export interface SliceState {
  auth: {
    authId: string;
    username: string;
  };
  isI18nInitialized: boolean; // #5

  _defaultsSet: boolean;

  _cookie: {
    rehydrated: boolean; // #7
  };
  _computed: {
    isAppInitialized: boolean; // #6
    isAuthChecksComplete: boolean; // #4
    isUserPassAuthorized: boolean; // #1
    isWeb3Authorized: boolean; // #2
    isWeb3Initialized: boolean; // #8
    isLoggedIn: boolean; // #3
  };
}

export const initialState: SliceState = {
  auth: {
    authId: "",
    username: "",
  },
  // isI18nInitialized: process.env.TAMAGUI_TARGET === "web",
  isI18nInitialized: false,
  _defaultsSet: false,
  _cookie: {
    rehydrated: false,
  },
  _computed: {
    isAppInitialized: false,
    isAuthChecksComplete: false,

    isUserPassAuthorized: false,
    isWeb3Authorized: false,
    isWeb3Initialized: false,
    isLoggedIn: false,
  },
};

const NAME = "app";

type SetAuthParams = SliceState["auth"];

type SetComputedValues = Partial<SliceState["_computed"]>;

export const authSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    setAuth: (state, { payload }: PayloadAction<SetAuthParams>) => {
      return {
        ...state,
        auth: payload,
        // ...payload,
      };
    },
    setAuthId: (
      state,
      { payload }: PayloadAction<SliceState["auth"]["authId"]>
    ) => {
      return {
        ...state,
        auth: {
          ...state.auth,
          authId: payload,
        },
      };
    },
    updateComputedValues: (
      state,
      { payload }: PayloadAction<SetComputedValues>
    ) => {
      return {
        ...state,
        _computed: {
          ...state._computed,
          ...payload,
        },
      };
    },
    setIsI18nInitialized(
      state,
      { payload }: PayloadAction<SliceState["isI18nInitialized"]>
    ) {
      return {
        ...state,
        isI18nInitialized: payload,
      };
    },
    setAndroidDefaults(state) {
      return {
        ...state,
        _cookie: {
          rehydrated: true,
        },
      };
    },
  },
  extraReducers: {
    [HYDRATE]: (state: any, action: any) => {
      return {
        ...state,
        ...action.payload[NAME],
        _cookie: {
          rehydrated: true,
        },
      };
      // const auth = action.payload[NAME]?.auth;
      // if (!auth) {
      //   return state;
      // }

      // return {
      //   ...state,
      //   auth,
      //   _cookie: {
      //     rehydrated: true,
      //   },
      // };
    },
    [SET_ANDROID_DEFAULTS]: (state) => {
      return {
        ...state,
        _cookie: {
          rehydrated: true,
        },
        _defaultsSet: true,
      };
    },
    [SET_WEB_CLIENT_DEFAULTS]: (state) => {
      console.log("web client defaults");
      return {
        ...state,
        isI18nInitialized: true,
        _defaultsSet: true,
      };
    },
  },
});

const { actions, name } = authSlice;
export const {
  setAuth,
  setAuthId,
  setIsI18nInitialized,
  updateComputedValues,
} = actions;
export default authSlice;

export const selectIsLoggedIn = (state: PrivateRootState) =>
  state[name]._computed.isLoggedIn;

export const selectIsAuthChecksComplete = (state: PrivateRootState) =>
  state[name]._computed.isAuthChecksComplete;

export const selectProfile = (state: PrivateRootState) => state[name];

export const selectIsRehydrated = (state: PrivateRootState) =>
  state[name]._persist.rehydrated;

export const selectIsAppInitialized = (state: PrivateRootState) =>
  state[name]._computed.isAppInitialized;
