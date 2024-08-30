"use server";

import { post, put } from "../axios.helper";
import { getConfigToken } from "../cookies";

export const createProduct = async (product: ProductDTO) => {
  const { configToken } = await getConfigToken();
  try {
    const res = await post<Product>("/products", product, configToken);
    return res;
  } catch (error) {
    return error as ReqError;
  }
};

export const updateProductStasus = async (id: number, isActive: boolean) => {
  const { configToken } = await getConfigToken();
  try {
    const res = await put(
      `/products/update-status/${id}?active=${isActive}`,
      undefined,
      configToken
    );
    return res;
  } catch (error) {
    return error as ReqError;
  }
};

export const updateProduct = async (product: ProductDTO, productId: number) => {
  const { configToken } = await getConfigToken();
  try {
    const res = await post<Product>("/products", product, configToken);
    return res;
  } catch (error) {
    return error as ReqError;
  }
};

export const upViewCount = async (id: number | string) => {
  await put<Product>(`/products/view-count/${id}`);
};
