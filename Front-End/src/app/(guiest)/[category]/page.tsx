import { getAllCategory } from "@/actions/product.services";
import { slugToCategoryEn } from "@/lib/ultils";
import ProductsListProps from "@/components/product/list/product.list.props";
import ProductFilterProps from "@/components/product/filter/product.filters.props";

// todo
export async function generateStaticParams() {
  const categories = await getAllCategory();
  return categories.map((category) => ({
    category: category.name,
  }));
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: {
    page?: number;
    limit?: number;
    sort?: string;
    filters?: string;
  };
}) {
  return (
    <>
      <ProductFilterProps category={slugToCategoryEn(params.category)} />
      <ProductsListProps
        page={searchParams.page}
        limit={searchParams.limit}
        sort={searchParams.sort}
        filters={searchParams.filters}
        category={slugToCategoryEn(params.category)}
        pagination
      />
    </>
  );
}
