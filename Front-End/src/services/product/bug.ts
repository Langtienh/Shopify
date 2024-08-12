"use server";

import { getProduct } from "./query";

export const searchProductByName = async (value: string) => {
  const query = `name:${value}`;
  const res = await getProduct(1, 5, undefined, undefined, undefined, query);
  return res.products;
};
