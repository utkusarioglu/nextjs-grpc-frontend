import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PrivateRootState } from "../types/store.types";
import { HYDRATE } from "../constants";
// import { HYDRATE } from "next-redux-wrapper";

// console.log({ TAMAGUI_TARGET: process.env.TAMAGUI_TARGET, env: process.env });

/**
 * @dev
 * #1 is set to true if the user has userpass authorization
 * #2 is set to true if the user is authorized through evm identity
 * #3 is set to true if all other authorization binaries are true
 */
export interface SliceState {
  authId: string;
  username: string;
  _computed: {
    isUserPassAuthorized: boolean; // #1
    isWeb3Authorized: boolean; // #2
    isLoggedIn: boolean; // #3
  };
}

export const initialState: SliceState = {
  authId: "",
  username: "",
  _computed: {
    isUserPassAuthorized: false,
    isWeb3Authorized: false,
    isLoggedIn: false,
  },
};

const NAME = "auth";

type SetAuthParams = Pick<SliceState, "username" | "authId">;

export const authSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    setAuth: (state, { payload }: PayloadAction<SetAuthParams>) => {
      return {
        ...state,
        ...payload,
      };
    },
    setAuthId: (state, { payload }: PayloadAction<SliceState["authId"]>) => {
      console.log("setting auth id", payload);
      return {
        ...state,
        authId: payload,
      };
    },
    setComputedValues: (
      state,
      { payload }: PayloadAction<SliceState["_computed"]>
    ) => {
      return {
        ...state,
        _computed: payload,
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

const { actions, name } = authSlice;
export const { setAuth, setAuthId, setComputedValues } = actions;
export default authSlice;

export const selectLoggedIn = (state: PrivateRootState) =>
  state[name]._computed.isLoggedIn;

export const selectProfile = (state: PrivateRootState) => state[name];

export const selectIsRehydrated = (state: PrivateRootState) =>
  state[name]._persist.rehydrated;
