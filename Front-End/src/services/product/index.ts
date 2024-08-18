import {
  getProduct,
  getAllProduct,
  getProductById,
  getAttributesByCategory,
  // searchProductByName,
  getProductByCategorySortByViewCounter,
} from "./query";
import { createProduct, upViewCount } from "./action";
import { searchProductByName } from "./bug";
export {
  upViewCount,
  createProduct,
  getProduct,
  getAllProduct,
  getProductById,
  searchProductByName,
  getAttributesByCategory,
  getProductByCategorySortByViewCounter,
};
