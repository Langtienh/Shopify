import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type LoginModalStateType = {
  show: boolean;
  calbackUrl: string;
};
const initialState: LoginModalStateType = {
  show: false,
  calbackUrl: "",
};
const LoginModal = createSlice({
  name: "LoginModal",
  initialState,
  reducers: {
    showLoginModal: (state, action: PayloadAction<string>) => {
      state.calbackUrl = action.payload;
      state.show = true;
    },
    hiddenLoginModal: (state) => {
      state.show = false;
      state.calbackUrl = "";
    },
  },
});

const LoginModalReducers = LoginModal.reducer;
export default LoginModalReducers;
export const { showLoginModal, hiddenLoginModal } = LoginModal.actions;
