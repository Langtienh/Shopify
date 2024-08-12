"use server";
import { get } from "../axios.helper";
import { checkToken, getToken } from "../cookies";

export async function getCart() {
  await checkToken();
  const { userId, token } = getToken();
  try {
    const res = await get<CartResponse>(`/carts/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
