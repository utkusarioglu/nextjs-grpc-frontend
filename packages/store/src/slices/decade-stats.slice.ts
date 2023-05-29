import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface DecadeStats {
  countryList: string; // csv
}

const initialState: DecadeStats = {
  countryList: "USA",
};

export const decadeStatsSlice = createSlice({
  name: "decadeStats",
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
});

const { actions, name } = decadeStatsSlice;
export const { setCountries } = actions;

export default decadeStatsSlice;

export const selectCountryList = (state: RootState) => state[name].countryList;
