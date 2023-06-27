import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PrivateRootState } from "../types/store.types";
import {
  HYDRATE,
  SET_ANDROID_DEFAULTS,
  SET_WEB_CLIENT_DEFAULTS,
} from "../constants";

export interface DecadeStats {
  _cookie: {
    rehydrated: boolean;
  };
  _defaultsSet: boolean;
  countryList: string; // csv
}

const initialState: DecadeStats = {
  _cookie: {
    rehydrated: false,
  },
  _defaultsSet: false,
  countryList: "USA",
};

const NAME = "decadeStats";

export const decadeStatsSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    setCountries: (
      state,
      { payload }: PayloadAction<DecadeStats["countryList"]>
    ) => {
      return {
        ...state,
        countryList: payload,
      };
    },
  },
  // ...(process.env.TAMAGUI_TARGET === "web" && {
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
  // }),
});

const { actions, name } = decadeStatsSlice;
export const { setCountries } = actions;

export default decadeStatsSlice;

export const selectCountryList = (state: PrivateRootState) =>
  state[name].countryList;
