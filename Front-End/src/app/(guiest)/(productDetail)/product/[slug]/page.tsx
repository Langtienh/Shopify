import { getAllProduct, getProductById, upViewCount } from "@/services/product";
import { productSlugToId, productToSlug } from "@/lib/utils2";
import {
  Title,
  Gallery,
  Similar,
  Comments,
} from "@/components/app/guiest/product-detail";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const products = await getAllProduct();
  return products.map((product) => ({
    slug: productToSlug(product.name, product.id),
  }));
}
export default async function Page({ params }: { params: { slug: string } }) {
  const productId = productSlugToId(params.slug);
  const product = await getProductById(productId);
  if (!product) notFound();
  await upViewCount(productId);
  return (
    <>
      <Title viewCount={product.viewCount} name={product.name} />
      <hr className="h-[1px] w-full bg-gray-100 mt-[10px] mb-[15px] shadow-sm" />
      <Gallery product={product} />
      <hr className="h-[1px] w-full bg-gray-100 mt-[10px] mb-[15px] shadow-sm" />
      <Similar category={product.category.name} />
      <hr className="h-[1px] w-full bg-gray-100 mt-[10px] mb-[15px] shadow-sm" />
      <Comments
        key={`comment-${productId}`}
        productId={product.id}
        name={product.name}
      />
    </>
  );
}
