import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PrivateRootState } from "../types/store.types";
import { HYDRATE } from "../constants";

export interface DecadeStats {
  countryList: string; // csv
}

const initialState: DecadeStats = {
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

const { actions, name } = decadeStatsSlice;
export const { setCountries } = actions;

export default decadeStatsSlice;

export const selectCountryList = (state: PrivateRootState) =>
  state[name].countryList;
