import { get } from "@/services/axios.helper";
import ProductItem from "@/components/global/product.item";

export default async function ProductList({
  category,
}: {
  category: TCategory;
}) {
  const products = await get<TProduct[]>(
    `/topProducts?categoryId=${category.id}`
  );
  return (
    <div className="grid grid-cols-5 gap-2">
      {products.map((product: TProduct) => (
        <ProductItem key={`product_${product.id}`} product={product} />
      ))}
    </div>
  );
}
