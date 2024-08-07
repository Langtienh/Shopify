import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type LoveStateType = {
  listLove: WishList[];
};
const initialState: LoveStateType = {
  listLove: [],
};
const LoveSlice = createSlice({
  name: "WishList",
  initialState,
  reducers: {
    cloneLoveList: (state, action: PayloadAction<WishList[]>) => {
      state.listLove = action.payload;
    },
  },
});

const LoveReducers = LoveSlice.reducer;
export default LoveReducers;
export const { cloneLoveList } = LoveSlice.actions;
