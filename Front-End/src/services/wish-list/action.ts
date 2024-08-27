"use server";

import { del, post } from "../axios.helper";
import { getConfigToken } from "../cookies";

export const createWishListItem = async (productId: number) => {
  const { userId, configToken } = await getConfigToken();
  try {
    const res = await post<WishList>(
      `/wish-lists`,
      {
        productId,
        userId,
      },
      configToken
    );
    return res;
  } catch (error) {
    return error as ReqError;
  }
};

export const delWishListItem = async (id: number) => {
  const { configToken } = await getConfigToken();
  try {
    const res = await del<WishList>(`/wish-lists/${id}`, configToken);
    return res;
  } catch (error) {
    return error as ReqError;
  }
};
