import { getProductById } from "@/actions/product.services";
import ProductHeader from "@/app/(guiest)/(product-detail)/_components/header/product.header";
import { productSlugToId } from "@/lib/ultils";
import { Metadata } from "next";
import { Suspense } from "react";

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
  const product = await getProductById(productId);
  return (
    <div className="max-w-[1400px] mx-auto relative">
      <ProductHeader productId={productId} />
      <main className="text-[#444444] max-w-[1200px] mx-auto w-full px-2 pt-[132px]">
        {children}
      </main>
    </div>
  );
}
