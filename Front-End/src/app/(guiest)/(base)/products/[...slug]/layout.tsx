import NavBrand from "@/components/navbrand/nav.brand";
import ProductFilter from "@/app/(guiest)/(base)/products/_components/filter/filters.server";
import ProductSort from "@/app/(guiest)/(base)/products/_components/sort/product.sort";
import { translateCategory } from "@/lib/ultils";
import { Metadata } from "next";

export type SlugParams = {
  slug: [string, string?];
};
export async function generateMetadata({
  params,
}: {
  params: SlugParams;
}): Promise<Metadata> {
  const [category, brand] = params.slug;
  const brandCP = brand?.replace(".html", "");
  if (category) {
    const categoryCP = category.replace(".html", "");
    const t = translateCategory(categoryCP);
    if (brandCP) {
      return {
        title: `${t} ${brandCP} chính hãng 🔥🔥🔥`,
      };
    }
    return {
      title: `${t} chính hãng 🔥🔥🔥`,
    };
  }
  return { title: "Shopify" };
}
export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: SlugParams;
}) {
  const [category, brand] = params?.slug;
  const categoryCP = category.replace(".html", "");
  const brandCP = brand?.replace(".html", "");
  return (
    <div className="flex flex-col gap-4 px-2 pt-4 pb-10">
      {categoryCP && (
        <>
          <NavBrand category={categoryCP} />
          <ProductFilter brand={brandCP} category={categoryCP} />
        </>
      )}
      <ProductSort />
      {children}
    </div>
  );
}
