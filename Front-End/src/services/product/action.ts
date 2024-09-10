"use server";

import { post, put } from "../axios.helper";
import { getConfigToken } from "../cookies/check-token";

export const createProduct = async (product: ProductDTO) => {
  const { configToken } = await getConfigToken();
  const res = await post<Product>("/products", product, configToken);
  return res;
};

export const updateProductStasus = async (id: number, isActive: boolean) => {
  const { configToken } = await getConfigToken();
  const res = await put(
    `/products/update-status/${id}?active=${isActive}`,
    undefined,
    configToken
  );
  return res;
};

export const updateProduct = async (product: ProductDTO, productId: number) => {
  const { configToken } = await getConfigToken();
  const res = await put<Product>(
    `/products/${productId}`,
    product,
    configToken
  );
  return res;
};

export const upViewCount = async (id: number | string) => {
  await put<Product>(`/products/view-count/${id}`);
};
