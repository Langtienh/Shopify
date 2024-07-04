import { get } from "@/services/axios.helper";
import ProductList from "./product.list";
import { limitProductByCategory } from "@/utils/limitByCategory";
export default async function ProductTop({
  category,
}: {
  category: CategoryResponse;
}) {
  const LIMIT = limitProductByCategory(category.id);
  try {
    const res = await get<ResponseSuccess<PageResponse<ProductResponse>>>(
      `/products?category=${category.name}&limit=${LIMIT}&sort=viewCount:desc`
    );
    const products = res.data.result;
    return <ProductList products={products} />;
  } catch {
    return <> error</>;
  }
}
