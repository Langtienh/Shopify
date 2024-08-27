import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserInfoStateType = {
  user: User | null;
};

const initialState: UserInfoStateType = {
  user: null,
};

const userInfo = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    updateAvatar: (state, action: PayloadAction<string>) => {
      if (state.user) state.user = { ...state.user, avatar: action.payload };
    },
  },
});

const userInfoReducers = userInfo.reducer;
export default userInfoReducers;
export const { updateUserInfo, updateAvatar } = userInfo.actions;
