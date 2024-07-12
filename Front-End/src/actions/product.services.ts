"use server";

import { get } from "@/actions/axios.helper";

export const getAllCategory = async (): Promise<CategoryResponse[]> => {
  const res = await get<CategoryResponse[]>("/categories");
  const categories = res.data.sort((a, b) => a.id - b.id);
  return categories;
};

export const getAllCategoryBrand = async (): Promise<
  CategoryBrandResponse[]
> => {
  const res = await get<CategoryBrandResponse[]>(`/category-brands`);
  const CategoryBrands = res.data;
  return CategoryBrands;
};

export const getbrandsByCategory = async (
  category: string
): Promise<BrandResponse[]> => {
  const res = await get<CategoryResponse[]>(`/brands/category/${category}`);
  const brands = res.data;
  return brands;
};

export const getTopProduct = async (
  category: string,
  limit: number
): Promise<ProductResponse[]> => {
  try {
    const res = await get<PageResponse<ProductResponse>>(
      `/products?category=${category}&limit=${limit}&sort=viewCount:desc`
    );
    const products = res.data.result;
    return products;
  } catch (error) {
    return Promise.reject(error);
  }
};
// sort,  filter
export const getProductByCategoryAndBand = async (
  category: string,
  limit: number,
  page: number,
  sort: string,
  filter?: string,
  brand?: string
): Promise<[ProductResponse[], number]> => {
  try {
    const res = await get<PageResponse<ProductResponse>>(
      `/products?category=${category}${
        brand ? `&brand=${brand}` : ""
      }&page=${page}&limit=${limit}&sort=${sort}${
        filter ? `&search=${filter}` : ""
      }`
    );
    const products = res.data.result;
    const totalItem = res.data.totalItem;
    return [products, totalItem];
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getProductByCategory = async (
  category: string,
  LIMIT: number,
  PAGE: number,
  SORT: string,
  filter?: string
): Promise<[ProductResponse[], number]> => {
  const res = await get<PageResponse<ProductResponse>>(
    `/products?category=${category}&page=${PAGE}&limit=${LIMIT}&sort=${SORT}${
      filter ? `&search=${filter}` : ""
    }`
  );
  const products = res.data.result;
  const totalItem = res.data.totalItem;
  return [products, totalItem];
};

export const getAllProduct = async (
  LIMIT: number
): Promise<ProductResponse[]> => {
  const res = await get<PageResponse<ProductResponse>>(
    `/products?limit=${LIMIT}`
  );
  const products = res.data.result;
  return products;
};

export const getAttributesByCategory = async (
  category: string,
  brand?: string
): Promise<AttibulteResponse[]> => {
  const res = await get<AttibulteResponse[]>(
    `/attributes?category=${category}${brand ? `&brand=${brand}` : ""}`
  );
  const attributes = res.data;
  return attributes;
};

export const SearchProductAction = async (searchQuery: string) => {
  // todo
  const res = await get<PageResponse<ProductResponse>>(
    `/products?search=name:${searchQuery}&limit=5`
  );
  const products = res.data.result;
  return products;
};

export const getProductById = async (id: string) => {
  const res = await get<ProductResponse>(`/products/${id}`);
  const data = res.data;
  return data;
};
