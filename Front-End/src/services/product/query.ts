"use server";
import {
  converPriceToVN,
  priceShow,
  priceThrough,
  productToSlug,
} from "@/lib/utils2";
import { get } from "../axios.helper";

export const getProduct = async (
  page: number = 1,
  limit: number = 10,
  category?: string,
  brand?: string,
  sort?: string,
  search?: string,
  active: boolean = true
) => {
  let query = `page=${page}&limit=${limit}`;
  if (category) query += `&category=${category}`;
  if (brand) query += `&brand=${brand}`;
  if (sort) query += `&sort=${sort}`;
  if (search) query += `&search=${search}`;
  query += `&active=${active}`;
  const res = await get<Page<Product>>(`/products/search-product?${query}`);
  const products = res.data.result.map((product) => ({
    ...product,
    priceF: priceShow(product.price, product.discount),
    discountForMemberF: converPriceToVN(product.discountForMember, "đ"),
    priceThroughF: priceThrough(product.price),
    slug: productToSlug(product.name, product.id),
  }));
  const totalItem = res.data.totalItem;
  return { products, totalItem };
};

export const getProductDeleted = async (page?: number, limit?: number) => {
  const { products, totalItem } = await getProduct(
    page,
    limit,
    undefined,
    undefined,
    undefined,
    undefined,
    false
  );
  return { products, totalItem };
};

export const getAllProduct = async () => {
  // get all
  // const res = await get<ProductResponse[]>(`/products`);
  // const products = res.data;
  // return products;
  // get by limit option
  const limit = +process.env.PRODUCT_ITEM! || 10;
  const { products } = await getProduct(1, limit);
  return products;
};

// cái này call ở client sẽ bị lỗi do env phải để next_public
export const searchProductByName = async (value: string) => {
  const query = `name:${value}`;
  const res = await getProduct(1, 5, undefined, undefined, undefined, query);
  return res.products;
};

export const getProductByCategorySortByViewCounter = async (
  category: string,
  limit: number
) => {
  const sort = `viewCount:desc`;
  const res = await getProduct(1, limit, category, undefined, sort);
  return res.products;
};

export const getProductById = async (id: number | string) => {
  const res = await get<Product>(`/products/${id}`);
  const data = res.data;
  return data;
};

export const getAttributesByCategory = async (
  category?: string,
  brand?: string
): Promise<AttibulteResponse[]> => {
  let query = "/attributes?";
  if (category) query += `category=${category}`;
  if (brand) query += `&brand=${brand}`;
  try {
    const res = await get<AttibulteResponse[]>(query);
    const attributes = res.data;
    return attributes;
  } catch {
    return [];
  }
};
