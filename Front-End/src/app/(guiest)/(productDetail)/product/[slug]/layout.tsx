import { getProductById } from "@/services/product";
import { ProductDetailHeader } from "@/components/app/guiest/product-detail/header";
import { productSlugToId } from "@/lib/utils2";
import { Metadata } from "next";

type TParams = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: TParams): // parent: ResolvingMetadata
Promise<Metadata> {
  const productId = productSlugToId(params.slug);
  const product = await getProductById(productId);

  const t = product.name;
  return {
    title: `${t} 🔥🔥🔥`,
  };
}
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const productId = productSlugToId(params.slug);
  return (
    <div className="relative">
      <ProductDetailHeader productId={productId} />
      <main className="text-[#444444] max-w-[1200px] mx-auto w-full px-2 pt-[132px]">
        {children}
      </main>
    </div>
  );
}
