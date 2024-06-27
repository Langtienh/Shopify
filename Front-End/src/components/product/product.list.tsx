import ProductItem from "@/components/product/product.item";

export default async function ProductList({
  products,
}: {
  products: TProduct[];
}) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {products.map((product: TProduct) => (
        <ProductItem key={`product_${product.id}`} product={product} />
      ))}
    </div>
  );
}
