"use server";

import { put } from "../axios.helper";
import { checkToken, getToken } from "../cookies";

export const createProduct = async () => {
  await checkToken();
  const { token } = getToken();

  return token;
};
export const upViewCount = async (id: number | string) => {
  await put<Product>(`/products/view-count/${id}`);
};
