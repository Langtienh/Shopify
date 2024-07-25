import {
  getAllComments,
  getAllProduct,
  getProductById,
  getProductDetail,
} from "@/actions/product.services";
import { productSlugToId, productToSlug } from "@/lib/ultils";
import Title from "@/app/(guiest)/(product-detail)/product/[slug]/_components/title";
import Gallery from "@/app/(guiest)/(product-detail)/product/[slug]/_components/box-gallery";
import Similar from "@/app/(guiest)/(product-detail)/product/[slug]/_components/similar";
import Comments from "./_components/comments";

export async function generateStaticParams() {
  const count = process?.env?.PRODUCT_ITEM ?? "0";
  const countItem = +count;
  const products = await getAllProduct(countItem);
  return products.map((product) => ({
    slug: productToSlug(product.name, product.id),
  }));
}
export default async function Page({ params }: { params: { slug: string } }) {
  const productId = productSlugToId(params.slug);
  // const product = await getProductById(productId);
  // const comments = await getAllComments(productId);
  const { product, comments } = await getProductDetail(productId);
  return (
    <>
      <Title viewCount={product.viewCount} name={product.name} />
      <hr className="h-[1px] w-full bg-gray-100 mt-[10px] mb-[15px] shadow-sm" />
      <Gallery product={product} />
      <hr className="h-[1px] w-full bg-gray-100 mt-[10px] mb-[15px] shadow-sm" />
      <Similar category={product.category} />
      <hr className="h-[1px] w-full bg-gray-100 mt-[10px] mb-[15px] shadow-sm" />
      <Comments
        key={`comment-${productId}`}
        productId={product.id}
        comments={comments}
        name={product.name}
      />
    </>
  );
}
