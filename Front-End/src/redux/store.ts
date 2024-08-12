import { useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducers from "@/redux/cart/slice";
import wishListReducers from "@/redux/wish-list/slice";
import LoginModalReducers from "@/redux/login-modal/slice";
import checkoutReducers from "@/redux/checkout/slice";

export const store = configureStore({
  reducer: {
    cart: cartReducers,
    wishLish: wishListReducers,
    loginModal: LoginModalReducers,
    checkout: checkoutReducers,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
