import { getAllCategoryBrand } from "@/actions/product.services";
import ProductsListProps from "@/components/product/list/product.list.props";
// todo
// export async function generateStaticParams() {
//   const CategoryBrands = await getAllCategoryBrand();
//   return CategoryBrands.map((item) => ({
//     category: item.category,
//     brand: item.brand,
//   }));
// }

export default async function Page({
  params,
  searchParams,
}: {
  params: { category: string; brand: string };
  searchParams: {
    page?: number;
    limit?: number;
    sort?: string;
    filters?: string;
  };
}) {
  const categoryCP = params.category.replace(".html", "");
  const brandCP = params.brand.replace(".html", "");
  return (
    <>
      <ProductsListProps
        page={searchParams.page}
        limit={searchParams.limit}
        sort={searchParams.sort}
        filters={searchParams.filters}
        category={categoryCP}
        brand={brandCP}
        pagination
      />
    </>
  );
}
