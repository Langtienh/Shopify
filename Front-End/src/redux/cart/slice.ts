import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartStateType = {
  totalQuantity: number;
};
const initialState: CartStateType = {
  totalQuantity: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setTotalQuantity: (state, action: PayloadAction<number>) => {
      state.totalQuantity = action.payload;
    },
    pushCartItem: (state) => {
      state.totalQuantity = state.totalQuantity + 1;
    },
    popCartItem: (state, action: PayloadAction<number>) => {
      state.totalQuantity = state.totalQuantity - action.payload;
    },
  },
});

const cartReducers = cartSlice.reducer;
export default cartReducers;

export const { setTotalQuantity, pushCartItem, popCartItem } =
  cartSlice.actions;
