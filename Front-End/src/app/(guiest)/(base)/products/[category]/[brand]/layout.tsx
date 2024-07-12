import ProductFilterProps from "@/components/product/filter/product.filters.props";
import { translateCategory } from "@/lib/ultils";
import { Metadata } from "next";

type Props = {
  params: { brand: string; category: string };
};
export async function generateMetadata({
  params,
}: Props): // parent: ResolvingMetadata
Promise<Metadata> {
  const categoryCP = params.category.replace(".html", "");
  const t = translateCategory(categoryCP);
  return {
    title: `${t} ${params.brand} Chính hãng 🔥🔥🔥`,
  };
}
export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { category: string; brand: string };
}) {
  return (
    <>
      {/* // todo */}
      {/* <ProductFilterProps
        category={params.category}
        brands={params.brand}
      /> */}
      {children}
    </>
  );
}
