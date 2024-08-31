"use server";

import { del, post } from "../axios.helper";
import { getConfigToken } from "../cookies";

export const createWishListItem = async (productId: number) => {
  const { userId, configToken } = await getConfigToken();
  const res = await post<WishList>(
    `/wish-lists`,
    {
      productId,
      userId,
    },
    configToken
  );
  return res;
};

export const delWishListItem = async (id: number) => {
  const { configToken } = await getConfigToken();
  const res = await del<WishList>(`/wish-lists/${id}`, configToken);
  return res;
};
