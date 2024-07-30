import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

type CartStateType = {
  checked: number[];
  cart: CartItemResponse[];
  payment: CartItemResponse[];
  totalPrice: number;
  paymentInfo: paymentInfoType;
};
const initialState: CartStateType = {
  checked: [],
  cart: [],
  payment: [],
  totalPrice: 0,
  paymentInfo: {},
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
    buyNow: (state, action: PayloadAction<number>) => {
      state.checked = [];
      state.checked.push(action.payload);
    },
    toPayment: (state) => {
      const _payment: CartItemResponse[] = [];
      state.checked.forEach((item) => {
        const _cartItem = state.cart.find((cartItem) => cartItem.id === item);
        if (_cartItem) _payment.push(_cartItem);
      });
      state.payment = _payment;
    },
    changeUserInfo: (state, action: PayloadAction<paymentInfoType>) => {
      state.paymentInfo = action.payload;
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
export const {
  checkedTogger,
  checkedAll,
  uncheckedAll,
  cloneCart,
  buyNow,
  toPayment,
  changeUserInfo,
} = cartSlice.actions;
