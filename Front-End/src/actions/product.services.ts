"use server";

import { get } from "@/actions/axios.helper";

export const getAllCategory = async (): Promise<CategoryResponse[]> => {
  try {
    const res = await get<ResponseSuccess<CategoryResponse[]>>("/categories");
    const categories = res.data.sort((a, b) => a.id - b.id);
    return categories;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllCategoryBrand = async (): Promise<
  CategoryBrandResponse[]
> => {
  try {
    const res = await get<ResponseSuccess<CategoryBrandResponse[]>>(
      `/category-brands`
    );
    const CategoryBrands = res.data;
    return CategoryBrands;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getbrandsByCategory = async (
  category: string
): Promise<BrandResponse[]> => {
  try {
    const res = await get<ResponseSuccess<CategoryResponse[]>>(
      `/brands/category/${category}`
    );
    const brands = res.data;
    return brands;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getTopProduct = async (
  category: string,
  limit: number
): Promise<ProductResponse[]> => {
  try {
    const res = await get<ResponseSuccess<PageResponse<ProductResponse>>>(
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
  brand: string,
  LIMIT: number,
  PAGE: number,
  SORT: string
): Promise<[ProductResponse[], number]> => {
  try {
    const res = await get<ResponseSuccess<PageResponse<ProductResponse>>>(
      `/products?category=${category}&brand=${brand}&page=${PAGE}&limit=${LIMIT}&sort=${SORT}`
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
  SORT: string
): Promise<[ProductResponse[], number]> => {
  try {
    const res = await get<ResponseSuccess<PageResponse<ProductResponse>>>(
      `/products?category=${category}&page=${PAGE}&limit=${LIMIT}&sort=${SORT}`
    );
    const products = res.data.result;
    const totalItem = res.data.totalItem;
    return [products, totalItem];
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAttributesByCategory = async (
  category: string
): Promise<AttibulteResponse[]> => {
  try {
    const res = await get<ResponseSuccess<AttibulteResponse[]>>(
      `/attributes/category/${category}`
    );
    const attributes = res.data;
    return attributes;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const SearchProductAction = async (searchQuery: string) => {
  const res = await get<ResponseSuccess<PageResponse<ProductResponse>>>(
    `/products?search=name:${searchQuery}&limit=5`
  );
  const products = res.data.result;
  return products;
};