import {
  getProduct,
  getAllProduct,
  getProductById,
  getAttributesByCategory,
  searchProductByName,
  getProductByCategorySortByViewCounter,
} from "./query";
import { createProduct, upViewCount, updateProduct } from "./action";
export {
  updateProduct,
  upViewCount,
  createProduct,
  getProduct,
  getAllProduct,
  getProductById,
  searchProductByName,
  getAttributesByCategory,
  getProductByCategorySortByViewCounter,
};
