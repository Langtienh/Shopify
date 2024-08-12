import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { data: number[] } = { data: [] };
const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    setWishList: (state, action: PayloadAction<number[]>) => {
      state.data = action.payload;
    },
    pushWishListItem: (state, action: PayloadAction<number>) => {
      state.data.push(action.payload);
    },
    popWishListItem: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((item) => item !== action.payload);
    },
  },
});

const wishListReducers = wishListSlice.reducer;
export default wishListReducers;
export const { setWishList, pushWishListItem, popWishListItem } =
  wishListSlice.actions;
