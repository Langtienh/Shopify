import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type CartStateType = {
  checked: number[];
};
const initialState: CartStateType = {
  checked: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
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
    checkedAll: (
      state,
      action: PayloadAction<{ checked: boolean; listId: number[] }>
    ) => {
      if (action.payload.checked) state.checked = action.payload.listId;
      else state.checked = [];
    },
    uncheckedAll: (state) => {
      state.checked = [];
    },
  },
});

const cartReducers = cartSlice.reducer;
export default cartReducers;
export const { checkedTogger, checkedAll, uncheckedAll } = cartSlice.actions;
