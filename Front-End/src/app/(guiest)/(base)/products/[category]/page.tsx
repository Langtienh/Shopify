import { getAllCategory } from "@/actions/product.services";
import ProductsListProps from "@/components/product/list/product.list.props";

// todo
// export async function generateStaticParams() {
//   const categories = await getAllCategory();
//   return categories.map((category) => ({
//     category: category.name,
//   }));
// }

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
  const categoryCP = params.category.replace(".html", "");
  return (
    <>
      <ProductsListProps
        page={searchParams.page}
        limit={searchParams.limit}
        sort={searchParams.sort}
        filters={searchParams.filters}
        category={categoryCP}
        pagination
      />
    </>
  );
}
