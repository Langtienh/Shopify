"use server";
import { get, post } from "@/actions/axios.helper";
import checkToken from "@/app/api/v1/_lib/check-token";
import getToken from "@/app/api/v1/_lib/getToken";
import { revalidatePath } from "next/cache";
export const getAllCategory = async (): Promise<CategoryResponse[]> => {
  const res = await get<CategoryResponse[]>("/categories");
  const categories = res.data.sort((a, b) => a.id - b.id);
  return categories;
};

export const getAllCategoryBrand = async (): Promise<
  CategoryBrandResponse[]
> => {
  try {
    const res = await get<CategoryBrandResponse[]>(`/category-brands`);
    const CategoryBrands = res.data;
    return CategoryBrands;
  } catch {
    return [];
  }
};

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

export const getTopProduct = async (
  category: string,
  limit: number
): Promise<ProductResponse[]> => {
  try {
    const res = await get<PageResponse<ProductResponse>>(
      `/products/search-product?category=${category}&limit=${limit}&sort=viewCount:desc`
    );
    const products = res.data.result;
    return products;
  } catch (error) {
    return [];
  }
};
// sort,  filter
export const getProductOption = async (
  limit: number = 10,
  page: number = 1,
  sort: string = "id:asc",
  category?: string,
  filter?: string,
  brand?: string
): Promise<[ProductResponse[], number]> => {
  try {
    const res = await get<PageResponse<ProductResponse>>(
      `/products/search-product?category=${category}${
        brand ? `&brand=${brand}` : ""
      }&page=${page}&limit=${limit}&sort=${sort}${
        filter ? `&search=${filter}` : ""
      }`,
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
    const products = res.data.result;
    const totalItem = res.data.totalItem;
    return [products, totalItem];
  } catch (error) {
    return [[], 0];
  }
};

export const getProductByCategory = async (
  category: string,
  LIMIT: number,
  PAGE: number,
  SORT: string,
  filter?: string
): Promise<[ProductResponse[], number]> => {
  try {
    const res = await get<PageResponse<ProductResponse>>(
      `/products/search-product?category=${category}&page=${PAGE}&limit=${LIMIT}&sort=${SORT}${
        filter ? `&search=${filter}` : ""
      }`
    );
    const products = res.data.result;
    const totalItem = res.data.totalItem;
    return [products, totalItem];
  } catch {
    return [[], 0];
  }
};

export const getAllProduct = async (
  LIMIT: number
): Promise<ProductResponse[]> => {
  try {
    const res = await get<PageResponse<ProductResponse>>(
      `/products/search-product?limit=${LIMIT}`
    );
    const products = res.data.result;
    return products;
  } catch {
    return [];
  }
};

export const getAttributesByCategory = async (
  category: string,
  brand?: string
): Promise<AttibulteResponse[]> => {
  try {
    const res = await get<AttibulteResponse[]>(
      `/attributes?category=${category}${brand ? `&brand=${brand}` : ""}`
    );
    const attributes = res.data;
    return attributes;
  } catch {
    return [];
  }
};

export const SearchProductAction = async (searchQuery: string) => {
  // todo
  try {
    const res = await get<PageResponse<ProductResponse>>(
      `/products/search-product?search=name:${searchQuery}&limit=5`
    );
    const products = res.data.result;
    return products;
  } catch {
    return [];
  }
};

export const getProductById = async (id: number | string) => {
  try {
    const res = await get<ProductResponse>(`/products/${id}`);
    const data = res.data;
    return data;
  } catch {
    const product = {
      id: 1,
      name: "",
      price: 1,
      discount: 1,
      stock: 1,
      viewCount: 1,
      description: "",
      image: "",
      discountForMember: 1,
      active: true,
      brand: "",
      category: "",
    };
    return product;
  }
};

export const getAllComments = async (
  id: number
): Promise<CommentResponse[]> => {
  try {
    const res = await get<PageResponse<CommentResponse>>(
      `/comments/product/${id}?page=1&limit=1000`
    );
    const products = res.data.result;
    return products;
  } catch {
    return [];
  }
};

export const postComment = async (
  input: {
    rate: number;
    productId: number;
    content: string;
  },
  path: string
) => {
  try {
    await checkToken();
    const { userId, token } = getToken();
    const res = await post(
      "/comments",
      { ...input, userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    revalidatePath(path);
  } catch {}
};

export const getProductDetail = async (id: number | string) => {
  const comments = await getAllComments(id as number);
  const product = await getProductById(id);
  return { comments, product };
};
