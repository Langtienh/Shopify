"use server";

import { cookies } from "next/headers";
import { del, post } from "../axios.helper";
import { getConfigToken } from "../cookies/check-token";

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
  const _wishList = cookies().get("WISH_LIST")?.value;
  if (_wishList) {
    const wishList: number[] = JSON.parse(_wishList);
    wishList.push(productId);
    cookies().set("WISH_LIST", JSON.stringify(wishList));
  } else cookies().set("WISH_LIST", JSON.stringify([productId]));
  return res;
};

export const delWishListItem = async (id: number) => {
  const { configToken } = await getConfigToken();
  const res = await del<WishList>(`/wish-lists/${id}`, configToken);
  const _wishList = cookies().get("WISH_LIST")?.value;
  if (_wishList) {
    const wishList: number[] = JSON.parse(_wishList);
    cookies().set(
      "WISH_LIST",
      JSON.stringify(wishList.filter((item) => item != id))
    );
  }
  return res;
};

export const triggerWishList = async () => {
  const _wishList = cookies().get("WISH_LIST")?.value;
  if (_wishList) {
    const wishList: number[] = JSON.parse(_wishList);
    return wishList;
  } else return [];
};
