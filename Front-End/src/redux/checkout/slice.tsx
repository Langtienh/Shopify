import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserInfo = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
};
type CartStateType = {
  userInfo: UserInfo;
  totalprice: number;
};
const initialState: CartStateType = {
  userInfo: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
  },
  totalprice: 0,
};
const checkoutSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    updateTotalPrice: (state, action: PayloadAction<number>) => {
      state.totalprice = action.payload;
    },
  },
});

const checkoutReducers = checkoutSlice.reducer;
export default checkoutReducers;

export const { updateUserInfo, updateTotalPrice } = checkoutSlice.actions;
