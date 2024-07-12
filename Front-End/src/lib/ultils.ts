import slugify from "slugify";
import { categories } from "@/hard-coding/data";
/*
 **
 */
export const splitFullName = (str: string) => str.split(" ")[0];

export const toSlugify = (slug: string) =>
  slugify(slug, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: false, // strip special characters except replacement, defaults to `false`
    locale: "vi", // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });

export const productToSlug = (product: ProductResponse) =>
  `/product/${toSlugify(product.name)}-${product.id}.html`;

export const productSlugToId = (slug: string) => {
  const id = slug.substring(slug.lastIndexOf("-") + 1, slug.lastIndexOf("."));
  return id;
};

export const converPriceToVN = (price: number, unit?: string) =>
  price.toLocaleString("vi-VN") + (unit ? unit : "");
export const priceThrough = (product: ProductResponse) =>
  !!product.price ? converPriceToVN(product.price, "đ") : "0";
export const priceShow = (product: ProductResponse) =>
  !!product.price
    ? converPriceToVN((product.price * (100 - product.discount)) / 100, "đ")
    : "0";
export const discoutForMember = (product: ProductResponse) =>
  !!product.discountForMember &&
  converPriceToVN(product.discountForMember, "đ");
export const view = (product: ProductResponse) =>
  !!product.viewCount && converPriceToVN(product.viewCount);

export const DELAY = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// hard coding
export const translateCategory = (en: string) => {
  const index = categories.findIndex(
    (item: { en: string }) => en.toUpperCase() === item.en.toUpperCase()
  );
  if (index !== -1) return categories[index].vi;
  return en;
};

// hard coding
export const limitProductByCategory = (id: number) => {
  const index = categories.findIndex((item) => id === item.id);
  if (index !== -1) return categories[index].limit;
  return 10;
};
