"use server";
import { get } from "../axios.helper";
import { checkToken, getToken } from "../cookies";

export async function getWishList() {
  await checkToken();
  const { userId, token } = getToken();
  try {
    const res = await get<WishList[]>(`/wish-lists/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return [];
  }
}
