"use server";
import { get } from "../axios.helper";
import { getConfigToken } from "../cookies/check-token";

export async function getWishList() {
  const { token, configToken, userId } = await getConfigToken();
  try {
    const res = await get<WishList[]>(
      `/wish-lists/user/${userId}`,
      configToken
    );
    return res.data;
  } catch (error) {
    return [];
  }
}
