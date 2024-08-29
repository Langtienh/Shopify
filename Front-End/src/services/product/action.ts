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

export const updateProductStasus = async (id: number, isActive: boolean) => {
  const { userId, configToken } = await getConfigToken();
  try {
    const res = await put(
      `/products/update-status/${id}?active=${isActive}`,
      undefined,
      configToken
    );
    return res;
  } catch (error) {
    console.log(error);

    return error as ReqError;
  }
};
