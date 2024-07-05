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
