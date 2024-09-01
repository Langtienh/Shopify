"use server";
import { get } from "../axios.helper";

export const getbrandsByCategory = async (
  category: string
): Promise<BrandResponse[]> => {
  const res = await get<CategoryResponse[]>(`/brands/category/${category}`);
  const brands = res.data;
  return brands;
};

export const getAllBrands = async (): Promise<BrandResponse[]> => {
  const res = await get<CategoryResponse[]>(`/brands`);
  const brands = res.data;
  return brands;
};
