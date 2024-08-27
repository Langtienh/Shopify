"use server";
import { get } from "../axios.helper";
import { getConfigToken } from "../cookies";

export async function getCart() {
  const { userId, configToken } = await getConfigToken();
  try {
    const res = await get<CartResponse>(`/carts/user/${userId}`, configToken);
    return res.data;
    // todo
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
