import { get } from "../axios.helper";

export const getbrandsByCategory = async (
  category: string
): Promise<BrandResponse[]> => {
  try {
    const res = await get<CategoryResponse[]>(`/brands/category/${category}`);
    const brands = res.data;
    return brands;
  } catch {
    return [];
  }
};
