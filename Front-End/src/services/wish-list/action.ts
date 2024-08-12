"use server";

import { del, post } from "../axios.helper";
import { checkToken, getToken } from "../cookies";

export const createWishListItem = async (productId: number) => {
  await checkToken();
  const { token, userId } = getToken();
  await post<WishList>(
    `/wish-lists`,
    {
      productId,
      userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const delWishListItem = async (id: number) => {
  await checkToken();
  const { token } = getToken();
  await del<WishList>(`/wish-lists/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
