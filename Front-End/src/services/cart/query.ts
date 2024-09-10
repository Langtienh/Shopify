"use server";
import { cookies } from "next/headers";
import { get } from "../axios.helper";
import { getConfigToken } from "../cookies/check-token";

export async function getCart() {
  const { userId, configToken } = await getConfigToken();
  try {
    const res = await get<CartResponse>(`/carts/user/${userId}`, configToken);
    return res.data;
  } catch {
    return {
      id: 0,
      userId: 0,
      total: 0,
      totalProduct: 0,
      totalQuantity: 0,
      cartItems: [],
    };
  }
}

export const getCartInCookies = async () => {
  const _cart = cookies().get("Cart")?.value;
  if (_cart) {
    const cart: CartType = JSON.parse(_cart);
    return cart;
  } else {
    const userId = cookies().get("USER_ID")?.value;
    const { configToken } = await getConfigToken();
    const res = await get<CartResponse>(`/carts/user/${userId}`, configToken);
    cookies().set("Cart", JSON.stringify(res.data));
    return res.data;
  }
};
