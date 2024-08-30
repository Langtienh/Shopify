"use server";
import { get } from "../axios.helper";
export const getAllCategory = async (): Promise<CategoryResponse[]> => {
  const res = await get<CategoryResponse[]>("/categories");
  const categories = res.data.sort((a, b) => a.id - b.id);
  return categories;
};
