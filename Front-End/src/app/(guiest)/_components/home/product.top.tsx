import ProductList from "@/components/product/list/product.list";
import { limitProductByCategory } from "@/lib/ultils";
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
