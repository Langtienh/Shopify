import ProductList from "@/components/product/product.list";
import { limitProductByCategory } from "@/utils/limitByCategory";
import { getTopProduct } from "@/actions/product.services";
export default async function ProductTop({
  category,
}: {
  category: CategoryResponse;
}) {
  const LIMIT = limitProductByCategory(category.id);
  const products = await getTopProduct(category.name, LIMIT);
  return <ProductList products={products} />;
}
