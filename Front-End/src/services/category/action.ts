"use server";

import { del, post, put } from "../axios.helper";
import { getConfigToken } from "../cookies";

export const updateCategory = async (data: CategoryDTO, categoryId: number) => {
  const { configToken } = await getConfigToken();
  const res = await put(`/categories/${categoryId}`, data, configToken);
  return res;
};

export const delCategory = async (categoryId: number) => {
  const { configToken } = await getConfigToken();
  const res = await del(`/categories/${categoryId}`, configToken);
  return res;
};

export const createCategory = async (data: CategoryDTO) => {
  const { configToken } = await getConfigToken();
  const res = await post("/categories", data, configToken);
  return res;
};
