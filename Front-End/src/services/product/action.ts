"use server";

import { put } from "../axios.helper";
import { getConfigToken } from "../cookies";

export const createProduct = async () => {
  const { userId, configToken } = await getConfigToken();

  // return token;
};
export const upViewCount = async (id: number | string) => {
  await put<Product>(`/products/view-count/${id}`);
};
