import { get } from "@/services/axios.helper";
import ProductList from "./product.list";

export default async function ProductTop({
  category,
}: {
  category: TCategory;
}) {
  const products = await get<TProduct[]>(
    `/topProducts?category=${category.category}`
  );
  return <ProductList products={products} />;
}
