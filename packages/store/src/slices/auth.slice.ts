import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AuthSlice {
  authId: string;
  username: string;
}

export const initialState: AuthSlice = {
  authId: "",
  username: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, { payload }: PayloadAction<AuthSlice>) => {
      return {
        ...state,
        ...payload,
      };
    },
    setAuthId: (state, { payload }: PayloadAction<AuthSlice["authId"]>) => {
      console.log("setting auth id", payload);
      return {
        ...state,
        authId: payload,
      };
    },
  },
});

const { actions, name } = authSlice;
export const { setAuth, setAuthId } = actions;
export default authSlice;

export const selectLoggedIn = (state: RootState) => !!state[name].authId;

export const selectProfile = (state: RootState) => state[name];
