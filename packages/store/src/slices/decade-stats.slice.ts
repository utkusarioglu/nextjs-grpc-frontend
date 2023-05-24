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
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
const { actions, name } = decadeStatsSlice;
export const { setCountries } = actions;

export default decadeStatsSlice;

export const selectCountryList = (state: RootState) => state[name].countryList;
// export const dispatchIncrement = dispatch(actions.increment());
