import ProductItem from "@/components/product/item/product.item";

export default async function ProductList({
  products,
}: {
  products: ProductResponse[];
}) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {products.map((product: ProductResponse) => (
        <ProductItem key={`product_${product.id}`} product={product} />
      ))}
    </div>
  );
}
