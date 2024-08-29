import ProductItem from "../item/product.item";

export default function ProductList({
  products,
}: {
  products: (Product & ProductFormat)[];
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
      {products.map((product) => (
        <ProductItem key={`product_${product.id}`} product={product} />
      ))}
    </div>
  );
}
