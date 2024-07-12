import NavBrand from "@/components/global/navbrand/nav.brand";
import ProductFilterProps from "@/components/product/filter/product.filters.props";
import ProductSort from "@/components/product/sort/product.sort";
import { translateCategory } from "@/lib/ultils";
import { Metadata } from "next";
import { Suspense } from "react";

type Props = {
  params: { category: string };
};

export async function generateMetadata({
  params,
}: Props): // parent: ResolvingMetadata
Promise<Metadata> {
  const categoryCP = params.category.replace(".html", "");
  const t = translateCategory(categoryCP);
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
  const categoryCP = params.category.replace(".html", "");
  return (
    <div className="flex flex-col gap-4">
      <NavBrand category={categoryCP} />
      <ProductFilterProps category={categoryCP} />
      <ProductSort />
      <Suspense fallback={<p>Loading feed...</p>}>{children}</Suspense>
      <div></div>
      <div></div>
    </div>
  );
}
