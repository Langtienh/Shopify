"use server";

import { del, post, put } from "../axios.helper";
import { getConfigToken } from "../cookies";

export const addCartItem = async (productId: number) => {
  try {
    const { userId, configToken } = await getConfigToken();
    const res = await post<CartResponse>(
      `/carts`,
      { productId, userId },
      configToken
    );
    return res;
  } catch (error) {
    return error as ReqError;
  }
};

export const deleteCartItem = async (id: number) => {
  const { configToken } = await getConfigToken();
  try {
    const res = await del(`/carts/cart-item/${id}`, configToken);
    return res;
  } catch (error) {
    return error as ReqError;
  }
};

export const addQuantity = async (id: number, quantity: number) => {
  try {
    const { configToken } = await getConfigToken();
    const res = await put(
      `/carts/cart-item/${id}`,
      { quantity: quantity + 1 },
      configToken
    );
    return res;
  } catch (error) {
    return error as ReqError;
  }
};

export const subQuantity = async (id: number, quantity: number) => {
  const { configToken } = await getConfigToken();

  await put(`/carts/cart-item/${id}`, { quantity: quantity - 1 }, configToken);
};

export const deleteListItem = async (listId: number[]) => {
  const { configToken } = await getConfigToken();
  try {
    const res = await del(`/carts/cart-item/${listId.toString()}`, configToken);
    return res;
  } catch (error) {
    return error as ReqError;
  }
};
