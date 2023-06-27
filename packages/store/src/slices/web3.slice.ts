import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PrivateRootState } from "../types/store.types";
import {
  HYDRATE,
  SET_ANDROID_DEFAULTS,
  SET_WEB_CLIENT_DEFAULTS,
} from "../constants";
import type {
  Web3DriverStateUpdate,
  Web3DriverMetamaskState,
  Web3DriverWalletConnectState,
  AvailableDrivers,
} from "web3";

export interface SliceState {
  _cookie: {
    rehydrated: boolean;
  };
  _defaultsSet: boolean;
  drivers: {
    metamask: Web3DriverMetamaskState;
    walletConnect: Web3DriverWalletConnectState;
  };
}

const initialState: SliceState = {
  _cookie: {
    rehydrated: false,
  },
  _defaultsSet: false,
  drivers: {
    metamask: {
      type: "metamask",
      initialization: "uninitialized",
      connection: "disconnected",
      accounts: [],
      locked: true,
      available: false,
    },
    walletConnect: {
      type: "walletConnect",
      initialization: "uninitialized",
      connection: "disconnected",
      accounts: [],
      session: null,
      pairings: [],
      topic: null,
      locked: false,
      available: false,
    },
  },
} as SliceState;

const NAME = "web3";

export const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    updateDriver: (
      state,
      {
        payload: { driver, updates },
      }: PayloadAction<Web3DriverStateUpdate[AvailableDrivers]>
    ) => {
      return {
        ...state,
        drivers: {
          ...state.drivers,
          [driver]: {
            ...state.drivers[driver],
            ...updates,
          },
        },
      };
    },
  },
  extraReducers: {
    [HYDRATE]: (state: any, action: any) => {
      if (!action.payload[NAME]) {
        return state;
      }
      return {
        ...state,
        ...action.payload[NAME],
        _cookie: {
          rehydrated: true,
        },
      };
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
      return {
        ...state,
        _defaultsSet: true,
      };
    },
  },
});

const { actions, name } = slice;
export const { updateDriver } = actions;

export default slice;

export const selectDriver =
  (driver: AvailableDrivers) => (state: PrivateRootState) =>
    state[name].drivers[driver];

export const selectDrivers = (state: PrivateRootState) => state[name].drivers;

export const selectIsRehydrated = (state: PrivateRootState) =>
  state[name]._persist.rehydrated;
