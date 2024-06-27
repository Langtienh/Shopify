export const converPriceToVN = (price: number, unit?: string) =>
  price.toLocaleString("vi-VN") + (unit ? unit : "");
