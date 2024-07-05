"use server";

import { get } from "@/services/axios.helper";

export const SearchProductAction = async (searchQuery: string) => {
  const res = await get<ResponseSuccess<PageResponse<ProductResponse>>>(
    `/products?search=name:${searchQuery}&limit=5`
  );
  const products = res.data.result;
  return products;
};
