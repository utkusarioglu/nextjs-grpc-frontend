import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PrivateRootState } from "../types/store.types";
import { HYDRATE } from "../constants";
import type {
  Web3DriverStateUpdate,
  Web3DriverMetamaskState,
  Web3DriverWalletConnectState,
  AvailableDrivers,
} from "web3";

export interface SliceState {
  drivers: {
    metamask: Web3DriverMetamaskState;
    walletConnect: Web3DriverWalletConnectState;
  };
}

const initialState: SliceState = {
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
  ...(process.env.TAMAGUI_TARGET === "web" && {
    extraReducers: {
      [HYDRATE]: (state: any, action: any) => {
        // console.log(`HYDRATE ${NAME}`, !!global.window, {
        //   ...action.payload[NAME],
        // });
        return {
          ...state,
          ...action.payload[NAME],
        };
      },
    },
  }),
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
