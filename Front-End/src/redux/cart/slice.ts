import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
type CartStateType = {
  checked: number[];
  cart: CartItemResponse[];
  totalPrice: number;
};
const initialState: CartStateType = {
  checked: [],
  cart: [],
  totalPrice: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cloneCart: (state, action: PayloadAction<CartItemResponse[]>) => {
      state.cart = action.payload;
    },
    checkedTogger: (
      state,
      action: PayloadAction<{ checked: boolean; id: number }>
    ) => {
      if (action.payload.checked) state.checked.push(action.payload.id);
      else
        state.checked = state.checked.filter(
          (item) => item !== action.payload.id
        );
    },
    checkedAll: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.checked = state.cart.map((item) => item.id);
      } else state.checked = [];
    },
    uncheckedAll: (state) => {
      state.checked = [];
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => {
        return action.type.includes("cart/");
      },
      (state) => {
        let totalPrice = 0;
        state.checked.forEach((id) => {
          const item = state.cart.find((item) => item.id === id);
          const price = item
            ? ((item.price * (100 - item.discount)) / 100) * item.quantity
            : 0;
          totalPrice += price;
        });
        state.totalPrice = totalPrice;
      }
    );
  },
});

const cartReducers = cartSlice.reducer;
export default cartReducers;
export const { checkedTogger, checkedAll, uncheckedAll, cloneCart } =
  cartSlice.actions;
