import NavBrand from "@/components/global/nav.brand";
import ProductSort from "@/components/product/sort/product.sort";
import { slugToCategoryVi } from "@/lib/ultils";
import { Metadata } from "next";
import { Suspense } from "react";

type Props = {
  params: { category: string };
};

export async function generateMetadata({
  params,
}: Props): // parent: ResolvingMetadata
Promise<Metadata> {
  const t = slugToCategoryVi(params.category);
  return {
    title: `${t} 🔥🔥🔥`,
  };
}
export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { category: string };
}) {
  return (
    <div className="flex flex-col gap-4">
      <NavBrand category={params.category} />
      <Suspense fallback={<p>Loading feed...</p>}>
        <ProductSort />
        {children}
      </Suspense>
      <div></div>
      <div></div>
    </div>
  );
}
