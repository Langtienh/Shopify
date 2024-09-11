"use server";

import { revalidatePath } from "next/cache";
import { del, post, put } from "../axios.helper";
import { getConfigToken } from "../cookies/check-token";

export const updateCategory = async (data: CategoryDTO, categoryId: number) => {
  const { configToken } = await getConfigToken();
  const res = await put(`/categories/${categoryId}`, data, configToken);
  revalidatePath("/dashboard/more");
  return res;
};

export const delCategory = async (categoryId: number) => {
  const { configToken } = await getConfigToken();
  const res = await del(`/categories/${categoryId}`, configToken);
  revalidatePath("/dashboard/more");
  return res;
};

export const createCategory = async (data: CategoryDTO) => {
  const { configToken } = await getConfigToken();
  const res = await post("/categories", data, configToken);
  revalidatePath("/dashboard/more");
  return res;
};
