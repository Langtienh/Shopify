"use server";

import { revalidatePath } from "next/cache";
import { del, post, put } from "../axios.helper";
import { getConfigToken } from "../cookies/check-token";

export const updateBrand = async (name: string, brandId: number) => {
  const { configToken } = await getConfigToken();
  const res = await put(`/brands/${brandId}`, { name }, configToken);
  revalidatePath("/dashboard/more");
  return res;
};

export const delBrand = async (brandId: number) => {
  const { configToken } = await getConfigToken();
  const res = await del(`/brands/${brandId}`, configToken);
  revalidatePath("/dashboard/more");
  return res;
};

export const createBrand = async (name: string) => {
  const { configToken } = await getConfigToken();
  const res = await post("/brands", { name }, configToken);
  revalidatePath("/dashboard/more");
  return res;
};
