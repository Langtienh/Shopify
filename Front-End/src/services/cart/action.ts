"use server";

import { del, post, put } from "../axios.helper";
import { checkToken, getToken } from "../cookies";

export const addCartItem = async (productId: number) => {
  const check = await checkToken();
  const { userId, token } = getToken();
  if (check && userId && token) {
    try {
      const res = await post<CartResponse>(
        `/carts`,
        { productId, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.cartItems[0].id;
    } catch {
      return false;
    }
  } else return false;
};
export const deleteCartItem = async (id: number) => {
  const check = await checkToken();
  const { userId, token } = getToken();
  if (check && token && userId) {
    try {
      await del(`/carts/cart-item/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return true;
    } catch {
      return false;
    }
  }
  return false;
};
export const addQuantity = async (id: number, quantity: number) => {
  const check = await checkToken();
  const { userId, token } = getToken();
  if (check && token && userId) {
    try {
      await put(
        `/carts/cart-item/${id}`,
        { quantity: quantity + 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return true;
    } catch {
      return false;
    }
  }
  return false;
};
export const subQuantity = async (id: number, quantity: number) => {
  const check = await checkToken();
  const { userId, token } = getToken();
  if (check && token && userId) {
    try {
      await put(
        `/carts/cart-item/${id}`,
        { quantity: quantity - 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return true;
    } catch {
      return false;
    }
  }
  return false;
};
export const deleteListItem = async (listId: number[]) => {
  const check = await checkToken();
  const { userId, token } = getToken();
  if (check && token && userId) {
    try {
      await del(`/carts/cart-item/${listId.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return true;
    } catch {
      return false;
    }
  }
  return false;
};
