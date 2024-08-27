"use server";
import { getCart } from "../cart";
import { getMyInfo } from "../user";
import { getWishList } from "../wish-list";
import isLoginFc from "./checkLogin";
export const getWishListTrigger = async () => {
  const isLogin = await isLoginFc();
  if (isLogin) {
    const res = await getWishList();
    const data = res.map((item) => item.productId);
    return data;
  }
  return [];
};

export const getCartTrigger = async () => {
  const isLogin = await isLoginFc();
  if (isLogin) {
    const res = await getCart();
    const data = res.cartItems.map((item) => item.id);
    return data;
  }
  return [];
};

export const getMyInfoTrigger = async () => {
  const isLogin = await isLoginFc();
  if (isLogin) {
    const { user } = await getMyInfo();
    return user;
  } else return null;
};
