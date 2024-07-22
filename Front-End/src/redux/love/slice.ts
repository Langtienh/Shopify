import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type LoveStateType = {
  listLove: Love[];
};
const initialState: LoveStateType = {
  listLove: [],
};
const LoveSlice = createSlice({
  name: "Love",
  initialState,
  reducers: {
    cloneLoveList: (state, action: PayloadAction<Love[]>) => {
      state.listLove = action.payload;
    },
  },
});

const LoveReducers = LoveSlice.reducer;
export default LoveReducers;
export const { cloneLoveList } = LoveSlice.actions;
