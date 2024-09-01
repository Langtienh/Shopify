"use server";

import { del, post, put } from "../axios.helper";
import { getConfigToken } from "../cookies";

export const updateBrand = async (name: string, brandId: number) => {
  const { configToken } = await getConfigToken();
  const res = await put(`/brands/${brandId}`, { name }, configToken);
  return res;
};

export const delBrand = async (brandId: number) => {
  const { configToken } = await getConfigToken();
  const res = await del(`/brands/${brandId}`, configToken);
  return res;
};

export const createBrand = async (name: string) => {
  const { configToken } = await getConfigToken();
  const res = await post("/brands", { name }, configToken);
  return res;
};
